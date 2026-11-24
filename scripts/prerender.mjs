// ══ BUILD-TIME PRERENDER ══
//
// Runs after `vite build`. Boots the actual production build behind a
// local server (vite preview — the exact same static output Netlify will
// serve), visits every real route in a headless browser, and saves each
// page's fully-rendered HTML as a static file in dist/. Netlify serves a
// matching static file for a given path before it ever consults
// _redirects, so this needs zero routing changes — the SPA still works
// exactly as before for any path that (by construction) always has a
// prerendered file now.
//
// Route list comes from the same data files the app itself renders from
// (geoLocations.js, articles.js) — nothing is duplicated or hand-typed
// here, so a new GEO page or article is prerendered automatically the
// next time this runs.
//
// Why a real browser instead of React's server-render API: this app
// leans on browser-only APIs throughout (IntersectionObserver, canvas,
// matchMedia, GSAP/ScrollTrigger) that would need defensive rewrites
// everywhere to survive a Node SSR pass. Snapshotting the real, already-
// working client render avoids touching any component at all.

import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

import { LOCATIONS } from '../src/data/geoLocations.js';
import { ARTICLES, CATEGORIES } from '../src/data/articles.js';
import { FOCUS_PAGES } from '../src/data/serviceSeo.js';
import { SITE_URL } from '../src/lib/siteConfig.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const PORT = 4174;
const BASE = `http://localhost:${PORT}`;

const SERVICE_PATHS = [
  '/services/wraps',
  '/services/ceramic',
  '/services/tint',
  '/services/starlight',
  '/services/ppf',
  '/services/custom-builds',
  '/services/detailing',
  '/services/custom-interiors',
  '/services/stripes-decals',
  '/services/caliper-painting',
  '/services/wheel-painting',
  // Chrome Delete + vehicle pages. Unpublished ones are still prerendered
  // (noindex) so they can be previewed; they're kept out of the sitemap.
  ...FOCUS_PAGES.map((p) => `/services/${p.slug}`),
];

function buildRouteList() {
  const routes = ['/', '/about', '/book', '/franchise', ...SERVICE_PATHS];
  for (const loc of LOCATIONS) routes.push(`/areas/${loc.slug}`);
  routes.push('/learn');
  for (const cat of CATEGORIES) routes.push(`/learn/category/${cat.slug}`);
  for (const article of ARTICLES) routes.push(`/learn/${article.slug}`);
  return routes;
}

// Clean-URL convention static hosts expect: /learn/foo -> dist/learn/foo/index.html
function outputPathFor(route) {
  if (route === '/') return join(DIST, 'index.html');
  return join(DIST, route.replace(/^\//, ''), 'index.html');
}

// sitemap.xml is written from what was actually rendered: every page whose
// final robots meta isn't noindex, listed at its own canonical URL. So it
// can never list a page that doesn't exist, an unpublished (noindex) page,
// or a non-canonical variant — and new pages appear automatically.
const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function writeSitemap(urls) {
  const body = urls.map((u) => `  <url><loc>${xmlEscape(u)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  writeFileSync(join(DIST, 'sitemap.xml'), xml);
}

// Two head tweaks applied to every snapshot (pages and 404.html):
//
// 1. The entry stylesheet is inlined as <style> instead of a render-blocking
//    <link>, so the first paint doesn't wait for a second request. Only the
//    stylesheet(s) the built index.html links are inlined; per-page CSS chunks
//    stay as links. All url()s in it are root-relative (/assets/...), so it
//    works at any depth. No JS chunk references this file, so it is never
//    re-requested at runtime.
// 2. index.html preloads the hero photo for phones. Only the homepage shows
//    it, so the preload is turned into a responsive one matching the hero
//    <img>'s srcset/sizes there (no JPEG + WebP double download) and removed
//    from every other page (no 200 KB unused download).
function readEntryStyles() {
  const template = readFileSync(join(DIST, 'index.html'), 'utf8');
  return [...template.matchAll(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g)].map(([, href]) => {
    const css = readFileSync(join(DIST, href), 'utf8');
    if (/<\/style/i.test(css)) throw new Error(`${href} contains </style; can't inline it`);
    return { href, css };
  });
}

const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];

// Pages after the homepage are rendered from the homepage snapshot (the
// preview server falls back to the already-written dist/index.html), so a
// page may arrive with the CSS already inlined and the preload already
// rewritten. Both steps are therefore idempotent, and each check below
// guarantees exactly one copy of the CSS and at most one hero preload.
function finalizeHead(html, entryStyles) {
  for (const { href, css } of entryStyles) {
    const link = new RegExp(`<link rel="stylesheet"[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'g');
    const links = (html.match(link) || []).length;
    const inlined = html.split(`<style>${css}</style>`).length - 1;
    if (links + inlined !== 1) throw new Error(`expected 1 copy of ${href}, found ${links} link(s) + ${inlined} inline`);
    html = html.replace(link, () => `<style>${css}</style>`);
  }
  const preload = /<link rel="preload"[^>]*(?:href="\/assets\/hero-safe-mode-|imagesrcset="[^"]*hero-safe-mode)[^>]*>/;
  const heroImg = html.match(/<img[^>]*class="[^"]*heroImage[^"]*"[^>]*>/);
  const srcset = heroImg && attr(heroImg[0], 'srcset');
  const sizes = heroImg && attr(heroImg[0], 'sizes');
  html = html.replace(preload, () => (srcset && sizes
    ? `<link rel="preload" as="image" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high" media="(max-width: 768px)">`
    : ''));
  return html;
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res) return true;
    } catch {
      // preview server not accepting connections yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`vite preview never became reachable at ${url}`);
}

async function main() {
  const routes = buildRouteList();
  console.log(`[prerender] ${routes.length} routes to render\n`);
  // Read before any snapshot overwrites dist/index.html.
  const entryStyles = readEntryStyles();

  // Invoke the local vite binary directly with Node — no shell wrapper
  // (no npx, no `shell: true`). A shell in between means kill() only ever
  // terminates the shell, not the actual vite server it spawned, which is
  // exactly what left a vite preview process orphaned on port 4174 during
  // testing. Spawning vite.js as a direct child means kill() reaches the
  // real process on both Windows and Linux (Netlify's CI).
  const viteBin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  const previewProcess = spawn(
    process.execPath,
    [viteBin, 'preview', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, stdio: 'pipe' }
  );

  let previewStderr = '';
  previewProcess.stderr.on('data', (chunk) => { previewStderr += chunk.toString(); });
  previewProcess.on('error', (err) => { previewStderr += `\n${err.message}`; });

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    // Belt and suspenders: kill the tracked PID *and*, separately,
    // whatever process is actually bound to PORT right now. In testing,
    // killing the tracked PID alone sometimes left the port still held —
    // going by the port itself sidesteps any process-tree mismatch.
    if (process.platform === 'win32') {
      try {
        execFileSync('taskkill', ['/pid', String(previewProcess.pid), '/T', '/F'], { stdio: 'ignore' });
      } catch {
        // Already gone — fine.
      }
      try {
        const out = execFileSync('cmd', ['/c', `netstat -ano | findstr :${PORT}`], { encoding: 'utf8' });
        const pids = new Set();
        out.split('\n').forEach((line) => {
          const match = line.match(/LISTENING\s+(\d+)/);
          if (match) pids.add(match[1]);
        });
        for (const pid of pids) {
          try {
            execFileSync('taskkill', ['/pid', pid, '/F'], { stdio: 'ignore' });
          } catch {
            // Already gone — fine.
          }
        }
      } catch {
        // Nothing listening — fine, that's the goal.
      }
    } else {
      try {
        previewProcess.kill('SIGKILL');
      } catch {
        // Already gone — fine.
      }
      try {
        const out = execFileSync('sh', ['-c', `lsof -ti tcp:${PORT} || true`], { encoding: 'utf8' });
        out.split('\n').filter(Boolean).forEach((pid) => {
          try {
            execFileSync('kill', ['-9', pid.trim()]);
          } catch {
            // Already gone — fine.
          }
        });
      } catch {
        // lsof unavailable or nothing listening — fine.
      }
    }
  };
  process.on('exit', cleanup);

  try {
    await waitForServer(BASE);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Freezes the homepage curtain intro (Hero.jsx) at its very first,
    // fully-covering frame for every snapshot below — otherwise whatever
    // animation frame happens to be on screen when the networkidle wait
    // resolves gets baked into the static HTML a real visitor's browser
    // paints before React ever boots, which can be well past the intro
    // already having finished and exited. See the matching check in
    // Hero.jsx.
    await page.addInitScript(() => { window.__WRAPTORS_PRERENDER__ = true; });

    // Never let the build record analytics: Google's tag and collection
    // requests are blocked for every snapshot (the page HTML is unaffected —
    // the tag snippet itself is static in index.html).
    await page.route(/^https:\/\/([a-z0-9-]+\.)*(googletagmanager|google-analytics|analytics\.google)\.com\//, (route) => route.abort());

    // Pages are code-split: record which JS files each page loads so its
    // static HTML can preload them in parallel with the entry script (no
    // request waterfall on a direct visit). Cache off so every load is seen.
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    const scriptsLoaded = new Set();
    page.on('request', (req) => {
      if (req.resourceType() !== 'script') return;
      const url = new URL(req.url());
      if (url.origin === BASE && url.pathname.startsWith('/assets/')) scriptsLoaded.add(url.pathname);
    });

    let successCount = 0;
    const failures = [];
    const sitemapUrls = [];
    const skipped = [];

    for (const route of routes) {
      try {
        scriptsLoaded.clear();
        const response = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
        if (!response || !response.ok()) {
          throw new Error(`HTTP ${response ? response.status() : 'no response'}`);
        }
        // useEffect-driven title/meta/canonical/OG/schema hooks run just
        // after mount — networkidle already implies mount has happened,
        // this is just a small safety margin.
        await page.waitForTimeout(150);

        let html = await page.content();
        const preloads = [...scriptsLoaded]
          .filter((path) => !html.includes(`"${path}"`))
          .map((path) => `<link rel="modulepreload" crossorigin="" href="${path}">`)
          .join('');
        if (preloads) html = html.replace('</head>', `${preloads}</head>`);
        html = finalizeHead(html, entryStyles);
        const outPath = outputPathFor(route);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, html);
        successCount++;

        const { canonical, robots } = await page.evaluate(() => ({
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
          robots: [...document.querySelectorAll('meta[name="robots"]')].map((m) => m.content).join(','),
        }));
        if (/noindex/i.test(robots)) {
          skipped.push(`${route} (noindex)`);
        } else if (!canonical.startsWith(`${SITE_URL}/`)) {
          skipped.push(`${route} (canonical "${canonical}" not on ${SITE_URL})`);
        } else if (!sitemapUrls.includes(canonical)) {
          sitemapUrls.push(canonical);
        }
      } catch (err) {
        failures.push({ route, error: err.message });
      }
    }

    // Custom 404 — snapshot a deliberately invalid path so App.jsx's
    // catch-all <Route path="*"> (NotFoundPage) is what gets captured.
    // public/_redirects points every unmatched request at this file with
    // a real 404 status.
    try {
      await page.goto(`${BASE}/__prerender-404-sentinel__`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(150);
      const html404 = finalizeHead(await page.content(), entryStyles);
      writeFileSync(join(DIST, '404.html'), html404);
      console.log('[prerender] generated 404.html');
    } catch (err) {
      console.error(`[prerender] FAILED to generate 404.html: ${err.message}`);
      failures.push({ route: '404.html', error: err.message });
    }

    await browser.close();

    writeSitemap(sitemapUrls);
    console.log(`[prerender] sitemap.xml: ${sitemapUrls.length} URLs (${skipped.length} left out)`);
    skipped.forEach((s) => console.log(`  - ${s}`));
    // A production build with no indexable pages means something upstream
    // is wrong (e.g. the robots meta) — fail rather than publish an empty map.
    if (process.env.CONTEXT === 'production' && sitemapUrls.length === 0) {
      failures.push({ route: 'sitemap.xml', error: 'no indexable pages in a production build' });
    }

    console.log(`\n[prerender] ${successCount}/${routes.length} routes rendered successfully.`);
    if (failures.length > 0) {
      console.error(`\n[prerender] ${failures.length} route(s) failed:`);
      failures.forEach(({ route, error }) => console.error(`  ${route} — ${error}`));
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(`[prerender] Fatal error: ${err.message}`);
    if (previewStderr) console.error(`[prerender] vite preview stderr:\n${previewStderr}`);
    process.exitCode = 1;
  } finally {
    cleanup();
  }
}

main();

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'
import { VIDEOS_CACHE_NAME } from './src/lib/pwaCacheNames.js'

// workbox-core (a transitive dep of workbox-range-requests) assumes a
// browser/service-worker global `self` exists — true once this plugin runs
// inside the generated service worker, but not while Node evaluates this
// config file. `vite build`'s config loader tolerates the import fine, but
// `vite dev`'s crashes with "self is not defined" without this polyfill.
if (typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis
}
const { RangeRequestsPlugin } = await import('workbox-range-requests')

// Broadcasts every stage of a video fetch handled by the service worker to
// all open tabs via postMessage, so it's visible from the page itself (not
// just the SW's own DevTools console context, which is easy to miss).
// Each callback body is self-contained (no references to outer closures)
// because workbox-build's generateSW serializes these functions by taking
// their source text verbatim and inlining it into the generated sw.js —
// anything defined outside the function body would be undefined at runtime.
const videoFetchDiagnosticsPlugin = {
  cacheKeyWillBeUsed: async ({ request }) => {
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        client.postMessage({
          source: 'wraptors-sw',
          type: 'video-fetch-intercepted',
          url: request.url,
          range: request.headers.get('range') || null,
        });
      }
    });
    return request;
  },
  cachedResponseWillBeUsed: async ({ request, cachedResponse }) => {
    const hit = !!cachedResponse;
    console.log(hit ? '[SW] offline cache hit for video' : '[SW] offline cache miss for video');
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        client.postMessage({
          source: 'wraptors-sw',
          type: 'video-cache-lookup',
          url: request.url,
          hit,
        });
      }
    });
    return cachedResponse;
  },
  handlerDidRespond: async ({ request, response }) => {
    if (response) {
      self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
        for (const client of clients) {
          client.postMessage({
            source: 'wraptors-sw',
            type: 'video-response',
            url: request.url,
            status: response.status,
            contentRange: response.headers.get('content-range') || null,
            contentLength: response.headers.get('content-length') || null,
            acceptRanges: response.headers.get('accept-ranges') || null,
            contentType: response.headers.get('content-type') || null,
          });
        }
      });
    }
    return response;
  },
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.svg',
        'favicon-mafia.svg',
        'apple-touch-icon-180x180.png',
      ],
      manifest: {
        name: 'WRAPTORS — The Global Car Customization Empire',
        short_name: 'Wraptors',
        description: 'Premium vehicle wraps, ceramic coating, PPF and window tint — the global car customization empire.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // App shell only: JS/CSS/HTML + local font files. Images are cached at
        // runtime (below) instead of precached, since the media library is
        // large and shouldn't block the initial SW install.
        globPatterns: ['**/*.{js,css,html,ico,ttf,otf,woff,woff2}'],
        navigateFallback: '/index.html',
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cinematic hero/masterpiece videos. NetworkFirst (not
            // CacheFirst): a video already in Cache Storage must never
            // silently shadow the network online — CacheFirst meant that
            // once *any* entry existed under this URL, every future load
            // (even with a perfectly good connection) got served from that
            // cache entry forever, with no way to notice or recover from a
            // stale/bad one short of manually clearing storage. NetworkFirst
            // always prefers a live network response when one is available
            // (matching normal online playback exactly) and only falls back
            // to the cached copy when the network genuinely fails — which is
            // the actual offline case this is meant to cover. The 5s
            // network timeout is generous enough not to fight a slow-but-
            // working connection while still failing over promptly offline.
            // RangeRequestsPlugin lets the cached fallback still slice the
            // single cached full response to satisfy <video>'s Range: byte
            // requests (needed for seeking/scrubbing). The cache only gets
            // populated by an explicit, full (non-range) fetch — see
            // OfflinePresentationMode.jsx — since a 206 response can never
            // be cached directly (CacheableResponsePlugin only allows 0/200).
            urlPattern: ({ request }) => request.destination === 'video',
            handler: 'NetworkFirst',
            options: {
              cacheName: VIDEOS_CACHE_NAME,
              networkTimeoutSeconds: 5,
              matchOptions: { ignoreVary: true },
              expiration: {
                maxEntries: 6,
                maxAgeSeconds: 60 * 60 * 24 * 30,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
              // No shorthand exists for range-request support, so these are
              // passed as real plugin objects; workbox-build serializes them
              // into the generated sw.js. Diagnostics plugin runs first so
              // it reports on the original full cached entry before
              // RangeRequestsPlugin slices it into a 206.
              plugins: [videoFetchDiagnosticsPlugin, new RangeRequestsPlugin()],
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      // Stub Framer-only APIs so TacticalGlobe.tsx compiles in plain Vite/React
      'framer': fileURLToPath(new URL('./src/lib/framer-shim.js', import.meta.url)),
    },
  },
})

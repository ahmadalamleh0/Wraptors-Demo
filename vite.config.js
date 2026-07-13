import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { VIDEOS_CACHE_NAME } from './src/lib/pwaCacheNames.js'

// Logs, from inside the service worker, whether an offline video request was
// served from Cache Storage (hit) or found nothing cached (miss) — visible
// in DevTools > Application > Service Workers console context.
const videoCacheDiagnosticsPlugin = {
  cachedResponseWillBeUsed: async ({ cachedResponse }) => {
    if (cachedResponse) {
      console.log('[SW] offline cache hit for video');
    } else {
      console.log('[SW] offline cache miss for video');
    }
    return cachedResponse;
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
            // Cinematic hero/masterpiece videos. CacheFirst so a cached video
            // never re-downloads; RangeRequestsPlugin lets it still slice the
            // single cached full response to satisfy <video>'s Range: byte
            // requests (needed for seeking/scrubbing), so this never breaks
            // range requests. The cache only gets populated by an explicit,
            // full (non-range) fetch — see OfflinePresentationMode.jsx — since
            // a CacheFirst route can't turn a network 206 response into a
            // cacheable entry (CacheableResponsePlugin only allows 0/200).
            urlPattern: ({ request }) => request.destination === 'video',
            handler: 'CacheFirst',
            options: {
              cacheName: VIDEOS_CACHE_NAME,
              matchOptions: { ignoreVary: true },
              expiration: {
                maxEntries: 6,
                maxAgeSeconds: 60 * 60 * 24 * 30,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
              // No shorthand exists for range-request support, so these are
              // passed as real plugin objects; workbox-build serializes them
              // into the generated sw.js. Logger runs first so it reports on
              // the original full cached entry before RangeRequestsPlugin
              // slices it into a 206.
              plugins: [videoCacheDiagnosticsPlugin, new RangeRequestsPlugin()],
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

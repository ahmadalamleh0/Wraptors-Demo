import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './OfflinePresentationMode.module.css';
import { VIDEOS_CACHE_NAME } from '../lib/pwaCacheNames';

const LOG = '[OfflineMode]';
const MAX_LOG_LINES = 60;

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))]);
}

// No SW support, dev server (no SW registered there), or the visitor has
// data-saver on: nothing to prepare, don't show the indicator at all.
function canPrepareOffline() {
  if (import.meta.env.DEV || !('serviceWorker' in navigator) || !('caches' in window)) return false;
  if (navigator.connection?.saveData) return false;
  return true;
}

// Reads the exact, already-resolved production URL straight off the live
// <video> elements instead of re-importing the module ourselves — this is
// the same URL the browser will use to request the file, byte for byte, so
// there is no way for the cached key and the requested key to drift apart.
function getRequiredVideoSources() {
  const seen = new Map(); // url -> label
  for (const v of document.querySelectorAll('video')) {
    const src = v.currentSrc || v.src;
    if (!src || !/\.(mp4|webm|mov)(\?|#|$)/i.test(src)) continue;
    if (!seen.has(src)) {
      const filename = decodeURIComponent(src.split('/').pop().split(/[?#]/)[0]);
      seen.set(src, filename);
    }
  }
  return Array.from(seen, ([url, label]) => ({ url, label }));
}

// Downloads a video as a single full GET, forced past the HTTP cache
// (cache: 'reload') so it can never be contaminated by a byte-range request
// the <video> element may have already issued. Buffers sequentially (one
// reader, no tee'd streams) while reporting progress, then writes a fresh
// 200 Response into Cache Storage — then re-reads it back and runs the same
// range-slicing function the service worker uses, to prove the entry is
// actually usable offline before ever reporting success.
async function cacheVideoWithProgress(cache, { url, label }, onProgress, log) {
  log(`video download started: ${label}`);
  log(`exact video source URL (from rendered <video> element): ${url}`);
  const cacheKey = new Request(url).url;
  log(`canonical cache key: ${cacheKey}`);

  const existing = await cache.match(url);
  if (existing && existing.status === 200) {
    const existingBlob = await existing.clone().blob();
    if (existingBlob.size > 0) {
      log(`${label}: already in Cache Storage as a complete 200 response (${existingBlob.size} bytes) — skipping download`);
      onProgress(existingBlob.size, existingBlob.size);
      await verifyRangeSlicing(cache, url, label, log);
      return;
    }
    log(`${label}: existing cache entry looks incomplete (${existingBlob.size} bytes) — re-downloading`);
  }

  const response = await fetch(url, { cache: 'reload' });
  log(`HTTP response status for ${label}: ${response.status}${response.type === 'opaque' ? ' (opaque response — cannot verify, aborting)' : ''}`);

  if (response.type === 'opaque') {
    throw new Error(`${label}: response is opaque (cross-origin, no-cors) — cannot be verified or safely cached`);
  }
  if (!response.ok || response.status !== 200) {
    throw new Error(`${label}: expected a complete 200 response, got ${response.status}`);
  }
  if (!response.body) {
    throw new Error(`${label}: response has no body`);
  }

  const expectedLength = Number(response.headers.get('content-length')) || 0;
  log(`expected content length for ${label}: ${expectedLength ? `${expectedLength} bytes` : 'unknown (no content-length header)'}`);

  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onProgress(loaded, expectedLength || loaded);
  }
  log(`downloaded bytes for ${label}: ${loaded}`);

  if (loaded === 0) {
    throw new Error(`${label}: downloaded 0 bytes — refusing to cache an empty file`);
  }
  if (expectedLength > 0 && loaded !== expectedLength) {
    throw new Error(`${label}: downloaded ${loaded} bytes but expected ${expectedLength} — incomplete transfer`);
  }

  const blob = new Blob(chunks, { type: response.headers.get('content-type') || 'video/mp4' });
  const headers = new Headers(response.headers);
  headers.set('content-length', String(blob.size));
  const cacheableResponse = new Response(blob, { status: 200, statusText: 'OK', headers });

  await cache.put(url, cacheableResponse);
  log(`cache write completed for ${label}`);

  const verify = await cache.match(url);
  const verifiedBlob = verify ? await verify.clone().blob() : null;
  const postWriteOk = !!verify && verify.status === 200 && !!verifiedBlob && verifiedBlob.size === blob.size && verifiedBlob.size > 0;
  log(`post-write cache match result for ${label}: ${postWriteOk ? `OK, status ${verify.status}, ${verifiedBlob.size} bytes` : 'FAILED'}`);
  if (!postWriteOk) {
    throw new Error(
      `${label}: post-write verification failed (expected ${blob.size} bytes at status 200, got ${verifiedBlob?.size ?? 0} bytes at status ${verify?.status ?? 'n/a'})`
    );
  }

  await verifyRangeSlicing(cache, url, label, log);
}

// Replicates exactly what the service worker's RangeRequestsPlugin will do
// offline: look up the cached entry with cache.match() (a genuine offline
// cache hit/miss test using the identical URL), then slice a real byte
// range out of it with the same createPartialResponse() function Workbox
// uses. If this doesn't produce a valid 206 covering the requested bytes,
// seeking will be broken offline even though the file is fully cached.
async function verifyRangeSlicing(cache, url, label, log) {
  const cached = await cache.match(url);
  if (!cached) {
    log(`offline range cache miss for ${label} (no entry found for ${url})`);
    throw new Error(`${label}: cache miss when re-checked by URL — not actually retrievable offline`);
  }
  log(`offline range cache hit for ${label}`);

  // Lazy-loaded: this diagnostic self-test is the only thing in the app
  // that needs it, so it's kept out of the main bundle.
  const { createPartialResponse } = await import('workbox-range-requests');
  const rangeRequest = new Request(url, { headers: { Range: 'bytes=0-65535' } });
  const partial = await createPartialResponse(rangeRequest, cached.clone());
  if (partial.status !== 206) {
    throw new Error(`${label}: range-slicing self-test failed (expected 206, got ${partial.status})`);
  }
  const sliceLen = Number(partial.headers.get('content-length')) || 0;
  if (sliceLen <= 0) {
    throw new Error(`${label}: range-slicing self-test produced an empty slice`);
  }
  log(`range-slicing self-test for ${label}: OK (206, ${sliceLen} bytes for bytes=0-65535)`);
}

export default function OfflinePresentationMode() {
  const [status, setStatus] = useState(() => (canPrepareOffline() ? 'preparing' : 'hidden'));
  const [percent, setPercent] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [logLines, setLogLines] = useState([]);
  const progress = useRef(new Map());
  const runId = useRef(0);

  const log = useCallback((message) => {
    const line = `${new Date().toISOString().slice(11, 19)} ${message}`;
    console.log(`${LOG} ${message}`);
    setLogLines((prev) => [...prev.slice(-(MAX_LOG_LINES - 1)), line]);
  }, []);

  // Pure async kickoff — every setState call inside happens after an
  // `await`, never synchronously in the caller's stack, so this is safe to
  // invoke directly from the mount effect below.
  const beginCaching = useCallback(() => {
    const thisRun = ++runId.current;
    progress.current = new Map();

    const reportProgress = () => {
      let loaded = 0;
      let total = 0;
      for (const entry of progress.current.values()) {
        loaded += entry.loaded;
        total += entry.total;
      }
      if (total > 0 && runId.current === thisRun) {
        setPercent(Math.min(100, Math.round((loaded / total) * 100)));
      }
    };

    (async () => {
      try {
        const videos = getRequiredVideoSources();
        if (videos.length === 0) {
          log('no <video> elements found on this page — nothing to prepare');
          if (runId.current === thisRun) setStatus('hidden');
          return;
        }

        const [cache] = await Promise.all([
          caches.open(VIDEOS_CACHE_NAME),
          withTimeout(navigator.serviceWorker.ready, 15000),
        ]);

        await Promise.all(
          videos.map((video) =>
            cacheVideoWithProgress(
              cache,
              video,
              (loaded, total) => {
                progress.current.set(video.url, { loaded, total });
                reportProgress();
              },
              log
            )
          )
        );

        if (runId.current === thisRun) {
          setPercent(100);
          setStatus('ready');
          log(`all ${videos.length} video(s) verified in Cache Storage as complete 200 responses — Ready For Offline Presentation`);
        }
      } catch (err) {
        log(`ERROR: ${err?.message || err}`);
        if (runId.current === thisRun) setStatus('error');
      }
    })();
  }, [log]);

  useEffect(() => {
    if (!canPrepareOffline()) return; // initial state already 'hidden' — nothing to do
    beginCaching();
  }, [beginCaching]);

  // Synchronous reset + relaunch — only ever called from click handlers
  // (Retry / Clear & Re-download buttons), never from the effect above.
  const retry = useCallback(() => {
    setStatus('preparing');
    setPercent(0);
    beginCaching();
  }, [beginCaching]);

  const clearAndRedownload = useCallback(async () => {
    try {
      await caches.delete(VIDEOS_CACHE_NAME);
      log(`cleared "${VIDEOS_CACHE_NAME}" cache for re-download`);
    } catch (err) {
      log(`ERROR clearing cache: ${err?.message || err}`);
    }
    retry();
  }, [retry, log]);

  if (status === 'hidden') return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.pill} role="status" aria-live="polite">
        <span className={styles.icon} aria-hidden="true">{status === 'ready' ? '🟢' : '🔴'}</span>
        <span className={styles.label}>
          {status === 'preparing' && `Preparing Offline Demo… ${percent}%`}
          {status === 'ready' && 'Ready For Offline Presentation'}
          {status === 'error' && 'Offline video preparation failed'}
        </span>
        {status === 'preparing' && (
          <span className={styles.track}>
            <span className={styles.fill} style={{ width: `${percent}%` }} />
          </span>
        )}
        {status === 'error' && (
          <button type="button" className={styles.button} onClick={retry}>
            Retry Video Download
          </button>
        )}
        {status === 'ready' && (
          <button type="button" className={styles.buttonGhost} onClick={clearAndRedownload}>
            Clear &amp; Re-download Videos
          </button>
        )}
        {(status === 'ready' || status === 'error') && (
          <button type="button" className={styles.buttonGhost} onClick={() => setShowDetails((s) => !s)}>
            {showDetails ? 'Hide' : 'View'} technical details
          </button>
        )}
      </div>
      {showDetails && (
        <pre className={styles.details}>{logLines.join('\n') || 'No log output yet.'}</pre>
      )}
    </div>
  );
}

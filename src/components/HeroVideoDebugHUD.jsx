import { useEffect, useState } from 'react';
import styles from './HeroVideoDebugHUD.module.css';

// TEMPORARY DEBUG COMPONENT — remove once the hero video playback issue is
// confirmed fixed on both desktop and mobile, online and offline.
//
// This is strictly read-only: it polls document.querySelector('video') for
// its live state and listens for events HeroVideo.jsx dispatches about
// itself. It never calls play()/pause()/load(), never touches .src or
// .currentTime, and never clones or replaces the element — it only reads.

const READY_STATE_LABELS = ['HAVE_NOTHING', 'HAVE_METADATA', 'HAVE_CURRENT_DATA', 'HAVE_FUTURE_DATA', 'HAVE_ENOUGH_DATA'];
const NETWORK_STATE_LABELS = ['NETWORK_EMPTY', 'NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE'];

export default function HeroVideoDebugHUD() {
  const [info, setInfo] = useState(null);
  const [playState, setPlayState] = useState('unknown');
  const [revealCompleteAt, setRevealCompleteAt] = useState(null);

  useEffect(() => {
    const onDebugEvent = (e) => {
      if (e.detail.playState) setPlayState(e.detail.playState);
      if (typeof e.detail.revealCompleteAt === 'number') setRevealCompleteAt(e.detail.revealCompleteAt);
    };
    window.addEventListener('hero-video-debug', onDebugEvent);

    // Surface the service worker's own video-fetch diagnostics (see
    // videoFetchDiagnosticsPlugin in vite.config.js) in the page console —
    // the SW's own console context is easy to miss in DevTools.
    const onSwMessage = (event) => {
      if (event.data?.source === 'wraptors-sw') {
        console.log('[SW->page]', event.data.type, event.data);
      }
    };
    navigator.serviceWorker?.addEventListener('message', onSwMessage);

    let lastTime = null;
    const interval = setInterval(() => {
      const video = document.querySelector('video');
      if (!video) {
        setInfo(null);
        return;
      }
      const currentTime = video.currentTime;
      const advancing = lastTime !== null && !video.paused && currentTime > lastTime;
      lastTime = currentTime;
      setInfo({
        currentSrc: video.currentSrc,
        currentTime,
        readyState: video.readyState,
        networkState: video.networkState,
        paused: video.paused,
        ended: video.ended,
        errorCode: video.error?.code ?? null,
        errorMessage: video.error?.message ?? null,
        advancing,
      });
      // Read-only signal for other components (e.g. OfflinePresentationMode)
      // to independently know whether playback is actually progressing —
      // they still never touch the element themselves.
      window.dispatchEvent(new CustomEvent('hero-playback-status', { detail: { advancing } }));
    }, 250);

    return () => {
      window.removeEventListener('hero-video-debug', onDebugEvent);
      navigator.serviceWorker?.removeEventListener('message', onSwMessage);
      clearInterval(interval);
    };
  }, []);

  if (!info) return null;

  return (
    <div className={styles.hud}>
      <div className={styles.title}>HERO VIDEO DEBUG (temporary)</div>
      <div>src: {info.currentSrc ? decodeURIComponent(info.currentSrc.split('/').pop()) : '(none)'}</div>
      <div>
        currentTime: {info.currentTime.toFixed(2)}s{' '}
        <span className={info.advancing ? styles.ok : styles.warn}>{info.advancing ? '▲ advancing' : '■ not advancing'}</span>
      </div>
      <div>readyState: {info.readyState} ({READY_STATE_LABELS[info.readyState] || '?'})</div>
      <div>networkState: {info.networkState} ({NETWORK_STATE_LABELS[info.networkState] || '?'})</div>
      <div>paused: {String(info.paused)} · ended: {String(info.ended)}</div>
      <div>error: {info.errorCode !== null ? `code ${info.errorCode} — ${info.errorMessage}` : 'none'}</div>
      <div>play(): {playState}</div>
      {revealCompleteAt !== null && <div>reveal-complete currentTime: {revealCompleteAt.toFixed(2)}s</div>}
    </div>
  );
}

// Shared source of truth for the hero's presentation mode (video vs the
// static "safe mode" image). Persisted to localStorage so it survives
// refreshes and browser restarts; read once per page load (a mode change
// from the admin control triggers a reload rather than trying to hot-swap
// the hero's video/GSAP setup live, which is safer for something this
// stateful).
export const PRESENTATION_MODE_KEY = 'wraptors:presentationMode';
export const MODES = { VIDEO: 'video', SAFE: 'safe' };

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
}

function readStoredMode() {
  try {
    const stored = localStorage.getItem(PRESENTATION_MODE_KEY);
    return stored === MODES.VIDEO || stored === MODES.SAFE ? stored : null;
  } catch {
    return null; // localStorage unavailable (private browsing etc.)
  }
}

// No explicit preference yet: phones default to Safe Mode (the most
// reliable presentation experience — no autoplay/buffering/offline-caching
// dependency at all, just a local image), desktop keeps the original
// default of Video Mode. Either is switchable from the admin control.
export function getPresentationMode() {
  return readStoredMode() ?? (isMobileViewport() ? MODES.SAFE : MODES.VIDEO);
}

export function setPresentationMode(mode) {
  try {
    localStorage.setItem(PRESENTATION_MODE_KEY, mode);
  } catch {
    // Mode just won't persist — not fatal.
  }
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './HeroVideo.module.css';
import { getPresentationMode, MODES } from '../lib/presentationMode';
import heroSafeModeImage from '../assets/hero-safe-mode.jpg';
import heroVideoSrc from '../../final_hero(new).mp4';
// Extracted from final_hero(new).mp4 at t=3.0s — the exact timestamp
// `applyStartTime()` below always seeks to before playback begins. In Video
// Mode this is now also rendered as a permanent <img> layer (see below),
// not just a <video poster> — so it's what's visible the instant this
// section mounts, and for as long as actual playback hasn't started yet.
import heroPoster from '../assets/hero-poster.webp';

// TEMPORARY DEBUG — remove once the Safe Mode black-flash fix is confirmed
// on real devices. Logs image-readiness at the exact moment the intro
// clears, which is the only thing that actually proves there's no gap.
const DEBUG_HERO = true;

export default function HeroVideo() {
  // Read once per mount, synchronously, before first paint — the admin
  // control (PresentationAdminControl.jsx) changes this via a full page
  // reload rather than live-swapping the video/GSAP setup mid-session, so
  // there is never a render where the mode is unknown or defaults to the
  // wrong thing and then flips.
  const [mode] = useState(() => getPresentationMode());
  const isVideoMode = mode === MODES.VIDEO;

  const sectionRef    = useRef(null);
  const imageRef      = useRef(null); // permanent background image — always mounted, both modes, opacity 1 from first paint
  const videoRef      = useRef(null); // Video Mode only
  const line1Ref       = useRef(null);
  const line2Ref       = useRef(null);
  const rulerRef        = useRef(null);
  const subLineRef     = useRef(null);
  const scrollCueRef   = useRef(null);

  useEffect(() => {
    if (!DEBUG_HERO) return;
    const img = imageRef.current;
    console.log('[HeroDebug] permanent image mounted at', performance.now().toFixed(1), {
      mode,
      complete: img?.complete,
      naturalWidth: img?.naturalWidth,
    });
  }, [mode]);

  useEffect(() => {
    const section = sectionRef.current;

    // ── Text-only entrance — plays once, triggered by Hero.jsx's 'hero:exit'
    // (fired the instant its logo intro finishes sliding away), not by
    // scroll position or a fade tied to background readiness. The permanent
    // <img> below is already fully visible from the very first paint, so
    // there is nothing left for this timeline to reveal but the text —
    // the previous version's separate "entryOverlay" black plane (which
    // only started fading *after* this event fired) was itself the black
    // gap: Hero.jsx's own slide-away just uncovered *another* opaque black
    // layer, which then had its own fade still left to run.
    gsap.set([line1Ref.current, line2Ref.current], { opacity: 0, y: 36 });
    gsap.set(rulerRef.current, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(subLineRef.current, { opacity: 0, y: 20 });
    gsap.set(scrollCueRef.current, { opacity: 0, y: 8 });

    const entranceTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    entranceTl
      .to(line1Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, 0)
      .to(line2Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, 0.17)
      .to(rulerRef.current,   { scaleX: 1,  duration: 0.8 },       0.40)
      .to(subLineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.57)
      .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.80);

    let entrancePlayed = false;
    const playEntrance = () => {
      if (entrancePlayed) return;
      entrancePlayed = true;
      if (DEBUG_HERO) {
        const img = imageRef.current;
        const computed = img ? getComputedStyle(img).opacity : null;
        console.log('[HeroDebug] intro clears (HeroVideo side) at', performance.now().toFixed(1), {
          mode,
          complete: img?.complete,
          naturalWidth: img?.naturalWidth,
          computedOpacity: computed,
        });
      }
      entranceTl.play();
    };
    window.addEventListener('hero:exit', playEntrance, { once: true });
    // Safety net in case 'hero:exit' never fires for some reason.
    const entranceFallback = setTimeout(playEntrance, 6000);

    // Fade the scroll cue out once the user actually starts scrolling; back
    // in if they return to the very top. Only engages after the entrance
    // has run, so it can't fight the entrance timeline's own opacity tween.
    let cueHidden = false;
    const onScroll = () => {
      if (!entrancePlayed) return;
      const shouldHide = window.scrollY > 12;
      if (shouldHide !== cueHidden) {
        cueHidden = shouldHide;
        gsap.to(scrollCueRef.current, { opacity: shouldHide ? 0 : 1, duration: 0.35, ease: 'power2.out' });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Video-only setup — Safe Mode has no <video> element at all, just
    // the permanent <img> above. In Video Mode, the video starts invisible
    // (opacity 0) and only reveals itself once real playback begins (the
    // native 'playing' event, not just play() resolving) — so if autoplay
    // is blocked, slow, or fails outright, the permanent image underneath
    // is what the user sees instead of black. ──
    let cleanupVideo = () => {};
    if (isVideoMode) {
      const video = videoRef.current;
      gsap.set(video, { opacity: 0 });

      // Force muted as a JS property — iOS Safari ignores the HTML attribute alone
      // and will block autoplay if it detects any audio intent.
      video.muted = true;
      // Both forms of playsInline — React's `playsInline` prop covers the standard
      // attribute; this covers older WebKit (iPhone 6-era Safari).
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      // ── Start time: skip to the 3-second mark ─────────────────────────
      // Setting currentTime before readyState >= 1 silently fails on mobile.
      // We set it the moment metadata is available instead.
      const applyStartTime = () => {
        if (video.currentTime < 2.9) video.currentTime = 3;
      };

      if (video.readyState >= 1) {
        // Metadata already available (cached load)
        applyStartTime();
      } else {
        video.addEventListener('loadedmetadata', applyStartTime, { once: true });
      }

      // On every loop the browser rewinds to 0 — snap back to 3s immediately
      const skipIntro = () => {
        if (video.currentTime < 2.9) video.currentTime = 3;
      };
      video.addEventListener('timeupdate', skipIntro);

      // Reveal the video over the permanent image only once real frames are
      // actually being rendered — not merely when play() resolves.
      let videoRevealed = false;
      const onPlaying = () => {
        if (videoRevealed) return;
        videoRevealed = true;
        gsap.to(video, { opacity: 1, duration: 0.5, ease: 'power1.out' });
      };
      video.addEventListener('playing', onPlaying);

      // ── Autoplay strategy ─────────────────────────────────────────────
      // Guard: only call play() when the video is actually paused to avoid
      // AbortError from overlapping play() calls.
      const tryPlay = () => {
        if (!video.paused) return;
        video.play().catch(() => {
          // Blocked — permanent image stays visible; retries below cover later interaction
        });
      };

      // First attempt — works when browser allows muted autoplay immediately
      tryPlay();

      // iOS sometimes requires the first user gesture to unlock muted autoplay.
      // Attach to all common first-interaction events; {once} auto-removes them.
      const retryOnInteraction = () => tryPlay();
      document.addEventListener('touchstart',  retryOnInteraction, { once: true, passive: true });
      document.addEventListener('click',       retryOnInteraction, { once: true, passive: true });
      document.addEventListener('scroll',      retryOnInteraction, { once: true, passive: true });

      // Retry when the user returns to the tab (background → foreground on mobile)
      const onVisibilityChange = () => { if (!document.hidden) tryPlay(); };
      document.addEventListener('visibilitychange', onVisibilityChange);

      // Play when section enters viewport, pause when it leaves (battery / data)
      const playIo = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        },
        { threshold: 0.1 }
      );
      playIo.observe(section);

      cleanupVideo = () => {
        playIo.disconnect();
        video.removeEventListener('loadedmetadata', applyStartTime);
        video.removeEventListener('timeupdate',     skipIntro);
        video.removeEventListener('playing',        onPlaying);
        document.removeEventListener('touchstart',       retryOnInteraction);
        document.removeEventListener('click',            retryOnInteraction);
        document.removeEventListener('scroll',           retryOnInteraction);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    }

    return () => {
      cleanupVideo();
      window.removeEventListener('hero:exit', playEntrance);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(entranceFallback);
      entranceTl.kill();
    };
  }, [isVideoMode, mode]);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Permanent background image — mounted unconditionally on the very
          first render, opacity:1 from the start, never faded, never gated
          on load/onLoad/isLoaded. This is the one layer that must never be
          black: in Video Mode it's the frame-matched poster shown until
          real playback begins (or if it never does); in Safe Mode it's the
          whole background. */}
      <img
        ref={imageRef}
        src={isVideoMode ? heroPoster : heroSafeModeImage}
        alt=""
        className={`${styles.heroImage} ${!isVideoMode ? styles.heroImageSafe : ''}`}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
      {!isVideoMode && <div className={styles.heroImageGradient} aria-hidden="true" />}

      {isVideoMode && (
        <video
          ref={videoRef}
          className={styles.video}
          src={heroVideoSrc}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        />
      )}

      <div className={styles.fadeTop}    aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

      {/* Cinematic text block — Safe Mode gets a mobile-only modifier that
          anchors it above the car instead of centering it (see .heroImageSafe
          and .textOverlaySafeMobile). Video Mode's layout is untouched. */}
      <div
        className={`${styles.textOverlay} ${!isVideoMode ? styles.textOverlaySafeMobile : ''}`}
        aria-hidden="false"
      >
        <p ref={line1Ref} className={styles.mainLine}>Crafted with purpose.</p>
        <p ref={line2Ref} className={styles.mainLine}>Built for legacy.</p>
        <div ref={rulerRef} className={styles.ruler} aria-hidden="true" />
        <p ref={subLineRef} className={styles.subLine}>
          Luxury wraps&nbsp;&nbsp;·&nbsp;&nbsp;Paint protection&nbsp;&nbsp;·&nbsp;&nbsp;Vehicle transformation
        </p>
      </div>

      {/* Scroll indicator — present in both modes, fades out once the user
          actually starts scrolling (see the scroll listener above) */}
      <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollCueText}>Scroll</span>
        <span className={styles.scrollCueLine} />
        <svg className={styles.scrollCueChevron} width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

    </section>
  );
}

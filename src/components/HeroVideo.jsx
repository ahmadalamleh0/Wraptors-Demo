import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './HeroVideo.module.css';
import { getPresentationMode, MODES } from '../lib/presentationMode';
import heroSafeModeImage from '../assets/hero-safe-mode.jpg';
import heroVideoSrc from '../../final_hero(new).mp4';
// Extracted from final_hero(new).mp4 at t=3.0s — the exact timestamp
// `applyStartTime()` below always seeks to before playback begins (see
// "Start time" comment). That seek finishes long before the Hero.jsx logo
// intro's slide-away reveal completes (~3.9s after mount; see Hero.jsx's
// GSAP timeline + its 1.8s exit tween), so this poster is pixel-matched to
// the first frame this section ever actually shows — no jump on handoff.
// One shared source video/CSS treatment covers both desktop and mobile
// (see .video below), so a single poster is correct for both.
// The raw stream is stored portrait (see .video's rotate(-90deg) below);
// this poster is left in that same raw orientation so the shared CSS
// transform rotates both the poster and the live video frames identically.
import heroPoster   from '../assets/hero-poster.webp';

export default function HeroVideo() {
  // Read once per mount — the admin control (PresentationAdminControl.jsx)
  // changes this via a full page reload rather than live-swapping the
  // video/GSAP setup mid-session, so this never needs to react afterward.
  const [mode] = useState(() => getPresentationMode());
  const isVideoMode = mode === MODES.VIDEO;

  const sectionRef   = useRef(null);
  const videoRef     = useRef(null); // also doubles as the Safe Mode image's ref — only one of the two ever renders
  const overlayRef   = useRef(null);
  const line1Ref      = useRef(null);
  const line2Ref      = useRef(null);
  const rulerRef       = useRef(null);
  const subLineRef    = useRef(null);
  const scrollCueRef  = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const bg      = videoRef.current;

    // ── Entrance timeline — plays once, triggered by Hero.jsx's 'hero:exit'
    // (fired the instant its logo intro finishes sliding away), not by
    // scroll position. This section fills the same viewport Hero's fixed
    // overlay just vacated, so there's nothing to "scroll into" — a scrub
    // tied to scroll progress never made sense here and looked static.
    gsap.set(overlay, { opacity: 1 });
    gsap.set(bg, { opacity: 0.82 });
    gsap.set([line1Ref.current, line2Ref.current], { opacity: 0, y: 36 });
    gsap.set(rulerRef.current, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(subLineRef.current, { opacity: 0, y: 20 });
    gsap.set(scrollCueRef.current, { opacity: 0, y: 8 });

    const entranceTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    entranceTl
      .to(overlay, { opacity: 0, duration: 1.0 }, 0)
      .to(bg,      { opacity: 1, duration: 1.1 }, 0)
      .to(line1Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, 0.15)
      .to(line2Ref.current,   { opacity: 1, y: 0, duration: 0.9 }, 0.32)
      .to(rulerRef.current,   { scaleX: 1,  duration: 0.8 },       0.55)
      .to(subLineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.72)
      .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.95);

    let entrancePlayed = false;
    const playEntrance = () => {
      if (entrancePlayed) return;
      entrancePlayed = true;
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

    // ── Video-only setup — Safe Mode renders a static image instead, so
    // none of this autoplay/currentTime/network machinery applies to it. ──
    let cleanupVideo = () => {};
    if (isVideoMode) {
      const video = bg;

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

      // ── Autoplay strategy ─────────────────────────────────────────────
      // Guard: only call play() when the video is actually paused to avoid
      // AbortError from overlapping play() calls.
      const tryPlay = () => {
        if (!video.paused) return;
        video.play().catch(() => {
          // Blocked — poster stays visible; retries below cover later interaction
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
  }, [isVideoMode]);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Black entry plane — crossfades into whichever background below is
          active (video or the safe-mode image) as the entrance timeline plays */}
      <div ref={overlayRef} className={styles.entryOverlay} aria-hidden="true" />

      {isVideoMode ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={heroVideoSrc}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster={heroPoster}
        />
      ) : (
        <div
          ref={videoRef}
          className={styles.safeImage}
          style={{
            // Dedicated subtle darkening for this layer specifically (on
            // top of the shared fadeTop/fadeBottom/textOverlay vignette
            // below) — a still photo's highlights (chrome, floor lighting)
            // need a touch more help than moving video for text contrast.
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 42%, rgba(0,0,0,0.5) 100%), url(${heroSafeModeImage})`,
          }}
          role="img"
          aria-label="Wraptors-wrapped Lamborghini, rear three-quarter view, in a dark studio bay"
        />
      )}

      <div className={styles.fadeTop}    aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

      {/* Cinematic text block — Safe Mode gets a mobile-only modifier that
          anchors it above the car instead of centering it (see .safeImage
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

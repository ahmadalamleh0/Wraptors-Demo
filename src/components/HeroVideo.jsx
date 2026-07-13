import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  // Read once per mount — the admin control (PresentationAdminControl.jsx)
  // changes this via a full page reload rather than live-swapping the
  // video/GSAP setup mid-session, so this never needs to react afterward.
  const [mode] = useState(() => getPresentationMode());
  const isVideoMode = mode === MODES.VIDEO;

  const sectionRef  = useRef(null);
  const videoRef    = useRef(null);
  const overlayRef  = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const rulerRef    = useRef(null);
  const subLineRef  = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;

    gsap.set([line1Ref.current, line2Ref.current], { opacity: 0, y: 26 });
    gsap.set(rulerRef.current,  { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(subLineRef.current, { opacity: 0, y: 16 });

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ── Video-only setup — Safe Mode renders a static image instead, so
    // none of this autoplay/currentTime/network machinery applies to it. ──
    let cleanup = () => {};
    if (isVideoMode) {
      const video = videoRef.current;

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
      // TEMPORARY DEBUG: the 'hero-video-debug' dispatches below only report
      // the play() outcome for HeroVideoDebugHUD.jsx — remove both the event
      // dispatches and that component once playback issues are confirmed
      // fixed. They don't change autoplay/retry behavior at all.
      const tryPlay = () => {
        if (!video.paused) return;
        video.play().then(
          () => window.dispatchEvent(new CustomEvent('hero-video-debug', { detail: { playState: 'resolved' } })),
          (err) => {
            window.dispatchEvent(new CustomEvent('hero-video-debug', { detail: { playState: 'rejected', error: err?.message } }));
            // Blocked — poster stays visible; retries below cover later interaction
          }
        );
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

      // TEMPORARY DEBUG: Hero.jsx dispatches 'hero:exit' the instant its
      // slide-away intro finishes and the section is hidden — this is the
      // real "reveal complete" moment. Logging the video's actual currentTime
      // right here (not a calculated estimate) is what the hero poster frame
      // should be extracted from. Remove once the correct timestamp has been
      // captured and the poster is regenerated from it.
      const onHeroExit = () => {
        console.log(`Hero reveal complete — video.currentTime: ${video.currentTime}`);
        window.dispatchEvent(new CustomEvent('hero-video-debug', { detail: { revealCompleteAt: video.currentTime } }));
      };
      window.addEventListener('hero:exit', onHeroExit, { once: true });

      // Play when section enters viewport, pause when it leaves (battery / data)
      const playIo = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        },
        { threshold: 0.1 }
      );
      playIo.observe(section);

      cleanup = () => {
        playIo.disconnect();
        video.removeEventListener('loadedmetadata', applyStartTime);
        video.removeEventListener('timeupdate',     skipIntro);
        document.removeEventListener('touchstart',       retryOnInteraction);
        document.removeEventListener('click',            retryOnInteraction);
        document.removeEventListener('scroll',           retryOnInteraction);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('hero:exit', onHeroExit);
      };
    }

    // ── Section reveal — shared by both modes ─────────────────────────
    if (isMobile) {
      // Mobile: lightweight one-shot reveal on intersection — avoids ScrollTrigger RAF
      const revealIo = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(overlay,            { opacity: 0,  duration: 0.85, ease: 'power2.out', delay: 0.15 });
          gsap.to(line1Ref.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.52 });
          gsap.to(line2Ref.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.70 });
          gsap.to(rulerRef.current,   { scaleX: 1,  duration: 0.5, ease: 'power2.out', delay: 0.90 });
          gsap.to(subLineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.05 });
          revealIo.disconnect();
        },
        { threshold: 0.15 }
      );
      revealIo.observe(section);
      return () => { cleanup(); revealIo.disconnect(); };
    }

    // Desktop: full scroll-driven scrub
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 88%',
      end: 'top 10%',
      scrub: true,
      onUpdate(self) {
        const p = self.progress;
        gsap.set(overlay, { opacity: 1 - p });
        const t1 = Math.max(0, Math.min(1, (p - 0.46) / 0.36));
        const t2 = Math.max(0, Math.min(1, (p - 0.56) / 0.30));
        const tr = Math.max(0, Math.min(1, (p - 0.64) / 0.24));
        const ts = Math.max(0, Math.min(1, (p - 0.72) / 0.28));
        gsap.set(line1Ref.current,   { opacity: t1, y: 26 * (1 - t1) });
        gsap.set(line2Ref.current,   { opacity: t2, y: 26 * (1 - t2) });
        gsap.set(rulerRef.current,   { scaleX: tr });
        gsap.set(subLineRef.current, { opacity: ts, y: 16 * (1 - ts) });
      },
    });

    return () => { cleanup(); st.kill(); };
    // `isVideoMode` is derived once at mount (see the lazy useState above)
    // and never changes for the life of this component, so this effect is
    // still mount-only in practice.
  }, [isVideoMode]);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Black entry plane — scroll-driven fade (crossfades into whichever
          background below is active, video or the safe-mode image) */}
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

      {/* Cinematic text block */}
      <div className={styles.textOverlay} aria-hidden="false">
        <p ref={line1Ref} className={styles.mainLine}>Crafted with purpose.</p>
        <p ref={line2Ref} className={styles.mainLine}>Built for legacy.</p>
        <div ref={rulerRef} className={styles.ruler} aria-hidden="true" />
        <p ref={subLineRef} className={styles.subLine}>
          Luxury wraps&nbsp;&nbsp;·&nbsp;&nbsp;Paint protection&nbsp;&nbsp;·&nbsp;&nbsp;Vehicle transformation
        </p>
      </div>

    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroVideo.module.css';
import heroVideoSrc from '../../final_hero.mp4';
import heroPoster   from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const sectionRef  = useRef(null);
  const videoRef    = useRef(null);
  const overlayRef  = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const rulerRef    = useRef(null);
  const subLineRef  = useRef(null);

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    const overlay = overlayRef.current;

    gsap.set([line1Ref.current, line2Ref.current], { opacity: 0, y: 26 });
    gsap.set(rulerRef.current,  { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(subLineRef.current, { opacity: 0, y: 16 });

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Older iOS Safari needs this attribute set imperatively
    video.setAttribute('webkit-playsinline', '');

    // Attempt play immediately — works when autoPlay attribute fires early
    video.play().catch(() => {});

    // Retry the moment the user first touches or scrolls — covers iOS autoplay gate
    const retryPlay = () => { if (video.paused) video.play().catch(() => {}); };
    document.addEventListener('touchstart', retryPlay, { once: true, passive: true });
    document.addEventListener('scroll',     retryPlay, { once: true, passive: true });

    // Shared: play/pause video on visibility
    const playIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    playIo.observe(section);

    if (isMobile) {
      // Mobile: lightweight one-shot reveal — no ScrollTrigger RAF overhead
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
      return () => {
        playIo.disconnect();
        revealIo.disconnect();
        document.removeEventListener('touchstart', retryPlay);
        document.removeEventListener('scroll',     retryPlay);
      };
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

    return () => {
      playIo.disconnect();
      st.kill();
      document.removeEventListener('touchstart', retryPlay);
      document.removeEventListener('scroll',     retryPlay);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Black entry plane — scroll-driven fade */}
      <div ref={overlayRef} className={styles.entryOverlay} aria-hidden="true" />

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

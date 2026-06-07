import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroVideo.module.css';
import heroVideoSrc from '../../final_hero.mp4';

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

    // Initial hidden states for text
    gsap.set([line1Ref.current, line2Ref.current], { opacity: 0, y: 26 });
    gsap.set(rulerRef.current,  { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(subLineRef.current, { opacity: 0, y: 16 });

    // Auto-play when section enters viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(section);

    // Scroll-driven reveal: overlay fades first, text appears in the second half
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 88%',
      end: 'top 10%',
      scrub: true,
      onUpdate(self) {
        const p = self.progress;

        // Overlay fades across the full scroll range
        gsap.set(overlay, { opacity: 1 - p });

        // Text elements cascade in during the second half
        const t1 = Math.max(0, Math.min(1, (p - 0.46) / 0.36));
        const t2 = Math.max(0, Math.min(1, (p - 0.56) / 0.30));
        const tr = Math.max(0, Math.min(1, (p - 0.64) / 0.24));
        const ts = Math.max(0, Math.min(1, (p - 0.72) / 0.28));

        gsap.set(line1Ref.current,  { opacity: t1, y: 26 * (1 - t1) });
        gsap.set(line2Ref.current,  { opacity: t2, y: 26 * (1 - t2) });
        gsap.set(rulerRef.current,  { scaleX: tr });
        gsap.set(subLineRef.current, { opacity: ts, y: 16 * (1 - ts) });
      },
    });

    return () => {
      io.disconnect();
      st.kill();
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
        muted
        playsInline
        loop
        preload="metadata"
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

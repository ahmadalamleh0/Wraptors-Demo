import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroVideo.module.css';
import heroVideoSrc from '../../Hero_new.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    const overlay = overlayRef.current;

    // Auto-play when section enters viewport, pause when it leaves
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

    // Fade black entry-overlay out as section scrolls into view
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 88%',
      end: 'top 10%',
      scrub: true,
      onUpdate(self) {
        gsap.set(overlay, { opacity: 1 - self.progress });
      },
    });

    return () => {
      io.disconnect();
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Fades from hero's black background into the video */}
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

      {/* Top / bottom gradients for seamless blending */}
      <div className={styles.fadeTop}    aria-hidden="true" />
      <div className={styles.fadeBottom} aria-hidden="true" />

    </section>
  );
}

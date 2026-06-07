import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Statement.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = section.querySelector('[data-overlay]');
    const lines   = gsap.utils.toArray('[data-line]', section);
    const ruler   = section.querySelector('[data-ruler]');
    const impact  = section.querySelector('[data-impact]');

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      // ── Mobile: no pin, no scrub — IntersectionObserver + simple GSAP tweens ──
      // Hide overlay immediately; the white section just appears on scroll naturally
      gsap.set(overlay, { display: 'none' });
      gsap.set([...lines, impact], { opacity: 0, y: 18 });
      gsap.set(ruler, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(lines[0], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.05 });
          gsap.to(lines[1], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.22 });
          gsap.to(ruler,    { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out', delay: 0.42 });
          gsap.to(lines[2], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.58 });
          gsap.to(impact,   { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.78 });
          io.disconnect();
        },
        { threshold: 0.15 }
      );
      io.observe(section);
      return () => io.disconnect();
    }

    // ── Desktop: full GSAP pin + scrub ──────────────────────────────────
    const ctx = gsap.context(() => {
      gsap.set(lines,  { opacity: 0, y: 22 });
      gsap.set(ruler,  { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(impact, { opacity: 0, y: 22, scale: 1.03 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        },
      });

      tl.to(overlay, { opacity: 0, duration: 0.8 }, 0);
      tl.to(lines[0], { opacity: 1, y: 0, duration: 0.6 }, 0.9);
      tl.to(lines[1], { opacity: 1, y: 0, duration: 0.6 }, 1.4);
      tl.to(ruler,    { scaleX: 1, duration: 0.5 },         1.85);
      tl.to(lines[2], { opacity: 1, y: 0, duration: 0.6 }, 2.3);
      tl.to(impact,   { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 2.9);
      tl.to(overlay, { opacity: 1, duration: 0.8 }, 4.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      <div data-overlay className={styles.blackOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <p data-line className={styles.contextLine}>
          WHEN YOU DRIVE WITH WRAPTORS,
        </p>
        <p data-line className={styles.contextLine}>
          YOU&apos;RE TELLING THE WORLD
        </p>
        <div data-ruler className={styles.ruler} aria-hidden="true" />
        <p data-line className={styles.declareLine}>
          I DON&apos;T FOLLOW TRENDS,
        </p>
        <p data-impact className={styles.impactLine}>
          I MAKE THEM
        </p>
      </div>

    </section>
  );
}

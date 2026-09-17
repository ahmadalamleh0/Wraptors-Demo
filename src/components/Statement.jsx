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

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile) {
      // ── Mobile: overlay stays visible initially so Statement never bleeds through below HeroVideo
      // It fades out once the section properly enters the viewport, then text cascades in
      gsap.set(lines, { opacity: 0, y: 18 });
      gsap.set(lines[1], { scale: 1.04 });
      gsap.set(ruler, { opacity: 0, scaleX: 0, transformOrigin: 'left center' });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(overlay,  { opacity: 0, duration: 0.55, ease: 'power2.out' });
          gsap.to(lines[0], { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.18 });
          gsap.to(ruler,    { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out', delay: 0.5 });
          gsap.to(lines[1], { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power2.out', delay: 0.75 });
          io.disconnect();
        },
        { threshold: 0.25 }
      );
      io.observe(section);
      return () => io.disconnect();
    }

    // ── Desktop: full GSAP pin + scrub ──────────────────────────────────
    const ctx = gsap.context(() => {
      gsap.set(lines, { opacity: 0, y: 22 });
      gsap.set(lines[1], { scale: 1.03 });
      gsap.set(ruler, { scaleX: 0, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 1,
        },
      });

      tl.to(overlay, { opacity: 0, duration: 0.8 }, 0);
      tl.to(lines[0], { opacity: 1, y: 0, duration: 0.6 }, 0.6);
      tl.to(ruler,    { scaleX: 1, duration: 0.5 },         1.1);
      tl.to(lines[1], { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 1.5);
      tl.to(overlay,  { opacity: 1, duration: 0.6 }, 2.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      <div data-overlay className={styles.blackOverlay} aria-hidden="true" />

      {/* Single statement — the section that used to build up to a second,
          bigger line now centers entirely on this one. */}
      <div className={styles.inner}>
        <p data-line className={styles.contextLine}>
          WHEN YOU DRIVE WRAPTORS,
        </p>
        <div data-ruler className={styles.ruler} aria-hidden="true" />
        <p data-line className={styles.mainLine}>
          YOU SET THE TONE.
        </p>
      </div>

    </section>
  );
}

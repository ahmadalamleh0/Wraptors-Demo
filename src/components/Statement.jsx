import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Statement.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const overlay = section.querySelector('[data-overlay]');
      const lines   = gsap.utils.toArray('[data-line]', section);
      const ruler   = section.querySelector('[data-ruler]');
      const impact  = section.querySelector('[data-impact]');

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

      // Entry — black dissolves, pure white revealed
      tl.to(overlay, { opacity: 0, duration: 0.8 }, 0);

      // Text reveals line by line
      tl.to(lines[0], { opacity: 1, y: 0, duration: 0.6 }, 0.9);
      tl.to(lines[1], { opacity: 1, y: 0, duration: 0.6 }, 1.4);
      tl.to(ruler,    { scaleX: 1, duration: 0.5 },         1.85);
      tl.to(lines[2], { opacity: 1, y: 0, duration: 0.6 }, 2.3);
      tl.to(impact,   { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 2.9);

      // Let it breathe at full white — then exit
      tl.to(overlay, { opacity: 1, duration: 0.8 }, 4.4);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* Full-screen black plane — entry dissolves it, exit restores it */}
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

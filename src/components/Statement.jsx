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
      // ── Mobile: tied directly to scroll position (scrub, no pin) rather
      // than a fixed-duration timer fired once on entry. A timer was fine
      // for the old, much taller section, but on the shortened section it
      // could still be mid-reveal after the section had already scrolled
      // past, which read as a jump-cut into Masterpieces. Scrubbing means
      // the reveal always finishes in sync with actual scroll position, no
      // matter how tall the section is, and it reverses cleanly on scroll
      // up for free. No pin either: this is a quick editorial beat, not a
      // full-screen held moment, so no extra scroll distance is added —
      // the "hold" is just the section's own remaining height after the
      // reveal completes, scrolled through normally.
      gsap.set(lines, { opacity: 0, y: 14 });
      gsap.set(lines[1], { scale: 1.03 });
      gsap.set(ruler, { scaleX: 0, transformOrigin: 'left center' });

      // With the section this short, a wide viewport-percent scrub range
      // (e.g. the old 82%→30%) outlasts the section's own height, so the
      // reveal was still finishing well after Masterpieces had already
      // started creeping into view below it — no hold, just overlap. This
      // narrower range keeps the reveal's scroll distance smaller than the
      // section's own remaining height after it, leaving a brief but real
      // gap before the next section arrives.
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 82%',
            scrub: true,
          },
        });

        tl.to(overlay,  { opacity: 0, duration: 0.22 }, 0);
        tl.to(lines[0], { opacity: 1, y: 0, duration: 0.22 }, 0.16);
        tl.to(ruler,    { scaleX: 1, duration: 0.18 }, 0.42);
        tl.to(lines[1], { opacity: 1, y: 0, scale: 1, duration: 0.26 }, 0.58);
      }, sectionRef);

      return () => ctx.revert();
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
          WHEN YOU DRIVE A WRAPTORS BUILD,
        </p>
        <div data-ruler className={styles.ruler} aria-hidden="true" />
        <p data-line className={styles.mainLine}>
          YOU SET THE TONE.
        </p>
      </div>

    </section>
  );
}

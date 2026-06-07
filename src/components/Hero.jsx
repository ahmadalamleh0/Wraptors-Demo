import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';

gsap.registerPlugin(ScrollTrigger);

// Floating star particles: [x%, y%, sizePx, delaySec, durationSec, driftXpx]
const PARTICLES = [
  [10, 22, 2.0, 0.8, 5.5,  3], [38, 12, 1.6, 2.4, 6.0, -3],
  [62, 30, 2.2, 0.3, 5.8,  4], [80, 20, 1.8, 1.6, 5.2, -2],
  [22, 55, 1.5, 3.0, 6.4,  3], [54, 68, 2.0, 0.7, 5.6, -4],
  [76, 58, 1.7, 2.2, 4.8,  3], [91, 40, 1.5, 0.4, 6.2, -2],
  [45, 80, 2.1, 1.4, 5.4,  4], [30, 42, 1.6, 3.6, 5.0, -3],
  [66, 10, 1.8, 0.6, 6.0,  2], [16, 70, 1.7, 1.8, 5.8, -3],
  [84, 72, 1.5, 2.8, 4.6,  3], [50, 35, 2.2, 4.0, 5.2, -2],
  [6,  48, 1.6, 1.2, 6.4,  4], [72, 85, 1.8, 3.2, 5.0, -3],
];

export default function Hero() {
  const sectionRef    = useRef(null);
  const bgGlowRef     = useRef(null);
  const spotRef       = useRef(null);
  const lockupRef     = useRef(null);
  const logoWrapRef   = useRef(null);
  const logoImgRef    = useRef(null);
  const topTextRef    = useRef(null);   // WRAPTORS MAFIA
  const bottomTextRef = useRef(null);   // LOYALTY OVER ROYALTY
  const estRef        = useRef(null);   // EST.
  const yearRef       = useRef(null);   // 2016
  const scrollRef     = useRef(null);

  useEffect(() => {
    const lockup = lockupRef.current;
    const img    = logoImgRef.current;
    const topTxt = topTextRef.current;
    const botTxt = bottomTextRef.current;
    const bg     = bgGlowRef.current;
    const spot   = spotRef.current;
    const est    = estRef.current;
    const year   = yearRef.current;

    // ── 1. Initial hidden states ──────────────────────────────────────
    gsap.set(lockup, { opacity: 0, y: 0 });
    gsap.set(img,    { filter: 'blur(24px) brightness(0)' });
    // Text starts fully clipped (right-to-left), tight spacing, hot filter
    gsap.set(topTxt, {
      clipPath: 'inset(0 100% 0 0)',
      x: -6,
      letterSpacing: '0.05em',
      filter: 'brightness(2.4) contrast(1.6)',
    });
    gsap.set(botTxt, {
      clipPath: 'inset(0 100% 0 0)',
      x: -6,
      letterSpacing: '0.18em',
      filter: 'brightness(2.4) contrast(1.6)',
    });
    gsap.set([est, year], { opacity: 0 });
    gsap.set(bg,   { opacity: 0 });
    gsap.set(spot, { opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });

    // ── 2. Reveal timeline ────────────────────────────────────────────
    const tl = gsap.timeline();

    // Background atmosphere
    tl.to(bg,   { opacity: 1, duration: 4.5, ease: 'power2.inOut' }, 0);
    tl.to(spot, { opacity: 1, duration: 3.0, ease: 'power2.out'   }, 0.3);

    // Lockup fades in
    tl.to(lockup, { opacity: 1, duration: 1.2, ease: 'power3.inOut' }, 0.3);

    // Logo: tighter 4-phase blur-to-sharp — fully resolved before text begins
    tl.to(img, { filter: 'blur(14px) brightness(0.12)', duration: 0.6,  ease: 'power2.out'   }, 0.4);
    tl.to(img, { filter: 'blur(6px)  brightness(0.42)', duration: 0.55, ease: 'power2.out'   }, 0.9);
    tl.to(img, { filter: 'blur(1px)  brightness(0.82)', duration: 0.45, ease: 'power2.inOut' }, 1.35);
    tl.to(img, { filter: 'blur(0px)  brightness(1.0)',  duration: 0.3,  ease: 'power3.out'   }, 1.7);
    // Logo fully sharp at ~2.0s

    // Engraved carve: WRAPTORS MAFIA — starts once logo is sharp
    tl.to(topTxt, {
      clipPath: 'inset(0 0% 0 0)',
      x: 0,
      letterSpacing: '0.18em',
      filter: 'brightness(1.0) contrast(1.0)',
      duration: 1.4,
      ease: 'power4.inOut',
    }, 2.05);

    // Engraved carve: LOYALTY OVER ROYALTY
    tl.to(botTxt, {
      clipPath: 'inset(0 0% 0 0)',
      x: 0,
      letterSpacing: '0.56em',
      filter: 'brightness(1.0) contrast(1.0)',
      duration: 1.3,
      ease: 'power4.inOut',
    }, 2.7);

    // EST. / 2016 settle in last
    tl.to(est,  { opacity: 1, duration: 0.6, ease: 'power2.out' }, 3.5);
    tl.to(year, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 3.65);

    // Scroll cue
    tl.to(scrollRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 4.8);

    // ── 3. Scroll: whole lockup drifts up and fades out cleanly ──────
    // No repositioning. No gold. The fixed lockup simply disappears.
    let st;
    const stTimer = setTimeout(() => {
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate(self) {
          const p = self.progress;

          gsap.set(lockup, {
            opacity: gsap.utils.clamp(0, 1, 1 - p * 1.8),
            y: -50 * p,
          });

          gsap.set(bg,   { opacity: gsap.utils.clamp(0, 1, 1 - p * 2.2) });
          gsap.set(spot, { opacity: gsap.utils.clamp(0, 1, 1 - p * 2.2) });
          gsap.set(scrollRef.current, { opacity: gsap.utils.clamp(0, 1, 1 - p * 5) });
        },
      });
    }, 150);

    return () => {
      tl.kill();
      clearTimeout(stTimer);
      if (st) st.kill();
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className={styles.hero}>

      <div ref={bgGlowRef} className={styles.bgGlow}   aria-hidden="true" />
      <div ref={spotRef}   className={styles.spotlight} aria-hidden="true" />

      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map(([x, y, s, d, dr, dx], i) => (
          <span key={i} className={styles.particle} style={{
            left:       `${x}%`,
            top:        `${y}%`,
            width:      `${s}px`,
            height:     `${s}px`,
            '--pdelay': `${d}s`,
            '--pdur':   `${dr}s`,
            '--pdx':    `${dx}px`,
          }} />
        ))}
      </div>

      <div ref={lockupRef} className={styles.lockup}>

        {/* Logo row: EST. | inner logo | 2016 */}
        <div className={styles.logoRow}>
          <span ref={estRef} className={styles.sideText}>EST.</span>
          <div ref={logoWrapRef} className={styles.logoWrap}>
            <WraptorsMafiaLogo ref={logoImgRef} className={styles.badgeImg} />
          </div>
          <span ref={yearRef} className={styles.sideText}>2016</span>
        </div>

        <p ref={topTextRef}    className={styles.topText}>WRAPTORS MAFIA</p>
        <p ref={bottomTextRef} className={styles.bottomText}>LOYALTY OVER ROYALTY</p>

        <div ref={scrollRef} className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollText}>SCROLL</span>
          <span className={styles.scrollBar} />
          <span className={styles.scrollDot} />
        </div>

      </div>

    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';

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
  const brandRuleRef  = useRef(null);   // hairline divider
  const bottomTextRef = useRef(null);   // LOYALTY OVER ROYALTY
  const estRef        = useRef(null);   // EST.
  const yearRef       = useRef(null);   // 2016
  const scrollRef     = useRef(null);

  useEffect(() => {
    const lockup    = lockupRef.current;
    const img       = logoImgRef.current;
    const topTxt    = topTextRef.current;
    const brandRule = brandRuleRef.current;
    const botTxt    = bottomTextRef.current;
    const bg        = bgGlowRef.current;
    const spot      = spotRef.current;
    const est       = estRef.current;
    const year      = yearRef.current;
    const section   = sectionRef.current;

    // ── 1. Initial hidden states ──────────────────────────────────────
    gsap.set(lockup, { opacity: 0 });
    gsap.set(img,    { filter: 'blur(24px) brightness(0)' });
    // Text: fade up from below — crisp, no fog or clip-wipe glow
    gsap.set(topTxt,    { opacity: 0, y: 10 });
    gsap.set(botTxt,    { opacity: 0, y: 7  });
    gsap.set(brandRule, { opacity: 0, scaleX: 0 });
    gsap.set([est, year], { opacity: 0 });
    gsap.set(bg,   { opacity: 0 });
    gsap.set(spot, { opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });

    // ── 2. Reveal timeline ────────────────────────────────────────────
    const tl = gsap.timeline();

    // Background atmosphere
    tl.to(bg,   { opacity: 1, duration: 2.0, ease: 'power2.inOut' }, 0);
    tl.to(spot, { opacity: 1, duration: 1.4, ease: 'power2.out'   }, 0);

    // Lockup snaps in fast
    tl.to(lockup, { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, 0.05);

    // Logo: 3-phase blur-to-sharp, sharp at ~0.62s
    tl.to(img, {
      keyframes: [
        { filter: 'blur(10px) brightness(0.2)', duration: 0.20, ease: 'power2.out' },
        { filter: 'blur(2px)  brightness(0.75)', duration: 0.22, ease: 'power2.out' },
        { filter: 'blur(0px)  brightness(1.0)',  duration: 0.18, ease: 'power3.out' },
      ],
    }, 0.02);
    // Logo sharp at ~0.62s

    // WRAPTORS MAFIA — clean fade up, no fog
    tl.to(topTxt, {
      opacity: 1, y: 0,
      duration: 0.62,
      ease: 'power3.out',
    }, 0.60);

    // Hairline rule expands from center — bridges brand name and motto
    tl.to(brandRule, {
      opacity: 1, scaleX: 1,
      duration: 0.40,
      ease: 'power2.inOut',
      transformOrigin: 'center',
    }, 1.05);

    // LOYALTY OVER ROYALTY — clean fade up, slightly after rule
    tl.to(botTxt, {
      opacity: 1, y: 0,
      duration: 0.55,
      ease: 'power3.out',
    }, 1.15);

    // EST. / 2016
    tl.to(est,  { opacity: 1, duration: 0.35, ease: 'power2.out' }, 1.60);
    tl.to(year, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 1.70);

    // ── 3. Exit: slide the whole overlay upward immediately after reveal ──
    // The hero is a fixed overlay (z-index 40). Animating translateY on it
    // moves the lockup with it (fixed children re-parent when parent has a
    // CSS transform). No scroll required — the transition is pure animation.
    let exitFired = false;
    let exitTween = null;

    function runExit() {
      if (exitFired || !section) return;
      exitFired = true;
      window.removeEventListener('scroll',     onUserInput);
      window.removeEventListener('touchstart', onUserInput);
      exitTween = gsap.to(section, {
        y: '-100%',
        duration: 1.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (sectionRef.current) sectionRef.current.style.display = 'none';
        },
      });
    }

    // Early exit: if user scrolls or taps before the reveal finishes, run immediately
    const onUserInput = () => runExit();
    window.addEventListener('scroll',     onUserInput, { once: true, passive: true });
    window.addEventListener('touchstart', onUserInput, { once: true, passive: true });

    // Auto exit right when the last reveal animation completes
    tl.call(runExit, null, '>');

    return () => {
      tl.kill();
      if (exitTween) exitTween.kill();
      window.removeEventListener('scroll',     onUserInput);
      window.removeEventListener('touchstart', onUserInput);
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

        <p ref={topTextRef} className={styles.topText}>WRAPTORS MAFIA</p>
        <div ref={brandRuleRef} className={styles.brandRule} aria-hidden="true" />
        <p ref={bottomTextRef} className={styles.bottomText}>LOYALTY&nbsp;OVER&nbsp;ROYALTY</p>

        <div ref={scrollRef} className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollText}>SCROLL</span>
          <span className={styles.scrollBar} />
          <span className={styles.scrollDot} />
        </div>

      </div>

    </section>
  );
}

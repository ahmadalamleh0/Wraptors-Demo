import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';

export default function Hero() {
  const sectionRef    = useRef(null);
  const lockupRef     = useRef(null);
  const logoWrapRef   = useRef(null);
  const logoClipRef   = useRef(null);  // clips the SVG; blade is sibling, not clipped
  const logoImgRef    = useRef(null);
  const bladeRef      = useRef(null);
  const topTextRef    = useRef(null);
  const brandRuleRef  = useRef(null);
  const bottomTextRef = useRef(null);
  const estRef        = useRef(null);
  const yearRef       = useRef(null);
  const scrollRef     = useRef(null);

  useEffect(() => {
    const lockup    = lockupRef.current;
    const logoClip  = logoClipRef.current;
    const img       = logoImgRef.current;
    const blade     = bladeRef.current;
    const topTxt    = topTextRef.current;
    const brandRule = brandRuleRef.current;
    const botTxt    = bottomTextRef.current;
    const est       = estRef.current;
    const year      = yearRef.current;
    const section   = sectionRef.current;

    // TEMPORARY DEBUG — remove once the Safe Mode black-flash fix is
    // confirmed on real devices.
    console.log('[HeroDebug] Intro starts at', performance.now().toFixed(1));

    // ── 1. Initial states ─────────────────────────────────────────────
    gsap.set(lockup,   { opacity: 0 });
    gsap.set(logoClip, { clipPath: 'inset(0 0 100% 0)' }); // hidden; reveals top-to-bottom
    gsap.set(img,      { filter: 'brightness(1.0)' });
    gsap.set(blade,    { top: '0%', opacity: 0 });
    gsap.set(topTxt,   { clipPath: 'inset(0 0 100% 0)', opacity: 0 });
    gsap.set(botTxt,   { clipPath: 'inset(0 0 100% 0)', opacity: 0 });
    gsap.set(brandRule,    { scaleX: 0, opacity: 0 });
    gsap.set([est, year],  { opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });

    // ── 2. Reveal timeline ────────────────────────────────────────────
    const tl = gsap.timeline();

    // Lockup becomes active against pure black
    tl.to(lockup, { opacity: 1, duration: 0.04, ease: 'none' }, 0.06);

    // Blade appears at top edge of logo
    tl.to(blade, { opacity: 1, duration: 0.05, ease: 'none' }, 0.10);

    // Blade cuts downward; logo clips in exactly in sync — engraved into screen
    tl.to(blade,    { top: '100%',                duration: 0.54, ease: 'power1.inOut' }, 0.14);
    tl.to(logoClip, { clipPath: 'inset(0 0 0% 0)', duration: 0.54, ease: 'power1.inOut' }, 0.14);

    // Blade exits — brief gleam as the cut completes, then settles pure white
    tl.to(blade, { opacity: 0, duration: 0.05, ease: 'none' }, 0.67);
    tl.to(img,   { filter: 'brightness(1.14)', duration: 0.08, ease: 'none' }, 0.66);
    tl.to(img,   { filter: 'brightness(1.0)',  duration: 0.32, ease: 'power2.out' }, 0.74);

    // "WRAPTORS MAFIA" — etched downward, same cut technique
    tl.to(topTxt, {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.26,
      ease: 'power2.inOut',
    }, 0.90);

    // Hairline rule — drawn from center out
    tl.to(brandRule, {
      opacity: 1,
      scaleX: 1,
      duration: 0.18,
      ease: 'power2.inOut',
      transformOrigin: 'center',
    }, 1.18);

    // "LOYALTY OVER ROYALTY"
    tl.to(botTxt, {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.22,
      ease: 'power2.out',
    }, 1.34);

    // EST. / 2016 — quiet, last to appear
    tl.to(est,  { opacity: 1, duration: 0.20, ease: 'power1.out' }, 1.56);
    tl.to(year, { opacity: 1, duration: 0.20, ease: 'power1.out' }, 1.64);

    // Scroll cue
    tl.to(scrollRef.current, { opacity: 1, duration: 0.38, ease: 'power1.out' }, 1.74);

    // ── 3. Exit: slide overlay upward ─────────────────────────────────
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
          // TEMPORARY DEBUG — remove alongside the one above.
          console.log('[HeroDebug] Intro clears at', performance.now().toFixed(1));
          window.dispatchEvent(new CustomEvent('hero:exit'));
        },
      });
    }

    const onUserInput = () => runExit();
    window.addEventListener('scroll',     onUserInput, { once: true, passive: true });
    window.addEventListener('touchstart', onUserInput, { once: true, passive: true });
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

      <div ref={lockupRef} className={styles.lockup}>

        <div className={styles.logoRow}>
          <span ref={estRef} className={styles.sideText}>EST.</span>

          <div ref={logoWrapRef} className={styles.logoWrap}>
            {/* logoClip is clipped; blade is a sibling so it stays visible */}
            <div ref={logoClipRef} className={styles.logoClip}>
              <WraptorsMafiaLogo ref={logoImgRef} className={styles.badgeImg} />
            </div>
            <div ref={bladeRef} className={styles.engraveBlade} aria-hidden="true" />
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

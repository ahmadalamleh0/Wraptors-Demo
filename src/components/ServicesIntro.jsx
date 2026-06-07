import { useEffect, useRef } from 'react';
import styles from './ServicesIntro.module.css';

export default function ServicesIntro() {
  const sectionRef = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const ruleRef    = useRef(null);
  const subRef     = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        line1Ref.current?.classList.add(styles.visible);
        setTimeout(() => line2Ref.current?.classList.add(styles.visible), 220);
        setTimeout(() => ruleRef.current?.classList.add(styles.visible),  460);
        setTimeout(() => subRef.current?.classList.add(styles.visible),   620);
        io.disconnect();
      },
      { threshold: 0.20 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.fadeTop} aria-hidden="true" />

      <div className={styles.content}>
        <h2 className={styles.heading}>
          <span ref={line1Ref} className={`${styles.line} ${styles.lineSmall}`}>
            THE WRAPTORS
          </span>
          <span ref={line2Ref} className={`${styles.line} ${styles.lineLarge}`}>
            STANDARD
          </span>
        </h2>
        <div ref={ruleRef} className={styles.rule} aria-hidden="true" />
        <p ref={subRef} className={styles.subline}>
          Luxury wraps, protection, tint, and customization built around presence.
        </p>
      </div>

      <div className={styles.fadeBottom} aria-hidden="true" />
    </section>
  );
}

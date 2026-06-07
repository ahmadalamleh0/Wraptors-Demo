import { useEffect, useRef } from 'react';
import styles from './ServicesIntro.module.css';

export default function ServicesIntro() {
  const sectionRef = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => line1Ref.current?.classList.add(styles.visible), 300);
        setTimeout(() => line2Ref.current?.classList.add(styles.visible), 480);
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.fadeTop} aria-hidden="true" />

      <div className={styles.content}>
        <h2 className={styles.heading}>
          <span ref={line1Ref} className={styles.line}>OUR</span>
          <span ref={line2Ref} className={styles.line}>SERVICES</span>
        </h2>
      </div>

      <div className={styles.fadeBottom} aria-hidden="true" />
    </section>
  );
}

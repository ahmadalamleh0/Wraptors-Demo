import styles from './ServiceHero.module.css';

// Shared hero for every service page — identical structure, positioning,
// typography hierarchy, spacing and overlay treatment everywhere. Only the
// media (video / image / canvas, passed in as `media`) and the wording
// change per page. Do not fork this per service — extend it instead.
export default function ServiceHero({
  eyebrow,
  headline,
  supportingLine,
  ctaLabel = 'Start Your Project',
  ctaHref = '#cta',
  media,
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>{media}</div>
      <div className={styles.heroOverlay}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.headline}>{headline}</h1>
        <span className={styles.heroSubline}>{supportingLine}</span>
        <a href={ctaHref} className={styles.cta}>
          {ctaLabel} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

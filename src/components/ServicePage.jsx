import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './ServicePage.module.css';

export default function ServicePage({ title, eyebrow, tagline, heroImg }) {
  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          {heroImg && (
            <img src={heroImg} className={styles.heroImg} alt={title} />
          )}
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroCurtainTop} aria-hidden="true" />
          <div className={styles.heroCurtainBottom} aria-hidden="true" />

          <div className={styles.heroContent}>
            <Link to="/" className={styles.backBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              All Services
            </Link>

            <span className={styles.eyebrow}>{eyebrow || 'Wraptors Service'}</span>
            <h1 className={styles.headline}>{title}</h1>
            {tagline && <p className={styles.tagline}>{tagline}</p>}

            <a href="/#cta" className={styles.heroCta}>
              Get a Quote
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* ── Coming Soon ── */}
        <section className={styles.coming}>
          <div className={styles.comingInner}>
            <div className={styles.comingRule} aria-hidden="true" />
            <span className={styles.comingEyebrow}>Interactive Experience</span>
            <h2 className={styles.comingTitle}>Coming Soon</h2>
            <p className={styles.comingSub}>
              We're crafting a premium interactive tool for this service —
              colour explorers, coverage calculators, and more.
              In the meantime, reach out directly to start your build.
            </p>
            <a href="/#cta" className={styles.comingCta}>
              Start Your Build →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

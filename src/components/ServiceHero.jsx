import styles from './ServiceHero.module.css';
import { STUDIO_PHONE, STUDIO_PHONE_DISPLAY } from '../lib/studioContact';
import { START_PROJECT_WHATSAPP_URL } from '../lib/whatsappEnquiry';

// Shared hero for every service page — identical structure, positioning,
// typography hierarchy, spacing and overlay treatment everywhere. Only the
// media (video / image / canvas, passed in as `media`) and the wording
// change per page. Do not fork this per service — extend it instead.
export default function ServiceHero({
  eyebrow,
  headline,
  supportingLine,
  ctaLabel = 'Start Your Project',
  ctaHref = START_PROJECT_WHATSAPP_URL,
  media,
  // Set true for a headline that spans two lines (pass the break as \n in
  // the string) — sizes it down so a two-line headline doesn't take up
  // noticeably more of the hero than the usual single-line version.
  compactHeadline = false,
  // Set true to push the whole text group down into the lower part of the
  // hero (e.g. when the shot's main subject sits higher in frame and the
  // usual position covers it) — same content, just anchored lower.
  lowerContent = false,
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>{media}</div>
      <div className={`${styles.heroOverlay} ${lowerContent ? styles.heroOverlayLower : ''}`}>
        {/* The eyebrow sits inside the H1 so the page heading carries the
            service + city ("Wraptors Dubai · Ceramic Coating") as well as
            the cinematic line. .heading is display: contents — the layout
            is identical to the eyebrow and headline as separate siblings. */}
        <h1 className={styles.heading}>
          <span className={styles.eyebrow}>{eyebrow}</span>{' '}
          <span className={`${styles.headline} ${compactHeadline ? styles.headlineCompact : ''}`}>{headline}</span>
        </h1>
        <span className={styles.heroSubline}>{supportingLine}</span>
        <div className={styles.ctaRow}>
          <a
            href={ctaHref}
            className={styles.cta}
            {...(ctaHref.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {ctaLabel} <span aria-hidden="true">→</span>
          </a>
          {/* Understated phone link beside the CTA. */}
          <a href={`tel:${STUDIO_PHONE}`} className={styles.callLink} aria-label={`Call the studio: ${STUDIO_PHONE_DISPLAY}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call the Studio
          </a>
        </div>
      </div>
    </section>
  );
}

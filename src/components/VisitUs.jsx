import { useEffect, useRef, useState } from 'react';
import styles from './VisitUs.module.css';
import satellite from '../assets/dubai-satellite.webp';

const ADDRESS_LINE = '32 9B St, Al Quoz Industrial Area 4, Dubai — Unit B05';
const MAPS_QUERY = 'Unit B05, 32 9B St, Al Quoz Industrial Area 4, Dubai';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
// Keyless Google Maps embed, satellite layer (t=k), zoomed to street level.
const EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&t=k&z=18&ie=UTF8&output=embed`;

// How long the satellite image zooms toward the pin before the live map
// fades in over it. Matches the transform transition in the CSS.
const ZOOM_MS = 1400;

export default function VisitUs() {
  const headerRef = useRef(null);
  // idle → zooming (image scales into the pin) → live (embedded map shown)
  const [stage, setStage] = useState('idle');

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (stage !== 'zooming') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setStage('live'), reduced ? 0 : ZOOM_MS);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <section className={styles.section} id="visit-us">
      <div className={styles.header} ref={headerRef}>
        <h2 className={styles.title}>Visit Us</h2>
        <p className={styles.address}>{ADDRESS_LINE}</p>
        <a
          className={styles.directions}
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>

      <div className={styles.map} data-stage={stage}>
        <div className={styles.still} aria-hidden={stage === 'live'}>
          <img
            className={styles.stillImg}
            src={satellite}
            alt="Satellite view of Dubai with the Wraptors studio in Al Quoz Industrial Area 4 marked"
            loading="lazy"
            decoding="async"
          />
          <button
            type="button"
            className={styles.explore}
            onClick={() => setStage('zooming')}
            disabled={stage !== 'idle'}
          >
            Explore Location
          </button>
        </div>

        {/* Mounted only once the visitor asks for it, so the Google Maps
            embed never loads for people who don't open it. */}
        {stage !== 'idle' && (
          <iframe
            className={styles.live}
            src={EMBED_URL}
            title="Wraptors Dubai on Google Maps"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
}

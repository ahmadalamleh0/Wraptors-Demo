import { useEffect, useRef, useState } from 'react';
import styles from './ProjectGallery.module.css';

// Image-led gallery for a single Wraptors project (vehicle pages). One wide
// featured frame with the project caption, then a gapless grid in the same
// editorial style as the McLaren / commercial spreads on the Wraps page.
// Tile spans are chosen from the photo count so rows always fill.
export default function ProjectGallery({ gallery }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [featured, ...rest] = gallery.photos;
  // 3 per row on desktop; a leftover pair goes half-width, a single goes full.
  const tail = rest.length % 3;
  const spanFor = (i) => {
    if (tail === 2 && i >= rest.length - 2) return styles.tileHalf;
    if (tail === 1 && i === rest.length - 1) return styles.tileFull;
    return '';
  };
  // 2 per row on mobile; an odd last tile goes full-width.
  const mobileOddLast = rest.length % 2 === 1;

  return (
    <section ref={ref} className={`${styles.section} ${visible ? styles.visible : ''}`} aria-labelledby="project-gallery-title">
      <div className={styles.head}>
        <span className={styles.eyebrow}>Wraptors Project</span>
        <h2 id="project-gallery-title" className={styles.title}>
          {gallery.title} <span className={styles.titleSep} aria-hidden="true">·</span> {gallery.service}
        </h2>
      </div>

      <figure className={styles.featured}>
        <img
          src={featured.src}
          srcSet={`${featured.srcSmall} 720w, ${featured.src} 1440w`}
          sizes="100vw"
          alt={featured.alt}
          loading="lazy"
          className={styles.img}
          style={{ objectPosition: gallery.heroPosition }}
        />
        <div className={styles.featuredOverlay} aria-hidden="true" />
        <figcaption className={styles.caption}>
          <span className={styles.captionEyebrow}>Wraptors Project</span>
          <span className={styles.captionTitle}>{gallery.title}</span>
          <span className={styles.captionDetail}>{gallery.service}</span>
        </figcaption>
      </figure>

      <div className={styles.grid}>
        {rest.map((p, i) => (
          <figure
            key={p.src}
            className={`${styles.tile} ${spanFor(i)} ${mobileOddLast && i === rest.length - 1 ? styles.tileMobileFull : ''}`}
            style={{ transitionDelay: visible ? `${0.08 * i}s` : '0s' }}
          >
            <img
              src={p.src}
              srcSet={`${p.srcSmall} 720w, ${p.src} 1440w`}
              sizes="(max-width: 700px) 50vw, 33vw"
              alt={p.alt}
              loading="lazy"
              className={styles.img}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

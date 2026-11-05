import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import styles from './ServicesSection.module.css';

// Dubai's six services in the homepage's existing order, using the same
// photo each previous service card showed (Services.jsx imgs[0]). Sizes
// reuse the original grid's own classes so the three original row heights
// are kept: wide + standard + standard / wide + wide / featured (full width).
// Descriptions are the landing page's original copy for each service.
import imgWraps from '../../../Wrappin(1new).jpeg';
import imgWrapsSet from '../../../Wrappin(1new).jpeg?srcset';
import imgPPF from '../../../Signture Section/Aston_Martin(4).jpeg';
import imgPPFSet from '../../../Signture Section/Aston_Martin(4).jpeg?srcset';
// Last photo in the Starlight page's "A Closer Look" gallery (as Hamilton / Tri-City).
import imgStarlight from '../../../Starlight(7).jpeg';
import imgStarlightSet from '../../../Starlight(7).jpeg?srcset';
import imgCustomBuilds from '../../../Wraptors Media/Custom Builds/621837139_18385536877146462_5187708123866638297_n - Copy.jpg';
import imgCustomBuildsSet from '../../../Wraptors Media/Custom Builds/621837139_18385536877146462_5187708123866638297_n - Copy.jpg?srcset';
import imgCeramic from '../../../Ceramic Coating(new1).jpeg';
import imgCeramicSet from '../../../Ceramic Coating(new1).jpeg?srcset';
import imgTint from '../../../tint.jpeg';
import imgTintSet from '../../../tint.jpeg?srcset';

// How wide each card size renders, so the browser can pick the right srcset
// copy: one column up to 768px, else a 4-column grid (rounded up slightly).
const SIZES = {
  standard: '(max-width: 768px) 100vw, 23vw',
  wide: '(max-width: 768px) 100vw, 46vw',
  featured: '(max-width: 768px) 100vw, 90vw',
};

const SERVICES = [
  {
    name: 'Vehicle Wraps',
    to: '/services/wraps/',
    description: 'Premium color changes and custom finishes.',
    image: imgWraps,
    srcSet: imgWrapsSet,
    size: 'wide',
  },
  {
    name: 'Starlight Headliner',
    to: '/services/starlight/',
    description: 'A luxury interior upgrade with a custom illuminated ceiling finish.',
    image: imgStarlight,
    srcSet: imgStarlightSet,
    size: 'standard',
  },
  {
    name: 'Paint Protection Film',
    to: '/services/ppf/',
    description: 'Invisible protection from chips and road wear.',
    image: imgPPF,
    srcSet: imgPPFSet,
    size: 'standard',
  },
  {
    name: 'Custom Builds & Body Kits',
    to: '/services/custom-builds/',
    description: 'Aggressive styling upgrades built for a stronger road presence.',
    image: imgCustomBuilds,
    srcSet: imgCustomBuildsSet,
    size: 'wide',
  },
  {
    name: 'Ceramic Coating',
    to: '/services/ceramic/',
    description: 'Long-lasting gloss and hydrophobic protection for easier maintenance.',
    image: imgCeramic,
    srcSet: imgCeramicSet,
    size: 'wide',
    imgPos: 'center 25%',
  },
  {
    name: 'Window Tint',
    to: '/services/tint/',
    description: 'Refined privacy, heat rejection, and a sharper exterior profile.',
    image: imgTint,
    srcSet: imgTintSet,
    size: 'featured',
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.kicker}>Our Services</Reveal>

      <div className={styles.grid}>
        {SERVICES.map(({ name, to, image, srcSet, size, description, imgPos }, i) => (
          <Reveal
            key={name}
            as={Link}
            to={to}
            className={`${styles.card} ${styles[size]}`}
            delay={Math.min(i * 70, 280)}
          >
            <img src={image} srcSet={srcSet} sizes={SIZES[size]} alt={name} className={styles.cardImage} loading="lazy" decoding="async" style={imgPos ? { objectPosition: imgPos } : undefined} />
            <div className={styles.cardOverlay} aria-hidden="true" />
            <div className={styles.cardContent}>
              <p className={styles.cardDesc}>{description}</p>
              <span className={styles.cardName}>
                {name}
                <span className={styles.cardArrow} aria-hidden="true">→</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

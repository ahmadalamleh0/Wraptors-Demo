import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import styles from './ServicesSection.module.css';

// Dubai's six services in the homepage's existing order, using the same
// photo each previous service card showed (Services.jsx imgs[0]). Sizes
// reuse the original grid's own classes so the three original row heights
// are kept: wide + standard + standard / wide + wide / featured (full width).
// Descriptions are the landing page's original copy for each service.
import imgWraps from '../../../Wrappin(1new).jpeg';
import imgPPF from '../../../Signture Section/Aston_Martin(4).jpeg';
import imgStarlight from '../../../Starlight(2).jpeg';
import imgCustomBuilds from '../../../Wraptors Media/Custom Builds/621837139_18385536877146462_5187708123866638297_n - Copy.jpg';
import imgCeramic from '../../../Ceramic Coating(new1).jpeg';
import imgTint from '../../../tint.jpeg';

const SERVICES = [
  {
    name: 'Vehicle Wraps',
    to: '/services/wraps',
    description: 'Premium color changes and custom finishes designed for a standout presence.',
    image: imgWraps,
    size: 'wide',
  },
  {
    name: 'Paint Protection Film',
    to: '/services/ppf',
    description: 'Invisible protection built to preserve paint against road wear, chips, and daily driving.',
    image: imgPPF,
    size: 'standard',
  },
  {
    name: 'Starlight Headliner',
    to: '/services/starlight',
    description: 'A luxury interior upgrade with a custom illuminated ceiling finish.',
    image: imgStarlight,
    size: 'standard',
  },
  {
    name: 'Custom Builds & Body Kits',
    to: '/services/custom-builds',
    description: 'Aggressive styling upgrades built for a stronger road presence.',
    image: imgCustomBuilds,
    size: 'wide',
  },
  {
    name: 'Ceramic Coating',
    to: '/services/ceramic',
    description: 'Long-lasting gloss and hydrophobic protection for easier maintenance.',
    image: imgCeramic,
    size: 'wide',
    imgPos: 'center 25%',
  },
  {
    name: 'Window Tint',
    to: '/services/tint',
    description: 'Refined privacy, heat rejection, and a sharper exterior profile.',
    image: imgTint,
    size: 'featured',
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <Reveal as="h2" className={styles.kicker}>Our Services</Reveal>

      <div className={styles.grid}>
        {SERVICES.map(({ name, to, image, size, description, imgPos }, i) => (
          <Reveal
            key={name}
            as={Link}
            to={to}
            className={`${styles.card} ${styles[size]}`}
            delay={Math.min(i * 70, 280)}
          >
            <img src={image} alt={name} className={styles.cardImage} loading="lazy" style={imgPos ? { objectPosition: imgPos } : undefined} />
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

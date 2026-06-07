import styles from './TrustedBrands.module.css';
import logo3m     from '../../Banner/3m-red.svg';
import logoHexis  from '../../Banner/HEXIS-Canada-logo.svg';
import logoAvery  from '../../Banner/avery-dennison.svg';
import logoStek   from '../../Banner/stek-emblem-white.svg';
import logoSuntek from '../../Banner/suntek-logo.svg';

const BRANDS = [
  { name: '3M',             src: logo3m     },
  { name: 'HEXIS Canada',   src: logoHexis  },
  { name: 'Avery Dennison', src: logoAvery  },
  { name: 'STEK',           src: logoStek   },
  { name: 'SunTek',         src: logoSuntek },
];

// Four copies so the strip always feels full regardless of screen width.
// Animate translateX(-50%) = two copies' worth → seamless loop.
const TRACK = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

export default function TrustedBrands() {
  return (
    <section className={styles.section}>

      <div className={styles.header}>
        <span className={styles.label}>Trusted Brands</span>
        <h2 className={styles.title}>BUILT WITH THE WORLD'S MOST ICONIC NAMES</h2>
        <p className={styles.sub}>
          From German precision to Italian exotics, every badge becomes a statement.
        </p>
      </div>

      {/* Marquee — fades at edges via CSS mask */}
      <div className={styles.marqueeOuter}>
        <div className={styles.marqueeTrack}>
          {TRACK.map((brand, i) => (
            <div key={i} className={styles.logoItem}>
              <img
                src={brand.src}
                alt={brand.name}
                className={styles.logo}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

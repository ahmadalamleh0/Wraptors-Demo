import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';

import imgWrapping1   from '../../Wrappin(1new).jpeg';
import imgWrapping2   from '../../Wrappin(2new).jpeg';
import imgWrapping3   from '../../Wrapping Last_3.jpeg';
import imgPPF1        from '../../PPF(last_1).jpeg';
import imgPPF2        from '../../PPF(2New).jpeg';
import imgPPF3        from '../../PPF(3New).jpeg';
import imgAstonPPF    from '../../Signture Section/Aston_Martin(4).jpeg';
import imgStarlight   from '../../Starlight_headliner.jpeg';
import imgStarlight2  from '../../Starlight(2).jpeg';
import imgStarlight3  from '../../Starlight(3).jpeg';
import imgCeramic1    from '../../Ceramic Coating(new1).jpeg';
import imgCeramic2    from '../../Ceramic Coating(new2).jpeg';
import imgCeramic3    from '../../Ceramic Coating(new3).jpeg';
import imgCommercial1 from '../../commercial_wrapping(1).jpeg';
import imgCommercial2 from '../../commercial_wrapping(2).jpeg';
import imgCommercial3 from '../../Comercial_wrapping(new3).jpeg';
import imgTint        from '../../tint.jpeg';

const SERVICES = [
  {
    id: 'wraps',
    slug: '/services/wraps',
    ghost: 'VEHICLE WRAPS',
    name: 'Vehicle Wraps',
    tags: ['Full Wrap', 'Color Change'],
    desc: 'Every colour. Every finish. Every vision. Precision-cut premium vinyl that transforms your vehicle and protects the paint beneath.',
    imgs: [imgWrapping1, imgWrapping2, imgWrapping3],
  },
  {
    id: 'ppf',
    slug: '/services/ppf',
    ghost: 'PAINT PROTECTION FILM',
    name: 'Paint Protection Film',
    tags: ['Invisible Shield', 'Self-Healing'],
    desc: "Invisible armour for the paint beneath. Self-healing, optically clear film that shields your finish from the road's worst.",
    imgs: [imgAstonPPF, imgPPF1, imgPPF2, imgPPF3],
  },
  {
    id: 'starlight',
    slug: '/services/starlight',
    ghost: 'STARLIGHT HEADLINER',
    name: 'Starlight Headliner',
    tags: ['Fiber Optic', 'Custom Layouts'],
    desc: 'The night sky, inside your cabin. Thousands of fibre optic stars embedded into bespoke headliner panels — handcrafted to order.',
    imgs: [imgStarlight2, imgStarlight, imgStarlight3],
  },
  {
    id: 'ceramic',
    slug: '/services/ceramic',
    ghost: 'CERAMIC COATING',
    name: 'Ceramic Coating',
    tags: ['9H Hardness', 'Hydrophobic'],
    desc: 'Glass-hard protection with a permanent shine. 9H-rated ceramic formula that bonds permanently to your paint for years of effortless gloss.',
    imgs: [imgCeramic1, imgCeramic2, imgCeramic3],
  },
  {
    id: 'tint',
    slug: '/services/tint',
    ghost: 'WINDOW TINT',
    name: 'Window Tint',
    tags: ['Ceramic Film', 'UV Protection'],
    desc: 'Premium ceramic window film that blocks UV, reduces heat, and delivers flawless clarity — installed to the millimetre.',
    imgs: [imgTint],
  },
  {
    id: 'commercial',
    slug: null,
    ghost: 'COMMERCIAL WRAP',
    name: 'Commercial Wrap',
    tags: ['Fleet Wrapping', 'Brand Identity'],
    desc: 'Turn every vehicle into a moving billboard. Full fleet wrapping with precision-cut branding that drives your business wherever it goes.',
    imgs: [imgCommercial1, imgCommercial2, imgCommercial3],
  },
];

function ServiceBlock({ svc, blockRef }) {
  const localRef = useRef(null);

  const setRef = el => {
    localRef.current = el;
    if (typeof blockRef === 'function') blockRef(el);
  };

  // Locked to the first image only — no rotation, no timers, no carousel.
  // svc.imgs may still carry additional images (used elsewhere, e.g. the
  // service detail pages), but this card always renders imgs[0].
  const mainImg = svc.imgs[0];

  return (
    <div className={styles.block} ref={setRef}>

      {/* ── Left: image ── */}
      <div className={styles.imgFrame}>
        <div className={styles.gallery}>
          <div className={styles.imgMain}>
            <img
              src={mainImg}
              alt={svc.name}
              className={styles.img}
              loading="lazy"
              style={svc.imgPositions?.[0] ? { objectPosition: svc.imgPositions[0] } : undefined}
            />
          </div>

        </div>
      </div>

      {/* ── Right: info ── */}
      <div className={styles.info}>
        <div className={styles.tags}>
          {svc.tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

        <h3 className={styles.name}>{svc.name}</h3>
        <p className={styles.desc}>{svc.desc}</p>

        {svc.slug ? (
          <Link to={svc.slug} className={styles.cta}>
            Experience It
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </Link>
        ) : (
          <a href="/#cta" className={styles.cta}>
            Experience It
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        )}
      </div>

    </div>
  );
}

export default function Services() {
  const blockRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.blockVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    blockRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className={styles.section}>

      {SERVICES.map((svc, i) => (
        <div key={svc.id} className={styles.serviceZone}>
          <div className={styles.ghostText} aria-hidden="true">
            {svc.ghost}
          </div>
          <ServiceBlock
            svc={svc}
            blockRef={el => { blockRefs.current[i] = el; }}
          />
        </div>
      ))}

    </section>
  );
}

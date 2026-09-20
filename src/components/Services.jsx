import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';

import imgWrapping1   from '../../Wrappin(1new).jpeg';
import imgWrapping2   from '../../Wraptors Media/Wrappin(2new).jpeg';
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
import imgCustomBuild1 from '../../Wraptors Media/Custom Builds/621837139_18385536877146462_5187708123866638297_n - Copy.jpg';
import imgCustomBuild2 from '../../Wraptors Media/Custom Builds/531390763_18364031848146462_3978469811072555494_n.jpg';
import imgCustomBuild3 from '../../Wraptors Media/Custom Builds/600288082_18380751250146462_3960198007605295301_n.jpg';
import imgTint        from '../../tint.jpeg';

const SERVICES = [
  {
    id: 'wraps',
    slug: '/services/wraps',
    ghost: 'VEHICLE WRAPS',
    name: 'Vehicle Wraps',
    tags: ['Full Wrap', 'Color Change'],
    desc: 'Premium vinyl in any colour or finish — precision-cut to transform and protect your paint.',
    imgs: [imgWrapping1, imgWrapping2, imgWrapping3],
  },
  {
    id: 'ppf',
    slug: '/services/ppf',
    ghost: 'PAINT PROTECTION FILM',
    name: 'Paint Protection Film',
    tags: ['Invisible Shield', 'Self-Healing'],
    desc: "Self-healing, optically clear film — invisible armour that shields your paint from the road.",
    imgs: [imgAstonPPF, imgPPF1, imgPPF2, imgPPF3],
  },
  {
    id: 'starlight',
    slug: '/services/starlight',
    ghost: 'STARLIGHT HEADLINER',
    name: 'Starlight Headliner',
    tags: ['Fiber Optic', 'Custom Layouts'],
    desc: 'The night sky, inside your cabin — thousands of fibre optic stars, handcrafted to order.',
    imgs: [imgStarlight2, imgStarlight, imgStarlight3],
  },
  {
    id: 'custom-builds',
    slug: '/services/custom-builds',
    ghost: 'CUSTOM BUILDS',
    name: 'Custom Builds & Body Kits',
    tags: ['Body Kits', 'Exterior Styling'],
    desc: 'Shape your vehicle around your vision, with body kits, exterior upgrades and carefully considered finishing details.',
    imgs: [imgCustomBuild1, imgCustomBuild2, imgCustomBuild3],
  },
  {
    id: 'ceramic',
    slug: '/services/ceramic',
    ghost: 'CERAMIC COATING',
    name: 'Ceramic Coating',
    tags: ['9H Hardness', 'Hydrophobic'],
    desc: '9H-rated ceramic formula that bonds permanently — glass-hard protection, years of gloss.',
    imgs: [imgCeramic1, imgCeramic2, imgCeramic3],
    // Biased up slightly so the mobile overlay's bottom-left title doesn't
    // land on the license plate/badge at the very bottom of the source photo.
    imgPositions: ['center 25%'],
  },
  {
    id: 'tint',
    slug: '/services/tint',
    ghost: 'WINDOW TINT',
    name: 'Window Tint',
    tags: ['Ceramic Film', 'UV Protection'],
    desc: 'Premium ceramic film that blocks UV and heat, installed to the millimetre for flawless clarity.',
    imgs: [imgTint],
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

          {/* Mobile-only: service identity lives on the image itself (tags +
              title, bottom-left, over a bottom-up gradient). Desktop keeps
              tags/title in .info instead — see .imgOverlay/.infoHead in
              Services.module.css for which breakpoint shows which copy. */}
          <div className={styles.imgOverlay} aria-hidden="true">
            <span className={styles.overlayTags}>{svc.tags.join(' · ')}</span>
            <h3 className={styles.overlayName}>{svc.name}</h3>
          </div>
        </div>
      </div>

      {/* ── Right: info ── */}
      <div className={styles.info}>
        <div className={styles.infoHead}>
          <div className={styles.tags}>
            {svc.tags.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
          <h3 className={styles.name}>{svc.name}</h3>
        </div>
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

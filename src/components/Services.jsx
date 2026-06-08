import { useEffect, useRef, useState } from 'react';
import styles from './Services.module.css';

import imgWrapping1   from '../../Wrappin(1new).jpeg';
import imgWrapping2   from '../../Wrappin(2new).jpeg';
import imgWrapping3   from '../../Wrapping Last_3.jpeg';
import imgPPF1        from '../../PPF(last_1).jpeg';
import imgPPF2        from '../../PPF(2New).jpeg';
import imgPPF3        from '../../PPF(3New).jpeg';
import imgStarlight   from '../../Starlight_headliner.jpeg';
import imgStarlight2  from '../../Starlight(2).jpeg';
import imgStarlight3  from '../../Starlight(3).jpeg';
import imgCeramic1    from '../../Ceramic Coating(new1).jpeg';
import imgCeramic2    from '../../Ceramic Coating(new2).jpeg';
import imgCeramic3    from '../../Ceramic Coating(new3).jpeg';
import imgCommercial1 from '../../commercial_wrapping(1).jpeg';
import imgCommercial2 from '../../commercial_wrapping(2).jpeg';
import imgCommercial3 from '../../Comercial_wrapping(new3).jpeg';

const SERVICES = [
  {
    id: 'wraps',
    ghost: 'VEHICLE WRAPS',
    name: 'Vehicle Wraps',
    tags: ['Full Wrap', 'Color Change'],
    desc: 'Every colour. Every finish. Every vision. Precision-cut premium vinyl that transforms your vehicle and protects the paint beneath.',
    imgs: [imgWrapping1, imgWrapping2, imgWrapping3],
  },
  {
    id: 'ppf',
    ghost: 'PAINT PROTECTION FILM',
    name: 'Paint Protection Film',
    tags: ['Invisible Shield', 'Self-Healing'],
    desc: "Invisible armour for the paint beneath. Self-healing, optically clear film that shields your finish from the road's worst.",
    imgs: [imgPPF3, imgPPF2, imgPPF1],
    imgPositions: [null, null, 'center 30%'],
  },
  {
    id: 'starlight',
    ghost: 'STARLIGHT HEADLINER',
    name: 'Starlight Headliner',
    tags: ['Fiber Optic', 'Custom Layouts'],
    desc: 'The night sky, inside your cabin. Thousands of fibre optic stars embedded into bespoke headliner panels — handcrafted to order.',
    imgs: [imgStarlight, imgStarlight2, imgStarlight3],
  },
  {
    id: 'ceramic',
    ghost: 'CERAMIC COATING',
    name: 'Ceramic Coating',
    tags: ['9H Hardness', 'Hydrophobic'],
    desc: 'Glass-hard protection with a permanent shine. 9H-rated ceramic formula that bonds permanently to your paint for years of effortless gloss.',
    imgs: [imgCeramic1, imgCeramic2, imgCeramic3],
  },
  {
    id: 'commercial',
    ghost: 'COMMERCIAL WRAP',
    name: 'Commercial Wrap',
    tags: ['Fleet Wrapping', 'Brand Identity'],
    desc: 'Turn every vehicle into a moving billboard. Full fleet wrapping with precision-cut branding that drives your business wherever it goes.',
    imgs: [imgCommercial1, imgCommercial2, imgCommercial3],
  },
];

const INTERVAL_MS = 4000;

function ServiceBlock({ svc, blockRef }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const localRef = useRef(null);

  const setRef = el => {
    localRef.current = el;
    if (typeof blockRef === 'function') blockRef(el);
  };

  useEffect(() => {
    if (svc.imgs.length <= 1) return;
    const el = localRef.current;
    if (!el) return;
    let id = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!id) id = setInterval(
            () => setActiveIdx(i => (i + 1) % svc.imgs.length),
            INTERVAL_MS
          );
        } else {
          clearInterval(id);
          id = null;
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => { clearInterval(id); io.disconnect(); };
  }, [svc.imgs.length]);

  return (
    <div className={styles.block} ref={setRef}>

      {/* ── Left: image gallery ── */}
      <div className={styles.imgFrame}>
        <div className={styles.gallery}>
          <div className={styles.imgMain}>
            <img
              key={activeIdx}
              src={svc.imgs[activeIdx]}
              alt={svc.name}
              className={styles.img}
              loading="lazy"
              style={svc.imgPositions?.[activeIdx] ? { objectPosition: svc.imgPositions[activeIdx] } : undefined}
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

        <a href="#cta" className={styles.cta}>
          Get a Quote
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </a>
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

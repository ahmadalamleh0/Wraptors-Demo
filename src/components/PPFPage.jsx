import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './PPFPage.module.css';

import heroImg  from '../../WhatsApp Image 2026-06-15 at 10.04.28 AM.jpeg';
import ppfDescImg from '../../PPF(description).png';
import astonMartin4 from '../../Signture Section/Aston_Martin(4).jpeg';
import gallery1 from '../../PPF(1New).jpeg';
import gallery2 from '../../PPF(2New).jpeg';
import gallery3 from '../../PPF(3New).jpeg';


import ppfFullCar            from '../../PPF/full_car.jpeg';

import productWaterless   from '../../Products/Carwaterless.webp';
import productVinyl       from '../../Products/Vinalprotectionwebp.webp';
import productFullPackage from '../../Products/full package.webp';
import ppfHood               from '../../PPF/Hood.jpeg';
import ppfHoodMask           from '../../PPF/Hood_mask.png';
import ppfFrontBumper        from '../../PPF/front_bumper.jpeg';
import ppfFrontBumperMask    from '../../PPF/front_bumper_mask.png';
import ppfFenderMirror       from '../../PPF/fender& mirror.jpeg';
import ppfFenderMirrorMask   from '../../PPF/fender& mirror_mask.png';
import ppfBackFenderDoor     from '../../PPF/back_fender & door.jpeg';
import ppfBackFenderDoorMask from '../../PPF/back_fender & door_mask.png';
import ppfBackBumper         from '../../PPF/back_bumper.jpeg';
import ppfBackBumperMask     from '../../PPF/back_bumper_mask.png';

// Prepared mobile screenshots — used instead of the mask/overlay system on phones
import mobileHood           from '../../mobile assests/Hood_new.png';
import mobileFrontBumper    from '../../mobile assests/front_bumber_new.png';
import mobileFendersMirrors from '../../mobile assests/ChatGPT Image Jun 15, 2026, 12_38_30 PM.png';
import mobileDoorsRear      from '../../mobile assests/ChatGPT Image Jun 15, 2026, 12_36_02 PM.png';
import mobileRearBumper     from '../../mobile assests/Rear.png';

// ── Data ──────────────────────────────────────────────────────────────────────

// callout.from = where the line originates (on the highlighted zone), as % of image
// callout.to   = where the text label lives, as % of image (top-left corner of box)
const ZONES = [
  {
    id: 'full-car',
    label: 'Full Car',
    photo: ppfFullCar,
    mask: null,
    overlay: null,
    title: 'Full Vehicle Overview',
    desc: 'Tap a zone on the car to explore PPF coverage — or select a panel below.',
    callout: null,
  },
  {
    id: 'hood',
    label: 'Hood',
    photo: ppfHood,
    mask: ppfHoodMask,
    overlay: null,
    title: 'Hood Protection',
    desc: 'The hood is the first line of impact — exposed to stone chips, insects, and road debris at speed. PPF preserves the factory finish and self-heals light surface marks.',
    callout: { from: { x: 47, y: 38 }, to: { x: 63, y: 7 } },
  },
  {
    id: 'front-bumper',
    label: 'Front Bumper',
    photo: ppfFrontBumper,
    mask: ppfFrontBumperMask,
    overlay: null,
    photoPosition: 'center 65%',
    title: 'Front Bumper',
    desc: 'Constant low-speed contact and high-speed debris make the front bumper one of the most vulnerable surfaces. Film coverage keeps it chip-free and showroom-ready.',
    callout: { from: { x: 50, y: 78 }, to: { x: 4, y: 7 } },
  },
  {
    id: 'fenders-mirrors',
    label: 'Fenders & Mirrors',
    photo: ppfFenderMirror,
    mask: ppfFenderMirrorMask,
    overlay: null,
    photoPosition: 'center 35%',
    title: 'Fenders & Mirrors',
    desc: 'Front fenders take tyre throw-up and edge contact. Mirror housings face daily handling and wash cycles. Both benefit from durable, invisible film protection.',
    callout: { from: { x: 30, y: 30 }, to: { x: 4, y: 7 } },
  },
  {
    id: 'doors-rear-fender',
    label: 'Doors & Rear Fender',
    photo: ppfBackFenderDoor,
    mask: ppfBackFenderDoorMask,
    overlay: null,
    title: 'Doors & Rear Fender',
    desc: 'Side panels accumulate parking scratches and door dings. Film adds an invisible barrier that absorbs impact and keeps every panel flawless.',
    callout: { from: { x: 55, y: 46 }, to: { x: 4, y: 7 } },
  },
  {
    id: 'rear-bumper',
    label: 'Rear Bumper',
    photo: ppfBackBumper,
    mask: ppfBackBumperMask,
    overlay: null,
    title: 'Rear Bumper',
    desc: 'Loading contact and parking wear the rear bumper fastest. PPF protects the surface from abrasion without altering the OEM finish or sensor accuracy.',
    callout: { from: { x: 50, y: 60 }, to: { x: 63, y: 7 } },
  },
];

// Hotspot positions on the full_car overview image (% of container width/height)
const HOTSPOTS = [
  { id: 'hs-hood',         targetId: 'hood',              label: 'Hood',         x: 52, y: 38 },
  { id: 'hs-front-bumper', targetId: 'front-bumper',      label: 'Front Bumper', x: 37, y: 50 },
  { id: 'hs-fender',       targetId: 'fenders-mirrors',   label: 'Fender',       x: 26, y: 62 },
  { id: 'hs-mirror',       targetId: 'fenders-mirrors',   label: 'Mirror',       x: 57, y: 27 },
  { id: 'hs-rear',         targetId: 'doors-rear-fender', label: 'Rear Panel',   x: 82, y: 50 },
];

const BENEFITS = [
  {
    title: 'Self-Healing Surface',
    desc:  'Minor swirls and light scratches vanish on their own with heat — the film repairs itself.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 3L29 8V16C29 23 23 28.5 16 31C9 28.5 3 23 3 16V8L16 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M11 16C11 13.24 13.24 11 16 11C18.76 11 21 13.24 21 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M21 16L19 13.5M21 16L23.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Invisible Finish',
    desc:  'Optically clear film with zero visual impact. Your paint colour and factory gloss stay perfect.',
    icon: (
      <svg viewBox="0 0 32 28" fill="none" aria-hidden="true">
        <path d="M2 14C2 14 6.5 4 16 4C25.5 4 30 14 30 14C30 14 25.5 24 16 24C6.5 24 2 14 2 14Z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Chip & Scratch Protection',
    desc:  'Absorbs stone chips, road debris, and daily abrasions before they ever reach your paint.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M10 16L14.5 20.5L22 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Long-Term Preservation',
    desc:  'Blocks UV, oxidation, and environmental contamination — keeping paint depth and resale value intact for years.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 8V16L21 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const AFTERCARE_PRODUCTS = [
  {
    id: 'waterless-wash',
    name: 'Waterless Car Wash',
    desc: 'Plant-based formula that cleans, shines, and repels UV, dust, and fog — all without a single drop of water. Safe on PPF and coated surfaces.',
    img: productWaterless,
    link: 'https://wraptorsstore.com',
  },
  {
    id: 'full-package',
    name: 'Full Detailing Package',
    desc: 'Everything you need in one premium kit — interior shiner, car shampoo, waterless wash, anti-fog glass cleaner, tire shine, and more.',
    img: productFullPackage,
    link: 'https://wraptorsstore.com',
  },
  {
    id: 'vinyl-protectant',
    name: 'Vinyl Protectant',
    desc: 'Ultimate vinyl elixir with a UV shield and lasting shine. Keeps wrapped and filmed surfaces looking fresh, deep, and protected against the elements.',
    img: productVinyl,
    link: 'https://wraptorsstore.com',
  },
];

const GALLERY = [
  { img: gallery1, label: 'Full Front Coverage' },
  { img: gallery2, label: 'Hood & Bumper Detail' },
  { img: gallery3, label: 'Complete Paint Shield' },
  { img: astonMartin4, label: 'Full Body Protection' },
];

const LAYERS = [
  {
    id: 'topcoat',
    name: 'Advanced Topcoat',
    microns: '12μm',
    details: ['Self-healing surface', 'Gloss enhancement & stain resistance'],
  },
  {
    id: 'tpu',
    name: 'TPU Protection Layer',
    microns: '159μm',
    details: ['Flexible, impact-absorbing film', 'Defence against chips, scratches & debris'],
  },
  {
    id: 'adhesive',
    name: 'Adhesive Layer',
    microns: '32μm',
    details: ['Bonds film seamlessly to paint', 'Clean installation, permanent hold'],
  },
  {
    id: 'liner',
    name: 'Release Liner',
    microns: '85μm',
    details: ['Protective backing — removed during installation'],
  },
];

// Maps each zone id to its prepared mobile screenshot
const MOBILE_IMAGES = {
  'full-car':          ppfFullCar,
  'hood':              mobileHood,
  'front-bumper':      mobileFrontBumper,
  'fenders-mirrors':   mobileFendersMirrors,
  'doors-rear-fender': mobileDoorsRear,
  'rear-bumper':       mobileRearBumper,
};

// ── Coverage Explorer ─────────────────────────────────────────────────────────

function CoverageExplorer() {
  const [activeId, setActiveId] = useState('full-car');
  const activeZone = ZONES.find(z => z.id === activeId);

  const select = (id) => {
    if (id !== activeId) setActiveId(id);
  };

  return (
    <section className={styles.explorerSection}>
      <div className={styles.container}>
        <div className={styles.explorerLayout}>

          {/* ── Photo stage (left on desktop, top on mobile) ── */}
          <div className={styles.photoViewer}>
            <div className={styles.photoStage}>

              {/* All slots pre-rendered so images load in background */}
              {ZONES.map(zone => (
                <div
                  key={zone.id}
                  className={`${styles.photoSlot} ${activeId === zone.id ? styles.photoSlotOn : ''}`}
                >
                  <img
                    src={zone.photo}
                    className={styles.stagePhoto}
                    style={zone.photoPosition ? { objectPosition: zone.photoPosition } : undefined}
                    alt=""
                    draggable={false}
                  />

                  {/* Mask-based film highlight (only rendered for active zone) */}
                  {zone.mask && activeId === zone.id && (
                    <div
                      key={activeId}
                      className={styles.filmHighlight}
                      style={{
                        WebkitMaskImage: `url(${zone.mask})`,
                        maskImage: `url(${zone.mask})`,
                        WebkitMaskMode: 'luminance',
                        maskMode: 'luminance',
                        WebkitMaskSize: 'cover',
                        maskSize: 'cover',
                        WebkitMaskPosition: zone.photoPosition || 'center',
                        maskPosition: zone.photoPosition || 'center',
                      }}
                    >
                      <div className={styles.filmShimmer} />
                    </div>
                  )}

                </div>
              ))}

              {/* SVG callout line — draws from the highlighted zone to the label */}
              {activeZone.callout && (
                <svg
                  key={`svg-${activeId}`}
                  className={styles.calloutSvg}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <circle
                    cx={activeZone.callout.from.x}
                    cy={activeZone.callout.from.y}
                    r="2.4"
                    className={styles.calloutRing}
                  />
                  <circle
                    cx={activeZone.callout.from.x}
                    cy={activeZone.callout.from.y}
                    r="0.9"
                    className={styles.calloutDot}
                  />
                  <line
                    x1={activeZone.callout.from.x}
                    y1={activeZone.callout.from.y}
                    x2={activeZone.callout.to.x}
                    y2={activeZone.callout.to.y}
                    className={styles.calloutLine}
                  />
                </svg>
              )}

              {/* Floating callout label (desktop) */}
              {activeZone.callout && (
                <div
                  key={`lbl-${activeId}`}
                  className={styles.calloutLabel}
                  style={{
                    left: `${activeZone.callout.to.x}%`,
                    top:  `${activeZone.callout.to.y}%`,
                  }}
                >
                  <span className={styles.calloutEye}>Protected Zone</span>
                  <h3 className={styles.calloutTitle}>{activeZone.title}</h3>
                  <p className={styles.calloutDesc}>{activeZone.desc}</p>
                </div>
              )}

              {/* Bottom text overlay */}
              <div
                key={`desc-${activeId}`}
                className={`${styles.photoDesc} ${activeZone.callout ? styles.photoDescMobile : ''}`}
              >
                <span className={styles.photoDescEye}>
                  {activeZone.callout ? 'Protected Zone' : 'Overview'}
                </span>
                <h3 className={styles.photoDescTitle}>{activeZone.title}</h3>
                <p className={styles.photoDescText}>{activeZone.desc}</p>
              </div>

              {/* Interactive hotspot dots — only on the full-car overview */}
              {activeId === 'full-car' && (
                <div className={styles.hotspotLayer} aria-label="Tap a zone to explore coverage">
                  {HOTSPOTS.map((spot, i) => (
                    <button
                      key={spot.id}
                      className={styles.hotspot}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%`, animationDelay: `${i * 0.09}s` }}
                      onClick={() => select(spot.targetId)}
                      aria-label={`View ${spot.label} protection`}
                    >
                      <span className={styles.hotspotRing} style={{ animationDelay: `${i * 0.09}s` }} />
                      <span className={styles.hotspotDot} />
                      <span className={styles.hotspotLabel}>{spot.label}</span>
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Mobile photo stage — prepared screenshots, instant-swap with fade */}
            <div className={styles.mobilePhotoStage}>
              {ZONES.map(zone => (
                <div
                  key={zone.id}
                  className={`${styles.photoSlot} ${activeId === zone.id ? styles.photoSlotOn : ''}`}
                >
                  <img
                    src={MOBILE_IMAGES[zone.id]}
                    className={styles.stagePhoto}
                    alt=""
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Mobile-only: zone info shown below the photo, not over it */}
            <div className={styles.mobileZoneInfo} aria-live="polite">
              <span className={styles.mobileZoneEye}>
                {activeZone.callout ? 'Protected Zone' : 'Overview'}
              </span>
              <h3 className={styles.mobileZoneTitle}>{activeZone.title}</h3>
              <p className={styles.mobileZoneDesc}>{activeZone.desc}</p>
            </div>

          </div>

          {/* ── Controls panel (right on desktop, below on mobile) ── */}
          <div className={styles.ctrlPanel}>

            <div className={styles.ctrlHead}>
              <span className={styles.eyebrow}>Coverage Explorer</span>
              <h2 className={styles.explorerTitle}>PPF Coverage Explorer</h2>
              <p className={styles.explorerSub}>
                Explore how Paint Protection Film protects each high-impact zone of the vehicle.
              </p>
            </div>

            <div className={styles.zoneGrid}>
              {ZONES.map(zone => (
                <button
                  key={zone.id}
                  className={`${styles.zoneBtn} ${activeId === zone.id ? styles.zoneBtnOn : ''}`}
                  onClick={() => select(zone.id)}
                >
                  {zone.label}
                </button>
              ))}
            </div>

            <a
              href={`mailto:info@wraptorsmafia.com?subject=PPF Quote – ${activeZone.title}&body=I'm interested in: ${activeZone.title}`}
              className={styles.explorerCta}
            >
              Request This Coverage
              <span className={styles.explorerCtaArrow}>→</span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── Layer Breakdown ───────────────────────────────────────────────────────────

function LayerBreakdown() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <section className={styles.layerSection} ref={sectionRef}>
      <div className={styles.layerBgGlow} aria-hidden="true" />
      <div className={styles.container}>

        <div className={styles.layerHeader}>
          <span className={styles.eyebrow}>Film Construction</span>
          <h2 className={styles.sectionTitle}>
            Precision-Crafted Protection,<br />Layer by Layer
          </h2>
          <p className={styles.sectionSub}>
            Engineered with multiple layers of clarity, durability, and invisible defence.
          </p>
        </div>

        <div className={styles.lGrid}>
          {LAYERS.map((layer, i) => (
            <div
              key={layer.id}
              className={`${styles.lRow} ${visible ? styles.lRowOn : ''}`}
              style={{ transitionDelay: `${i * 0.14}s` }}
            >
              <div
                className={`${styles.lLabel} ${visible ? styles.lLabelOn : ''}`}
                style={{ transitionDelay: `${i * 0.14}s` }}
              >
                <span className={styles.lNum}>0{i + 1}</span>
                <h3 className={styles.lName}>{layer.name}</h3>
                <span className={styles.lMicrons}>{layer.microns}</span>
                <ul className={styles.lBullets}>
                  {layer.details.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>

              <div
                className={`${styles.lPtr} ${visible ? styles.lPtrOn : ''}`}
                aria-hidden="true"
                style={{ transitionDelay: `${i * 0.14 + 0.18}s` }}
              >
                <span className={styles.lDot} />
                <span className={styles.lLine} />
              </div>

              <div className={styles.lPanelWrap}>
                <div className={`${styles.lFilm} ${styles[`f_${layer.id}`]}`}>
                  <span className={styles.lShine} />
                  <span className={styles.lTopRim} />
                  <span className={styles.lBtmRim} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PPFPage() {
  return (
    <>
      <Navbar alwaysVisible />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <img src={heroImg} alt="" className={styles.heroBg} draggable={false} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link to="/" className={styles.backBtn}>← All Services</Link>
          <span className={styles.heroEyebrow}>Invisible Shield</span>
          <h1 className={styles.heroTitle}>Paint<br />Protection<br />Film</h1>
          <p className={styles.heroSub}>
            Invisible protection for the areas that matter most.
          </p>
        </div>
      </section>

      {/* ── 2. SHORT PROTECTION TEXT ─────────────────────────────── */}
      <section className={styles.protectText}>
        <div className={styles.container}>
          <h2 className={styles.protectTitle}>Protect the finish before<br />the damage happens.</h2>
          <p className={styles.protectSub}>Tell us your vehicle and preferred coverage. We handle the rest.</p>
        </div>
      </section>

      {/* ── 3. COVERAGE EXPLORER ─────────────────────────────────── */}
      <CoverageExplorer />

      {/* ── 4. FILM CONSTRUCTION ─────────────────────────────────── */}
      <LayerBreakdown />

      {/* ── 5. PPF EXPLANATION IMAGE ─────────────────────────────── */}
      <section className={styles.descImgSection}>
        <img src={ppfDescImg} alt="" className={styles.descImg} draggable={false} />
      </section>

      {/* ── 6. WHAT THE FILM DOES ────────────────────────────────── */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Why PPF</span>
            <h2 className={styles.sectionTitle}>What the Film Does</h2>
          </div>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map(b => (
              <div key={b.title} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PPF IN THE WILD ───────────────────────────────────── */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Real Installs</span>
            <h2 className={styles.sectionTitle}>PPF in the Wild</h2>
            <p className={styles.sectionSub}>A closer look at completed PPF installs across our portfolio.</p>
          </div>
          <div className={styles.galleryGrid}>
            {GALLERY.map(({ img, label }) => (
              <div key={label} className={styles.galleryCard}>
                <img src={img} alt={label} className={styles.galleryImg} draggable={false} />
                <div className={styles.galleryOverlay} />
                <span className={styles.galleryLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. AFTERCARE ─────────────────────────────────────────── */}
      <section className={styles.aftercareSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Aftercare</span>
            <h2 className={styles.sectionTitle}>Don't Forget the Aftercare</h2>
            <p className={styles.sectionSub}>
              Keep your protected finish looking fresh with Wraptors-approved care products.
            </p>
          </div>
        </div>

        <div className={styles.aftercareScroll}>
          <div className={styles.aftercareTrack}>
            {AFTERCARE_PRODUCTS.map(product => (
              <div key={product.id} className={styles.aftercareCard}>
                <div className={styles.aftercareImgWrap}>
                  {product.img ? (
                    <img
                      src={product.img}
                      alt={product.name}
                      className={styles.aftercareImg}
                      draggable={false}
                    />
                  ) : (
                    <div className={styles.aftercarePlaceholder} aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="4" y="8" width="24" height="17" rx="2" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
                        <circle cx="12" cy="15" r="3" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
                        <path d="M4 22L10 16L15 21L20 17L28 22" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className={styles.aftercareBody}>
                  <h3 className={styles.aftercareName}>{product.name}</h3>
                  <p className={styles.aftercareDesc}>{product.desc}</p>
                  <a
                    href={product.link}
                    className={styles.aftercareBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shop Product
                    <span className={styles.aftercareBtnArrow}>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Get Protected</span>
          <h2 className={styles.ctaTitle}>Ready to protect your finish?</h2>
          <p className={styles.ctaSub}>Tell us your vehicle and preferred coverage. We handle the rest.</p>
          <a
            href="mailto:info@wraptorsmafia.com?subject=PPF Coverage Request"
            className={styles.ctaBtn}
          >
            Request PPF Coverage
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

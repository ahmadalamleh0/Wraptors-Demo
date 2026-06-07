import { useState, useEffect, useRef } from 'react';
import styles from './SignatureBuilds.module.css';
import masterVideoSrc from '../../MasterPieces.mp4';

// Import brand logos from the Brands directory
import bmwLogo from '../../Brands/bmw.svg';
import amgLogo from '../../Brands/amg.svg';
import porscheLogo from '../../Brands/porsche.svg';
import audiLogo from '../../Brands/audi.svg';
import lamborghiniLogo from '../../Brands/lamborghini.svg';
import srtLogo from '../../SRT_NEW.svg';
import corvetteLogo from '../../COrvette_N.svg';
import mustangLogo from '../../FORD_N.svg';
import cadillacLogo from '../../cadillac-svgrepo-com.svg';
import lexusLogo from '../../lexus-svgrepo-com.svg';
import subaruLogo from '../../subaru-svgrepo-com.svg';
import gtrLogo from '../../GTR_NEW.svg';
import bentleyLogo from '../../Simplified Negative_BMdotCom_1000x500_2x1.svg';
import rollsLogo from '../../rolls-royce-svgrepo-com.svg';
import astonLogo from '../../Aston_Martin_Logo_0.svg';
import rangeLogo from '../../Brands/range-rover-2.svg';
import mclarenLogo from '../../Brands/mclaren.svg';
import maybachLogo from '../../maybach-svgrepo-com.svg';
import ferrariGesLogo from '../../ferrari-svgrepo-com.svg';

// BMW
import bmw1 from '../../Signture Section/BMW(1).jpeg';
import bmw2 from '../../Signture Section/BMW(2).jpeg';
import bmw3 from '../../Signture Section/BMW(3).jpeg';
import bmw4 from '../../Signture Section/BMW(4).jpeg';
import bmw5 from '../../Signture Section/BMW(5).jpeg';
import bmw6 from '../../Signture Section/BMW(6).jpeg';
import bmw7 from '../../Signture Section/BMW(7).jpeg';

// Maybach
import maybach1 from '../../Signture Section/Maybach(1).jpeg';
import maybach2 from '../../Signture Section/Maybach(2).jpeg';
import maybach3 from '../../Signture Section/Maybach(3).jpeg';
import maybach4 from '../../Signture Section/Maybach(4).jpeg';
import maybach5 from '../../Signture Section/Maybach(5).jpeg';
import maybach6 from '../../Signture Section/Maybach(6).jpeg';

// McLaren
import mclaren1 from '../../Signture Section/Mclaren(1).jpeg';
import mclaren2 from '../../Signture Section/Mclaren(2).jpeg';
import mclaren3 from '../../Signture Section/Mclaren(3).jpeg';
import mclaren4 from '../../Signture Section/Mclaren(4).jpeg';
import mclaren5 from '../../Signture Section/Mclaren(5).jpeg';
import mclaren6 from '../../Signture Section/Mclaren(6).jpeg';
import mclaren7 from '../../Signture Section/Mclaren(7).jpeg';
import mclaren8 from '../../Signture Section/Mclaren(8).jpeg';
import mclaren9 from '../../Signture Section/Mclaren(9).jpeg';

// Mustang
import mustang3 from '../../Signture Section/Mustang(3).jpeg';
import mustang4 from '../../Signture Section/Mustang(4).jpeg';
import mustang5 from '../../Signture Section/Mustang(5).jpeg';
import mustang6 from '../../Signture Section/Mustang(6).jpeg';
import mustang7 from '../../Signture Section/Mustang(7).jpeg';

// Porsche
import porsch1 from '../../Signture Section/Porsch(1).jpeg';
import porsch2 from '../../Signture Section/Porsch(2).jpeg';
import porsch3 from '../../Signture Section/Porsch(3).jpeg';
import porsch4 from '../../Signture Section/Porsch(4).jpeg';
import porsch5 from '../../Signture Section/Porsch(5).jpeg';
import porsch6 from '../../Signture Section/Porsch(6).jpeg';

// Audi
import audi1 from '../../Signture Section/Audi(1).jpeg';
import audi2 from '../../Signture Section/Audi(2).jpeg';
import audi3 from '../../Signture Section/Audi(3).jpeg';
import audi4 from '../../Signture Section/Audi(4).jpeg';
import audi5 from '../../Signture Section/Audi(5).jpeg';
import audi6 from '../../Signture Section/Audi(6).jpeg';
import audi7 from '../../Signture Section/Audi(7).jpeg';

// AMG
import amg1 from '../../Signture Section/AMG(1).jpeg';
import amg2 from '../../Signture Section/AMG(2).jpeg';
import amg3 from '../../Signture Section/AMG(3).jpeg';
import amg4 from '../../Signture Section/AMG(4).jpeg';
import amg5 from '../../Signture Section/AMG(5).jpeg';
import amg6 from '../../Signture Section/AMG(6).jpeg';

// Ferrari
import ferrari1 from '../../Signture Section/Ferrari(1).jpeg';
import ferrari2 from '../../Signture Section/Ferrari(2).jpeg';
import ferrari3 from '../../Signture Section/Ferrari(3).jpeg';
import ferrari4 from '../../Signture Section/Ferrari(4).jpeg';
import ferrari5 from '../../Signture Section/Ferrari(5).jpeg';
import ferrari6 from '../../Signture Section/Ferrari(6).jpeg';

// Lexus
import lexus1 from '../../Signture Section/Lexaus_N(1).jpeg';
import lexus2 from '../../Signture Section/Lexaus_N(2).jpeg';
import lexus3 from '../../Signture Section/Lexaus_N(3).jpeg';
import lexus4 from '../../Signture Section/Lexaus_N(4).jpeg';
import lexus5 from '../../Signture Section/Lexaus_N(5).jpeg';

// Bentley
import bentley1 from '../../Signture Section/Bentley_N(1).jpeg';
import bentley2 from '../../Signture Section/Bentley_N(2).jpeg';
import bentley3 from '../../Signture Section/Bentley_N(3).jpeg';
import bentley4 from '../../Signture Section/Bentley_N(4).jpeg';
import bentley5 from '../../Signture Section/Bentley_N(5).jpeg';

// Rolls-Royce (no (5).jpeg — file does not exist)
import rolls1 from '../../Signture Section/Rolls-Royce(1).jpeg';
import rolls2 from '../../Signture Section/Rolls-Royce(2).jpeg';
import rolls3 from '../../Signture Section/Rolls-Royce(3).jpeg';
import rolls4 from '../../Signture Section/Rolls-Royce(4).jpeg';
import rolls6 from '../../Signture Section/Rolls-Royce(6).jpeg';
import rolls7 from '../../Signture Section/Rolls-Royce(7).jpeg';

// Range Rover (no (4).jpeg — file does not exist)
import range1 from '../../Signture Section/Range_rover(1).jpeg';
import range2 from '../../Signture Section/Range_rover(2).jpeg';
import range3 from '../../Signture Section/Range_rover(3).jpeg';
import range5 from '../../Signture Section/Range_rover(5).jpeg';

// GTR
import gtr1 from '../../Signture Section/GTR(1).jpeg';
import gtr2 from '../../Signture Section/GTR(2).jpeg';
import gtr3 from '../../Signture Section/GTR(3).jpeg';
import gtr4 from '../../Signture Section/GTR(4).jpeg';
import gtr5 from '../../Signture Section/GTR(5).jpeg';

// Subaru
import subaru1 from '../../Signture Section/Subaru(1).jpeg';
import subaru2 from '../../Signture Section/Subaru(2).jpeg';
import subaru3 from '../../Signture Section/Subaru(3).jpeg';
import subaru4 from '../../Signture Section/Subaru(4).jpeg';
import subaru5 from '../../Signture Section/Subaru(5).jpeg';

// Lambo Purple
import lamboPurple1 from '../../Signture Section/Lambo(purble_1).jpeg';
import lamboPurple2 from '../../Signture Section/Lambo(purble_2).jpeg';
import lamboPurple3 from '../../Signture Section/Lambo(purble_3).jpeg';
import lamboPurple4 from '../../Signture Section/Lambo(purble_4).jpeg';
import lamboPurple5 from '../../Signture Section/Lambo(purble_5).jpeg';

// Lambo LBWK
import lamboLBWK1 from '../../Signture Section/Lambo(LBWK_1).jpeg';
import lamboLBWK2 from '../../Signture Section/Lambo(LBWK_2).jpeg';
import lamboLBWK3 from '../../Signture Section/Lambo(LBWK_3).jpeg';
import lamboLBWK4 from '../../Signture Section/Lambo(LBWK_4).jpeg';
import lamboLBWK5 from '../../Signture Section/Lambo(LBWK_5).jpeg';

// Ferrari Red (project root)
import ferrariRed1 from '../../Ferrari(red_1).jpeg';
import ferrariRed2 from '../../Ferrari(red_2).jpeg';
import ferrariRed3 from '../../Ferrari(red_3).jpeg';
import ferrariRed4 from '../../Ferrari(red_4).jpeg';
import ferrariRed5 from '../../Ferrari(red_5).jpeg';

// Ferrari White (project root)
import ferrariWhite1 from '../../Ferrari(white_1).jpeg';
import ferrariWhite2 from '../../Ferrari(white_2).jpeg';
import ferrariWhite3 from '../../Ferrari(white_3).jpeg';
import ferrariWhite4 from '../../Ferrari(white_4).jpeg';
import ferrariWhite5 from '../../Ferrari(white_5).jpeg';
import ferrariWhite6 from '../../Ferrari(white_6).jpeg';
import ferrariWhite7 from '../../Ferrari(white_7).jpeg';

// Urus (project root — note double dots in filenames)
import urus1 from '../../Urus_1.jpeg';
import urus2 from '../../Urus_2..jpeg';
import urus4 from '../../Urus_4..jpeg';

// Aston Martin
import aston1 from '../../Signture Section/Aston_Martin(1).jpeg';
import aston2 from '../../Signture Section/Aston_Martin(2).jpeg';
import aston3 from '../../Signture Section/Aston_Martin(3).jpeg';
import aston4 from '../../Signture Section/Aston_Martin(4).jpeg';
import aston5 from '../../Signture Section/Aston_Martin(5).jpeg';
import aston6 from '../../Signture Section/Aston_Martin(6).jpeg';

// Corvette
import corvette1 from '../../Signture Section/corvette(1).jpeg';
import corvette2 from '../../Signture Section/corvette(2).jpeg';
import corvette3 from '../../Signture Section/corvette(3).jpeg';
import corvette4 from '../../Signture Section/corvette(4).jpeg';
import corvette5 from '../../Signture Section/corvette(5).jpeg';

// Cadillac
import cadillac1 from '../../Signture Section/Cadillac(1).jpeg';
import cadillac2 from '../../Signture Section/Cadillac(2).jpeg';
import cadillac3 from '../../Signture Section/Cadillac(3).jpeg';
import cadillac4 from '../../Signture Section/Cadillac(4).jpeg';
import cadillac5 from '../../Signture Section/Cadillac(5).jpeg';
import cadillac6 from '../../Signture Section/Cadillac(6).jpeg';

// SRT
import srt1 from '../../Signture Section/SRT(1).jpeg';
import srt2 from '../../Signture Section/SRT(2).jpeg';
import srt3 from '../../Signture Section/SRT(3).jpeg';
import srt4 from '../../Signture Section/SRT(4).jpeg';
import srt5 from '../../Signture Section/SRT(5).jpeg';

const CATEGORIES = [
  { id: 'german-precision', label: 'German Precision' },
  { id: 'italian-exotics',  label: 'Italian Exotics'  },
  { id: 'british-luxury',   label: 'British Luxury'   },
  { id: 'american-muscle',  label: 'American Muscle'  },
  { id: 'japanese-icons',   label: 'Japanese Icons'   },
];

const BUILDS = [
  // German Precision
  { brandName: "BMW",           logo: bmwLogo,       mainImage: bmw1,       media: [bmw1, bmw2, bmw3, bmw4, bmw5, bmw6, bmw7],                           serviceTags: ["FULL VINYL COLOR CHANGE", "PPF", "CERAMIC COATING"], category: "german-precision" },
  { brandName: "Mercedes-Benz", logo: amgLogo,       mainImage: amg2,       media: [amg2, amg1, amg3, amg4, amg5, amg6],                                 serviceTags: ["FULL CLEAR PPF", "TINT"],                            category: "german-precision" },
  { brandName: "Porsche",       logo: porscheLogo,   mainImage: porsch1,    media: [porsch1, porsch2, porsch3, porsch4, porsch5, porsch6],                 serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],                 category: "german-precision" },
  { brandName: "Maybach",       logo: maybachLogo,   mainImage: maybach1,   media: [maybach1, maybach2, maybach3, maybach4, maybach5, maybach6],           serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],                 category: "german-precision" },
  { brandName: "Audi",          logo: audiLogo,      mainImage: audi1,      media: [audi1, audi2, audi3, audi4, audi5, audi6, audi7],                     serviceTags: ["FULL VINYL COLOR CHANGE", "TINT"],                   category: "german-precision" },

  // Italian Exotics — LBWK first, then Lamborghini / Ferrari alternating
  { brandName: "Lamborghini", logo: lamborghiniLogo, mainImage: lamboLBWK1,    media: [lamboLBWK1, lamboLBWK2, lamboLBWK3, lamboLBWK4, lamboLBWK5],                                                                       serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],               category: "italian-exotics" },
  { brandName: "Ferrari",     logo: ferrariGesLogo,  mainImage: ferrari1,      media: [ferrari1, ferrari2, ferrari3, ferrari4, ferrari5, ferrari6],                                                                         serviceTags: ["FULL VINYL COLOR CHANGE", "TINT", "CERAMIC COATING"], category: "italian-exotics" },
  { brandName: "Lamborghini", logo: lamborghiniLogo, mainImage: lamboPurple1,  media: [lamboPurple1, lamboPurple2, lamboPurple3, lamboPurple4, lamboPurple5],                                                              serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],               category: "italian-exotics" },
  { brandName: "Ferrari",     logo: ferrariGesLogo,  mainImage: ferrariRed1,   media: [ferrariRed1, ferrariRed2, ferrariRed3, ferrariRed4, ferrariRed5],                                                                   serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],               category: "italian-exotics" },
  { brandName: "Lamborghini", logo: lamborghiniLogo, mainImage: urus1,         media: [urus1, urus2, urus4],                                                                                                               serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],               category: "italian-exotics" },
  { brandName: "Ferrari",     logo: ferrariGesLogo,  mainImage: ferrariWhite1, media: [ferrariWhite1, ferrariWhite2, ferrariWhite3, ferrariWhite4, ferrariWhite5, ferrariWhite6, ferrariWhite7],                           serviceTags: ["FULL VINYL COLOR CHANGE", "CERAMIC COATING"],       category: "italian-exotics" },

  // American Muscle
  { brandName: "Dodge",     logo: srtLogo,      mainImage: srt4,      media: [srt4, srt1, srt2, srt3, srt5],                                         serviceTags: ["FULL VINYL COLOR CHANGE", "TINT"],                   category: "american-muscle" },
  { brandName: "Corvette",  logo: corvetteLogo, mainImage: corvette1, media: [corvette1, corvette2, corvette3, corvette4, corvette5],                  serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],                 category: "american-muscle" },
  { brandName: "Cadillac",  logo: cadillacLogo, mainImage: cadillac1, media: [cadillac1, cadillac2, cadillac3, cadillac4, cadillac5, cadillac6],       serviceTags: ["FULL CLEAR PPF", "TINT", "CERAMIC COATING"],         category: "american-muscle" },
  { brandName: "Mustang",   logo: mustangLogo,  mainImage: mustang3,  media: [mustang3, mustang4, mustang5, mustang6, mustang7],                       serviceTags: ["FULL VINYL COLOR CHANGE", "TINT"],                   category: "american-muscle" },

  // Japanese Icons
  { brandName: "Lexus",     logo: lexusLogo,   mainImage: lexus1,   media: [lexus1, lexus2, lexus3, lexus4, lexus5],     serviceTags: ["FULL VINYL COLOR CHANGE", "CERAMIC COATING"], category: "japanese-icons" },
  { brandName: "Subaru",    logo: subaruLogo,  mainImage: subaru1,  media: [subaru1, subaru2, subaru3, subaru4, subaru5], serviceTags: ["FULL VINYL COLOR CHANGE", "TINT"],             category: "japanese-icons" },
  { brandName: "Nissan GTR",logo: gtrLogo,     mainImage: gtr1,     media: [gtr1, gtr2, gtr3, gtr4, gtr5],               serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],           category: "japanese-icons", logoStyle: { filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.45))', opacity: 0.88 } },

  // British Luxury
  { brandName: "Bentley",     logo: bentleyLogo, mainImage: bentley1, media: [bentley1, bentley2, bentley3, bentley4, bentley5],                           serviceTags: ["FULL CLEAR PPF", "TINT", "CERAMIC COATING"],  category: "british-luxury" },
  { brandName: "Rolls-Royce", logo: rollsLogo,   mainImage: rolls1,   media: [rolls1, rolls2, rolls3, rolls4, rolls6, rolls7],                             serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"],          category: "british-luxury" },
  { brandName: "Aston Martin",logo: astonLogo,   mainImage: aston5,   media: [aston5, aston1, aston2, aston3, aston4, aston6],                             serviceTags: ["FULL VINYL COLOR CHANGE", "TINT"],             category: "british-luxury" },
  { brandName: "Range Rover", logo: rangeLogo,   mainImage: range1,   media: [range1, range2, range3, range5],                                              serviceTags: ["FULL VINYL COLOR CHANGE", "TINT", "CERAMIC COATING"], category: "british-luxury" },
  { brandName: "McLaren",     logo: mclarenLogo, mainImage: mclaren1, media: [mclaren1, mclaren2, mclaren3, mclaren4, mclaren5, mclaren6, mclaren7, mclaren8, mclaren9], serviceTags: ["FULL CLEAR PPF", "CERAMIC COATING"], category: "british-luxury" },
];

// ── Card Component ──────────────────────────────────────────────────────────
function BuildCard({ build }) {
  const [hovered, setHovered]   = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!hovered || !build.media || build.media.length <= 1) {
      setImgIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setImgIndex(prev => (prev + 1) % build.media.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [hovered, build.media]);

  const currentImage = build.media?.length > 0 ? build.media[imgIndex] : build.mainImage;

  return (
    <article
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageContainer}>
        {currentImage ? (
          <img
            src={currentImage}
            className={styles.image}
            alt={`${build.brandName} Signature Build`}
            key={imgIndex}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}

        <div className={styles.overlay} />

        <div className={styles.logoContainer}>
          <img src={build.logo} className={styles.logo} alt="" aria-hidden="true" style={build.logoStyle} />
        </div>

        <div className={styles.cardContent}>
          <span className={styles.buildLabel}>WRAPTORS BUILD</span>
          <div className={styles.tags}>
            {build.serviceTags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          {build.media && build.media.length > 1 && (
            <div className={styles.dotsContainer}>
              {build.media.map((_, i) => (
                <span key={i} className={`${styles.dot} ${i === imgIndex ? styles.activeDot : ''}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function SignatureBuilds() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const videoRef    = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Older iOS Safari needs this set imperatively
    video?.setAttribute('webkit-playsinline', '');

    // Retry on first user gesture — covers iOS autoplay gate
    const retryPlay = () => { if (video?.paused) video.play().catch(() => {}); };
    document.addEventListener('touchstart', retryPlay, { once: true, passive: true });
    document.addEventListener('scroll',     retryPlay, { once: true, passive: true });

    // Text reveal observer
    const textObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );
    const sel = [
      `.${styles.animLeft}`,
      `.${styles.animScript}`,
      `.${styles.animCategory}`,
    ].join(', ');
    sectionRef.current?.querySelectorAll(sel).forEach(el => textObserver.observe(el));

    // Video autoplay observer
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video?.play().catch(() => {});
        else video?.pause();
      },
      { threshold: 0.15 }
    );
    if (headerRef.current) videoObserver.observe(headerRef.current);

    return () => {
      textObserver.disconnect();
      videoObserver.disconnect();
      document.removeEventListener('touchstart', retryPlay);
      document.removeEventListener('scroll',     retryPlay);
    };
  }, []);

  return (
    <section id="signature-builds" ref={sectionRef} className={styles.section}>

      {/* Section header — video background + centered title */}
      <div className={styles.header} ref={headerRef}>

        {/* Background video */}
        <video
          ref={videoRef}
          className={styles.headerVideo}
          src={masterVideoSrc}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster={rolls1}
        />

        {/* Dark overlay for text readability */}
        <div className={styles.headerOverlay} aria-hidden="true" />

        {/* Top fade from Statement section */}
        <div className={styles.headerFadeTop}    aria-hidden="true" />
        {/* Bottom fade into card grid */}
        <div className={styles.headerFadeBottom} aria-hidden="true" />

        {/* Text content */}
        <span className={`${styles.label} ${styles.animLeft}`}>Signature Builds</span>
        <h2 className={`${styles.title} ${styles.animScript}`}>Masterpieces</h2>
        <p className={`${styles.subtitle} ${styles.animLeft} ${styles.delay2}`}>
          A selection of vehicles completed in-house.
        </p>

      </div>

      {/* Category rows */}
      {CATEGORIES.map(cat => {
        const builds = BUILDS.filter(b => b.category === cat.id);
        return (
          <div key={cat.id} className={styles.categoryRow}>
            <div className={styles.categoryHeader}>
              <h3 className={`${styles.categoryTitle} ${styles.animCategory}`}>{cat.label}</h3>
            </div>
            <div className={styles.cardTrack}>
              {builds.map((build, i) => (
                <BuildCard key={`${cat.id}-${build.brandName}-${i}`} build={build} />
              ))}
            </div>
          </div>
        );
      })}

    </section>
  );
}

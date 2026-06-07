import { useRef, useState, useEffect } from 'react';
import styles from './GlobalLocations.module.css';
import MilitaryMap from '../../components/TacticalGlobe';
import flagCA from '../../CANADA(FLAG).svg';
import flagUS from '../../USA(FLAG).svg';
import flagZA from '../../SA(FLAG).svg';

const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

/* ── Sphere math — mirrors TacticalGlobe internals for the lines overlay ── */
const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

function projectPoint(lng, lat, lambda, phi, gamma, R, cx, cy) {
  const lr = (lng - lambda) * D2R;
  const la = lat * D2R;
  const cl = Math.cos(la);
  const x0 = cl * Math.cos(lr), y0 = cl * Math.sin(lr), z0 = Math.sin(la);
  const cp = Math.cos(phi * D2R), sp = Math.sin(phi * D2R);
  const x1 = x0 * cp + z0 * sp, y1 = y0, z1 = -x0 * sp + z0 * cp;
  const cg = Math.cos(gamma * D2R), sg = Math.sin(gamma * D2R);
  const rx = x1;
  const ry = y1 * cg - z1 * sg;
  const rz = y1 * sg + z1 * cg;
  return { sx: cx + R * ry, sy: cy - R * rz, v: rx >= 0 };
}

function greatCircle(lng1, lat1, lng2, lat2, N = 48) {
  const toVec = (lng, lat) => {
    const la = lat * D2R, lr = lng * D2R, cl = Math.cos(la);
    return [cl * Math.cos(lr), cl * Math.sin(lr), Math.sin(la)];
  };
  const v1 = toVec(lng1, lat1), v2 = toVec(lng2, lat2);
  const dot = Math.min(1, Math.max(-1, v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2]));
  const angle = Math.acos(dot);
  const sinA = Math.sin(angle);
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const w1 = sinA < 1e-6 ? 1 - t : Math.sin((1 - t) * angle) / sinA;
    const w2 = sinA < 1e-6 ? t     : Math.sin(t * angle) / sinA;
    const x = w1*v1[0] + w2*v2[0], y = w1*v1[1] + w2*v2[1], z = w1*v1[2] + w2*v2[2];
    pts.push([Math.atan2(y, x) * R2D, Math.asin(z) * R2D]);
  }
  return pts;
}

const LINE_PAIRS = [
  [0, 2], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
];

/* ── Count-up animation ── */
function CountUp({ to, suffix = '', duration = 1400 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = now => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

/* ── GlobeLines — pauses rAF when section is off-screen ── */
function GlobeLines({ markers, interaction }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const [dims, setDims] = useState({ w: 400, h: 400 });
  const rotRef = useRef({
    lambda: interaction.rotateZ,
    phi:    interaction.rotateY,
    gamma:  interaction.rotateX,
  });

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(entries => {
      const r = entries[0]?.contentRect;
      if (r && r.width > 0) setDims({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    ro.observe(parent);
    setDims({ w: parent.offsetWidth || 400, h: parent.offsetHeight || 400 });
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const { w: W, h: H } = dims;
    const R = Math.max(20, Math.min(W, H) / 2 - 8);
    const cx = W / 2, cy = H / 2;
    let raf;
    let running = false;
    let lastTime = performance.now();

    const step = now => {
      if (!running) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      if (interaction.autoRotate) rotRef.current.lambda += interaction.autoRotateSpeed * dt;
      const { lambda, phi, gamma } = rotRef.current;

      let d = '';
      for (const [i1, i2] of LINE_PAIRS) {
        const m1 = markers[i1], m2 = markers[i2];
        if (!m1 || !m2) continue;
        const pts = greatCircle(m1.longitude, m1.latitude, m2.longitude, m2.latitude);
        let penDown = false;
        for (const [lng, lat] of pts) {
          const p = projectPoint(lng, lat, lambda, phi, gamma, R, cx, cy);
          if (p.v) {
            d += (penDown ? 'L' : 'M') + p.sx.toFixed(1) + ',' + p.sy.toFixed(1);
            penDown = true;
          } else {
            penDown = false;
          }
        }
      }

      if (pathRef.current) pathRef.current.setAttribute('d', d || '');
      raf = requestAnimationFrame(step);
    };

    const section = containerRef.current?.closest('section');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          lastTime = performance.now();
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    if (section) io.observe(section);
    else { running = true; raf = requestAnimationFrame(step); }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [dims]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
      <svg style={{ width: '100%', height: '100%' }} viewBox={`0 0 ${dims.w} ${dims.h}`}>
        <path
          ref={pathRef}
          fill="none"
          stroke="rgba(204,34,0,0.42)"
          strokeWidth="0.9"
          strokeDasharray="5 4"
          d=""
        />
      </svg>
    </div>
  );
}

/* ── Location data ────────────────────────────────────────── */
const FLAG_MAP = { CA: flagCA, US: flagUS, ZA: flagZA };

const REGIONS = [
  {
    code: 'CA',
    name: 'Canada',
    count: '11',
    locations: [
      { name: 'Mississauga', isHQ: true },
      { name: 'Vaughan'               },
      { name: 'Ottawa'                },
      { name: 'Whitby'                },
      { name: 'Oakville'              },
      { name: 'Hamilton'              },
      { name: 'Waterloo'              },
      { name: 'Barrie'                },
      { name: 'Kingston'              },
      { name: 'Calgary'               },
      { name: 'Vancouver'             },
    ],
  },
  {
    code: 'US',
    name: 'United States',
    count: '2',
    locations: [
      { name: 'Fort Lauderdale' },
      { name: 'Orlando'         },
    ],
  },
  {
    code: 'ZA',
    name: 'South Africa',
    count: '1',
    locations: [
      { name: 'Cape Town' },
    ],
  },
];

const STATS = [
  { to: 14,   suffix: '',  label: 'Locations' },
  { to: 3,    suffix: '',  label: 'Countries' },
  { to: 9000, suffix: '+', label: 'Vehicles'  },
];

/* ── TacticalGlobe configuration ─────────────────────────── */
const GLOBE_MARKERS = [
  { label: 'Mississauga · ON',     description: 'Headquarters · Ontario',  latitude: 43.589,  longitude: -79.644,  color: '#cc2200' },
  { label: 'Vaughan · ON',         description: 'Ontario',                  latitude: 43.837,  longitude: -79.508,  color: '#cc2200' },
  { label: 'Ottawa · ON',          description: 'Ontario',                  latitude: 45.421,  longitude: -75.697,  color: '#cc2200' },
  { label: 'Hamilton · ON',        description: 'Ontario',                  latitude: 43.256,  longitude: -79.871,  color: '#cc2200' },
  { label: 'Barrie · ON',          description: 'Ontario',                  latitude: 44.389,  longitude: -79.690,  color: '#cc2200' },
  { label: 'Calgary · AB',         description: 'Alberta',                  latitude: 51.045,  longitude: -114.072, color: '#cc2200' },
  { label: 'Vancouver · BC',       description: 'British Columbia',         latitude: 49.283,  longitude: -123.121, color: '#cc2200' },
  { label: 'Fort Lauderdale · FL', description: 'Florida, USA',             latitude: 26.122,  longitude: -80.137,  color: '#cc2200' },
  { label: 'Orlando · FL',         description: 'Florida, USA',             latitude: 28.538,  longitude: -81.379,  color: '#cc2200' },
  { label: 'Cape Town · ZA',       description: 'South Africa',             latitude: -33.925, longitude: 18.424,   color: '#cc2200' },
];

const GLOBE_MAP_STYLE = {
  oceanColor:    '#050709',
  landFill:      '#1a1e23',
  landStroke:    '#282e36',
  strokeWidth:   0.4,
  hoverColor:    '#2c3540',
  disabledColor: '#0f1215',
};

const GLOBE_TOOLTIP = {
  show:        !IS_MOBILE,
  background:  'rgba(6, 8, 10, 0.94)',
  textColor:   '#e4e8e6',
  borderColor: 'rgba(255, 255, 255, 0.09)',
};

const GLOBE_GRID = {
  show:    true,
  color:   '#252c34',
  opacity: IS_MOBILE ? 0.15 : 0.28,
};

const GLOBE_LAYOUT = {
  cornerRadius: 0,
  padding:      0,
  showBorder:   false,
  borderColor:  'transparent',
};

const GLOBE_INTERACTION = {
  autoRotate:      !IS_MOBILE,
  autoRotateSpeed: IS_MOBILE ? 0 : 4.5,
  rotateX:         0,
  rotateY:         20,
  rotateZ:         -50,
  enableDrag:      !IS_MOBILE,
  dragSensitivity: IS_MOBILE ? 0 : 0.4,
  glowColor:       '#d40000',
  glowIntensity:   IS_MOBILE ? 0.20 : 0.55,
  showStars:       !IS_MOBILE,
  showLabels:      !IS_MOBILE,
};

/* ── Component ───────────────────────────────────────────── */
export default function GlobalLocations() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="locations" className={styles.section} ref={sectionRef}>

      <div className={styles.bgAtmo}  aria-hidden="true" />
      <div className={styles.bgStars} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={`${styles.header} ${revealed ? styles.in : ''}`}>
          <span className="section-label">Global Reach</span>
          <h2 className={styles.title}>
            ONE BRAND.<br />
            <span className="chrome-text">GLOBAL REACH.</span><br />
            LOCAL CRAFT.
          </h2>
          <p className={styles.sub}>
            From Canada to the United States to South Africa, Wraptors brings one
            customization standard across every location.
          </p>
        </div>

        {/* ── Interactive 3D Globe ── */}
        <div
          className={`${styles.globeOuter} ${revealed ? styles.in : ''}`}
          style={{ transitionDelay: revealed ? '0.18s' : '0s' }}
        >
          {!IS_MOBILE && <div className={styles.aura1}    aria-hidden="true" />}
          {!IS_MOBILE && <div className={styles.aura2}    aria-hidden="true" />}
          {!IS_MOBILE && <div className={styles.aura3}    aria-hidden="true" />}
          {!IS_MOBILE && <div className={styles.auraScan} aria-hidden="true" />}

          <div className={styles.globeWrap}>
            <MilitaryMap
              markers={GLOBE_MARKERS}
              countries={[]}
              mapStyle={GLOBE_MAP_STYLE}
              tooltip={GLOBE_TOOLTIP}
              grid={GLOBE_GRID}
              layout={GLOBE_LAYOUT}
              interaction={GLOBE_INTERACTION}
            />
            <GlobeLines markers={GLOBE_MARKERS} interaction={GLOBE_INTERACTION} />
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          className={`${styles.statsRow} ${revealed ? styles.in : ''}`}
          style={{ transitionDelay: revealed ? '0.34s' : '0s' }}
        >
          {STATS.map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statNum}>
                <CountUp to={s.to} suffix={s.suffix} duration={s.to >= 1000 ? 2000 : 1200} />
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Region panels ── */}
        <div className={styles.regions}>
          {REGIONS.map((region, i) => (
            <div
              key={region.code}
              className={`${styles.region} ${styles[`region${region.code}`]} ${revealed ? styles.in : ''}`}
              style={{ transitionDelay: revealed ? `${0.48 + i * 0.13}s` : '0s' }}
            >
              <div className={styles.regionHeader}>
                <img src={FLAG_MAP[region.code]} alt={region.name} className={styles.regionFlag} />
                <span className={styles.regionName}>{region.name}</span>
                <span className={styles.regionCount}>{region.count}</span>
              </div>

              <div className={`${styles.locationList} ${region.code === 'CA' ? styles.locationListCA : ''}`}>
                {region.locations.map(loc => (
                  <div key={loc.name} className={`${styles.locItem} ${loc.isHQ ? styles.locHQ : ''}`}>
                    <span className={styles.locDot} aria-hidden="true" />
                    <span className={styles.locName}>{loc.name}</span>
                    {loc.isHQ && <span className={styles.locBadge}>HQ</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

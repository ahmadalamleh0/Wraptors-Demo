import { useRef, useState, useEffect } from 'react';
import styles from './Reviews.module.css';

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

const STATS = [
  { to: 9000, suffix: '+', label: 'Vehicles Transformed' },
  { to: 13,   suffix: '',  label: 'Global Locations' },
  { to: 10,   suffix: '+', label: 'Years Experience' },
  { to: 573,  suffix: '+', label: 'Verified Reviews' },
];

const REVIEWS = [
  {
    id: 1,
    stars: 5,
    text: '"Wraptors completely transformed my G-Wagon. The wrap quality, fitment, and finish are unlike anything I\'ve seen. This is not a wrap shop — this is an experience."',
    author: 'Jordan M.',
    location: 'Mississauga',
    vehicle: 'Mercedes G63',
  },
  {
    id: 2,
    stars: 5,
    text: '"The PPF and ceramic package they did on my McLaren is absolutely flawless. Every panel, every curve — perfect. These guys are obsessed with detail."',
    author: 'Rahim A.',
    location: 'Vaughan',
    vehicle: 'McLaren 720S',
  },
  {
    id: 3,
    stars: 5,
    text: '"Starlight headliner turned my S-Class into a different universe. When people get in my car they genuinely don\'t believe it\'s the same vehicle."',
    author: 'Tanya K.',
    location: 'Toronto',
    vehicle: 'Mercedes S-Class',
  },
  {
    id: 4,
    stars: 5,
    text: '"From the moment I walked in to the moment I picked up my Lambo, the process was elite. Communication, craftsmanship, everything. Wraptors is the standard."',
    author: 'Marcus D.',
    location: 'Ottawa',
    vehicle: 'Lamborghini Urus',
  },
];

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={styles.star}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className={styles.section}>
      {/* Light streaks background */}
      <div className={styles.bg}>
        <div className={styles.streak1} />
        <div className={styles.streak2} />
        <div className={styles.streak3} />
      </div>

      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">Client Proof</span>
          <h2 className={styles.title}>
            PROOF IN EVERY<br />
            <span className="chrome-text">FINISH.</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          {STATS.map(({ to, suffix, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statValue}>
                <CountUp to={to} suffix={suffix} duration={to >= 1000 ? 2000 : 1200} />
              </span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>

        {/* Review cards */}
        <div className={styles.reviewGrid}>
          {REVIEWS.map((review) => (
            <div key={review.id} className={styles.card}>
              <Stars count={review.stars} />
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.reviewer}>
                {/* REPLACE: swap this div with a real avatar image */}
                <div className={styles.avatar}>
                  {review.author.charAt(0)}
                </div>
                <div className={styles.reviewerInfo}>
                  <span className={styles.reviewerName}>{review.author}</span>
                  <span className={styles.reviewerMeta}>
                    {review.vehicle} · {review.location}
                  </span>
                </div>
              </div>
              {/* Chrome border accent */}
              <div className={styles.cardAccent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

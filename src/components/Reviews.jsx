import styles from './Reviews.module.css';

const STATS = [
  { value: '9000+', label: 'Vehicles Transformed' },
  { value: '13',    label: 'Global Locations' },
  { value: '10+',   label: 'Years Experience' },
  { value: '573+',  label: 'Verified Reviews' },
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
          {STATS.map(({ value, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statValue}>{value}</span>
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

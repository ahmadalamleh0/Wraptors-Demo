import { useEffect, useRef, useState } from 'react';
import styles from './ClientReviews.module.css';

// Real client reviews (lightly cleaned up for spacing/punctuation only —
// wording and sentiment are unchanged). Ratings inferred as 5 stars from
// the uniformly glowing tone since none of these came with an explicit
// numeric rating attached.
const REVIEWS = [
  {
    name: 'Frank Leone',
    rating: 5,
    text: "Where do I start? Stas, Christel, Danny & the entire Wraptors Team are simply the BEST of the BEST! 10/10, hands down. The absolute best craftsmanship, attention to detail, service and knowledge. Whether you need tints, PPF, wrap, commercial branding, body shop work, Starlight headliner, vehicle transformation, etc. — look nowhere else! They do it all, and they do it properly. Words alone can't describe Wraptors Inc. If I could give more stars, I would. They recently did a complete wrap on my son's 9th Gen Si, and previously did full PPF & tints on our project Del Slow. Don't even bother bringing your car anywhere else! Can't wait to do something crazy on our Mustangs — members only.",
    tag: 'Honda Civic Si · Full Wrap',
  },
  {
    name: 'Jim Fleming',
    rating: 5,
    text: "Wraptors has worked on three of my cars over the past five years. My AMG GLS 63 was transformed with 24-inch rims and an incredible military green wrap. Next was my AMG S63 sedan, where the team installed a full Brabus conversion, and I paired it with a stage two tune, exhaust, intake and more — pushing out over 800 hp. Lastly, the team tackled my 1964 Cadillac Coupe Deville after a fender bender, and they got it back to looking better than new with an incredible matte black wrap. Wraptors is the best in the business and they fundamentally care — that's the difference. Caring, empathy, and a passion for happy customers. Shout out to Stas and the whole team, you guys are doing it right!",
    tag: '3 Vehicles · Wraps & Full Builds',
  },
  {
    name: 'Fernando Torraca',
    rating: 5,
    text: "Chose Wraptors Toronto for the wrap on my new MDX. After meeting with Stas and discussing options, I knew I was in the right place. I trusted them with the work and couldn't be more thrilled — they far exceeded my expectations. I'm so glad I trusted their suggestions; they know their stuff. The interactions with everyone at Wraptors were exceptional. The store is friendly and inviting. Phenomenal experience!",
    tag: 'Acura MDX · Full Wrap',
  },
  {
    name: 'Jerry .R',
    rating: 5,
    text: "I had an excellent experience at the Wraptors Mississauga location. I spoke to Christel about the racing stripes on my Mustang Shelby, and she was very knowledgeable and super friendly. The staff were very friendly and professional. I also dealt with Christel's husband, and he was super cool and friendly too. I strongly believe this is why they're so successful, and it's amazing to see the excellent work, customer service, and organization they've built. My car was a small job, but they treated me like I had a Ferrari, and I felt very comfortable dealing with them. I highly recommend Wraptors — they also had very fair prices, and I'll be using them again for my other vehicles.",
    tag: 'Ford Mustang Shelby · Racing Stripes',
  },
  {
    name: 'Rishan Veer',
    rating: 5,
    text: "I recently had my car wrapped at Wraptors Toronto, and I'm beyond impressed with the results! From the first consultation to the final reveal, the entire process was professional, smooth, and stress-free. The team is incredibly knowledgeable and helped me choose the perfect finish for my car. Their attention to detail is unreal — clean edges, zero bubbles, and a flawless finish that looks even better than factory paint. The transformation is absolutely stunning and turns heads everywhere I go. What really stood out was their dedication to quality and customer satisfaction — they treated my car with extreme care and made sure everything was perfect before handing it back. The pricing was fair, the timeline was accurate, and the overall service exceeded my expectations. If you're thinking about wrapping your car, I highly recommend Wraptors Toronto. You won't regret it!",
    tag: 'Full Vehicle Wrap',
  },
];

function GoogleG(props) {
  return (
    <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.14-3.15-.4-4.64H24v9.02h11.84c-.51 2.76-2.07 5.1-4.4 6.67v5.53h7.12C42.62 37.06 45.1 31.28 45.1 24.5z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.32l-7.12-5.53c-1.97 1.33-4.5 2.11-7.44 2.11-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.19c-.44-1.33-.69-2.75-.69-4.19s.25-2.86.69-4.19v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.89l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.11l7.35 5.7c1.73-5.2 6.58-9.06 12.31-9.06z" />
    </svg>
  );
}

function Stars({ rating }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          width="13"
          height="13"
          className={i < rating ? styles.starFilled : styles.starEmpty}
          aria-hidden="true"
        >
          <path d="M10 1.6l2.55 5.53 6.03.66-4.5 4.15 1.24 5.96L10 14.9l-5.32 3-1.24-5.96-4.5-4.15 6.03-.66L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.avatar} aria-hidden="true">{review.name.charAt(0)}</span>
        <span className={styles.reviewerName}>{review.name}</span>
        <GoogleG className={styles.cardGoogleG} />
      </div>
      <Stars rating={review.rating} />
      <p className={`${styles.reviewText} ${expanded ? styles.reviewTextExpanded : ''}`}>
        {review.text}
      </p>
      <button
        type="button"
        className={styles.readMore}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
      <div className={styles.cardFooter}>
        <span className={styles.reviewTag}>{review.tag.toUpperCase()}</span>
      </div>
    </article>
  );
}

export default function ClientReviews() {
  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const targets = [headerRef.current, summaryRef.current, trackRef.current].filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div ref={headerRef} className={`${styles.header} ${styles.animUp}`}>
          <span className={styles.label}>Client Experiences</span>
          <h2 className={styles.title}>OUR REVIEWS.</h2>
          <p className={styles.sub}>
            Real experiences from clients who trusted Wraptors with their vehicles.
          </p>
        </div>

        <div ref={summaryRef} className={`${styles.summaryBar} ${styles.animUp}`}>
          <div className={styles.summaryLeft}>
            <GoogleG className={styles.summaryGoogleG} />
            <div className={styles.summaryText}>
              <span className={styles.summarySource}>Google Reviews</span>
              <span className={styles.summaryRatingRow}>
                <span className={styles.summaryScore}>5.0</span>
                <Stars rating={5} />
                <span className={styles.summaryCount}>(581 reviews)</span>
              </span>
            </div>
          </div>
          <a
            className={styles.writeReviewButton}
            href="https://www.google.com/search?q=wraptors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Write a Review
          </a>
        </div>

        <div ref={trackRef} className={`${styles.track} ${styles.animUp}`}>
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

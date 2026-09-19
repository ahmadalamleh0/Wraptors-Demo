import { useState } from 'react';
import styles from './FaqAccordion.module.css';

function FaqItem({ q, a, mono }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.faqItem}>
      <button
        type="button"
        className={styles.faqQuestion}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {q}
        <span
          className={`${styles.faqIcon} ${mono ? styles.faqIconMono : ''} ${open ? styles.faqIconOpen : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && <p className={styles.faqAnswer}>{a}</p>}
    </div>
  );
}

// `mono` swaps the expand icon from the site's red accent to white — used
// on service pages, which are strictly black/white/grey. Everywhere else
// (Learn articles, GEO pages) keeps the default red icon.
export default function FaqAccordion({ faqs, mono = false }) {
  return (
    <div className={styles.faqList}>
      {faqs.map((faq) => (
        <FaqItem key={faq.q} q={faq.q} a={faq.a} mono={mono} />
      ))}
    </div>
  );
}

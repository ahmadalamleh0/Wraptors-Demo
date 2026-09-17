import { useState } from 'react';
import styles from './FaqAccordion.module.css';

function FaqItem({ q, a }) {
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
        <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ''}`} aria-hidden="true">+</span>
      </button>
      {open && <p className={styles.faqAnswer}>{a}</p>}
    </div>
  );
}

export default function FaqAccordion({ faqs }) {
  return (
    <div className={styles.faqList}>
      {faqs.map((faq) => (
        <FaqItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>
  );
}

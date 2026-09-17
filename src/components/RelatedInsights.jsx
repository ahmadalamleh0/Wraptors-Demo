import { Link } from 'react-router-dom';
import styles from './RelatedInsights.module.css';
import { getArticlesByCategory } from '../data/articles';

// Compact "Learn More" strip for service pages — 3 article cards for the
// matching Learn category, plus a link to the full library. Deliberately
// small; the full editorial experience lives on /learn itself.
export default function RelatedInsights({ category }) {
  const articles = getArticlesByCategory(category).slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Learn More</span>
          <h2 className={styles.title}>Explore the Details Before You Build</h2>
        </div>
        <div className={styles.grid}>
          {articles.map((article) => (
            <Link key={article.slug} to={`/learn/${article.slug}`} className={styles.card}>
              <span className={styles.cardTitle}>{article.title}</span>
              <span className={styles.cardLink}>Read <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <Link to="/learn" className={styles.viewAll}>View All Insights <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}

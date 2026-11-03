import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceDetails.module.css';
import { SERVICE_DETAILS, publishedLinks, serviceSchema } from '../data/serviceSeo';
import { SITE_URL } from '../lib/siteConfig';
import { useStructuredData } from '../lib/useStructuredData';

// Visible "in Dubai" detail block for a core service page: a keyword-led
// H2, short H3 topics with links to the matching guides, and onward links
// to related services and the studio. Also adds the page's Service +
// BreadcrumbList JSON-LD. Content: src/data/serviceSeo.js.
export default function ServiceDetails({ service }) {
  const d = SERVICE_DETAILS[service];
  const schema = useMemo(() => (d ? serviceSchema({
    name: d.serviceName,
    description: d.lead,
    url: `${SITE_URL}${d.path}`,
    siteUrl: SITE_URL,
    crumbs: [
      { label: 'Home', path: '/' },
      { label: d.serviceName, path: d.path },
    ],
  }) : null), [d]);
  useStructuredData(schema);
  if (!d) return null;

  const links = publishedLinks(d.links);

  return (
    <section className={styles.section} aria-labelledby={`${service}-details`}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>{d.eyebrow}</span>
        <h2 id={`${service}-details`} className={styles.heading}>{d.heading}</h2>
        <p className={styles.lead}>{d.lead}</p>
      </div>

      <div className={styles.grid}>
        {d.items.map((item) => {
          const itemLinks = publishedLinks(item.links);
          return (
            <div key={item.heading} className={styles.item}>
              <h3 className={styles.itemHeading}>{item.heading}</h3>
              <p className={styles.itemBody}>{item.body}</p>
              {itemLinks.map((l) => (
                <Link key={l.to} to={l.to} className={styles.itemLink}>
                  {l.label} <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          );
        })}
      </div>

      {links.length > 0 && (
        <nav className={styles.related} aria-label="Related services">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={styles.pill}>{l.label}</Link>
          ))}
          <a href="#cta" className={`${styles.pill} ${styles.pillPrimary}`}>Request a Quote</a>
        </nav>
      )}
    </section>
  );
}

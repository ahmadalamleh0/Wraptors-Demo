import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceDetails.module.css';
import { SERVICE_DETAILS, FOCUS_PAGES, FOCUS_PAGE_PATH, publishedLinks, serviceSchema } from '../data/serviceSeo';
import { PROJECT_GALLERIES } from '../data/projectGalleries';
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
  // Selected Work: published project pages for this service, with a photo.
  const projects = (d.projects || [])
    .map((slug) => ({ page: FOCUS_PAGES.find((p) => p.slug === slug), gallery: PROJECT_GALLERIES[slug] }))
    .filter(({ page, gallery }) => page?.published && gallery);

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

      {projects.length > 0 && (
        <div className={styles.work}>
          <span className={styles.workLabel}>Selected Work</span>
          <div className={styles.workRow}>
            {projects.map(({ page, gallery }) => (
              <Link key={page.slug} to={FOCUS_PAGE_PATH(page.slug)} className={styles.workCard}>
                <img
                  src={gallery.photos[0].srcSmall}
                  alt={gallery.photos[0].alt}
                  loading="lazy"
                  className={styles.workImg}
                  style={{ objectPosition: gallery.heroPosition }}
                />
                <span className={styles.workShade} aria-hidden="true" />
                <span className={styles.workText}>
                  <span className={styles.workEyebrow}>Wraptors Project</span>
                  <span className={styles.workTitle}>{gallery.title}</span>
                  <span className={styles.workCta}>View Project <span aria-hidden="true">→</span></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

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

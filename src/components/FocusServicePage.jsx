import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import ServiceHero from './ServiceHero';
import ServiceIntroSection from './ServiceIntroSection';
import ServiceProcess from './ServiceProcess';
import QuoteSection from './QuoteSection';
import FaqAccordion from './FaqAccordion';
import StarfieldBg from './StarfieldBg';
import ProjectGallery from './ProjectGallery';
import styles from './FocusServicePage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { SITE_URL } from '../lib/siteConfig';
import { FOCUS_PAGES, FOCUS_PAGE_PATH, publishedLinks, serviceSchema } from '../data/serviceSeo';
import { PROJECT_GALLERIES } from '../data/projectGalleries';

// Unpublished pages (waiting on photos or approval) stay out of the index
// even in a production build. Restores whatever robots tag was there.
function useNoindex(active) {
  useEffect(() => {
    if (!active) return undefined;
    let el = document.querySelector('meta[name="robots"]');
    const created = !el;
    const prev = el?.getAttribute('content');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, follow');
    return () => {
      if (created) el.remove();
      else if (prev !== null) el.setAttribute('content', prev);
    };
  }, [active]);
}

// One template for the narrower service pages in src/data/serviceSeo.js
// (Chrome Delete and the vehicle-specific pages). Same hero, intro, process
// and quote system as every other service page.
export default function FocusServicePage({ page }) {
  const path = FOCUS_PAGE_PATH(page.slug);
  const url = `${SITE_URL}${path}`;
  useDocumentMeta(page.seoTitle, page.metaDescription, url);
  useNoindex(!page.published);

  const crumbs = useMemo(() => [
    { label: 'Home', path: '/' },
    page.parent,
    { label: page.serviceName, path },
  ], [page, path]);

  const schema = useMemo(() => {
    const base = serviceSchema({
      name: page.serviceName,
      description: page.metaDescription,
      url,
      siteUrl: SITE_URL,
      crumbs,
    });
    if (page.faqs?.length) {
      base['@graph'].push({
        '@type': 'FAQPage',
        mainEntity: page.faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      });
    }
    return base;
  }, [page, url, crumbs]);
  useStructuredData(schema);

  // Real project photo when the page has one; otherwise the starfield or
  // the photo-free gradient backdrop.
  const gallery = PROJECT_GALLERIES[page.slug];
  const heroPhoto = gallery?.photos[0];
  let media = <div className={styles.heroGradient} aria-hidden="true" />;
  if (heroPhoto) {
    media = (
      <img
        src={heroPhoto.src}
        srcSet={`${heroPhoto.srcSmall} 720w, ${heroPhoto.src} 1440w`}
        sizes="100vw"
        alt=""
        loading="eager"
        fetchPriority="high"
        style={{ objectPosition: gallery.heroPosition }}
      />
    );
  } else if (page.heroMedia === 'starfield') {
    media = <StarfieldBg />;
  }

  return (
    <>
      <Navbar alwaysVisible />
      <main>
        <ServiceHero
          eyebrow={page.eyebrow}
          headline={page.headline}
          supportingLine={page.supportingLine}
          media={media}
        />

        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.path}>
                {i < crumbs.length - 1
                  ? <Link to={c.path}>{c.label}</Link>
                  : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <ServiceIntroSection
          kicker={page.intro.kicker}
          statement={page.intro.statement}
          description={page.intro.description}
        />

        {gallery && <ProjectGallery gallery={gallery} />}

        <section className={styles.body}>
          {page.sections.map((s) => {
            const links = publishedLinks(s.links);
            return (
              <div key={s.heading} className={styles.block}>
                <h2 className={styles.blockHeading}>{s.heading}</h2>
                {s.body.map((p, i) => <p key={i} className={styles.paragraph}>{p}</p>)}
                {s.points && (
                  <ul className={styles.points}>
                    {s.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                )}
                {links.length > 0 && (
                  <div className={styles.links}>
                    {links.map((l) => (
                      <Link key={l.to} to={l.to} className={styles.link}>
                        {l.label} <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {page.process && (
          <ServiceProcess
            eyebrow={page.process.eyebrow}
            heading={page.process.heading}
            steps={page.process.steps}
          />
        )}

        <QuoteSection
          id="cta"
          initialService={page.quoteService}
          subtitle="Ready to take the next step?"
          compact
        />

        {page.faqs?.length > 0 && (
          <section className={styles.faqSection}>
            <div className={styles.faqHead}>
              <span className={styles.eyebrowSmall}>Questions</span>
              <h2 className={styles.sectionTitle}>{page.serviceName} FAQs</h2>
            </div>
            <FaqAccordion faqs={page.faqs} />
          </section>
        )}

        <section className={styles.onward}>
          <span className={styles.eyebrowSmall}>Wraptors Dubai</span>
          <h2 className={styles.sectionTitle}>Visit The Al Quoz Studio</h2>
          <p className={styles.onwardText}>
            Every job is carried out at our studio at 32 9B St, Al Quoz Industrial Area 4, Dubai (Unit B05).
          </p>
          <div className={styles.onwardRow}>
            <Link to={page.parent.path} className={styles.pill}>{page.parent.label}</Link>
            <Link to="/areas/al-quoz/" className={styles.pill}>The Al Quoz Studio</Link>
            <a href="#cta" className={`${styles.pill} ${styles.pillPrimary}`}>Request a Quote</a>
          </div>
          {gallery && (
            <>
              <span className={`${styles.eyebrowSmall} ${styles.moreLabel}`}>More Wraptors Projects</span>
              <div className={styles.onwardRow}>
                {FOCUS_PAGES
                  .filter((p) => p.slug !== page.slug && p.published && PROJECT_GALLERIES[p.slug])
                  .map((p) => (
                    <Link key={p.slug} to={FOCUS_PAGE_PATH(p.slug)} className={styles.pill}>{p.serviceName}</Link>
                  ))}
              </div>
            </>
          )}
          {page.disclaimer && <p className={styles.disclaimer}>{page.disclaimer}</p>}
        </section>
      </main>
      <Footer solid />
      <FloatingWhatsApp />
    </>
  );
}

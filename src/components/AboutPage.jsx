import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MediaPlaceholder from './MediaPlaceholder';
import styles from './AboutPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { SITE_URL } from '../lib/siteConfig';
import { TEAM_MEMBERS } from '../data/team';

const PRINCIPLES = [
  {
    title: 'Craft',
    description: 'Preparation, installation and finishing matter as much as the material itself.',
  },
  {
    title: 'Detail',
    description: 'The difference is often in the edges, body lines and pieces most people never notice.',
  },
  {
    title: 'Vision',
    description: 'A build should feel complete, not like individual services were added separately.',
  },
  {
    title: 'Evolution',
    description: 'Wraptors continues to push its work, studios and automotive experiences forward.',
  },
];

const SEO_TITLE = 'About Wraptors — Built Different. Since Day One.';
const SEO_DESCRIPTION = 'How Wraptors grew from a single automotive customization shop into an international brand with studios across multiple markets, including Wraptors Dubai.';

// Brand story page — kept deliberately concise per design brief. Team roster
// is data-driven (src/data/team.js) so real photography/bios can be dropped
// in later without touching this file.
export default function AboutPage() {
  const canonicalUrl = `${SITE_URL}/about`;
  useDocumentMeta(SEO_TITLE, SEO_DESCRIPTION, canonicalUrl);

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wraptors',
    url: SITE_URL,
    description: SEO_DESCRIPTION,
  });

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: canonicalUrl },
    ],
  });

  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Breadcrumbs ── */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>About</span>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>About Wraptors</span>
            <h1 className={styles.headline}>Built Different. Since Day One.</h1>
            <p className={styles.intro}>
              Wraptors was built around one idea: transform vehicles without compromising the
              details that make them special. What started in Canada has grown into an
              international automotive brand with teams, studios and builds across multiple
              markets.
            </p>
          </div>
          <div className={styles.heroMedia}>
            {/* REPLACE: swap with real Wraptors workshop/build photo or video */}
            <MediaPlaceholder
              label="Wraptors Workshop / Build — Cinematic Photo or Video Placeholder"
              style={{ minHeight: 360 }}
            />
          </div>
        </section>

        {/* ── The Story ── */}
        <section className={styles.storySection}>
          <div className={styles.storyInner}>
            <h2 className={styles.sectionHeading}>More Than A Wrap Shop.</h2>
            <p className={styles.paragraph}>
              Wraptors started as a hands-on automotive customization operation, built by people
              who understood vehicles first and treated wraps, protection and finishing as a
              craft rather than a commodity. That mindset — precision over shortcuts — is still
              what shapes every build today.
            </p>
            <p className={styles.paragraph}>
              What began as a single operation has grown into a multi-location brand, with
              studios now operating across Canada, the United States, South Africa and the
              Middle East. Each new location was built to carry the same standard forward, not
              to dilute it.
            </p>
            <p className={styles.paragraph}>
              At its core, Wraptors is still focused on the same three things: transforming how a
              vehicle looks, protecting what's underneath it, and doing both with a level of
              craftsmanship that holds up to close inspection.
            </p>
          </div>
        </section>

        {/* ── The Wraptors Standard ── */}
        <section className={styles.standardSection}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrowSmall}>The Wraptors Standard</span>
            <h2 className={styles.sectionTitle}>Every vehicle is different. The standard isn&rsquo;t.</h2>
          </div>
          <div className={styles.principlesGrid}>
            {PRINCIPLES.map(({ title, description }) => (
              <div key={title} className={styles.principleCard}>
                <span className={styles.principleTitle}>{title}</span>
                <p className={styles.principleDesc}>{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The Team ── */}
        <section className={styles.teamSection}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrowSmall}>The People Behind The Builds</span>
            <h2 className={styles.sectionTitle}>The Team</h2>
          </div>

          {TEAM_MEMBERS.length > 0 ? (
            <div className={styles.teamGrid}>
              {TEAM_MEMBERS.map((member) => (
                <div key={member.name} className={styles.teamCard}>
                  <div className={styles.teamPhotoWrap}>
                    <img src={member.photo} alt={member.name} className={styles.teamPhoto} />
                  </div>
                  <span className={styles.teamName}>{member.name}</span>
                  <span className={styles.teamRole}>{member.role}</span>
                  {member.bio && <p className={styles.teamBio}>{member.bio}</p>}
                  {member.social && (
                    <a href={member.social} target="_blank" rel="noopener noreferrer" className={styles.teamSocial}>
                      Instagram
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.teamEmpty}>
              <MediaPlaceholder
                label="Wraptors Dubai Team — Photography Coming Soon"
                showPlay={false}
                style={{ minHeight: 280 }}
              />
              <p className={styles.teamEmptyText}>
                The faces behind Wraptors Dubai — coming soon.
              </p>
            </div>
          )}
        </section>

        {/* ── Global Wraptors ── */}
        <section className={styles.globalSection}>
          <div className={styles.globalInner}>
            <h2 className={styles.sectionHeading}>One Name. Multiple Cities.</h2>
            <p className={styles.paragraph}>
              Wraptors operates across multiple markets while maintaining one recognizable
              brand and one standard — the same craftsmanship, the same attention to detail,
              wherever a studio carries the name.
            </p>
            <Link to="/#locations" className={styles.exploreLink}>
              Explore Locations <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Your Build Starts Here.</h2>
          <div className={styles.ctaActions}>
            <a href="/#cta" className={styles.ctaPrimary}>
              Get a Quote <span aria-hidden="true">→</span>
            </a>
            <Link to="/areas/al-quoz" className={styles.ctaSecondary}>
              Visit Wraptors Dubai <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

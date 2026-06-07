import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';

const NAV_LINKS = [
  { label: 'Services',  href: '#services'  },
  { label: 'Locations', href: '#locations' },
  { label: 'Franchise', href: '#timeline'  },
  { label: 'Culture',   href: '#founder'   },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [linksRevealed, setLinksRevealed] = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Navbar frosted bg + logo mark appear when hero is almost fully scrolled
      setScrolled(y > window.innerHeight * 0.88);
      // Links / CTA / burger reveal as soon as hero scroll transition begins
      setLinksRevealed(y > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''} ${!linksRevealed ? styles.navHeroMode : ''}`}>

      {/* Logo mark — the hero logo animates into this position on scroll.
          This SVG fades in as the hero logo arrives, for a clean handoff. */}
      <a href="#hero" className={styles.logo} aria-label="Wraptors — back to top">
        <WraptorsMafiaLogo
          className={`${styles.navLogoMark} ${scrolled ? styles.navLogoVisible : ''}`}
        />
      </a>

      {/* Desktop links */}
      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={styles.link} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          </li>
        ))}
        <li className={styles.mobileCta}>
          <a href="#cta" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Start Your Build
          </a>
        </li>
      </ul>

      {/* Desktop CTA */}
      <a href="#cta" className={`btn-primary ${styles.navCta}`}>
        Start Your Build
      </a>

      {/* Mobile burger */}
      <button
        className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

    </nav>
  );
}

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import WraptorsMafiaLogo from './WraptorsMafiaLogo';

const NAV_LINKS = [
  { label: 'Services',  href: '/#services'  },
  { label: 'Locations', href: '/#locations' },
  { label: 'Franchise', href: '/#timeline'  },
  { label: 'Culture',   href: '/#founder'   },
];

// Full-screen mobile menu — a deliberately separate, simplified list from
// the desktop nav above rather than the same items reflowed, per the
// requested HOME → CONTACT running order.
const MOBILE_NAV_LINKS = [
  { label: 'Home',      href: '/'            },
  { label: 'Services',  href: '/#services'   },
  { label: 'Builds',    href: '/#timeline'   },
  { label: 'Locations', href: '/#locations'  },
  { label: 'Learn',     to:   '/learn'       },
  { label: 'About',     to:   '/about'       },
  { label: 'Contact',   href: '/#contact'    },
];

export default function Navbar({ alwaysVisible = false }) {
  const [scrolled,      setScrolled]      = useState(alwaysVisible);
  const [linksRevealed, setLinksRevealed] = useState(alwaysVisible);
  const [logoReady,     setLogoReady]     = useState(alwaysVisible);
  const [menuOpen,      setMenuOpen]      = useState(false);

  useEffect(() => {
    if (alwaysVisible) return;
    // Show logo immediately when hero exits (no scroll required)
    const onHeroExit = () => setLogoReady(true);
    window.addEventListener('hero:exit', onHeroExit, { once: true });
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.88);
      setLinksRevealed(y > 40);
      if (y > 40) setLogoReady(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hero:exit', onHeroExit);
    };
  }, [alwaysVisible]);

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Portalled to document.body: nested inside <nav> (position:fixed,
  // z-index:200), this panel's own z-index would only ever be compared
  // against .nav's *other children* — .nav's stacking context as a whole
  // still loses to any higher-z-index element elsewhere in the document
  // (e.g. PresentationAdminControl's floating gear at 9999). Rendering at
  // the body level puts its z-index in direct competition with everything
  // else on the page, which is what "above ... all floating controls"
  // actually requires.
  const mobileMenu = (
    <div
      className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
      aria-hidden={!menuOpen}
    >
      <div className={styles.mobileMenuTop}>
        <Link to="/" className={styles.mobileMenuLogo} aria-label="Wraptors — home" onClick={closeMenu}>
          <WraptorsMafiaLogo className={styles.mobileMenuLogoMark} />
        </Link>
        <button
          className={styles.mobileMenuClose}
          onClick={closeMenu}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
        >
          <span /><span />
        </button>
      </div>

      <div className={styles.mobileMenuScroll}>
        <ul className={styles.mobileMenuList}>
          {MOBILE_NAV_LINKS.map(({ label, href, to }) => (
            <li key={label} className={styles.mobileMenuItem}>
              {to ? (
                <Link to={to} className={styles.mobileMenuLink} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                  {label}
                </Link>
              ) : (
                <a href={href} className={styles.mobileMenuLink} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.mobileMenuCtaRow}>
          <a
            href="/#cta"
            className={styles.mobileMenuCta}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            Start Your Build <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''} ${!linksRevealed ? styles.navHeroMode : ''}`}>

      {/* Logo mark */}
      <a href="/" className={styles.logo} aria-label="Wraptors — back to home">
        <WraptorsMafiaLogo
          className={`${styles.navLogoMark} ${logoReady ? styles.navLogoVisible : ''}`}
        />
      </a>

      {/* Desktop links */}
      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={styles.link}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <Link to="/about" className={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/learn" className={styles.link}>
            Learn
          </Link>
        </li>
      </ul>

      {/* Desktop CTA */}
      <a href="/#cta" className={`btn-primary ${styles.navCta}`}>
        Start Your Build
      </a>

      {/* Mobile burger — opens the full-screen mobile menu below */}
      <button
        className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

    </nav>
    {createPortal(mobileMenu, document.body)}
    </>
  );
}

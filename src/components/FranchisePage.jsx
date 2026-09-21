import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './BookingPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { SITE_URL } from '../lib/siteConfig';
import { buildFranchiseWhatsAppMessage, buildWhatsAppUrl } from '../lib/whatsappEnquiry';
import { submitToWeb3Forms } from '../lib/web3forms';

const WHATSAPP_URL = buildWhatsAppUrl("Hi Wraptors, I'd like to ask about franchising.");

const SEO_TITLE = 'Franchise With Wraptors | Wraptors Dubai';
const SEO_DESCRIPTION = 'Bring the Wraptors brand to your market. Explore franchise opportunities for premium vehicle wraps, PPF, ceramic coating and automotive styling.';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  location: '',
  experience: '',
  interest: '',
  message: '',
};

// Reuses BookingPage's form layout/styling exactly (see BookingPage.module.css)
// so this stays visually identical to the rest of the site's contact flows.
export default function FranchisePage() {
  const canonicalUrl = `${SITE_URL}/franchise`;
  useDocumentMeta(SEO_TITLE, SEO_DESCRIPTION, canonicalUrl);

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Franchise', item: canonicalUrl },
    ],
  });

  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const [error, setError] = useState('');
  const [waUrl, setWaUrl] = useState(WHATSAPP_URL);

  useEffect(() => {
    if (status === 'done' || status === 'error') window.scrollTo(0, 0);
  }, [status]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.location) {
      setError('Please fill in your name, email, phone and city/country so we can follow up.');
      return;
    }
    setError('');
    setStatus('submitting');

    try {
      await submitToWeb3Forms({
        subject: 'New Franchise Inquiry — Wraptors Dubai',
        from_name: 'Wraptors Dubai Franchise Form',
        form_type: 'Franchise Inquiry',
        name: form.name,
        email: form.email,
        phone: form.phone,
        city_country: form.location,
        business_experience: form.experience,
        franchise_interest: form.interest,
        message: form.message,
      });
      setStatus('done');
    } catch (err) {
      // Web3Forms is the primary path; WhatsApp is only offered as a
      // fallback if that submission actually fails.
      console.error('[Franchise] Web3Forms submission failed:', err);
      setWaUrl(buildWhatsAppUrl(buildFranchiseWhatsAppMessage(form)));
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <>
        <Navbar alwaysVisible />
        <main>
          <section className={styles.confirmSection}>
            <span className={styles.eyebrow}>Thank You</span>
            <h1 className={styles.confirmTitle}>Inquiry Received.</h1>
            <p className={styles.confirmBody}>
              Thanks, {form.name.split(' ')[0] || 'there'} — we&rsquo;ve received your franchise
              inquiry and our team will follow up directly.
            </p>
            <div className={styles.confirmActions}>
              <Link to="/" className={styles.ctaPrimary}>Back To Home</Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <Navbar alwaysVisible />
        <main>
          <section className={styles.confirmSection}>
            <span className={styles.eyebrow}>Something Went Wrong</span>
            <h1 className={styles.confirmTitle}>Try WhatsApp Instead.</h1>
            <p className={styles.confirmBody}>
              We couldn&rsquo;t send your franchise inquiry just now — message us directly on
              WhatsApp instead and we&rsquo;ll pick it up from there.
            </p>
            <div className={styles.confirmActions}>
              <Link to="/" className={styles.ctaPrimary}>Back To Home</Link>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                Open WhatsApp
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar alwaysVisible />
      <main>

        {/* ── Breadcrumbs ── */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>Franchise</span>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Franchise Opportunities</span>
          <h1 className={styles.headline}>Franchise</h1>
          <p className={styles.intro}>
            Bring the Wraptors name, standard and craftsmanship to a new market. We partner with
            select operators who share our commitment to precision, quality and an uncompromising
            client experience — tell us about yourself below and our team will follow up directly.
          </p>
        </section>

        {/* ── Form ── */}
        <section className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Your Details</span>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Name</span>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={update('name')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Email</span>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={update('email')}
                    className={styles.input}
                  />
                </label>
              </div>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>WhatsApp / Phone</span>
                  <input
                    type="tel"
                    placeholder="+971 5X XXX XXXX"
                    value={form.phone}
                    onChange={update('phone')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>City / Country</span>
                  <input
                    type="text"
                    placeholder="e.g. Riyadh, Saudi Arabia"
                    value={form.location}
                    onChange={update('location')}
                    className={styles.input}
                  />
                </label>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Current Business / Automotive Experience <span className={styles.optional}>(optional)</span></span>
              <label className={styles.field}>
                <textarea
                  placeholder="Tell us about your current business or automotive background."
                  value={form.experience}
                  onChange={update('experience')}
                  className={styles.textarea}
                  rows={4}
                />
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Franchise Interest <span className={styles.optional}>(optional)</span></span>
              <label className={styles.field}>
                <input
                  type="text"
                  placeholder="e.g. Opening a Wraptors studio in your city"
                  value={form.interest}
                  onChange={update('interest')}
                  className={styles.input}
                />
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Message <span className={styles.optional}>(optional)</span></span>
              <label className={styles.field}>
                <textarea
                  placeholder="Anything else we should know?"
                  value={form.message}
                  onChange={update('message')}
                  className={styles.textarea}
                  rows={4}
                />
              </label>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Submit Inquiry'}
              </button>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>
                Prefer WhatsApp? Message Us <span aria-hidden="true">→</span>
              </a>
            </div>

          </form>
        </section>

      </main>
      <Footer />
    </>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './BookingPage.module.css';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { useStructuredData } from '../lib/useStructuredData';
import { submitBookingRequest } from '../lib/submitBookingRequest';
import { SITE_URL } from '../lib/siteConfig';
import { BOOKING_SERVICES } from '../data/bookingOptions';

const WHATSAPP_URL = 'https://wa.me/971502532392';

const SEO_TITLE = 'Book A Consultation — Wraptors Dubai';
const SEO_DESCRIPTION = 'Book a consultation or visit with Wraptors Dubai. Tell us about your vehicle, what you’re interested in, and when you’d like to come by — no account required.';

const EMPTY_FORM = {
  year: '',
  make: '',
  model: '',
  services: [],
  preferredDate: '',
  name: '',
  phone: '',
  message: '',
};

// Booking is for someone ready to speak/visit; the separate Get a Quote
// flow (src/features/quote-form-draft) is for someone primarily looking
// for pricing. Kept intentionally minimal — no account, no login, just
// the fields needed to follow up.
export default function BookingPage() {
  const canonicalUrl = `${SITE_URL}/book`;
  useDocumentMeta(SEO_TITLE, SEO_DESCRIPTION, canonicalUrl);

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Book A Consultation', item: canonicalUrl },
    ],
  });

  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | submitting | done
  const [error, setError] = useState('');

  // The confirmation view is much shorter than the filled-out form — without
  // this, whatever scroll position the user was at while filling the form
  // can leave the confirmation message below the fold.
  useEffect(() => {
    if (status === 'done') window.scrollTo(0, 0);
  }, [status]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleService = (id) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id)
        ? f.services.filter((s) => s !== id)
        : [...f.services, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.year || !form.make || !form.model || !form.name || !form.phone) {
      setError('Please fill in your vehicle and contact details so we can follow up.');
      return;
    }
    setError('');
    setStatus('submitting');
    await submitBookingRequest(form);
    setStatus('done');
  };

  if (status === 'done') {
    return (
      <>
        <Navbar alwaysVisible />
        <main>
          <section className={styles.confirmSection}>
            <span className={styles.eyebrow}>Request Received</span>
            <h1 className={styles.confirmTitle}>We&rsquo;ll Be In Touch Shortly.</h1>
            <p className={styles.confirmBody}>
              Thanks, {form.name.split(' ')[0] || 'there'} — we&rsquo;ve got your details and
              will reach out to confirm your visit.
            </p>
            <div className={styles.confirmActions}>
              <Link to="/" className={styles.ctaPrimary}>Back To Home</Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
                Message Us On WhatsApp
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
          <span className={styles.breadcrumbCurrent}>Book A Consultation</span>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Book Your Visit</span>
          <h1 className={styles.headline}>Let&rsquo;s Get Your Build Started.</h1>
          <p className={styles.intro}>
            Tell us about your vehicle and what you&rsquo;re looking for — we&rsquo;ll follow up
            to confirm your visit. No account, no login, just the details we need to help.
          </p>
        </section>

        {/* ── Form ── */}
        <section className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Your Vehicle</span>
              <div className={styles.row3}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Year</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="2024"
                    value={form.year}
                    onChange={update('year')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Make</span>
                  <input
                    type="text"
                    placeholder="e.g. BMW"
                    value={form.make}
                    onChange={update('make')}
                    className={styles.input}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Model</span>
                  <input
                    type="text"
                    placeholder="e.g. M4"
                    value={form.model}
                    onChange={update('model')}
                    className={styles.input}
                  />
                </label>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Service(s) Interested In</span>
              <div className={styles.serviceGrid}>
                {BOOKING_SERVICES.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleService(id)}
                    className={`${styles.serviceOption} ${form.services.includes(id) ? styles.serviceOptionActive : ''}`}
                    aria-pressed={form.services.includes(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.groupLabel}>Preferred Date</span>
              <label className={styles.field}>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={update('preferredDate')}
                  className={styles.input}
                />
              </label>
            </div>

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
                  <span className={styles.fieldLabel}>Phone / WhatsApp</span>
                  <input
                    type="tel"
                    placeholder="+971 5X XXX XXXX"
                    value={form.phone}
                    onChange={update('phone')}
                    className={styles.input}
                  />
                </label>
              </div>
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
                {status === 'submitting' ? 'Sending…' : 'Confirm Booking Request'}
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

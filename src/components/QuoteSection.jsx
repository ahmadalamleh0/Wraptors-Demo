import { useState } from 'react';
import {
  QUOTE_STEPS,
  QUOTE_SERVICES,
  QUOTE_PROJECT_OPTIONS,
  QUOTE_TIMING_OPTIONS,
  QUOTE_CONTACT_METHODS,
} from '../data/quoteFormData';
import { submitQuoteRequest } from '../lib/submitQuoteRequest';
import styles from './QuoteSection.module.css';

const WHATSAPP_URL = 'https://wa.me/971502532392';

const EMPTY_FORM = {
  service: '',
  year: '', make: '', model: '',
  projectDetail: '', notes: '',
  timing: '', preferredDate: '',
  name: '', phone: '', email: '', preferredContact: '',
};

function validateStep(step, form) {
  const err = {};
  if (step === 1 && !form.service) {
    err.service = 'Choose a service to continue';
  }
  if (step === 2) {
    if (!form.year.trim())  err.year  = 'Required';
    if (!form.make.trim())  err.make  = 'Required';
    if (!form.model.trim()) err.model = 'Required';
  }
  if (step === 3) {
    const hasOptions = Boolean(QUOTE_PROJECT_OPTIONS[form.service]);
    if (hasOptions && !form.projectDetail) err.projectDetail = 'Choose the option closest to what you want';
  }
  if (step === 4 && !form.timing) {
    err.timing = 'Choose a timeframe to continue';
  }
  if (step === 5) {
    if (!form.name.trim())  err.name  = 'Required';
    if (!form.phone.trim()) err.phone = 'Required';
    const email = form.email.trim();
    if (!email) err.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Enter a valid email address';
  }
  return err;
}

// One reusable selectable card, used for service, build-option and
// timing choices — a single-select "radio" behind a plain button so no
// native radio styling has to be fought.
function OptionRow({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`${styles.optionRow} ${selected ? styles.optionRowActive : ''}`}
    >
      <span className={styles.optionLabel}>{label}</span>
      <span className={styles.optionCheck} aria-hidden="true" />
    </button>
  );
}

export default function QuoteSection({
  id,
  initialService,
  eyebrow = 'Quote Request',
  title = 'Start Your Build',
  subtitle = 'Tell us what you’re building and we’ll shape the right next step.',
  compact = false,
}) {
  // On a service page, the visitor already told us what they're here for
  // by being on that page — start them one step in rather than asking
  // again. Step 1 stays fully intact and reachable via Back, so they can
  // still change the service if they want to.
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [form, setForm] = useState(() => (
    initialService ? { ...EMPTY_FORM, service: initialService } : EMPTY_FORM
  ));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const selectService = (id) => setForm((f) => ({ ...f, service: id, projectDetail: '' }));
  const selectOption = (field, id) => setForm((f) => ({ ...f, [field]: id }));

  const goNext = async () => {
    const err = validateStep(step, form);
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    if (step < QUOTE_STEPS.length) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    await submitQuoteRequest(form);
    setSubmitting(false);
    setSubmitted(true);
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const projectOptions = QUOTE_PROJECT_OPTIONS[form.service];
  const isLastStep = step === QUOTE_STEPS.length;

  return (
    <section id={id} className={`${styles.section} ${compact ? styles.sectionCompact : ''}`}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.sub}>{subtitle}</p>
      </div>

      <div className={styles.panel}>
        {submitted ? (
          <div className={styles.success}>
            <span className={styles.successEyebrow}>Request Received</span>
            <h3 className={styles.successTitle}>Request Received.</h3>
            <p className={styles.successBody}>
              The Wraptors team will review your build and get back to you shortly.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.successCta}>
              WhatsApp Us <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : (
          <>
            {/* ── Progress ── */}
            <div className={styles.progress}>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${((step - 1) / (QUOTE_STEPS.length - 1)) * 100}%` }}
                />
              </div>
              <ol className={styles.progressList}>
                {QUOTE_STEPS.map((s) => (
                  <li
                    key={s.id}
                    className={`${styles.progressItem} ${s.id === step ? styles.progressItemActive : ''} ${s.id < step ? styles.progressItemDone : ''}`}
                  >
                    <span className={styles.progressNum}>{String(s.id).padStart(2, '0')}</span>
                    <span className={styles.progressLabel}>{s.label}</span>
                  </li>
                ))}
              </ol>
              <div className={styles.progressCompact}>
                <span className={styles.progressCompactNum}>{String(step).padStart(2, '0')}</span>
                <span aria-hidden="true">/</span>
                <span className={styles.progressCompactLabel}>{QUOTE_STEPS[step - 1].label}</span>
              </div>
            </div>

            {/* ── Step body ── */}
            <div className={styles.body}>
              {step === 1 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>What are you building?</h3>
                  <p className={styles.stepSub}>Choose the direction that fits your vehicle.</p>
                  <div className={styles.optionGrid} role="radiogroup" aria-label="Service interest">
                    {QUOTE_SERVICES.map(({ id, label }) => (
                      <OptionRow key={id} label={label} selected={form.service === id} onSelect={() => selectService(id)} />
                    ))}
                  </div>
                  {errors.service && <p className={styles.error}>{errors.service}</p>}
                </div>
              )}

              {step === 2 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>Tell us about the vehicle</h3>
                  <div className={styles.row3}>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Year</span>
                      <input type="text" inputMode="numeric" placeholder="2024" value={form.year} onChange={update('year')} className={styles.input} />
                      {errors.year && <span className={styles.errorSmall}>{errors.year}</span>}
                    </label>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Make</span>
                      <input type="text" placeholder="e.g. BMW" value={form.make} onChange={update('make')} className={styles.input} />
                      {errors.make && <span className={styles.errorSmall}>{errors.make}</span>}
                    </label>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Model</span>
                      <input type="text" placeholder="e.g. M4" value={form.model} onChange={update('model')} className={styles.input} />
                      {errors.model && <span className={styles.errorSmall}>{errors.model}</span>}
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>What are you trying to build?</h3>
                  {projectOptions ? (
                    <>
                      <p className={styles.stepSub}>Choose the option closest to what you have in mind.</p>
                      <div className={styles.optionList} role="radiogroup" aria-label="Build details">
                        {projectOptions.map(({ id, label }) => (
                          <OptionRow key={id} label={label} selected={form.projectDetail === id} onSelect={() => selectOption('projectDetail', id)} />
                        ))}
                      </div>
                      {errors.projectDetail && <p className={styles.error}>{errors.projectDetail}</p>}
                    </>
                  ) : (
                    <p className={styles.stepSub}>Since you&rsquo;re after more than one service, tell us which ones and what you have in mind below.</p>
                  )}
                  <label className={styles.field} style={{ marginTop: projectOptions ? 24 : 4 }}>
                    <span className={styles.fieldLabel}>Additional Notes / Goals <span className={styles.optional}>(optional)</span></span>
                    <textarea
                      placeholder="Tell us what look, finish or protection direction you have in mind."
                      value={form.notes}
                      onChange={update('notes')}
                      className={styles.textarea}
                      rows={4}
                    />
                  </label>
                </div>
              )}

              {step === 4 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>When are you looking to do this?</h3>
                  <div className={styles.optionList} role="radiogroup" aria-label="Timing">
                    {QUOTE_TIMING_OPTIONS.map(({ id, label }) => (
                      <OptionRow key={id} label={label} selected={form.timing === id} onSelect={() => selectOption('timing', id)} />
                    ))}
                  </div>
                  {errors.timing && <p className={styles.error}>{errors.timing}</p>}
                  <label className={styles.field} style={{ marginTop: 24 }}>
                    <span className={styles.fieldLabel}>Preferred Appointment Date <span className={styles.optional}>(optional)</span></span>
                    <input type="date" value={form.preferredDate} onChange={update('preferredDate')} className={styles.input} />
                  </label>
                </div>
              )}

              {step === 5 && (
                <div className={styles.stepInner}>
                  <h3 className={styles.stepTitle}>Where should we send your quote?</h3>
                  <div className={styles.row2}>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Full Name</span>
                      <input type="text" placeholder="Full name" value={form.name} onChange={update('name')} className={styles.input} />
                      {errors.name && <span className={styles.errorSmall}>{errors.name}</span>}
                    </label>
                    <label className={styles.field}>
                      <span className={styles.fieldLabel}>Phone / WhatsApp</span>
                      <input type="tel" placeholder="+971 5X XXX XXXX" value={form.phone} onChange={update('phone')} className={styles.input} />
                      {errors.phone && <span className={styles.errorSmall}>{errors.phone}</span>}
                    </label>
                  </div>
                  <label className={styles.field}>
                    <span className={styles.fieldLabel}>Email</span>
                    <input type="email" placeholder="you@email.com" value={form.email} onChange={update('email')} className={styles.input} />
                    {errors.email && <span className={styles.errorSmall}>{errors.email}</span>}
                  </label>
                  <div className={styles.field}>
                    <span className={styles.fieldLabel}>Preferred Contact Method <span className={styles.optional}>(optional)</span></span>
                    <div className={styles.optionListInline} role="radiogroup" aria-label="Preferred contact method">
                      {QUOTE_CONTACT_METHODS.map(({ id, label }) => (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={form.preferredContact === id}
                          onClick={() => selectOption('preferredContact', id)}
                          className={`${styles.pill} ${form.preferredContact === id ? styles.pillActive : ''}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Nav ── */}
            <div className={styles.nav}>
              {step > 1 ? (
                <button type="button" onClick={goBack} className={styles.backBtn}>
                  <span aria-hidden="true">←</span> Back
                </button>
              ) : <span />}
              <button type="button" onClick={goNext} className={styles.nextBtn} disabled={submitting}>
                {submitting ? 'Sending…' : isLastStep ? 'Submit Request' : 'Next'}
                {!submitting && <span aria-hidden="true">→</span>}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

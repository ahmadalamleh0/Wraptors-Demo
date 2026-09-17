// Quote console — editable step data. Add, remove or relabel a service or
// build option here without touching QuoteSection.jsx. Extension points
// for later (file upload, budget range, reference images, CRM payload
// shape) live in QuoteSection.jsx's submit handler and step 3 markup, not
// here — this file only holds the option lists themselves.

export const QUOTE_STEPS = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Vehicle' },
  { id: 3, label: 'Build' },
  { id: 4, label: 'Timing' },
  { id: 5, label: 'Contact' },
];

export const QUOTE_SERVICES = [
  { id: 'wraps',    label: 'Vehicle Wraps' },
  { id: 'ppf',      label: 'Paint Protection Film' },
  { id: 'ceramic',  label: 'Ceramic Coating' },
  { id: 'tint',     label: 'Window Tint' },
  { id: 'multiple', label: 'Multiple Services' },
];

// No entry for "multiple" on purpose — that path skips straight to the
// notes field in step 3 rather than forcing a single-service option list
// on someone who just said they want more than one.
export const QUOTE_PROJECT_OPTIONS = {
  wraps: [
    { id: 'full-wrap',     label: 'Full Wrap' },
    { id: 'partial-wrap',  label: 'Partial Wrap' },
    { id: 'colour-change', label: 'Colour Change' },
    { id: 'custom-design', label: 'Custom Design' },
    { id: 'not-sure',      label: 'Not Sure Yet' },
  ],
  ppf: [
    { id: 'full-front',  label: 'Full Front' },
    { id: 'track-pack',  label: 'Track Pack / High Impact Areas' },
    { id: 'full-body',   label: 'Full Body' },
    { id: 'colour-ppf',  label: 'Colour PPF' },
    { id: 'not-sure',    label: 'Not Sure Yet' },
  ],
  ceramic: [
    { id: 'exterior-coating',  label: 'Exterior Coating' },
    { id: 'wheels-glass-trim', label: 'Wheels / Glass / Trim' },
    { id: 'new-vehicle',       label: 'New Vehicle Protection' },
    { id: 'existing-refresh',  label: 'Existing Vehicle Refresh' },
    { id: 'not-sure',          label: 'Not Sure Yet' },
  ],
  tint: [
    { id: 'full-tint',        label: 'Full Vehicle Tint' },
    { id: 'windshield-strip', label: 'Windshield Strip' },
    { id: 'ceramic-tint',     label: 'Ceramic Tint' },
    { id: 'privacy-heat',     label: 'Privacy / Heat Reduction' },
    { id: 'not-sure',         label: 'Not Sure Yet' },
  ],
};

export const QUOTE_TIMING_OPTIONS = [
  { id: 'asap',       label: 'As Soon As Possible' },
  { id: 'two-weeks',  label: 'Within 2 Weeks' },
  { id: 'this-month', label: 'This Month' },
  { id: 'exploring',  label: 'Just Exploring For Now' },
];

export const QUOTE_CONTACT_METHODS = [
  { id: 'phone',    label: 'Phone Call' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email',    label: 'Email' },
];

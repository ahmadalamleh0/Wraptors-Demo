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
  { id: 'wraps',         label: 'Vehicle Wraps' },
  { id: 'ppf',           label: 'Paint Protection Film' },
  { id: 'ceramic',       label: 'Ceramic Coating' },
  { id: 'tint',          label: 'Window Tint' },
  { id: 'starlight',     label: 'Starlight Headliner' },
  { id: 'custom-builds', label: 'Custom Builds & Body Kits' },
  { id: 'multiple',      label: 'Multiple Services' },
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
  starlight: [
    { id: 'single-colour', label: 'Single Colour Starlight' },
    { id: 'dual-tone',     label: 'Dual-Tone / Gradient' },
    { id: 'shooting-star', label: 'Shooting Star Effect' },
    { id: 'not-sure',      label: 'Not Sure Yet' },
  ],
  'custom-builds': [
    { id: 'body-kit-install',  label: 'Body Kit Installation' },
    { id: 'exterior-styling',  label: 'Exterior Styling Upgrade' },
    { id: 'full-custom-build', label: 'Full Custom Build' },
    { id: 'not-sure',          label: 'Not Sure Yet' },
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

// Newest first, down to 1980 — covers next year's model-year cars through
// anything old enough to still be a realistic customisation candidate.
const CURRENT_YEAR = new Date().getFullYear();
export const QUOTE_YEARS = Array.from(
  { length: CURRENT_YEAR + 1 - 1980 + 1 },
  (_, i) => String(CURRENT_YEAR + 1 - i)
);

// Alphabetical; the brand field is a searchable dropdown built from this
// list rather than free text, so submissions stay clean and consistent.
export const QUOTE_CAR_BRANDS = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley',
  'BMW', 'Bugatti', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari',
  'Fiat', 'Ford', 'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar',
  'Jeep', 'Kia', 'Koenigsegg', 'Lamborghini', 'Land Rover', 'Lexus', 'Lotus',
  'Lucid', 'Maserati', 'Maybach', 'Mazda', 'McLaren', 'Mercedes-Benz',
  'MINI', 'Mitsubishi', 'Nissan', 'Pagani', 'Polestar', 'Porsche',
  'Range Rover', 'Rimac', 'Rolls-Royce', 'Subaru', 'Suzuki', 'Tesla',
  'Toyota', 'Volkswagen', 'Volvo',
].sort((a, b) => a.localeCompare(b));

// Neither the Quote form nor the Booking form has a real backend to submit
// to (see submitQuoteRequest.js / submitBookingRequest.js) — so instead of
// a fake "success" screen after an async no-op, both forms hand the
// visitor's answers off to WhatsApp as a prefilled message. This is a real,
// verifiable action (a WhatsApp chat actually opens with the enquiry text
// ready to send) rather than a claim we can't back up.
export const WHATSAPP_NUMBER = '971502532392';

function line(label, value) {
  return value ? `${label}: ${value}` : null;
}

export function buildWhatsAppUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Quote console (5-step flow) — label lookups passed in from
// QuoteSection.jsx so this file doesn't duplicate quoteFormData.js's option
// lists.
export function buildQuoteWhatsAppMessage(form, labels) {
  const vehicle = [form.year, form.make, form.model].filter(Boolean).join(' ');
  const lines = [
    'New enquiry from wraptorsdubai.com',
    '',
    line('Service', labels.service),
    line('Vehicle', vehicle),
    line('Build', labels.projectDetail),
    line('Notes', form.notes),
    line('Timing', labels.timing),
    line('Preferred date', form.preferredDate),
    '',
    line('Name', form.name),
    line('Phone', form.phone),
    line('Email', form.email),
    line('Preferred contact', labels.preferredContact),
  ].filter(Boolean);
  return lines.join('\n');
}

// Booking form (/book) — services is an array of ids, resolved to labels
// by the caller before this is called (kept consistent with the quote
// builder's "pass labels in" approach).
export function buildBookingWhatsAppMessage(form, serviceLabels) {
  const vehicle = [form.year, form.make, form.model].filter(Boolean).join(' ');
  const lines = [
    'New booking request from wraptorsdubai.com',
    '',
    line('Vehicle', vehicle),
    line('Service(s)', serviceLabels.join(', ')),
    line('Preferred date', form.preferredDate),
    '',
    line('Name', form.name),
    line('Phone', form.phone),
    line('Message', form.message),
  ].filter(Boolean);
  return lines.join('\n');
}

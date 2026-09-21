// Primary submission path for the Quote and Franchise forms. The access key
// is a Web3Forms *form* key, not a backend secret — Web3Forms is designed to
// receive submissions directly from the browser and rate-limits/validates
// server-side — but it still isn't hardcoded here: it's read from the
// VITE_WEB3FORMS_KEY env var (see .env.local) so it never appears in a
// source file or a diff.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

// Throws on any failure (missing key, network error, or Web3Forms rejecting
// the submission) so callers can fall back to WhatsApp in one place.
export async function submitToWeb3Forms(fields) {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error('Web3Forms is not configured — missing VITE_WEB3FORMS_KEY');
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      botcheck: '',
      ...fields,
    }),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Web3Forms submission failed');
  }
  return data;
}

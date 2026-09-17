// No lead-form backend exists in this project yet — same pattern as
// submitBookingRequest.js. This is the single seam for wiring up a real
// endpoint (CRM, email, Zapier/Make webhook, etc.) later without touching
// the quote console's UI/state. No API keys live here; there's nothing
// to leak.
export async function submitQuoteRequest(payload) {
  const submission = {
    ...payload,
    submittedAt: new Date().toISOString(),
    pageSource: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // Simulated network latency so the loading state is visible end to end.
  // Replace this with a real fetch()/webhook POST once a backend exists.
  await new Promise((resolve) => setTimeout(resolve, 700));
  console.log('[QuoteSection] submission ready to send:', submission);

  return submission;
}

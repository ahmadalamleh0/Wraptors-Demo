// No lead-form backend exists in this project yet — same situation as
// src/features/quote-form-draft/submitQuote.js. This is the single seam
// for wiring up a real endpoint later (Netlify Forms, a serverless
// function, Formspree, etc.) without touching the /book form's UI/state.
// No API keys live here; there's nothing to leak.
export async function submitBookingRequest(payload) {
  const submission = {
    ...payload,
    submittedAt: new Date().toISOString(),
    pageSource: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // Simulated network latency so the loading state is visible end to end.
  // Replace this with a real fetch()/form POST once a backend exists.
  await new Promise((resolve) => setTimeout(resolve, 700));
  console.log('[BookingForm] submission ready to send:', submission);

  return submission;
}

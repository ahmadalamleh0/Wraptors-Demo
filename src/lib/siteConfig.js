// Single source of truth for the production domain, so every canonical/OG
// URL and the sitemap always agree — never hardcode this string elsewhere.
export const SITE_URL = 'https://wraptorsdubai.com';

// Every page is published at a trailing-slash URL: the prerender writes
// <route>/index.html, which Netlify serves at /<route>/ and 301-redirects
// /<route> to. Internal links use this form so none of them hit a redirect.
export function pagePath(path) {
  return path.endsWith('/') ? path : `${path}/`;
}

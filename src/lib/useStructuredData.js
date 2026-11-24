import { useEffect } from 'react';

// Page-level JSON-LD (Service, BreadcrumbList, Article, FAQPage...). Each
// block this hook adds is marked with PAGE_SCHEMA_ATTR and removed again when
// its page unmounts, so SPA navigation never leaves another page's schema
// behind.
//
// The build-time prerender (scripts/prerender.mjs) snapshots those marked
// blocks into each page's static HTML, so crawlers that don't run JavaScript
// still see them. When the app then starts in a browser, the page renders and
// adds its own blocks again — so the snapshot's copies are removed first,
// below, before any page renders. Result: exactly one copy of each block,
// with or without JavaScript. The site-wide business entity in index.html is
// not marked and is never touched.
const PAGE_SCHEMA_ATTR = 'data-page-schema';

if (typeof document !== 'undefined') {
  document.querySelectorAll(`script[${PAGE_SCHEMA_ATTR}]`).forEach((script) => script.remove());
}

export function useStructuredData(data) {
  useEffect(() => {
    if (!data) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(PAGE_SCHEMA_ATTR, '');
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);
}

import { lazy } from 'react';

// A page component loaded in its own chunk, but preloadable: once
// `.preload()` has resolved, it renders synchronously — no Suspense
// fallback, so the prerendered HTML is never swapped for an empty frame.
// main.jsx preloads the chunk for the URL being opened before React's first
// render; later navigations load it on demand (React Router runs them in a
// transition, so the current page stays on screen until the next is ready).
export function lazyRoute(loader) {
  let Loaded = null;
  let promise = null;
  const preload = () => {
    if (!promise) {
      promise = loader().then((module) => {
        Loaded = module.default;
        return module;
      });
    }
    return promise;
  };
  const LazyPage = lazy(preload);

  function RoutePage(props) {
    return Loaded ? <Loaded {...props} /> : <LazyPage {...props} />;
  }
  RoutePage.preload = preload;
  return RoutePage;
}

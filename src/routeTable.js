import { matchRoutes } from 'react-router-dom';
import { lazyRoute } from './lib/lazyRoute';

// Every page except the homepage lives in its own chunk, so the homepage
// only downloads and runs the code it actually needs.
export const ServicePage       = lazyRoute(() => import('./components/ServicePage'));
export const StarlightPage     = lazyRoute(() => import('./components/StarlightPage'));
export const PPFPage           = lazyRoute(() => import('./components/PPFPage'));
export const WrapsPage         = lazyRoute(() => import('./components/WrapsPage'));
export const TintPage          = lazyRoute(() => import('./components/TintPage'));
export const FocusServiceRoute = lazyRoute(() => import('./components/FocusServiceRoute'));
export const GeoPage           = lazyRoute(() => import('./components/GeoPage'));
export const LearnHub          = lazyRoute(() => import('./components/LearnHub'));
export const ArticlePage       = lazyRoute(() => import('./components/ArticlePage'));
export const AboutPage         = lazyRoute(() => import('./components/AboutPage'));
export const BookingPage       = lazyRoute(() => import('./components/BookingPage'));
export const FranchisePage     = lazyRoute(() => import('./components/FranchisePage'));
export const NotFoundPage      = lazyRoute(() => import('./components/NotFoundPage'));

// App.jsx registers its route list here, so main.jsx can preload the chunk
// for the URL being opened before React's first render.
let routeList = [];
export function setRouteList(list) {
  routeList = list;
}

export function preloadRoute(pathname) {
  const matches = matchRoutes(routeList, pathname);
  const page = matches?.[matches.length - 1]?.route.page;
  return page?.preload ? page.preload() : Promise.resolve();
}

import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    // PUSH = user clicked a link forward → go to top
    // POP  = browser back/forward → let browser restore previous position
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);
  return null;
}

import OfflinePresentationMode from './components/OfflinePresentationMode';
import PresentationAdminControl from './components/PresentationAdminControl';

// Home page sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroVideo from './components/HeroVideo';
import Statement from './components/Statement';
import ServicesIntro from './components/ServicesIntro';
import Services from './components/Services';
import SignatureBuilds from './components/SignatureBuilds';
// Vehicle selector and quote form preserved but disabled for this deploy —
// see src/features/vehicle-selector/README.md and
// src/features/quote-form-draft/README.md to restore either one.
import TrustedBrands from './components/TrustedBrands';
import GlobalLocations from './components/GlobalLocations';
import QuoteSection from './components/QuoteSection';
import ClientReviews from './components/ClientReviews';
import ServiceAreas from './components/ServiceAreas';
// Contact section temporarily taken off the live site — component
// untouched at src/components/ContactSection.jsx, restore by re-adding
// this import and <ContactSection /> below ClientReviews.
import Icons from './components/Icons';
import YoutubeReel from './components/YoutubeReel';
import Reviews from './components/Reviews';
// Academy ("Learn the craft behind the transformation") temporarily taken
// off the live site — component untouched at src/components/Academy.jsx,
// restore by re-adding this import and <Academy /> below Reviews.
import Footer from './components/Footer';

// Service page template
import ServicePage from './components/ServicePage';
import StarlightPage from './components/StarlightPage';
import PPFPage from './components/PPFPage';

// GEO system — one reusable template rendered from centralized data.
// Add/edit/remove a service area in src/data/geoLocations.js only.
import GeoPage from './components/GeoPage';
import { LOCATIONS } from './data/geoLocations';

// Learn / Insights system — one reusable hub + one reusable article
// template, both rendered from src/data/articles.js.
import LearnHub from './components/LearnHub';
import ArticlePage from './components/ArticlePage';
import NotFoundPage from './components/NotFoundPage';
import AboutPage from './components/AboutPage';
import BookingCTA from './components/BookingCTA';
import BookingPage from './components/BookingPage';

// Hero images for each service page
import heroWraps   from '../Wrappin(1new).jpeg';
import heroCeramic from '../Ceramic Coating(new1).jpeg';
import heroTint    from '../PPF(2New).jpeg';

const SERVICE_PAGES = [
  {
    path:     '/services/wraps',
    title:    'Vehicle Wraps',
    eyebrow:  'Color & Finish',
    tagline:  'Every colour. Every finish. Every vision. Precision-cut premium vinyl that transforms your vehicle and protects the paint beneath.',
    heroImg:  heroWraps,
    learnCategory: 'vehicle-wraps',
  },
  {
    path:     '/services/ceramic',
    title:    'Ceramic Coating',
    eyebrow:  'Surface Protection',
    tagline:  'Glass-hard protection with a permanent shine. 9H-rated ceramic formula that bonds to your paint for years of effortless gloss.',
    heroImg:  heroCeramic,
    learnCategory: 'ceramic-coating',
  },
  {
    path:     '/services/tint',
    title:    'Window Tint',
    eyebrow:  'Privacy & Protection',
    tagline:  'Premium ceramic window film that blocks UV, reduces heat, and delivers flawless clarity — installed to the millimetre.',
    heroImg:  heroTint,
    learnCategory: 'window-tint',
  },
];

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroVideo />
        <ServicesIntro />
        <Services />
        <Statement />
        <SignatureBuilds />
        <TrustedBrands />
        <GlobalLocations />
        <QuoteSection />
        <ClientReviews />
        <ServiceAreas />
        <Icons />
        <YoutubeReel />
        <Reviews />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
    <ScrollToTop />
    <OfflinePresentationMode />
    <PresentationAdminControl />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/starlight" element={<StarlightPage />} />
      <Route path="/services/ppf"      element={<PPFPage />} />
      {SERVICE_PAGES.map(svc => (
        <Route
          key={svc.path}
          path={svc.path}
          element={<ServicePage {...svc} />}
        />
      ))}
      {LOCATIONS.map(loc => (
        <Route
          key={loc.slug}
          path={`/areas/${loc.slug}`}
          element={<GeoPage location={loc} />}
        />
      ))}
      <Route path="/learn" element={<LearnHub />} />
      <Route path="/learn/category/:categorySlug" element={<LearnHub />} />
      <Route path="/learn/:articleSlug" element={<ArticlePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

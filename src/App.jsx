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

// Home page sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroVideo from './components/HeroVideo';
import Statement from './components/Statement';
import ServicesIntro from './components/ServicesIntro';
import Services from './components/Services';
import SignatureBuilds from './components/SignatureBuilds';
import TrustedBrands from './components/TrustedBrands';
import GlobalLocations from './components/GlobalLocations';
import Icons from './components/Icons';
import Reviews from './components/Reviews';
import Academy from './components/Academy';
import Footer from './components/Footer';

// Service page template
import ServicePage from './components/ServicePage';
import StarlightPage from './components/StarlightPage';
import PPFPage from './components/PPFPage';

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
  },
  {
    path:     '/services/ceramic',
    title:    'Ceramic Coating',
    eyebrow:  'Surface Protection',
    tagline:  'Glass-hard protection with a permanent shine. 9H-rated ceramic formula that bonds to your paint for years of effortless gloss.',
    heroImg:  heroCeramic,
  },
  {
    path:     '/services/tint',
    title:    'Window Tint',
    eyebrow:  'Privacy & Protection',
    tagline:  'Premium ceramic window film that blocks UV, reduces heat, and delivers flawless clarity — installed to the millimetre.',
    heroImg:  heroTint,
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
        <Icons />
        <Reviews />
        <Academy />
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
    </Routes>
    </>
  );
}

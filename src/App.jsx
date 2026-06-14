import { Routes, Route } from 'react-router-dom';
import './App.css';

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

// Hero images for each service page
import heroWraps   from '../Wrappin(1new).jpeg';
import heroPPF     from '../PPF(last_1).jpeg';
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
    path:     '/services/ppf',
    title:    'Paint Protection Film',
    eyebrow:  'Invisible Shield',
    tagline:  'Self-healing, optically clear film that protects your finish from the road\'s worst — without altering a single line.',
    heroImg:  heroPPF,
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/starlight" element={<StarlightPage />} />
      {SERVICE_PAGES.map(svc => (
        <Route
          key={svc.path}
          path={svc.path}
          element={<ServicePage {...svc} />}
        />
      ))}
    </Routes>
  );
}

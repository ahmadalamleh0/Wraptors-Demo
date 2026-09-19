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
import WrapsPage from './components/WrapsPage';

// Hero images for each generic service page (Vehicle Wraps, PPF and
// Starlight have their own dedicated page components with bespoke
// content; these three share the ServicePage template).
import heroCeramic    from '../Wraptors Media/779201054_18418163902146462_3362369227410745315_n.jpg';
import ceramicNew2    from '../Ceramic Coating(new2).jpeg';
import ceramicNew3    from '../Ceramic Coating(new3).jpeg';
import ceramicBanner1 from '../Wraptors Media/730941504_18409686289146462_8126761517611540665_n.jpg';
import lambo1         from '../Wraptors Media/572658115_18375844528146462_7044016670246006823_n.jpg';
import lambo2         from '../Wraptors Media/573643633_18375844501146462_1338566802707597600_n.jpg';
import lambo3         from '../Wraptors Media/574454404_18375844462146462_4088331334435453680_n.jpg';
import heroTint       from '../Wraptors Media/632236695_18389471176146462_2559334672996249216_n.jpg';
import heroCommercial from '../commercial_wrapping(1).jpeg';

// Every service page follows the same hero + intro system (see
// ServiceHero / ServiceIntroSection) — only media and wording change here.
const SERVICE_PAGES = [
  {
    path:     '/services/ceramic',
    title:    'Ceramic Coating',
    heroEyebrow: 'Wraptors Dubai · Ceramic Coating',
    heroHeadline: 'Finish, Locked In.',
    heroSupportingLine: 'Paint Enhancement · Ceramic Protection · Deep Gloss',
    heroImg:  heroCeramic,
    introImage: ceramicNew2,
    benefits: [
      { num: '01', title: 'Long-Lasting Shine',        desc: 'Helps keep the paint glossy, vibrant and easier to maintain over time.' },
      { num: '02', title: 'Showroom-Quality Finish',   desc: 'Adds depth and clarity to the paint for a smoother, more reflective finish.' },
      { num: '03', title: 'Paint Defense',             desc: 'Helps protect against oxidation, stains, bird droppings and light surface marks.' },
      { num: '04', title: 'Easier Maintenance',        desc: 'Dirt and contamination are easier to remove, reducing the effort needed to keep the car looking clean.' },
    ],
    galleryImages: [lambo1, lambo2, lambo3],
    tagline:  'Glass-hard protection with a permanent shine. 9H-rated ceramic formula that bonds to your paint for years of effortless gloss.',
    introKicker: 'Your Finish',
    introStatement: 'Refined.',
    introDescription: 'Ceramic coating at Wraptors starts with the condition of the paint. We inspect and prepare the surface first, correct or enhance it where required, then apply the coating to preserve the finish, improve gloss and make ongoing maintenance easier.',
    processEyebrow: 'The Process',
    processHeading: 'From Prep To Protection.',
    processSteps: [
      {
        n: '01',
        title: 'Inspection',
        desc: 'We begin by checking the condition of the paint and understanding what the vehicle needs before any coating is applied. This tells us whether the finish is ready as it is or needs correction first.',
      },
      {
        n: '02',
        title: 'Preparation',
        desc: 'The vehicle is washed, decontaminated and properly prepared so the surface is clean and ready for correction or coating. This stage is critical to how well the final result performs.',
      },
      {
        n: '03',
        title: 'Paint Refinement',
        desc: 'Where needed, the paint is corrected or enhanced to improve gloss, clarity and overall finish before it is sealed. Coating should preserve a strong finish, not cover a weak one.',
      },
      {
        n: '04',
        title: 'Coating & Final Finish',
        desc: 'The ceramic coating is applied with attention to coverage and finish, then the vehicle is checked and completed so the final result looks clean, deep and properly protected.',
      },
    ],
    splitBanner: {
      img1: ceramicBanner1,
      img2: ceramicNew3,
      text: 'GLOSS THAT LASTS.',
    },
    learnCategory: 'ceramic-coating',
  },
  {
    path:     '/services/tint',
    title:    'Window Tint',
    heroEyebrow: 'Wraptors Dubai · Window Tint',
    heroHeadline: 'Control The Cabin.',
    heroSupportingLine: 'Ceramic Tint · Heat Rejection · Privacy',
    heroImg:  heroTint,
    tagline:  'Premium ceramic window film that blocks UV, reduces heat, and delivers flawless clarity — installed to the millimetre.',
    introKicker: 'Your Cabin',
    introStatement: 'Controlled.',
    introDescription: 'Window film is selected around more than darkness. At Wraptors, tint is approached around heat performance, privacy, visibility and the appearance of the vehicle, then installed cleanly across the glass for a finish that belongs with the car.',
    learnCategory: 'window-tint',
  },
  {
    path:     '/services/commercial',
    title:    'Commercial Wraps',
    heroEyebrow: 'Wraptors Dubai · Commercial Wraps',
    heroHeadline: 'Brand In Motion.',
    heroSupportingLine: 'Fleet Wraps · Commercial Graphics · Brand Application',
    heroImg:  heroCommercial,
    tagline:  'Turn every vehicle into a moving billboard — full fleet wraps with precision-cut brand identity.',
    introKicker: 'Your Brand',
    introStatement: 'In Motion.',
    introDescription: 'From a single commercial vehicle to a growing fleet, Wraptors turns the vehicle itself into brand real estate. Artwork, placement, colour and coverage are planned around the body so the identity stays clear, consistent and recognizable on the road.',
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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/wraps"    element={<WrapsPage />} />
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

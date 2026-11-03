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
// Restored services section from the Dubai coming-soon landing page
// (see components/original-services). Switch HOME_SERVICES back to
// 'tiles' to return to the image-tile Services section above.
import OriginalServicesSection from './components/original-services/ServicesSection';
const HOME_SERVICES = 'original'; // 'original' | 'tiles'
import SignatureBuilds from './components/SignatureBuilds';
// Vehicle selector and quote form preserved but disabled for this deploy —
// see src/features/vehicle-selector/README.md and
// src/features/quote-form-draft/README.md to restore either one.
import VisitUs from './components/VisitUs';
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
// Reviews ("Proof in every finish") and BookingCTA ("Ready when you are.
// Book your Wraptors visit.") temporarily taken off the home page —
// components untouched, restore by re-adding these imports and
// <Reviews /> <BookingCTA /> below <YoutubeReel />.
// Academy ("Learn the craft behind the transformation") temporarily taken
// off the live site — component untouched at src/components/Academy.jsx,
// restore by re-adding this import and <Academy /> below Reviews.
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileQuoteCta from './components/MobileQuoteCta';

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
import BookingPage from './components/BookingPage';
import FranchisePage from './components/FranchisePage';
import WrapsPage from './components/WrapsPage';
import TintPage from './components/TintPage';
import FocusServicePage from './components/FocusServicePage';
import { FOCUS_PAGES } from './data/serviceSeo';

// Hero images for each generic service page (Vehicle Wraps, PPF and
// Starlight have their own dedicated page components with bespoke
// content; these three share the ServicePage template).
import heroCeramic    from '../47325374-c1b0-4233-8a29-5edee0bf07b4.png';
import ceramicNew1    from '../Ceramic Coating(new1).jpeg';
import ceramicNew2    from '../Ceramic Coating(new2).jpeg';
import ceramicNew3    from '../Ceramic Coating(new3).jpeg';
import lambo1         from '../Wraptors Media/572658115_18375844528146462_7044016670246006823_n.jpg';
import lambo2         from '../Wraptors Media/573643633_18375844501146462_1338566802707597600_n.jpg';
import lambo3         from '../Wraptors Media/574454404_18375844462146462_4088331334435453680_n.jpg';
import heroCustomBuilds from '../Wraptors Media/Custom Builds/531390763_18364031848146462_3978469811072555494_n.jpg';
import customBuild1     from '../Wraptors Media/Custom Builds/673155098_18356001145208168_5151499152980611431_n.jpg';
import customBuild2     from '../Wraptors Media/Custom Builds/561637580_18371224492146462_3850630907551928576_n.jpg';
import customBuild3     from '../Wraptors Media/Custom Builds/773757448_18417489721146462_1403236065123085975_n.jpg';
// A second, dedicated collection just for the Bentley — front 3/4 plus two
// detail shots of the same car.
import bentley1         from '../Wraptors Media/Custom Builds/621837139_18385536877146462_5187708123866638297_n - Copy.jpg';
import bentley2         from '../Wraptors Media/Custom Builds/621830079_18385536943146462_3092230599324494560_n.jpg';
import bentley3         from '../Wraptors Media/Custom Builds/621972300_18385536895146462_9042249166876917996_n.jpg';
import bentley4         from '../Wraptors Media/Custom Builds/621825480_18385536931146462_7726450832093630152_n.jpg';
import bentley5         from '../Wraptors Media/Custom Builds/621855805_18385536934146462_1336625565261466261_n.jpg';
// Hero images for the additional services (existing Wraptors photos).
import heroDetailing      from '../Detailing.jpeg';
import heroInteriors      from '../Wraptors Media/616229612_18384175534146462_9012363648025181528_n.jpg';
import heroStripes        from '../Wraptors Media/777023973_18418163749146462_8520045824263708492_n.jpg';
import heroCalipers       from '../Ferrari(white_3).jpeg';
import heroWheels         from '../Wraptors Media/561235066_18371224444146462_3625533511021440012_n.jpg';

// Process for the styling services (interiors, stripes, calipers, wheels).
const STYLE_PROCESS = [
  { n: '01', title: 'Consultation', desc: 'We look at the car with you and agree the design, colours and scope.' },
  { n: '02', title: 'Preparation',  desc: 'The car is cleaned and prepared, with parts removed where the job needs it.' },
  { n: '03', title: 'The Work',     desc: 'The work is carried out in the studio with close attention to edges and finish.' },
  { n: '04', title: 'Final Check',  desc: 'Everything is checked under the studio lighting before handover.' },
];

// Every service page follows the same hero + intro system (see
// ServiceHero / ServiceIntroSection) — only media and wording change here.
const SERVICE_PAGES = [
  {
    path:     '/services/ceramic',
    title:    'Ceramic Coating',
    heroEyebrow: 'Wraptors Dubai · Ceramic Coating',
    heroHeadline: 'Exceptional Finish.\nLasting Protection.',
    heroHeadlineCompact: true,
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
    seoTitle: 'Ceramic Coating Dubai | Gloss & Paint Protection | Wraptors',
    tagline:  'Ceramic coating in Dubai at Wraptors, Al Quoz: paint inspected, prepared and corrected where needed, then coated for deeper gloss and easier maintenance.',
    introKicker: 'Your Finish',
    introStatement: 'Refined.',
    introDescription: 'Ceramic coating at Wraptors Dubai starts with the condition of the paint. We inspect and prepare the surface first, correct or enhance it where required, then apply the coating to preserve the finish, improve gloss and make ongoing maintenance easier.',
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
      img1: ceramicNew1,
      img2: ceramicNew3,
      text: 'PRESERVE THE FINISH.',
    },
    learnCategory: 'ceramic-coating',
  },
  {
    path:     '/services/custom-builds',
    title:    'Custom Builds & Body Kits',
    heroEyebrow: 'Wraptors Dubai · Custom Builds & Body Kits',
    heroHeadline: 'Custom Builds &\nBody Kits',
    heroHeadlineCompact: true,
    heroLowerContent: true,
    heroSupportingLine: 'A more individual expression of your vehicle, through considered styling, precise fitment and attention to the complete build.',
    heroImg:  heroCustomBuilds,
    tagline:  'Custom builds and body kits at Wraptors Dubai — styling upgrades and exterior transformations fitted with precision at our Al Quoz studio.',
    introKicker: 'Your Vision',
    introStatement: 'Realized.',
    introDescription: 'Custom builds and body kits are approached around the individual vehicle — fitment, proportions and finish are planned together before any panel is touched. From considered styling upgrades to complete exterior transformations, every build is carried out with attention to how each piece integrates with the car.',
    galleryImages: [customBuild1, customBuild2, customBuild3],
    galleryCaption: 'Custom Builds & Body Kits',
    midSectionTitle: 'Every Detail. One Vision.',
    midSectionDescription: 'A distinctive build comes from how the details work together. Body lines, materials and finishing touches are considered as a whole, creating a vehicle that feels individual from every angle.',
    featuredProject: {
      label: 'Featured Project',
      title: 'Bentley Bentayga',
      mainImage: bentley1,
      detailImages: [bentley4, bentley2, bentley5, bentley3],
    },
    learnCategory: 'custom-builds',
  },
  // ── Additional confirmed services (client, 2026-11-03) ──
  // Shown in the footer Services directory, not as homepage cards. Copy is
  // written for Dubai: no products, materials, warranties or timings that
  // haven't been confirmed for this studio.
  {
    path:     '/services/detailing',
    title:    'Auto Detailing',
    seoTitle: 'Car Detailing Dubai | Interior & Exterior Detailing | Wraptors',
    heroEyebrow: 'Wraptors Dubai · Auto Detailing',
    heroHeadline: 'Showroom Clean.\nInside And Out.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Exterior Detailing · Interior Detailing · Preparation For Protection',
    heroImg:  heroDetailing,
    tagline:  'Interior and exterior car detailing at the Wraptors Dubai studio in Al Quoz: a careful hand wash, a thorough interior clean and care for Dubai dust.',
    introKicker: 'Your Car',
    introStatement: 'Restored.',
    introDescription: 'Detailing at Wraptors Dubai covers the inside and the outside of the car. The exterior is washed by hand and dried without streaks, and the interior is vacuumed and cleaned across the dashboard, console, door trims, door jambs and footwells. In Dubai, where fine dust and sand settle on every surface, a proper detail is also the right starting point before PPF, ceramic coating or a wrap.',
    benefitsHeading: 'Why Detail Regularly',
    benefits: [
      { num: '01', title: 'Paint That Lasts',       desc: 'Regular washing and care help keep paint from dulling under constant sun.' },
      { num: '02', title: 'Dust And Sand Removed',  desc: 'Fine dust and sand are lifted carefully rather than dragged across the paint.' },
      { num: '03', title: 'A Fresher Interior',     desc: 'Dust and grime are cleaned from carpets, seats and trim, keeping the cabin fresh.' },
      { num: '04', title: 'Ready For Protection',   desc: 'A clean surface is the right base for PPF, ceramic coating or a wrap.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'Clean, Inside And Out.',
    processSteps: [
      { n: '01', title: 'Inspection',  desc: 'We look over the car inside and out with you and agree what it needs.' },
      { n: '02', title: 'Exterior',    desc: 'The car is washed by hand and dried carefully, without streaks.' },
      { n: '03', title: 'Interior',    desc: 'The cabin is vacuumed, and the dashboard, console, door trims, jambs and footwells are cleaned.' },
      { n: '04', title: 'Final Check', desc: 'The car is checked under the studio lighting before handover.' },
    ],
    learnCategory: 'ceramic-coating',
  },
  {
    path:     '/services/custom-interiors',
    title:    'Custom Interiors',
    seoTitle: 'Custom Car Interiors Dubai | Interior Colour Change | Wraptors',
    heroEyebrow: 'Wraptors Dubai · Custom Interiors',
    heroHeadline: 'Stock Is Boring.\nMake It Yours.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Custom Floor Mats · Interior Colour Change · Full Cabin Design',
    heroImg:  heroInteriors,
    tagline:  'Custom car interiors at the Wraptors Dubai studio in Al Quoz: custom floor mats, interior colour changes and complete cabin designs planned with you.',
    introKicker: 'Your Interior',
    introStatement: 'Personalised.',
    introDescription: 'Every custom interior starts with a conversation. Layout, colours and materials are worked out together before anything is made, whether that is a set of custom floor mats, a change of interior colour or a complete cabin design planned alongside a starlight headliner.',
    benefitsHeading: 'What We Can Do',
    benefits: [
      { num: '01', title: 'Custom Floor Mats',      desc: 'Floor mats designed around your car, in the colours and materials you choose.' },
      { num: '02', title: 'Designed With You',      desc: 'Layout, artwork and materials are chosen together, not picked from a catalogue.' },
      { num: '03', title: 'Interior Colour Change', desc: 'Change the colour of the interior to suit the car, or to contrast with it.' },
      { num: '04', title: 'A Complete Cabin',       desc: 'Combine new mats and trim with a starlight headliner for a fully reworked interior.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'From Idea To Interior.',
    processSteps: STYLE_PROCESS,
  },
  {
    path:     '/services/stripes-decals',
    title:    'Racing Stripes & Decals',
    seoTitle: 'Racing Stripes & Car Decals Dubai | Wraptors',
    heroEyebrow: 'Wraptors Dubai · Racing Stripes & Decals',
    heroHeadline: 'Stripes & Decals.\nInstant Character.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Racing Stripes · Custom Decals · Accents',
    heroImg:  heroStripes,
    tagline:  'Racing stripes and custom car decals at the Wraptors Dubai studio in Al Quoz, designed around the car for the bonnet, roof, boot or sides.',
    introKicker: 'Your Style',
    introStatement: 'Signed.',
    introDescription: 'Stripes and decals are one of the quickest ways to give a car more character without a full wrap. A stripe can run over the bonnet, roof and boot or along the sides, in a single colour or a contrasting combination, and decals can be sourced to order or designed from scratch.',
    benefitsHeading: 'Your Options',
    benefits: [
      { num: '01', title: 'Ready-Made Or Bespoke',       desc: 'Choose an existing stripe design or develop a one-off design with the team.' },
      { num: '02', title: 'Placement That Fits',         desc: 'Over the bonnet, across the boot or along the sides, placed to suit the car’s lines.' },
      { num: '03', title: 'Colour Your Way',             desc: 'Monochrome for a subtle look, or a contrasting combination that stands out.' },
      { num: '04', title: 'Decals, Sourced Or Designed', desc: 'We can source the decal you have in mind or design one from scratch.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'From Sketch To Street.',
    processSteps: STYLE_PROCESS,
    learnCategory: 'vehicle-wraps',
  },
  {
    path:     '/services/caliper-painting',
    title:    'Caliper Painting',
    seoTitle: 'Brake Caliper Painting Dubai | Wraptors',
    heroEyebrow: 'Wraptors Dubai · Caliper Painting',
    heroHeadline: 'Colour Behind\nThe Spokes.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Colour-Matched · Contrast Finishes · Custom Designs',
    heroImg:  heroCalipers,
    tagline:  'Brake caliper painting at the Wraptors Dubai studio in Al Quoz: matched to your body colour or chosen as a contrast, on its own or as part of a restyle.',
    introKicker: 'Your Calipers',
    introStatement: 'Restyled.',
    introDescription: 'Calipers are one of the details people notice once the wheels stop turning. We can paint yours to match the body colour, choose a contrast that shows through the spokes, or include them in a complete restyle alongside a wrap, wheel painting or chrome delete.',
    benefitsHeading: 'Ways To Go',
    benefits: [
      { num: '01', title: 'Match The Body',          desc: 'Calipers painted to tie in with the car’s paint or wrap colour.' },
      { num: '02', title: 'Make Them Stand Out',     desc: 'A contrasting colour or design that shows through the wheel spokes.' },
      { num: '03', title: 'Planned With The Wheels', desc: 'Caliper and wheel colours chosen together so they work as a pair.' },
      { num: '04', title: 'Part Of A Restyle',       desc: 'Planned together with a wrap or chrome delete so every detail works as one.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'Detail That Shows.',
    processSteps: STYLE_PROCESS,
  },
  {
    path:     '/services/wheel-painting',
    title:    'Wheel Painting',
    seoTitle: 'Wheel Painting Dubai | Rim Colour Change | Wraptors',
    heroEyebrow: 'Wraptors Dubai · Wheel Painting',
    heroHeadline: 'Wheels That\nFinish The Look.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Colour Changes · Accent Work · Calipers Together',
    heroImg:  heroWheels,
    tagline:  'Wheel painting at the Wraptors Dubai studio in Al Quoz: full wheel colour changes and accent work, planned around the car, the calipers and the wrap.',
    introKicker: 'Your Wheels',
    introStatement: 'Refinished.',
    introDescription: 'Wheels change how the whole car reads. A full colour change can tie the wheels to a wrap or chrome delete, while accent work picks out details without changing the whole wheel. Colours are chosen with the body, the calipers and any trim work in mind, so everything is planned as one look.',
    benefitsHeading: 'Why Wraptors',
    benefits: [
      { num: '01', title: 'Full Colour Or Accent', desc: 'A complete colour change or smaller accent work, whichever the build needs.' },
      { num: '02', title: 'Planned With The Car',  desc: 'Colours chosen to match the body or wrap, or to contrast with it.' },
      { num: '03', title: 'Calipers Together',     desc: 'Wheels and calipers planned at the same time so they work as a pair.' },
      { num: '04', title: 'Part Of A Restyle',     desc: 'Combined with a wrap, chrome delete or stripes for a complete new look.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'From Colour To Wheel.',
    processSteps: STYLE_PROCESS,
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
        {HOME_SERVICES === 'original' ? (
          // id keeps the /#services links working; the wrapper has no styling.
          <div id="services"><OriginalServicesSection /></div>
        ) : (
          <Services />
        )}
        <Statement />
        <SignatureBuilds />
        {/* Where the studio is, who it serves (brands banner after it, as before), the wider network, then the quote form. */}
        <VisitUs />
        <ServiceAreas />
        <TrustedBrands />
        <GlobalLocations />
        <QuoteSection id="cta" />
        <ClientReviews />
        <Icons />
        <YoutubeReel />
      </main>
      <Footer />
      <FloatingWhatsApp />
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
      <Route path="/services/tint"     element={<TintPage />} />
      {FOCUS_PAGES.map((page) => (
        <Route key={page.slug} path={`/services/${page.slug}`} element={<FocusServicePage page={page} />} />
      ))}
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
      <Route path="/franchise" element={<FranchisePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    {/* Mobile-only floating Get a Quote link, site-wide. */}
    <MobileQuoteCta />
    </>
  );
}

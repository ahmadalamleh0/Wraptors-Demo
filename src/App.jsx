import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroVideo from './components/HeroVideo';
import Statement from './components/Statement';
import ServicesIntro from './components/ServicesIntro';
import Services from './components/Services';
import SignatureBuilds from './components/SignatureBuilds';
import TrustedBrands from './components/TrustedBrands';
import GlobalLocations from './components/GlobalLocations';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroVideo />
        <Statement />
        <ServicesIntro />
        <Services />
        <SignatureBuilds />
        <TrustedBrands />
        <GlobalLocations />
        <Reviews />
        <Footer />
      </main>
    </>
  );
}

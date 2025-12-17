import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import UniversitySection from './components/UniversitySection';
import FeatureSection from './components/FeatureSection';
import CtaSection from './components/CtaSection'; // <--- New
import Footer from './components/Footer';         // <--- New

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-800 font-sans">
      <Navbar />
      <HeroSection />
      <UniversitySection />
      <FeatureSection />
      <CtaSection />  {/* <--- Added */}
      <Footer />      {/* <--- Added */}
    </div>
  );
}
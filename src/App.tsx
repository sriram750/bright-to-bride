import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Packages } from './pages/Packages';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { AdminDashboard } from './pages/AdminDashboard';
import { MobileStickyBar } from './components/MobileStickyBar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { EventBanner } from './components/EventBanner';
import { LuxuryLoader } from './components/LuxuryLoader';
import { StudioDataProvider } from './context/StudioDataContext';
import { studioInfo } from './data/studioData';
import { Heart, Phone, Mail, Lock } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'services':
        return <Services setCurrentPage={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio />;
      case 'packages':
        return <Packages setCurrentPage={setCurrentPage} />;
      case 'booking':
        return <Booking />;
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      case 'admin':
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  const handleNavFooterClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-studio-cream text-studio-charcoal flex flex-col justify-between selection:bg-studio-goldLight selection:text-studio-charcoal">
      {/* Initial Minimal Elegant Loader Splash */}
      <LuxuryLoader />

      {/* Top Event / Seasonal Announcement Banner */}
      <EventBanner />

      {/* Sticky Top Header */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Page Area with Soft Cross-Fade Page Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Interactive Elements */}
      <WhatsAppButton />
      <MobileStickyBar setCurrentPage={setCurrentPage} />
      <ExitIntentPopup setCurrentPage={setCurrentPage} />

      {/* Premium Footer */}
      <footer className="bg-studio-charcoal text-studio-cream border-t border-studio-gold/15 pt-20 pb-28 lg:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <span className="font-serif text-xl font-bold tracking-widest block text-studio-gold">
              BRIGHT TO BRIDE
            </span>
            <p className="font-sans text-xs text-studio-cream/60 leading-relaxed max-w-xs">
              From Little Beginnings to Forever Moments. Fine-art editorial photography documenting weddings and family rites of passage all over Tamil Nadu.
            </p>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-studio-gold block">
              By Arisiva S
            </span>
          </div>

          {/* Site Map Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wide text-studio-gold">
              Explore Stories
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-studio-cream/70">
              {['Home', 'About', 'Services', 'Portfolio', 'Packages', 'Contact'].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => handleNavFooterClick(name.toLowerCase())}
                    className="hover:text-studio-gold transition-colors focus:outline-none"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wide text-studio-gold">
              Information Desk
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-studio-cream/70">
              <li>
                <button
                  onClick={() => handleNavFooterClick('faq')}
                  className="hover:text-studio-gold transition-colors focus:outline-none"
                >
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavFooterClick('booking')}
                  className="hover:text-studio-gold transition-colors focus:outline-none"
                >
                  Check Availability Flow
                </button>
              </li>
              <li>
                <a
                  href={studioInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-studio-gold transition-colors flex items-center"
                >
                  <InstagramIcon className="w-3.5 h-3.5 mr-2" />
                  Instagram Stories
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNavFooterClick('admin')}
                  className="hover:text-studio-gold transition-colors flex items-center text-studio-gold/80 font-medium"
                >
                  <Lock className="w-3 h-3 mr-1.5" />
                  Admin Login Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Address Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wide text-studio-gold">
              Studio Location
            </h4>
            <p className="font-sans text-xs text-studio-cream/60 leading-relaxed">
              {studioInfo.address}
            </p>
            <div className="space-y-1.5 pt-2 font-sans text-xs text-studio-cream/70">
              <a href={`tel:${studioInfo.phone}`} className="flex items-center hover:text-studio-gold transition-colors">
                <Phone className="w-3.5 h-3.5 mr-2" />
                +91 {studioInfo.whatsapp}
              </a>
              <a href={`mailto:${studioInfo.email}`} className="flex items-center hover:text-studio-gold transition-colors">
                <Mail className="w-3.5 h-3.5 mr-2" />
                {studioInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer Copyright */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-studio-cream/40 space-y-4 md:space-y-0">
          <span>
            © {new Date().getFullYear()} Bright to Bride. All rights reserved.
          </span>
          <span className="flex items-center">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-1.5" /> in Trichy, Tamil Nadu
          </span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <StudioDataProvider>
      <AppContent />
    </StudioDataProvider>
  );
}

export default App;

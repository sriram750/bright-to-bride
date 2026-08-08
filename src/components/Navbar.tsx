import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ShieldCheck, Lock } from 'lucide-react';
import { studioInfo } from '../data/studioData';
import { useStudioData } from '../context/StudioDataContext';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdminLoggedIn } = useStudioData();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Packages', id: 'packages' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-studio-cream/90 backdrop-blur-md border-b border-studio-gold/10 shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left flex flex-col group focus:outline-none"
        >
          <span className="font-serif text-2xl font-bold tracking-widest text-studio-charcoal transition-colors duration-300 group-hover:text-studio-gold">
            BRIGHT TO BRIDE
          </span>
          <span className="font-sans text-[9px] tracking-[0.25em] text-studio-warmGray uppercase leading-none mt-1">
            Photography & Storytelling
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`font-sans text-xs tracking-widest uppercase transition-colors duration-300 relative py-1 focus:outline-none ${
                currentPage === link.id
                  ? 'text-studio-gold font-medium'
                  : 'text-studio-charcoal hover:text-studio-gold'
              }`}
            >
              {link.name}
              {currentPage === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-studio-gold" />
              )}
            </button>
          ))}
        </nav>

        {/* Header CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center px-3 py-1.5 rounded text-xs tracking-widest uppercase font-medium transition-all ${
              isAdminLoggedIn
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                : 'text-studio-warmGray hover:text-studio-gold'
            }`}
            title="Admin Login & Event Image Controls"
          >
            {isAdminLoggedIn ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                Admin Panel
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 mr-1" />
                Admin
              </>
            )}
          </button>

          <a
            href={`tel:${studioInfo.phone}`}
            className="flex items-center text-xs tracking-widest uppercase text-studio-charcoal hover:text-studio-gold transition-colors duration-300"
          >
            <Phone className="w-3.5 h-3.5 mr-2 stroke-[1.5]" />
            Call Arisiva
          </a>
          <button
            onClick={() => handleNavClick('booking')}
            className="bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal px-5 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 font-medium border border-studio-charcoal hover:border-studio-gold flex items-center shadow-md hover:shadow-none"
          >
            <Calendar className="w-3.5 h-3.5 mr-2 stroke-[1.5]" />
            Book Your Date
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-studio-charcoal hover:text-studio-gold transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-studio-cream z-40 flex flex-col justify-between border-t border-studio-gold/10 p-8 animate-fade-in">
          <nav className="flex flex-col space-y-6 pt-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left font-serif text-3xl transition-colors duration-300 focus:outline-none ${
                  currentPage === link.id
                    ? 'text-studio-gold italic'
                    : 'text-studio-charcoal'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left font-sans text-xs tracking-widest uppercase text-studio-gold font-bold flex items-center pt-2"
            >
              <Lock className="w-4 h-4 mr-2" />
              {isAdminLoggedIn ? 'Admin Panel (Active)' : 'Admin Portal Login'}
            </button>
          </nav>
          
          <div className="flex flex-col space-y-4 pb-12">
            <a
              href={`tel:${studioInfo.phone}`}
              className="flex items-center justify-center border border-studio-charcoal/20 py-4 font-sans text-xs tracking-widest uppercase text-studio-charcoal hover:bg-studio-charcoal hover:text-studio-cream transition-all duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Photographer
            </a>
            <button
              onClick={() => handleNavClick('booking')}
              className="bg-studio-charcoal py-4 font-sans text-xs tracking-widest uppercase text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal transition-all duration-300 flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Your Date
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


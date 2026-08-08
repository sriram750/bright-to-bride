import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      if (window.scrollY > 30) {
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-studio-cream/92 backdrop-blur-md border-b border-studio-gold/15 shadow-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo with gentle scale */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left flex flex-col group focus:outline-none transition-transform duration-300"
        >
          <span className={`font-serif font-bold tracking-widest text-studio-charcoal transition-all duration-300 group-hover:text-studio-gold ${
            isScrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
          }`}>
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
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-studio-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
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

          {/* Elevated CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(26, 25, 23, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('booking')}
            className="bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal px-5 py-2.5 text-xs tracking-widest uppercase transition-colors duration-300 font-medium border border-studio-charcoal hover:border-studio-gold flex items-center shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 mr-2 stroke-[1.5]" />
            Book Your Date
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-studio-charcoal hover:text-studio-gold transition-colors focus:outline-none p-1"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 top-[65px] bg-studio-cream z-40 flex flex-col justify-between border-t border-studio-gold/10 p-8 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 pt-4">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left font-serif text-3xl transition-colors duration-300 focus:outline-none ${
                    currentPage === link.id
                      ? 'text-studio-gold italic'
                      : 'text-studio-charcoal'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left font-sans text-xs tracking-widest uppercase text-studio-gold font-bold flex items-center pt-2"
              >
                <Lock className="w-4 h-4 mr-2" />
                {isAdminLoggedIn ? 'Admin Panel (Active)' : 'Admin Portal Login'}
              </button>
            </nav>
            
            <div className="flex flex-col space-y-4 pb-12 pt-8">
              <a
                href={`tel:${studioInfo.phone}`}
                className="flex items-center justify-center border border-studio-charcoal/20 py-4 font-sans text-xs tracking-widest uppercase text-studio-charcoal hover:bg-studio-charcoal hover:text-studio-cream transition-all duration-300"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Photographer
              </a>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick('booking')}
                className="bg-studio-charcoal py-4 font-sans text-xs tracking-widest uppercase text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Date
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};



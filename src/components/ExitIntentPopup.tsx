import React, { useState, useEffect } from 'react';
import { X, Calendar, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/studioData';

interface ExitIntentPopupProps {
  setCurrentPage: (page: string) => void;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only bind on desktop viewports
    if (window.innerWidth < 1024) return;

    const hasSeenPopup = sessionStorage.getItem('hasSeenExitPopup');
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 15 signals the mouse moving up to close the tab or type in the address bar
      if (e.clientY < 15) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenExitPopup', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleBookClick = () => {
    setIsOpen(false);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-studio-charcoal/65 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-studio-cream border border-studio-gold/30 p-8 md:p-12 max-w-lg w-full relative shadow-2xl rounded text-center">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-studio-charcoal hover:text-studio-gold transition-colors focus:outline-none"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Header copy */}
        <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-semibold">
          Wait! Before you leave...
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-wide mt-3 text-studio-charcoal">
          Planning a Ceremony?
        </h3>
        <p className="font-sans text-xs md:text-sm text-studio-warmGray mt-4 mb-8 leading-relaxed max-w-sm mx-auto">
          Whether it is a child's milestone or a wedding celebration in Trichy, let's preserve those memories beautifully. Reach out for a free date check and custom quote.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleBookClick}
            className="w-full sm:w-auto bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal px-8 py-3.5 text-xs tracking-widest uppercase transition-all duration-300 font-semibold border border-studio-charcoal hover:border-studio-gold flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Check Your Date
          </button>
          
          <a
            href={getWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-emerald-600/30 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-3.5 text-xs tracking-widest uppercase transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-2 fill-current/10" />
            WhatsApp Us
          </a>
        </div>

        <button
          onClick={handleClose}
          className="mt-6 text-[10px] tracking-widest text-studio-warmGray/60 hover:text-studio-charcoal uppercase transition-colors focus:outline-none"
        >
          No thanks, just looking
        </button>
      </div>
    </div>
  );
};

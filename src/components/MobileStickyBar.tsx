import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { studioInfo, getWhatsAppLink } from '../data/studioData';

interface MobileStickyBarProps {
  setCurrentPage: (page: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ setCurrentPage }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-studio-cream/95 backdrop-blur-md border-t border-studio-gold/20 z-50 flex shadow-lg pb-safe-bottom">
      {/* WhatsApp Button */}
      <a
        href={getWhatsAppLink('general')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-2.5 text-studio-charcoal border-r border-studio-gold/10 active:bg-studio-sand/50 transition-colors"
      >
        <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600/10" />
        <span className="text-[10px] tracking-wider uppercase mt-1 font-medium font-sans">WhatsApp</span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${studioInfo.phone}`}
        className="flex-1 flex flex-col items-center justify-center py-2.5 text-studio-charcoal border-r border-studio-gold/10 active:bg-studio-sand/50 transition-colors"
      >
        <Phone className="w-5 h-5 text-studio-gold" />
        <span className="text-[10px] tracking-wider uppercase mt-1 font-medium font-sans">Call Us</span>
      </a>

      {/* Book Now Button */}
      <button
        onClick={() => {
          setCurrentPage('booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex-1 flex flex-col items-center justify-center py-2.5 bg-studio-charcoal text-studio-cream active:bg-studio-gold active:text-studio-charcoal transition-all"
      >
        <Calendar className="w-5 h-5 text-studio-gold" />
        <span className="text-[10px] tracking-wider uppercase mt-1 font-semibold font-sans">Book Now</span>
      </button>
    </div>
  );
};

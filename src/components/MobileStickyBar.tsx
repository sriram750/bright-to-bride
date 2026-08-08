import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { studioInfo, getWhatsAppLink } from '../data/studioData';

interface MobileStickyBarProps {
  setCurrentPage: (page: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ setCurrentPage }) => {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="lg:hidden fixed bottom-0 left-0 w-full bg-studio-charcoal/95 backdrop-blur-xl border-t border-studio-gold/30 z-50 flex items-center justify-around px-3 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.35)] select-none pb-safe"
    >
      {/* WhatsApp Button */}
      <motion.a
        whileTap={{ scale: 0.94 }}
        href={getWhatsAppLink('general')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-2 px-1 text-studio-cream hover:text-emerald-400 active:bg-white/5 rounded transition-colors"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-500/20 stroke-[1.8]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="text-[9px] tracking-widest uppercase mt-1 font-sans font-semibold text-studio-cream/90">
          WhatsApp
        </span>
      </motion.a>

      {/* Call Button */}
      <motion.a
        whileTap={{ scale: 0.94 }}
        href={`tel:${studioInfo.phone}`}
        className="flex-1 flex flex-col items-center justify-center py-2 px-1 text-studio-cream hover:text-studio-gold active:bg-white/5 rounded transition-colors border-x border-white/10"
      >
        <Phone className="w-5 h-5 text-studio-gold stroke-[1.8]" />
        <span className="text-[9px] tracking-widest uppercase mt-1 font-sans font-semibold text-studio-cream/90">
          Call Us
        </span>
      </motion.a>

      {/* Book Date Button */}
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          setCurrentPage('booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex-1 flex flex-col items-center justify-center py-2 px-1 bg-gradient-to-r from-studio-goldLight via-studio-gold to-studio-gold text-studio-charcoal rounded font-semibold shadow-md active:opacity-90"
      >
        <div className="flex items-center">
          <Calendar className="w-4 h-4 stroke-[2] mr-1 text-studio-charcoal" />
          <Sparkles className="w-3 h-3 text-studio-charcoal animate-pulse" />
        </div>
        <span className="text-[9px] tracking-widest uppercase mt-0.5 font-sans font-bold text-studio-charcoal">
          Book Date
        </span>
      </motion.button>
    </motion.div>
  );
};

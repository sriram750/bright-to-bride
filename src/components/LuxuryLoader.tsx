import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LuxuryLoaderProps {
  onComplete?: () => void;
}

export const LuxuryLoader: React.FC<LuxuryLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="luxury-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-studio-charcoal text-studio-cream flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Studio Brand Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-2 mb-8"
          >
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-studio-gold block">
              BRIGHT TO BRIDE
            </span>
            <span className="font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-studio-goldLight/70 block">
              Fine Art Tamil Wedding Photography
            </span>
          </motion.div>

          {/* Minimal Elegant Gold Progress Bar */}
          <div className="w-48 h-[2px] bg-studio-cream/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-gradient-to-r from-studio-goldLight via-studio-gold to-studio-goldLight shadow-[0_0_12px_rgba(197,168,128,0.8)]"
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-sans text-[9px] tracking-widest text-studio-cream/50 uppercase mt-4"
          >
            Trichy • Tamil Nadu
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

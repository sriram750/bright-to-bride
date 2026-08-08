import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Maximize2, Sparkles, Camera } from 'lucide-react';

interface LuxuryImageCardProps {
  src: string;
  alt: string;
  title: string;
  category?: string;
  description?: string;
  credit?: string;
  onClick?: () => void;
  aspectRatio?: string; // e.g. "aspect-square", "aspect-[4/3]", "aspect-[4/5]", or auto
  className?: string;
  showExpandIcon?: boolean;
}

export const LuxuryImageCard: React.FC<LuxuryImageCardProps> = ({
  src,
  alt,
  title,
  category,
  description,
  credit = 'Photo by Arisiva S',
  onClick,
  aspectRatio = '',
  className = '',
  showExpandIcon = true,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Mouse position motion values for 3D tilt & cursor spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for tilt angles
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 350, damping: 25 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 350, damping: 25 });

  // Inner image parallax translate (shifts slightly opposite to tilt)
  const imgTranslateX = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 350, damping: 25 });
  const imgTranslateY = useSpring(useTransform(mouseY, [0, 1], [-6, 6]), { stiffness: 350, damping: 25 });

  // Spotlight position relative to percentage
  const spotlightX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
      }}
      className={`relative overflow-hidden group cursor-pointer border border-studio-gold/15 rounded-sm bg-studio-charcoal shadow-sm transition-shadow duration-500 hover:shadow-[0_15px_35px_rgba(197,168,128,0.25)] select-none ${aspectRatio} ${className}`}
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : tiltX,
          rotateY: shouldReduceMotion ? 0 : tiltY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {/* Main Image with inner Parallax & Zoom */}
        <motion.img
          src={src}
          alt={alt}
          style={{
            x: shouldReduceMotion ? 0 : imgTranslateX,
            y: shouldReduceMotion ? 0 : imgTranslateY,
          }}
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full h-full object-cover rounded-sm filter brightness-[0.96] group-hover:brightness-105 transition-all duration-500"
          loading="lazy"
        />

        {/* Dynamic Golden Spotlight Follow Gradient */}
        {!shouldReduceMotion && (
          <motion.div
            style={{
              opacity: isHovered ? 0.35 : 0,
              background: `radial-gradient(400px circle at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(223, 211, 195, 0.4), transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          />
        )}

        {/* Shimmering Animated Gold Perimeter Beam */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 border border-studio-gold/60 pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(197,168,128,0.3)] rounded-sm"
        />

        {/* Top Badges (Category & Sparkle Indicator) */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          {category && (
            <motion.span
              animate={{
                y: isHovered ? 0 : -6,
                opacity: isHovered ? 1 : 0.85,
              }}
              transition={{ duration: 0.3 }}
              className="bg-studio-charcoal/80 backdrop-blur-md border border-studio-gold/30 text-studio-gold font-sans text-[9px] tracking-widest uppercase px-3 py-1 rounded shadow-md flex items-center"
            >
              <Sparkles className="w-3 h-3 mr-1.5 text-studio-gold animate-pulse" />
              {category}
            </motion.span>
          )}

          {showExpandIcon && (
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 0.9,
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
              className="bg-studio-charcoal/70 backdrop-blur-md border border-white/20 p-2 rounded-full text-studio-cream shadow-md ml-auto"
            >
              <Maximize2 className="w-3.5 h-3.5 group-hover:text-studio-gold transition-colors" />
            </motion.div>
          )}
        </div>

        {/* Glassmorphic Sliding Overlay Card */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.9,
            y: isHovered ? 0 : 4,
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute bottom-0 inset-x-0 z-30 p-4 md:p-5 bg-gradient-to-t from-studio-charcoal/95 via-studio-charcoal/80 to-transparent backdrop-blur-sm border-t border-studio-gold/20 flex flex-col justify-end text-studio-cream transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
        >
          {/* Gold Decorative Accent Line */}
          <motion.div
            animate={{
              width: isHovered ? '40px' : '20px',
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-[1.5px] bg-studio-gold mb-2"
          />

          <span className="text-[9px] tracking-[0.25em] uppercase text-studio-gold font-semibold flex items-center">
            <Camera className="w-3 h-3 mr-1.5 stroke-[1.5]" />
            {credit}
          </span>

          <h3 className="font-serif text-base md:text-lg font-bold tracking-wide mt-0.5 text-studio-cream">
            {title}
          </h3>

          {description && (
            <p className="font-sans text-[10px] md:text-[11px] text-studio-cream/80 mt-1 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10 text-[9px] tracking-widest uppercase text-studio-goldLight font-medium">
            <span>Fine-Art Tamil Heritage</span>
            <span className="text-studio-gold font-bold flex items-center group-hover:translate-x-1 transition-transform">
              Tap Frame →
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

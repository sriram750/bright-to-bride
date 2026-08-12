import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Maximize2, Sparkles, Camera, Heart } from 'lucide-react';

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

  // Mouse/Touch position motion values for 3D tilt & spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for 3D tilt angles
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { stiffness: 350, damping: 25 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { stiffness: 350, damping: 25 });

  // Inner image parallax translate (shifts slightly opposite to tilt)
  const imgTranslateX = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 350, damping: 25 });
  const imgTranslateY = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), { stiffness: 350, damping: 25 });

  // Spotlight position relative to percentage
  const spotlightX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseY, [0, 1], [0, 100]);

  // Desktop Mouse Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    setIsHovered(true);
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      const x = (touch.clientX - rect.left) / rect.width;
      const y = (touch.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      const x = (touch.clientX - rect.left) / rect.width;
      const y = (touch.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
      mouseX.set(0.5);
      mouseY.set(0.5);
    }, 450);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{ perspective: 1000 }}
      className={`relative overflow-hidden group cursor-pointer border border-studio-gold/20 rounded-sm bg-studio-charcoal shadow-sm transition-all duration-500 hover:shadow-[0_20px_45px_rgba(197,168,128,0.35)] select-none ${aspectRatio} ${className}`}
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : tiltX,
          rotateY: shouldReduceMotion ? 0 : tiltY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {/* Main Image with inner Parallax & Smooth Zoom */}
        <motion.img
          src={src}
          alt={alt}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== '/images/photographer_arisiva.png') {
              target.src = '/images/photographer_arisiva.png';
            }
          }}
          style={{
            x: shouldReduceMotion ? 0 : imgTranslateX,
            y: shouldReduceMotion ? 0 : imgTranslateY,
          }}
          animate={{
            scale: isHovered ? 1.08 : 1,
            filter: isHovered ? 'brightness(1.05) contrast(1.02)' : 'brightness(0.95) contrast(1)',
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full h-full object-cover rounded-sm transition-all duration-500"
          loading="lazy"
        />

        {/* MAGIC 1: Glowing Golden Lens Flare Light-Sweep Line */}
        {!shouldReduceMotion && (
          <motion.div
            initial={false}
            animate={{
              x: isHovered ? ['-100%', '200%'] : '-100%',
              opacity: isHovered ? [0, 0.6, 0] : 0,
            }}
            transition={{
              duration: 1.1,
              ease: 'easeInOut',
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2,
            }}
            className="absolute inset-0 z-20 pointer-events-none w-1/2 h-full -skew-x-25 bg-gradient-to-r from-transparent via-studio-goldLight/50 to-transparent"
          />
        )}

        {/* MAGIC 2: Dynamic Radial Gold Spotlight Follow (Mouse & Touch) */}
        {!shouldReduceMotion && (
          <motion.div
            style={{
              opacity: isHovered ? 0.42 : 0,
              background: `radial-gradient(420px circle at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(223, 211, 195, 0.5), transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          />
        )}

        {/* MAGIC 3: Expanding Camera Aperture Iris Ring Motif */}
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              scale: isHovered ? 1.35 : 0.3,
              opacity: isHovered ? [0, 0.35, 0] : 0,
              rotate: isHovered ? 90 : 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 m-auto w-36 h-36 rounded-full border-2 stroke-dashed border-studio-gold/60 pointer-events-none z-15 flex items-center justify-center"
          >
            <div className="w-24 h-24 rounded-full border border-studio-goldLight/40" />
          </motion.div>
        )}

        {/* MAGIC 4: Sparkling Floating Micro Gold Stars */}
        {!shouldReduceMotion && isHovered && (
          <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
            {[
              { top: '20%', left: '25%', delay: 0.1, size: 'text-xs' },
              { top: '60%', left: '75%', delay: 0.25, size: 'text-sm' },
              { top: '35%', left: '80%', delay: 0.4, size: 'text-xs' },
              { top: '75%', left: '30%', delay: 0.2, size: 'text-[10px]' },
            ].map((sparkle, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [10, -15],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.4,
                  delay: sparkle.delay,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }}
                style={{ top: sparkle.top, left: sparkle.left }}
                className={`absolute text-studio-gold font-serif drop-shadow-[0_0_8px_rgba(223,211,195,0.8)] ${sparkle.size}`}
              >
                ✦
              </motion.span>
            ))}
          </div>
        )}

        {/* MAGIC 5: Elegant Gold Corner Filigree Brackets */}
        <div className="absolute inset-3 pointer-events-none z-20">
          {/* Top-Left Corner */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8, y: isHovered ? 0 : -8 }}
            transition={{ duration: 0.35 }}
            className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-studio-gold"
          />
          {/* Top-Right Corner */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 8, y: isHovered ? 0 : -8 }}
            transition={{ duration: 0.35 }}
            className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-studio-gold"
          />
          {/* Bottom-Left Corner */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-studio-gold"
          />
          {/* Bottom-Right Corner */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 8, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-studio-gold"
          />
        </div>

        {/* Shimmering Perimeter Gold Beam */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 border border-studio-gold/70 pointer-events-none z-20 shadow-[inset_0_0_25px_rgba(197,168,128,0.35)] rounded-sm"
        />

        {/* Top Badges (Category & Lens Control) */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          {category && (
            <motion.span
              animate={{
                y: isHovered ? 0 : -4,
                opacity: isHovered ? 1 : 0.85,
              }}
              transition={{ duration: 0.3 }}
              className="bg-studio-charcoal/85 backdrop-blur-md border border-studio-gold/40 text-studio-gold font-sans text-[9px] tracking-widest uppercase px-3 py-1 rounded shadow-md flex items-center"
            >
              <Sparkles className="w-3 h-3 mr-1.5 text-studio-gold animate-spin" style={{ animationDuration: '6s' }} />
              {category}
            </motion.span>
          )}

          {showExpandIcon && (
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 0.9,
                opacity: isHovered ? 1 : 0.75,
              }}
              transition={{ duration: 0.3 }}
              className="bg-studio-charcoal/80 backdrop-blur-md border border-white/20 p-2 rounded-full text-studio-cream shadow-md ml-auto"
            >
              <Maximize2 className="w-3.5 h-3.5 group-hover:text-studio-gold transition-colors" />
            </motion.div>
          )}
        </div>

        {/* Glassmorphic Sliding Overlay Card */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 12,
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute bottom-0 inset-x-0 z-30 p-4 md:p-5 bg-gradient-to-t from-studio-charcoal/95 via-studio-charcoal/85 to-transparent backdrop-blur-md border-t border-studio-gold/30 flex flex-col justify-end text-studio-cream pointer-events-none"
        >
          {/* Gold Decorative Accent Line */}
          <motion.div
            animate={{
              width: isHovered ? '48px' : '0px',
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-[1.5px] bg-gradient-to-r from-studio-gold via-studio-goldLight to-studio-gold mb-2"
          />

          <span className="text-[9px] tracking-[0.25em] uppercase text-studio-gold font-semibold flex items-center">
            <Camera className="w-3 h-3 mr-1.5 stroke-[1.5]" />
            {credit}
          </span>

          <h3 className="font-serif text-base md:text-lg font-bold tracking-wide mt-0.5 bg-gradient-to-r from-studio-cream via-studio-goldLight to-studio-cream bg-clip-text text-transparent">
            {title}
          </h3>

          {description && (
            <p className="font-sans text-[10px] md:text-[11px] text-studio-cream/85 mt-1 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10 text-[9px] tracking-widest uppercase text-studio-goldLight font-medium">
            <span className="flex items-center text-studio-gold/90">
              <Heart className="w-2.5 h-2.5 mr-1 fill-studio-gold stroke-none" />
              Fine-Art Tamil Story
            </span>
            <span className="text-studio-gold font-bold flex items-center group-hover:translate-x-1 transition-transform">
              Magic Frame →
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxImage {
  id?: string;
  image: string;
  title: string;
  category: string;
  description: string;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const activeImageRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance in px
  const minSwipeDistance = 50;

  // Handle Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Block background body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentPhoto = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-studio-charcoal/95 flex flex-col items-center justify-between py-6 px-4 md:px-12 animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between text-studio-cream border-b border-white/10 pb-4 max-w-7xl">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.2em] text-studio-gold uppercase font-medium">
            {currentPhoto.category}
          </span>
          <h3 className="font-serif text-lg md:text-xl font-medium tracking-wide">
            {currentPhoto.title}
          </h3>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-xs font-sans tracking-widest text-studio-cream/60">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-studio-cream/80 hover:text-studio-gold hover:bg-white/5 rounded-full transition-all duration-300 focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 w-full flex items-center justify-center py-6 max-w-7xl">
        {/* Navigation Buttons (Desktop) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-0 p-3 bg-white/5 border border-white/10 hover:border-studio-gold hover:bg-white/10 text-white rounded-full transition-all duration-300 z-10 focus:outline-none hover:-translate-x-1"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </button>

        <div
          ref={activeImageRef}
          className="relative max-h-[70vh] md:max-h-[75vh] max-w-full flex items-center justify-center transition-all duration-500 ease-out select-none animate-scale-in"
        >
          <img
            src={currentPhoto.image}
            alt={currentPhoto.description || currentPhoto.title}
            className="max-h-[70vh] md:max-h-[75vh] max-w-full object-contain shadow-2xl border border-white/5 rounded"
            draggable={false}
          />
        </div>

        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-0 p-3 bg-white/5 border border-white/10 hover:border-studio-gold hover:bg-white/10 text-white rounded-full transition-all duration-300 z-10 focus:outline-none hover:translate-x-1"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Bottom Caption Overlay */}
      <div className="w-full text-center text-studio-cream max-w-3xl border-t border-white/10 pt-4">
        <p className="font-sans text-xs md:text-sm text-studio-cream/80 tracking-wide leading-relaxed">
          {currentPhoto.description}
        </p>
        <span className="block lg:hidden text-[9px] tracking-widest text-studio-cream/40 uppercase mt-3">
          ← Swipe left or right to browse →
        </span>
      </div>
    </div>
  );
};

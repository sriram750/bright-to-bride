import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { Lightbox } from '../components/Lightbox';
import { useStudioData } from '../context/StudioDataContext';
import { GoldLineDraw } from '../components/GoldLineDraw';
import { ScrollReveal } from '../components/ScrollReveal';
import { LuxuryImageCard } from '../components/LuxuryImageCard';

export const Portfolio: React.FC = () => {
  const { portfolio } = useStudioData();
  useSEO({
    title: "Portfolio | Bright to Bride Traditional Photography & Wedding Gallery",
    description: "Explore our editorial photography portfolio. Browse real family stories, weddings, Seemantham ceremonies, cradle naming events, and traditional shoots in Trichy."
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filters = [
    'All',
    'Weddings',
    'Nichayathartham',
    'Muhurtham',
    'Seemantham',
    'Thottil Vizha',
    'Peyarsutu Vizha',
    'Kaathukuthal',
    'Family Celebrations'
  ];

  const filteredPhotos = activeFilter === 'All'
    ? portfolio
    : portfolio.filter(photo => photo.category.toLowerCase() === activeFilter.toLowerCase());

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-studio-cream pt-28 text-studio-charcoal min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-studio-gold/15 text-center lg:text-left">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Captured Stories</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
            Our Editorial Portfolio
          </h1>
          <p className="font-sans text-xs md:text-base text-studio-warmGray max-w-2xl leading-relaxed mx-auto lg:mx-0">
            A curated selection of real emotions, traditional rituals, and unforgettable family bonds captured in Trichy and surrounding regions.
          </p>
          <div className="lg:justify-start flex justify-center">
            <GoldLineDraw width={140} />
          </div>
        </ScrollReveal>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex space-x-3 md:justify-center border-b border-studio-gold/5 pb-4">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(filter)}
              className={`font-sans text-[10px] md:text-xs tracking-widest uppercase py-2 px-4 transition-all duration-300 border focus:outline-none relative rounded-xs ${
                activeFilter === filter
                  ? 'border-studio-gold bg-studio-gold text-studio-charcoal font-semibold shadow-sm'
                  : 'border-studio-gold/10 hover:border-studio-gold/40 text-studio-warmGray hover:text-studio-charcoal'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Grid Layout (Editorial Masonry / Animated Stagger) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-studio-sand/10 border border-dashed border-studio-gold/20 rounded">
            <p className="font-sans text-xs text-studio-warmGray">
              No photos in this category yet. We are constantly updating our portfolio!
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="break-inside-avoid"
                >
                  <LuxuryImageCard
                    src={photo.image}
                    alt={photo.description}
                    title={photo.title}
                    category={photo.category}
                    description={photo.description}
                    onClick={() => openLightbox(index)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredPhotos}
        currentIndex={lightboxIndex}
        setCurrentIndex={lightboxIndex => setLightboxIndex(lightboxIndex)}
      />
    </div>
  );
};

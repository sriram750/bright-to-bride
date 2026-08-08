import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { Lightbox } from '../components/Lightbox';
import { useStudioData } from '../context/StudioDataContext';

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
        <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Captured Stories</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
          Our Editorial Portfolio
        </h1>
        <p className="font-sans text-xs md:text-base text-studio-warmGray max-w-2xl leading-relaxed mx-auto lg:mx-0">
          A curated selection of real emotions, traditional rituals, and unforgettable family bonds captured in Trichy and surrounding regions.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex space-x-4 md:justify-center border-b border-studio-gold/5 pb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-sans text-[10px] md:text-xs tracking-widest uppercase py-2 px-4 transition-all duration-300 border focus:outline-none ${
                activeFilter === filter
                  ? 'border-studio-gold bg-studio-gold text-studio-charcoal font-semibold'
                  : 'border-studio-gold/10 hover:border-studio-gold/40 text-studio-warmGray hover:text-studio-charcoal'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Layout (Editorial / Masonry Style) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 bg-studio-sand/10 border border-dashed border-studio-gold/20 rounded">
            <p className="font-sans text-xs text-studio-warmGray">
              No photos in this category yet. We are constantly updating our portfolio!
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid relative overflow-hidden group cursor-pointer border border-studio-gold/10 rounded bg-studio-sand/10 shadow-sm transition-luxury"
              >
                {/* Image */}
                <img
                  src={photo.image}
                  alt={photo.description}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-studio-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between text-studio-cream">
                    <span className="bg-studio-gold/20 backdrop-blur-sm text-studio-gold font-sans text-[9px] tracking-widest uppercase px-2.5 py-1 rounded">
                      {photo.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-studio-cream/80 group-hover:text-studio-gold transition-colors" />
                  </div>

                  <div className="text-studio-cream">
                    <h3 className="font-serif text-lg font-semibold tracking-wide">
                      {photo.title}
                    </h3>
                    <p className="font-sans text-[10px] text-studio-cream/70 mt-1 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

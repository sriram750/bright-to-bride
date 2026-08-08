import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { getWhatsAppLink } from '../data/studioData';
import { useStudioData } from '../context/StudioDataContext';
import { GoldLineDraw } from '../components/GoldLineDraw';
import { ScrollReveal, StaggerGrid, StaggerItem } from '../components/ScrollReveal';
import { LuxuryImageCard } from '../components/LuxuryImageCard';

interface ServicesProps {
  setCurrentPage: (page: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ setCurrentPage }) => {
  const { services } = useStudioData();
  useSEO({
    title: "Our Photography Services | Seemantham, Muhurtham & Cradle Ceremony in Trichy",
    description: "Premium photography services for Tamil families. Specializing in Seemantham, Thottil Vizha, Peyarsutu Vizha, Kaathukuthal, Nichayathartham, and Muhurtham in Trichy."
  });

  const childhoodServices = services.filter(s => s.category === 'childhood-rites');
  const weddingServices = services.filter(s => s.category === 'weddings-unions');

  const handleBookClick = (serviceTitle: string) => {
    console.log("Booking flow initiated for service:", serviceTitle);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-studio-cream pt-28 text-studio-charcoal">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-studio-gold/15 text-center lg:text-left">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">What We Offer</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
            Photography & Storytelling Services
          </h1>
          <p className="font-sans text-xs md:text-base text-studio-warmGray max-w-2xl leading-relaxed mx-auto lg:mx-0">
            We specialize in documenting family traditions and unions. Our services are split into two major categories to cover every key milestone in your lifecycle.
          </p>
          <div className="lg:justify-start flex justify-center">
            <GoldLineDraw width={140} />
          </div>
        </ScrollReveal>
      </section>

      {/* CATEGORY 1: Childhood & Rites of Passage */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-12">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Category 01</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-studio-charcoal mt-2">
            Childhood & Rites of Passage
          </h2>
          <p className="font-sans text-xs text-studio-warmGray mt-2 max-w-xl leading-relaxed">
            Preserving traditional milestones from pregnancy to baby naming, cradle, and ear-piercing ceremonies. Rich in Tamil custom, family blessings, and authentic emotions.
          </p>
        </ScrollReveal>

        <StaggerGrid className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {childhoodServices.map((service) => (
            <StaggerItem
              key={service.id}
              className="bg-studio-sand/20 border border-studio-gold/10 p-6 md:p-8 flex flex-col justify-between group hover:border-studio-gold transition-luxury rounded"
            >
              <div>
                <div className="mb-6">
                  <LuxuryImageCard
                    src={service.image}
                    alt={service.title}
                    title={service.title}
                    category={service.tamilTitle}
                    aspectRatio="aspect-[16/10]"
                    onClick={() => handleBookClick(service.title)}
                  />
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-studio-charcoal">
                    {service.title}
                  </h3>
                  <span className="font-sans text-[10px] tracking-widest text-studio-gold uppercase font-semibold">
                    {service.tagline}
                  </span>
                </div>

                <p className="font-sans text-xs text-studio-warmGray leading-relaxed mb-6">
                  {service.longDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 border-t border-studio-gold/10 pt-6 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookClick(service.title)}
                  className="bg-studio-charcoal hover:bg-studio-gold text-studio-cream hover:text-studio-charcoal text-center py-3 font-sans text-[10px] tracking-widest uppercase transition-colors duration-300 font-semibold flex items-center justify-center shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 mr-2 stroke-[1.5]" />
                  Check Date
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={getWhatsAppLink('ceremony', service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-emerald-600/30 text-emerald-700 hover:bg-emerald-600 hover:text-white text-center py-3 font-sans text-[10px] tracking-widest uppercase transition-colors duration-300 font-semibold flex items-center justify-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2 fill-current/10" />
                  WhatsApp
                </motion.a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* CATEGORY 2: Weddings & Unions */}
      <section className="py-20 bg-studio-sand/40 border-t border-b border-studio-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal className="mb-12">
            <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Category 02</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-studio-charcoal mt-2">
              Weddings & Unions
            </h2>
            <p className="font-sans text-xs text-studio-warmGray mt-2 max-w-xl leading-relaxed">
              Telling the comprehensive narrative of your marriage. From engagement proposals and traditional home family meetings to the sacred Muhurtham vows and the subsequent banquets.
            </p>
          </ScrollReveal>

          <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddingServices.map((service) => (
              <StaggerItem
                key={service.id}
                className="bg-studio-cream border border-studio-gold/10 p-6 flex flex-col justify-between group hover:border-studio-gold transition-luxury rounded"
              >
                <div>
                  <div className="mb-6">
                    <LuxuryImageCard
                      src={service.image}
                      alt={service.title}
                      title={service.title}
                      category={service.tamilTitle}
                      aspectRatio="aspect-[16/10]"
                      onClick={() => handleBookClick(service.title)}
                    />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-studio-charcoal mb-2">
                    {service.title}
                  </h3>
                  <span className="font-sans text-[9px] tracking-widest text-studio-gold uppercase font-semibold block mb-4">
                    {service.tagline}
                  </span>

                  <p className="font-sans text-xs text-studio-warmGray leading-relaxed mb-6">
                    {service.longDescription}
                  </p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4 border-t border-studio-gold/10 pt-6 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBookClick(service.title)}
                    className="bg-studio-charcoal hover:bg-studio-gold text-studio-cream hover:text-studio-charcoal text-center py-2.5 font-sans text-[9px] tracking-widest uppercase transition-colors duration-300 font-semibold flex items-center justify-center shadow-sm"
                  >
                    <Calendar className="w-3 h-3 mr-1.5 stroke-[1.5]" />
                    Book Date
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={getWhatsAppLink('wedding')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-emerald-600/30 text-emerald-700 hover:bg-emerald-600 hover:text-white text-center py-2.5 font-sans text-[9px] tracking-widest uppercase transition-colors duration-300 font-semibold flex items-center justify-center"
                  >
                    <MessageCircle className="w-3 h-3 mr-1.5 fill-current/10" />
                    WhatsApp
                  </motion.a>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Custom Quote callout */}
      <section className="py-24 text-center max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Need a Bespoke Photography Package?
          </h2>
          <p className="font-sans text-xs md:text-sm text-studio-warmGray mb-8 leading-relaxed max-w-lg mx-auto">
            We understand that no two traditional events are alike. Tell us your date and event duration, and we will build a tailored package matching your exact needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 25px rgba(26, 25, 23, 0.18)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage('packages')}
            className="inline-block bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal px-8 py-3.5 font-sans text-xs tracking-widest uppercase transition-colors duration-300 font-semibold"
          >
            Explore Packages
          </motion.button>
        </ScrollReveal>
      </section>
    </div>
  );
};

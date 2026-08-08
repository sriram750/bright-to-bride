import React from 'react';
import { Heart, Award, Camera } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useStudioData } from '../context/StudioDataContext';

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ setCurrentPage }) => {
  const { aboutPhotographerImage } = useStudioData();
  useSEO({
    title: "About Arisiva S | Premium Photographer in Mannachanallur & Trichy",
    description: "Learn more about Arisiva S, the storyteller behind Bright to Bride. Capturing authentic emotions, traditional values, and family stories for 5+ years in Trichy."
  });

  const handleCTA = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-studio-cream pt-28 text-studio-charcoal">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-studio-gold/15">
        <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">The Storyteller</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
          Behind Bright to Bride
        </h1>
        <p className="font-sans text-xs md:text-base text-studio-warmGray max-w-2xl leading-relaxed">
          Bright to Bride is founded on a singular premise: family milestones deserve to be captured with artistic precision and emotional depth. We don't just shoot events; we preserve legacies.
        </p>
      </section>

      {/* 2. Profile Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Profile Image (Left 5 Columns) */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-2 border border-studio-gold/20 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          <img
            src={aboutPhotographerImage}
            alt="Arisiva S - Photographer of Bright to Bride"
            className="w-full aspect-[4/5] object-cover shadow-2xl relative z-10 rounded"
          />
        </div>

        {/* Biography (Right 7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="font-serif italic text-lg text-studio-gold mb-3">
            Vanakkam, I am Arisiva S
          </span>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-studio-charcoal mb-6">
            Capturing the Moments That Families Remember Forever
          </h2>
          
          <div className="space-y-4 font-sans text-xs md:text-sm text-studio-warmGray leading-relaxed mb-8">
            <p>
              I am a professional photographer available for bookings <strong>All Over Tamil Nadu</strong>. For the past 5+ years, I have had the privilege of documenting major life transitions of families across Tamil Nadu.
            </p>
            <p>
              Growing up surrounded by the rich cultural heritage and values of Tamil Nadu, I realized that family rituals are not just checklist items. They represent deep emotional bonds, cultural respect, and structural threads that bind generations. 
            </p>
            <p>
              When I established <strong>Bright to Bride</strong>, I wanted to move away from generic, posed photography templates. My goal is to capture real expressions—the soft chuckle of a grandmother placing the baby, the nervous excitement of a groom during Muhurtham, and the raw joy of friends dining at a wedding feast.
            </p>
          </div>

          {/* Quick Badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-studio-gold/15 pt-8">
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-studio-gold">5+ Years</span>
              <span className="font-sans text-[9px] tracking-widest text-studio-warmGray uppercase mt-1">In Industry</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-studio-gold">100+ Events</span>
              <span className="font-sans text-[9px] tracking-widest text-studio-warmGray uppercase mt-1">Preserved</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-studio-gold">Coverage</span>
              <span className="font-sans text-[9px] tracking-widest text-studio-warmGray uppercase mt-1">All Over Tamil Nadu</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Emotional Quote Block */}
      <section className="bg-studio-charcoal text-studio-cream py-24 text-center my-12 relative overflow-hidden">
        {/* Soft gold lines overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] border border-studio-gold rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">My Photography Creed</span>
          <blockquote className="font-serif text-3xl md:text-5xl italic font-bold text-studio-gold mt-6 mb-8 leading-tight">
            "I don't just capture what happened. I capture how it felt."
          </blockquote>
          <div className="w-12 h-[1px] bg-studio-gold/50 mx-auto mb-6" />
          <cite className="font-sans text-xs uppercase tracking-widest text-studio-cream/60 not-italic">
            — Arisiva S, Lead Storyteller
          </cite>
        </div>
      </section>

      {/* 4. Core Values Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Our Ethos</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">What Directs Our Work</h2>
          <div className="w-12 h-[1px] bg-studio-gold mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-studio-sand/20 border border-studio-gold/10 p-8 rounded text-center">
            <Camera className="w-8 h-8 text-studio-gold mx-auto stroke-[1.2]" />
            <h3 className="font-serif text-lg font-bold mt-4 mb-3">Artistic Vigilance</h3>
            <p className="font-sans text-xs text-studio-warmGray leading-relaxed">
              We stay alert and observant, anticipating emotional moments so we can frame them naturally without forcing artificial poses.
            </p>
          </div>

          <div className="bg-studio-sand/20 border border-studio-gold/10 p-8 rounded text-center">
            <Heart className="w-8 h-8 text-studio-gold mx-auto stroke-[1.2]" />
            <h3 className="font-serif text-lg font-bold mt-4 mb-3">Cultural Deep-Rooting</h3>
            <p className="font-sans text-xs text-studio-warmGray leading-relaxed">
              We respect Tamil customs. We research local ceremonies to understand the exact moment and visual details that matter most to your family.
            </p>
          </div>

          <div className="bg-studio-sand/20 border border-studio-gold/10 p-8 rounded text-center">
            <Award className="w-8 h-8 text-studio-gold mx-auto stroke-[1.2]" />
            <h3 className="font-serif text-lg font-bold mt-4 mb-3">Archival Quality</h3>
            <p className="font-sans text-xs text-studio-warmGray leading-relaxed">
              From our camera sensors to final printed albums and digital files, we construct assets with absolute quality to resist the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Call To Action Footer */}
      <section className="bg-studio-sand py-20 text-center border-t border-studio-gold/15">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4 text-studio-charcoal">
            Let's Capture Your Story
          </h2>
          <p className="font-sans text-xs md:text-sm text-studio-warmGray mb-8 leading-relaxed">
            Whether it is an upcoming Muhurtham in Trichy or baby's naming ceremony in Mannachanallur, let's document it together.
          </p>
          <button
            onClick={handleCTA}
            className="bg-studio-charcoal hover:bg-studio-gold text-studio-cream hover:text-studio-charcoal px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300 font-semibold"
          >
            Check Availability
          </button>
        </div>
      </section>
    </div>
  );
};

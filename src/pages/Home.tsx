import React, { useEffect, useState } from 'react';
import { ChevronDown, MessageCircle, Star, Award, Heart, CheckCircle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { studioInfo, testimonialsData, getWhatsAppLink } from '../data/studioData';
import { useStudioData } from '../context/StudioDataContext';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const { heroImage, homeStoryImage } = useStudioData();
  useSEO({
    title: "Bright to Bride | Wedding & Traditional Ceremony Photography in Trichy",
    description: "Bright to Bride by Arisiva S offers premium wedding, traditional ceremony, family, and milestone photography in Mannachanallur and Trichy. Capture your beautiful moments with emotional storytelling."
  });

  const [counterValues, setCounterValues] = useState({ years: 0, moments: 0, ceremonies: 0 });

  // Animate counter statistics
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounterValues({
        years: Math.min(Math.floor((5 / steps) * step), 5),
        moments: Math.min(Math.floor((100 / steps) * step), 100),
        ceremonies: Math.min(Math.floor((50 / steps) * step), 50)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleCTA = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-studio-cream text-studio-charcoal">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-studio-charcoal">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Cinematic Wedding Photography in Trichy"
            className="w-full h-full object-cover opacity-60 scale-105 animate-[scaleIn_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-charcoal via-studio-charcoal/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-studio-charcoal/60 via-transparent to-studio-charcoal/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-studio-cream flex flex-col items-center">
          <span className="text-[11px] md:text-xs tracking-[0.3em] text-studio-gold uppercase font-semibold mb-4 animate-[fadeIn_1s_ease-out_forwards]">
            Serving All Over Tamil Nadu
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight mb-6 max-w-4xl animate-[slideUp_1s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            {studioInfo.tagline}
          </h1>

          <p className="font-sans text-sm md:text-lg text-studio-cream/80 font-light tracking-wide max-w-2xl mb-10 leading-relaxed animate-[slideUp_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            Premium photography for life's most beautiful milestones, traditions, family celebrations, and wedding stories. We capture emotions, not just frames.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-[slideUp_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            <button
              onClick={() => handleCTA('booking')}
              className="w-full sm:w-auto bg-studio-gold hover:bg-studio-cream text-studio-charcoal hover:text-studio-charcoal px-8 py-4 text-xs tracking-widest uppercase transition-all duration-500 font-semibold border border-studio-gold hover:border-studio-cream shadow-lg"
            >
              Check Your Date
            </button>
            <button
              onClick={() => handleCTA('portfolio')}
              className="w-full sm:w-auto border border-studio-cream/40 hover:border-studio-gold text-studio-cream hover:text-studio-cream bg-white/5 hover:bg-white/10 px-8 py-4 text-xs tracking-widest uppercase transition-all duration-500 font-semibold"
            >
              Explore Our Stories
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce text-studio-cream/60">
          <span className="text-[9px] tracking-[0.25em] uppercase mb-2">Scroll</span>
          <ChevronDown className="w-4 h-4 stroke-[1.5]" />
        </div>
      </section>

      {/* 2. Trust Statistics Section */}
      <section className="py-16 bg-studio-sand border-b border-studio-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            
            <div className="flex flex-col items-center">
              <span className="font-serif text-4xl md:text-5xl font-bold text-studio-charcoal leading-none">
                {counterValues.years}+
              </span>
              <span className="font-sans text-[11px] tracking-widest text-studio-warmGray uppercase mt-3 font-semibold">
                Years of Experience
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-serif text-4xl md:text-5xl font-bold text-studio-charcoal leading-none">
                {counterValues.moments}+
              </span>
              <span className="font-sans text-[11px] tracking-widest text-studio-warmGray uppercase mt-3 font-semibold">
                Beautiful Stories Captured
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-serif text-4xl md:text-5xl font-bold text-studio-charcoal leading-none">
                {counterValues.ceremonies}+
              </span>
              <span className="font-sans text-[11px] tracking-widest text-studio-warmGray uppercase mt-3 font-semibold">
                Traditional Ceremonies
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-serif text-4xl md:text-5xl font-bold text-studio-charcoal leading-none">
                1
              </span>
              <span className="font-sans text-[11px] tracking-widest text-studio-warmGray uppercase mt-3 font-semibold">
                Passion for Storytelling
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Highlights */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">What We Capture</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
            Milestones of a Tamil Family
          </h2>
          <div className="w-12 h-[1px] bg-studio-gold mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Childhood Tier */}
          <div className="bg-studio-sand/40 border border-studio-gold/10 p-8 md:p-12 flex flex-col justify-between group hover:border-studio-gold transition-luxury">
            <div>
              <span className="font-sans text-[10px] tracking-widest text-studio-gold uppercase font-semibold">Category 01</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-studio-charcoal mt-3 mb-6">
                Childhood & Rites of Passage
              </h3>
              <p className="font-sans text-xs md:text-sm text-studio-warmGray mb-8 leading-relaxed">
                From Seemantham (maternity blessings) to Thottil Vizha (cradle), Peyarsutu Vizha (naming), and Kaathukuthal (traditional ear-piercing) ceremonies. We document your child's growth and traditional blessings.
              </p>
              <div className="space-y-3 mb-10">
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Seemantham / Valakaapu</div>
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Thottil Vizha (Cradle Ceremony)</div>
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Peyarsutu Vizha (Naming Ceremony)</div>
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Kaathukuthal (Ear Piercing)</div>
              </div>
            </div>
            <button
              onClick={() => handleCTA('services')}
              className="w-full text-center py-4 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold"
            >
              Plan Your Ceremony
            </button>
          </div>

          {/* Weddings Tier */}
          <div className="bg-studio-sand/40 border border-studio-gold/10 p-8 md:p-12 flex flex-col justify-between group hover:border-studio-gold transition-luxury">
            <div>
              <span className="font-sans text-[10px] tracking-widest text-studio-gold uppercase font-semibold">Category 02</span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-studio-charcoal mt-3 mb-6">
                Weddings & Unions
              </h3>
              <p className="font-sans text-xs md:text-sm text-studio-warmGray mb-8 leading-relaxed">
                From Nichayathartham engagement exchanges to intimate Penn Paarkkum traditions, the Muhurtham knot-tying ritual, the grand reception celebrations, and the festive Kalyana Virundhu feast.
              </p>
              <div className="space-y-3 mb-10">
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Nichayathartham Engagement</div>
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Penn Paarkkum Family Meets</div>
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Muhurtham & Sacred Rituals</div>
                <div className="flex items-center text-xs font-sans text-studio-charcoal"><CheckCircle className="w-4 h-4 text-studio-gold mr-2 stroke-[1.5]" /> Grand Reception & Kalyana Virundhu</div>
              </div>
            </div>
            <button
              onClick={() => handleCTA('services')}
              className="w-full text-center py-4 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold"
            >
              Plan Your Wedding Story
            </button>
          </div>
        </div>
      </section>

      {/* 4. Emotional Storytelling Split Section */}
      <section className="bg-studio-charcoal text-studio-cream py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div className="flex flex-col items-start max-w-xl">
            <span className="text-[10px] tracking-[0.3em] text-studio-gold uppercase font-bold mb-4">
              Preserving Tamil Legacy
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide leading-tight mb-6">
              Every Ceremony Has a Story.
            </h2>
            <p className="font-sans text-xs md:text-sm text-studio-cream/70 leading-relaxed mb-8">
              From the first blessing of a pregnancy to the final laughter of a wedding banquet, we capture the emotions, traditions, relationships, and quiet glances that make your family's history uniquely yours. 
            </p>
            <p className="font-sans text-xs md:text-sm text-studio-cream/70 leading-relaxed mb-10">
              Arisiva S brings over 5 years of rich Tamil culture understanding, delivering fine-art editorial photography for couples and families all over Tamil Nadu with visual excellence and deep respect.
            </p>
            <button
              onClick={() => handleCTA('about')}
              className="border-b border-studio-gold hover:border-studio-cream text-studio-gold hover:text-studio-cream pb-1 font-sans text-xs tracking-widest uppercase transition-colors duration-300"
            >
              Meet Arisiva S
            </button>
          </div>

          {/* Right Image */}
          <div className="relative group">
            <div className="absolute -inset-2 border border-studio-gold/20 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            <img
              src={homeStoryImage}
              alt="Emotional Tamil Wedding Muhurtham Rituals"
              className="w-full aspect-[4/3] object-cover shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-102"
            />
          </div>
        </div>
      </section>

      {/* 5. Why Bright to Bride */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Why Choose Us</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
            Crafting Timeless Heirlooms
          </h2>
          <div className="w-12 h-[1px] bg-studio-gold mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Award,
              title: "5+ Years of Experience",
              text: "Professional experience in Mannachanallur and surrounding Trichy districts, navigating lighting and ceremony timetables seamlessly."
            },
            {
              icon: Heart,
              title: "Emotion-First Storytelling",
              text: "We avoid stiff, generic poses. Our lens searches for genuine laughter, moist eyes of parents, and the warmth of family reunions."
            },
            {
              icon: CheckCircle,
              title: "Traditional Understanding",
              text: "Deeply rooted in Tamil culture, we understand the sequential steps and details of traditional rituals to capture them accurately."
            },
            {
              icon: Star,
              title: "Premium Color Grading",
              text: "Carefully retouched photographs with customized color profiles that feel warm, editorial, and cinematic for generations."
            },
            {
              icon: CheckCircle,
              title: "Personalized Experience",
              text: "Every family and event receives our full attention, customized event itineraries, and bespoke album consultations."
            },
            {
              icon: Heart,
              title: "Memories That Last",
              text: "We construct physical custom albums and archival digital galleries that preserve details for future generations."
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-studio-sand/20 border border-studio-gold/5 p-8 rounded hover:border-studio-gold transition-luxury">
                <Icon className="w-8 h-8 text-studio-gold stroke-[1.2]" />
                <h3 className="font-serif text-lg font-bold text-studio-charcoal mt-4 mb-3">{item.title}</h3>
                <p className="font-sans text-xs text-studio-warmGray leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Testimonial Section */}
      <section className="bg-studio-sand py-24 border-t border-b border-studio-gold/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Client Reviews</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
              Stories From Our Families
            </h2>
            <div className="w-12 h-[1px] bg-studio-gold mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonialsData.slice(0, 4).map((test) => (
              <div key={test.id} className="bg-studio-cream p-8 md:p-10 shadow-sm border border-studio-gold/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-6 text-studio-gold">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current stroke-none" />
                    ))}
                  </div>
                  <p className="font-sans text-xs md:text-sm text-studio-charcoal/90 italic leading-relaxed mb-6">
                    "{test.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-studio-gold/10 pt-4">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-studio-charcoal">{test.author}</h4>
                    <span className="font-sans text-[10px] text-studio-warmGray tracking-wider uppercase">
                      {test.role}
                    </span>
                  </div>
                  <span className="bg-studio-gold/10 text-studio-gold font-sans text-[9px] tracking-widest uppercase px-2.5 py-1 rounded">
                    {test.ceremonyType}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <span className="font-sans text-xs text-studio-warmGray">
              Have we captured your special family milestone?{' '}
              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-studio-gold font-semibold underline hover:text-studio-charcoal transition-colors"
              >
                Share your experience
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* 7. Instagram / Social Media Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Follow Our Journeys</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
            Follow Us on Instagram
          </h2>
          <p className="font-sans text-xs text-studio-warmGray mt-2">
            Stay updated with our latest wedding frames and traditional ceremonies at @bright_to_bride_photography
          </p>
          <div className="w-12 h-[1px] bg-studio-gold mx-auto mt-4" />
        </div>

        {/* Static Visual Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { img: "/images/hero_wedding.png", alt: "Traditional wedding couple" },
            { img: "/images/seemantham_ceremony.png", alt: "Baby shower bangles" },
            { img: "/images/muhurtham_couple.png", alt: "Sacred Muhurtham ceremony" },
            { img: "/images/portfolio_baby_cradle.png", alt: "Thottil Vizha cradle setup" }
          ].map((item, index) => (
            <a
              key={index}
              href={studioInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square block overflow-hidden group border border-studio-gold/10"
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-studio-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-sans text-[10px] tracking-widest text-studio-cream uppercase font-semibold border border-studio-cream/30 px-4 py-2">
                  View Post
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={studioInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-transparent border border-studio-charcoal text-studio-charcoal hover:bg-studio-charcoal hover:text-studio-cream px-8 py-3.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            @bright_to_bride_photography
          </a>
        </div>
      </section>

      {/* CTA Footer Wrapper */}
      <section className="bg-studio-charcoal text-studio-cream py-20 border-t border-studio-gold/25 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
            Let's Capture Your Story
          </h2>
          <p className="font-sans text-xs md:text-sm text-studio-cream/70 max-w-lg mx-auto mb-10 leading-relaxed">
            Reserve your Muhurtham, childhood rite of passage, or family celebration date. Let us craft images that will be cherished for generations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleCTA('booking')}
              className="w-full sm:w-auto bg-studio-gold text-studio-charcoal hover:bg-studio-cream hover:text-studio-charcoal px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300 font-semibold"
            >
              Book Your Date
            </button>
            <a
              href={getWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-studio-cream/30 hover:border-studio-gold text-studio-cream hover:text-studio-cream px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300 font-semibold flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

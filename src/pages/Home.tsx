import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDown, MessageCircle, Star, Award, Heart, CheckCircle, Camera, Sparkles } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { studioInfo, testimonialsData, getWhatsAppLink } from '../data/studioData';
import { useStudioData } from '../context/StudioDataContext';
import { PetalParticles } from '../components/PetalParticles';
import { GoldLineDraw } from '../components/GoldLineDraw';
import { ScrollReveal, StaggerGrid, StaggerItem } from '../components/ScrollReveal';
import { LuxuryImageCard } from '../components/LuxuryImageCard';
import { AnimatedCounter } from '../components/AnimatedCounter';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const { heroImage, homeStoryImage } = useStudioData();
  useSEO({
    title: "Bright to Bride | Wedding & Traditional Ceremony Photography in Trichy",
    description: "Bright to Bride by Arisiva S offers premium wedding, traditional ceremony, family, and milestone photography in Mannachanallur and Trichy. Capture your beautiful moments with emotional storytelling."
  });

  const heroRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for Hero background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Soft background parallax offset (moves slower than scroll)
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [0.65, 0.2]);

  const handleCTA = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-studio-cream text-studio-charcoal overflow-hidden">
      {/* 1. Cinematic Parallax Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-studio-charcoal">
        {/* Soft Petal Particle Animation Overlay */}
        <PetalParticles />

        {/* Background Image with Soft Parallax & Vignette */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : heroY }}
          className="absolute inset-0 z-0"
        >
          <motion.img
            src={heroImage}
            alt="Cinematic Wedding Photography in Trichy"
            style={{ opacity: shouldReduceMotion ? 0.6 : heroOpacity }}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-charcoal via-studio-charcoal/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-studio-charcoal/60 via-transparent to-studio-charcoal/20" />
        </motion.div>

        {/* Hero Content with Staggered Entrance */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-studio-cream flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[11px] md:text-xs tracking-[0.3em] text-studio-gold uppercase font-semibold mb-4"
          >
            Serving All Over Tamil Nadu
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight mb-6 max-w-4xl"
          >
            {studioInfo.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm md:text-lg text-studio-cream/85 font-light tracking-wide max-w-2xl mb-10 leading-relaxed"
          >
            Premium photography for life's most beautiful milestones, traditions, family celebrations, and wedding stories. We capture emotions, not just frames.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 10px 25px rgba(197, 168, 128, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCTA('booking')}
              className="w-full sm:w-auto bg-studio-gold hover:bg-studio-cream text-studio-charcoal px-8 py-4 text-xs tracking-widest uppercase transition-colors duration-500 font-semibold border border-studio-gold shadow-lg"
            >
              Check Your Date
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCTA('portfolio')}
              className="w-full sm:w-auto border border-studio-cream/40 hover:border-studio-gold text-studio-cream bg-white/5 px-8 py-4 text-xs tracking-widest uppercase transition-colors duration-500 font-semibold"
            >
              Explore Our Stories
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.5 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-studio-cream/60"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase mb-2">Scroll</span>
          <ChevronDown className="w-4 h-4 stroke-[1.5]" />
        </motion.div>
      </section>

      {/* 2. Ultra-Luxury Interactive Trust Statistics Section */}
      <section className="py-20 bg-gradient-to-b from-studio-sand/70 via-studio-sand/40 to-studio-cream border-b border-studio-gold/15 relative overflow-hidden">
        {/* Ambient Subtle Gold Radial Shimmer Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,#c5a880_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            {/* Stat 1: Years */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="bg-studio-cream/80 backdrop-blur-md border border-studio-gold/25 p-8 rounded-sm text-center flex flex-col items-center justify-between h-full shadow-xs hover:shadow-[0_15px_35px_rgba(197,168,128,0.25)] transition-all duration-400 group relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-studio-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                {/* Gold Lens Badge */}
                <div className="relative mb-5 p-3 rounded-full bg-studio-gold/10 border border-studio-gold/30 text-studio-gold group-hover:scale-110 group-hover:bg-studio-gold group-hover:text-studio-charcoal transition-all duration-400">
                  <Award className="w-6 h-6 stroke-[1.4]" />
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-studio-charcoal leading-none group-hover:text-studio-gold transition-colors duration-300">
                    <AnimatedCounter target={5} suffix="+" duration={1.6} />
                  </span>
                  <div className="w-8 h-[1.5px] bg-studio-gold/40 my-3 group-hover:w-16 transition-all duration-400" />
                  <span className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] text-studio-warmGray uppercase font-bold group-hover:text-studio-charcoal transition-colors">
                    Years of Experience
                  </span>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Stat 2: Stories */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="bg-studio-cream/80 backdrop-blur-md border border-studio-gold/25 p-8 rounded-sm text-center flex flex-col items-center justify-between h-full shadow-xs hover:shadow-[0_15px_35px_rgba(197,168,128,0.25)] transition-all duration-400 group relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-studio-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                {/* Gold Lens Badge */}
                <div className="relative mb-5 p-3 rounded-full bg-studio-gold/10 border border-studio-gold/30 text-studio-gold group-hover:scale-110 group-hover:bg-studio-gold group-hover:text-studio-charcoal transition-all duration-400">
                  <Camera className="w-6 h-6 stroke-[1.4]" />
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-studio-charcoal leading-none group-hover:text-studio-gold transition-colors duration-300">
                    <AnimatedCounter target={100} suffix="+" duration={2.2} />
                  </span>
                  <div className="w-8 h-[1.5px] bg-studio-gold/40 my-3 group-hover:w-16 transition-all duration-400" />
                  <span className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] text-studio-warmGray uppercase font-bold group-hover:text-studio-charcoal transition-colors">
                    Stories Captured
                  </span>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Stat 3: Traditional Ceremonies */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="bg-studio-cream/80 backdrop-blur-md border border-studio-gold/25 p-8 rounded-sm text-center flex flex-col items-center justify-between h-full shadow-xs hover:shadow-[0_15px_35px_rgba(197,168,128,0.25)] transition-all duration-400 group relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-studio-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                {/* Gold Lens Badge */}
                <div className="relative mb-5 p-3 rounded-full bg-studio-gold/10 border border-studio-gold/30 text-studio-gold group-hover:scale-110 group-hover:bg-studio-gold group-hover:text-studio-charcoal transition-all duration-400">
                  <Sparkles className="w-6 h-6 stroke-[1.4]" />
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-studio-charcoal leading-none group-hover:text-studio-gold transition-colors duration-300">
                    <AnimatedCounter target={50} suffix="+" duration={1.8} />
                  </span>
                  <div className="w-8 h-[1.5px] bg-studio-gold/40 my-3 group-hover:w-16 transition-all duration-400" />
                  <span className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] text-studio-warmGray uppercase font-bold group-hover:text-studio-charcoal transition-colors">
                    Traditional Ceremonies
                  </span>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Stat 4: Passion */}
            <StaggerItem>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="bg-studio-cream/80 backdrop-blur-md border border-studio-gold/25 p-8 rounded-sm text-center flex flex-col items-center justify-between h-full shadow-xs hover:shadow-[0_15px_35px_rgba(197,168,128,0.25)] transition-all duration-400 group relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-studio-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                
                {/* Gold Lens Badge */}
                <div className="relative mb-5 p-3 rounded-full bg-studio-gold/10 border border-studio-gold/30 text-studio-gold group-hover:scale-110 group-hover:bg-studio-gold group-hover:text-studio-charcoal transition-all duration-400">
                  <Heart className="w-6 h-6 stroke-[1.4]" />
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-studio-charcoal leading-none group-hover:text-studio-gold transition-colors duration-300">
                    <AnimatedCounter target={1} duration={1.2} />
                  </span>
                  <div className="w-8 h-[1.5px] bg-studio-gold/40 my-3 group-hover:w-16 transition-all duration-400" />
                  <span className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] text-studio-warmGray uppercase font-bold group-hover:text-studio-charcoal transition-colors">
                    Passion for Storytelling
                  </span>
                </div>
              </motion.div>
            </StaggerItem>

          </StaggerGrid>
        </div>
      </section>

      {/* 3. Services Highlights */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">What We Capture</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
            Milestones of a Tamil Family
          </h2>
          <GoldLineDraw />
        </ScrollReveal>

        <StaggerGrid className="grid md:grid-cols-2 gap-12">
          {/* Childhood Tier */}
          <StaggerItem className="bg-studio-sand/40 border border-studio-gold/10 p-8 md:p-12 flex flex-col justify-between group hover:border-studio-gold transition-luxury rounded-sm">
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCTA('services')}
              className="w-full text-center py-4 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal font-sans text-xs tracking-widest uppercase transition-colors duration-300 font-semibold shadow-md"
            >
              Plan Your Ceremony
            </motion.button>
          </StaggerItem>

          {/* Weddings Tier */}
          <StaggerItem className="bg-studio-sand/40 border border-studio-gold/10 p-8 md:p-12 flex flex-col justify-between group hover:border-studio-gold transition-luxury rounded-sm">
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCTA('services')}
              className="w-full text-center py-4 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal font-sans text-xs tracking-widest uppercase transition-colors duration-300 font-semibold shadow-md"
            >
              Plan Your Wedding Story
            </motion.button>
          </StaggerItem>
        </StaggerGrid>
      </section>

      {/* 4. Emotional Storytelling Split Section */}
      <section className="bg-studio-charcoal text-studio-cream py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <ScrollReveal direction="left" className="flex flex-col items-start max-w-xl">
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
          </ScrollReveal>

          {/* Right Image */}
          <ScrollReveal direction="right" className="relative group">
            <LuxuryImageCard
              src={homeStoryImage}
              alt="Emotional Tamil Wedding Muhurtham Rituals"
              title="Sacred Tamil Union & Rituals"
              category="Muhurtham Legacy"
              description="Emotional rituals, authentic expressions, and family blessings captured with fine art precision."
              aspectRatio="aspect-[4/3]"
              onClick={() => handleCTA('portfolio')}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Why Bright to Bride */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Why Choose Us</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
            Crafting Timeless Heirlooms
          </h2>
          <GoldLineDraw />
        </ScrollReveal>

        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <StaggerItem key={index} className="bg-studio-sand/20 border border-studio-gold/5 p-8 rounded hover:border-studio-gold transition-luxury">
                <Icon className="w-8 h-8 text-studio-gold stroke-[1.2]" />
                <h3 className="font-serif text-lg font-bold text-studio-charcoal mt-4 mb-3">{item.title}</h3>
                <p className="font-sans text-xs text-studio-warmGray leading-relaxed">{item.text}</p>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </section>

      {/* 6. Testimonial Section */}
      <section className="bg-studio-sand py-24 border-t border-b border-studio-gold/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Client Reviews</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
              Stories From Our Families
            </h2>
            <GoldLineDraw />
          </ScrollReveal>

          <StaggerGrid className="grid md:grid-cols-2 gap-8">
            {testimonialsData.slice(0, 4).map((test) => (
              <StaggerItem key={test.id} className="bg-studio-cream p-8 md:p-10 shadow-sm border border-studio-gold/5 flex flex-col justify-between">
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
              </StaggerItem>
            ))}
          </StaggerGrid>

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
        <ScrollReveal className="text-center mb-16">
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Follow Our Journeys</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-studio-charcoal mt-3">
            Follow Us on Instagram
          </h2>
          <p className="font-sans text-xs text-studio-warmGray mt-2">
            Stay updated with our latest wedding frames and traditional ceremonies at @bright_to_bride_photography
          </p>
          <GoldLineDraw />
        </ScrollReveal>

        {/* Static Visual Image Grid */}
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { img: "/images/hero_wedding.png", alt: "Traditional wedding couple", title: "Muhurtham Garlands", cat: "Weddings" },
            { img: "/images/seemantham_ceremony.png", alt: "Baby shower bangles", title: "Seemantham Blessings", cat: "Childhood" },
            { img: "/images/muhurtham_couple.png", alt: "Sacred Muhurtham ceremony", title: "Sacred Vows", cat: "Tradition" },
            { img: "/images/portfolio_baby_cradle.png", alt: "Thottil Vizha cradle setup", title: "Thottil Vizha", cat: "Rites of Passage" }
          ].map((item, index) => (
            <StaggerItem key={index}>
              <LuxuryImageCard
                src={item.img}
                alt={item.alt}
                title={item.title}
                category={item.cat}
                aspectRatio="aspect-square"
                onClick={() => window.open(studioInfo.instagram, '_blank')}
              />
            </StaggerItem>
          ))}
        </StaggerGrid>

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
        <ScrollReveal className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wide mb-6">
            Let's Capture Your Story
          </h2>
          <p className="font-sans text-xs md:text-sm text-studio-cream/70 max-w-lg mx-auto mb-10 leading-relaxed">
            Reserve your Muhurtham, childhood rite of passage, or family celebration date. Let us craft images that will be cherished for generations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 25px rgba(197, 168, 128, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCTA('booking')}
              className="w-full sm:w-auto bg-studio-gold text-studio-charcoal hover:bg-studio-cream hover:text-studio-charcoal px-8 py-4 text-xs tracking-widest uppercase transition-colors duration-300 font-semibold"
            >
              Book Your Date
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href={getWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-studio-cream/30 hover:border-studio-gold text-studio-cream hover:text-studio-cream px-8 py-4 text-xs tracking-widest uppercase transition-colors duration-300 font-semibold flex items-center justify-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </motion.a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

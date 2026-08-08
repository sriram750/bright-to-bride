import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { studioInfo, getWhatsAppLink } from '../data/studioData';
import { GoldLineDraw } from '../components/GoldLineDraw';
import { ScrollReveal } from '../components/ScrollReveal';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Contact: React.FC = () => {
  useSEO({
    title: "Contact Bright to Bride | Photography All Over Tamil Nadu",
    description: "Get in touch with Arisiva S at Bright to Bride. Serving all over Tamil Nadu. Call or WhatsApp 9500264840 or email brighttobride18@gmail.com."
  });

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="bg-studio-cream pt-28 text-studio-charcoal min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-studio-gold/15 text-center lg:text-left">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Get In Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
            Connect With Us
          </h1>
          <p className="font-sans text-xs md:text-base text-studio-warmGray max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Planning an upcoming traditional ceremony or wedding anywhere in Tamil Nadu? Write to us, connect on Instagram, or call directly.
          </p>
          <div className="lg:justify-start flex justify-center">
            <GoldLineDraw width={140} />
          </div>
        </ScrollReveal>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid lg:grid-cols-12 gap-12 lg:gap-20">

        {/* Contact Info (Left 5 Columns) */}
        <ScrollReveal direction="right" className="lg:col-span-5 space-y-8">
          <div className="border border-studio-gold/15 p-6 rounded bg-studio-sand/15">
            <h3 className="font-serif text-lg font-bold text-studio-charcoal mb-4">Bright to Bride Studio</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-studio-gold mr-3 shrink-0 stroke-[1.5]" />
                <div>
                  <span className="block font-sans text-[10px] tracking-widest text-studio-warmGray uppercase font-semibold">Address</span>
                  <span className="font-sans text-xs text-studio-charcoal mt-1 block">
                    {studioInfo.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-studio-gold mr-3 shrink-0 stroke-[1.5]" />
                <div>
                  <span className="block font-sans text-[10px] tracking-widest text-studio-warmGray uppercase font-semibold">Phone</span>
                  <a href={`tel:${studioInfo.phone}`} className="font-sans text-xs text-studio-charcoal hover:text-studio-gold transition-colors mt-1 block">
                    +91 {studioInfo.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-studio-gold mr-3 shrink-0 stroke-[1.5]" />
                <div>
                  <span className="block font-sans text-[10px] tracking-widest text-studio-warmGray uppercase font-semibold">Email</span>
                  <a href={`mailto:${studioInfo.email}`} className="font-sans text-xs text-studio-charcoal hover:text-studio-gold transition-colors mt-1 block">
                    {studioInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-studio-gold mr-3 shrink-0 stroke-[1.5]" />
                <div>
                  <span className="block font-sans text-[10px] tracking-widest text-studio-warmGray uppercase font-semibold">Studio Hours</span>
                  <span className="font-sans text-xs text-studio-charcoal mt-1 block">
                    {studioInfo.operationalHours}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Panel */}
          <div className="border border-studio-gold/15 p-6 rounded bg-studio-sand/15">
            <h3 className="font-serif text-lg font-bold text-studio-charcoal mb-4">Direct Connections</h3>

            <div className="grid grid-cols-2 gap-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={studioInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-studio-gold/25 p-3 rounded text-xs font-sans font-semibold text-studio-charcoal hover:bg-studio-charcoal hover:text-studio-cream transition-colors duration-300"
              >
                <InstagramIcon className="w-4 h-4 mr-2" />
                Instagram
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-emerald-600/30 p-3 rounded text-xs font-sans font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2 fill-current/10" />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </ScrollReveal>

        {/* Contact Form & Map (Right 7 Columns) */}
        <ScrollReveal direction="left" className="lg:col-span-7 space-y-12">

          {/* Form */}
          {!isSent ? (
            <form onSubmit={handleFormSubmit} className="bg-studio-cream border border-studio-gold/15 p-8 rounded shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-6 text-studio-charcoal border-b border-studio-gold/10 pb-3">
                Send a Direct Message
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3 text-xs font-sans rounded"
                    placeholder="e.g. Arul"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3 text-xs font-sans rounded"
                    placeholder="e.g. 9500264840"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3 text-xs font-sans rounded"
                  placeholder="e.g. arul@gmail.com"
                />
              </div>

              <div className="flex flex-col mb-6">
                <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">Your Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3 text-xs font-sans rounded resize-none"
                  placeholder="Tell us about your event details..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(26, 25, 23, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal py-3.5 font-sans text-xs tracking-widest uppercase font-semibold transition-colors duration-300 flex items-center justify-center shadow-sm"
              >
                <Send className="w-3.5 h-3.5 mr-2" />
                Submit Message
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-studio-cream border border-studio-gold/15 p-8 rounded text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 stroke-[1.5]" />
              <h3 className="font-serif text-xl font-bold mb-2">Message Sent!</h3>
              <p className="font-sans text-xs text-studio-warmGray leading-relaxed max-w-sm mx-auto mb-6">
                Thank you for contacting Bright to Bride. Arisiva S will read your details and get back to you shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-[10px] font-sans tracking-widest uppercase text-studio-gold underline font-bold"
              >
                Send another message
              </button>
            </motion.div>
          )}

          {/* Elegant Google Maps Embed Placeholder */}
          <div className="border border-studio-gold/15 rounded overflow-hidden">
            <div className="bg-studio-sand/35 p-4 border-b border-studio-gold/15 flex items-center justify-between">
              <span className="font-sans text-[10px] tracking-widest text-studio-charcoal font-bold uppercase">
                Studio Location (Mannachanallur)
              </span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-sans tracking-widest text-studio-gold uppercase font-semibold hover:underline"
              >
                Open in Maps
              </a>
            </div>

            {/* Map Frame Placeholder */}
            <div className="bg-studio-sand/10 h-72 flex flex-col items-center justify-center relative p-6 text-center">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:16px_16px]" />

              <MapPin className="w-8 h-8 text-studio-gold mb-3 stroke-[1.2]" />
              <h4 className="font-serif text-sm font-bold text-studio-charcoal">Mannachanallur, Trichy</h4>
              <p className="font-sans text-[11px] text-studio-warmGray mt-2 max-w-xs leading-relaxed">
                Our primary workspace is in Mannachanallur, with active photographic operations spanning across Samayapuram, Trichy, Srirangam, and surrounding cities.
              </p>
            </div>
          </div>

        </ScrollReveal>
      </section>
    </div>
  );
};

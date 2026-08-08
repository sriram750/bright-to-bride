import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { studioInfo } from '../data/studioData';
import { GoldLineDraw } from '../components/GoldLineDraw';
import { ScrollReveal, StaggerGrid, StaggerItem } from '../components/ScrollReveal';

export const Booking: React.FC = () => {
  useSEO({
    title: "Check Date Availability & Booking | Bright to Bride Studio",
    description: "Submit your event details to check date availability and request a customized photography quote for weddings or family rites of passage all over Tamil Nadu."
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    eventType: 'Muhurtham',
    eventDate: '',
    location: '',
    guests: 'Under 100',
    preferredPackage: 'Signature Story',
    budgetRange: 'Standard',
    requirements: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getCustomWhatsAppLink = () => {
    const message = `Hello Bright to Bride, I would like to check availability for my event.
Name: ${formData.name}
Event: ${formData.eventType}
Date: ${formData.eventDate}
Location: ${formData.location}
Package: ${formData.preferredPackage}`;
    return `https://wa.me/91${studioInfo.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const handlePaymentSimulation = () => {
    const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
    setPaymentStatus('processing');
    
    setTimeout(() => {
      if (rzpKey) {
        console.log(`Initializing Razorpay SDK with key: ${rzpKey}`);
      } else {
        console.log("No environment key detected. Running high-fidelity checkout simulation.");
      }
      setPaymentStatus('success');
    }, 1800);
  };

  const eventTypes = [
    'Seemantham',
    'Thottil Vizha',
    'Peyarsutu Vizha',
    'Kaathukuthal',
    'Nichayathartham',
    'Penn Paarkkum Padalam',
    'Muhurtham',
    'Thirumanam',
    'Kalyana Virundhu',
    'Other'
  ];

  return (
    <div className="bg-studio-cream pt-28 text-studio-charcoal min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-studio-gold/15 text-center">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Secure Your Date</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-4">
            Online Booking & Availability
          </h1>
          <p className="font-sans text-xs md:text-sm text-studio-warmGray max-w-2xl leading-relaxed mx-auto">
            Fill out the event registry form below. We will analyze your dates, consult on scheduling constraints, and finalize your booking.
          </p>
          <GoldLineDraw width={140} />
        </ScrollReveal>
      </section>

      {/* Booking Steps visual */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          {[
            { step: "01", title: "Submit Details" },
            { step: "02", title: "Check Date" },
            { step: "03", title: "Discuss Details" },
            { step: "04", title: "Select Package" },
            { step: "05", title: "Pay Advance" },
            { step: "06", title: "Booking Confirmed" }
          ].map((item, index) => (
            <StaggerItem key={index} className="bg-studio-sand/20 border border-studio-gold/10 p-4 rounded">
              <span className="font-serif text-sm italic text-studio-gold font-bold">{item.step}</span>
              <h4 className="font-sans text-[10px] tracking-wider uppercase font-semibold mt-1 text-studio-charcoal">
                {item.title}
              </h4>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Main Booking Form / Success State */}
      <section className="max-w-4xl mx-auto px-6 py-12 pb-24">
        {!isSubmitted ? (
          <ScrollReveal className="bg-studio-cream border border-studio-gold/15 p-8 md:p-12 shadow-sm rounded">
            <form onSubmit={handleSubmit}>
              <h3 className="font-serif text-2xl font-bold mb-8 text-studio-charcoal border-b border-studio-gold/10 pb-4">
                Event Details Registry
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                    placeholder="e.g. Sridhar"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                    placeholder="e.g. 9500264840"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                    placeholder="e.g. 9500264840"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                    placeholder="e.g. sridhar@gmail.com"
                  />
                </div>

                {/* Event Type */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Event Date */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                  />
                </div>

                {/* Event Location */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Event Location / Venue *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                    placeholder="e.g. Mannachanallur Temple, Trichy"
                  />
                </div>

                {/* Guests Count */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Expected Guests Count
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                  >
                    <option>Under 100</option>
                    <option>100 - 300</option>
                    <option>300 - 600</option>
                    <option>600+</option>
                  </select>
                </div>

                {/* Preferred Package */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Preferred Story Package
                  </label>
                  <select
                    name="preferredPackage"
                    value={formData.preferredPackage}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                  >
                    <option>Essential Story</option>
                    <option>Signature Story</option>
                    <option>Luxury Story</option>
                    <option>Bespoke Custom Setup</option>
                  </select>
                </div>

                {/* Budget Range */}
                <div className="flex flex-col">
                  <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                    Estimated Budget Range
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded"
                  >
                    <option>Standard / Compact</option>
                    <option>Premium / Quality-Focused</option>
                    <option>Elite Luxury / Double-Setup</option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="flex flex-col mb-8">
                <label className="font-sans text-[10px] tracking-widest uppercase font-semibold text-studio-warmGray mb-2">
                  Additional Requirements / Notes
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none p-3.5 text-xs font-sans rounded resize-none"
                  placeholder="Mention any traditional details, travel needs, or special timing..."
                />
              </div>

              {/* Submit Triggers */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(26, 25, 23, 0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal py-4 font-sans text-xs tracking-widest uppercase transition-colors duration-300 font-semibold shadow-sm"
                >
                  Check Date Availability
                </motion.button>
              </div>
            </form>
          </ScrollReveal>
        ) : (
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-studio-cream border border-studio-gold/15 p-8 md:p-12 shadow-sm rounded text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto stroke-[1.2] mb-6" />
            
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-studio-charcoal mb-4">
              Inquiry Submitted Successfully!
            </h3>
            
            <p className="font-sans text-xs md:text-sm text-studio-warmGray max-w-md mx-auto mb-8 leading-relaxed">
              Vanakkam! Thank you for registering your milestone. Arisiva S will check the scheduling calendars for <strong>{formData.eventDate}</strong> and get back to you shortly.
            </p>

            <div className="max-w-md mx-auto bg-studio-sand/35 border border-studio-gold/15 p-6 mb-8 rounded text-left">
              <h4 className="font-serif text-sm font-bold text-studio-charcoal mb-3">Booking Flow Action Items:</h4>
              <ul className="space-y-2 text-xs font-sans text-studio-warmGray">
                <li>• Date Check: <strong>Pending Review</strong></li>
                <li>• Package Choice: <strong>{formData.preferredPackage}</strong></li>
                <li>• Custom WhatsApp confirmation is available below.</li>
              </ul>
            </div>

            {/* Post-submit Conversion Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={getCustomWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 font-sans text-xs tracking-widest uppercase transition-colors duration-300 font-semibold flex items-center justify-center rounded shadow-md"
              >
                <MessageCircle className="w-4 h-4 mr-2 fill-white/10" />
                Notify on WhatsApp
              </motion.a>

              {/* Advance Payment simulation module */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePaymentSimulation}
                disabled={paymentStatus === 'success'}
                className={`w-full py-4 font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center border rounded transition-colors duration-300 ${
                  paymentStatus === 'success'
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                    : 'border-studio-charcoal hover:bg-studio-charcoal hover:text-studio-cream text-studio-charcoal'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {paymentStatus === 'idle' && "Pay Booking Advance"}
                {paymentStatus === 'processing' && "Simulating Payment..."}
                {paymentStatus === 'success' && "Advance Confirmed"}
              </motion.button>
            </div>

            {/* Payment security info */}
            {paymentStatus === 'success' && (
              <div className="mt-8 flex items-center justify-center text-emerald-700 font-sans text-[10px] tracking-widest uppercase font-bold">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                Mock Payment Verified. Reservation status: Confirmed.
              </div>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
};

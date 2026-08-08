import React from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { packagesData, getWhatsAppLink } from '../data/studioData';

interface PackagesProps {
  setCurrentPage: (page: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({ setCurrentPage }) => {
  useSEO({
    title: "Photography Packages & Custom Pricing | Bright to Bride Trichy",
    description: "Explore our premium photography packages: Essential, Signature, and Luxury Stories. Meticulously designed for weddings, Seemantham, and cradle ceremonies."
  });

  const handleQuoteClick = (packageName: string) => {
    // Navigate to booking page and let it autofill if possible, or scroll to form
    console.log("Custom quote requested for package:", packageName);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-studio-cream pt-28 text-studio-charcoal min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-studio-gold/15 text-center lg:text-left">
        <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Pricing Guide</span>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
          Photography Stories & Packages
        </h1>
        <p className="font-sans text-xs md:text-base text-studio-warmGray max-w-2xl leading-relaxed mx-auto lg:mx-0">
          Our rates are fully customized to match your timeline, venue constraints, and visual deliverables. Browse our standard configurations below.
        </p>
      </section>

      {/* Quote Notice */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-6 mt-4">
        <div className="bg-studio-sand/30 border border-studio-gold/20 p-6 text-center rounded">
          <p className="font-serif italic text-xs md:text-sm text-studio-charcoal leading-relaxed max-w-3xl mx-auto">
            "Every ceremony represents a distinct storyline. Packages are customized based on your event location, exact duration, album layout demands, and custom additions. We do not hardcode rigid pricing tags."
          </p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid lg:grid-cols-3 gap-8">
        {packagesData.map((pkg) => (
          <div
            key={pkg.id}
            className={`border p-8 rounded flex flex-col justify-between relative transition-luxury ${
              pkg.recommended
                ? 'bg-studio-sand/40 border-studio-gold shadow-md scale-102 lg:scale-105 z-10'
                : 'bg-studio-cream border-studio-gold/15'
            }`}
          >
            {pkg.recommended && (
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-studio-gold text-studio-charcoal text-[9px] tracking-widest uppercase font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <div>
              <span className="font-sans text-[9px] tracking-widest text-studio-gold uppercase font-bold">
                Story Tier
              </span>
              <h3 className="font-serif text-2xl font-bold text-studio-charcoal mt-2 mb-3">
                {pkg.name}
              </h3>
              <p className="font-sans text-xs text-studio-warmGray mb-6 leading-relaxed">
                {pkg.tagline}
              </p>
              
              <div className="border-t border-studio-gold/10 pt-6 mb-8 space-y-4">
                <div className="flex justify-between text-xs font-sans text-studio-charcoal">
                  <span className="text-studio-warmGray">Duration:</span>
                  <span className="font-semibold">{pkg.duration}</span>
                </div>
                <div className="flex justify-between text-xs font-sans text-studio-charcoal">
                  <span className="text-studio-warmGray">Photographers:</span>
                  <span className="font-semibold">{pkg.photographers}</span>
                </div>
                <div className="flex justify-between text-xs font-sans text-studio-charcoal">
                  <span className="text-studio-warmGray">Deliverables:</span>
                  <span className="font-semibold">{pkg.deliverables}</span>
                </div>
                <div className="flex justify-between text-xs font-sans text-studio-charcoal">
                  <span className="text-studio-warmGray">Album Layout:</span>
                  <span className="font-semibold">{pkg.album}</span>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-3.5 mb-8 border-t border-studio-gold/10 pt-6">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start text-xs font-sans text-studio-charcoal leading-relaxed">
                    <Check className="w-4 h-4 text-studio-gold mr-2.5 mt-0.5 shrink-0 stroke-[2]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Triggers */}
            <div className="space-y-3 mt-4">
              <button
                onClick={() => handleQuoteClick(pkg.name)}
                className="w-full text-center py-3.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal font-sans text-[10px] tracking-widest uppercase transition-all duration-300 font-semibold"
              >
                Request Custom Quote
              </button>
              <a
                href={getWhatsAppLink('booking', pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 border border-emerald-600/30 text-emerald-700 hover:bg-emerald-600 hover:text-white font-sans text-[10px] tracking-widest uppercase transition-all duration-300 font-semibold flex items-center justify-center"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-2 fill-current/10" />
                Query on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Comparison Grid Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-studio-gold/15">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-center mb-12">
          Compare Packages at a Glance
        </h3>
        
        <div className="overflow-x-auto shadow-sm border border-studio-gold/10">
          <table className="w-full table-auto text-left bg-studio-cream">
            <thead>
              <tr className="bg-studio-sand/40 border-b border-studio-gold/15 text-studio-charcoal">
                <th className="p-4 font-serif text-sm font-bold">Features</th>
                <th className="p-4 font-sans text-xs tracking-wider uppercase font-semibold">Essential</th>
                <th className="p-4 font-sans text-xs tracking-wider uppercase font-semibold bg-studio-gold/5">Signature</th>
                <th className="p-4 font-sans text-xs tracking-wider uppercase font-semibold">Luxury</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-gold/10 font-sans text-xs text-studio-charcoal">
              <tr>
                <td className="p-4 font-semibold">Event Duration</td>
                <td className="p-4">4 Hours</td>
                <td className="p-4 bg-studio-gold/5 font-semibold text-studio-gold">Up to 8 Hours</td>
                <td className="p-4">Up to 16 Hours</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Photographer Count</td>
                <td className="p-4">1 (Lead)</td>
                <td className="p-4 bg-studio-gold/5">2 (Lead + Candid)</td>
                <td className="p-4">3 (Specialized)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Edited Pictures</td>
                <td className="p-4">120+</td>
                <td className="p-4 bg-studio-gold/5">250+</td>
                <td className="p-4">500+</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Printed Album</td>
                <td className="p-4">Soft-cover (30 pages)</td>
                <td className="p-4 bg-studio-gold/5 font-semibold">Hardcover (40 pages + Box)</td>
                <td className="p-4">Royal Box Album + 2 Mini Duplicates</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Pre-shoot Session</td>
                <td className="p-4 text-studio-warmGray">—</td>
                <td className="p-4 bg-studio-gold/5 text-emerald-600 font-bold">✓ Included</td>
                <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold">Delivery Window</td>
                <td className="p-4">2-3 Weeks</td>
                <td className="p-4 bg-studio-gold/5">14-20 Days</td>
                <td className="p-4 font-semibold text-emerald-600">7-10 Days Express</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

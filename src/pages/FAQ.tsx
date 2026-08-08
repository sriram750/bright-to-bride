import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { faqsData, getWhatsAppLink } from '../data/studioData';

export const FAQ: React.FC = () => {
  useSEO({
    title: "Frequently Asked Questions | Bright to Bride FAQ",
    description: "Got questions about traditional Tamil ceremony photography? Find answers about booking timelines, locations, customized packages, and photo delivery."
  });

  const [openId, setOpenId] = useState<string | null>("f1"); // Open the first FAQ by default
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = faqsData.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-studio-cream pt-28 text-studio-charcoal min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-studio-gold/15 text-center">
        <span className="text-[10px] tracking-[0.25em] text-studio-gold uppercase font-bold">Information Desk</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="font-sans text-xs md:text-sm text-studio-warmGray max-w-2xl leading-relaxed mx-auto">
          Clear answers regarding travel configurations, traditional timelines, physical photo books, custom pricing plans, and booking workflows.
        </p>
      </section>

      {/* Search Input Bar */}
      <section className="max-w-xl mx-auto px-6 py-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions (e.g. albums, travel)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-studio-sand/10 border border-studio-gold/25 focus:border-studio-gold focus:outline-none pl-12 pr-4 py-3.5 text-xs font-sans rounded shadow-sm"
          />
          <Search className="w-4 h-4 text-studio-gold absolute left-4 top-1/2 -translate-y-1/2 stroke-[2]" />
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="max-w-3xl mx-auto px-6 py-6 pb-24">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-studio-sand/10 border border-dashed border-studio-gold/20 rounded">
            <p className="font-sans text-xs text-studio-warmGray">
              No matching questions found. Ask us directly on WhatsApp!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-studio-cream border border-studio-gold/15 rounded overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none active:bg-studio-sand/10 transition-colors"
                  >
                    <span className="font-serif text-xs md:text-sm font-bold text-studio-charcoal pr-6">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-studio-gold shrink-0 stroke-[2]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-studio-gold shrink-0 stroke-[2]" />
                    )}
                  </button>

                  {/* Collapsible Answer */}
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 pt-1 font-sans text-xs text-studio-warmGray leading-relaxed animate-slide-up border-t border-studio-gold/5 mt-[-1px]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Help Callout */}
        <div className="mt-16 bg-studio-sand/20 border border-studio-gold/10 p-8 text-center rounded">
          <h4 className="font-serif text-lg font-bold text-studio-charcoal mb-2">
            Still Have Questions?
          </h4>
          <p className="font-sans text-xs text-studio-warmGray mb-6">
            If you need details about a custom ceremony or timing, message Arisiva S directly.
          </p>
          <a
            href={getWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-md rounded"
          >
            <MessageCircle className="w-4 h-4 mr-2 fill-white/10" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

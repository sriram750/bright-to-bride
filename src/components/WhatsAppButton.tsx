import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/studioData';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={getWhatsAppLink('general')}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex fixed bottom-8 right-8 z-50 items-center group bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      title="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-xs uppercase tracking-wider font-semibold font-sans pr-0 group-hover:pr-3">
        WhatsApp Chat
      </span>
      
      {/* Icon with pulsing background */}
      <div className="relative">
        <span className="absolute -inset-1 rounded-full bg-emerald-600 animate-ping opacity-30 group-hover:opacity-0 transition-opacity" />
        <MessageCircle className="w-6 h-6 fill-white/10" />
      </div>
    </a>
  );
};

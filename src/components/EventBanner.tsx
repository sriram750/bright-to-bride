import React, { useState } from 'react';
import { useStudioData, EVENT_PRESETS } from '../context/StudioDataContext';
import { Sparkles, X, ShieldAlert } from 'lucide-react';

export const EventBanner: React.FC = () => {
  const { bannerEnabled, bannerText, activePresetId, isAdminLoggedIn } = useStudioData();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!bannerEnabled || isDismissed) return null;

  const currentPreset = EVENT_PRESETS.find((p) => p.id === activePresetId);

  return (
    <div className="bg-gradient-to-r from-studio-charcoal via-[#2a2421] to-studio-charcoal text-studio-cream border-b border-studio-gold/20 text-xs py-2.5 px-4 relative z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Banner Announcement Content */}
        <div className="flex items-center space-x-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-studio-gold/20 text-studio-gold border border-studio-gold/30 px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider flex items-center shrink-0">
            <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
            {currentPreset?.badgeText || 'Special Event'}
          </span>
          <span className="font-sans text-studio-cream/90 font-medium tracking-wide truncate">
            {bannerText}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 shrink-0">
          {isAdminLoggedIn && (
            <span className="hidden sm:flex items-center text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              <ShieldAlert className="w-3 h-3 mr-1" />
              Admin Active
            </span>
          )}
          <button
            onClick={() => setIsDismissed(true)}
            className="text-studio-cream/50 hover:text-studio-cream transition-colors p-1 focus:outline-none"
            title="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

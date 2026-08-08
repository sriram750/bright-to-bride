import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  studioInfo,
  servicesData,
  portfolioData,
  packagesData,
  testimonialsData,
} from '../data/studioData';
import type {
  ServiceItem,
  PackageItem,
  TestimonialItem
} from '../data/studioData';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface EventPreset {
  id: string;
  name: string;
  description: string;
  bannerText: string;
  heroImage: string;
  featuredCategory?: string;
  badgeText: string;
}

export const EVENT_PRESETS: EventPreset[] = [
  {
    id: 'default',
    name: 'Standard Showcase',
    description: 'Classic balanced view of both Childhood Rites and Wedding celebrations.',
    bannerText: '✨ Fine-Art Photography for Weddings & Childhood Rites in Trichy | Book Your Dates Now',
    heroImage: '/images/hero_wedding.png',
    badgeText: 'Classic Studio Gallery'
  },
  {
    id: 'wedding-season',
    name: 'Wedding Season Focus',
    description: 'Highlights Muhurtham, Nichayathartham, Thirumanam & Royal Wedding Feasts.',
    bannerText: '💍 Muhurtham Season Special — Reserve Arisiva S for your wedding dates early & get a complimentary keepsake print!',
    heroImage: '/images/muhurtham_couple.png',
    featuredCategory: 'weddings-unions',
    badgeText: 'Wedding Season Special'
  },
  {
    id: 'childhood-rites',
    name: 'Maternity & Childhood Month',
    description: 'Highlights Seemantham bangles, Thottil Vizha cradle, Naming & Ear Piercing ceremonies.',
    bannerText: '👶 Little Beginnings Month — Special album packages for Thottil Vizha, Seemantham & Naming ceremonies!',
    heroImage: '/images/portfolio_baby_cradle.png',
    featuredCategory: 'childhood-rites',
    badgeText: 'Childhood & Family Rites Month'
  },
  {
    id: 'festive-special',
    name: 'Festive & Celebration Special',
    description: 'Vibrant highlight on family bonding, Kalyana Virundhu feasts & cultural festivities.',
    bannerText: '🎆 Festival & Feast Special — Limited date slots available for homecoming celebrations and family shoots!',
    heroImage: '/images/portfolio_kalyana_virundhu.png',
    badgeText: 'Festive Season Highlight'
  }
];

interface StudioDataContextType {
  isAdminLoggedIn: boolean;
  activePresetId: string;
  bannerEnabled: boolean;
  bannerText: string;
  heroImage: string;
  aboutPhotographerImage: string;
  homeStoryImage: string;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  packages: PackageItem[];
  testimonials: TestimonialItem[];
  
  login: (password: string) => boolean;
  logout: () => void;
  setActivePreset: (presetId: string) => void;
  updateServiceImage: (serviceId: string, newImageUrl: string) => void;
  updatePortfolioImage: (portfolioId: string, newImageUrl: string) => void;
  updateHeroImage: (newImageUrl: string) => void;
  updateAboutPhotographerImage: (newImageUrl: string) => void;
  updateHomeStoryImage: (newImageUrl: string) => void;
  updateBanner: (enabled: boolean, text: string) => void;
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'bright_to_bride_custom_data_v2';
const AUTH_KEY = 'bright_to_bride_admin_auth';

const StudioDataContext = createContext<StudioDataContextType | undefined>(undefined);

export const StudioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  const [activePresetId, setActivePresetId] = useState<string>('default');
  const [bannerEnabled, setBannerEnabled] = useState<boolean>(true);
  const [bannerText, setBannerText] = useState<string>(EVENT_PRESETS[0].bannerText);
  const [heroImage, setHeroImage] = useState<string>(EVENT_PRESETS[0].heroImage);
  const [aboutPhotographerImage, setAboutPhotographerImage] = useState<string>('/images/photographer_arisiva.png');
  const [homeStoryImage, setHomeStoryImage] = useState<string>('/images/muhurtham_couple.png');
  const [services, setServices] = useState<ServiceItem[]>(servicesData);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(portfolioData);
  const [packages] = useState<PackageItem[]>(packagesData);
  const [testimonials] = useState<TestimonialItem[]>(testimonialsData);

  // Load persisted customizations on startup
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
        if (parsed.bannerEnabled !== undefined) setBannerEnabled(parsed.bannerEnabled);
        if (parsed.bannerText) setBannerText(parsed.bannerText);
        if (parsed.heroImage) setHeroImage(parsed.heroImage);
        if (parsed.aboutPhotographerImage) setAboutPhotographerImage(parsed.aboutPhotographerImage);
        if (parsed.homeStoryImage) setHomeStoryImage(parsed.homeStoryImage);
        if (parsed.services && Array.isArray(parsed.services)) setServices(parsed.services);
        if (parsed.portfolio && Array.isArray(parsed.portfolio)) setPortfolio(parsed.portfolio);
      }
    } catch (err) {
      console.error('Failed to parse saved studio data from localStorage:', err);
    }
  }, []);

  // Save changes to localStorage
  const saveState = (updatedState: {
    activePresetId?: string;
    bannerEnabled?: boolean;
    bannerText?: string;
    heroImage?: string;
    aboutPhotographerImage?: string;
    homeStoryImage?: string;
    services?: ServiceItem[];
    portfolio?: PortfolioItem[];
  }) => {
    try {
      const currentData = localStorage.getItem(STORAGE_KEY);
      const existing = currentData ? JSON.parse(currentData) : {};
      const payload = {
        ...existing,
        ...updatedState,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error('Failed to save studio data to localStorage:', err);
    }
  };

  const login = (password: string): boolean => {
    if (password === 'brighttobride2026' || password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const setActivePreset = (presetId: string) => {
    const preset = EVENT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setActivePresetId(presetId);
    setBannerText(preset.bannerText);
    setHeroImage(preset.heroImage);

    saveState({
      activePresetId: presetId,
      bannerText: preset.bannerText,
      heroImage: preset.heroImage,
      aboutPhotographerImage,
      homeStoryImage,
      services,
      portfolio
    });
  };

  const updateServiceImage = (serviceId: string, newImageUrl: string) => {
    const updatedServices = services.map((s) =>
      s.id === serviceId ? { ...s, image: newImageUrl } : s
    );
    setServices(updatedServices);
    saveState({ services: updatedServices });
  };

  const updatePortfolioImage = (portfolioId: string, newImageUrl: string) => {
    const updatedPortfolio = portfolio.map((p) =>
      p.id === portfolioId ? { ...p, image: newImageUrl } : p
    );
    setPortfolio(updatedPortfolio);
    saveState({ portfolio: updatedPortfolio });
  };

  const updateHeroImage = (newImageUrl: string) => {
    setHeroImage(newImageUrl);
    saveState({ heroImage: newImageUrl });
  };

  const updateAboutPhotographerImage = (newImageUrl: string) => {
    setAboutPhotographerImage(newImageUrl);
    saveState({ aboutPhotographerImage: newImageUrl });
  };

  const updateHomeStoryImage = (newImageUrl: string) => {
    setHomeStoryImage(newImageUrl);
    saveState({ homeStoryImage: newImageUrl });
  };

  const updateBanner = (enabled: boolean, text: string) => {
    setBannerEnabled(enabled);
    setBannerText(text);
    saveState({ bannerEnabled: enabled, bannerText: text });
  };

  const resetToDefaults = () => {
    const defaultPreset = EVENT_PRESETS[0];
    setActivePresetId('default');
    setBannerEnabled(true);
    setBannerText(defaultPreset.bannerText);
    setHeroImage(defaultPreset.heroImage);
    setAboutPhotographerImage('/images/photographer_arisiva.png');
    setHomeStoryImage('/images/muhurtham_couple.png');
    setServices(servicesData);
    setPortfolio(portfolioData);

    localStorage.removeItem(STORAGE_KEY);
  };

  const exportConfigJson = (): string => {
    const config = {
      activePresetId,
      bannerEnabled,
      bannerText,
      heroImage,
      aboutPhotographerImage,
      homeStoryImage,
      services,
      portfolio,
      exportedAt: new Date().toISOString(),
      studio: studioInfo.name
    };
    return JSON.stringify(config, null, 2);
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.services && parsed.portfolio) {
        if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
        if (parsed.bannerEnabled !== undefined) setBannerEnabled(parsed.bannerEnabled);
        if (parsed.bannerText) setBannerText(parsed.bannerText);
        if (parsed.heroImage) setHeroImage(parsed.heroImage);
        if (parsed.aboutPhotographerImage) setAboutPhotographerImage(parsed.aboutPhotographerImage);
        if (parsed.homeStoryImage) setHomeStoryImage(parsed.homeStoryImage);
        setServices(parsed.services);
        setPortfolio(parsed.portfolio);

        saveState({
          activePresetId: parsed.activePresetId || activePresetId,
          bannerEnabled: parsed.bannerEnabled ?? bannerEnabled,
          bannerText: parsed.bannerText || bannerText,
          heroImage: parsed.heroImage || heroImage,
          aboutPhotographerImage: parsed.aboutPhotographerImage || aboutPhotographerImage,
          homeStoryImage: parsed.homeStoryImage || homeStoryImage,
          services: parsed.services,
          portfolio: parsed.portfolio
        });
        return true;
      }
    } catch (err) {
      console.error('Failed to import JSON configuration:', err);
    }
    return false;
  };

  return (
    <StudioDataContext.Provider
      value={{
        isAdminLoggedIn,
        activePresetId,
        bannerEnabled,
        bannerText,
        heroImage,
        aboutPhotographerImage,
        homeStoryImage,
        services,
        portfolio,
        packages,
        testimonials,
        login,
        logout,
        setActivePreset,
        updateServiceImage,
        updatePortfolioImage,
        updateHeroImage,
        updateAboutPhotographerImage,
        updateHomeStoryImage,
        updateBanner,
        resetToDefaults,
        exportConfigJson,
        importConfigJson
      }}
    >
      {children}
    </StudioDataContext.Provider>
  );
};

export const useStudioData = (): StudioDataContextType => {
  const context = useContext(StudioDataContext);
  if (!context) {
    throw new Error('useStudioData must be used within a StudioDataProvider');
  }
  return context;
};

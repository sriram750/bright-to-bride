import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
import {
  saveToStorageEngine,
  loadFromStorageEngine,
  clearStorageEngine
} from '../utils/storageEngine';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface InstagramItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  category: string;
}

export interface MessageItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  type?: string;
}

export const defaultInstagramItems: InstagramItem[] = [
  { id: 'insta-1', image: "/images/hero_wedding.png", alt: "Traditional wedding couple", title: "Muhurtham Garlands", category: "Weddings" },
  { id: 'insta-2', image: "/images/seemantham_ceremony.png", alt: "Baby shower bangles", title: "Seemantham Blessings", category: "Childhood" },
  { id: 'insta-3', image: "/images/muhurtham_couple.png", alt: "Sacred Muhurtham ceremony", title: "Sacred Vows", category: "Tradition" },
  { id: 'insta-4', image: "/images/portfolio_baby_cradle.png", alt: "Thottil Vizha cradle setup", title: "Thottil Vizha", category: "Rites of Passage" }
];

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
  instagramImages: InstagramItem[];
  messages: MessageItem[];
  packages: PackageItem[];
  testimonials: TestimonialItem[];
  isCloudSynced: boolean;
  
  login: (password: string) => boolean;
  logout: () => void;
  setActivePreset: (presetId: string) => void;
  updateServiceImage: (serviceId: string, newImageUrl: string) => void;
  updatePortfolioImage: (portfolioId: string, newImageUrl: string) => void;
  updateInstagramImage: (id: string, newImageUrl: string, newTitle?: string, newCategory?: string) => void;
  updateHeroImage: (newImageUrl: string) => void;
  updateAboutPhotographerImage: (newImageUrl: string) => void;
  updateHomeStoryImage: (newImageUrl: string) => void;
  updateBanner: (enabled: boolean, text: string) => void;
  addMessage: (msg: { name: string; phone: string; email: string; message: string; type?: string }) => void;
  deleteMessage: (id: string) => void;
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;
  syncWithCloud: () => Promise<boolean>;
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
  const [instagramImages, setInstagramImages] = useState<InstagramItem[]>(defaultInstagramItems);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [packages] = useState<PackageItem[]>(packagesData);
  const [testimonials] = useState<TestimonialItem[]>(testimonialsData);

  const lastUpdatedRef = useRef<string | null>(null);
  const hasLocalCustomDataRef = useRef<boolean>(false);

  // Helper to apply parsed data to state safely
  const applyData = (parsed: any) => {
    if (!parsed || parsed.empty) return;

    if (parsed.lastUpdated) {
      lastUpdatedRef.current = parsed.lastUpdated;
      hasLocalCustomDataRef.current = true;
    }

    if (parsed.activePresetId) setActivePresetId(parsed.activePresetId);
    if (parsed.bannerEnabled !== undefined) setBannerEnabled(parsed.bannerEnabled);
    if (parsed.bannerText) setBannerText(parsed.bannerText);
    if (parsed.heroImage && typeof parsed.heroImage === 'string' && parsed.heroImage.trim().length > 0) {
      setHeroImage(parsed.heroImage.trim());
    }
    if (parsed.aboutPhotographerImage && typeof parsed.aboutPhotographerImage === 'string' && parsed.aboutPhotographerImage.trim().length > 0) {
      setAboutPhotographerImage(parsed.aboutPhotographerImage.trim());
    }
    if (parsed.homeStoryImage && typeof parsed.homeStoryImage === 'string' && parsed.homeStoryImage.trim().length > 0) {
      setHomeStoryImage(parsed.homeStoryImage.trim());
    }
    if (parsed.services && Array.isArray(parsed.services) && parsed.services.length > 0) {
      setServices(parsed.services);
    }
    if (parsed.portfolio && Array.isArray(parsed.portfolio) && parsed.portfolio.length > 0) {
      setPortfolio(parsed.portfolio);
    }
    if (parsed.instagramImages && Array.isArray(parsed.instagramImages) && parsed.instagramImages.length > 0) {
      setInstagramImages(parsed.instagramImages);
    }
    if (parsed.messages && Array.isArray(parsed.messages)) {
      setMessages(parsed.messages);
    }
  };

  // Fetch live server data safely without overwriting local custom data
  const fetchServerData = async () => {
    // 1. Try server endpoint (/api/studio-data)
    try {
      const res = await fetch('/api/studio-data', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && !data.empty && (data.services || data.activePresetId || data.heroImage || data.aboutPhotographerImage || data.homeStoryImage || data.instagramImages || data.messages)) {
          // Compare timestamps before applying remote data over local data
          if (data.lastUpdated && lastUpdatedRef.current) {
            const serverTime = new Date(data.lastUpdated).getTime();
            const localTime = new Date(lastUpdatedRef.current).getTime();
            if (serverTime < localTime) {
              // Local data is newer than server response, keep local data
              return true;
            }
          }
          applyData(data);
          saveToStorageEngine(data);
          return true;
        }
      }
    } catch {}

    // 2. Fallback to static JSON file ONLY if user has no custom local data saved
    if (!hasLocalCustomDataRef.current) {
      try {
        const staticRes = await fetch('/studio-data.json', { cache: 'no-store' });
        if (staticRes.ok) {
          const data = await staticRes.json();
          if (data && !data.empty && (data.services || data.activePresetId || data.heroImage || data.aboutPhotographerImage || data.homeStoryImage || data.instagramImages || data.messages)) {
            applyData(data);
            return true;
          }
        }
      } catch {}
    }

    return false;
  };

  // Load persisted customizations on startup + live cross-tab storage event sync + server fetch
  useEffect(() => {
    const initData = async () => {
      // 1. Load initial storage data (IndexedDB + localStorage fallback)
      const savedData = await loadFromStorageEngine();
      if (savedData) {
        applyData(savedData);
      }

      // 2. Fetch fresh server data for multi-device sync safely
      await fetchServerData();
    };

    initData();

    // 3. Real-time listener for multi-tab localStorage synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          applyData(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Failed to parse cross-tab storage update:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // 4. Real-time BroadcastChannel for cross-context / incognito sync
    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('bright_to_bride_sync');
      bc.onmessage = (event) => {
        if (event.data) {
          applyData(event.data);
        }
      };
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (bc) bc.close();
    };
  }, []);

  // Save changes instantly to IndexedDB, localStorage, React Context, Server API, and BroadcastChannel
  const saveState = async (updatedState: {
    activePresetId?: string;
    bannerEnabled?: boolean;
    bannerText?: string;
    heroImage?: string;
    aboutPhotographerImage?: string;
    homeStoryImage?: string;
    services?: ServiceItem[];
    portfolio?: PortfolioItem[];
    instagramImages?: InstagramItem[];
    messages?: MessageItem[];
  }) => {
    const activeServices = (updatedState.services ?? services);
    const activePortfolio = (updatedState.portfolio ?? portfolio);
    const activeInstagram = (updatedState.instagramImages ?? instagramImages);
    const activeMessages = (updatedState.messages ?? messages);

    const nowIso = new Date().toISOString();
    lastUpdatedRef.current = nowIso;
    hasLocalCustomDataRef.current = true;

    const payload = {
      activePresetId: updatedState.activePresetId ?? activePresetId,
      bannerEnabled: updatedState.bannerEnabled ?? bannerEnabled,
      bannerText: updatedState.bannerText ?? bannerText,
      heroImage: updatedState.heroImage ?? heroImage,
      aboutPhotographerImage: updatedState.aboutPhotographerImage ?? aboutPhotographerImage,
      homeStoryImage: updatedState.homeStoryImage ?? homeStoryImage,
      services: activeServices.length > 0 ? activeServices : servicesData,
      portfolio: activePortfolio.length > 0 ? activePortfolio : portfolioData,
      instagramImages: activeInstagram.length > 0 ? activeInstagram : defaultInstagramItems,
      messages: activeMessages,
      lastUpdated: nowIso
    };

    // Update in-memory React state immediately
    applyData(payload);

    // 1. Save locally to IndexedDB + localStorage
    await saveToStorageEngine(payload);

    // 2. Broadcast to all open tabs / windows in real time
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('bright_to_bride_sync');
        bc.postMessage(payload);
        bc.close();
      }
    } catch {}

    // 3. Push to Server Endpoint (/api/studio-data)
    fetch('/api/studio-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch((err) => {
      console.warn('Server sync note:', err);
    });
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
      portfolio,
      instagramImages,
      messages
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

  const updateInstagramImage = (id: string, newImageUrl: string, newTitle?: string, newCategory?: string) => {
    const updatedInstagram = instagramImages.map((item) =>
      item.id === id
        ? {
            ...item,
            image: newImageUrl || item.image,
            title: newTitle !== undefined ? newTitle : item.title,
            category: newCategory !== undefined ? newCategory : item.category
          }
        : item
    );
    setInstagramImages(updatedInstagram);
    saveState({ instagramImages: updatedInstagram });
  };

  const addMessage = (msg: { name: string; phone: string; email: string; message: string; type?: string }) => {
    const newMsg: MessageItem = {
      id: 'msg-' + Date.now(),
      name: msg.name,
      phone: msg.phone,
      email: msg.email,
      message: msg.message,
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      type: msg.type || 'Direct Message'
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    saveState({ messages: updated });
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    saveState({ messages: updated });
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
    clearStorageEngine();
    const defaultPreset = EVENT_PRESETS[0];
    const defaultPayload = {
      activePresetId: 'default',
      bannerEnabled: true,
      bannerText: defaultPreset.bannerText,
      heroImage: defaultPreset.heroImage,
      aboutPhotographerImage: '/images/photographer_arisiva.png',
      homeStoryImage: '/images/muhurtham_couple.png',
      services: servicesData,
      portfolio: portfolioData,
      instagramImages: defaultInstagramItems,
      messages: []
    };

    setActivePresetId('default');
    setBannerEnabled(true);
    setBannerText(defaultPreset.bannerText);
    setHeroImage(defaultPreset.heroImage);
    setAboutPhotographerImage('/images/photographer_arisiva.png');
    setHomeStoryImage('/images/muhurtham_couple.png');
    setServices(servicesData);
    setPortfolio(portfolioData);
    setInstagramImages(defaultInstagramItems);
    setMessages([]);

    saveState(defaultPayload);
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
      instagramImages,
      messages,
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
        if (parsed.instagramImages) setInstagramImages(parsed.instagramImages);
        if (parsed.messages) setMessages(parsed.messages);

        saveState({
          activePresetId: parsed.activePresetId || activePresetId,
          bannerEnabled: parsed.bannerEnabled ?? bannerEnabled,
          bannerText: parsed.bannerText || bannerText,
          heroImage: parsed.heroImage || heroImage,
          aboutPhotographerImage: parsed.aboutPhotographerImage || aboutPhotographerImage,
          homeStoryImage: parsed.homeStoryImage || homeStoryImage,
          services: parsed.services,
          portfolio: parsed.portfolio,
          instagramImages: parsed.instagramImages || instagramImages,
          messages: parsed.messages || messages
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
        instagramImages,
        messages,
        packages,
        testimonials,
        isCloudSynced: true,
        login,
        logout,
        setActivePreset,
        updateServiceImage,
        updatePortfolioImage,
        updateInstagramImage,
        updateHeroImage,
        updateAboutPhotographerImage,
        updateHomeStoryImage,
        updateBanner,
        addMessage,
        deleteMessage,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        syncWithCloud: fetchServerData
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

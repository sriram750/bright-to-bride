import React, { useState } from 'react';
import { useStudioData, EVENT_PRESETS } from '../context/StudioDataContext';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Download,
  FileJson,
  Sparkles,
  Sliders,
  LogOut,
  ArrowLeft,
  Eye,
  AlertCircle,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';

interface AdminDashboardProps {
  setCurrentPage: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentPage }) => {
  const {
    isAdminLoggedIn,
    login,
    logout,
    activePresetId,
    setActivePreset,
    bannerEnabled,
    bannerText,
    updateBanner,
    heroImage,
    updateHeroImage,
    aboutPhotographerImage,
    updateAboutPhotographerImage,
    homeStoryImage,
    updateHomeStoryImage,
    services,
    updateServiceImage,
    portfolio,
    updatePortfolioImage,
    instagramImages,
    updateInstagramImage,
    messages,
    deleteMessage,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    isCloudSynced,
    syncWithCloud
  } = useStudioData();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'services' | 'portfolio' | 'banner' | 'messages' | 'export'>('themes');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState(false);

  const showToast = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasswordInput('');
    }
  };

  const handleFileUpload = (
    onSuccess: (dataUrl: string) => void
  ) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        showToast('Compressing and syncing photo to Cloud...');
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const rawUrl = readerEvent.target?.result as string;
          if (rawUrl) {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const maxWidth = 800;
              let width = img.width;
              let height = img.height;

              if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                const compressedUrl = canvas.toDataURL('image/jpeg', 0.65);
                onSuccess(compressedUrl);
                showToast('✅ Photo optimized & synced live to Cloud!');
              } else {
                onSuccess(rawUrl);
                showToast('Image uploaded!');
              }
            };
            img.onerror = () => {
              onSuccess(rawUrl);
              showToast('Image uploaded!');
            };
            img.src = rawUrl;
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleImportJson = () => {
    const ok = importConfigJson(jsonInput);
    if (ok) {
      setJsonError(false);
      showToast('Configuration imported successfully!');
    } else {
      setJsonError(true);
    }
  };

  // If not logged in, render PIN / Password Login Form
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[85vh] pt-32 pb-20 px-6 flex items-center justify-center bg-studio-cream">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl border border-studio-gold/20 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-studio-charcoal text-studio-gold rounded-full flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-studio-charcoal">
              Studio Admin Portal
            </h2>
            <p className="font-sans text-xs text-studio-warmGray">
              Enter your admin passphrase to access seasonal image controls, banner settings, and gallery updates.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-studio-charcoal/80 font-medium mb-1.5">
                Passphrase
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter password..."
                className={`w-full px-4 py-3 text-sm bg-studio-cream/50 border ${
                  authError ? 'border-red-500 bg-red-50/50' : 'border-studio-gold/30'
                } rounded-lg focus:outline-none focus:border-studio-gold font-sans`}
              />
              {authError && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  Incorrect passphrase. Try: <code className="bg-red-100 px-1 py-0.5 rounded text-[10px] ml-1">brighttobride2026</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal transition-all py-3.5 text-xs tracking-widest uppercase font-medium rounded-lg shadow-md flex items-center justify-center space-x-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-studio-warmGray hover:text-studio-gold transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#faf8f5] text-studio-charcoal">
      {/* Toast Notification */}
      {saveNotification && (
        <div className="fixed bottom-8 right-8 z-50 bg-studio-charcoal text-studio-cream px-5 py-3 rounded-xl shadow-2xl border border-studio-gold/40 flex items-center space-x-2.5 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveNotification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        {/* Header Bar */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-studio-gold/20 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-300 flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
                Admin Session Active
              </span>
              <span className="bg-sky-100 text-sky-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-sky-300 flex items-center">
                🌐 Global Cloud Sync Active
              </span>
              <span className="text-xs text-studio-warmGray">Studio Owner: Arisiva S</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-studio-charcoal">
              Photo & Seasonal Event Management
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={async () => {
                const ok = await syncWithCloud();
                showToast(ok ? 'Synced fresh cloud data across all devices!' : 'Cloud sync checked.');
              }}
              className="px-4 py-2.5 bg-sky-50 text-sky-800 border border-sky-300 hover:bg-sky-100 rounded-lg text-xs uppercase tracking-widest font-medium transition-colors flex items-center"
              title="Force sync latest photo changes across all devices"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isCloudSynced ? '' : 'animate-spin'}`} /> Sync Cloud
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2.5 bg-studio-cream border border-studio-gold/30 hover:border-studio-gold rounded-lg text-xs uppercase tracking-widest font-medium transition-colors flex items-center"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview Site
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all photos and themes back to standard studio defaults?')) {
                  resetToDefaults();
                  showToast('Reset all galleries to default studio values.');
                }
              }}
              className="px-4 py-2.5 border border-red-200 text-red-700 hover:bg-red-50 rounded-lg text-xs uppercase tracking-widest font-medium transition-colors flex items-center"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reset Defaults
            </button>

            <button
              onClick={logout}
              className="px-4 py-2.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded-lg text-xs uppercase tracking-widest font-medium transition-all flex items-center shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-studio-gold/20 overflow-x-auto pb-1">
          {[
            { id: 'themes', label: '🎨 1-Click Event Presets', icon: Sparkles },
            { id: 'services', label: '🖼️ Service Photos', icon: ImageIcon },
            { id: 'portfolio', label: '📸 Portfolio Gallery', icon: Sliders },
            { id: 'banner', label: '📢 Hero & Announcement', icon: Sliders },
            { id: 'messages', label: `📬 Direct Messages (${messages ? messages.length : 0})`, icon: Mail },
            { id: 'export', label: '💾 Backup & JSON', icon: FileJson }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-xs tracking-wider uppercase font-medium rounded-t-xl transition-all whitespace-nowrap border-t border-x ${
                activeTab === tab.id
                  ? 'bg-white text-studio-gold border-studio-gold/30 border-b-white font-semibold shadow-sm'
                  : 'bg-studio-cream/40 text-studio-charcoal/70 border-transparent hover:text-studio-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: 1-Click Event Presets */}
        {activeTab === 'themes' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-studio-gold/20 shadow-sm space-y-2">
              <h3 className="font-serif text-lg font-bold text-studio-charcoal">
                Event & Special Month Quick Presets
              </h3>
              <p className="text-xs text-studio-warmGray">
                Easily switch the entire website visual emphasis depending on the current auspicious month or booking season.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EVENT_PRESETS.map((preset) => {
                const isActive = activePresetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    className={`bg-white rounded-2xl border p-6 space-y-4 transition-all ${
                      isActive
                        ? 'border-2 border-studio-gold shadow-lg ring-2 ring-studio-gold/20'
                        : 'border-studio-gold/20 hover:border-studio-gold/50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-studio-gold bg-studio-gold/10 border border-studio-gold/20 px-2.5 py-1 rounded-md inline-block mb-2">
                          {preset.badgeText}
                        </span>
                        <h4 className="font-serif text-xl font-bold text-studio-charcoal">
                          {preset.name}
                        </h4>
                      </div>
                      {isActive && (
                        <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active Theme
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-studio-warmGray leading-relaxed">
                      {preset.description}
                    </p>

                    <div className="bg-studio-cream/60 p-3 rounded-lg border border-studio-gold/15 space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-studio-charcoal/70">
                        Banner Headline:
                      </span>
                      <p className="text-xs text-studio-charcoal italic">{preset.bannerText}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={preset.heroImage}
                          alt={preset.name}
                          className="w-12 h-12 object-cover rounded-lg border border-studio-gold/30"
                        />
                        <span className="text-[11px] text-studio-warmGray">Hero Preview</span>
                      </div>

                      <button
                        onClick={() => {
                          setActivePreset(preset.id);
                          showToast(`Activated '${preset.name}' theme across site!`);
                        }}
                        disabled={isActive}
                        className={`px-5 py-2.5 text-xs font-medium uppercase tracking-widest rounded-lg transition-all ${
                          isActive
                            ? 'bg-emerald-600 text-white cursor-default'
                            : 'bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal shadow-sm'
                        }`}
                      >
                        {isActive ? 'Currently Active' : 'Activate Theme'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Service Photos Editor */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-studio-gold/20 shadow-sm space-y-2">
              <h3 className="font-serif text-lg font-bold text-studio-charcoal">
                Services Ceremony Photos Editor
              </h3>
              <p className="text-xs text-studio-warmGray">
                Update cover photos for Seemantham, Thottil Vizha, Muhurtham, Nichayathartham, and Kalyana Virundhu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-studio-gold/20 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-24 h-24 object-cover rounded-xl border border-studio-gold/30 shadow-sm shrink-0"
                    />
                    <div className="space-y-1 overflow-hidden">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-studio-gold bg-studio-gold/10 px-2 py-0.5 rounded">
                        {service.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-studio-charcoal truncate">
                        {service.title}
                      </h4>
                      {service.tamilTitle && (
                        <p className="text-xs text-studio-gold font-medium">{service.tamilTitle}</p>
                      )}
                      <p className="text-xs text-studio-warmGray line-clamp-2">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-studio-charcoal/80">
                      Photo Source URL
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={service.image}
                        onChange={(e) => updateServiceImage(service.id, e.target.value)}
                        className="flex-grow px-3 py-2 text-xs bg-studio-cream/40 border border-studio-gold/30 rounded-lg focus:outline-none focus:border-studio-gold font-mono"
                        placeholder="https://..."
                      />
                      <button
                        onClick={() =>
                          handleFileUpload((newUrl) => updateServiceImage(service.id, newUrl))
                        }
                        className="px-3 py-2 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded-lg text-xs uppercase tracking-wider font-medium transition-colors flex items-center shrink-0"
                        title="Upload from computer"
                      >
                        <Upload className="w-3.5 h-3.5 mr-1" /> File
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Portfolio Showcase Editor */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-studio-gold/20 shadow-sm space-y-2">
              <h3 className="font-serif text-lg font-bold text-studio-charcoal">
                Portfolio Showcase Photos Editor
              </h3>
              <p className="text-xs text-studio-warmGray">
                Manage all featured shots in the main portfolio grid.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-studio-gold/20 p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-studio-gold/30 bg-studio-cream">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-studio-charcoal/80 text-studio-gold text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-serif text-sm font-bold text-studio-charcoal truncate">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-studio-warmGray line-clamp-1">{item.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => updatePortfolioImage(item.id, e.target.value)}
                      className="w-full px-2.5 py-1.5 text-[11px] bg-studio-cream/40 border border-studio-gold/30 rounded-lg focus:outline-none focus:border-studio-gold font-mono"
                    />
                    <button
                      onClick={() =>
                        handleFileUpload((newUrl) => updatePortfolioImage(item.id, newUrl))
                      }
                      className="w-full py-1.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded-lg text-[11px] uppercase tracking-wider font-medium transition-colors flex items-center justify-center"
                    >
                      <Upload className="w-3 h-3 mr-1" /> Replace Photo File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Hero Banner & Announcement Settings */}
        {activeTab === 'banner' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-studio-gold/20 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-studio-charcoal border-b border-gray-100 pb-3">
                Hero Photo & Announcement Bar Controls
              </h3>

              {/* Hero Image Editor */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-studio-charcoal">
                  Homepage Main Hero Background Image
                </label>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={heroImage}
                    alt="Hero Banner"
                    className="w-48 h-28 object-cover rounded-xl border border-studio-gold/30 shadow-md"
                  />
                  <div className="flex-grow space-y-2 w-full">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={heroImage}
                        onChange={(e) => updateHeroImage(e.target.value)}
                        className="flex-grow px-3 py-2.5 text-xs bg-studio-cream/40 border border-studio-gold/30 rounded-lg focus:outline-none focus:border-studio-gold font-mono"
                      />
                      <button
                        onClick={() => handleFileUpload((newUrl) => updateHeroImage(newUrl))}
                        className="px-4 py-2.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded-lg text-xs uppercase tracking-wider font-medium transition-colors flex items-center"
                      >
                        <Upload className="w-3.5 h-3.5 mr-1" /> Upload File
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Photographer Profile Image Editor */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-studio-charcoal">
                  About Page Photographer Profile Photo (Arisiva S)
                </label>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={aboutPhotographerImage}
                    alt="About Photographer Profile"
                    className="w-24 h-28 object-cover rounded-xl border border-studio-gold/30 shadow-md"
                  />
                  <div className="flex-grow space-y-2 w-full">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={aboutPhotographerImage}
                        onChange={(e) => updateAboutPhotographerImage(e.target.value)}
                        className="flex-grow px-3 py-2.5 text-xs bg-studio-cream/40 border border-studio-gold/30 rounded-lg focus:outline-none focus:border-studio-gold font-mono"
                      />
                      <button
                        onClick={() => handleFileUpload((newUrl) => updateAboutPhotographerImage(newUrl))}
                        className="px-4 py-2.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded-lg text-xs uppercase tracking-wider font-medium transition-colors flex items-center"
                      >
                        <Upload className="w-3.5 h-3.5 mr-1" /> Upload File
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Story Section Image Editor */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-studio-charcoal">
                  Homepage "Every Ceremony Has a Story" Feature Photo
                </label>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={homeStoryImage}
                    alt="Homepage Story Section Feature"
                    className="w-48 h-28 object-cover rounded-xl border border-studio-gold/30 shadow-md"
                  />
                  <div className="flex-grow space-y-2 w-full">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={homeStoryImage}
                        onChange={(e) => updateHomeStoryImage(e.target.value)}
                        className="flex-grow px-3 py-2.5 text-xs bg-studio-cream/40 border border-studio-gold/30 rounded-lg focus:outline-none focus:border-studio-gold font-mono"
                      />
                      <button
                        onClick={() => handleFileUpload((newUrl) => updateHomeStoryImage(newUrl))}
                        className="px-4 py-2.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded-lg text-xs uppercase tracking-wider font-medium transition-colors flex items-center"
                      >
                        <Upload className="w-3.5 h-3.5 mr-1" /> Upload File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Homepage Instagram Showcase Photos Editor */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-studio-charcoal">
                    Homepage "Follow Us on Instagram" 4-Photo Showcase Grid
                  </label>
                  <p className="text-xs text-studio-warmGray">
                    Upload custom images and customize titles for each of the 4 featured Instagram cards on the homepage.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(instagramImages || []).map((item) => (
                    <div key={item.id} className="bg-studio-cream/40 p-4 rounded-xl border border-studio-gold/20 space-y-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-studio-gold/30 shadow-xs flex-shrink-0"
                        />
                        <div className="flex-grow space-y-1">
                          <span className="text-[10px] font-bold text-studio-gold uppercase tracking-wider bg-studio-gold/10 px-2 py-0.5 rounded border border-studio-gold/20">
                            {item.category}
                          </span>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateInstagramImage(item.id, item.image, e.target.value, item.category)}
                            className="w-full px-2.5 py-1 text-xs font-bold text-studio-charcoal bg-white border border-studio-gold/30 rounded focus:outline-none focus:border-studio-gold"
                            placeholder="Card Title"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => updateInstagramImage(item.id, e.target.value, item.title, item.category)}
                          className="flex-grow px-2.5 py-1.5 text-[11px] bg-white border border-studio-gold/30 rounded focus:outline-none focus:border-studio-gold font-mono"
                          placeholder="Image URL"
                        />
                        <button
                          onClick={() => handleFileUpload((newUrl) => updateInstagramImage(item.id, newUrl, item.title, item.category))}
                          className="px-3 py-1.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded text-[10px] uppercase tracking-wider font-medium transition-colors flex items-center whitespace-nowrap"
                        >
                          <Upload className="w-3 h-3 mr-1" /> Replace
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcement Bar Toggle & Text */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-studio-charcoal">
                    Top Event Announcement Bar
                  </label>
                  <button
                    onClick={() => updateBanner(!bannerEnabled, bannerText)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                      bannerEnabled
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {bannerEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-studio-warmGray mb-1">
                    Announcement Bar Text
                  </label>
                  <textarea
                    rows={2}
                    value={bannerText}
                    onChange={(e) => updateBanner(bannerEnabled, e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-studio-cream/40 border border-studio-gold/30 rounded-lg focus:outline-none focus:border-studio-gold font-sans"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Direct Messages & Inquiries Inbox */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl border border-studio-gold/20 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-studio-charcoal">
                    📬 Incoming Direct Messages & Booking Inquiries
                  </h3>
                  <p className="text-xs text-studio-warmGray">
                    All submitted contact form messages and date availability requests are logged here in real time.
                  </p>
                </div>
                <span className="px-3 py-1 bg-studio-gold/10 text-studio-gold font-bold rounded-full text-xs border border-studio-gold/20">
                  {messages ? messages.length : 0} Messages Total
                </span>
              </div>
            </div>

            {(!messages || messages.length === 0) ? (
              <div className="bg-white p-12 rounded-2xl border border-studio-gold/20 text-center space-y-3">
                <Mail className="w-12 h-12 text-studio-gold/40 mx-auto stroke-[1.2]" />
                <h4 className="font-serif text-lg font-bold text-studio-charcoal">No Direct Messages Yet</h4>
                <p className="text-xs text-studio-warmGray max-w-sm mx-auto">
                  When visitors submit messages on the Contact or Booking page, they will instantly show up here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white p-6 rounded-2xl border border-studio-gold/20 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="w-9 h-9 bg-studio-charcoal text-studio-gold rounded-full flex items-center justify-center font-bold text-sm">
                          {msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                        <div>
                          <h4 className="font-serif text-base font-bold text-studio-charcoal">{msg.name}</h4>
                          <span className="text-[11px] text-studio-warmGray">{msg.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 bg-studio-gold/10 text-studio-gold text-[10px] font-bold uppercase rounded border border-studio-gold/20">
                          {msg.type || 'Direct Message'}
                        </span>
                        <button
                          onClick={() => {
                            deleteMessage(msg.id);
                            showToast('Message deleted');
                          }}
                          className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="bg-studio-cream/40 p-4 rounded-xl border border-studio-gold/10 text-xs text-studio-charcoal leading-relaxed whitespace-pre-wrap font-sans">
                      {msg.message}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                      {msg.phone && (
                        <a
                          href={`tel:${msg.phone}`}
                          className="flex items-center text-studio-charcoal hover:text-studio-gold font-medium"
                        >
                          <Phone className="w-3.5 h-3.5 mr-1 text-studio-gold" /> {msg.phone}
                        </a>
                      )}
                      {msg.phone && (
                        <a
                          href={`https://wa.me/91${msg.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-emerald-700 hover:text-emerald-600 font-semibold"
                        >
                          <MessageCircle className="w-3.5 h-3.5 mr-1" /> WhatsApp Reply
                        </a>
                      )}
                      {msg.email && (
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center text-studio-charcoal hover:text-studio-gold font-medium"
                        >
                          <Mail className="w-3.5 h-3.5 mr-1 text-studio-gold" /> {msg.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: JSON Export & Backup */}
        {activeTab === 'export' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-studio-gold/20 shadow-sm space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-studio-charcoal">
                  Configuration Backup & JSON Export
                </h3>
                <p className="text-xs text-studio-warmGray">
                  Export all custom gallery configurations to JSON for safe backup or transfer.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-studio-charcoal">
                    Exported Data JSON
                  </label>
                  <button
                    onClick={() => {
                      const json = exportConfigJson();
                      navigator.clipboard.writeText(json);
                      showToast('JSON copied to clipboard!');
                    }}
                    className="px-3 py-1.5 bg-studio-gold/20 text-studio-gold hover:bg-studio-gold hover:text-studio-charcoal rounded text-xs uppercase font-medium transition-colors flex items-center"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Copy JSON
                  </button>
                </div>

                <textarea
                  readOnly
                  rows={8}
                  value={exportConfigJson()}
                  className="w-full p-4 text-xs bg-gray-900 text-emerald-400 font-mono rounded-xl border border-studio-gold/30 shadow-inner focus:outline-none"
                />
              </div>

              {/* Import Section */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <h4 className="font-serif text-base font-bold text-studio-charcoal">
                  Import Configuration JSON
                </h4>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value);
                    setJsonError(false);
                  }}
                  placeholder="Paste JSON configuration string here..."
                  className={`w-full p-3 text-xs bg-studio-cream/40 border ${
                    jsonError ? 'border-red-500 bg-red-50/50' : 'border-studio-gold/30'
                  } rounded-xl focus:outline-none font-mono`}
                />
                {jsonError && (
                  <p className="text-xs text-red-600">Invalid JSON string structure.</p>
                )}
                <button
                  onClick={handleImportJson}
                  className="px-5 py-2.5 bg-studio-charcoal text-studio-cream hover:bg-studio-gold hover:text-studio-charcoal rounded-lg text-xs uppercase tracking-widest font-medium transition-all shadow-sm"
                >
                  Apply Imported JSON Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

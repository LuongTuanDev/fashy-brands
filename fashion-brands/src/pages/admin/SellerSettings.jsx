import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { Loader2, Camera, Sparkles } from "lucide-react";

export default function SellerSettings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("General");
  const [profile, setProfile] = useState({
    shop_name: "",
    bio: "",
    instagram: "",
    twitter: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const data = await authService.getMyProfile();
        if (data) {
          setProfile({
            shop_name: data.shop_name || "",
            bio: data.bio || "",
            instagram: data.instagram || "",
            twitter: data.twitter || ""
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await authService.updateProfile(profile);
      toast.success(t("settings.update_success"));
    } catch (error) {
      toast.error(t("settings.update_error", { error: error.message }));
    } finally {
      setSaving(false);
    }
  };

  const tabs = ["General", "Payouts", "Notifications"];

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Header />

      <div className="flex flex-1 pt-[68px] min-h-[calc(100vh-68px)]">
        <DashboardNavigationSidebarSection />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
            
            {/* Page Heading Section */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl text-[#e8e2d9] mb-3 [font-family:'Noto_Serif-Regular',Helvetica] italic">
                {t("settings.title")}
              </h2>
              <p className="text-[#ffffff50] text-sm font-light max-w-lg leading-relaxed [font-family:'Manrope-Regular',Helvetica]">
                {t("settings.subtitle")}
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-10 h-10 text-[#fac493] animate-spin" />
                <p className="text-[10px] tracking-[2px] text-[#ffffff40] uppercase">{t("settings.loading_profile")}</p>
              </div>
            ) : (
              <>
                {/* Tab Navigation */}
                <div className="flex gap-10 mb-12 border-b border-[#ffffff10]">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 border-b-2 text-[10px] uppercase tracking-[0.2rem] transition-all duration-300 [font-family:'Manrope-Bold',Helvetica]
                        ${activeTab === tab
                          ? "border-[#fac493] text-[#fac493]"
                          : "border-transparent text-[#ffffff40] hover:text-[#ffffff80]"
                        }`}
                    >
                      {t(`settings.${tab.toLowerCase()}`)}
                    </button>
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  {/* Left Column: Form */}
                  <div className="lg:col-span-7 space-y-12">
                    <section className="space-y-10">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-[#fac493]" />
                        <h3 className="text-2xl italic font-light text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
                          {t("settings.shop_identity")}
                        </h3>
                      </div>
                      
                      <div className="space-y-8">
                        <div className="flex flex-col gap-2 group">
                          <label className="text-[9px] uppercase tracking-widest text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica]">
                            {t("settings.shop_name")}
                          </label>
                          <input 
                            className="w-full bg-[#131313] border-b border-[#ffffff15] py-4 text-lg text-[#e8e2d9] outline-none focus:border-[#fac493] transition-colors [font-family:'Manrope-Regular',Helvetica]" 
                            type="text" 
                            value={profile.shop_name}
                            onChange={(e) => setProfile({...profile, shop_name: e.target.value})}
                          />
                        </div>
                        <div className="flex flex-col gap-2 group">
                          <label className="text-[9px] uppercase tracking-widest text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica]">
                            {t("settings.artisan_bio")}
                          </label>
                          <textarea 
                            className="w-full bg-[#131313] border-b border-[#ffffff15] py-4 text-[#e8e2d9] outline-none focus:border-[#fac493] transition-colors resize-none [font-family:'Manrope-Regular',Helvetica]" 
                            rows="4"
                            value={profile.bio}
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          />
                        </div>
                      </div>
                    </section>

                    <section className="space-y-10 pt-8 border-t border-[#ffffff10]">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-[#fac493]" />
                        <h3 className="text-2xl italic font-light text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
                          {t("settings.digital_connections")}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] uppercase tracking-widest text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica]">
                            Instagram
                          </label>
                          <input 
                            className="w-full bg-[#131313] border-b border-[#ffffff15] py-4 text-[#e8e2d9] outline-none focus:border-[#fac493] transition-colors [font-family:'Manrope-Regular',Helvetica]" 
                            type="text" 
                            value={profile.instagram}
                            onChange={(e) => setProfile({...profile, instagram: e.target.value})}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] uppercase tracking-widest text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica]">
                            Twitter / X
                          </label>
                          <input 
                            className="w-full bg-[#131313] border-b border-[#ffffff15] py-4 text-[#e8e2d9] outline-none focus:border-[#fac493] transition-colors [font-family:'Manrope-Regular',Helvetica]" 
                            type="text" 
                            value={profile.twitter}
                            onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                          />
                        </div>
                      </div>
                    </section>

                    <section className="space-y-10 pt-8 border-t border-[#ffffff10]">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-[#fac493]" />
                        <h3 className="text-2xl italic font-light text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
                          {t("settings.language")}
                        </h3>
                      </div>
                      <div className="flex gap-4">
                        {['en', 'vi'].map((lng) => (
                          <button 
                            key={lng}
                            onClick={() => changeLanguage(lng)}
                            className={`flex-1 py-4 border text-[10px] uppercase tracking-widest transition-all [font-family:'Manrope-Bold',Helvetica]
                              ${i18n.language === lng 
                                ? 'border-[#fac493] text-[#fac493] bg-[#fac49305]' 
                                : 'border-[#ffffff10] text-[#ffffff40] hover:border-[#ffffff30]'}`}
                          >
                            {lng === 'en' ? 'English' : 'Tiếng Việt'}
                          </button>
                        ))}
                      </div>
                    </section>

                    <div className="pt-12">
                      <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="group relative px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3rem] text-[#131313] overflow-hidden transition-all active:scale-95 disabled:opacity-50 [font-family:'Manrope-Bold',Helvetica]"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(162deg,#fac493_0%,#d8bbf6_100%)]" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {saving && <Loader2 className="w-3 h-3 animate-spin" />}
                          {saving ? "UPDATING..." : t("settings.save_changes").toUpperCase()}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visuals & Logo */}
                  <div className="lg:col-span-5 flex flex-col gap-12">
                    <div className="bg-[#1a1a1a] p-12 relative overflow-hidden group border border-[#ffffff10]">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#fac49305] -mr-16 -mt-16 blur-3xl rounded-full" />
                      <h4 className="text-[9px] uppercase tracking-widest text-[#ffffff40] mb-8 [font-family:'Manrope-Bold',Helvetica]">Fashy Brand Mark</h4>
                      <div className="relative w-48 h-48 mx-auto mb-10 group cursor-pointer">
                        <div className="absolute inset-0 border border-[#fac49320] scale-110 group-hover:scale-125 transition-transform duration-700" />
                        <img 
                          src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80" 
                          alt="Brand logo" 
                          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="text-[#fac493] w-10 h-10" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="italic text-lg text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">Radiant_Mark_V2.svg</p>
                        <p className="text-[9px] uppercase tracking-tighter text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica]">Recommended: 1024x1024px PNG or SVG</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-8 bg-[#1a1a1a] border-l-4 border-[#d8bbf640] relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                          <Sparkles className="text-[#fac493] w-5 h-5" />
                          <span className="text-[9px] text-[#fac493] uppercase tracking-widest [font-family:'Manrope-Bold',Helvetica]">
                            {t("settings.artisan_presence")}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-[#ffffff60] [font-family:'Manrope-Regular',Helvetica]">
                          {t("settings.visible_global")} {t("settings.profile_completion", { pct: 94 })}
                        </p>
                        <div className="mt-4 h-1 bg-[#ffffff05] rounded-full overflow-hidden">
                          <div className="h-full bg-[#fac493] w-[94%]" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 border border-[#ffffff10] hover:border-[#fac49340] transition-colors text-center">
                          <p className="text-[9px] uppercase tracking-widest text-[#ffffff40] mb-2 [font-family:'Manrope-Bold',Helvetica]">Followers</p>
                          <p className="text-2xl font-light text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">12.4k</p>
                        </div>
                        <div className="p-6 border border-[#ffffff10] hover:border-[#fac49340] transition-colors text-center">
                          <p className="text-[9px] uppercase tracking-widest text-[#ffffff40] mb-2 [font-family:'Manrope-Bold',Helvetica]">Total Sales</p>
                          <p className="text-2xl font-light text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">842</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

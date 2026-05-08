import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { useTranslation } from "react-i18next";

export default function AdminLayout({ children }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await authService.getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { name: t("admin.dashboard"), path: "/dashboard", icon: "dashboard" },
    { name: t("admin.products"), path: "/dashboard/products", icon: "inventory_2" },
    { name: t("admin.users"), path: "/dashboard/users", icon: "group" },
    { name: t("admin.orders"), path: "/dashboard/orders", icon: "shopping_bag" },
    { name: t("admin.collections"), path: "/dashboard/collections", icon: "diamond" },
    { name: t("admin.analytics"), path: "/dashboard/analytics", icon: "monitoring" },
  ];

  return (
    <div className="bg-background text-on-background flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface-container-low flex flex-col border-r border-outline-variant/10 flex-shrink-0">
        <div className="px-8 py-10">
          <Link to="/" className="text-3xl font-serif font-light tracking-[0.2em] text-primary">FASHY</Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 transition-colors group ${
                location.pathname === item.path
                  ? "bg-primary-container/10 text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: location.pathname === item.path ? "'FILL' 1" : "" }}>
                {item.icon}
              </span>
              <span className={`font-label uppercase tracking-widest text-xs ${location.pathname === item.path ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </Link>
          ))}
          
          <div className="pt-8 pb-4 px-4">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-outline">System</span>
          </div>
          <Link
            to="/dashboard/settings"
            className={`flex items-center gap-4 px-4 py-3 transition-colors group ${
              location.pathname === "/dashboard/settings"
                ? "bg-primary-container/10 text-primary"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label uppercase tracking-widest text-xs">{t("admin.settings")}</span>
          </Link>
        </nav>
        
        {/* User Profile / Logout */}
        <div className="p-4 bg-surface-container-lowest">
          <div className="flex items-center gap-3 p-3 hover:bg-surface-container-high transition-colors group cursor-pointer" onClick={handleLogout}>
            <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center rounded-full">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="material-symbols-outlined text-primary">account_circle</span>
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-on-surface group-hover:text-primary truncate">
                {profile?.full_name || "Admin User"}
              </span>
              <span className="text-[10px] text-outline uppercase tracking-tighter">{t("admin.logout")}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-surface relative">
        {/* Top Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-surface/60 px-12 py-6 flex justify-between items-center border-b border-outline-variant/5">
          <h1 className="text-2xl font-serif text-on-surface">
            {menuItems.find(item => item.path === location.pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
              <input 
                className="bg-surface-container-high border-none text-[10px] tracking-widest font-label pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-primary" 
                placeholder={t("admin.search")} 
                type="text"
              />
            </div>
            <button className="relative">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-tertiary transition-colors">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-tertiary rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="px-12 py-8 space-y-12 max-w-[1600px]">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="mt-12 px-12 py-12 bg-surface-container-low border-t border-outline-variant/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <span className="text-xl font-serif text-primary mb-2 block">FASHY CORE</span>
              <p className="font-label font-light text-[10px] tracking-wider text-outline">© 2024 THE DIGITAL FASHY. ALL RIGHTS RESERVED.</p>
            </div>
            <div className="flex gap-8">
              <a className="font-label font-light text-[10px] tracking-wider text-white/50 hover:text-tertiary transition-all uppercase" href="#">Support</a>
              <a className="font-label font-light text-[10px] tracking-wider text-white/50 hover:text-tertiary transition-all uppercase" href="#">Documentation</a>
              <a className="font-label font-light text-[10px] tracking-wider text-white/50 hover:text-tertiary transition-all uppercase" href="#">Changelog</a>
            </div>
          </div>
        </footer>
      </main>

      {/* FAB for Quick Actions */}
      <button className="fixed bottom-12 right-12 w-14 h-14 bg-primary text-on-primary flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:opacity-80 z-[60]">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </div>
  );
}

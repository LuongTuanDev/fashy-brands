import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, loading, refreshProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    const nameFromMetadata = user?.user_metadata?.full_name;
    setForm({
      name: profile?.full_name || nameFromMetadata || "",
      email: user?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || ""
    });
  }, [profile, user]);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    try {
      const updates = {
        full_name: form.name,
        phone: form.phone,
        address: form.address
      };

      await authService.updateProfile(updates);
      await refreshProfile();
      setEditMode(false);
      toast.success(t("profile.update_success"));
    } catch (error) {
      console.error("Update error:", error);
      toast.error(t("profile.update_error", { error: error.message }));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e]">
      <div className="w-8 h-8 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    navigate("/login");
    return null;
  }

  const avatarInitial = (profile?.full_name || user?.email || "U")[0].toUpperCase();
  const tabs = [
    { key: "profile", icon: User, label: t("profile.tabs.profile") },
    { key: "orders", icon: Package, label: t("profile.tabs.orders") },
    { key: "wishlist", icon: Heart, label: t("profile.tabs.wishlist") },
    { key: "settings", icon: Settings, label: t("profile.tabs.settings") }
  ];

  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="pt-[68px]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside>
              <div className="mb-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#c9a96e", color: "#1a1208" }}>
                  <span className="font-serif text-xl font-semibold">{avatarInitial}</span>
                </div>
                <h2 className="text-lg font-serif text-[#e8e2d9]">{profile?.full_name || t("admin.customer")}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] tracking-[0.2em] uppercase bg-[#c9a96e]/10 text-[#c9a96e] px-2 py-0.5 border border-[#c9a96e]/30">
                    {profile?.role || "Customer"}
                  </span>
                </div>
                <p className="text-[9px] text-[#3a3830] tracking-wide mt-1">
                  {t("profile.member_since", { year: new Date(user?.created_at).getFullYear() })}
                </p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 text-xs tracking-[0.15em] uppercase transition-all text-left",
                      activeTab === tab.key ? "text-[#c9a96e] bg-[#c9a96e]/5 border-l border-[#c9a96e]" : "text-[#5a5248] hover:text-[#8a8070]"
                    )}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>;
                })}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-xs tracking-[0.15em] uppercase text-[#5a5248] hover:text-red-400 transition-colors mt-4"
                >
                  <LogOut size={14} />
                  {t("profile.logout")}
                </button>
              </nav>
            </aside>

            <div className="md:col-span-3">
              {activeTab === "profile" && <div>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-serif text-[#e8e2d9]">{t("profile.title")}</h2>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248] mt-1">{t("profile.subtitle")}</p>
                    </div>
                    <button
                      onClick={handleUpdateProfile}
                      className={cn(
                        "px-4 py-2 text-[10px] tracking-[0.2em] uppercase border transition-all",
                        editMode ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5" : "border-[#2a2820] text-[#5a5248] hover:border-[#3a3830]"
                      )}
                    >
                      {editMode ? t("profile.save") : t("profile.edit")}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { label: t("profile.full_name"), key: "name", value: form.name, placeholder: t("profile.placeholder_name") },
                      { label: t("profile.email"), key: "email", value: user?.email, placeholder: "" },
                      { label: t("profile.phone"), key: "phone", value: form.phone, placeholder: t("profile.placeholder_phone") },
                      { label: t("profile.address"), key: "address", value: form.address, placeholder: t("profile.placeholder_address") }
                    ].map((field) => (
                      <div key={field.key} className="border-b border-[#2a2820] pb-6">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248] mb-2">{field.label}</p>
                        {editMode && field.key !== 'email' ? (
                          <input
                            value={field.value || ""}
                            onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent border-b border-[#3a3830] focus:border-[#c9a96e] text-[#e8e2d9] text-sm py-1 outline-none transition-colors"
                          />
                        ) : (
                          <p className={cn("text-sm", !field.value && "text-[#3a3830] italic")}>
                            {field.value || (field.key === 'email' ? user?.email : t("profile.not_updated", { field: field.label.toLowerCase() }))}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border border-[#2a2820] p-6" style={{ backgroundColor: "#131210" }}>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248] mb-4">{t("profile.loyalty")}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-widest uppercase text-[#c9a96e]">{profile?.role || "Customer"}</span>
                      <span className="text-[10px] text-[#5a5248]">{t("profile.points", { count: 0 })}</span>
                    </div>
                    <div className="w-full bg-[#2a2820] h-0.5">
                      <div className="h-0.5 bg-[#c9a96e]" style={{ width: "81.67%" }} />
                    </div>
                    <p className="text-[9px] text-[#3a3830] mt-2 tracking-wide">{t("profile.next_tier", { count: 550 })}</p>
                  </div>
                </div>}

              {activeTab === "orders" && <div>
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-8">{t("profile.order_history")}</h2>
                  <div className="space-y-3">
                    {[
                      { id: "ATL-2024-001", date: "10 Jan 2025", total: "18,500,000", items: 3, status: "Delivered" },
                      { id: "ATL-2024-002", date: "22 Dec 2024", total: "32,000,000", items: 2, status: "Processing" }
                    ].map((order) => <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-[#2a2820] hover:border-[#3a3830] transition-colors cursor-pointer"
                      onClick={() => navigate("/order-history")}
                    >
                      <div>
                        <p className="text-xs text-[#e8e2d9] font-medium tracking-wide">{order.id}</p>
                        <p className="text-[10px] text-[#5a5248] mt-0.5">{order.date} · {order.items} {t("admin.products").toLowerCase()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-[#c9a96e]">{order.total} ₫</p>
                          <span className={cn(
                            "text-[9px] tracking-[0.2em] uppercase",
                            order.status === "Delivered" ? "text-green-500" : "text-[#c9a96e]"
                          )}>
                            {order.status}
                          </span>
                        </div>
                        <ChevronRight size={14} className="text-[#3a3830]" />
                      </div>
                    </div>)}
                  </div>
                </div>}

              {activeTab === "wishlist" && <div>
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-8">{t("profile.saved_pieces")}</h2>
                  <div className="flex flex-col items-center py-12 text-center">
                    <Heart size={32} className="text-[#2a2820] mb-4" />
                    <p className="text-sm text-[#5a5248]">{t("profile.wishlist_empty")}</p>
                    <button
                      onClick={() => navigate("/")}
                      className="mt-4 text-[10px] tracking-widest uppercase text-[#c9a96e] hover:underline"
                    >
                      {t("profile.explore_collection")}
                    </button>
                  </div>
                </div>}

              {activeTab === "settings" && <div>
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-8">{t("profile.preferences")}</h2>
                  <div className="space-y-4">
                    {[
                      { label: t("profile.newsletter"), sub: t("profile.newsletter_sub"), enabled: true },
                      { label: t("profile.order_notif"), sub: t("profile.order_notif_sub"), enabled: true },
                      { label: t("profile.exclusive_previews"), sub: t("profile.exclusive_previews_sub"), enabled: false }
                    ].map((setting) => <div key={setting.label} className="flex items-start justify-between p-4 border border-[#2a2820]">
                        <div>
                          <p className="text-xs text-[#e8e2d9] tracking-wide">{setting.label}</p>
                          <p className="text-[10px] text-[#5a5248] mt-0.5">{setting.sub}</p>
                        </div>
                        <div
                          className={cn(
                            "w-10 h-5 relative cursor-pointer flex-shrink-0 mt-0.5",
                            setting.enabled ? "bg-[#c9a96e]" : "bg-[#2a2820]"
                          )}
                        >
                          <div className={cn(
                            "absolute top-0.5 w-4 h-4 transition-all",
                            setting.enabled ? "right-0.5 bg-[#1a1208]" : "left-0.5 bg-[#3a3830]"
                          )} />
                        </div>
                      </div>)}
                  </div>

                  <div className="mt-8 pt-8 border-t border-[#2a2820]">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248] mb-4">{t("profile.danger_zone")}</p>
                    <button 
                      onClick={async () => {
                        if (window.confirm(t("profile.delete_confirm"))) {
                          try {
                            await authService.deleteAccount();
                            navigate("/login");
                            toast.success(t("profile.delete_account") + " thành công.");
                          } catch (error) {
                            console.error("Delete error:", error);
                            toast.error(t("profile.delete_account") + " thất bại.");
                          }
                        }
                      }}
                      className="text-[10px] tracking-[0.2em] uppercase text-red-700 hover:text-red-500 border border-red-900 px-4 py-2 hover:border-red-700 transition-colors"
                    >
                      {t("profile.delete_account")}
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}

export default ProfilePage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
const mockUser = {
  name: "Nguyen Van A",
  email: "client@atelier.vn",
  phone: "+84 901 234 567",
  tier: "Diamond Atelier",
  since: "2023",
  avatar: "NA"
};
function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: mockUser.name, email: mockUser.email, phone: mockUser.phone });
  const tabs = [
    { key: "profile", icon: User, label: "H\u1ED3 S\u01A1" },
    { key: "orders", icon: Package, label: "\u0110\u01A1n H\xE0ng" },
    { key: "wishlist", icon: Heart, label: "Y\xEAu Th\xEDch" },
    { key: "settings", icon: Settings, label: "C\xE0i \u0110\u1EB7t" }
  ];
  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="pt-[68px]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside>
              <div className="mb-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#c9a96e", color: "#1a1208" }}>
                  <span className="font-serif text-xl font-semibold">{mockUser.avatar}</span>
                </div>
                <h2 className="text-lg font-serif text-[#e8e2d9]">{mockUser.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] tracking-[0.2em] uppercase bg-[#c9a96e]/10 text-[#c9a96e] px-2 py-0.5 border border-[#c9a96e]/30">
                    {mockUser.tier}
                  </span>
                </div>
                <p className="text-[9px] text-[#3a3830] tracking-wide mt-1">Member Since {mockUser.since}</p>
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
    onClick={() => navigate("/login")}
    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs tracking-[0.15em] uppercase text-[#5a5248] hover:text-red-400 transition-colors mt-4"
  >
                  <LogOut size={14} />
                  Đăng Xuất
                </button>
              </nav>
            </aside>

            <div className="md:col-span-3">
              {activeTab === "profile" && <div>
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-serif text-[#e8e2d9]">Personal Details</h2>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248] mt-1">Account Information</p>
                    </div>
                    <button
    onClick={() => setEditMode(!editMode)}
    className={cn(
      "px-4 py-2 text-[10px] tracking-[0.2em] uppercase border transition-all",
      editMode ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5" : "border-[#2a2820] text-[#5a5248] hover:border-[#3a3830]"
    )}
  >
                      {editMode ? "Save" : "Edit"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {[
    { label: "Full Name", key: "name", value: form.name },
    { label: "Email Address", key: "email", value: form.email },
    { label: "Phone", key: "phone", value: form.phone }
  ].map((field) => <div key={field.key} className="border-b border-[#2a2820] pb-6">
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248] mb-2">{field.label}</p>
                        {editMode ? <input
    value={field.value}
    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
    className="w-full bg-transparent border-b border-[#3a3830] focus:border-[#c9a96e] text-[#e8e2d9] text-sm py-1 outline-none transition-colors"
  /> : <p className="text-sm text-[#e8e2d9]">{field.value}</p>}
                      </div>)}
                  </div>

                  <div className="mt-8 border border-[#2a2820] p-6" style={{ backgroundColor: "#131210" }}>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248] mb-4">Loyalty Status</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] tracking-widest uppercase text-[#c9a96e]">{mockUser.tier}</span>
                      <span className="text-[10px] text-[#5a5248]">2,450 / 3,000 points</span>
                    </div>
                    <div className="w-full bg-[#2a2820] h-0.5">
                      <div className="h-0.5 bg-[#c9a96e]" style={{ width: "81.67%" }} />
                    </div>
                    <p className="text-[9px] text-[#3a3830] mt-2 tracking-wide">550 points to the next tier</p>
                  </div>
                </div>}

              {activeTab === "orders" && <div>
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-8">Order History</h2>
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
                          <p className="text-[10px] text-[#5a5248] mt-0.5">{order.date} · {order.items} items</p>
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
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-8">Saved Pieces</h2>
                  <div className="flex flex-col items-center py-12 text-center">
                    <Heart size={32} className="text-[#2a2820] mb-4" />
                    <p className="text-sm text-[#5a5248]">Danh sách yêu thích trống</p>
                    <button
    onClick={() => navigate("/")}
    className="mt-4 text-[10px] tracking-widest uppercase text-[#c9a96e] hover:underline"
  >
                      Khám phá bộ sưu tập
                    </button>
                  </div>
                </div>}

              {activeTab === "settings" && <div>
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-8">Preferences</h2>
                  <div className="space-y-4">
                    {[
    { label: "Newsletter", sub: "Nh\u1EADn c\u1EADp nh\u1EADt v\u1EC1 b\u1ED9 s\u01B0u t\u1EADp m\u1EDBi", enabled: true },
    { label: "Order Notifications", sub: "Th\xF4ng b\xE1o v\u1EC1 t\xECnh tr\u1EA1ng \u0111\u01A1n h\xE0ng", enabled: true },
    { label: "Exclusive Previews", sub: "Truy c\u1EADp s\u1EDBm v\xE0o c\xE1c b\u1ED9 s\u01B0u t\u1EADp VIP", enabled: false }
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
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248] mb-4">Danger Zone</p>
                    <button className="text-[10px] tracking-[0.2em] uppercase text-red-700 hover:text-red-500 border border-red-900 px-4 py-2 hover:border-red-700 transition-colors">
                      Delete Account
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
export {
  ProfilePage as default
};

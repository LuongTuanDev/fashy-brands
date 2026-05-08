import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Search, Loader2, Trash2 } from "lucide-react";

export default function UserManagement() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(t("admin.no_data"));
    } finally {
      setLoading(false);
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole);
      toast.success(t("admin.save_success"));
      fetchUsers();
    } catch (error) {
      toast.error(t("admin.save_error"));
    }
  };

  const filtered = users.filter(u => 
    (u.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.shop_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Header />

      <div className="flex flex-1 pt-[68px] min-h-[calc(100vh-68px)]">
        <DashboardNavigationSidebarSection />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] italic mb-2">
                  {t("admin.customers")}
                </h2>
                <p className="text-sm text-[#ffffff50] uppercase tracking-widest [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.manage_platform_access")}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#ffffff10] px-4 py-3 w-full md:w-80">
                <Search size={14} className="text-[#ffffff40]" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("admin.search") + "..."} 
                  className="bg-transparent border-none text-[11px] tracking-widest text-[#e8e2d9] outline-none w-full [font-family:'Manrope-Regular',Helvetica]"
                />
              </div>
            </div>

            <div className="bg-[#131313] border border-[#ffffff10] overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="border-b border-[#ffffff10] text-[9px] uppercase tracking-[2.5px] text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica]">
                  <tr>
                    <th className="px-8 py-6 font-normal">{t("admin.user")}</th>
                    <th className="px-8 py-6 font-normal">{t("admin.role")}</th>
                    <th className="px-8 py-6 font-normal">{t("admin.shop_name")}</th>
                    <th className="px-8 py-6 font-normal">{t("admin.status")}</th>
                    <th className="px-8 py-6 font-normal text-right">{t("admin.actions")}</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-24 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                          <Loader2 size={24} className="text-[#fac493] animate-spin" />
                          <span className="text-[9px] tracking-[2px] text-[#ffffff40] uppercase">{t("admin.loading")}</span>
                        </div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-24 text-center text-[#ffffff30] uppercase tracking-widest">{t("admin.no_data")}</td>
                    </tr>
                  ) : (
                    filtered.map((user) => (
                      <tr key={user.id} className="border-b border-[#ffffff05] hover:bg-[#ffffff04] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#2a2a2a] flex items-center justify-center text-[#fac493] font-bold border border-[#fac49320]">
                              {user.full_name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="font-bold text-[#e8e2d9] mb-0.5">{user.full_name || "Unknown User"}</p>
                              <p className="text-[9px] text-[#ffffff40] tracking-wider uppercase">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <select 
                            value={user.role || 'client'} 
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="bg-transparent border-none text-[10px] uppercase font-bold tracking-widest text-[#fac493] focus:ring-0 cursor-pointer p-0 outline-none"
                          >
                            <option value="client" className="bg-[#1a1a1a]">Client</option>
                            <option value="seller" className="bg-[#1a1a1a]">Seller</option>
                            <option value="admin" className="bg-[#1a1a1a]">Admin</option>
                          </select>
                        </td>
                        <td className="px-8 py-6 italic text-[#ffffff60]">
                          {user.shop_name || "—"}
                        </td>
                        <td className="px-8 py-6">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7dd3a8]"></span>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[#7dd3a8]">{t("admin.active")}</span>
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-[#ffffff20] hover:text-[#ff6b6b] transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

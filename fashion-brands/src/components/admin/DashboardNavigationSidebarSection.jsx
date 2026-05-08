import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import icon3 from "../../assets/admin/icon-3.svg";
import icon4 from "../../assets/admin/icon-4.svg";
import icon5 from "../../assets/admin/icon-5.svg";
import icon10 from "../../assets/admin/icon-10.svg";
import icon11 from "../../assets/admin/icon-11.svg";
import icon12 from "../../assets/admin/icon-12.svg";
import icon13 from "../../assets/admin/icon-13.svg";
import icon14 from "../../assets/admin/icon-14.svg";

export const DashboardNavigationSidebarSection = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const mainNavItems = [
    { label: t("admin.collections"), icon: icon10, iconW: "w-[17px]", iconH: "h-[17px]", path: "/dashboard/collections" },
    { label: t("admin.inventory"), icon: icon11, iconW: "w-[17px]", iconH: "h-[17px]", path: "/dashboard/inventory" },
    { label: t("admin.total_products"), icon: icon12, iconW: "w-[16px]", iconH: "h-[17px]", path: "/dashboard/products" },
    { label: t("admin.orders"), icon: icon13, iconW: "w-[14px]", iconH: "h-[17px]", path: "/dashboard/orders" },
    { label: t("admin.customers"), icon: icon14, iconW: "w-[19px]", iconH: "h-[14px]", path: "/dashboard/customers" },
  ];

  const bottomNavItems = [
    { label: t("admin.settings"), icon: icon4, iconW: "w-[11px]", iconH: "h-[11px]", path: "/dashboard/settings" },
    { label: t("admin.logout"), icon: icon5, iconW: "w-[10px]", iconH: "h-[10px]", path: "/login" },
  ];

  return (
    <aside
      aria-label="Sidebar navigation"
      className="flex flex-col flex-shrink-0 w-[185px] sticky top-[68px] h-[calc(100vh-68px)] bg-[#131313] border-r border-[#ffffff1a] overflow-hidden"
    >
      {/* Logo + profile */}
      <div className="flex items-center gap-3 px-5 pt-8 pb-6">
        <div className="w-9 h-9 rounded-full border border-[#fac493] overflow-hidden flex-shrink-0 bg-[#2a2a2a]">
          <div className="w-full h-full bg-[url(/admin-profile.png)] bg-cover bg-center" />
        </div>
        <div className="min-w-0">
          <p className="text-[#fac493] text-[11px] font-bold tracking-[1px] leading-4 [font-family:'Noto_Serif-Bold',Helvetica] whitespace-nowrap">
            FASHY
          </p>
          <p className="text-[#ffffff80] text-[9px] tracking-[0.3px] leading-[14px] [font-family:'Manrope-Regular',Helvetica] whitespace-nowrap">
            {t("admin.forge_subtitle").toUpperCase().split(' ')[0]} SYSTEM
          </p>
        </div>
      </div>

      {/* Bảng điều khiển */}
      <div className="px-3 mb-2">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors relative overflow-hidden
            ${pathname === "/dashboard"
              ? "bg-[#fac493] text-[#131313]"
              : "bg-[#ffffff0d] text-[#ffffff80] hover:bg-[#ffffff15]"
            }`}
        >
          <div className="w-[19px] h-[17px] flex items-center justify-center flex-shrink-0">
            <img src={icon3} alt="" aria-hidden="true" className="w-[17px] h-[17px]" />
          </div>
          <span className={`text-[11px] tracking-[0.6px] leading-5 whitespace-nowrap [font-family:'Noto_Serif-Regular',Helvetica]`}>
            {t("admin.dashboard").toUpperCase()}
          </span>
        </button>
      </div>

      {/* Main nav */}
      <nav aria-label="Section navigation" className="flex flex-col gap-0.5 px-3 flex-1 overflow-y-auto">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors duration-150 relative
                ${isActive
                  ? "bg-[#ffffff0d]"
                  : "hover:bg-[#ffffff08]"
                }`}
            >
              <div className="w-[19px] h-[17px] flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt="" aria-hidden="true" className={`${item.iconW} ${item.iconH}`} />
              </div>
              <span className={`text-[11px] tracking-[0.6px] leading-5 whitespace-nowrap uppercase flex-1
                ${isActive
                  ? "text-[#fac493] font-bold [font-family:'Noto_Serif-Bold',Helvetica]"
                  : "text-[#ffffff80] [font-family:'Noto_Serif-Regular',Helvetica]"
                }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#fac493]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-6 border-t border-[#ffffff0d] flex flex-col gap-3">
        <button
          type="button"
          className="w-full py-3 flex items-center justify-center bg-[linear-gradient(162deg,#fac493_0%,#d8bbf6_100%)]"
        >
          <span className="text-[#131313] text-[10px] tracking-[2.5px] leading-5 whitespace-nowrap [font-family:'Manrope-Regular',Helvetica]">
            {t("admin.view_reports").toUpperCase()}
          </span>
        </button>

        <nav aria-label="Account actions" className="flex flex-col gap-0.5">
          {bottomNavItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-2 py-2 text-left hover:bg-[#ffffff08] transition-colors"
            >
              <div className="w-[19px] h-[17px] flex items-center justify-center flex-shrink-0">
                <img src={item.icon} alt="" aria-hidden="true" className={`${item.iconW} ${item.iconH}`} />
              </div>
              <span className="text-[#ffffff80] text-[9px] tracking-[2px] leading-[15px] whitespace-nowrap [font-family:'Manrope-Bold',Helvetica] uppercase">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
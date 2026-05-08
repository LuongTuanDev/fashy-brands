import icon  from "../../assets/admin/icon.svg";
import icon2 from "../../assets/admin/icon-2.svg";
import icon6 from "../../assets/admin/icon-6.svg";
import icon7 from "../../assets/admin/icon-7.svg";
import icon8 from "../../assets/admin/icon-8.svg";
import image  from "../../assets/admin/image.svg";
import { useTranslation } from "react-i18next";

/* ─── DATA ─────────────────────────────────────────── */
const growthBars = [
  { label: "12", pct: 42  },
  { label: "1",  pct: 63  },
  { label: "2",  pct: 58  },
  { label: "3",  pct: 89  },
  { label: "4",  pct: 74  },
  { label: "5",  pct: 100, highlight: true, valueLabel: "1.25B" },
];

/* ─── COMPONENT ─────────────────────────────────────── */
export const DashboardInsightsSection = () => {
  const { t } = useTranslation();

  const summaryCards = [
    {
      title: t("admin.monthly_revenue"),
      value: "1.250.000.000",
      suffix: "₫",
      change: "+12.5%",
      changeColor: "text-green-400",
      iconSrc: icon6,
      iconAlt: "Revenue",
      iconCls: "w-5 h-[15px]",
    },
    {
      title: t("admin.new_orders"),
      value: "342",
      suffix: "",
      change: "+5.2%",
      changeColor: "text-green-400",
      iconSrc: icon7,
      iconAlt: "Orders",
      iconCls: "w-[19px] h-5",
    },
    {
      title: t("admin.new_customers"),
      value: "1,890",
      suffix: "",
      change: "+8.1%",
      changeColor: "text-[#fac493]",
      iconSrc: icon8,
      iconAlt: "Customers",
      iconCls: "w-5 h-[15px]",
    },
  ];

  const activities = [
    { title: t("admin.new_orders") + " #8492", desc: "Nguyen Van A • 5m ago", amount: "24,500,000₫", active: true },
    { title: t("admin.new_customers"), desc: "Le Thi B • 24m ago", amount: "", active: false },
    { title: t("admin.inventory") + ": " + t("admin.stock_updated"), desc: "Silk Scarf Neo-Luxe • 1h ago", amount: "", active: false },
    { title: t("admin.payment_completed"), desc: "Order #8488 • 3h ago", amount: "", active: false },
  ];

  const collectionItems = [
    { title: t("admin.evening_wear") || "TRANG PHỤC DẠ HỘI", subtitle: t("admin.new_pieces_this_week", { count: 12 }), iconSrc: icon },
    { title: t("admin.metallic_accessories") || "PHỤ KIỆN ÁNH KIM", subtitle: t("admin.low_stock_items", { count: 3 }), iconSrc: image },
    { title: t("admin.gemstone_jewelry") || "TRANG SỨC ĐÁ QUÝ", subtitle: t("admin.sales_performance", { pct: "+18%" }), iconSrc: icon2 },
  ];

  return (
    <section aria-label="System Dashboard Overview" className="w-full flex flex-col">

      {/* ══ HEADER ══════════════════════════════════════ */}
      <header className="flex flex-wrap items-end justify-between gap-4 pt-10 pb-0 w-full">
        <div className="flex flex-col gap-2">
          <p className="text-[#fac493] text-[10px] tracking-[2px] leading-6 [font-family:'Manrope-Regular',Helvetica]">
            {t("admin.system_overview")}
          </p>
          <h1 className="text-white text-5xl tracking-[-1px] leading-[56px] [font-family:'Noto_Serif-Regular',Helvetica] whitespace-nowrap">
            {t("admin.dashboard")}
          </h1>
        </div>

        <div className="flex items-center gap-4 pb-1 flex-shrink-0">
          <button
            type="button"
            className="all-[unset] box-border px-4 py-2 border-b border-[#fac493] cursor-pointer"
          >
            <span className="text-[#fac493] text-[11px] tracking-[0.5px] leading-6 whitespace-nowrap [font-family:'Manrope-Regular',Helvetica]">
              {t("admin.manage_users")}
            </span>
          </button>
          <div className="w-px h-8 bg-[#ffffff1a]" />
          <div className="flex flex-col items-end">
            <span className="text-[#ffffff66] text-[9px] tracking-[1px] leading-[14px] whitespace-nowrap [font-family:'Manrope-Regular',Helvetica]">
              {t("admin.last_update")}
            </span>
            <time
              dateTime="2024-05-24T12:45:00"
              className="text-[#fac493] text-[11px] tracking-[0] leading-4 whitespace-nowrap [font-family:'Manrope-Regular',Helvetica]"
            >
              12:45 PM, 24 May, 2024
            </time>
          </div>
        </div>
      </header>

      {/* ══ SUMMARY CARDS ═══════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full">
        {summaryCards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col justify-between gap-6 p-6 bg-[#2a2a2a66] border border-[#ffffff0d] backdrop-blur-[10px] min-h-[160px]"
          >
            <div className="flex items-start justify-between w-full">
              <img src={card.iconSrc} alt={card.iconAlt} className={card.iconCls} />
              <span className={`text-[10px] font-bold leading-[15px] whitespace-nowrap [font-family:'Manrope-Bold',Helvetica] ${card.changeColor}`}>
                {card.change}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#ffffff66] text-[10px] tracking-[2px] leading-[15px] [font-family:'Manrope-Regular',Helvetica]">
                {card.title}
              </span>
              <div className="flex items-end gap-1">
                <span className="text-white text-[clamp(20px,3vw,32px)] tracking-[-0.9px] leading-10 [font-family:'Noto_Serif-Regular',Helvetica] break-all">
                  {card.value}
                </span>
                {card.suffix && (
                  <span className="text-white text-lg tracking-[-0.9px] leading-7 opacity-50 [font-family:'Noto_Serif-Regular',Helvetica]">
                    {card.suffix}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ══ CHART + ACTIVITY ════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mt-5 w-full">

        {/* Growth chart */}
        <section className="flex flex-col p-8 bg-[#2a2a2a66] border border-[#ffffff0d] backdrop-blur-[10px] min-w-0">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
            <h2 className="text-[#e5e2e1] text-base tracking-[1.8px] leading-7 [font-family:'Noto_Serif-Regular',Helvetica] whitespace-nowrap">
              {t("admin.growth_trends")}
            </h2>
            <div className="flex items-center gap-4">
              <button type="button" className="text-[#fac493] text-[10px] font-bold tracking-[1px] leading-[15px] whitespace-nowrap [font-family:'Manrope-Bold',Helvetica] cursor-pointer">
                {t("admin.past_6_months")}
              </button>
              <button type="button" className="text-[#ffffff4c] text-[10px] font-bold tracking-[1px] leading-[15px] whitespace-nowrap [font-family:'Manrope-Bold',Helvetica] cursor-pointer">
                {t("admin.this_year")}
              </button>
            </div>
          </div>

          <div className="flex items-end gap-3 pb-5 border-b border-[#ffffff0d] h-[200px]">
            {growthBars.map((bar) => (
              <div key={bar.label} className="relative flex-1 flex flex-col justify-end h-full">
                {bar.highlight && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#fac493] text-[10px] font-bold whitespace-nowrap [font-family:'Manrope-Bold',Helvetica]">
                    {bar.valueLabel}
                  </span>
                )}
                <div
                  className={bar.highlight
                    ? "w-full bg-[linear-gradient(131deg,#fac493_0%,#d8bbf6_100%)]"
                    : "w-full bg-[#ffffff0d]"
                  }
                  style={{ height: `${bar.pct}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-3">
            {growthBars.map((bar) => (
              <div key={bar.label} className="flex-1 flex justify-center">
                <span className="text-[#ffffff4c] text-[10px] font-bold tracking-[1px] [font-family:'Manrope-Bold',Helvetica]">
                  {t("common.month_abbr") || "M"}{bar.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Activity */}
        <aside className="flex flex-col p-8 bg-[#2a2a2a66] border border-[#ffffff0d] backdrop-blur-[10px] lg:w-[240px] flex-shrink-0">
          <h2 className="text-[#e5e2e1] text-base tracking-[1.8px] leading-7 mb-8 [font-family:'Noto_Serif-Regular',Helvetica]">
            {t("admin.recent_activity")}
          </h2>

          <div className="flex flex-col gap-6 flex-1">
            {activities.map((a, idx) => (
              <article
                key={idx}
                className={`relative flex items-start pl-4 border-l ${a.active ? "border-[#fac4934c]" : "border-[#ffffff1a]"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-1 top-1 w-2 h-2 rounded-full ${a.active ? "bg-[#fac493] shadow-[0_0_8px_#fac493]" : "bg-[#ffffff33]"}`}
                />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-white text-[11px] font-bold tracking-[-0.3px] leading-4 [font-family:'Manrope-Bold',Helvetica]">
                    {a.title}
                  </p>
                  <p className="text-[#ffffff66] text-[10px] leading-[15px] [font-family:'Manrope-Regular',Helvetica]">
                    {a.desc}
                  </p>
                  {a.amount && (
                    <p className="text-[#fac493] text-[10px] font-bold leading-[15px] pt-0.5 [font-family:'Manrope-Bold',Helvetica]">
                      {a.amount}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="pt-6">
            <button
              type="button"
              className="all-[unset] box-border w-full py-4 flex items-center justify-center border border-[#ffffff1a] cursor-pointer"
            >
              <span className="text-[#ffffff80] text-[10px] font-bold tracking-[3px] [font-family:'Manrope-Bold',Helvetica]">
                {t("admin.view_all_activity")}
              </span>
            </button>
          </div>
        </aside>
      </div>

      <div className="flex justify-center py-10" aria-hidden="true">
        <div className="w-px h-24 opacity-30 bg-[linear-gradient(180deg,#fac493_0%,transparent_100%)] rotate-180" />
      </div>

      {/* ══ COLLECTION MANAGEMENT ═══════════════════════ */}
      <section aria-label="Collection Management" className="flex flex-col md:flex-row gap-4 pb-12 w-full">

        <article className="relative flex-1 min-h-[340px] overflow-hidden min-w-0">
          <div className="absolute inset-0 bg-[url(/collection-management.png)] bg-cover bg-center bg-[#1c1c1c]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(19,19,19,1)_0%,rgba(19,19,19,0)_55%)]" />
          <div className="absolute left-6 bottom-6 flex flex-col gap-1.5">
            <span className="text-[#fac493] text-sm leading-6 [font-family:'Manrope-Regular',Helvetica]">
              {t("admin.collection_mgmt")}
            </span>
            <h2 className="text-white text-2xl leading-8 [font-family:'Noto_Serif-Regular',Helvetica]">
              Neo-Luxe Autumn Winter 2024
            </h2>
            <p className="text-[#ffffff80] text-[10px] tracking-[1px] leading-[15px] [font-family:'Manrope-Regular',Helvetica]">
              84 {t("admin.products").toUpperCase()} • {t("admin.locked").toUpperCase()}
            </p>
          </div>
        </article>

        <div className="flex flex-col gap-3 md:w-[42%] flex-shrink-0">
          {collectionItems.map((item) => (
            <button
              key={item.title}
              type="button"
              className="all-[unset] box-border flex items-center justify-between px-5 py-7 w-full bg-[#2a2a2a66] border border-[#ffffff0d] backdrop-blur-[10px] cursor-pointer hover:bg-[#2a2a2a99] transition-colors"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-white text-sm tracking-[0.8px] leading-6 whitespace-nowrap [font-family:'Noto_Serif-Regular',Helvetica]">
                  {item.title}
                </span>
                <span className="text-[#ffffff66] text-[10px] leading-[15px] whitespace-nowrap [font-family:'Manrope-Regular',Helvetica]">
                  {item.subtitle}
                </span>
              </div>
              <img src={item.iconSrc} alt="" aria-hidden="true" className="w-[7px] h-3 ml-3 flex-shrink-0" />
            </button>
          ))}
        </div>
      </section>

    </section>
  );
};

import { Search, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const InventoryFilters = ({ search, setSearch, category, setCategory, status, setStatus }) => {
  const { t } = useTranslation();

  const categories = [
    { value: "ALL", label: t("admin.all_categories") },
    { value: "APPAREL", label: t("admin.apparel") },
    { value: "JEWELRY", label: t("admin.jewelry") },
    { value: "ACCESSORIES", label: t("admin.accessories") }
  ];

  const statuses = [
    { value: "ALL", label: t("admin.inventory_status") },
    { value: "IN_STOCK", label: t("admin.in_stock") },
    { value: "LOW_STOCK", label: t("admin.low_stock") },
    { value: "OUT_OF_STOCK", label: t("admin.out_of_stock") }
  ];

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Search */}
      <div className="flex items-center gap-2 flex-1 bg-[#1a1a1a] border border-[#ffffff15] px-4 py-2.5">
        <Search size={13} className="text-[#ffffff40] flex-shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("admin.search_products_sku") || "TÌM KIẾM SẢN PHẨM HOẶC SKU..."}
          className="flex-1 bg-transparent text-[11px] tracking-[1px] text-[#e8e2d9] placeholder:text-[#ffffff30] outline-none [font-family:'Manrope-Regular',Helvetica]"
        />
      </div>

      {/* Category filter */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="appearance-none bg-[#1a1a1a] border border-[#ffffff15] text-[#ffffff60] text-[10px] tracking-[1px] px-4 pr-8 py-2.5 outline-none cursor-pointer [font-family:'Manrope-Regular',Helvetica] hover:border-[#ffffff30] transition-colors"
        >
          {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none" />
      </div>

      {/* Status filter */}
      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="appearance-none bg-[#1a1a1a] border border-[#ffffff15] text-[#ffffff60] text-[10px] tracking-[1px] px-4 pr-8 py-2.5 outline-none cursor-pointer [font-family:'Manrope-Regular',Helvetica] hover:border-[#ffffff30] transition-colors"
        >
          {statuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none" />
      </div>
    </div>
  );
};

export default InventoryFilters;
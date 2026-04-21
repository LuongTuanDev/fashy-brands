import * as Slider from "@radix-ui/react-slider";
import { categoryMeta } from "@/data/products";
import { cn, formatVND } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
const SIZES = ["XS", "S", "M", "L", "XL"];
function FilterSidebar({ category, filters, onChange, onApply, collections, subcategories }) {
  const meta = categoryMeta[category];
  const [openSections, setOpenSections] = useState({
    type: true,
    size: true,
    price: true,
    collection: true,
    subcat: true
  });
  const toggleSection = (key) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };
  const toggleSize = (size) => {
    const next = filters.sizes.includes(size) ? filters.sizes.filter((s) => s !== size) : [...filters.sizes, size];
    onChange({ ...filters, sizes: next });
  };
  const toggleCollection = (col) => {
    const next = filters.collections.includes(col) ? filters.collections.filter((c) => c !== col) : [...filters.collections, col];
    onChange({ ...filters, collections: next });
  };
  const toggleSubcat = (sc) => {
    const next = filters.subcategories.includes(sc) ? filters.subcategories.filter((c) => c !== sc) : [...filters.subcategories, sc];
    onChange({ ...filters, subcategories: next });
  };
  const SectionHeader = ({ label, sectionKey }) => <button
    onClick={() => toggleSection(sectionKey)}
    className="flex justify-between items-center w-full py-3 text-[10px] tracking-[0.2em] uppercase text-[#8a8070] font-medium"
  >
      {label}
      {openSections[sectionKey] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
    </button>;
  return <aside className="w-full">
      <p className="text-[9px] tracking-[0.3em] uppercase text-[#5a5248] mb-1">BỘ LỌC</p>
      <p className="text-[9px] tracking-[0.2em] uppercase text-[#3a3830] mb-6">FILTER SELECTION</p>

      <div className="border-t border-[#2a2820]">
        <SectionHeader label="Phân Loại" sectionKey="type" />
        {openSections.type && <div className="space-y-1 pb-4">
            {[
    { value: "all", label: "T\u1EA5t C\u1EA3 S\u1EA3n Ph\u1EA9m", icon: "\u229E" },
    { value: "new", label: "M\u1EDBi V\u1EC1", icon: "\u2191" },
    { value: "bestseller", label: "B\xE1n Ch\u1EA1y", icon: "\u2B06" },
    { value: "collection", label: "B\u1ED9 S\u01B0u T\u1EADp", icon: "\u25C8" }
  ].map((opt) => <button
    key={opt.value}
    onClick={() => onChange({ ...filters, filterType: opt.value })}
    className={cn(
      "w-full text-left flex items-center gap-2 py-1.5 px-2 text-xs transition-colors",
      filters.filterType === opt.value ? "bg-[#c9a96e]/10 text-[#c9a96e] font-medium" : "text-[#5a5248] hover:text-[#8a8070]"
    )}
  >
                <span className="text-[10px]">{opt.icon}</span>
                {opt.label}
              </button>)}
          </div>}
      </div>

      {category === "apparel" && <div className="border-t border-[#2a2820]">
          <SectionHeader label="Kích Thước" sectionKey="size" />
          {openSections.size && <div className="flex flex-wrap gap-2 pb-4">
              {SIZES.map((size) => <button
    key={size}
    onClick={() => toggleSize(size)}
    className={cn(
      "px-3 py-1.5 text-[10px] tracking-wider uppercase border transition-all",
      filters.sizes.includes(size) ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10" : "border-[#2a2820] text-[#5a5248] hover:border-[#3a3830]"
    )}
  >
                  {size}
                </button>)}
            </div>}
        </div>}

      <div className="border-t border-[#2a2820]">
        <SectionHeader label="Mức Giá" sectionKey="price" />
        {openSections.price && <div className="pb-6">
            <Slider.Root
    className="relative flex items-center select-none touch-none w-full h-5 mb-3"
    value={filters.priceRange}
    onValueChange={([min, max]) => onChange({ ...filters, priceRange: [min, max] })}
    min={0}
    max={meta.priceMax}
    step={Math.round(meta.priceMax / 100)}
  >
              <Slider.Track className="bg-[#2a2820] relative grow rounded-full h-0.5">
                <Slider.Range className="absolute bg-[#c9a96e] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-[#c9a96e] rounded-full shadow-lg outline-none cursor-grab active:cursor-grabbing border-2 border-[#0e0e0e]" />
              <Slider.Thumb className="block w-4 h-4 bg-[#c9a96e] rounded-full shadow-lg outline-none cursor-grab active:cursor-grabbing border-2 border-[#0e0e0e]" />
            </Slider.Root>
            <div className="flex justify-between text-[9px] text-[#5a5248] tracking-wide">
              <span>{formatVND(filters.priceRange[0])}</span>
              <span>{formatVND(filters.priceRange[1])}</span>
            </div>
          </div>}
      </div>

      {collections.length > 0 && <div className="border-t border-[#2a2820]">
          <SectionHeader label="Bộ Sưu Tập" sectionKey="collection" />
          {openSections.collection && <div className="space-y-2 pb-4">
              {collections.map((col) => <label key={col} className="flex items-center gap-2 cursor-pointer group">
                  <span
    onClick={() => toggleCollection(col)}
    className={cn("custom-checkbox", filters.collections.includes(col) && "checked")}
  >
                    {filters.collections.includes(col) && <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3l2 2 4-4" stroke="#1a1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>}
                  </span>
                  <span
    onClick={() => toggleCollection(col)}
    className={cn("text-xs transition-colors", filters.collections.includes(col) ? "text-[#c9a96e]" : "text-[#5a5248] group-hover:text-[#8a8070]")}
  >
                    {col}
                  </span>
                </label>)}
            </div>}
        </div>}

      {subcategories && subcategories.length > 0 && <div className="border-t border-[#2a2820]">
          <SectionHeader label="Loại Phụ Kiện" sectionKey="subcat" />
          {openSections.subcat && <div className="space-y-2 pb-4">
              {subcategories.map((sc) => <label key={sc} className="flex items-center gap-2 cursor-pointer group">
                  <span
    onClick={() => toggleSubcat(sc)}
    className={cn("custom-checkbox", filters.subcategories.includes(sc) && "checked")}
  >
                    {filters.subcategories.includes(sc) && <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3l2 2 4-4" stroke="#1a1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>}
                  </span>
                  <span
    onClick={() => toggleSubcat(sc)}
    className={cn("text-xs transition-colors", filters.subcategories.includes(sc) ? "text-[#c9a96e]" : "text-[#5a5248] group-hover:text-[#8a8070]")}
  >
                    {sc}
                  </span>
                </label>)}
            </div>}
        </div>}

      <button
    onClick={onApply}
    className="btn-gold w-full mt-6 py-3.5 text-[10px] tracking-[0.3em] uppercase"
  >
        APPLY FILTERS
      </button>
    </aside>;
}
export {
  FilterSidebar as default
};

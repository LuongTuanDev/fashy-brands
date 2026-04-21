import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/common/FilterSidebar";
import ProductCard from "@/components/common/ProductCard";
import { categoryMeta, collections as allCollections, accessorySubcategories, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";
const SORT_OPTIONS = [
  { value: "newest", label: "M\u1EDBi Nh\u1EA5t" },
  { value: "price-asc", label: "Gi\xE1 T\u0103ng D\u1EA7n" },
  { value: "price-desc", label: "Gi\xE1 Gi\u1EA3m D\u1EA7n" },
  { value: "popular", label: "Ph\u1ED5 Bi\u1EBFn" }
];
const PAGE_SIZE = 8;
function CategoryPage({ category }) {
  const meta = categoryMeta[category];
  const catCollections = allCollections[category] || [];
  const catSubcats = category === "accessories" ? accessorySubcategories : [];
  const [filters, setFilters] = useState({
    filterType: "all",
    sizes: [],
    priceRange: [0, meta.priceMax],
    collections: [],
    subcategories: []
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const allProducts = getProductsByCategory(category);
  const filtered = useMemo(() => {
    let prods = [...allProducts];
    if (appliedFilters.filterType === "new") prods = prods.filter((p) => p.isNew);
    else if (appliedFilters.filterType === "bestseller") prods = prods.filter((p) => p.isBestseller);
    else if (appliedFilters.filterType === "collection") prods = prods.filter((p) => !!p.collection);
    if (appliedFilters.sizes.length > 0) {
      prods = prods.filter((p) => p.sizes && p.sizes.some((s) => appliedFilters.sizes.includes(s)));
    }
    prods = prods.filter((p) => p.price >= appliedFilters.priceRange[0] && p.price <= appliedFilters.priceRange[1]);
    if (appliedFilters.collections.length > 0) {
      prods = prods.filter((p) => p.collection && appliedFilters.collections.includes(p.collection));
    }
    if (appliedFilters.subcategories.length > 0) {
      prods = prods.filter((p) => p.subcategory && appliedFilters.subcategories.includes(p.subcategory));
    }
    if (sort === "price-asc") prods.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") prods.sort((a, b) => b.price - a.price);
    else if (sort === "popular") prods.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    else prods.sort((a, b) => (a.isNew ? -1 : 0) - (b.isNew ? -1 : 0));
    return prods;
  }, [appliedFilters, sort, allProducts]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleApply = () => {
    setAppliedFilters(filters);
    setPage(1);
  };
  const handleSort = (value) => {
    setSort(value);
    setSortOpen(false);
    setPage(1);
  };
  const resetFilters = () => {
    const def = { filterType: "all", sizes: [], priceRange: [0, meta.priceMax], collections: [], subcategories: [] };
    setFilters(def);
    setAppliedFilters(def);
  };
  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="pt-[68px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex gap-10 py-12">
            <aside className="w-[220px] flex-shrink-0 hidden md:block">
              <FilterSidebar
    category={category}
    filters={filters}
    onChange={setFilters}
    onApply={handleApply}
    collections={catCollections}
    subcategories={catSubcats}
  />
            </aside>

            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-serif mb-3 text-[#e8e2d9]">
                  {meta.title}{" "}
                  <span className="text-[#c9a96e] italic">{meta.titleAccent}</span>
                </h1>
                <p className="text-xs text-[#5a5248] leading-relaxed max-w-xl mb-6">{meta.subtitle}</p>

                <div className="flex items-center justify-between">
                  <button
    onClick={() => setMobileFilterOpen(true)}
    className="md:hidden text-[10px] tracking-[0.2em] uppercase text-[#5a5248] border border-[#2a2820] px-3 py-2"
  >
                    Bộ lọc
                  </button>
                  <p className="hidden md:block text-[10px] text-[#5a5248] tracking-wide">
                    {filtered.length} sản phẩm
                  </p>
                  <div className="flex items-center gap-3 ml-auto relative">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248]">Sắp Xếp</span>
                    <button
    onClick={() => setSortOpen((s) => !s)}
    className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#e8e2d9] border border-[#2a2820] px-3 py-2 hover:border-[#3a3830] transition-colors"
  >
                      {SORT_OPTIONS.find((s) => s.value === sort)?.label}
                      <ChevronDown size={12} className={cn("transition-transform", sortOpen && "rotate-180")} />
                    </button>
                    {sortOpen && <div className="absolute top-full right-0 mt-1 border border-[#2a2820] z-50 min-w-[160px] animate-slide-down" style={{ backgroundColor: "#1a1916" }}>
                        {SORT_OPTIONS.map((opt) => <button
    key={opt.value}
    onClick={() => handleSort(opt.value)}
    className={cn(
      "w-full text-left px-4 py-2.5 text-[10px] tracking-[0.15em] uppercase transition-colors",
      sort === opt.value ? "text-[#c9a96e] bg-[#c9a96e]/5" : "text-[#5a5248] hover:text-[#e8e2d9] hover:bg-[#1f1e1d]"
    )}
  >
                            {opt.label}
                          </button>)}
                      </div>}
                  </div>
                </div>
              </div>

              {paginated.length > 0 ? <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {paginated.map((product) => <ProductCard key={product.id} product={product} />)}
                </div> : <div className="flex flex-col items-center py-20 text-center">
                  <p className="text-[#3a3830] text-4xl mb-4">◈</p>
                  <p className="text-sm text-[#5a5248]">Không tìm thấy sản phẩm phù hợp</p>
                  <button
    onClick={resetFilters}
    className="mt-4 text-[10px] tracking-widest uppercase text-[#c9a96e] hover:underline"
  >
                    Xóa bộ lọc
                  </button>
                </div>}

              {totalPages > 1 && <div className="flex items-center justify-center gap-4 mt-16">
                  <button
    onClick={() => setPage((p) => Math.max(1, p - 1))}
    disabled={page === 1}
    className="text-[9px] tracking-[0.25em] uppercase text-[#5a5248] hover:text-[#c9a96e] disabled:opacity-30 transition-colors"
  >
                    Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => <button
    key={p}
    onClick={() => setPage(p)}
    className={cn(
      "w-7 h-7 text-[10px] transition-all",
      p === page ? "bg-[#c9a96e] text-[#1a1208] font-semibold" : "text-[#5a5248] hover:text-[#e8e2d9]"
    )}
  >
                      {p.toString().padStart(2, "0")}
                    </button>)}
                  <button
    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
    disabled={page === totalPages}
    className="text-[9px] tracking-[0.25em] uppercase text-[#5a5248] hover:text-[#c9a96e] disabled:opacity-30 transition-colors"
  >
                    Tiếp
                  </button>
                </div>}
            </div>
          </div>
        </div>
      </main>

      {mobileFilterOpen && <div className="fixed inset-0 z-[200] flex md:hidden">
          <div
    className="absolute inset-0"
    style={{ backgroundColor: "rgba(14,14,14,0.75)" }}
    onClick={() => setMobileFilterOpen(false)}
  />
          <div className="relative ml-auto w-80 border-l border-[#2a2820] p-6 overflow-y-auto" style={{ backgroundColor: "#0e0e0e" }}>
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs tracking-widest uppercase text-[#e8e2d9]">Bộ lọc</p>
              <button onClick={() => setMobileFilterOpen(false)} className="text-[#5a5248] hover:text-[#e8e2d9]">
                <span className="text-lg">✕</span>
              </button>
            </div>
            <FilterSidebar
    category={category}
    filters={filters}
    onChange={setFilters}
    onApply={() => {
      handleApply();
      setMobileFilterOpen(false);
    }}
    collections={catCollections}
    subcategories={catSubcats}
  />
          </div>
        </div>}

      <Footer />
    </div>;
}
export {
  CategoryPage as default
};

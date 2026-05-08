import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, X, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { productService } from "@/services/productService";
import { supabase } from "@/api/supabase";
import { toast } from "sonner";

const getStock = (p) =>
  p.product_variants?.length > 0
    ? p.product_variants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
    : (p.stock ?? 0);

const getStatusKey = (stock) => {
  if (stock === 0) return "out_of_stock";
  if (stock <= 5) return "low_stock";
  return "in_stock";
};

const StatusBadge = ({ stock }) => {
  const { t } = useTranslation();
  const statusKey = getStatusKey(stock);
  const styles = {
    "in_stock": "text-[#7dd3a8]",
    "low_stock": "text-[#fac493]",
    "out_of_stock": "text-[#ff6b6b]",
  };
  const dots = {
    "in_stock": "bg-[#7dd3a8]",
    "low_stock": "bg-[#fac493]",
    "out_of_stock": "bg-[#ff6b6b]",
  };
  return (
    <span className={`flex items-center gap-1.5 text-[10px] [font-family:'Manrope-Bold',Helvetica] ${styles[statusKey]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[statusKey]}`} />
      {t(`admin.${statusKey}`)}
    </span>
  );
};

// ── Modal xác nhận xóa ──────────────────────────────────────
const DeleteModal = ({ product, onClose, onConfirm, loading }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#161616] border border-[#ffffff15] w-full max-sm mx-4 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-[#ff6b6b] [font-family:'Noto_Serif-Regular',Helvetica]">{t("admin.confirm_delete_title")}</h2>
          <button onClick={onClose} className="text-[#ffffff40] hover:text-[#ffffff80] transition-colors">
            <X size={18} />
          </button>
        </div>
        <p className="text-[12px] text-[#ffffff70] leading-relaxed [font-family:'Manrope-Regular',Helvetica] mb-2">
          {t("admin.confirm_delete_text")}
        </p>
        <p className="text-[14px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-8">
          "{product.name}"
        </p>
        <p className="text-[10px] text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica] mb-8">
          {t("admin.confirm_delete_warn")}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#ffffff15] text-[10px] tracking-[2px] text-[#ffffff50] hover:text-[#ffffff80] hover:border-[#ffffff30] transition-colors [font-family:'Manrope-Regular',Helvetica]"
          >
            {t("admin.discard")}
          </button>
          <button
            onClick={() => onConfirm(product.id)}
            disabled={loading}
            className="flex-1 py-3 bg-[#ff6b6b20] border border-[#ff6b6b50] text-[#ff6b6b] text-[10px] tracking-[2px] hover:bg-[#ff6b6b30] transition-colors [font-family:'Manrope-Bold',Helvetica] flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={12} className="animate-spin" />}
            {t("admin.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

const ProductManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProducts();

    const productChannel = supabase
      .channel('admin-products-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchProducts();
      })
      .subscribe();

    const variantChannel = supabase
      .channel('admin-variants-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_variants' }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productChannel);
      supabase.removeChannel(variantChannel);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const data = await productService.getProductsBySeller(user.id);
      setProducts(data || []);
    } catch (err) {
      console.error(err);
      toast.error(t("admin.no_data"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(t("admin.delete_success") || "Xóa thành công");
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error(t("admin.delete_error") || "Lỗi khi xóa");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || `ATL-${p.id}`).toLowerCase().includes(search.toLowerCase());
    const matchCat =
      category === "ALL" || p.category?.toUpperCase() === category;
    const stock = getStock(p);
    const matchStatus =
      status === "ALL" || getStatusKey(stock).toUpperCase() === status;
    return matchSearch && matchCat && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setCategory("ALL");
    setStatus("ALL");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Header />

      {/* Modals */}
      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={deleteLoading}
        />
      )}

      <div className="grid flex-1 pt-[68px]" style={{ gridTemplateColumns: "185px 1fr" }}>
        <DashboardNavigationSidebarSection />

        <main>
          <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12">

            {/* Tiêu đề */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-4xl text-[#fac493] [font-family:'Noto_Serif-Regular',Helvetica] mb-2">
                  {t("admin.products")}
                </h1>
                <p className="text-[11px] tracking-[2px] text-[#ffffff40] uppercase [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.forge_subtitle")}
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboard/products/add")}
                className="flex items-center gap-2 px-5 py-3 border border-[#fac493] text-[#fac493] text-[10px] tracking-[2px] [font-family:'Manrope-Regular',Helvetica] hover:bg-[#fac49315] transition-colors mt-1"
              >
                <Plus size={12} /> {t("admin.add_product")}
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#ffffff10] px-5 py-4 mt-8 mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-[8px] tracking-[2px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica] uppercase">{t("admin.category")}</p>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                    className="appearance-none bg-transparent text-[11px] tracking-[1px] text-[#e8e2d9] pr-6 outline-none cursor-pointer [font-family:'Manrope-Regular',Helvetica]"
                  >
                    <option value="ALL" className="bg-[#1a1a1a]">{t("admin.all_categories")}</option>
                    <option value="APPAREL" className="bg-[#1a1a1a]">{t("admin.apparel")}</option>
                    <option value="JEWELRY" className="bg-[#1a1a1a]">{t("admin.jewelry")}</option>
                    <option value="ACCESSORIES" className="bg-[#1a1a1a]">{t("admin.accessories")}</option>
                  </select>
                  <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none" />
                </div>
              </div>
              <div className="w-px h-8 bg-[#ffffff15]" />
              <div className="flex flex-col gap-1">
                <p className="text-[8px] tracking-[2px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica] uppercase">{t("admin.status")}</p>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                    className="appearance-none bg-transparent text-[11px] tracking-[1px] text-[#e8e2d9] pr-6 outline-none cursor-pointer [font-family:'Manrope-Regular',Helvetica]"
                  >
                    <option value="ALL" className="bg-[#1a1a1a]">{t("admin.any_status")}</option>
                    <option value="IN_STOCK" className="bg-[#1a1a1a]">{t("admin.in_stock")}</option>
                    <option value="LOW_STOCK" className="bg-[#1a1a1a]">{t("admin.low_stock")}</option>
                    <option value="OUT_OF_STOCK" className="bg-[#1a1a1a]">{t("admin.out_of_stock")}</option>
                  </select>
                  <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none" />
                </div>
              </div>
              <div className="w-px h-8 bg-[#ffffff15]" />
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-[10px] tracking-[1px] text-[#ffffff40] hover:text-[#ffffff70] transition-colors [font-family:'Manrope-Regular',Helvetica]"
              >
                <X size={11} /> {t("admin.clear_filters")}
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#ffffff15] px-4 py-2.5 mb-6">
              <Search size={13} className="text-[#ffffff40]" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={t("admin.search_products")}
                className="flex-1 bg-transparent text-[11px] tracking-[1px] text-[#e8e2d9] placeholder:text-[#ffffff30] outline-none [font-family:'Manrope-Regular',Helvetica]"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-[#ffffff30] hover:text-[#ffffff60] transition-colors">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Table */}
            <div className="border border-[#ffffff10] relative min-h-[400px]">
              {loading && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <Loader2 className="w-8 h-8 text-[#fac493] animate-spin" />
                </div>
              )}

              <div className="flex items-center px-4 py-3 border-b border-[#ffffff10]">
                {[t("admin.product_name"), t("admin.category"), t("admin.price"), t("admin.status"), t("admin.actions")].map((col, i) => (
                  <div
                    key={i}
                    className={`text-[9px] tracking-[1.5px] text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica] uppercase
                      ${i === 0 ? "flex-1" : i === 1 ? "w-[20%]" : i === 2 ? "w-[18%]" : i === 3 ? "w-[15%]" : "w-[12%]"}`}
                  >
                    {col}
                  </div>
                ))}
              </div>

              {paginated.length === 0 && !loading ? (
                <div className="py-16 text-center text-[#ffffff30] text-sm [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.no_data")}
                </div>
              ) : (
                paginated.map((p) => {
                  const stock = getStock(p);
                  return (
                    <div
                      key={p.id}
                      className="flex items-center px-4 py-5 border-b border-[#ffffff08] hover:bg-[#ffffff04] transition-colors"
                    >
                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                          <img
                            src={p.image_url || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80"}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.src = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80"}
                          />
                        </div>
                        <div>
                          <p className="text-[12px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-0.5">{p.name}</p>
                          <p className="text-[9px] text-[#ffffff30] tracking-wider [font-family:'Manrope-Regular',Helvetica]">
                            SKU: {p.sku || `AT-${String(p.id).slice(0, 8).toUpperCase()}`}
                          </p>
                        </div>
                      </div>
                      <div className="w-[20%] text-[10px] text-[#ffffff50] tracking-wider uppercase [font-family:'Manrope-Regular',Helvetica]">
                        {t(`admin.${p.category?.toLowerCase()}`)}
                      </div>
                      <div className="w-[18%] text-[12px] text-[#fac493] [font-family:'Manrope-Regular',Helvetica]">
                        {p.price?.toLocaleString("vi-VN")} ₫
                      </div>
                      <div className="w-[15%]">
                        <StatusBadge stock={stock} />
                      </div>
                      <div className="w-[12%] flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/dashboard/products/edit/${p.id}`)}
                          className="text-[#ffffff30] hover:text-[#fac493] transition-colors p-1"
                          title={t("admin.edit")}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="text-[#ffffff30] hover:text-[#ff6b6b] transition-colors p-1"
                          title={t("admin.delete")}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-[10px] text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica]">
                {filtered.length} {t("admin.total_products").toUpperCase()}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#ffffff40] hover:text-[#fac493] border border-[#ffffff10] hover:border-[#fac49340] transition-colors text-xs"
                >‹</button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 flex items-center justify-center text-[10px] border transition-colors
                      ${page === n
                        ? "bg-[#fac493] text-[#131313] border-[#fac493] [font-family:'Manrope-Bold',Helvetica]"
                        : "text-[#ffffff40] border-[#ffffff10] hover:border-[#fac49340] hover:text-[#fac493] [font-family:'Manrope-Regular',Helvetica]"
                      }`}
                  >{n}</button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#ffffff40] hover:text-[#fac493] border border-[#ffffff10] hover:border-[#fac49340] transition-colors text-xs"
                >›</button>
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductManagement;
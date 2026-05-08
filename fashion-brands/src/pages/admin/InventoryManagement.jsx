import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import InventoryFilters from "@/components/admin/inventory/InventoryFilters";
import InventoryTable from "@/components/admin/inventory/InventoryTable";
import { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { useTranslation } from "react-i18next";
import { supabase } from "@/api/supabase";
import { Loader2 } from "lucide-react";

const InventoryManagement = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");
    const [status, setStatus] = useState("ALL");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchProducts();

        // Subscribe to changes
        const productChannel = supabase
            .channel('inventory-products')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
                fetchProducts();
            })
            .subscribe();
            
        const variantChannel = supabase
            .channel('inventory-variants')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'product_variants' }, () => {
                fetchProducts();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(productChannel);
            supabase.removeChannel(variantChannel);
        };
    }, []);

    async function fetchProducts() {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const data = await productService.getProductsBySeller(user.id);
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            setLoading(false);
        }
    }

    const getStock = (p) =>
        p.product_variants?.length > 0
            ? p.product_variants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
            : (p.stock ?? 0);

    const getStatusKey = (stock) => {
        if (stock === 0) return "OUT_OF_STOCK";
        if (stock <= 5) return "LOW_STOCK";
        return "IN_STOCK";
    };

    const filtered = products.filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.sku || "").toLowerCase().includes(search.toLowerCase());
        
        const matchCat =
            category === "ALL" || 
            p.category?.toUpperCase() === category.toUpperCase();
            
        const stock = getStock(p);
        const currentStatus = getStatusKey(stock);
        const matchStatus =
            status === "ALL" ||
            currentStatus === status;

        return matchSearch && matchCat && matchStatus;
    });

    const ITEMS_PER_PAGE = 10;
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
            <Header />

            <div className="flex flex-1 pt-[68px] min-h-[calc(100vh-68px)]">
                <DashboardNavigationSidebarSection />

                <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
                    <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">

                        {/* Tiêu đề */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-4xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-2">
                                    {t("admin.inventory_management")}
                                </h1>
                                <p className="text-sm text-[#ffffff60] [font-family:'Manrope-Regular',Helvetica]">
                                    {t("admin.inventory_tracking")}
                                </p>
                            </div>
                            <button 
                                onClick={fetchProducts}
                                className="px-5 py-2.5 border border-[#fac493] text-[#fac493] text-[10px] tracking-[2px] [font-family:'Manrope-Regular',Helvetica] hover:bg-[#fac49315] transition-colors whitespace-nowrap"
                            >
                                {t("admin.update_stock").toUpperCase()}
                            </button>
                        </div>

                        {/* Filters */}
                        <InventoryFilters
                            search={search}
                            setSearch={setSearch}
                            category={category}
                            setCategory={setCategory}
                            status={status}
                            setStatus={setStatus}
                        />

                        {/* Table */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <Loader2 className="w-10 h-10 text-[#fac493] animate-spin" />
                                <p className="text-[10px] tracking-[2px] text-[#ffffff40] uppercase">{t("admin.loading")}</p>
                            </div>
                        ) : (
                            <>
                                <InventoryTable products={paginated} />
                                <Pagination 
                                    total={filtered.length} 
                                    page={page} 
                                    setPage={setPage} 
                                    itemsPerPage={ITEMS_PER_PAGE} 
                                />
                            </>
                        )}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

const Pagination = ({ total, page, setPage, itemsPerPage }) => {
    const { t } = useTranslation();
    const totalPages = Math.ceil(total / itemsPerPage);

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <p className="text-[11px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]">
                {t("admin.showing_x_of_y", { 
                    count: Math.min(itemsPerPage, total - (page-1)*itemsPerPage), 
                    total: total, 
                    unit: t("admin.products").toUpperCase() 
                })}
            </p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#ffffff40] hover:text-[#fac493] border border-[#ffffff10] hover:border-[#fac49340] transition-colors text-xs"
                >
                    ‹
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                    <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-7 h-7 flex items-center justify-center text-[10px] tracking-wider border transition-colors
              ${page === n
                                ? "bg-[#fac493] text-[#131313] border-[#fac493] [font-family:'Manrope-Bold',Helvetica]"
                                : "text-[#ffffff40] border-[#ffffff10] hover:border-[#fac49340] hover:text-[#fac493] [font-family:'Manrope-Regular',Helvetica]"
                            }`}
                    >
                        {n}
                    </button>
                ))}
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#ffffff40] hover:text-[#fac493] border border-[#ffffff10] hover:border-[#fac49340] transition-colors text-xs"
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default InventoryManagement;
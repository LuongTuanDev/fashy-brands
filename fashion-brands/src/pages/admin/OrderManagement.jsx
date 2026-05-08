import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import { OrderCard } from "@/components/admin/orders/OrderCard";
import { OrderStatsSection } from "@/components/admin/orders/OrderStatsSection";
import { VIPBanner } from "@/components/admin/orders/VIPBanner";
import { useTranslation } from "react-i18next";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";
import { supabase } from "@/api/supabase";

const OrderManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL_ORDERS");
  const [page, setPage] = useState(1);
  const [statsData, setStatsData] = useState({ pending: 0, processing: 0, completed: 0, totalRevenue: 0 });

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const [allOrders, stats] = await Promise.all([
        orderService.getAllOrders(),
        orderService.getOrderStats()
      ]);
      setOrders(allOrders || []);
      setStatsData(stats);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(t("admin.no_data"));
    } finally {
      setLoading(false);
    }
  }

  const FILTERS = ["ALL_ORDERS", "PENDING", "COMPLETED"];
  const ITEMS_PER_PAGE = 5;

  const filtered = orders.filter((o) => {
    const customerName = o.profiles?.full_name || "";
    const orderCode = o.id.toString();
    const matchSearch =
      customerName.toLowerCase().includes(search.toLowerCase()) ||
      orderCode.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "ALL_ORDERS" ||
      (filter === "PENDING" && o.status === "PENDING") ||
      (filter === "COMPLETED" && o.status === "COMPLETED");
    return matchSearch && matchFilter;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await orderService.updateOrderStatus(id, newStatus);
      toast.success(t("admin.save_success"));
      fetchOrders();
    } catch (error) {
      toast.error(t("admin.save_error"));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Header />

      <div className="grid flex-1 pt-[68px]" style={{ gridTemplateColumns: "185px 1fr" }}>
        <DashboardNavigationSidebarSection />

        <main>
          <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12">

            {/* Tiêu đề */}
            <div className="flex items-start justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[2px] text-[#ffffff35] uppercase mb-1 [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.operational_system")}
                </p>
                <h1 className="text-3xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
                  {t("admin.orders")}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-[9px] tracking-[1.5px] text-[#ffffff35] uppercase mb-1 [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.total_value_today")}
                </p>
                <p className="text-2xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
                  {statsData.totalRevenue.toLocaleString("vi-VN")}₫
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] tracking-[1.5px] text-[#ffffff35] uppercase mb-1 [font-family:'Manrope-Regular',Helvetica]">
                  {t("admin.new_orders").toUpperCase()}
                </p>
                <p className="text-2xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
                  {String(statsData.pending).padStart(2, "0")}
                </p>
              </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 className="w-10 h-10 text-[#fac493] animate-spin" />
                    <p className="text-[10px] tracking-[2px] text-[#ffffff40] uppercase">{t("admin.loading")}</p>
                </div>
            ) : (
                <>
                    {/* Stats + VIP */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5 mb-8">
                    <OrderStatsSection stats={statsData} />
                    <VIPBanner count={3} />
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#ffffff10] px-4 py-2.5 mb-6">
                    <Search size={13} className="text-[#ffffff40]" />
                    <input
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder={t("admin.search") + "..."}
                        className="flex-1 bg-transparent text-[11px] text-[#e8e2d9] placeholder:text-[#ffffff30] outline-none [font-family:'Manrope-Regular',Helvetica]"
                    />
                    </div>

                    {/* Filter + Title */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-4">
                    <h2 className="text-xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
                        {t("admin.order_list")}
                    </h2>
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => { setFilter(f); setPage(1); }}
                            className={`px-4 py-1.5 text-[9px] tracking-[1.5px] border transition-colors [font-family:'Manrope-Regular',Helvetica] whitespace-nowrap
                            ${filter === f
                                ? "border-[#fac493] text-[#fac493] bg-[#fac49310]"
                                : "border-[#ffffff15] text-[#ffffff40] hover:border-[#ffffff30] hover:text-[#ffffff60]"
                            }`}
                        >
                            {t(`admin.${f.toLowerCase()}`).toUpperCase()}
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Orders */}
                    {paginated.length === 0 ? (
                    <div className="py-16 text-center text-[#ffffff30] text-sm [font-family:'Manrope-Regular',Helvetica]">
                        {t("admin.no_data")}
                    </div>
                    ) : (
                    paginated.map((order) => (
                        <OrderCard
                        key={order.id}
                        order={{
                            ...order,
                            customerName: order.profiles?.full_name,
                            code: order.id.toString(),
                            price: order.total_amount
                        }}
                        onStatusChange={handleStatusChange}
                        onViewDetail={(o) => navigate(`/dashboard/orders/${o.id}`)}
                        />
                    ))
                    )}

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                    <p className="text-[10px] text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica]">
                        {t("admin.showing_x_of_y", { count: paginated.length, total: filtered.length, unit: t("admin.orders").toUpperCase() })}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="w-7 h-7 flex items-center justify-center border border-[#ffffff15] text-[#ffffff40] hover:text-[#fac493] hover:border-[#fac49340] transition-colors text-xs"
                        >‹</button>
                        <span className="text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                        {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                        </span>
                        <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="w-7 h-7 flex items-center justify-center border border-[#ffffff15] text-[#ffffff40] hover:text-[#fac493] hover:border-[#fac49340] transition-colors text-xs"
                        >›</button>
                    </div>
                    </div>
                </>
            )}

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default OrderManagement;
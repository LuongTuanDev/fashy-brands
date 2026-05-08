import { useState, useEffect } from "react";
import { Search, ChevronDown, Trash2, X, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import { userService } from "@/services/userService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 10;

const statusStyle = (s) =>
    s === "ACTIVE"
        ? "text-[#e8e2d9] border-[#ffffff25] bg-[#ffffff08]"
        : "text-[#ffffff50] border-[#ffffff15] bg-transparent";

const Avatar = ({ name, src }) => {
    const initials = (name || "C").split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase();
    if (src) return <img src={src} alt={name} className="w-9 h-9 rounded-full object-cover" />;
    return (
        <div className="w-9 h-9 rounded-full bg-[#2a2520] border border-[#ffffff15] flex items-center justify-center text-[11px] text-[#fac493] [font-family:'Manrope-Bold',Helvetica]">
            {initials}
        </div>
    );
};

// ── Modal xác nhận xóa ────────────────────────
const DeleteModal = ({ customer, onClose, onConfirm }) => {
    const { t } = useTranslation();
    return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-[#161616] border border-[#ffffff15] w-full max-w-[320px] mx-4 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm tracking-wider text-[#ff6b6b] [font-family:'Noto_Serif-Regular',Helvetica] uppercase">
                    {t("admin.confirm_delete")}
                </h2>
                <button onClick={onClose} className="text-[#ffffff30] hover:text-[#ffffff60] transition-colors">
                    <X size={16} />
                </button>
            </div>

            <div className="mb-6">
                <p className="text-[11px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica] mb-1">
                    {t("admin.delete_confirm_text")}:
                </p>
                <p className="text-[13px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] border-l border-[#ff6b6b] pl-3 py-1">
                    {customer.name}
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 border border-[#ffffff10] text-[9px] tracking-[1.5px] text-[#ffffff40] hover:bg-[#ffffff05] transition-colors [font-family:'Manrope-Regular',Helvetica]"
                >
                    {t("admin.discard").toUpperCase()}
                </button>
                <button
                    onClick={() => { onConfirm(customer.id); onClose(); }}
                    className="flex-1 py-2.5 bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b] text-[9px] tracking-[1.5px] hover:bg-[#ff6b6b]/20 transition-colors [font-family:'Manrope-Bold',Helvetica]"
                >
                    {t("admin.delete").toUpperCase()}
                </button>
            </div>
        </div>
    </div>
    );
};

// ── Main ──────────────────────────────────────────────────
const CustomerManagement = () => {
    const { t } = useTranslation();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [page, setPage] = useState(1);
    const [deleteCustomer, setDeleteCustomer] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            
            // Map the data from database to match the UI expected structure
            const mapped = data.map(user => ({
                id: user.id,
                name: user.full_name || "Unknown User",
                email: user.email || "—",
                phone: user.phone || "—",
                totalOrders: 0, // Placeholder
                status: "ACTIVE", // Profiles don't have status yet, assume active
                avatar: user.avatar_url || ""
            }));
            setCustomers(mapped);
        } catch (error) {
            console.error("Failed to load customers:", error);
            toast.error(t("admin.load_error") || "Không thể tải danh sách khách hàng");
        } finally {
            setLoading(false);
        }
    };

    const STATUS_OPTIONS = [
        { value: "ALL", label: t("admin.all_status") },
        { value: "ACTIVE", label: t("admin.active") },
        { value: "SUSPENDED", label: t("admin.suspended") }
    ];

    const filtered = customers.filter((c) => {
        const matchSearch =
            (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (c.email || "").toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "ALL" || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleDelete = async (id) => {
        try {
            await userService.deleteUser(id);
            toast.success(t("admin.delete_success"));
            setCustomers((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error("Failed to delete user:", err);
            toast.error(t("admin.delete_error"));
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
            <Header />

            {deleteCustomer && <DeleteModal customer={deleteCustomer} onClose={() => setDeleteCustomer(null)} onConfirm={handleDelete} />}

            <div className="grid flex-1 pt-[68px]" style={{ gridTemplateColumns: "185px 1fr" }}>
                <DashboardNavigationSidebarSection />

                <main>
                    <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12">

                        {/* Tiêu đề */}
                        <div className="mb-8">
                            <h1 className="text-5xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-3 leading-tight">
                                {t("admin.manage_customers_1")}<br />{t("admin.manage_customers_2")}
                            </h1>
                            <p className="text-[12px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]">
                                {t("admin.customer_management_desc")}
                            </p>
                        </div>

                        {/* Search & Export bar */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#ffffff10] px-4 py-2.5 w-full max-w-xs">
                                <Search size={13} className="text-[#ffffff40]" />
                                <input
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                    placeholder={t("admin.search") + "..."}
                                    className="flex-1 bg-transparent text-[11px] text-[#e8e2d9] placeholder:text-[#ffffff30] outline-none [font-family:'Manrope-Regular',Helvetica]"
                                />
                                {search && (
                                    <button onClick={() => setSearch("")} className="text-[#ffffff30] hover:text-[#ffffff60] transition-colors">
                                        <X size={12} />
                                    </button>
                                )}
                            </div>

                            <button className="text-[10px] tracking-[2px] text-[#ffffff40] border-b border-[#ffffff20] pb-0.5 hover:text-[#ffffff70] hover:border-[#ffffff40] transition-colors [font-family:'Manrope-Regular',Helvetica]">
                                {t("admin.export_data").toUpperCase()}
                            </button>
                        </div>

                        {/* Table container */}
                        <div className="border border-[#ffffff10] bg-[#1a1a1a]">

                            {/* Filter bar */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-[#ffffff08]">
                                <div className="relative flex items-center gap-2">
                                    <ChevronDown size={12} className="text-[#ffffff40]" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                                        className="appearance-none bg-transparent text-[11px] text-[#e8e2d9] outline-none cursor-pointer pr-4 [font-family:'Manrope-Regular',Helvetica]"
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s.value} value={s.value} className="bg-[#1a1a1a]">{s.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-[10px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]">
                                        Hiển thị {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} trong {filtered.length} khách hàng
                                    </p>
                                </div>
                            </div>

                            {/* Table header */}
                            <div className="grid px-5 py-3 border-b border-[#ffffff08]"
                                style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.5fr 1.2fr 0.8fr" }}>
                                {[t("admin.full_name"), t("admin.email"), t("admin.phone_number"), t("admin.total_orders"), t("admin.status"), t("admin.actions")].map((col) => (
                                    <p key={col} className="text-[9px] tracking-[1.5px] text-[#ffffff35] [font-family:'Manrope-Bold',Helvetica] uppercase">
                                        {col}
                                    </p>
                                ))}
                            </div>

                            {/* Rows */}
                            {paginated.length === 0 ? (
                                <div className="py-16 text-center text-[#ffffff30] text-sm [font-family:'Manrope-Regular',Helvetica]">
                                    {t("admin.no_data")}
                                </div>
                            ) : (
                                paginated.map((c) => (
                                    <div
                                        key={c.id}
                                        className={`grid items-center px-5 py-4 border-b border-[#ffffff06] hover:bg-[#ffffff03] transition-colors last:border-0 
                      ${c.status === "SUSPENDED" ? "opacity-50" : "opacity-100"}`}
                                        style={{ gridTemplateColumns: "2fr 2fr 1.2fr 1.5fr 1.2fr 0.8fr" }}
                                    >
                                        {/* Tên */}
                                        <div className="flex items-center gap-3">
                                            <Avatar name={c.name} src={c.avatar} />
                                            <p className="text-[12px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] leading-snug">
                                                {c.name}
                                            </p>
                                        </div>

                                        {/* Email */}
                                        <p className="text-[11px] text-[#ffffff60] [font-family:'Manrope-Regular',Helvetica] truncate pr-2">
                                            {c.email}
                                        </p>

                                        {/* Phone */}
                                        <p className="text-[11px] text-[#ffffff60] [font-family:'Manrope-Regular',Helvetica]">
                                            {c.phone}
                                        </p>

                                        {/* Tổng đơn */}
                                        <p className="text-[12px] text-[#fac493] [font-family:'Manrope-Regular',Helvetica]">
                                            ₫ {c.totalOrders.toLocaleString("vi-VN")}
                                        </p>

                                        {/* Trạng thái */}
                                        <div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] [font-family:'Manrope-Regular',Helvetica] ${statusStyle(c.status)}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${c.status === "ACTIVE" ? "bg-[#7dd3a8]" : "bg-[#ffffff40]"}`} />
                                                {c.status === "ACTIVE" ? t("admin.active") : t("admin.suspended")}
                                            </span>
                                        </div>

                                        {/* Actions: Only Delete */}
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setDeleteCustomer(c)} className="text-[#ffffff25] hover:text-[#ff6b6b] transition-colors" title={t("admin.delete")}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}

                            {/* Pagination */}
                            <div className="flex items-center justify-end gap-1 px-5 py-4 border-t border-[#ffffff08]">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="w-7 h-7 flex items-center justify-center border border-[#ffffff15] text-[#ffffff40] hover:text-[#fac493] hover:border-[#fac49340] transition-colors text-xs"
                                >‹</button>
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                                    <button
                                        key={n}
                                        onClick={() => setPage(n)}
                                        className={`w-7 h-7 flex items-center justify-center text-[10px] border transition-colors
                      ${page === n
                                                ? "bg-[#fac493] text-[#131313] border-[#fac493] [font-family:'Manrope-Bold',Helvetica]"
                                                : "text-[#ffffff40] border-[#ffffff15] hover:border-[#fac49340] hover:text-[#fac493] [font-family:'Manrope-Regular',Helvetica]"
                                            }`}
                                    >{n}</button>
                                ))}
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className="w-7 h-7 flex items-center justify-center border border-[#ffffff15] text-[#ffffff40] hover:text-[#fac493] hover:border-[#fac49340] transition-colors text-xs"
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

export default CustomerManagement;
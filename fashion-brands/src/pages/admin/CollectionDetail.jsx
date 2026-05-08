import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { allProducts } from "@/data/products";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Search } from "lucide-react";
import { useState } from "react";

const StatusBadge = ({ stock }) => {
    if (!stock || stock === 0)
        return (
            <span className="flex items-center gap-1.5 text-[10px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff40]" /> OUT OF STOCK
            </span>
        );
    if (stock <= 5)
        return (
            <span className="flex items-center gap-1.5 text-[10px] text-[#fac493] [font-family:'Manrope-Regular',Helvetica]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fac493]" /> LOW STOCK
            </span>
        );
    return (
        <span className="flex items-center gap-1.5 text-[10px] text-[#7dd3a8] [font-family:'Manrope-Regular',Helvetica]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7dd3a8]" /> IN STOCK
        </span>
    );
};

/* ── Modal thêm sản phẩm ── */
const AddProductModal = ({ onClose, onAdd, existingIds }) => {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState([]);

    const available = allProducts.filter(
        (p) =>
            !existingIds.includes(p.id) &&
            (p.name.toLowerCase().includes(search.toLowerCase()) ||
                (p.sku || `ATL-${p.id}`).toLowerCase().includes(search.toLowerCase()))
    );

    const toggle = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleAdd = () => {
        const toAdd = allProducts.filter((p) => selected.includes(p.id));
        onAdd(toAdd);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#000000cc] backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg bg-[#131313] border border-[#ffffff15] flex flex-col max-h-[80vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#ffffff10]">
                    <div className="flex items-center gap-2">
                        <div className="w-[2px] h-4 bg-[#fac493]" />
                        <p className="text-[11px] tracking-[2px] text-[#fac493] [font-family:'Manrope-Bold',Helvetica]">
                            THÊM SẢN PHẨM VÀO BỘ SƯU TẬP
                        </p>
                    </div>
                    <button onClick={onClose} className="text-[#ffffff30] hover:text-[#ffffff70] transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 py-4 border-b border-[#ffffff10]">
                    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#ffffff15] px-3 py-2">
                        <Search size={12} className="text-[#ffffff40]" />
                        <input
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm sản phẩm..."
                            className="flex-1 bg-transparent text-[11px] text-[#e8e2d9] placeholder:text-[#ffffff30] outline-none [font-family:'Manrope-Regular',Helvetica]"
                        />
                    </div>
                </div>

                {/* Product list */}
                <div className="flex-1 overflow-y-auto">
                    {available.length === 0 ? (
                        <div className="py-12 text-center text-[#ffffff30] text-sm [font-family:'Manrope-Regular',Helvetica]">
                            Không tìm thấy sản phẩm nào
                        </div>
                    ) : (
                        available.map((p) => {
                            const isSelected = selected.includes(p.id);
                            return (
                                <div
                                    key={p.id}
                                    onClick={() => toggle(p.id)}
                                    className={`flex items-center gap-4 px-6 py-4 border-b border-[#ffffff08] cursor-pointer transition-colors
                    ${isSelected ? "bg-[#fac49310]" : "hover:bg-[#ffffff04]"}`}
                                >
                                    {/* Checkbox */}
                                    <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors
                    ${isSelected ? "border-[#fac493] bg-[#fac493]" : "border-[#ffffff30]"}`}>
                                        {isSelected && <span className="text-[#131313] text-[10px] font-bold">✓</span>}
                                    </div>

                                    {/* Image */}
                                    <div className="w-10 h-10 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                                        <img
                                            src={p.images?.[0]}
                                            alt={p.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.style.display = "none"}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] truncate">
                                            {p.name}
                                        </p>
                                        <p className="text-[9px] text-[#ffffff40] tracking-wider [font-family:'Manrope-Regular',Helvetica] mt-0.5">
                                            SKU: {p.sku || `ATL-${p.id}`} · {p.category}
                                        </p>
                                    </div>

                                    {/* Giá */}
                                    <p className="text-[11px] text-[#fac493] [font-family:'Manrope-Regular',Helvetica] flex-shrink-0">
                                        ${(p.price / 100).toLocaleString()}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#ffffff10] flex items-center justify-between">
                    <p className="text-[10px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]">
                        {selected.length > 0 ? `Đã chọn ${selected.length} sản phẩm` : "Chưa chọn sản phẩm nào"}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 border border-[#ffffff20] text-[10px] tracking-[1.5px] text-[#ffffff45] hover:text-[#ffffff70] hover:border-[#ffffff35] transition-colors [font-family:'Manrope-Regular',Helvetica]"
                        >
                            HỦY
                        </button>
                        <button
                            onClick={handleAdd}
                            disabled={selected.length === 0}
                            className={`px-5 py-2 text-[10px] tracking-[1.5px] [font-family:'Manrope-Bold',Helvetica] transition-colors
                ${selected.length > 0
                                    ? "bg-[#fac493] text-[#131313] hover:bg-[#f5b97e]"
                                    : "bg-[#ffffff15] text-[#ffffff30] cursor-not-allowed"
                                }`}
                        >
                            THÊM VÀO BỘ SƯU TẬP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Main ── */
const CollectionDetail = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const collectionName = decodeURIComponent(name);

    const initial = allProducts.filter((p) => p.collection === collectionName);
    const [products, setProducts] = useState(initial);
    const [showModal, setShowModal] = useState(false);

    const handleAdd = (newProducts) => {
        setProducts((prev) => [...prev, ...newProducts]);
    };

    const handleRemove = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
            <Header />

            {showModal && (
                <AddProductModal
                    onClose={() => setShowModal(false)}
                    onAdd={handleAdd}
                    existingIds={products.map((p) => p.id)}
                />
            )}

            <div className="flex-1 pt-[68px]">
                <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">

                    {/* Back */}
                    <button
                        onClick={() => navigate("/dashboard/collections")}
                        className="flex items-center gap-2 text-[10px] tracking-[1.5px] text-[#ffffff40] hover:text-[#ffffff70] transition-colors [font-family:'Manrope-Regular',Helvetica] mb-8"
                    >
                        <ArrowLeft size={12} /> TRỞ VỀ QUẢN LÝ
                    </button>

                    {/* Tiêu đề */}
                    <div className="flex items-start justify-between mb-10">
                        <div>
                            <p className="text-sm text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica] mb-1">
                                Sản phẩm trong Bộ sưu tập:
                            </p>
                            <h1 className="text-5xl text-[#fac493] [font-family:'Noto_Serif-Regular',Helvetica] mb-3">
                                {collectionName}
                            </h1>
                            <p className="text-sm text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]">
                                Quản lý danh sách sản phẩm thuộc bộ sưu tập này.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-5 py-3 border border-[#fac493] text-[#fac493] text-[10px] tracking-[2px] [font-family:'Manrope-Regular',Helvetica] hover:bg-[#fac49315] transition-colors mt-2"
                        >
                            <Plus size={12} /> ADD PRODUCT TO COLLECTION
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#ffffff10] mb-6" />

                    {/* Col headers */}
                    <div className="flex items-center px-4 py-3 border-b border-[#ffffff10]">
                        {["Sản phẩm", "Giá", "Trạng thái", "Thao tác"].map((col, i) => (
                            <div
                                key={col}
                                className={`text-[10px] tracking-[1px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]
                  ${i === 0 ? "flex-1" : i === 1 ? "w-[15%]" : i === 2 ? "w-[20%]" : "w-[20%]"}`}
                            >
                                {col}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {products.length === 0 ? (
                        <div className="py-16 text-center text-[#ffffff30] text-sm [font-family:'Manrope-Regular',Helvetica]">
                            Không có sản phẩm nào trong bộ sưu tập này
                        </div>
                    ) : (
                        products.map((p) => {
                            const stock = p.variants?.length > 0
                                ? p.variants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
                                : (p.stock ?? 20);

                            return (
                                <div
                                    key={p.id}
                                    className="flex items-center px-4 py-6 border-b border-[#ffffff08] hover:bg-[#ffffff03] transition-colors"
                                >
                                    <div className="flex-1 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                                            <img
                                                src={p.images?.[0]}
                                                alt={p.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.style.display = "none"}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-0.5">
                                                {p.name}
                                            </p>
                                            <p className="text-[9px] text-[#ffffff40] tracking-wider [font-family:'Manrope-Regular',Helvetica]">
                                                SKU: {p.sku || `ATL-${p.id}`}
                                            </p>
                                            <p className="text-[9px] text-[#ffffff30] tracking-wider [font-family:'Manrope-Regular',Helvetica] capitalize mt-0.5">
                                                {p.category}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-[15%] text-[13px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                                        ${(p.price / 100).toLocaleString()}
                                    </div>

                                    <div className="w-[20%]">
                                        <StatusBadge stock={stock} />
                                    </div>

                                    <div className="w-[20%] flex items-center gap-3">
                                        <button
                                            onClick={() => navigate(`/dashboard/inventory/${p.id}`)}
                                            className="text-[9px] tracking-[1.5px] text-[#ffffff50] [font-family:'Manrope-Regular',Helvetica] hover:text-[#fac493] transition-colors"
                                        >
                                            EDIT PRODUCT
                                        </button>
                                        <button
                                            onClick={() => handleRemove(p.id)}
                                            className="text-[9px] tracking-[1.5px] text-[#ffffff50] [font-family:'Manrope-Regular',Helvetica] hover:text-[#ff6b6b] transition-colors"
                                        >
                                            REMOVE
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CollectionDetail;
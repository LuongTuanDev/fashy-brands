import { useState } from "react";
import { Edit, RotateCcw } from "lucide-react";

const StatusBadge = ({ stock }) => {
  if (stock === 0)
    return <span className="px-3 py-1 text-[9px] tracking-[1.5px] border border-[#ff6b6b] text-[#ff6b6b] [font-family:'Manrope-Bold',Helvetica]">HẾT HÀNG</span>;
  if (stock <= 5)
    return <span className="px-3 py-1 text-[9px] tracking-[1.5px] border border-[#fac493] text-[#fac493] [font-family:'Manrope-Bold',Helvetica]">SẮP HẾT</span>;
  return <span className="px-3 py-1 text-[9px] tracking-[1.5px] border border-[#7dd3a8] text-[#7dd3a8] [font-family:'Manrope-Bold',Helvetica]">CÒN HÀNG</span>;
};

const VariantTable = ({ product }) => {
  // Tạo variants từ data sản phẩm
  const rawVariants = product.variants && product.variants.length > 0
    ? product.variants
    : (product.sizes || ["One Size"]).map((size, i) => ({
        name: `${product.colors?.[0] || "Default"} / ${size}`,
        sku: `${product.sku || `ATL-${product.id}`}-${size.toUpperCase()}`,
        stock: Math.floor(Math.random() * 20),
      }));

  const [variants, setVariants] = useState(rawVariants);
  const [editingId, setEditingId] = useState(null);
  const [editStock, setEditStock] = useState("");

  const handleEdit = (i, stock) => {
    setEditingId(i);
    setEditStock(String(stock));
  };

  const handleSave = (i) => {
    const updated = [...variants];
    updated[i] = { ...updated[i], stock: Number(editStock) };
    setVariants(updated);
    setEditingId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica]">
          Danh sách biến thể
        </h2>
        <button className="flex items-center gap-2 text-[10px] tracking-[1px] text-[#ffffff40] hover:text-[#ffffff70] transition-colors [font-family:'Manrope-Regular',Helvetica]">
          <span>☰</span> LỌC THEO TRẠNG THÁI
        </button>
      </div>

      {/* Table */}
      <div className="border border-[#ffffff10]">
        {/* Col headers */}
        <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-[#ffffff10]">
          {["BIẾN THỂ", "SKU BIẾN THỂ", "SỐ LƯỢNG", "TRẠNG THÁI", "THAO TÁC"].map((col, i) => (
            <div
              key={col}
              className={`text-[9px] tracking-[1.5px] text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica]
                ${i === 0 ? "w-[30%]" : i === 1 ? "w-[30%]" : i === 2 ? "w-[15%]" : i === 3 ? "w-[15%]" : "w-[10%]"}`}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {variants.map((v, i) => (
          <div
            key={i}
            className="flex items-center px-4 py-5 border-b border-[#ffffff08] hover:bg-[#ffffff03] transition-colors"
          >
            {/* Biến thể */}
            <div className="w-[30%] flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2a2a2a] flex-shrink-0" />
              <span className="text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                {v.name || `${v.color || ""} / ${v.size || ""}`}
              </span>
            </div>

            {/* SKU */}
            <div className="w-[30%] text-[10px] text-[#ffffff40] tracking-wider [font-family:'Manrope-Regular',Helvetica]">
              {v.sku}
            </div>

            {/* Số lượng */}
            <div className="w-[15%]">
              {editingId === i ? (
                <input
                  autoFocus
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                  onBlur={() => handleSave(i)}
                  onKeyDown={(e) => e.key === "Enter" && handleSave(i)}
                  className="w-16 bg-[#1a1a1a] border border-[#fac493] text-[#fac493] text-[11px] px-2 py-1 outline-none [font-family:'Manrope-Regular',Helvetica]"
                />
              ) : (
                <span className="text-[15px] text-[#e8e2d9] [font-family:'Manrope-Bold',Helvetica]">
                  {v.stock ?? 0}
                </span>
              )}
            </div>

            {/* Trạng thái */}
            <div className="w-[15%]">
              <StatusBadge stock={v.stock ?? 0} />
            </div>

            {/* Thao tác */}
            <div className="w-[10%] flex items-center gap-2">
              <button
                onClick={() => handleEdit(i, v.stock ?? 0)}
                className="text-[#ffffff30] hover:text-[#fac493] transition-colors p-1"
              >
                <Edit size={13} />
              </button>
              <button className="text-[#ffffff30] hover:text-[#ffffff60] transition-colors p-1">
                <RotateCcw size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantTable;
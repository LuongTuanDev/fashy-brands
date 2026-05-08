import InventoryStatusBadge from "./InventoryStatusBadge";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InventoryTable = ({ products }) => {
  const navigate = useNavigate();

  const cols = [
    { label: "SẢN PHẨM",   w: "w-[30%]" },
    { label: "SKU",         w: "w-[12%]" },
    { label: "DANH MỤC",   w: "w-[12%]" },
    { label: "GIÁ",         w: "w-[10%]" },
    { label: "TỒN KHO",    w: "w-[8%]"  },
    { label: "BIẾN THỂ",   w: "w-[15%]" },
    { label: "TRẠNG THÁI", w: "w-[10%]" },
    { label: "THAO TÁC",   w: "w-[5%]"  },
  ];

  return (
    <div className="border border-[#ffffff10] overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-[#ffffff10]">
        {cols.map((col) => (
          <div
            key={col.label}
            className={`${col.w} text-[9px] tracking-[1.5px] text-[#ffffff40] [font-family:'Manrope-Bold',Helvetica]`}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {products.length === 0 ? (
        <div className="py-16 text-center text-[#ffffff30] text-sm [font-family:'Manrope-Regular',Helvetica]">
          Không tìm thấy sản phẩm nào
        </div>
      ) : (
        products.map((p, i) => {
          const stock = p.product_variants?.length > 0
            ? p.product_variants.reduce((sum, v) => sum + (v.stock ?? 0), 0)
            : (p.stock ?? 0);
            
          const variantLabels = p.product_variants?.map(v => `${v.color}/${v.size}`).join(", ") || "—";

          return (
            <div
              key={p.id}
              className={`flex items-center px-4 py-4 border-b border-[#ffffff08] hover:bg-[#ffffff04] transition-colors ${i % 2 === 0 ? "" : "bg-[#ffffff02]"}`}
            >
              {/* Sản phẩm */}
              <div className="w-[30%] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                  <img
                    src={p.image_url || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80"}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80")}
                  />
                </div>
                <span className="text-[11px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] leading-4 line-clamp-2">
                  {p.name}
                </span>
              </div>

              {/* SKU */}
              <div className="w-[12%] text-[10px] text-[#ffffff50] [font-family:'Manrope-Regular',Helvetica]">
                {p.sku || `ATL-${String(p.id).slice(0, 8).toUpperCase()}`}
              </div>

              {/* Danh mục */}
              <div className="w-[12%] text-[10px] text-[#ffffff60] [font-family:'Manrope-Regular',Helvetica] capitalize">
                {p.category || "—"}
              </div>

              {/* Giá */}
              <div className="w-[10%] text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                {p.price?.toLocaleString("vi-VN")} ₫
              </div>

              {/* Tồn kho */}
              <div className="w-[8%] text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                {stock}
              </div>

              {/* Biến thể */}
              <div className="w-[15%] text-[10px] text-[#ffffff50] [font-family:'Manrope-Regular',Helvetica] leading-4 line-clamp-2">
                {variantLabels}
              </div>

              {/* Trạng thái */}
              <div className="w-[10%]">
                <InventoryStatusBadge stock={stock} />
              </div>

            {/* Thao tác */}
            <div className="w-[5%] flex justify-center">
              <button
                onClick={() => navigate(`/dashboard/inventory/${p.id}`)}
                className="text-[#ffffff30] hover:text-[#fac493] transition-colors p-1"
              >
                <Settings size={13} />
              </button>
            </div>
          </div>
          );
        })
      )}
    </div>
  );
};

export default InventoryTable;
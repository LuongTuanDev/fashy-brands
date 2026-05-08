import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";
import { formatVND } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "./Toast";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
function ProductCard({ product, showCollection = true }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();
  const { t } = useTranslation();
  const handleWishlist = (e) => {
    e.preventDefault();
    setWishlisted((v) => !v);
    showToast(wishlisted ? t("common.wishlist_removed") : t("common.wishlist_added"));
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
    showToast(t("common.added_to_cart", { name: product.name }));
  };
  return <Link to={`/product/${product.id}`} className="group block">
    <div className="relative overflow-hidden bg-[#1a1916] mb-3" style={{ aspectRatio: "3/4" }}>
      {!imgError ? <img
        src={product.image_url || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80"}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={() => setImgError(true)}
      /> : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1f1e1d] to-[#0e0e0e]">
        <span className="text-[#3a3830] text-xs tracking-widest uppercase font-serif">FASHY</span>
      </div>}

      {product.badge && <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-[#c9a96e] text-[#1a1208] px-2 py-1 font-semibold z-10">
        {product.badge}
      </span>}
      {product.isNew && !product.badge && <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-[#2a2820] text-[#c9a96e] px-2 py-1 border border-[#c9a96e]/30 z-10">
        {t("common.new_arrival")}
      </span>}

      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-1.5 bg-[#0e0e0e]/80 hover:bg-[#0e0e0e] z-10"
      >
        <Heart
          size={14}
          className={cn(
            "transition-colors",
            wishlisted ? "fill-[#c9a96e] text-[#c9a96e]" : "text-[#e8e2d9]"
          )}
        />
      </button>

      <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-[#c9a96e] text-[#1a1208] text-[9px] font-semibold tracking-[0.25em] uppercase hover:bg-[#ddb87a] transition-colors"
        >
          {t("common.add_to_cart")}
        </button>
      </div>
    </div>

    <div>
      {showCollection && product.collection && <p className="text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1">{product.collection}</p>}
      {product.nameEn && <p className="text-[9px] tracking-[0.2em] uppercase text-[#5a5248] mb-1">{product.nameEn}</p>}
      <h3 className="text-xs font-medium text-[#e8e2d9] tracking-wide mb-1.5 group-hover:text-[#c9a96e] transition-colors leading-snug">
        {product.name}
      </h3>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#c9a96e] font-medium">{formatVND(product.price)}</span>
        {product.originalPrice && <span className="text-xs text-[#5a5248] line-through">{formatVND(product.originalPrice)}</span>}
      </div>
    </div>
  </Link>;
}
export {
  ProductCard as default
};

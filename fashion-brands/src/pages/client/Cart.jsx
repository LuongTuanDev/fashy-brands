import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/common/Toast";
import { formatVND } from "@/lib/utils";
const PROMO_CODES = {
  FASHY10: 0.1,
  LUXURY20: 0.2,
  VIP15: 0.15
};
function CartPage() {
  const { state, removeItem, updateQty } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState("");
  const subtotal = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + tax;
  const handleApplyPromo = () => {
    const code = promo.toUpperCase().trim();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoApplied(code);
      showToast(`M\xE3 ${code} \u0111\xE3 \xE1p d\u1EE5ng! Gi\u1EA3m ${PROMO_CODES[code] * 100}%`);
    } else {
      showToast("M\xE3 gi\u1EA3m gi\xE1 kh\xF4ng h\u1EE3p l\u1EC7", "error");
    }
  };
  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
    <Header />
    <main className="pt-[68px]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#e8e2d9] mb-1">Your Selection</h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248]">Curated for the Digital Fashy</p>
        </div>

        {state.items.length === 0 ? <div className="flex flex-col items-center py-24 text-center">
          <p className="text-5xl text-[#2a2820] mb-6">◈</p>
          <h2 className="text-xl font-serif text-[#8a8070] mb-3">Giỏ hàng trống</h2>
          <p className="text-sm text-[#5a5248] mb-8">Khám phá bộ sưu tập và thêm sản phẩm vào giỏ hàng</p>
          <button onClick={() => navigate("/")} className="btn-gold px-8 py-3 text-[10px] tracking-[0.25em] uppercase">
            Khám Phá Ngay
          </button>
        </div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => <div key={item.product.id} className="flex gap-5 pb-6 border-b border-[#2a2820]">
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{ width: "96px", height: "96px", backgroundColor: "#1a1916" }}
              >
                <img
                  src={item.product.image_url || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80"}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-sm font-medium text-[#e8e2d9] tracking-wide">
                      {item.product.name}
                    </h3>
                    {item.product.collection && <p className="text-[10px] tracking-wider uppercase text-[#5a5248] mt-0.5">
                      {item.product.collection}
                    </p>}
                    {item.selectedSize && <p className="text-[10px] tracking-wider uppercase text-[#5a5248]">
                      Size: {item.selectedSize}
                    </p>}
                    {item.selectedColor && <p className="text-[10px] tracking-wider uppercase text-[#5a5248]">
                      {item.selectedColor}
                    </p>}
                  </div>
                  <span className="text-sm text-[#c9a96e] font-medium flex-shrink-0">
                    {formatVND(item.product.price * item.quantity)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-[#2a2820]">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-[#5a5248] hover:text-[#e8e2d9] transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-4 py-1.5 text-sm text-[#e8e2d9] border-x border-[#2a2820] min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-[#5a5248] hover:text-[#e8e2d9] transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(item.product.id);
                      showToast("\u0110\xE3 x\xF3a s\u1EA3n ph\u1EA9m");
                    }}
                    className="flex items-center gap-1 text-[9px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-red-400 transition-colors"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
              </div>
            </div>)}

            <div className="pt-2">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248] mb-3">Promo Code</p>
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  placeholder="ENTER CODE"
                  disabled={!!promoApplied}
                  className="flex-1 bg-transparent border border-[#2a2820] text-[#e8e2d9] text-xs tracking-[0.2em] uppercase px-4 py-3 outline-none placeholder:text-[#3a3830] focus:border-[#c9a96e] transition-colors disabled:opacity-50"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={!!promoApplied}
                  className="px-6 border border-[#c9a96e] text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase hover:bg-[#c9a96e] hover:text-[#1a1208] transition-all disabled:opacity-40"
                >
                  Apply
                </button>
              </div>
              {promoApplied && <p className="text-[10px] text-[#c9a96e] mt-2 tracking-wide">
                Mã {promoApplied} đã áp dụng — giảm {PROMO_CODES[promoApplied] * 100}%
              </p>}
              <p className="text-[9px] text-[#3a3830] mt-1 tracking-wide">Thử: FASHY10 / LUXURY20 / VIP15</p>
            </div>
          </div>

          <div>
            <div className="border border-[#2a2820] p-6 sticky top-24" style={{ backgroundColor: "#131210" }}>
              <h2 className="text-lg font-serif text-[#e8e2d9] mb-6">Order Summary</h2>

              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between text-[#8a8070] tracking-wide uppercase">
                  <span>Subtotal</span>
                  <span>{formatVND(subtotal)}</span>
                </div>
                {discountAmount > 0 && <div className="flex justify-between text-[#c9a96e] tracking-wide uppercase">
                  <span>Discount</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>}
                <div className="flex justify-between text-[#5a5248] tracking-wide uppercase">
                  <span>Shipping</span>
                  <span className="text-[#c9a96e]">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#5a5248] tracking-wide uppercase">
                  <span>Tax Estimate</span>
                  <span>{formatVND(tax)}</span>
                </div>
                <div className="border-t border-[#2a2820] pt-3">
                  <div className="flex justify-between text-[#e8e2d9] tracking-wider uppercase text-sm font-medium">
                    <span>Total</span>
                    <span className="text-[#c9a96e] text-base">{formatVND(total)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="btn-gold w-full py-4 text-[10px] tracking-[0.3em] uppercase font-semibold"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} className="ml-2" />
              </button>

              <p className="text-center text-[9px] text-[#3a3830] mt-4 tracking-wide">
                30 MINUTES RESERVED FOR CURATION
              </p>

              <div className="mt-6 pt-6 border-t border-[#2a2820] text-[9px] text-[#5a5248] leading-relaxed tracking-wide">
                <p className="font-medium text-[#8a8070] mb-1 uppercase tracking-[0.2em]">Cần hỗ trợ?</p>
                <p>Concierge của chúng tôi luôn sẵn sàng để đảm bảo đơn hàng của bạn hoàn hảo.</p>
                <button className="text-[#c9a96e] hover:underline mt-1 text-[9px] tracking-wider uppercase">
                  Contact Concierge
                </button>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </main>
    <Footer />
  </div>;
}
export {
  CartPage as default
};

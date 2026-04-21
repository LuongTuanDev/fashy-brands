import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId || `ATL-${Date.now().toString(36).toUpperCase()}`;
  return <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="flex-1 flex items-center justify-center pt-[68px] px-6">
        <div className="max-w-lg w-full text-center py-20">
          <div className="w-16 h-16 mx-auto border border-[#c9a96e] flex items-center justify-center mb-8">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#c9a96e]">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-4">Order Confirmed</p>
          <h1 className="text-4xl font-serif text-[#e8e2d9] mb-4">Thank You</h1>
          <p className="text-sm text-[#8a8070] leading-relaxed mb-8 max-w-sm mx-auto">
            Your order has been received and is being prepared with the utmost care by our artisans.
          </p>

          <div className="border border-[#2a2820] p-6 mb-8" style={{ backgroundColor: "#131210" }}>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1">Order Reference</p>
                <p className="text-xs font-medium text-[#e8e2d9]">{orderId}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1">Estimated Delivery</p>
                <p className="text-xs font-medium text-[#e8e2d9]">2 – 3 Business Days</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1">Delivery Method</p>
                <p className="text-xs font-medium text-[#c9a96e]">White-Glove</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1">Status</p>
                <p className="text-xs font-medium text-[#c9a96e]">Processing</p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[#5a5248] mb-8 tracking-wide">
            A confirmation has been sent to your registered email address.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
    onClick={() => navigate("/order-history")}
    className="px-6 py-3 border border-[#2a2820] text-[#5a5248] text-[10px] tracking-[0.25em] uppercase hover:border-[#3a3830] hover:text-[#8a8070] transition-colors"
  >
              Track Order
            </button>
            <button
    onClick={() => navigate("/")}
    className="btn-gold px-6 py-3 text-[10px] tracking-[0.25em] uppercase"
  >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    </div>;
}
export {
  OrderConfirmationPage as default
};

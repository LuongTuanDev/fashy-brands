import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import { useCart } from "@/context/CartContext";
import { formatVND, cn } from "@/lib/utils";
function CheckoutPage() {
  const { state, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState("shipping");
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    notes: ""
  });
  const [payment, setPayment] = useState({ method: "card", cardNumber: "", expiry: "", cvv: "" });
  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;
  const steps = [
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" }
  ];
  const stepIndex = (s) => steps.findIndex((x) => x.key === s);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("review");
    else {
      clearCart();
      navigate("/order-confirmation", { state: { orderId: `ATL-${Date.now().toString(36).toUpperCase()}` } });
    }
  };
  const input = (value, onChange, placeholder, type = "text", className = "") => <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={cn(
      "w-full bg-transparent border border-[#2a2820] px-4 py-3 text-xs text-[#e8e2d9] tracking-wide placeholder:text-[#3a3830] outline-none focus:border-[#c9a96e] transition-colors",
      className
    )}
  />;
  if (state.items.length === 0) {
    return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0e0e0e" }}>
        <div className="text-center">
          <p className="text-[#5a5248] mb-4">Giỏ hàng trống</p>
          <button onClick={() => navigate("/")} className="btn-gold px-8 py-3 text-[10px] tracking-[0.25em] uppercase">
            Quay lại mua sắm
          </button>
        </div>
      </div>;
  }
  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="pt-[68px]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              {steps.map((s, i) => <div key={s.key} className="flex items-center gap-3">
                  <div className={cn(
    "flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase",
    stepIndex(step) >= i ? "text-[#c9a96e]" : "text-[#3a3830]"
  )}>
                    <span className={cn(
    "w-5 h-5 text-[10px] font-semibold flex items-center justify-center border",
    stepIndex(step) >= i ? "border-[#c9a96e] text-[#c9a96e]" : "border-[#2a2820] text-[#3a3830]"
  )}>
                      {i + 1}
                    </span>
                    {s.label}
                  </div>
                  {i < steps.length - 1 && <ChevronRight size={10} className="text-[#3a3830]" />}
                </div>)}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              {step === "shipping" && <>
                  <div>
                    <h2 className="text-2xl font-serif text-[#e8e2d9] mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {input(shipping.firstName, (v) => setShipping((s) => ({ ...s, firstName: v })), "FIRST NAME")}
                      {input(shipping.lastName, (v) => setShipping((s) => ({ ...s, lastName: v })), "LAST NAME")}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {input(shipping.email, (v) => setShipping((s) => ({ ...s, email: v })), "EMAIL", "email")}
                      {input(shipping.phone, (v) => setShipping((s) => ({ ...s, phone: v })), "PHONE", "tel")}
                    </div>
                    <div className="mt-4">
                      {input(shipping.address, (v) => setShipping((s) => ({ ...s, address: v })), "STREET ADDRESS")}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {input(shipping.city, (v) => setShipping((s) => ({ ...s, city: v })), "CITY")}
                      {input(shipping.district, (v) => setShipping((s) => ({ ...s, district: v })), "DISTRICT")}
                    </div>
                    <div className="mt-4">
                      <textarea
    value={shipping.notes}
    onChange={(e) => setShipping((s) => ({ ...s, notes: e.target.value }))}
    placeholder="ORDER NOTES (optional)"
    rows={3}
    className="w-full bg-transparent border border-[#2a2820] px-4 py-3 text-xs text-[#e8e2d9] tracking-wide placeholder:text-[#3a3830] outline-none focus:border-[#c9a96e] transition-colors resize-none"
  />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248] mb-4">Delivery Method</h3>
                    <div className="space-y-2">
                      {[
    { id: "white-glove", label: "White-Glove Delivery", sub: "Complimentary \xB7 2-3 Business Days", price: "Gratis" },
    { id: "express", label: "Express Courier", sub: "Next Business Day", price: formatVND(25e4) }
  ].map((opt) => <label key={opt.id} className={cn(
    "flex items-start gap-4 p-4 border cursor-pointer transition-all",
    "border-[#c9a96e] bg-[#c9a96e]/5"
  )}>
                          <span className="w-3.5 h-3.5 mt-0.5 border border-[#c9a96e] rounded-full flex-shrink-0 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
                          </span>
                          <div className="flex-1">
                            <p className="text-xs text-[#e8e2d9] font-medium tracking-wide">{opt.label}</p>
                            <p className="text-[10px] text-[#5a5248] tracking-wide mt-0.5">{opt.sub}</p>
                          </div>
                          <span className="text-[10px] text-[#c9a96e]">{opt.price}</span>
                        </label>)}
                    </div>
                  </div>
                </>}

              {step === "payment" && <div>
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-6">Payment Method</h2>
                  <div className="space-y-2 mb-6">
                    {[
    { value: "card", label: "Credit / Debit Card" },
    { value: "bank", label: "Bank Transfer" },
    { value: "cod", label: "Cash on Delivery" }
  ].map((opt) => <label key={opt.value} className={cn(
    "flex items-center gap-4 p-4 border cursor-pointer transition-all",
    payment.method === opt.value ? "border-[#c9a96e] bg-[#c9a96e]/5" : "border-[#2a2820] hover:border-[#3a3830]"
  )}>
                        <input
    type="radio"
    className="hidden"
    checked={payment.method === opt.value}
    onChange={() => setPayment((p) => ({ ...p, method: opt.value }))}
  />
                        <span className={cn(
    "w-3.5 h-3.5 border rounded-full flex-shrink-0 flex items-center justify-center",
    payment.method === opt.value ? "border-[#c9a96e]" : "border-[#3a3830]"
  )}>
                          {payment.method === opt.value && <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />}
                        </span>
                        <span className="text-xs text-[#e8e2d9] tracking-wide">{opt.label}</span>
                      </label>)}
                  </div>

                  {payment.method === "card" && <div className="space-y-4">
                      {input(payment.cardNumber, (v) => setPayment((p) => ({ ...p, cardNumber: v })), "CARD NUMBER")}
                      <div className="grid grid-cols-2 gap-4">
                        {input(payment.expiry, (v) => setPayment((p) => ({ ...p, expiry: v })), "MM / YY")}
                        {input(payment.cvv, (v) => setPayment((p) => ({ ...p, cvv: v })), "CVV")}
                      </div>
                    </div>}
                  {payment.method === "bank" && <div className="border border-[#2a2820] p-4 space-y-2" style={{ backgroundColor: "#1a1916" }}>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248] mb-2">Bank Details</p>
                      <p className="text-xs text-[#8a8070]">Bank: Vietcombank</p>
                      <p className="text-xs text-[#8a8070]">Account: 1234567890</p>
                      <p className="text-xs text-[#8a8070]">Name: DIGITAL ATELIER VN</p>
                      <p className="text-[10px] text-[#c9a96e] mt-2">Vui lòng ghi mã đơn hàng khi chuyển khoản.</p>
                    </div>}
                </div>}

              {step === "review" && <div>
                  <h2 className="text-2xl font-serif text-[#e8e2d9] mb-6">Order Review</h2>
                  <div className="space-y-4 mb-6">
                    {state.items.map((item) => <div key={item.product.id} className="flex gap-4 items-center border-b border-[#2a2820] pb-4">
                        <div className="w-14 h-14 flex-shrink-0 overflow-hidden" style={{ backgroundColor: "#1a1916" }}>
                          <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#e8e2d9]">{item.product.name}</p>
                          <p className="text-[10px] text-[#5a5248]">x{item.quantity}</p>
                        </div>
                        <span className="text-sm text-[#c9a96e]">{formatVND(item.product.price * item.quantity)}</span>
                      </div>)}
                  </div>
                  <div className="space-y-2 text-xs text-[#5a5248] border border-[#2a2820] p-4" style={{ backgroundColor: "#1a1916" }}>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-[#8a8070]">{shipping.address || "N/A"}, {shipping.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment</span>
                      <span className="text-[#8a8070] capitalize">{payment.method === "card" ? "Credit Card" : payment.method === "bank" ? "Bank Transfer" : "Cash on Delivery"}</span>
                    </div>
                  </div>
                </div>}

              <div className="flex gap-4 pt-2">
                {step !== "shipping" && <button
    type="button"
    onClick={() => setStep(step === "review" ? "payment" : "shipping")}
    className="px-6 py-3 border border-[#3a3830] text-[#8a8070] text-[10px] tracking-[0.25em] uppercase hover:border-[#5a5248] transition-colors"
  >
                    Back
                  </button>}
                <button type="submit" className="btn-gold flex-1 py-4 text-[10px] tracking-[0.3em] uppercase font-semibold">
                  {step === "shipping" ? "Continue to Payment" : step === "payment" ? "Review Order" : "Place Order"}
                </button>
              </div>
            </form>

            <div>
              <div className="border border-[#2a2820] p-5 sticky top-24" style={{ backgroundColor: "#131210" }}>
                <h3 className="text-sm font-serif text-[#e8e2d9] mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {state.items.map((item) => <div key={item.product.id} className="flex justify-between items-start gap-2">
                      <span className="text-[10px] text-[#8a8070] tracking-wide flex-1">{item.product.name} × {item.quantity}</span>
                      <span className="text-[10px] text-[#e8e2d9] flex-shrink-0">{formatVND(item.product.price * item.quantity)}</span>
                    </div>)}
                </div>
                <div className="border-t border-[#2a2820] pt-4 space-y-2 text-[10px]">
                  <div className="flex justify-between text-[#5a5248] uppercase tracking-wide">
                    <span>Subtotal</span>
                    <span>{formatVND(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[#5a5248] uppercase tracking-wide">
                    <span>Shipping</span>
                    <span className="text-[#c9a96e]">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-[#5a5248] uppercase tracking-wide">
                    <span>Tax</span>
                    <span>{formatVND(tax)}</span>
                  </div>
                  <div className="flex justify-between text-[#e8e2d9] font-medium text-xs pt-2 border-t border-[#2a2820] uppercase tracking-wide">
                    <span>Total</span>
                    <span className="text-[#c9a96e]">{formatVND(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
}
export {
  CheckoutPage as default
};

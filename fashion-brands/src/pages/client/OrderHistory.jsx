import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
const orders = [
  {
    id: "ATL-2024-001",
    date: "10 Jan 2025",
    total: 185e5,
    status: "Delivered",
    items: [
      { name: "\xC1o Kho\xE1c Blazer Silk", price: 125e5, qty: 1, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=70" },
      { name: "Nh\u1EABn B\u1EA1c C\u1ED5 \u0110i\u1EC3n", price: 6e6, qty: 1, img: "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=200&q=70" }
    ]
  },
  {
    id: "ATL-2024-002",
    date: "22 Dec 2024",
    total: 32e6,
    status: "Processing",
    items: [
      { name: "B\u1ED9 S\u01B0u T\u1EADp Silk Limited", price: 32e6, qty: 1, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=70" }
    ]
  }
];
function formatVND(price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}
function OrderHistoryPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const statusColor = (status) => {
    if (status === "Delivered") return "text-green-500";
    if (status === "Processing") return "text-[#c9a96e]";
    if (status === "Cancelled") return "text-red-400";
    return "text-[#5a5248]";
  };
  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="pt-[68px]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
          <div className="mb-8">
            <button onClick={() => navigate("/profile")} className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-[#c9a96e] transition-colors mb-6 block">
              ← Back to Profile
            </button>
            <h1 className="text-4xl font-serif text-[#e8e2d9]">Order History</h1>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248] mt-1">Your Atelier Purchases</p>
          </div>

          {orders.length === 0 ? <div className="flex flex-col items-center py-16 text-center">
              <p className="text-4xl text-[#2a2820] mb-4">◈</p>
              <p className="text-sm text-[#5a5248]">Chưa có đơn hàng nào</p>
              <button onClick={() => navigate("/")} className="mt-4 btn-gold px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase">
                Khám Phá Ngay
              </button>
            </div> : <div className="space-y-4">
              {orders.map((order) => <div key={order.id} className="border border-[#2a2820]" style={{ backgroundColor: "#131210" }}>
                  <button
    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
    className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1a1916] transition-colors"
  >
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-[#e8e2d9] font-medium tracking-wide">{order.id}</p>
                        <p className="text-[10px] text-[#5a5248] tracking-wide mt-0.5">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#c9a96e]">{formatVND(order.total)}</p>
                        <p className={cn("text-[10px] tracking-[0.2em] uppercase mt-0.5", statusColor(order.status))}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
    size={14}
    className={cn("text-[#5a5248] transition-transform", expandedId === order.id && "rotate-180")}
  />
                  </button>

                  {expandedId === order.id && <div className="border-t border-[#2a2820] p-5 space-y-4">
                      {order.items.map((item, i) => <div key={i} className="flex gap-4 items-center">
                          <div className="w-14 h-14 flex-shrink-0 overflow-hidden" style={{ backgroundColor: "#1a1916" }}>
                            <img src={item.img} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-[#e8e2d9]">{item.name}</p>
                            <p className="text-[10px] text-[#5a5248]">x{item.qty}</p>
                          </div>
                          <span className="text-sm text-[#c9a96e]">{formatVND(item.price)}</span>
                        </div>)}
                      <div className="border-t border-[#2a2820] pt-4 flex justify-between items-center">
                        <p className="text-[10px] text-[#5a5248] tracking-wide uppercase">Total</p>
                        <p className="text-sm font-medium text-[#c9a96e]">{formatVND(order.total)}</p>
                      </div>
                      <div className="flex gap-3">
                        <button className="text-[9px] tracking-[0.2em] uppercase border border-[#2a2820] px-3 py-2 text-[#5a5248] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors">
                          Track Order
                        </button>
                        {order.status === "Delivered" && <button className="text-[9px] tracking-[0.2em] uppercase border border-[#2a2820] px-3 py-2 text-[#5a5248] hover:border-[#3a3830] transition-colors">
                            Leave Review
                          </button>}
                      </div>
                    </div>}
                </div>)}
            </div>}
        </div>
      </main>
      <Footer />
    </div>;
}
export {
  OrderHistoryPage as default
};

import { ChevronDown } from "lucide-react";
import { OrderStatusTracker } from "./OrderStatusTracker";
import { useTranslation } from "react-i18next";

export const OrderCard = ({ order, onStatusChange, onViewDetail }) => {
  const { t } = useTranslation();
  const isDelivered = order.status === "COMPLETED";

  const STATUS_OPTIONS = [
    { value: "PENDING", label: t("admin.pending") },
    { value: "PACKING", label: t("admin.packing") },
    { value: "SHIPPING", label: t("admin.shipping") },
    { value: "COMPLETED", label: t("admin.completed") }
  ];

  return (
    <div className="border border-[#ffffff10] bg-[#1a1a1a] p-5 mb-4 hover:bg-[#1f1f1f] transition-colors">
      <div className="flex items-start gap-4">

        {/* Ảnh */}
        <div className="w-[72px] h-[72px] bg-[#0e0e0e] border border-[#ffffff08] flex-shrink-0 overflow-hidden">
          <img
            src={order.image}
            alt={order.productName}
            className="w-full h-full object-cover"
            onError={(e) => e.target.style.display = "none"}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[1.5px] text-[#fac493] [font-family:'Manrope-Regular',Helvetica] mb-0.5">
            {t("common.order") || "ORDER"} #{order.code}
          </p>
          <p className="text-[15px] text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-0.5">
            {order.customerName}
          </p>
          <p className="text-[10px] text-[#ffffff35] uppercase tracking-wider [font-family:'Manrope-Regular',Helvetica] truncate">
            {order.productName}
          </p>
        </div>

        {/* Giá */}
        <div className="text-right flex-shrink-0">
          <p className="text-[16px] text-[#fac493] [font-family:'Manrope-Regular',Helvetica]">
            {order.price.toLocaleString("vi-VN")}₫
          </p>
          <p className="text-[9px] text-[#ffffff35] tracking-wider mt-0.5 [font-family:'Manrope-Regular',Helvetica]">
            {order.paymentMethod}
          </p>
          {order.deliveredDate && (
            <p className="text-[9px] text-[#7dd3a8] mt-0.5 [font-family:'Manrope-Regular',Helvetica]">
              {t("admin.completed")} · {order.deliveredDate}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0 ml-4 min-w-[130px]">
          {isDelivered ? (
            <div className="px-4 py-2 border border-[#7dd3a860] text-center text-[9px] tracking-[1.5px] text-[#7dd3a8] [font-family:'Manrope-Bold',Helvetica]">
              {t("admin.completed").toUpperCase()}
            </div>
          ) : (
            <div className="relative">
              <select
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
                className="w-full appearance-none bg-[#0e0e0e] border border-[#ffffff15] px-3 py-2 text-[9px] tracking-[1px] text-[#e8e2d9] outline-none cursor-pointer pr-7 [font-family:'Manrope-Regular',Helvetica]"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value} className="bg-[#0e0e0e]">{s.label}</option>
                ))}
              </select>
              <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none" />
            </div>
          )}
          <button
            onClick={() => onViewDetail(order)}
            className="w-full py-2 border border-[#ffffff15] text-[9px] tracking-[1.5px] text-[#ffffff50] hover:text-[#ffffff80] hover:border-[#ffffff30] transition-colors [font-family:'Manrope-Regular',Helvetica]"
          >
            {t("admin.view_detail") || "VIEW DETAILS"}
          </button>
        </div>
      </div>

      {/* Tracker */}
      <div className="mt-2 pl-[88px]">
        <OrderStatusTracker currentStep={order.status} />
      </div>
    </div>
  );
};
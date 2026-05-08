import { TrendingUp } from "lucide-react";

export const OrderStatsSection = ({ stats }) => {
  const { pending = 4, processing = 8, completed = 142 } = stats || {};
  return (
    <div className="border border-[#ffffff10] bg-[#1a1a1a] p-6">
      <TrendingUp size={16} className="text-[#ffffff30] mb-4" />
      <h3 className="text-xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-1">
        Tình trạng vận hành
      </h3>
      <p className="text-[11px] text-[#ffffff40] leading-relaxed [font-family:'Manrope-Regular',Helvetica] mb-6">
        Theo dõi luồng xử lý đơn hàng trong thời gian thực để tối ưu hóa trải nghiệm khách hàng thượng lưu.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "CHỜ XÁC NHẬN", value: String(pending).padStart(2, "0"),    color: "text-[#e8e2d9]" },
          { label: "ĐANG XỬ LÝ",   value: String(processing).padStart(2, "0"), color: "text-[#fac493]" },
          { label: "THÀNH CÔNG",    value: String(completed),                   color: "text-[#7dd3a8]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="border border-[#ffffff10] bg-[#0e0e0e] px-4 py-3">
            <p className="text-[8px] tracking-[1.5px] text-[#ffffff40] mb-2 [font-family:'Manrope-Regular',Helvetica]">
              {label}
            </p>
            <p className={`text-2xl font-light [font-family:'Noto_Serif-Regular',Helvetica] ${color}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
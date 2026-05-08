import { Star } from "lucide-react";

export const VIPBanner = ({ count = 3 }) => (
  <div className="border border-[#fac49320] bg-[#1a1a1a] p-5 flex flex-col justify-between h-full">
    <div className="flex items-start justify-between mb-3">
      <Star size={16} className="text-[#fac493]" />
      <span className="text-[9px] tracking-[2px] text-[#fac493] border border-[#fac49340] px-2 py-0.5 [font-family:'Manrope-Bold',Helvetica]">
        PRIORITY
      </span>
    </div>
    <div>
      <h3 className="text-xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-2">
        Đơn hàng VIP
      </h3>
      <p className="text-[11px] text-[#ffffff40] leading-relaxed [font-family:'Manrope-Regular',Helvetica] mb-5">
        {count} đơn hàng từ khách hàng Kim Cương đang chờ ưu tiên xử lý đóng gói thủ công.
      </p>
      <button className="w-full py-2 border border-[#fac49340] text-[9px] tracking-[2px] text-[#fac493] hover:bg-[#fac49315] transition-colors [font-family:'Manrope-Bold',Helvetica]">
        PROCESS NOW
      </button>
    </div>
  </div>
);
import { useTranslation } from "react-i18next";

const STEPS = ["PENDING", "PACKING", "SHIPPING", "COMPLETED"];

export const OrderStatusTracker = ({ currentStep }) => {
  const { t } = useTranslation();
  const current = STEPS.indexOf(currentStep);

  return (
    <div className="flex items-center gap-0 mt-4">
      {STEPS.map((step, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors
                ${done   ? "bg-[#c9a96e] border-[#c9a96e]" : ""}
                ${active ? "bg-[#c9a96e20] border-[#c9a96e]" : ""}
                ${!done && !active ? "bg-transparent border-[#ffffff20]" : ""}`}
              >
                {done && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#0d0b09" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {active && (
                  <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                )}
              </div>
              <span className={`text-[8px] tracking-[1px] whitespace-nowrap [font-family:'Manrope-Regular',Helvetica]
                ${active || done ? "text-[#c9a96e]" : "text-[#ffffff25]"}`}>
                {t(`admin.${step.toLowerCase()}`)}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-1 mb-4 transition-colors
                ${done ? "bg-[#c9a96e]" : "bg-[#ffffff15]"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
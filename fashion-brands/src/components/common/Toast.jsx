import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
const ToastContext = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3e3);
  }, []);
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  return <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map((toast) => <div
    key={toast.id}
    className={cn(
      "flex items-center gap-3 px-4 py-3 text-sm font-medium animate-slide-down",
      "bg-[#1f1e1d] border min-w-[280px] max-w-sm",
      toast.type === "success" && "border-[#c9a96e]/30 text-[#e8e2d9]",
      toast.type === "error" && "border-red-800/50 text-[#e8e2d9]",
      toast.type === "info" && "border-[#3a3830] text-[#e8e2d9]"
    )}
  >
            {toast.type === "success" && <CheckCircle size={16} className="text-[#c9a96e] flex-shrink-0" />}
            {toast.type === "error" && <AlertCircle size={16} className="text-red-400 flex-shrink-0" />}
            {toast.type === "info" && <Info size={16} className="text-[#8a8070] flex-shrink-0" />}
            <span className="flex-1 text-xs tracking-wide">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-[#5a5248] hover:text-[#e8e2d9] flex-shrink-0">
              <X size={14} />
            </button>
          </div>)}
      </div>
    </ToastContext.Provider>;
}
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
}
export {
  ToastProvider,
  useToast
};

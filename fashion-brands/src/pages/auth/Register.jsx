import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    fullName: "", 
    shopName: "", 
    email: "", 
    password: "",
    confirmPassword: "" 
  });
  const [accountType, setAccountType] = useState('client');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error(t("auth.register.error_match"));
    }
    
    setLoading(true);
    try {
      await authService.signUp(form.email, form.password, { 
        full_name: form.fullName,
        shop_name: accountType === 'seller' ? form.shopName : null,
        role: accountType
      });
      toast.success(t("auth.register.success"));
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Background Image - very blurred and dark */}
      <div className="absolute inset-0 z-0">
        <img
          src="/opengraph.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20 blur-sm grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 via-[#0f0f0f]/90 to-[#0f0f0f]"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[460px] bg-[#222222]/80 backdrop-blur-md p-10 md:p-14 shadow-2xl border border-white/5 rounded-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-3xl font-serif tracking-[0.3em] text-[#e6c196] mb-3 uppercase">
            Fashy
          </Link>
          <p className="text-[9px] tracking-[0.2em] text-[#888888] uppercase font-medium">
            {accountType === 'seller' ? t("auth.register.seller_subtitle") : t("auth.register.subtitle")}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex border border-white/10 rounded-full p-1 mb-8">
          <button
            type="button"
            onClick={() => setAccountType('client')}
            className={`flex-1 py-2.5 text-[9px] uppercase tracking-[0.2em] rounded-full transition-all ${accountType === 'client' ? 'bg-[#e6c196] text-black font-bold shadow-md' : 'text-[#888888] hover:text-white'}`}
          >
            {t("auth.register.customer")}
          </button>
          <button
            type="button"
            onClick={() => setAccountType('seller')}
            className={`flex-1 py-2.5 text-[9px] uppercase tracking-[0.2em] rounded-full transition-all ${accountType === 'seller' ? 'bg-[#e6c196] text-black font-bold shadow-md' : 'text-[#888888] hover:text-white'}`}
          >
            {t("auth.register.seller")}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[9px] uppercase tracking-widest text-[#888888]">{t("auth.register.full_name")}</label>
            <input 
              type="text" 
              required
              placeholder="John Doe"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors"
            />
          </div>

          {accountType === 'seller' && (
            <div className="space-y-2 animate-fade-in">
              <label className="block text-[9px] uppercase tracking-widest text-[#888888]">{t("auth.register.boutique_name")}</label>
              <input 
                type="text" 
                required={accountType === 'seller'}
                placeholder="My Luxury Shop"
                value={form.shopName}
                onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-[9px] uppercase tracking-widest text-[#888888]">{t("auth.register.email")}</label>
            <input 
              type="email" 
              required
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[9px] uppercase tracking-widest text-[#888888]">{t("auth.register.password")}</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors tracking-widest"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[9px] uppercase tracking-widest text-[#888888]">{t("auth.register.confirm_password")}</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors tracking-widest"
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#e6c196] hover:bg-[#f5cca3] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors disabled:opacity-50"
            >
              {loading ? t("auth.register.registering") : accountType === 'seller' ? t("auth.register.submit_seller") : t("auth.register.submit_customer")}
            </button>
          </div>
        </form>

        <div className="text-center pt-8">
          <p className="text-[9px] tracking-widest text-[#888888] uppercase">
            {t("auth.register.already_member")} <Link to="/login" className="text-[#e6c196] font-bold hover:underline ml-1">{t("auth.register.sign_in")}</Link>
          </p>
        </div>
      </div>

      {/* Page Footer */}
      <div className="absolute bottom-6 w-full px-12 flex justify-between items-center text-[8px] uppercase tracking-[0.2em] text-[#555555] z-10 hidden md:flex">
        <span>© 2026 THE DIGITAL FASHY. {t("auth.footer.rights")}</span>
        <div className="flex gap-8">
          <Link to="#" className="hover:text-[#888888] transition-colors">{t("auth.footer.privacy")}</Link>
          <Link to="#" className="hover:text-[#888888] transition-colors">{t("auth.footer.terms")}</Link>
        </div>
      </div>
    </div>
  );
}

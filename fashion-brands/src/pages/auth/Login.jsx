import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("fashy_remember_email");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await authService.signIn(form.email, form.password);
      if (rememberMe) {
        localStorage.setItem("fashy_remember_email", form.email);
      } else {
        localStorage.removeItem("fashy_remember_email");
      }
      toast.success(t("auth.login.welcome_back"));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(t("auth.login.error_invalid"));
      toast.error(t("auth.login.error_invalid"));
      setForm((prev) => ({ ...prev, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #222222 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>
      
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
        <div className="text-center mb-12">
          <Link to="/" className="inline-block text-3xl font-serif tracking-[0.3em] text-[#e6c196] mb-3 uppercase">
            Fashy
          </Link>
          <p className="text-[9px] tracking-[0.2em] text-[#888888] uppercase font-medium">
            {t("auth.login.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {errorMsg && (
            <div className="bg-[#ff4444]/10 border border-[#ff4444]/20 p-3 rounded text-center animate-fade-in">
              <p className="text-[9px] text-[#ff4444] uppercase tracking-widest">{errorMsg}</p>
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[9px] uppercase tracking-widest text-[#888888]">
              {t("auth.login.email")}
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-[9px] uppercase tracking-widest text-[#888888]">
                {t("auth.login.password")}
              </label>
              <Link to="/forgot-password" className="text-[9px] uppercase tracking-widest text-[#a69888] hover:text-[#e6c196] transition-colors">
                {t("auth.login.forgot_password")}
              </Link>
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors tracking-widest"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer appearance-none w-4 h-4 border border-white/20 bg-transparent checked:bg-transparent transition-all" 
                />
                <svg className="absolute w-2.5 h-2.5 text-[#e6c196] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[9px] uppercase tracking-[0.15em] text-[#888888] group-hover:text-white transition-colors select-none">
                {t("auth.login.remember_me")}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e6c196] hover:bg-[#f5cca3] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors disabled:opacity-50"
            >
              {loading ? t("auth.login.authenticating") : t("auth.login.submit")}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px bg-white/5 flex-1"></div>
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#555555]">{t("auth.login.or_continue_with")}</span>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <button type="button" className="flex items-center justify-center gap-2 border border-white/10 py-3 hover:bg-white/5 transition-colors">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-[9px] uppercase tracking-widest text-white">Google</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-2 border border-white/10 py-3 hover:bg-white/5 transition-colors">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" opacity="0" />
              <path d="M17.05 20.28c-.98.54-2.06.84-3.18.84-3.9 0-7.07-3.17-7.07-7.07s3.17-7.07 7.07-7.07c1.12 0 2.2.3 3.18.84V4.54C15.52 3.56 13.82 3 12 3 7.03 3 3 7.03 3 12s4.03 9 9 9c1.82 0 3.52-.56 5.05-1.54v-3.26l-.05.08z" fill="none" />
              <path d="M16.36 10.45c-.24-1.64-1.39-2.99-3.05-3.32-.23.95-.79 1.83-1.6 2.45-.8.61-1.8.94-2.82.94-.57 0-1.14-.11-1.68-.31-.54-.2-1.03-.49-1.46-.86l-.16.32c.54 1.5 1.76 2.65 3.33 3 1.56.35 3.2-.07 4.38-1.12l1.06-1.1z" />
              <path d="M14.94 6.78c.84-.98 1.34-2.27 1.39-3.63-1.29.07-2.56.63-3.48 1.58-.85.88-1.39 2.11-1.47 3.42 1.34.07 2.64-.47 3.56-1.37z" />
              <path d="M16.34 11.55c-.71.55-1.57.85-2.45.87-1.12.01-2.22-.38-3.08-1.07-.86-.68-1.43-1.65-1.6-2.73-.02-.15-.04-.3-.04-.45-1.43.3-2.67 1.25-3.41 2.59-.74 1.34-.94 2.92-.56 4.38.38 1.46 1.27 2.72 2.48 3.53 1.21.8 2.69 1.12 4.14.89 1.46-.23 2.77-1 3.65-2.14l-2.02-2.1c-.51.66-1.22 1.13-2.02 1.34-.81.21-1.67.13-2.43-.22-.76-.36-1.39-1-1.78-1.8-.39-.81-.51-1.72-.32-2.59.18-.87.67-1.63 1.35-2.15.68-.53 1.52-.77 2.37-.69.85.08 1.63.48 2.21 1.14l1.51-1.59z" />
            </svg>
            <span className="text-[9px] uppercase tracking-widest text-white">Apple</span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <p className="text-[9px] tracking-widest text-[#888888] uppercase">
            {t("auth.login.new_to_fashy")} <Link to="/register" className="text-[#e6c196] font-bold hover:underline ml-1">{t("auth.login.register_now")}</Link>
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

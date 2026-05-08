import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { useToast } from "@/components/common/Toast";
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    showToast("Link \u0111\u1EB7t l\u1EA1i m\u1EADt kh\u1EA9u \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi!");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Background Image - very blurred and dark */}
      <div className="absolute inset-0 z-0">
        <img
          src="/luxury_fashion_auth_bg_1777713068415.png"
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
            Account Recovery
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-[9px] uppercase tracking-widest text-[#888888]">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e6c196] transition-colors"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e6c196] hover:bg-[#f5cca3] text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Recovery Link"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto border border-[#e6c196]/30 rounded-full flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#e6c196]">
                <path d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm text-white mb-2">Recovery link sent</p>
            <p className="text-xs text-[#888888] mb-8">Please check the inbox of {email}</p>
            <button
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="text-[9px] uppercase tracking-[0.2em] text-[#e6c196] hover:underline"
            >
              Try another email
            </button>
          </div>
        )}

        <div className="text-center pt-10">
          <Link to="/login" className="text-[9px] uppercase tracking-[0.2em] text-[#888888] hover:text-[#e6c196] transition-colors">
            ← Back to Sign In
          </Link>
        </div>
      </div>

      {/* Page Footer */}
      <div className="absolute bottom-6 w-full px-12 flex justify-between items-center text-[8px] uppercase tracking-[0.2em] text-[#555555] z-10 hidden md:flex">
        <span>© 2026 THE DIGITAL FASHY. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-8">
          <Link to="#" className="hover:text-[#888888] transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-[#888888] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
export {
  ForgotPasswordPage as default
};

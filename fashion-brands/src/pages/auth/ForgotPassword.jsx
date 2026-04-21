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
  return <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="flex-1 flex items-center justify-center pt-[68px] px-6">
        <div className="w-full max-w-sm py-16">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">Account Recovery</p>
            <h1 className="text-3xl font-serif text-[#e8e2d9]">Reset Password</h1>
            <p className="text-xs text-[#5a5248] mt-2 max-w-xs mx-auto">
              Enter your email and we will send a recovery link.
            </p>
          </div>

          {!sent ? <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1.5">Email Address</label>
                <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="client@atelier.vn"
    className="w-full bg-transparent border border-[#2a2820] px-4 py-3 text-xs text-[#e8e2d9] placeholder:text-[#3a3830] outline-none focus:border-[#c9a96e] transition-colors tracking-wide"
  />
              </div>
              <button
    type="submit"
    disabled={loading}
    className="btn-gold w-full py-3.5 text-[10px] tracking-[0.3em] uppercase font-semibold disabled:opacity-60"
  >
                {loading ? "Sending..." : "Send Recovery Link"}
              </button>
            </form> : <div className="text-center border border-[#2a2820] p-8" style={{ backgroundColor: "#131210" }}>
              <div className="w-12 h-12 mx-auto border border-[#c9a96e]/30 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#c9a96e]">
                  <path d="M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-[#e8e2d9] mb-2">Email đã được gửi</p>
              <p className="text-xs text-[#5a5248] mb-4">Kiểm tra hộp thư {email}</p>
              <button onClick={() => {
    setSent(false);
    setEmail("");
  }} className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] hover:underline">
                Try another email
              </button>
            </div>}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-[9px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-[#c9a96e] transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>;
}
export {
  ForgotPasswordPage as default
};

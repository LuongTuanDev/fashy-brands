import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { useToast } from "@/components/common/Toast";
function RegisterPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      showToast("M\u1EADt kh\u1EA9u x\xE1c nh\u1EADn kh\xF4ng kh\u1EDBp", "error");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    showToast("T\xE0i kho\u1EA3n \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o th\xE0nh c\xF4ng!");
    navigate("/profile");
  };
  return <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />
      <main className="flex-1 flex items-center justify-center pt-[68px] px-6">
        <div className="w-full max-w-sm py-16">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-3">Exclusive Access</p>
            <h1 className="text-3xl font-serif text-[#e8e2d9]">Join Atelier</h1>
            <p className="text-xs text-[#5a5248] mt-2">Create your private account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1.5">Full Name</label>
              <input
    type="text"
    required
    value={form.name}
    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
    placeholder="Your Name"
    className="w-full bg-transparent border border-[#2a2820] px-4 py-3 text-xs text-[#e8e2d9] placeholder:text-[#3a3830] outline-none focus:border-[#c9a96e] transition-colors"
  />
            </div>
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1.5">Email</label>
              <input
    type="email"
    required
    value={form.email}
    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
    placeholder="client@atelier.vn"
    className="w-full bg-transparent border border-[#2a2820] px-4 py-3 text-xs text-[#e8e2d9] placeholder:text-[#3a3830] outline-none focus:border-[#c9a96e] transition-colors"
  />
            </div>
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1.5">Password</label>
              <input
    type="password"
    required
    value={form.password}
    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
    placeholder="••••••••"
    className="w-full bg-transparent border border-[#2a2820] px-4 py-3 text-xs text-[#e8e2d9] placeholder:text-[#3a3830] outline-none focus:border-[#c9a96e] transition-colors"
  />
            </div>
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-[#5a5248] mb-1.5">Confirm Password</label>
              <input
    type="password"
    required
    value={form.confirm}
    onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
    placeholder="••••••••"
    className="w-full bg-transparent border border-[#2a2820] px-4 py-3 text-xs text-[#e8e2d9] placeholder:text-[#3a3830] outline-none focus:border-[#c9a96e] transition-colors"
  />
            </div>

            <button
    type="submit"
    disabled={loading}
    className="btn-gold w-full py-3.5 text-[10px] tracking-[0.3em] uppercase font-semibold mt-2 disabled:opacity-60"
  >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#5a5248]">
              Already a member?{" "}
              <Link to="/login" className="text-[#c9a96e] hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>;
}
export {
  RegisterPage as default
};

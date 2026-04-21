import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/common/Toast";
function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast("\u0110\u0103ng k\xFD nh\u1EADn tin th\xE0nh c\xF4ng!");
      setEmail("");
    }
  };
  return <footer className="bg-[#0a0a0a] border-t border-[#2a2820] mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <p className="text-xl font-serif tracking-[0.3em] text-[#c9a96e] mb-4">ATELIER</p>
            <p className="text-xs text-[#5a5248] leading-relaxed font-light max-w-[200px]">
              Defining the frontier of luxury where heritage meets the digital future.
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8070] mb-6 font-medium">Discovery</p>
            <ul className="space-y-3">
              {["The Story", "Craftsmanship", "Sustainability"].map((item) => <li key={item}>
                  <Link to="/" className="text-xs text-[#5a5248] hover:text-[#c9a96e] transition-colors tracking-wide">
                    {item}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8070] mb-6 font-medium">Assistance</p>
            <ul className="space-y-3">
              {[
    { label: "Contact", to: "/" },
    { label: "Shipping", to: "/" },
    { label: "Returns", to: "/" }
  ].map((item) => <li key={item.label}>
                  <Link to={item.to} className="text-xs text-[#5a5248] hover:text-[#c9a96e] transition-colors tracking-wide">
                    {item.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8a8070] mb-6 font-medium">The Journal</p>
            <form onSubmit={handleSubscribe} className="flex items-center border border-[#2a2820] hover:border-[#3a3830] transition-colors">
              <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="JOIN THE LIST"
    className="flex-1 bg-transparent text-[10px] tracking-[0.2em] text-[#5a5248] placeholder:text-[#3a3830] px-3 py-2.5 outline-none"
  />
              <button type="submit" className="px-3 text-[#5a5248] hover:text-[#c9a96e] transition-colors">
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-[#2a2820]">
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#3a3830]">
            © 2025 The Digital Atelier. All Rights Reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Instagram", "Pinterest", "Twitter"].map((s) => <Link key={s} to="/" className="text-[9px] tracking-[0.2em] uppercase text-[#3a3830] hover:text-[#c9a96e] transition-colors">
                {s}
              </Link>)}
          </div>
        </div>
      </div>
    </footer>;
}
export {
  Footer as default
};

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, X, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { allProducts } from "@/data/products";
function Header() {
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const searchResults = searchQuery.length > 1 ? allProducts.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.collection || "").toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5) : [];
  const navLinks = [
    { to: "/apparel", label: "APPAREL" },
    { to: "/jewelry", label: "JEWELRY" },
    { to: "/accessories", label: "ACCESSORIES" }
  ];
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };
  return <>
      {searchOpen && <div
    className="fixed inset-0 z-[200] flex flex-col items-center pt-[15vh] px-6 animate-fade-in"
    style={{ backgroundColor: "rgba(14,14,14,0.97)", backdropFilter: "blur(8px)" }}
  >
          <button
    className="absolute top-6 right-6 text-[#5a5248] hover:text-[#e8e2d9] transition-colors"
    onClick={closeSearch}
  >
            <X size={24} />
          </button>
          <div className="w-full max-w-2xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248] mb-4">Tìm kiếm</p>
            <input
    autoFocus
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && searchResults.length > 0) {
        navigate(`/product/${searchResults[0].id}`);
        closeSearch();
      }
      if (e.key === "Escape") closeSearch();
    }}
    placeholder="Tìm kiếm sản phẩm..."
    className="w-full bg-transparent border-b border-[#3a3830] focus:border-[#c9a96e] text-[#e8e2d9] text-2xl font-light pb-3 outline-none placeholder:text-[#3a3830] font-serif transition-colors"
  />
            {searchResults.length > 0 && <div className="mt-6 space-y-1">
                {searchResults.map((p) => <button
    key={p.id}
    onClick={() => {
      navigate(`/product/${p.id}`);
      closeSearch();
    }}
    className="w-full text-left flex items-center gap-4 p-3 hover:bg-[#1f1e1d] transition-colors"
  >
                    <div className="w-12 h-12 flex-shrink-0 bg-[#1a1916] overflow-hidden">
                      <img
    src={p.images[0]}
    alt={p.name}
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
                    </div>
                    <div>
                      <p className="text-sm text-[#e8e2d9]">{p.name}</p>
                      <p className="text-xs text-[#8a8070]">{p.collection}</p>
                    </div>
                  </button>)}
              </div>}
            {searchQuery.length > 1 && searchResults.length === 0 && <p className="mt-6 text-sm text-[#5a5248]">Không tìm thấy kết quả nào cho "{searchQuery}"</p>}
          </div>
        </div>}

      {mobileOpen && <div className="fixed inset-0 bg-[#0e0e0e] z-[150] flex flex-col animate-fade-in md:hidden">
          <div className="flex justify-between items-center px-6 py-5 border-b border-[#2a2820]">
            <Link to="/" className="text-xl font-serif tracking-[0.3em] text-[#c9a96e]">ATELIER</Link>
            <button onClick={() => setMobileOpen(false)}><X size={22} className="text-[#8a8070]" /></button>
          </div>
          <nav className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => <NavLink
    key={link.to}
    to={link.to}
    onClick={() => setMobileOpen(false)}
    className={({ isActive }) => cn(
      "text-2xl font-serif tracking-wider",
      isActive ? "text-[#c9a96e]" : "text-[#e8e2d9]"
    )}
  >
                {link.label}
              </NavLink>)}
            <div className="mt-8 pt-8 border-t border-[#2a2820] flex flex-col gap-4">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-[#8a8070] tracking-widest uppercase">Đăng nhập</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="text-sm text-[#8a8070] tracking-widest uppercase">Đăng ký</Link>
            </div>
          </nav>
        </div>}

      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-[#2a2820]/50" style={{ backgroundColor: "rgba(14,14,14,0.96)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center justify-between px-6 md:px-12 h-[68px]">
          <Link to="/" className="text-xl md:text-2xl font-serif tracking-[0.35em] text-[#c9a96e] flex-shrink-0">
            ATELIER
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => <NavLink
    key={link.to}
    to={link.to}
    className={({ isActive }) => cn(
      "text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 pb-1",
      isActive ? "text-[#e8e2d9] border-b border-[#c9a96e]" : "text-[#8a8070] hover:text-[#e8e2d9]"
    )}
  >
                {link.label}
              </NavLink>)}
          </nav>

          <div className="flex items-center gap-4">
            <button
    onClick={() => setSearchOpen(true)}
    className="text-[#8a8070] hover:text-[#e8e2d9] transition-colors p-1"
    aria-label="Search"
  >
              <Search size={18} />
            </button>
            <button
    onClick={() => navigate("/cart")}
    className="relative text-[#8a8070] hover:text-[#e8e2d9] transition-colors p-1"
    aria-label="Cart"
  >
              <ShoppingBag size={18} />
              {totalItems > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c9a96e] text-[#1a1208] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>}
            </button>
            <Link to="/profile" className="text-[#8a8070] hover:text-[#e8e2d9] transition-colors hidden md:block p-1" aria-label="Profile">
              <User size={18} />
            </Link>
            <button
    className="md:hidden text-[#8a8070] hover:text-[#e8e2d9] p-1"
    onClick={() => setMobileOpen(true)}
    aria-label="Menu"
  >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
    </>;
}
export {
  Header as default
};

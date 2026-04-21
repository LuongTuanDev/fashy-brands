import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/common/ProductCard";
import { getBestSellers, allProducts } from "@/data/products";
const heroImg = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85";
const apparelImg = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80";
const jewelryImg = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80";
const accessoriesImg = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80";
const editorialImg = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80";
function HomePage() {
  const navigate = useNavigate();
  const bestSellers = getBestSellers(4);
  const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 4);
  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />

      <section className="relative flex items-end overflow-hidden" style={{ height: "100vh", minHeight: "600px" }}>
        <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${heroImg})` }}
  />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0e0e 0%, rgba(14,14,14,0.3) 50%, transparent 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full">
          <div className="max-w-lg">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-4">Bộ Sưu Tập Mới</p>
            <h1 className="text-5xl md:text-7xl font-serif italic text-[#e8e2d9] leading-tight mb-6">
              New<br />Collection
            </h1>
            <p className="text-sm text-[#8a8070] leading-relaxed mb-8 max-w-sm">
              Crafted for those who seek the extraordinary. Where digital precision meets artisanal soul.
            </p>
            <button
    onClick={() => navigate("/apparel")}
    className="btn-gold px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase inline-flex items-center gap-2"
  >
              Khám Phá Ngay
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 right-12 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, #c9a96e, transparent)" }} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
    { label: "Apparel", sub: "Trang Ph\u1EE5c Cao C\u1EA5p", img: apparelImg, to: "/apparel" },
    { label: "Jewelry", sub: "Trang S\u1EE9c Th\u01B0\u1EE3ng H\u1EA1ng", img: jewelryImg, to: "/jewelry" },
    { label: "Accessories", sub: "Ph\u1EE5 Ki\u1EC7n Xa X\u1EC9", img: accessoriesImg, to: "/accessories" }
  ].map((cat) => <button
    key={cat.label}
    onClick={() => navigate(cat.to)}
    className="group relative overflow-hidden text-left"
    style={{ aspectRatio: "3/4" }}
  >
              <img
    src={cat.img}
    alt={cat.label}
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,14,0.85) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-1">{cat.label}</p>
                <h3 className="text-xl font-serif italic text-[#e8e2d9]">{cat.sub}</h3>
              </div>
            </button>)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-2">Được Yêu Thích</p>
            <h2 className="text-4xl font-serif text-[#e8e2d9]">Best Sellers</h2>
          </div>
          <button
    onClick={() => navigate("/apparel")}
    className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-[#c9a96e] transition-colors flex items-center gap-1"
  >
            Xem tất cả <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-2">Mới Nhất</p>
            <h2 className="text-4xl font-serif text-[#e8e2d9]">New Arrivals</h2>
          </div>
          <button
    onClick={() => navigate("/jewelry")}
    className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-[#c9a96e] transition-colors flex items-center gap-1"
  >
            Xem tất cả <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={editorialImg} alt="Editorial" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(14,14,14,0.4)" }} />
          </div>
          <div className="flex flex-col justify-center px-12 py-16" style={{ backgroundColor: "#1a1916" }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">The Atelier</p>
            <h2 className="text-3xl md:text-4xl font-serif leading-snug text-[#e8e2d9] mb-6">
              Craftsmanship in<br />the Digital Age
            </h2>
            <p className="text-sm text-[#5a5248] leading-relaxed mb-8 max-w-sm">
              Defining the frontier of luxury where heritage meets the digital future. Each piece is a testament to the marriage of tradition and innovation.
            </p>
            <button className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-[9px] tracking-[0.3em] uppercase self-start">
              Atelier <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
}
export {
  HomePage as default
};

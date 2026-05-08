import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/common/ProductCard";
import { useState, useEffect } from "react";
import { productService } from "@/services/productService";
import { useTranslation } from "react-i18next";

const heroImg = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=85";
const apparelImg = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80";
const jewelryImg = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80";
const accessoriesImg = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80";
const editorialImg = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80";

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const products = await productService.getAllPublicProducts();
        
        // Transform Supabase data to match component expectations
        const transformed = products.map(p => ({
          ...p,
          collection: p.brands?.name || "FASHY",
          price: p.price || 0
        }));

        setBestSellers(transformed.slice(0, 4));
        setNewArrivals(transformed.filter(p => p.is_new).slice(0, 4));
      } catch (error) {
        console.error("Error loading home products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
      <Header />

      <section className="relative flex items-end overflow-hidden" style={{ height: "100vh", minHeight: "600px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0e0e 0%, rgba(14,14,14,0.3) 50%, transparent 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full">
          <div className="max-w-lg">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-4">{t("client.hero.new_collection")}</p>
            <h1 className="text-5xl md:text-7xl font-serif italic text-[#e8e2d9] leading-tight mb-6">
              FASHY<br />Collection
            </h1>
            <p className="text-sm text-[#8a8070] leading-relaxed mb-8 max-w-sm">
              {t("client.hero.tagline")}
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3.5 bg-[#c9a96e] text-[#1a1208] text-[10px] tracking-[0.3em] uppercase inline-flex items-center gap-2 hover:bg-[#ddb87a] transition-colors"
            >
              {t("client.hero.explore")}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: t("client.nav.apparel"), sub: t("client.sections.categories.apparel"), img: apparelImg, to: "/shop?cat=apparel" },
            { label: t("client.nav.jewelry"), sub: t("client.sections.categories.jewelry"), img: jewelryImg, to: "/shop?cat=jewelry" },
            { label: t("client.nav.accessories"), sub: t("client.sections.categories.accessories"), img: accessoriesImg, to: "/shop?cat=accessories" }
          ].map((cat) => (
            <button
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
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-10 h-10 text-[#fac493] animate-spin" />
          <p className="text-[10px] tracking-[2px] text-[#ffffff40] uppercase">{t("admin.loading")}</p>
        </div>
      ) : (
        <>
          <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-2">{t("client.sections.favorites")}</p>
                <h2 className="text-4xl font-serif text-[#e8e2d9] italic">{t("client.sections.best_sellers")}</h2>
              </div>
              <button
                onClick={() => navigate("/shop")}
                className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-[#c9a96e] transition-colors flex items-center gap-1"
              >
                {t("client.sections.view_all")} <ArrowRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a96e] mb-2">{t("client.sections.new_arrivals")}</p>
                <h2 className="text-4xl font-serif text-[#e8e2d9] italic">{t("client.sections.new_arrivals")}</h2>
              </div>
              <button
                onClick={() => navigate("/shop")}
                className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-[#c9a96e] transition-colors flex items-center gap-1"
              >
                {t("client.sections.view_all")} <ArrowRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <img src={editorialImg} alt="Editorial" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(14,14,14,0.4)" }} />
          </div>
          <div className="flex flex-col justify-center px-12 py-16" style={{ backgroundColor: "#1a1916" }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4">{t("home.journal")}</p>
            <h2 className="text-3xl md:text-4xl font-serif leading-snug text-[#e8e2d9] mb-6 italic">
              {t("home.journal_title")}
            </h2>
            <p className="text-sm text-[#5a5248] leading-relaxed mb-8 max-w-sm">
              {t("home.journal_desc")}
            </p>
            <button 
              onClick={() => navigate("/shop")}
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-[9px] tracking-[0.3em] uppercase self-start"
            >
              {t("home.explore_stories")} <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;

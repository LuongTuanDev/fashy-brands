import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, StarHalf, ChevronRight, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/common/ProductCard";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/common/Toast";
import { formatVND, cn } from "@/lib/utils";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        if (data) {
          // Transform data to match UI expectations
          const processed = {
            ...data,
            collection: data.brands?.name || "FASHY",
            // Combine main image_url and extra images from product_images table
            images: [
              data.image_url,
              ...(data.product_images?.map(img => img.url) || [])
            ].filter(Boolean),
            // Extract colors and sizes from variants
            colors: Array.from(new Set(data.product_variants?.map(v => v.color))).map(c => ({ name: c, hex: "#000" })), // Hex is placeholder
            sizes: Array.from(new Set(data.product_variants?.map(v => v.size))).filter(Boolean)
          };
          setProduct(processed);

          // Fetch related
          const all = await productService.getAllPublicProducts();
          setRelatedProducts(all.filter(p => p.category === data.category && p.id !== data.id).slice(0, 4));
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0e0e0e]">
        <Loader2 className="w-10 h-10 text-[#c9a96e] animate-spin mb-4" />
        <p className="text-[10px] tracking-[2px] text-[#ffffff40] uppercase">Loading Masterpiece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e]">
        <div className="text-center">
          <p className="text-[#5a5248] mb-4">Sản phẩm không tồn tại</p>
          <button onClick={() => navigate(-1)} className="text-[#c9a96e] text-sm underline">Quay lại</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      showToast("Vui lòng chọn kích thước", "error");
      return;
    }
    const colorName = product.colors?.[selectedColor]?.name;
    addItem(product, selectedSize, colorName, qty);
    showToast(`Đã thêm ${qty} "${product.name}" vào giỏ hàng`);
  };

  const categoryLabel = product.category === "apparel" ? "Apparel" : product.category === "jewelry" ? "Jewelry" : "Accessories";
  const tabs = [
    { id: "description", label: "Description" },
    { id: "craftsmanship", label: "Craftsmanship" },
    { id: "reviews", label: `Reviews (${product.reviews || 0})` }
  ];

  return <div className="min-h-screen" style={{ backgroundColor: "#0e0e0e" }}>
    <Header />
    <main className="pt-[68px]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#5a5248] mb-8">
          <button onClick={() => navigate("/")} className="hover:text-[#c9a96e] transition-colors">Home</button>
          <ChevronRight size={10} />
          <button onClick={() => navigate(`/${product.category}`)} className="hover:text-[#c9a96e] transition-colors">{categoryLabel}</button>
          {product.collection && <>
            <ChevronRight size={10} />
            <span className="text-[#3a3830]">{product.collection}</span>
          </>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="overflow-hidden" style={{ aspectRatio: "1/1", backgroundColor: "#1a1916" }}>
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80";
                }}
              />
            </div>
            {product.images.length > 1 && <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={cn(
                  "w-20 h-20 overflow-hidden border-2 transition-all flex-shrink-0",
                  selectedImg === i ? "border-[#c9a96e]" : "border-transparent opacity-50 hover:opacity-75"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>)}
            </div>}
          </div>

          <div className="space-y-6">
            {product.collection && <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">{product.collection}</p>}

            <h1 className="text-3xl md:text-4xl font-serif text-[#e8e2d9] italic leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => {
                  const rating = product.rating || 5;
                  const filled = i < Math.floor(rating);
                  return <Star key={i} size={12} className={filled ? "text-[#c9a96e] fill-[#c9a96e]" : "text-[#3a3830]"} />;
                })}
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#5a5248]">
                {product.reviews || 0} Verified Reviews
              </span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-serif text-[#c9a96e]">{formatVND(product.price)}</span>
              {product.original_price && <span className="text-lg text-[#5a5248] line-through">{formatVND(product.original_price)}</span>}
              {product.badge && <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 border border-[#c9a96e]/30 text-[#c9a96e]" style={{ backgroundColor: "rgba(201,169,110,0.1)" }}>
                {product.badge}
              </span>}
            </div>

            {product.colors && product.colors.length > 0 && <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248] mb-3">
                Material Choice — <span className="text-[#8a8070]">{product.colors[selectedColor].name}</span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((color, i) => <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  title={color.name}
                  className={cn(
                    "w-10 h-10 border-2 p-0.5 transition-all",
                    selectedColor === i ? "border-[#c9a96e]" : "border-[#2a2820] hover:border-[#3a3830]"
                  )}
                >
                  <span className="block w-full h-full" style={{ background: color.hex || "#333" }} />
                </button>)}
              </div>
            </div>}

            {product.sizes && product.sizes.length > 0 && <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#5a5248]">
                  {product.category === "jewelry" ? "Length" : product.category === "accessories" ? "Size" : "Kích Thước"}
                </p>
                <button className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] hover:underline">
                  Sizing Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                  className={cn(
                    "px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase border transition-all",
                    selectedSize === size ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5" : "border-[#2a2820] text-[#5a5248] hover:border-[#3a3830] hover:text-[#8a8070]"
                  )}
                >
                  {size}
                </button>)}
              </div>
            </div>}

            <div className="flex items-center gap-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248]">Số Lượng</p>
              <div className="flex items-center border border-[#2a2820]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-[#5a5248] hover:text-[#e8e2d9] transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm text-[#e8e2d9] border-x border-[#2a2820] min-w-[40px] text-center font-medium">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-2 text-[#5a5248] hover:text-[#e8e2d9] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#c9a96e] text-[#1a1208] text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-[#ddb87a] transition-all duration-300"
              >
                Add to Fashy Bag
              </button>
              <button
                className="w-full py-4 border border-[#3a3830] text-[#e8e2d9] text-[10px] tracking-[0.25em] uppercase hover:bg-[#e8e2d9] hover:text-[#0e0e0e] transition-all duration-300"
              >
                Reserve in Boutique
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3 text-[10px] text-[#5a5248] tracking-wide">
                <span className="text-[#c9a96e]">◈</span>
                <span>Limited Edition Piece</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[#5a5248] tracking-wide">
                <span className="text-[#c9a96e]">◈</span>
                <span>Complimentary White-Glove Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex gap-8 border-b border-[#2a2820] mb-8 overflow-x-auto">
            {tabs.map((tab) => <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-3 text-[10px] tracking-[0.25em] uppercase transition-colors whitespace-nowrap",
                activeTab === tab.id ? "text-[#e8e2d9] border-b-2 border-[#c9a96e] -mb-px" : "text-[#5a5248] hover:text-[#8a8070]"
              )}
            >
              {tab.label}
            </button>)}
          </div>

          <div className="max-w-2xl">
            {activeTab === "description" && <div className="text-sm text-[#8a8070] leading-relaxed">
              {product.description || "Thông tin mô tả sản phẩm sẽ được cập nhật sớm."}
              {product.material && <p className="mt-4 text-xs text-[#5a5248]">
                <span className="text-[#8a8070]">Chất liệu: </span>{product.material}
              </p>}
            </div>}
            {activeTab === "craftsmanship" && <div className="text-sm text-[#8a8070] leading-relaxed space-y-4">
              <p>Mỗi sản phẩm FASHY được tạo ra bởi những nghệ nhân lành nghề nhất, kết hợp kỹ thuật truyền thống với công nghệ hiện đại.</p>
              <p>Quy trình sản xuất thủ công nghiêm ngặt đảm bảo từng chi tiết đều đạt đến sự hoàn hảo tuyệt đối. Mỗi sản phẩm đều được kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng.</p>
            </div>}
            {activeTab === "reviews" && <div className="space-y-6">
              {[
                { name: "Julian V.", rating: 5, comment: "Sản phẩm vượt xa mọi kỳ vọng. Chất lượng hoàn hảo, đáng để đầu tư." },
                { name: "Sophia K.", rating: 5, comment: "FASHY luôn làm tôi ngạc nhiên. Giao hàng nhanh, đóng gói sang trọng." }
              ].map((review, i) => <div key={i} className="border-b border-[#2a2820] pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }, (_, j) => <Star key={j} size={10} className="text-[#c9a96e] fill-[#c9a96e]" />)}
                  </div>
                  <span className="text-xs text-[#5a5248]">{review.name}</span>
                </div>
                <p className="text-sm text-[#8a8070]">{review.comment}</p>
              </div>)}
            </div>}
          </div>
        </div>

        {relatedProducts.length > 0 && <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-2">Curated Selection</p>
              <h2 className="text-3xl font-serif italic text-[#e8e2d9]">Complete the Look</h2>
            </div>
            <button
              onClick={() => navigate(`/${product.category}`)}
              className="text-[10px] tracking-[0.2em] uppercase text-[#5a5248] hover:text-[#c9a96e] transition-colors"
            >
              View Full Collection
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>}
      </div>
    </main>
    <Footer />
  </div>;
}
export default ProductDetailPage;

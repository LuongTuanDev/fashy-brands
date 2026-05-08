import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, ImageIcon, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { productService } from "@/services/productService";
import { supabase } from "@/api/supabase";
import { toast } from "sonner";

const categoryOptions = ["jewelry", "apparel", "accessories"];
const colorOptions = ["Obsidian Gold", "Silver", "Rose Gold", "Black", "White"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "One Size"];

const generateSKU = (name, color, size) => {
  const n = (name || "PR").slice(0, 2).toUpperCase().replace(/\s/g, "");
  const c = (color || "CLR").slice(0, 3).toUpperCase().replace(/\s/g, "");
  const s = (size || "SZ").toUpperCase();
  return `NL-${n}-${c}-${s}`;
};

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [collection, setCollection] = useState("");
  const [description, setDescription] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const mainInputRef = useRef();
  const extraInputRef = useRef();

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage(URL.createObjectURL(file));
  };
  const handleExtraImages = (e) => {
    const files = Array.from(e.target.files);
    setExtraImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))].slice(0, 4));
  };

  const [category, setCategory] = useState("jewelry");
  const [price, setPrice] = useState(0);

  const [varColor, setVarColor] = useState(colorOptions[0]);
  const [varSize, setVarSize] = useState(sizeOptions[1]);
  const [varStock, setVarStock] = useState(0);
  const [variants, setVariants] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadProductData();
    }
  }, [id]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      if (data) {
        setName(data.name || "");
        setDescription(data.description || "");
        setPrice(data.price || 0);
        setCategory(data.category || "jewelry");
        setMainImage(data.image_url);
        
        if (data.product_variants) {
          setVariants(data.product_variants.map(v => ({
            id: v.id,
            color: v.color,
            size: v.size,
            sku: v.sku,
            stock: v.stock
          })));
        }

        if (data.product_images) {
          setExtraImages(data.product_images.map(img => img.url));
        }
      }
    } catch (err) {
      console.error("Failed to load product:", err);
      toast.error(t("admin.no_data"));
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: Date.now(), color: varColor, size: varSize, sku: generateSKU(name, varColor, varSize), stock: Number(varStock) },
    ]);
    setVarStock(0);
  };

  const removeVariant = (id) => setVariants((prev) => prev.filter((v) => v.id !== id));

  const handleSave = async () => {
    if (!name || !price) return setError(t("admin.loading_error") || "Vui lòng điền tên sản phẩm và giá.");
    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      
      const productData = {
        name,
        slug,
        description,
        price: Number(price),
        category: category,
        seller_id: user.id,
        image_url: mainImage || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80"
      };

      const variantData = variants.map(v => ({
        color: v.color,
        size: v.size,
        sku: v.sku,
        stock: v.stock
      }));

      if (isEdit) {
        await productService.updateProductWithVariants(id, productData, variantData);
        toast.success(t("admin.update_success") || "Sản phẩm đã được cập nhật thành công!");
      } else {
        await productService.createProductWithVariants(productData, variantData);
        toast.success(t("admin.save_success") || "Sản phẩm đã được tạo thành công!");
      }
      
      navigate("/dashboard/products");
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(t("admin.save_error") || "Lỗi khi lưu sản phẩm: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const labelCls = "text-[9px] tracking-[1.5px] text-[#ffffff40] uppercase [font-family:'Manrope-Regular',Helvetica]";
  const inputCls = "bg-transparent border-b border-[#ffffff18] pb-2 text-[12px] text-[#e8e2d9] outline-none placeholder:text-[#ffffff20] focus:border-[#fac49360] transition-colors [font-family:'Manrope-Regular',Helvetica]";
  const selectCls = "appearance-none bg-[#1a1a1a] border border-[#ffffff18] px-3 py-2 text-[11px] text-[#e8e2d9] outline-none cursor-pointer pr-7 [font-family:'Manrope-Regular',Helvetica]";

  const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-2 mb-5">
      <div className="w-[2px] h-4 bg-[#fac493]" />
      <p className="text-[10px] tracking-[2px] text-[#fac493] [font-family:'Manrope-Bold',Helvetica]">{title}</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
      <Header />

      <div className="grid flex-1 pt-[68px]" style={{ gridTemplateColumns: "185px 1fr" }}>
        <DashboardNavigationSidebarSection />

        <main className="flex flex-col">
          <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12 flex-1">

            {/* Tiêu đề */}
            <div className="mb-10">
              <h1 className="text-4xl text-[#e8e2d9] [font-family:'Noto_Serif-Regular',Helvetica] mb-2">
                {isEdit ? "Chỉnh sửa sản phẩm" : t("admin.add_product")}
              </h1>
              <p className="text-sm text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica]">
                {isEdit ? "Cập nhật thông tin tác phẩm của bạn" : t("admin.forge_subtitle")}
              </p>
            </div>

            {/* ── Row 1 ── */}
            <div className="grid grid-cols-[1fr_260px] gap-5 mb-5">

              {/* Thông tin chung */}
              <div className="border border-[#ffffff18] bg-[#1a1a1a] p-6 flex flex-col">
                <SectionHeader title={t("admin.general_info")} />
                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>{t("admin.product_name")}</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("admin.placeholder_name")}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>{t("admin.brand")}</label>
                    <input
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder={t("admin.placeholder_brand")}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>{t("admin.collection_name")}</label>
                    <input
                      value={collection}
                      onChange={(e) => setCollection(e.target.value)}
                      placeholder={t("admin.placeholder_collection")}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className={labelCls}>{t("admin.detailed_desc")}</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t("admin.placeholder_desc")}
                      className="flex-1 min-h-[80px] bg-transparent border-b border-[#ffffff18] pb-2 text-[12px] text-[#e8e2d9] outline-none placeholder:text-[#ffffff20] focus:border-[#fac49360] transition-colors resize-none [font-family:'Manrope-Regular',Helvetica]"
                    />
                  </div>
                </div>
              </div>

              {/* Cột phải */}
              <div className="flex flex-col gap-5">

                {/* Thư viện ảnh */}
                <div className="border border-[#ffffff18] bg-[#1a1a1a] p-5">
                  <SectionHeader title={t("admin.image_gallery")} />
                  <input ref={mainInputRef} type="file" accept="image/*" className="hidden" onChange={handleMainImage} />
                  <div
                    onClick={() => mainInputRef.current.click()}
                    className="w-full h-[130px] border border-dashed border-[#ffffff18] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#fac49340] transition-colors mb-3 overflow-hidden"
                  >
                    {mainImage ? (
                      <img src={mainImage} alt="main" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon size={20} className="text-[#ffffff25]" />
                        <p className="text-[9px] tracking-[1.5px] text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica]">
                          {t("admin.upload_main")}
                        </p>
                      </>
                    )}
                  </div>
                  <input ref={extraInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleExtraImages} />
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        onClick={() => !extraImages[i] && extraInputRef.current.click()}
                        className="aspect-square border border-dashed border-[#ffffff15] flex items-center justify-center cursor-pointer hover:border-[#fac49330] transition-colors overflow-hidden"
                      >
                        {extraImages[i] ? (
                          <img src={extraImages[i]} alt={`extra-${i}`} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={14} className="text-[#ffffff18]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phân loại & giá */}
                <div className="border border-[#ffffff18] bg-[#1a1a1a] p-5">
                  <SectionHeader title={t("admin.category_price")} />
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className={labelCls}>{t("admin.category")}</label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none bg-[#1a1a1a] border border-[#ffffff18] px-3 py-2.5 text-[11px] text-[#e8e2d9] outline-none cursor-pointer pr-8 [font-family:'Manrope-Regular',Helvetica]"
                      >
                        {categoryOptions.map((c) => (
                          <option key={c} value={c} className="bg-[#1a1a1a] uppercase">{t(`admin.${c.toLowerCase()}`)}</option>
                        ))}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none text-xs">▾</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>{t("admin.price")} (VNĐ)</label>
                    <div className="flex items-center border border-[#ffffff18] bg-[#1a1a1a]">
                      <input
                        type="number"
                        value={price || ""}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder="0"
                        className="flex-1 bg-transparent px-3 py-2.5 text-[12px] text-[#e8e2d9] outline-none placeholder:text-[#ffffff20] [font-family:'Manrope-Regular',Helvetica]"
                      />
                      <span className="px-3 text-[10px] text-[#fac49380] border-l border-[#ffffff12] [font-family:'Manrope-Regular',Helvetica]">
                        VND
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ── Row 2: Biến thể ── */}
            <div className="border border-[#ffffff18] bg-[#1a1a1a] p-6 mb-8">
              <SectionHeader title={t("admin.variants_management")} />

              <div className="flex items-end gap-3 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>{t("admin.color")}</label>
                  <div className="relative">
                    <select value={varColor} onChange={(e) => setVarColor(e.target.value)} className={selectCls}>
                      {colorOptions.map((c) => <option key={c} value={c} className="bg-[#1a1a1a]">{c}</option>)}
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none text-xs">▾</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>{t("admin.size")}</label>
                  <div className="relative">
                    <select value={varSize} onChange={(e) => setVarSize(e.target.value)} className={selectCls}>
                      {sizeOptions.map((s) => <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>)}
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ffffff40] pointer-events-none text-xs">▾</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>{t("admin.stock_qty")}</label>
                  <input
                    type="number"
                    value={varStock}
                    onChange={(e) => setVarStock(e.target.value)}
                    min={0}
                    className="w-20 bg-[#1a1a1a] border border-[#ffffff18] px-3 py-2 text-[11px] text-[#e8e2d9] outline-none [font-family:'Manrope-Regular',Helvetica]"
                  />
                </div>

                <button
                  onClick={addVariant}
                  className="px-4 py-2 bg-[#fac493] text-[#131313] text-[9px] tracking-[1.5px] font-bold [font-family:'Manrope-Bold',Helvetica] hover:bg-[#f5b97e] transition-colors whitespace-nowrap"
                >
                  {t("admin.add_variant")}
                </button>
              </div>

              {variants.length > 0 && (
                <div className="border border-[#ffffff10]">
                  <div className="grid grid-cols-[2fr_2fr_1fr_40px] gap-4 px-4 py-2.5 border-b border-[#ffffff10]">
                    {[t("admin.variants_management"), "SKU", t("admin.stock"), ""].map((col, i) => (
                      <p key={i} className="text-[9px] tracking-[1.5px] text-[#ffffff30] [font-family:'Manrope-Bold',Helvetica]">
                        {col}
                      </p>
                    ))}
                  </div>
                  {variants.map((v) => (
                    <div
                      key={v.id}
                      className="grid grid-cols-[2fr_2fr_1fr_40px] gap-4 items-center px-4 py-3 border-b border-[#ffffff08] hover:bg-[#ffffff03] transition-colors last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#fac493]" />
                        <span className="text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                          {v.color} / {v.size}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#ffffff35] [font-family:'Manrope-Regular',Helvetica] truncate">
                        {v.sku}
                      </span>
                      <span className="text-[11px] text-[#e8e2d9] [font-family:'Manrope-Regular',Helvetica]">
                        {v.stock}
                      </span>
                      <button
                        onClick={() => removeVariant(v.id)}
                        className="text-[#ffffff20] hover:text-[#ff6b6b] transition-colors flex items-center justify-center"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Action bar */}
          <div className="sticky bottom-0 border-t border-[#ffffff15] bg-[#0e0e0e] px-12 py-4 flex items-center justify-end gap-3">
            {error && (
              <p className="text-[10px] text-[#ff6b6b] mr-auto [font-family:'Manrope-Regular',Helvetica]">{error}</p>
            )}
            <button
              onClick={() => navigate("/dashboard/products")}
              className="px-8 py-2.5 border border-[#ffffff20] text-[10px] tracking-[2px] text-[#ffffff45] hover:text-[#ffffff70] hover:border-[#ffffff35] transition-colors [font-family:'Manrope-Regular',Helvetica]"
            >
              {t("admin.discard")}
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-2.5 bg-[#fac493] text-[#131313] text-[10px] tracking-[2px] font-bold hover:bg-[#f5b97e] transition-colors [font-family:'Manrope-Bold',Helvetica] flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 size={12} className="animate-spin" />}
              {t("admin.save_product")}
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AddProduct;
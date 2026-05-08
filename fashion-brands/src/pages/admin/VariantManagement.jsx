import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DashboardNavigationSidebarSection } from "@/components/admin/DashboardNavigationSidebarSection";
import VariantTable from "@/components/admin/VariantTable";
import { useParams } from "react-router-dom";
import { allProducts } from "@/data/products";

const VariantManagement = () => {
    const { id } = useParams();
    const product = allProducts.find((p) => String(p.id) === String(id));

    if (!product) return (
        <div className="flex items-center justify-center h-screen bg-[#0e0e0e] text-[#ffffff40]">
            Không tìm thấy sản phẩm
        </div>
    );

    const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock ?? 0), 0) ?? product.stock ?? 0;

    return (
        <div className="flex flex-col min-h-screen bg-[#0e0e0e]">
            <Header />

            <div className="grid flex-1 pt-[68px]" style={{ gridTemplateColumns: "185px 1fr" }}>
                <DashboardNavigationSidebarSection />

                <main>
                    <div className="max-w-4xl mx-auto w-full px-6 md:px-12 py-12">

                        {/* Tiêu đề */}
                        <div className="mb-8">
                            <p className="text-[10px] tracking-[2px] text-[#ffffff40] [font-family:'Manrope-Regular',Helvetica] mb-2">
                                Chi tiết biến thể:
                            </p>
                            <h1 className="text-4xl text-[#fac493] [font-family:'Noto_Serif-Regular',Helvetica]">
                                {product.name}
                            </h1>
                        </div>

                        {/* Product card + actions */}
                        <div className="flex gap-6 mb-10">
                            <div className="flex-1 flex items-center gap-6 bg-[#1a1a1a] border border-[#ffffff10] p-6">
                                <div className="w-24 h-24 bg-[#131313] overflow-hidden flex-shrink-0">
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = "none"; }}
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <p className="text-[9px] tracking-[2px] text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica] mb-1">
                                            SKU GỐC
                                        </p>
                                        <p className="text-[15px] text-[#e8e2d9] [font-family:'Manrope-Bold',Helvetica] tracking-wider">
                                            {product.sku || `ATL-${product.id}`}
                                        </p>
                                    </div>
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[9px] tracking-[2px] text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica] mb-1">
                                                TỔNG TỒN KHO
                                            </p>
                                            <p className="text-[#e8e2d9] [font-family:'Manrope-Bold',Helvetica]">
                                                <span className="text-2xl">{totalStock}</span>
                                                <span className="text-[11px] text-[#ffffff40] ml-1">items</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] tracking-[2px] text-[#ffffff30] [font-family:'Manrope-Regular',Helvetica] mb-1">
                                                LOẠI SẢN PHẨM
                                            </p>
                                            <p className="text-[11px] text-[#e8e2d9] tracking-wider [font-family:'Manrope-Regular',Helvetica] uppercase">
                                                {product.collection || product.category || "—"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 justify-center min-w-[160px]">
                                <button className="px-5 py-3 bg-[#fac493] text-[#131313] text-[10px] tracking-[2px] [font-family:'Manrope-Bold',Helvetica] hover:bg-[#f5b97e] transition-colors">
                                    UPDATE STOCK
                                </button>
                                <button className="px-5 py-3 border border-[#ffffff20] text-[#ffffff60] text-[10px] tracking-[2px] [font-family:'Manrope-Regular',Helvetica] hover:border-[#ffffff40] hover:text-[#ffffff90] transition-colors">
                                    EXPORT REPORT
                                </button>
                            </div>
                        </div>

                        {/* Variant table */}
                        <VariantTable product={product} />

                        {/* Stock Insights */}
                        <div className="mt-8 border-l-2 border-[#fac493] pl-6 py-2 bg-[#fac49308]">
                            <p className="text-[11px] text-[#fac493] tracking-[1px] [font-family:'Manrope-Bold',Helvetica] mb-2">
                                Stock Insights
                            </p>
                            <p className="text-[11px] text-[#ffffff60] [font-family:'Manrope-Regular',Helvetica] leading-5 mb-3">
                                Sản phẩm này có tỷ lệ quay vòng kho cao (15% mỗi tuần). Hãy cân nhắc nhập thêm phiên bản có tồn kho thấp để tránh mất doanh thu tiềm năng.
                            </p>
                            <button className="text-[9px] tracking-[2px] text-[#fac493] [font-family:'Manrope-Bold',Helvetica] hover:underline">
                                XEM DỰ BÁO CHI TIẾT
                            </button>
                        </div>

                    </div>
                </main>
            </div>

            {/* Footer ngoài grid */}
            <Footer />
        </div>
    );
};

export default VariantManagement;
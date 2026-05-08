import { supabase } from '../api/supabase';

export const productService = {
  // Lấy tất cả sản phẩm đang có (Kèm thương hiệu và danh mục)
  async getAllPublicProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brands(name, slug),
        categories(name, slug),
        product_variants(*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Lấy sản phẩm của Shop (Dành cho Seller)
  async getProductsBySeller(sellerId) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brands(name),
        categories(name),
        product_variants(*),
        product_images(*)
      `)
      .eq('seller_id', sellerId);
    if (error) throw error;
    return data;
  },

  // Lấy chi tiết sản phẩm đầy đủ theo Slug
  async getProductBySlug(slug) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brands(name),
        categories(name),
        product_variants(*),
        product_images(*)
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Lấy chi tiết sản phẩm đầy đủ theo ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brands(name),
        categories(name),
        product_variants(*),
        product_images(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Xóa sản phẩm
  async deleteProduct(productId) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    if (error) throw error;
  },

  // Tạo sản phẩm mới kèm biến thể
  async createProductWithVariants(productData, variants, images = []) {
    // 1. Tạo sản phẩm
    const { data: product, error: pError } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (pError) throw pError;

    // 2. Tạo biến thể nếu có
    if (variants && variants.length > 0) {
      const variantsWithProductId = variants.map(v => ({
        ...v,
        product_id: product.id
      }));
      const { error: vError } = await supabase
        .from('product_variants')
        .insert(variantsWithProductId);
      
      if (vError) throw vError;
    }

    // 3. Tạo ảnh phụ nếu có
    if (images && images.length > 0) {
      const imagesWithProductId = images.map((url, index) => ({
        product_id: product.id,
        url,
        display_order: index
      }));
      const { error: iError } = await supabase
        .from('product_images')
        .insert(imagesWithProductId);
        
      if (iError) throw iError;
    }

    return product;
  },

  // Cập nhật sản phẩm và biến thể
  async updateProductWithVariants(productId, productData, variants, images = []) {
    // 1. Cập nhật sản phẩm
    const { error: pError } = await supabase
      .from('products')
      .update(productData)
      .eq('id', productId);
    
    if (pError) throw pError;

    // 2. Cập nhật biến thể
    const { error: dError } = await supabase
      .from('product_variants')
      .delete()
      .eq('product_id', productId);
    
    if (dError) throw dError;

    if (variants && variants.length > 0) {
      const variantsWithProductId = variants.map(v => ({
        ...v,
        product_id: productId
      }));
      const { error: vError } = await supabase
        .from('product_variants')
        .insert(variantsWithProductId);
      
      if (vError) throw vError;
    }

    // 3. Cập nhật ảnh phụ
    const { error: diError } = await supabase
      .from('product_images')
      .delete()
      .eq('product_id', productId);

    if (diError) throw diError;

    if (images && images.length > 0) {
      const imagesWithProductId = images.map((url, index) => ({
        product_id: productId,
        url,
        display_order: index
      }));
      const { error: iError } = await supabase
        .from('product_images')
        .insert(imagesWithProductId);
        
      if (iError) throw iError;
    }
  }
};

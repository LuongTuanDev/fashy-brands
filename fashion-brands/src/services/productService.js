import { supabase } from '../api/supabase';

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*)');
    if (error) throw error;
    return data;
  }
};
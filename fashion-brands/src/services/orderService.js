import { supabase } from '../api/supabase';

export const orderService = {
  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles!inner(full_name, email)
      `);
    
    if (error) throw error;
    return data;
  },

  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getOrderStats() {
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount');
    
    if (error) throw error;

    const stats = {
      pending: data.filter(o => o.status === 'PENDING').length,
      processing: data.filter(o => o.status === 'PROCESSING' || o.status === 'PACKING').length,
      completed: data.filter(o => o.status === 'COMPLETED').length,
      totalRevenue: data.reduce((sum, o) => sum + (o.total_amount || 0), 0)
    };

    return stats;
  }
};

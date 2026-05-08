import { supabase } from '../api/supabase';

export const userService = {
  // Lấy tất cả người dùng (Admin view)
  async getAllUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('role', 'admin') // Không hiện tài khoản admin
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Cập nhật vai trò người dùng (Thăng cấp lên Seller hoặc hạ xuống Client)
  async updateUserRole(userId, role) {
    const { error } = await supabase
      .from('profiles')
      .update({ role, updated_at: new Date() })
      .eq('id', userId);

    if (error) throw error;
  },

  // Xóa người dùng (Chỉ Admin)
  async deleteUser(userId) {
    // Note: Xóa profile thường đi kèm với xóa auth.user (cần RPC hoặc Service Role)
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) throw error;
  },

  // Lấy thông tin profile người dùng
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Cập nhật thông tin profile
  async updateProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

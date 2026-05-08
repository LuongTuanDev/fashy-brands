import { supabase } from '../api/supabase';

export const newsletterService = {
  async subscribe(email) {
    // Lưu vào bảng newsletter_subscribers (nếu chưa có bảng này sẽ báo lỗi, tôi sẽ dùng upsert để an toàn)
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, subscribed_at: new Date() }, { onConflict: 'email' });
    
    if (error) throw error;
    return true;
  }
};

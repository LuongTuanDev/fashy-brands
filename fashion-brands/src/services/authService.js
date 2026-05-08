import { supabase } from '../api/supabase'

export const authService = {
    // Đăng ký tài khoản mới (Metadata sẽ được trigger SQL tự động đồng bộ sang bảng profiles)
    async signUp(email, password, { fullName, shopName, role = 'client' }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    shop_name: shopName,
                    role: role
                },
            },
        })
        if (error) throw error

        if (data?.user) {
            const { error: upsertError } = await supabase.from('profiles').upsert({
                id: data.user.id,
                full_name: fullName,
                shop_name: shopName,
                role: role,
                phone: null, // Khởi tạo null để có schema
                address: null, // Khởi tạo null để có schema
                updated_at: new Date().toISOString()
            });
            if (upsertError) console.error("Profiles Upsert Error:", upsertError);
        }
        
        return data
    },

    // Đăng nhập
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        return data
    },

    // Lấy thông tin Profile của người dùng hiện tại
    async getMyProfile() {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle()

        if (error) throw error
        return data
    },

    // Cập nhật mật khẩu
    async updatePassword(newPassword) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        })
        if (error) throw error
        return data
    },

    // Cập nhật thông tin Profile (Họ tên, SĐT, Địa chỉ...)
    async updateProfile(updates) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Bạn chưa đăng nhập')

        // Sử dụng update thay vì upsert vì RLS không cho phép client INSERT vào profiles (đã có Trigger lo việc này)
        const { error } = await supabase
            .from('profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id)

        if (error) throw error
    },

    // Xóa tài khoản (Yêu cầu hàm delete_user đã được tạo trong SQL Editor)
    async deleteAccount() {
        const { error } = await supabase.rpc('delete_user')
        if (error) throw error
        await this.signOut()
    },
    // Đăng xuất
    async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }
}


import { createContext, useState, useEffect } from 'react'
import { supabase } from '../api/supabase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Kiểm tra session hiện tại
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            handleUserChange(session?.user ?? null)
        }

        getSession()

        // Lắng nghe thay đổi auth
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            handleUserChange(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleUserChange = async (currentUser) => {
        console.log("Auth State Change - User:", currentUser?.email);
        setUser(currentUser)
        
        if (currentUser) {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', currentUser.id)
                    .maybeSingle()
                
                if (error) {
                    console.error("Lỗi khi lấy Profile từ database:", error.message);
                } else if (!data) {
                    console.warn("Không tìm thấy dòng tương ứng trong bảng 'profiles' cho User này.");
                } else {
                    console.log("Đã lấy Profile thành công:", data);
                }
                
                setProfile(data)
            } catch (err) {
                console.error("Lỗi hệ thống khi lấy Profile:", err);
            }
        } else {
            setProfile(null)
        }
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{ user, profile, loading, refreshProfile: async () => {
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
                setProfile(data)
            }
        } }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
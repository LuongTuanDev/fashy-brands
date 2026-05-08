import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "@/services/authService";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const [auth, setAuth] = useState({ 
    loading: true, 
    isAuthenticated: false, 
    userRole: null 
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const profile = await authService.getMyProfile();
        if (profile) {
          setAuth({
            loading: false,
            isAuthenticated: true,
            userRole: profile.role
          });
        } else {
          setAuth({ loading: false, isAuthenticated: false, userRole: null });
        }
      } catch (error) {
        setAuth({ loading: false, isAuthenticated: false, userRole: null });
      }
    }
    checkAuth();
  }, []);

  if (auth.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(auth.userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

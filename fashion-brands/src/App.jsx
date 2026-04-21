import { BrowserRouter, Routes, Route } from "react-router-dom";

// Client pages (giao diện khách hàng)
import Home from "@/pages/client/Home";
import Shop from "@/pages/client/Shop";
import ProductDetail from "@/pages/client/ProductDetail";
import Cart from "@/pages/client/Cart";
import Checkout from "@/pages/client/Checkout";
import Profile from "@/pages/client/Profile";
import OrderHistory from "@/pages/client/OrderHistory";
import OrderConfirmation from "@/pages/client/OrderConfirmation";

// Auth pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Admin pages (giao diện quản trị)
import Dashboard from "@/pages/admin/Dashboard";
import ProductManagement from "@/pages/admin/ProductManagement";
import OrderManagement from "@/pages/admin/OrderManagement";

import NotFound from "@/pages/NotFound";

const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={base}>
      <Routes>
        {/* Khách hàng */}
        <Route path="/" element={<Home />} />
        <Route path="/apparel" element={<Shop category="apparel" />} />
        <Route path="/jewelry" element={<Shop category="jewelry" />} />
        <Route path="/accessories" element={<Shop category="accessories" />} />
        <Route path="/shop" element={<Shop category="apparel" />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

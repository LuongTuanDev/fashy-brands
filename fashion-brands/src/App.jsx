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
import CollectionManagement from "@/pages/admin/CollectionManagement";
import SellerSettings from "@/pages/admin/SellerSettings";
import UserManagement from "@/pages/admin/UserManagement";
import AddProduct from "@/pages/admin/AddProduct";
import InventoryManagement from "@/pages/admin/InventoryManagement";
import CustomerManagement from "@/pages/admin/CustomerManagement";
import CollectionDetail from "@/pages/admin/CollectionDetail";
import VariantManagement from "@/pages/admin/VariantManagement";
import ProtectedRoute from "@/routes/ProtectedRoute";

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

        {/* Admin (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'seller']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<ProductManagement />} />
          <Route path="/dashboard/orders" element={<OrderManagement />} />
          <Route path="/dashboard/collections" element={<CollectionManagement />} />
          <Route path="/dashboard/collections/:name" element={<CollectionDetail />} />
          <Route path="/dashboard/inventory" element={<InventoryManagement />} />
          <Route path="/dashboard/inventory/:id" element={<VariantManagement />} />
          <Route path="/dashboard/customers" element={<CustomerManagement />} />
          <Route path="/dashboard/settings" element={<SellerSettings />} />
          <Route path="/dashboard/users" element={<UserManagement />} />
          <Route path="/dashboard/products/add" element={<AddProduct />} />
          <Route path="/dashboard/products/edit/:id" element={<AddProduct />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Routes, Route } from 'react-router-dom';

// Pages cho Khách hàng
import Home from '../pages/client/Home';
import Shop from '../pages/client/Shop';
import ProductDetail from '../pages/client/ProductDetail';

// Pages cho Admin
import Dashboard from '../pages/admin/Dashboard';
import ProductManagement from '../pages/admin/ProductManagement';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Luồng cho khách hàng */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* Luồng cho Admin (Sau này sẽ thêm Auth check ở đây) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/products" element={<ProductManagement />} />
      
      {/* Trang 404 - Nếu rảnh nhóm làm thêm */}
      <Route path="*" element={<div>Trang không tồn tại!</div>} />
    </Routes>
  );
};

export default AppRoutes;
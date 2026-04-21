import { Link } from "react-router-dom";

export default function OrderManagement() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e8e2d9] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif text-[#c9a96e]">Quản lý đơn hàng</h1>
          <Link to="/admin" className="text-sm text-[#c9a96e] hover:underline">
            ← Bảng điều khiển
          </Link>
        </div>
        <p className="text-[#5a5248]">
          Đây là trang quản lý đơn hàng. Hiển thị timeline trạng thái: Chờ xác nhận → Đang đóng gói → Đã giao.
        </p>
      </div>
    </div>
  );
}

# Fashy - Nền tảng Thương mại Điện tử Thời trang Hiện đại

Fashy là một ứng dụng web thương mại điện tử chuyên nghiệp dành cho các thương hiệu thời trang, được xây dựng với các công nghệ hiện đại nhất để đảm bảo hiệu suất, khả năng mở rộng và trải nghiệm người dùng tuyệt vời.

## Tính năng nổi bật

### Giao diện Khách hàng (Client)
- **Trang chủ & Cửa hàng**: Trình bày sản phẩm bắt mắt, bộ lọc thông minh theo danh mục và giá cả.
- **Chi tiết Sản phẩm**: Xem thông tin chi tiết, hình ảnh và các biến thể sản phẩm (size, màu sắc).
- **Giỏ hàng & Thanh toán**: Quy trình mua hàng tối ưu, quản lý giỏ hàng thời gian thực.
- **Tài khoản người dùng**: Quản lý hồ sơ, xem lịch sử đơn hàng và theo dõi trạng thái đơn hàng.
- **Đa ngôn ngữ**: Hỗ trợ Tiếng Việt và Tiếng Anh (i18n).

### Hệ thống Quản trị (Admin Dashboard)
- **Tổng quan (Dashboard)**: Theo dõi doanh thu, số lượng đơn hàng và khách hàng qua biểu đồ trực quan.
- **Quản lý Sản phẩm**: CRUD sản phẩm, quản lý biến thể (Variants) và bộ sưu tập (Collections).
- **Quản lý Kho hàng**: Theo dõi số lượng tồn kho và cập nhật nhanh chóng.
- **Quản lý Đơn hàng**: Xử lý đơn hàng, cập nhật trạng thái giao hàng.
- **Quản lý Khách hàng & Người dùng**: Quản trị danh sách người dùng và phân quyền.
- **Cài đặt Người bán**: Cấu hình thông tin cửa hàng.

## Công nghệ sử dụng

- **Frontend**: [React](https://reactjs.org/) (Vite), [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest) (React Query), React Context API
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Internationalization**: [i18next](https://www.i18next.com/)

## Cấu trúc thư mục

```text
fashion-brands/
├── src/
│   ├── api/             # Cấu hình kết nối Supabase
│   ├── assets/          # Hình ảnh, icon tĩnh
│   ├── components/      # Các component tái sử dụng (Common, Layout, UI)
│   ├── context/         # Quản lý State toàn cục (Auth, Cart)
│   ├── hooks/           # Các Custom Hooks (useAuth, useCart, useToast...)
│   ├── i18n.js          # Cấu hình đa ngôn ngữ
│   ├── lib/             # Thư viện tiện ích (utils.js cho shadcn)
│   ├── locales/         # File dịch thuật (vi.json, en.json)
│   ├── pages/           # Các trang của ứng dụng
│   │   ├── admin/       # Quản lý Dashboard, Sản phẩm, Đơn hàng...
│   │   ├── auth/        # Đăng nhập, Đăng ký, Quên mật khẩu
│   │   └── client/      # Trang chủ, Cửa hàng, Giỏ hàng, Hồ sơ...
│   ├── routes/          # Cấu hình định tuyến (Routing)
│   ├── services/        # Các API service gọi đến Supabase
│   └── utils/           # Định dạng (Format), hằng số (Constants)
├── public/              # Tài nguyên công khai
├── .env.example         # File biến môi trường mẫu
└── vite.config.js       # Cấu hình Vite
```

## Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống
- Node.js (phiên bản mới nhất)
- NPM hoặc Yarn

### 2. Các bước thực hiện
1. Clone dự án về máy:
   ```bash
   git clone <url-cua-ban>
   cd fashion-brands
   ```

2. Cài đặt các thư viện:
   ```bash
   npm install
   ```

3. Cấu hình biến môi trường:
   - Tạo file `.env` từ file `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Điền thông tin Supabase của bạn:
     ```env
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Chạy ứng dụng ở chế độ phát triển:
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại: `http://localhost:5173`

## Build for Production

```bash
npm run build
```
Thư mục `dist` sẽ được tạo ra chứa mã nguồn đã được tối ưu hóa sẵn sàng để triển khai.

---
*Dự án được phát triển bởi team there T đam mê công nghệ và thời trang.*

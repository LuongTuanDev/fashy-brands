# Fashion Brands

Dự án thương mại điện tử thời trang được hợp nhất từ 2 hệ thống:

- **Hệ thống cũ (Atelier)**: Toàn bộ giao diện, dữ liệu sản phẩm, các trang Home/Shop/Cart/Checkout/Profile/Auth, thư viện UI (shadcn/ui), context giỏ hàng, toast.
- **Hệ thống mới (Fashion Brands)**: Cấu trúc thư mục theo nhóm (client / admin / auth), services Supabase, AuthContext, các page admin (Dashboard, ProductManagement, OrderManagement).

Toàn bộ mã nguồn TypeScript (`.tsx` / `.ts`) đã được chuyển sang JavaScript (`.jsx` / `.js`).

## Cấu trúc thư mục

```
fashion-brands/
├── index.html
├── package.json
├── vite.config.js
├── jsconfig.json
├── .env.example
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   └── supabase.js
    ├── assets/
    ├── components/
    │   ├── common/        (ProductCard, FilterSidebar, Toast)
    │   ├── layout/        (Header, Footer)
    │   └── ui/            (shadcn/ui components)
    ├── context/
    │   ├── AuthContext.jsx
    │   └── CartContext.jsx
    ├── data/
    │   └── products.js
    ├── hooks/
    │   ├── useAuth.js
    │   ├── useCart.js
    │   ├── use-mobile.jsx
    │   └── use-toast.js
    ├── lib/
    │   └── utils.js
    ├── pages/
    │   ├── client/        (Home, Shop, ProductDetail, Cart, Checkout, Profile, OrderHistory, OrderConfirmation)
    │   ├── auth/          (Login, Register, ForgotPassword)
    │   ├── admin/         (Dashboard, ProductManagement, OrderManagement)
    │   └── NotFound.jsx
    ├── routes/
    ├── services/          (authService, productService, cartService, orderService)
    └── utils/
        ├── format.js
        └── constants.js
```

## Cài đặt & Chạy trên VSCode

1. Mở thư mục `fashion-brands` bằng VSCode.
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Copy file môi trường mẫu:
   ```bash
   cp .env.example .env
   ```
   Sau đó điền `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` của bạn.
4. Chạy dev server:
   ```bash
   npm run dev
   ```
   Mở http://localhost:5173

## Build production

```bash
npm run build
npm run preview
```

## Đẩy lên Git

```bash
git init
git add .
git commit -m "init: fashion-brands merged project"
git branch -M main
git remote add origin <your-git-url>
git push -u origin main
```

> File `.env` đã được liệt kê trong `.gitignore` nên sẽ không bị push lên Git.

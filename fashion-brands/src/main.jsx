import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import "./i18n";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/common/Toast";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </ToastProvider>
);

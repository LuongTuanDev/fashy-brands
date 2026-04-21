import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/common/Toast";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ToastProvider>
);

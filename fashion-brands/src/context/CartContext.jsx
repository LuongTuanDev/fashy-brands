import { createContext, useContext, useReducer, useEffect } from "react";
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(
            (i) => i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return {
        ...state,
        items: [...state.items, {
          product: action.product,
          quantity: 1,
          selectedSize: action.size,
          selectedColor: action.color
        }]
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map(
          (i) => i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        )
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}
const CartContext = createContext(null);
const STORAGE_KEY = "atelier_cart";
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: loadFromStorage(),
    isOpen: false
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);
  const addItem = (product, size, color) => {
    dispatch({ type: "ADD_ITEM", product, size, color });
  };
  const removeItem = (productId) => dispatch({ type: "REMOVE_ITEM", productId });
  const updateQty = (productId, quantity) => dispatch({ type: "UPDATE_QTY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  return <CartContext.Provider value={{ state, addItem, removeItem, updateQty, clearCart, toggleCart, closeCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>;
}
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
export {
  CartProvider,
  useCart
};

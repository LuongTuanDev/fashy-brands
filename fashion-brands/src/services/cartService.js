const CART_STORAGE_KEY = 'fashion_brands_cart';

export const cartService = {
    // Lấy giỏ hàng từ Local Storage
    getCart() {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    },

    // Thêm sản phẩm vào giỏ
    addToCart(variant, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.variant_id === variant.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                variant_id: variant.id,
                product_id: variant.product_id,
                color_name: variant.color_name,
                size: variant.size,
                price: variant.price_override || variant.base_price, // base_price cần được pass kèm từ product
                quantity: quantity,
                name: variant.product_name, // product_name cần được pass kèm
                image: variant.image_url // image_url cần được pass kèm
            });
        }

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        return cart;
    },

    // Cập nhật số lượng
    updateQuantity(variantId, quantity) {
        let cart = this.getCart();
        if (quantity <= 0) {
            cart = cart.filter(item => item.variant_id !== variantId);
        } else {
            const item = cart.find(item => item.variant_id === variantId);
            if (item) item.quantity = quantity;
        }
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        return cart;
    },

    // Xóa giỏ hàng sau khi thanh toán thành công
    clearCart() {
        localStorage.removeItem(CART_STORAGE_KEY);
    }
};

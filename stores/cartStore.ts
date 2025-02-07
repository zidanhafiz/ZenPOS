import { Cart, CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { createStore } from "zustand/vanilla";

export type CartState = {
  cart: Cart | null;
  openCart: boolean;
  cartItem: CartItem | null;
};

export type CartActions = {
  toggleCart: () => void;
  setCart: (cart: Cart) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setCartItem: (cartItem: CartItem) => void;
  updateCartItem: (cartItemId: string, quantity: number) => void;
};

export type CartStore = CartState & CartActions;

const CART_STORAGE_KEY = "shopping-cart";

// Add this function to handle loading cart from storage
const loadCartFromStorage = (): Cart | null => {
  if (typeof window === "undefined") return null;
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : null;
};

export const initCartStore = (): CartState => {
  return { cart: loadCartFromStorage(), openCart: false, cartItem: null };
};

// Update the defaultInitState to load from storage
export const defaultInitState: CartState = {
  cart: null,
  openCart: false,
  cartItem: null,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()((set, get) => ({
    ...initState,

    toggleCart: () => set((state) => ({ openCart: !state.openCart })),

    setCart: (cart) => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      set(() => ({ cart }));
    },

    addToCart: (product, quantity) => {
      const currentCart = get().cart;

      // Calculate new cart item
      const existingItem = currentCart?.cart_items.find(
        (item) => item.id === product.id
      );
      const newQuantity = (existingItem?.quantity || 0) + quantity;
      const newTotalPrice = product.price * newQuantity;

      const updatedCartItem = {
        ...product,
        quantity: newQuantity,
        total_price: newTotalPrice,
      };

      // Update cart items
      const updatedCartItems = currentCart?.cart_items || [];
      const cartItems = existingItem
        ? updatedCartItems.map((item) =>
            item.id === product.id ? updatedCartItem : item
          )
        : [...updatedCartItems, updatedCartItem];

      // Calculate cart totals
      const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.total_price,
        0
      );

      const updatedCart = {
        ...currentCart,
        quantity: totalQuantity,
        total_price: totalPrice,
        total_payment: 0,
        created_at: currentCart?.created_at || new Date().toISOString(),
        is_delivered: currentCart?.is_delivered || false,
        payment_at: currentCart?.payment_at || "",
        payment_method: currentCart?.payment_method || "",
        buyer_name: currentCart?.buyer_name || "",
        payment_status: currentCart?.payment_status || "",
        cart_items: cartItems,
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      set(() => ({ cart: updatedCart }));
    },

    removeFromCart: (productId) => {
      const currentCart = get().cart;
      if (!currentCart) return;

      const updatedCartItems = currentCart.cart_items.filter(
        (item) => item.id !== productId
      );

      // Calculate cart totals
      const totalQuantity = updatedCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const totalPrice = updatedCartItems.reduce(
        (sum, item) => sum + item.total_price,
        0
      );

      const updatedCart = {
        ...currentCart,
        quantity: totalQuantity,
        total_price: totalPrice,
        total_payment: 0,
        cart_items: updatedCartItems,
      };

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      set(() => ({ cart: updatedCart }));
    },

    clearCart: () => {
      localStorage.removeItem(CART_STORAGE_KEY);
      set(() => ({ cart: null }));
    },

    setCartItem: (cartItem) => {
      set(() => ({ cartItem }));
    },

    updateCartItem: (cartItemId, quantity) => {
      const currentCart = get().cart;
      if (!currentCart) return;

      const updatedCartItems = currentCart.cart_items.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity, total_price: item.price * quantity }
          : item
      );

      const updatedCart = {
        ...currentCart,
        quantity: updatedCartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        total_price: updatedCartItems.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
        cart_items: updatedCartItems,
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      set(() => ({ cart: updatedCart }));
    },
  }));
};

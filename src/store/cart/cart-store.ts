import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: CartProduct[];

  // Methods
  addProductTocart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;

  // Selectors
  getTotalItems: () => number;
  getSubTotal: () => number;
  getTax: () => number;
  getTotal: () => number;

}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      addProductTocart: (product: CartProduct) => {
        const cart = get().cart;

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const cart = get().cart;
        const updatedCartProducts = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity }
            : item
        );
        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const cart = get().cart;
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        set({ cart: updatedCartProducts });
      },

      clearCart: () => set({ cart: [] }),

      // Selectors
      getTotalItems: () => {
        const cart = get().cart;
        return cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubTotal: () => {
        const cart = get().cart;
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTax: () => get().getSubTotal() * 0.15,

      getTotal: () => get().getSubTotal() + get().getTax(),

    }),
    {
      name: "shopping-cart", // key in localStorage
    }
  )
);

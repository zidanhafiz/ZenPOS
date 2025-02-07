import { Cart } from "@/types/cart";

export const loadCartFromStorage = (): Cart | null => {
  if (typeof window === "undefined") return null;
  const savedCart = localStorage.getItem("shopping-cart");
  return savedCart ? JSON.parse(savedCart) : null;
};

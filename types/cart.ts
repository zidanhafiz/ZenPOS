import { Product } from "./product";

export type Cart = {
  quantity: number;
  total_price: number;
  total_payment: number;
  created_at: string;
  payment_method: string;
  payment_status: string;
  cart_items: CartItem[];
};

export type CartItem = Product & {
  quantity: number;
  total_price: number;
};

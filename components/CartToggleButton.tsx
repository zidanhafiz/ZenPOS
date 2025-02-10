"use client";
import { useCartStore } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CartToggleButton() {
  const { cart, toggleCart } = useCartStore((state) => state);
  const pathname = usePathname();

  if (pathname !== "/cashier") return null;

  return (
    <Button onClick={toggleCart} className="2xl:hidden relative">
      <ShoppingCart size={22} />
      <span className="text-sm font-medium hidden sm:block">Order List</span>
      {cart?.cart_items.length && cart?.cart_items.length > 0 && (
        <span className="absolute -top-2 -right-2 text-xs font-medium bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {cart?.cart_items.length}
        </span>
      )}
    </Button>
  );
}

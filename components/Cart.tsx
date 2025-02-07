"use client";
import CartFooter from "@/components/CartFooter";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PanelRightClose, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import CartList from "./CartList";
import { CartEditDialog } from "./CartEditDialog";
import { useCartStore } from "@/providers/CartProvider";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function Cart() {
  const { openCart, toggleCart } = useCartStore((state) => state);
  const pathname = usePathname();

  if (pathname !== "/cashier") return null;

  return (
    <CartEditDialog>
      <div
        className={cn(
          "w-0 2xl:w-full 2xl:max-w-[420px] relative transition-all duration-500"
        )}
      >
        <Card
          className={cn(
            "fixed inset-y-0 w-full max-w-[420px] rounded-none transition-all duration-500 2xl:duration-300 flex flex-col z-50",
            openCart ? "right-0" : "-right-full 2xl:right-0"
          )}
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
              <ShoppingCart size={22} />
              Order list
            </CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleCart}
              className="2xl:hidden"
            >
              <PanelRightClose />
            </Button>
          </CardHeader>
          <CartList />
          <CartFooter />
        </Card>
      </div>
    </CartEditDialog>
  );
}

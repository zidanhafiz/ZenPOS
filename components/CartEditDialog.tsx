"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useCartStore } from "@/providers/CartProvider";

export function CartEditDialog({ children }: { children: ReactNode }) {
  const [quantity, setQuantity] = useState<number>(0);
  const { cartItem, removeFromCart, updateCartItem } = useCartStore(
    (state) => state
  );

  useEffect(() => {
    setQuantity(cartItem?.quantity || 0);
  }, [cartItem]);

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSave = () => {
    if (isNaN(quantity) || quantity < 0) {
      return;
    }

    if (quantity === 0) {
      removeFromCart(cartItem?.id ?? "");
    } else {
      updateCartItem(cartItem?.id ?? "", quantity);
    }
  };

  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit order</DialogTitle>
          <DialogDescription>
            Make changes to your order here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 w-fit">
          <Button variant="outline" onClick={decrementQuantity}>
            -
          </Button>
          <Input
            type="number"
            placeholder="Qty"
            className="w-24"
            min={0}
            max={300}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <Button variant="outline" onClick={incrementQuantity}>
            +
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSave}>
              Save order
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

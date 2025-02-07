"use client";
import Image from "next/image";
import { CardContent } from "./ui/card";
import { EllipsisVertical, PencilLine, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTrigger } from "./ui/dialog";
import { type CartItem } from "@/types/cart";
import { formatToRupiah } from "@/lib/stringUtils";
import { useCartStore } from "@/providers/CartProvider";

export default function CartList() {
  const { cart } = useCartStore((state) => state);

  return (
    <CardContent className="flex-1 overflow-y-auto border-y mb-4 pt-7 pb-4">
      <div className="flex flex-col gap-4">
        {cart?.cart_items.length && cart?.cart_items.length > 0 ? (
          cart?.cart_items.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground italic">No items in cart</p>
          </div>
        )}
      </div>
    </CardContent>
  );
}

function CartItem({ cartItem }: { cartItem: CartItem }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-2 w-4/5">
        <div className="w-16 h-16 rounded-md overflow-hidden">
          <Image
            src={cartItem.image_url ?? ""}
            alt={cartItem.name}
            width={50}
            height={50}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-base leading-5">{cartItem.name}</p>
          <p className="font-bold mt-2">
            {formatToRupiah(cartItem.total_price)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          x{cartItem.quantity}
        </span>
        <CartItemOptions cartItem={cartItem} />
      </div>
    </div>
  );
}

function CartItemOptions({ cartItem }: { cartItem: CartItem }) {
  const { setCartItem, removeFromCart } = useCartStore((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DialogTrigger asChild>
          <DropdownMenuItem onClick={() => setCartItem(cartItem)}>
            <PencilLine />
            Edit
          </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500"
          onClick={() => removeFromCart(cartItem.id)}
        >
          <Trash />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

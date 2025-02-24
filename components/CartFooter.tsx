"use client";
import { formatToRupiah } from "@/lib/stringUtils";
import { CardFooter } from "./ui/card";
import { useCartStore } from "@/providers/CartProvider";
import DiscardCartDialog from "./DiscardCartDialog";
import SaveCartDialog from "./SaveCartDialog";

export default function CartFooter() {
  const { cart } = useCartStore((state) => state);

  return (
    <CardFooter className="flex flex-col gap-4">
      <PriceSection totalPrice={cart?.total_price || 0} />
      <div className="w-full mt-4 space-y-2">
        <SaveCartDialog />
        <DiscardCartDialog />
      </div>
    </CardFooter>
  );
}

function PriceSection({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="flex justify-between w-full">
      <div>
        <span className="text-xl font-semibold">Total</span>
      </div>
      <div>
        <span className="text-xl font-semibold">
          {formatToRupiah(totalPrice)}
        </span>
      </div>
    </div>
  );
}

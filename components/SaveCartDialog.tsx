"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useCartStore } from "@/providers/CartProvider";
import { Save } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { saveOrderSchema } from "@/lib/schemas";
import { useEffect, useState } from "react";
import { formatToRupiah } from "@/lib/stringUtils";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { saveTransaction } from "@/actions/transactions";

type SaveOrderSchema = z.infer<typeof saveOrderSchema>;

export default function SaveCartDialog() {
  const { cart, clearCart } = useCartStore((state) => state);
  const form = useForm<SaveOrderSchema>({
    resolver: zodResolver(saveOrderSchema),
    defaultValues: {
      paymentMethod: "cash",
      totalPayment: cart?.total_price,
    },
  });
  const {
    formState: { isSubmitting, errors },
  } = form;
  const { toast } = useToast();
  const [moneyBack, setMoneyBack] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async (data: SaveOrderSchema) => {
    try {
      if (!cart || cart.cart_items.length === 0) {
        throw new Error("Cart is empty");
      }

      const cartData = {
        payment_method: data.paymentMethod,
        total_payment: data.totalPayment,
        total_price: cart.total_price,
        quantity: cart.quantity,
        payment_status: "paid",
        transaction_items: cart.cart_items.map((item) => ({
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          total_price: item.total_price,
        })),
      };

      const res = await saveTransaction(cartData);

      if (!res.success) {
        throw Error(res.data ?? "Something went wrong");
      }

      clearCart();
      setIsOpen(false);

      toast({
        title: "Order saved successfully",
        description: "Order has been saved successfully",
      });
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message:
          (error as { message?: string })?.message ?? "Something went wrong",
      });
      setIsOpen(false);
    }
  };

  const handleMoneyBack = (value: number) => {
    if (cart) {
      if (isNaN(value)) {
        setMoneyBack(-cart.total_price);
      } else {
        setMoneyBack(value - cart.total_price);
      }
    }
  };

  useEffect(() => {
    form.setValue("totalPayment", cart?.total_price ?? 0);
    setMoneyBack(form.getValues("totalPayment") - (cart?.total_price ?? 0));
  }, [cart, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg" disabled={!cart}>
          <Save size={16} />
          Save Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Order</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="qris">QRIS</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Payment</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Total Payment"
                        required
                        type="number"
                        disabled={isSubmitting}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(parseInt(value));
                          handleMoneyBack(parseInt(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className="text-sm font-medium mb-2">Money Back</p>
                <span
                  className={cn(
                    "text-xl font-semibold",
                    moneyBack >= 0 ? "text-green-500" : "text-red-500"
                  )}
                >
                  {formatToRupiah(moneyBack)}
                </span>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Order"}
                </Button>
              </div>
              {errors.root && (
                <FormMessage className="text-center">
                  {errors.root.message}
                </FormMessage>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

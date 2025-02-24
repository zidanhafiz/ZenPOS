"use server";
import { createClient } from "@/lib/supabase/server";

type CartData = {
  payment_method: string;
  total_payment: number;
  payment_status: string;
  total_price: number;
  quantity: number;
  transaction_items: {
    product_name: string;
    price: number;
    quantity: number;
    total_price: number;
  }[];
};

export const saveTransaction = async (cart: CartData) => {
  try {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) throw new Error("Unauthorized");

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        payment_method: cart.payment_method,
        total_payment: cart.total_payment,
        total_price: cart.total_price,
        payment_status: "paid",
        quantity: cart.quantity,
        user_id: user.user.id,
      })
      .select()
      .single();

    if (error) throw error;

    if (!data) throw new Error("Transaction not found");

    const { error: transactionItemsError } = await supabase
      .from("transaction_items")
      .insert(
        cart.transaction_items.map((item) => ({
          ...item,
          transaction_id: data.id,
        }))
      );

    if (transactionItemsError) throw transactionItemsError;

    return {
      success: true,
      data: "Transaction saved successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};

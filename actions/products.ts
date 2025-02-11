"use server";
import { createClient } from "@/lib/supabase/server";

export const getAllProducts = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select("*");

    if (error) throw error;

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export const getProductById = async (id: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

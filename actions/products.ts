"use server";
import { createProductSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { File } from "buffer";
import { z } from "zod";
import { getProductImagePath } from "@/lib/stringUtils";

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

const extendedCreateProductSchema = createProductSchema.extend({
  image: z.instanceof(File),
});

export const createProduct = async (formData: FormData) => {
  try {
    const validatedFields = extendedCreateProductSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseInt(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      category: formData.get("category"),
      image: formData.get("image"),
    });

    if (!validatedFields.success) {
      throw new Error(validatedFields.error.message);
    }

    const { name, description, price, stock, category, image } =
      validatedFields.data;

    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) throw new Error("Unauthorized");

    const imageExt = image.name.split(".").pop();
    const imageName = `${name
      .split(" ")[0]
      .toLowerCase()}-${Date.now()}.${imageExt}`;
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const { error: imageUploadError } = await supabase.storage
      .from("products")
      .upload(imageName, imageBuffer, {
        contentType: image.type,
      });

    if (imageUploadError) throw imageUploadError;

    const { data: imageUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(imageName);

    const { data, error } = await supabase.from("products").insert({
      name,
      description,
      price,
      stock,
      category,
      image_url: imageUrlData.publicUrl,
      user_id: user.user.id,
    });

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/cashier");
    revalidateTag("products");

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const supabase = await createClient();

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    if (productError) throw productError;

    if (product.image_url) {
      const imagePath = getProductImagePath(product.image_url);
      const { error: imageDeleteError } = await supabase.storage
        .from("products")
        .remove([imagePath]);

      if (imageDeleteError) throw imageDeleteError;
    }

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/cashier");
    revalidateTag("products");

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: (error as Error).message,
    };
  }
};

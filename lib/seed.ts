"use server";
import { createClient } from "./supabase/server";

const products = [
  {
    id: "c3da0494-d3a3-490a-bf5a-4cb75f30f95e",
    name: "Minyak Goreng Bimoli 2L",
    description: "Minyak goreng berkualitas tinggi, 2L",
    category: "Minyak & Mentega",
    price: 24000,
    stock: 32,
    image_url:
      "https://drolefpblqnmtnpyotoh.supabase.co/storage/v1/object/public/products//bimoli.jpg",
  },
  {
    id: "923cb0f8-6d5b-4567-bd68-607eda49ae32",
    name: "Dettol Sabun Cair 800ml",
    description: "Sabun cair antibakteri, 800ml",
    category: "Perlengkapan Mandi",
    price: 32000,
    stock: 20,
    image_url:
      "https://drolefpblqnmtnpyotoh.supabase.co/storage/v1/object/public/products//dettol.jpeg",
  },
  {
    id: "f01b80ff-a5b5-4b55-a00d-19d5e7d372a1",
    name: "Ultra Milk Full Cream 1L",
    description: "Susu UHT full cream, 1L",
    category: "Susu & Olahan Susu",
    price: 17500,
    stock: 50,
    image_url:
      "https://drolefpblqnmtnpyotoh.supabase.co/storage/v1/object/public/products//ultramilk.jpg",
  },
  {
    id: "a57a0f69-75cb-430c-b195-81c4db04c746",
    name: "Sari Roti Tawar Jumbo",
    description: "Roti tawar Jumbo",
    category: "Makanan",
    price: 20000,
    stock: 10,
    image_url:
      "https://drolefpblqnmtnpyotoh.supabase.co/storage/v1/object/public/products//sari-roti.jpeg",
  },
  {
    id: "b5ffa703-37fe-4077-b739-660ab7be19a7",
    name: "Teh Kotak 250ml",
    description: "Teh kotak, 250ml",
    category: "Minuman",
    price: 4000,
    stock: 100,
    image_url:
      "https://drolefpblqnmtnpyotoh.supabase.co/storage/v1/object/public/products//teh-kotak.jpg",
  },
  {
    id: "d7775e8c-6bd2-4f60-9dca-950907df48a8",
    name: "Pocari Sweat 500ml",
    description: "Minuman isotonik, 500ml",
    category: "Minuman",
    price: 6000,
    stock: 48,
    image_url:
      "https://drolefpblqnmtnpyotoh.supabase.co/storage/v1/object/public/products//pocari-sweat.png",
  },
  {
    id: "f4993eb6-cf84-43b7-a68b-15ab12fa2a74",
    name: "Japota Honey Butter",
    description: "Japota Honey Butter, 68g",
    category: "Makanan",
    price: 11000,
    stock: 100,
    image_url:
      "https://drolefpblqnmtnpyotoh.supabase.co/storage/v1/object/public/products//japota.avif",
  },
];

const seedProducts = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").insert(products);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

const seedTransactions = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("transactions").insert([
      {
        user_id: "1",
        product_id: "1",
        quantity: 1,
        total_price: 24000,
      },
    ]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error seeding transactions:", error);
  }
};

async function seedDatabase() {
  try {
    const supabase = createClient();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

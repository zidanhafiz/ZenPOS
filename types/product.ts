import { Tables } from "@/database.types";

export type ProductSortBy = "created_at" | "name" | "price" | "stock";

export type Product = Tables<"products">;

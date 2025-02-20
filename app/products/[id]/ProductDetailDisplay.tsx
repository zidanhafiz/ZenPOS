"use client";
import { useState } from "react";
import ProductDetailCard from "./ProductDetailCard";
import { Product } from "@/types/product";
import { EditProductForm } from "./EditProductForm";

export default function ProductDetailDisplay({
  product,
}: {
  product: Product;
}) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  if (isEditMode) {
    return <EditProductForm product={product} setIsEditMode={setIsEditMode} />;
  }

  return <ProductDetailCard product={product} setIsEditMode={setIsEditMode} />;
}

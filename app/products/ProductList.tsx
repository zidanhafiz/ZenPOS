"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductStore } from "@/providers/ProductProvider";
import ViewToggleButton from "./ViewToggleButton";
import ProductTableList from "./ProductTableList";
import ProductGridList from "./ProductGridList";
import ProductListPagination from "./ProductListPagination";
import AddProductButton from "./AddProductButton";

export default function ProductList() {
  const { products, isLoading, error, view } = useProductStore(
    (state) => state
  );

  if (error) {
    throw error;
  }

  if (isLoading || !products) {
    return <ProductLoading />;
  }

  return (
    <div className="grid gap-3">
      <div className="flex justify-between items-center">
        <ViewToggleButton />
        <AddProductButton />
      </div>
      {view === "grid" ? (
        <ProductGridList products={products} />
      ) : (
        <ProductTableList products={products} />
      )}
      <ProductListPagination />
    </div>
  );
}

function ProductLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full mt-8">
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}

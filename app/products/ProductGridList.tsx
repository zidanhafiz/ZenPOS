import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductGridList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="col-span-full text-center mt-8 text-muted-foreground">
        No products found
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full mb-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

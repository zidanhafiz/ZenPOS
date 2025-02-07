import PageContainer from "@/components/PageContainer";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/actions/products";

export default async function CashierPage() {
  const products = await getAllProducts();

  if (!products.success) {
    throw new Error(products.error);
  }

  return (
    <PageContainer title="Cashier" description="Cashier system application">
      <div className="flex gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {products.data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

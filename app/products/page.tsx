import PageContainer from "@/components/PageContainer";
import ProductList from "./ProductList";
import SearchProductForm from "./SearchProductForm";
import { ProductStoreProvider } from "@/providers/ProductProvider";
import { Separator } from "@/components/ui/separator";

export default async function ProductsPage() {
  return (
    <PageContainer title="Products" description="All of products in the store">
      <ProductStoreProvider>
        <div>
          <SearchProductForm />
          <Separator className="my-3 md:my-2" />
          <ProductList />
        </div>
      </ProductStoreProvider>
    </PageContainer>
  );
}

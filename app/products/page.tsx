import PageContainer from "@/components/PageContainer";
import ProductList from "./ProductList";
import SearchProductForm from "./SearchProductForm";
import { ProductStoreProvider } from "@/providers/ProductProvider";

export default async function ProductsPage() {
  return (
    <PageContainer title="Products" description="All of products in the store">
      <ProductStoreProvider>
        <div>
          <SearchProductForm />
          <ProductList />
        </div>
      </ProductStoreProvider>
    </PageContainer>
  );
}

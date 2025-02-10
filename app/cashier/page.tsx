import PageContainer from "@/components/PageContainer";
import ProductList from "./ProductList";
import SearchProductForm from "./SearchProductForm";
import { CashierProductStoreProvider } from "@/providers/CashierProductProvider";
import { Separator } from "@/components/ui/separator";

export default async function CashierPage() {
  return (
    <PageContainer title="Cashier" description="Cashier system application">
      <CashierProductStoreProvider>
        <div>
          <SearchProductForm />
          <Separator className="my-5" />
          <ProductList />
        </div>
      </CashierProductStoreProvider>
    </PageContainer>
  );
}

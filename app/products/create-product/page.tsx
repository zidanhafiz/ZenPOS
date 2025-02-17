import PageContainer from "@/components/PageContainer";
import { CreateProductForm } from "./CreateProductForm";

export default function CreateProductPage() {
  return (
    <PageContainer title="Create Product" description="Create a new product">
      <CreateProductForm />
    </PageContainer>
  );
}

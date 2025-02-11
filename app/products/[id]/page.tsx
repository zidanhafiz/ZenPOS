import { getProductById } from "@/actions/products";
import { notFound } from "next/navigation";
import ProductDetailCard from "./ProductDetailCard";
import PageContainer from "@/components/PageContainer";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProductById(id);

  if (!product.success || !product.data) {
    notFound();
  }

  return (
    <PageContainer title={product.data.name} description="Product Details">
      <ProductDetailCard product={product.data} />
    </PageContainer>
  );
}

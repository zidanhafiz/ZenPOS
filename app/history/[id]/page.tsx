import { getTransactionById } from "@/actions/transactions";
import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatToRupiah } from "@/lib/stringUtils";
import { notFound } from "next/navigation";
import BackNavigation from "./BackNavigation";
import { Separator } from "@/components/ui/separator";
import ItemsTable from "./ItemsTable";

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transaction = await getTransactionById(id);

  if (!transaction.success || !transaction.data) {
    notFound();
  }

  return (
    <PageContainer title="History Detail" description="History Detail">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <BackNavigation />
          <CardTitle>
            {formatDate(transaction.data.created_at, "long")}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-2 p-0">
          <div className="flex gap-8 p-6 mb-4">
            <div className="space-y-2">
              <p>Payment Method</p>
              <p>Status</p>
              <p>Quantity</p>
              <p>Total Price</p>
              <p>Total Payment</p>
            </div>
            <div className="space-y-2">
              <p className="capitalize">: {transaction.data.payment_method}</p>
              <p>: {transaction.data.payment_status}</p>
              <p>: {transaction.data.quantity}</p>
              <p>: {formatToRupiah(transaction.data.total_price)}</p>
              <p>: {formatToRupiah(transaction.data.total_payment)}</p>
            </div>
          </div>
          <Separator />
          <div className="mt-2 p-6">
            <p className="font-semibold mb-2">Product Items</p>
            <ItemsTable items={transaction.data.transaction_items} />
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

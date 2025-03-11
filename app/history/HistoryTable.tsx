"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToRupiah, formatDate } from "@/lib/stringUtils";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";
import Link from "next/link";

export default function HistoryTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card className="p-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center hidden md:table-cell">
              Payment
            </TableHead>
            <TableHead className="text-center hidden md:table-cell">
              Status
            </TableHead>
            <TableHead className="text-center hidden md:table-cell">
              Quantity
            </TableHead>
            <TableHead className="text-right">Total Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={transaction.id}
              className="even:bg-slate-50 even:hover:bg-slate-50 hover:bg-transparent"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {formatDate(transaction.created_at, "long")}
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                {transaction.payment_method}
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                <Badge
                  className={cn(
                    transaction.payment_status === "PAID"
                      ? "bg-green-500 hover:bg-green-500/80"
                      : "bg-red-500 hover:bg-red-500/80"
                  )}
                >
                  {transaction.payment_status}
                </Badge>
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                {transaction.quantity}
              </TableCell>
              <TableCell className="text-right">
                {formatToRupiah(transaction.total_price)}
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm">
                  <Link href={`/history/${transaction.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

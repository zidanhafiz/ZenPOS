"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToRupiah } from "@/lib/stringUtils";
import { TransactionItem } from "@/types/transaction";

export default function ItemsTable({ items }: { items: TransactionItem[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-center hidden md:table-cell">
            Price
          </TableHead>
          <TableHead className="text-center hidden md:table-cell">
            Quantity
          </TableHead>
          <TableHead className="text-right">Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow
            key={item.id}
            className="even:bg-slate-50 even:hover:bg-slate-50 hover:bg-transparent"
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.product_name}</TableCell>
            <TableCell className="text-center hidden md:table-cell">
              {formatToRupiah(item.price ?? 0)}
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              {item.quantity} pcs
            </TableCell>
            <TableCell className="text-right">
              {formatToRupiah(item.total_price ?? 0)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

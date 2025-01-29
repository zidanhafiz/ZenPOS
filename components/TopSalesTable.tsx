import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const list = [
  {
    name: "Product 1",
    category: "Category 1",
    quantity: 10,
    totalAmount: "Rp. 250.000",
  },
  {
    name: "Product 2",
    category: "Category 2",
    quantity: 10,
    totalAmount: "Rp. 250.000",
  },
  {
    name: "Product 3",
    category: "Category 3",
    quantity: 10,
    totalAmount: "Rp. 250.000",
  },
];

export default function TopSalesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Sales This Month</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of top sales this month.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">{item.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}

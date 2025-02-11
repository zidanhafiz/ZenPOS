import { Product } from "@/types/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { formatToRupiah } from "@/lib/stringUtils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteAlertDialog from "./DeleteAlertDialog";

export default function ProductTableList({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) {
    return (
      <p className="col-span-full text-center mt-8 text-muted-foreground">
        No products found
      </p>
    );
  }
  return (
    <Card className="pt-4">
      <CardContent>
        <ProductTable products={products} />
      </CardContent>
    </Card>
  );
}

function ProductTable({ products }: { products: Product[] }) {
  return (
    <Table className="w-full">
      <TableCaption>A list of products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Description</TableHead>
          <TableHead className="hidden sm:table-cell">Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium text-muted-foreground">
              {index + 1}
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="hidden sm:table-cell">
              {product.description}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {product.category}
            </TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{formatToRupiah(product.price)}</TableCell>
            <TableCell className="flex flex-col md:flex-row gap-2 justify-end">
              <Button size="sm" asChild>
                <Link href={`/products/${product.id}`}>Details</Link>
              </Button>
              <DeleteAlertDialog productId={product.id} size="sm">
                Delete
              </DeleteAlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatToRupiah } from "@/lib/stringUtils";
import { Button } from "@/components/ui/button";
import DeleteAlertDialog from "../DeleteAlertDialog";
import BackNavigation from "./BackNavigation";
import { Pencil, Trash } from "lucide-react";

export default function ProductDetailCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <BackNavigation />
      </CardHeader>
      <CardContent className="grid items-center md:grid-cols-[auto,1fr] gap-8">
        <Image
          src={product.image_url || "/images/placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover mx-auto rounded-lg"
        />
        <ProductDetailContent product={product} />
      </CardContent>
      <Separator />
      <ProductActionButtons productId={product.id} />
    </Card>
  );
}

function ProductDetailContent({ product }: { product: Product }) {
  return (
    <div>
      <Badge className="rounded-full">{product.category}</Badge>
      <h4 className="my-3 text-xl font-bold">{product.name}</h4>
      <p className="text-muted-foreground">{product.description}</p>
      <Separator className="my-4" />
      <p className="text-2xl font-bold">{formatToRupiah(product.price)}</p>
      <Separator className="my-6" />
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-semibold block">Stock</span>
          <p className="text-lg text-muted-foreground">{product.stock} pcs</p>
        </div>
        <div>
          <span className="font-semibold block">Time created</span>
          <p className="text-lg text-muted-foreground">
            {formatDate(product.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductActionButtons({ productId }: { productId: string }) {
  return (
    <CardFooter className="mt-4 flex gap-2 md:gap-4 justify-end">
      <DeleteAlertDialog productId={productId} size="default">
        <Trash />
        Delete Product
      </DeleteAlertDialog>
      <Button>
        <Pencil />
        Edit Product
      </Button>
    </CardFooter>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatToRupiah } from "@/lib/stringUtils";
import { Product } from "@/types/product";
import { ArrowUpRightIcon, MoveUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="rounded-lg w-full">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className="text-xs">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={product.image_url ?? ""}
          alt={product.name}
          width={150}
          height={150}
          className="mx-auto"
        />
      </CardContent>
      <Separator />
      <CardFooter className="mt-4 flex justify-between gap-2 items-center">
        <span className="text-base font-semibold">
          {formatToRupiah(product.price)}
        </span>
        <Button asChild>
          <Link href={`/products/${product.id}`}>
            Details
            <ArrowUpRightIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AddProductButton() {
  return (
    <Button asChild>
      <Link href="/products/create-product">
        <Plus />
        Add New Product
      </Link>
    </Button>
  );
}

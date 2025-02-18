"use client";
import { deleteProduct } from "@/actions/products";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function DeleteAlertDialog({
  productId,
  size = "sm",
  children,
}: {
  productId: string;
  size?: "sm" | "default";
  children?: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await deleteProduct(productId);

      if (!res.success) {
        throw new Error(res.data ?? "Failed to delete product");
      }

      toast({
        title: "Success deleted product",
        description: "Product deleted successfully",
      });

      if (pathname === "/products") {
        router.refresh();
      } else {
        router.push("/products");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error deleting product",
        description: "Failed to delete product",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size={size}>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Product"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

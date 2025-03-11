import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function BackNavigation() {
  return (
    <Link
      href="/history"
      className="text-sm text-muted-foreground flex items-center gap-2 w-fit"
    >
      <ArrowLeftIcon className="w-4 h-4" />
      Back to products
    </Link>
  );
}

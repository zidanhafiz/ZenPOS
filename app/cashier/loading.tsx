import { Skeleton } from "@/components/ui/skeleton";

export default function CashierLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="w-full lg:w-1/4 h-10" />
      </div>
      <div>
        <Skeleton className="w-full h-10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>
      <div>
        <Skeleton className="w-full h-60" />
      </div>
    </div>
  );
}

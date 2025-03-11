import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryDetailLoading() {
  return (
    <div>
      <Skeleton className="h-[30px] w-[250px]" />
      <div className="space-y-4 mt-8">
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[100px] w-full" />
      </div>
    </div>
  );
}

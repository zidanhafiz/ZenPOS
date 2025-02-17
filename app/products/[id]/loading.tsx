import { Skeleton } from "@/components/ui/skeleton";

export default function DetailLoading() {
  return (
    <div className="flex flex-col gap-7">
      <Skeleton className="w-[250px] h-[24px] rounded-md" />
      <Skeleton className="w-full h-[500px] md:h-[300px] rounded-md" />
    </div>
  );
}

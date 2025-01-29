import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ReactNode } from "react";

export default function ReportCard({
  title,
  logo,
  badgeColor,
  value,
  percentage,
  date,
}: {
  title: string;
  logo: ReactNode;
  badgeColor: string;
  value: string | number;
  percentage: string;
  date: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-start space-y-0 gap-3">
        <span className={`${badgeColor} p-2 rounded-md`}>{logo}</span>
        <span className="text-base">{title ?? "Lorem"}</span>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value ?? "$0"}</p>
        <div className="flex gap-1">
          <span
            className={cn(
              "text-xs",
              percentage.includes("+") ? "text-green-700" : "text-red-700"
            )}
          >
            {percentage ?? "+0.00%"}
          </span>
          <span className="text-xs text-muted-foreground">
            {date ?? "from last month"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Get the month name
const currentMonth = new Date().toLocaleString("default", { month: "long" });

const lastMonth = new Date(
  new Date().setMonth(new Date().getMonth() - 1)
).toLocaleString("default", { month: "long" });

const year = new Date().getFullYear();

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function VisitorChart({
  visitors,
  percentage,
}: {
  visitors: number;
  percentage: string;
}) {
  const chartData = [
    { value: "value", visitors: visitors, fill: "var(--color-value)" },
  ];

  return (
    <Card className="flex flex-col w-full xl:max-w-[400px] xl:max-h-[650px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Visitors</CardTitle>
        <CardDescription>
          {lastMonth} - {currentMonth} {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] lg:h-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <span
            className={cn(
              percentage.includes("+") ? "text-green-700" : "text-red-700"
            )}
          >
            {percentage}
          </span>
          this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for this month
        </div>
      </CardFooter>
    </Card>
  );
}

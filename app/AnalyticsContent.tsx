"use client";
import { BadgeDollarSign, Box, Coins, NotepadText } from "lucide-react";
import VisitorChart from "@/components/VisitorChart";
import TopSalesTable from "@/components/TopSalesTable";
import SalesChart from "@/components/SalesChart";
import ReportCard from "@/components/ReportCard";
import { formatToRupiah } from "@/lib/stringUtils";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AnalyticsOverviewResponse,
  ReportResponse,
  RevenueOverviewResponse,
} from "@/types/api-response/analyticsTypes";
import { ErrorResponse } from "@/types/api-response/ErrorResponse";

export default function AnalyticsContent() {
  return (
    <>
      <OverviewSection />
      <div className="my-6 grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-4 w-full">
        <SalesChartSection />
        <VisitorsChartSection />
      </div>
      <TopSalesChartSection />
    </>
  );
}

function OverviewSection() {
  const { data, error, isLoading } = useSWR<
    AnalyticsOverviewResponse,
    ErrorResponse
  >("/api/analytics/overview", fetcher);

  if (error) {
    throw new Error(error.message);
  }

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      <ReportCard
        title="Total Revenue"
        value={formatToRupiah(data.data.revenue.value)}
        badgeColor="bg-red-100"
        logo={<BadgeDollarSign className="text-red-500" />}
        percentage={data.data.revenue.percentage_change}
        date="from last month"
      />
      <ReportCard
        title="Total Orders"
        value={data.data.orders.value}
        badgeColor="bg-sky-100"
        logo={<NotepadText className="text-sky-500" />}
        percentage={data.data.orders.percentage_change}
        date="from last month"
      />
      <ReportCard
        title="Average Sale"
        value={formatToRupiah(data.data.sales.value)}
        badgeColor="bg-green-100"
        logo={<Coins className="text-green-500" />}
        percentage={data.data.sales.percentage_change}
        date="from last month"
      />
      <ReportCard
        title="Total Products Sales"
        value={data.data.products.value}
        badgeColor="bg-blue-100"
        logo={<Box className="text-blue-500" />}
        percentage={data.data.products.percentage_change}
        date="from last month"
      />
    </div>
  );
}

function SalesChartSection() {
  const { data, error, isLoading } = useSWR<
    RevenueOverviewResponse,
    ErrorResponse
  >("/api/analytics/revenue", fetcher);

  if (error) {
    throw new Error(error.message);
  }

  if (isLoading || !data) {
    return <Skeleton className="w-full h-60" />;
  }

  return <SalesChart revenueData={data.data} />;
}

function VisitorsChartSection() {
  const { data, error, isLoading } = useSWR<ReportResponse, ErrorResponse>(
    "/api/analytics/visitors",
    fetcher
  );

  if (error) {
    throw new Error(error.message);
  }

  if (isLoading || !data) {
    return <Skeleton className="w-52 h-60" />;
  }

  return (
    <VisitorChart
      visitors={data.data.value}
      percentage={data.data.percentage_change}
    />
  );
}

function TopSalesChartSection() {
  const { data, error, isLoading } = useSWR<ReportResponse, ErrorResponse>(
    "/api/analytics/sales",
    fetcher
  );

  if (error) {
    throw new Error(error.message);
  }

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    );
  }

  return <TopSalesTable />;
}

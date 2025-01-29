import {
  getAnalyticsData,
  getRevenueOverview,
  getTopSales,
  getTotalVisitors,
} from "@/actions/analytics";
import PageContainer from "@/components/PageContainer";
import ReportCard from "@/components/ReportCard";
import SalesChart from "@/components/SalesChart";
import TopSalesTable from "@/components/TopSalesTable";
import VisitorChart from "@/components/VisitorChart";
import { formatToRupiah } from "@/lib/stringUtils";
import { BadgeDollarSign, Box, Coins, NotepadText } from "lucide-react";

export default async function Home() {
  const analyticsCardData = await getAnalyticsData();
  const visitors = await getTotalVisitors();
  const revenueData = await getRevenueOverview();

  await getTopSales();

  return (
    <PageContainer
      title="Dashboard"
      description="Here is your analytics store details"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <ReportCard
          title="Total Revenue"
          value={formatToRupiah(analyticsCardData.revenue.value)}
          badgeColor="bg-red-100"
          logo={<BadgeDollarSign className="text-red-500" />}
          percentage={analyticsCardData.revenue.percentage_change}
          date="from last month"
        />
        <ReportCard
          title="Total Orders"
          value={analyticsCardData.orders.value}
          badgeColor="bg-sky-100"
          logo={<NotepadText className="text-sky-500" />}
          percentage={analyticsCardData.orders.percentage_change}
          date="from last month"
        />
        <ReportCard
          title="Average Sale"
          value={formatToRupiah(analyticsCardData.sales.value)}
          badgeColor="bg-green-100"
          logo={<Coins className="text-green-500" />}
          percentage={analyticsCardData.sales.percentage_change}
          date="from last month"
        />
        <ReportCard
          title="Total Products Sales"
          value={analyticsCardData.products.value}
          badgeColor="bg-blue-100"
          logo={<Box className="text-blue-500" />}
          percentage={analyticsCardData.products.percentage_change}
          date="from last month"
        />
      </div>
      <div className="my-6 grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-4 w-full">
        <SalesChart revenueData={revenueData} />
        <VisitorChart
          visitors={visitors.value}
          percentage={visitors.percentage_change}
        />
      </div>
      <TopSalesTable />
    </PageContainer>
  );
}

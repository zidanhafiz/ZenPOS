export type AnalyticsOverviewResponse = {
  data: {
    revenue: {
      value: number;
      percentage_change: string;
    };
    orders: {
      value: number;
      percentage_change: string;
    };
    sales: {
      value: number;
      percentage_change: string;
    };
    products: {
      value: number;
      percentage_change: string;
    };
  };
};

export type ReportResponse = {
  data: {
    value: number;
    percentage_change: string;
  };
};

export type RevenueOverviewResponse = {
  data: {
    month: string;
    value: number;
  }[];
};

"use server";
import { type SupabaseClient } from "@supabase/supabase-js";

export const getTotalRevenue = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7); // Format: YYYY-MM
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1)
      .toISOString()
      .slice(0, 7);

    // Fetch transactions data for the last months
    const { data: transactionsData, error: transactionsError } = await supabase
      .from("transactions")
      .select("created_at, total_price, quantity, payment_status")
      .eq("payment_status", "COMPLETED") // Only include completed payments
      .gte("created_at", new Date(lastMonth).toISOString())
      .order("created_at", { ascending: true });

    if (transactionsError) {
      throw transactionsError;
    }

    // Calculate total revenue by month
    const revenueByMonth: Record<string, number> = transactionsData.reduce(
      (acc: Record<string, number>, record) => {
        const month = new Date(record.created_at).toISOString().slice(0, 7);
        const revenue = record.total_price * record.quantity;
        acc[month] = (acc[month] || 0) + revenue;
        return acc;
      },
      {}
    );

    // Get revenue for current and last month
    const currentMonthRevenue = revenueByMonth[currentMonth] || 0;
    const lastMonthRevenue = revenueByMonth[lastMonth] || 0;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthRevenue > 0) {
      percentageChange =
        ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
    }

    // Format percentage with + or - prefix and % suffix
    const formattedPercentage = `${
      percentageChange >= 0 ? "+" : ""
    }${percentageChange.toFixed(2)}%`;

    // Return the results
    return {
      value: currentMonthRevenue, // Changed to return current month revenue instead of total
      percentage_change: formattedPercentage,
    };
  } catch (error) {
    console.error(error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getTotalOrders = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1)
      .toISOString()
      .slice(0, 7);

    // Fetch orders from the beginning of last month
    const { data, error } = await supabase
      .from("transactions")
      .select("created_at")
      .gte("created_at", new Date(lastMonth).toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    // Count orders by month
    const ordersByMonth = data.reduce((acc: Record<string, number>, record) => {
      const month = new Date(record.created_at).toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const currentMonthOrders = ordersByMonth[currentMonth] || 0;
    const lastMonthOrders = ordersByMonth[lastMonth] || 0;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthOrders > 0) {
      percentageChange =
        ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
    }

    // Format percentage with + or - prefix and % suffix
    const formattedPercentage = `${
      percentageChange >= 0 ? "+" : ""
    }${percentageChange.toFixed(2)}%`;

    return {
      value: currentMonthOrders,
      percentage_change: formattedPercentage,
    };
  } catch (error) {
    console.error(error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getAverageSales = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1)
      .toISOString()
      .slice(0, 7);

    // Fetch data for current and last month
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .gte("created_at", new Date(lastMonth).toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      throw error.message;
    }

    // Calculate sales by month
    const salesByMonth = data.reduce(
      (acc: Record<string, { total: number; days: Set<string> }>, record) => {
        const month = new Date(record.created_at).toISOString().slice(0, 7);
        const day = new Date(record.created_at).toISOString().slice(0, 10);
        const revenue = record.total_price * record.quantity;

        if (!acc[month]) {
          acc[month] = { total: 0, days: new Set() };
        }

        acc[month].total += revenue;
        acc[month].days.add(day);
        return acc;
      },
      {}
    );

    // Calculate average daily sales for current and last month
    const currentMonthData = salesByMonth[currentMonth] || {
      total: 0,
      days: new Set(),
    };
    const lastMonthData = salesByMonth[lastMonth] || {
      total: 0,
      days: new Set(),
    };

    const currentMonthAverage =
      currentMonthData.days.size > 0
        ? currentMonthData.total / currentMonthData.days.size
        : 0;
    const lastMonthAverage =
      lastMonthData.days.size > 0
        ? lastMonthData.total / lastMonthData.days.size
        : 0;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthAverage > 0) {
      percentageChange =
        ((currentMonthAverage - lastMonthAverage) / lastMonthAverage) * 100;
    }

    // Format percentage with + or - prefix and % suffix
    const formattedPercentage = `${
      percentageChange >= 0 ? "+" : ""
    }${percentageChange.toFixed(2)}%`;

    return {
      value: currentMonthAverage,
      percentage_change: formattedPercentage,
    };
  } catch (error) {
    console.error(error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getTotalProductSales = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1)
      .toISOString()
      .slice(0, 7);

    // Fetch data from the beginning of last month
    const { data, error } = await supabase
      .from("transactions")
      .select("created_at, quantity")
      .gte("created_at", new Date(lastMonth).toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    // Calculate total products sold by month
    const productsByMonth = data.reduce(
      (acc: Record<string, number>, record) => {
        const month = new Date(record.created_at).toISOString().slice(0, 7);
        acc[month] = (acc[month] || 0) + record.quantity;
        return acc;
      },
      {}
    );

    const currentMonthProducts = productsByMonth[currentMonth] || 0;
    const lastMonthProducts = productsByMonth[lastMonth] || 0;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthProducts > 0) {
      percentageChange =
        ((currentMonthProducts - lastMonthProducts) / lastMonthProducts) * 100;
    }

    // Format percentage with + or - prefix and % suffix
    const formattedPercentage = `${
      percentageChange >= 0 ? "+" : ""
    }${percentageChange.toFixed(2)}%`;

    return {
      value: currentMonthProducts,
      percentage_change: formattedPercentage,
    };
  } catch (error) {
    console.error("Error fetching total product sales:", error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getTotalVisitors = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1)
      .toISOString()
      .slice(0, 7);

    const { data, error } = await supabase
      .from("transactions")
      .select("created_at, payment_status")
      .eq("payment_status", "PAID")
      .gte("created_at", new Date(lastMonth).toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    // Count visitors by month
    const visitorsByMonth = data.reduce(
      (acc: Record<string, number>, record) => {
        const month = new Date(record.created_at).toISOString().slice(0, 7);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      },
      {}
    );

    const currentMonthVisitors = visitorsByMonth[currentMonth] || 0;
    const lastMonthVisitors = visitorsByMonth[lastMonth] || 0;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthVisitors > 0) {
      percentageChange =
        ((currentMonthVisitors - lastMonthVisitors) / lastMonthVisitors) * 100;
    }

    // Format percentage with + or - prefix and % suffix
    const formattedPercentage = `${
      percentageChange >= 0 ? "+" : ""
    }${percentageChange.toFixed(2)}%`;

    return {
      value: currentMonthVisitors,
      percentage_change: formattedPercentage,
    };
  } catch (error) {
    console.error(error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getRevenueOverview = async (supabase: SupabaseClient) => {
  const now = new Date();
  try {
    // Get dates for the last 6 months
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const { data, error } = await supabase
      .from("transactions")
      .select("created_at, total_price, quantity, payment_status")
      .eq("payment_status", "COMPLETED")
      .gte("created_at", sixMonthsAgo.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    // Initialize array for last 6 months with 0 values
    const monthsData = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        month: date.toLocaleString("default", { month: "long" }),
        value: 0, // Initialize all months with 0
      };
    }).reverse();

    // Only update values for months that have sales data
    if (data && data.length > 0) {
      data.forEach((record) => {
        const recordDate = new Date(record.created_at);
        const monthIndex = monthsData.findIndex(
          (item) =>
            item.month ===
            recordDate.toLocaleString("default", { month: "long" })
        );

        if (monthIndex !== -1) {
          monthsData[monthIndex].value += record.total_price * record.quantity;
        }
      });
    }

    return monthsData; // Returns array with 0 values for months without sales
  } catch (error) {
    console.error("Error in getRevenueOverview:", error);
    return Array.from({ length: 6 }, (_, i) => ({
      month: new Date(now.getFullYear(), now.getMonth() - i, 1).toLocaleString(
        "default",
        { month: "long" }
      ),
      value: 0,
    })).reverse(); // Return zeroed data on error
  }
};

export const getTopSales = async (supabase: SupabaseClient) => {
  try {
    // Get current month's start date
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).toISOString();

    const { data, error } = await supabase
      .from("transactions")
      .select(
        "created_at, quantity, total_price, payment_status, transaction_items (*)"
      )
      .eq("payment_status", "COMPLETED")
      .gte("created_at", startOfMonth)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const allProducts: Array<{ product_id: string; quantity: number }> = [];
    data.forEach((transaction) => {
      transaction.transaction_items.forEach((item) => {
        if (item.product_id && item.quantity) {
          allProducts.push({
            product_id: item.product_id,
            quantity: item.quantity,
          });
        }
      });
    });

    const mostSoldProduct = allProducts.reduce(
      (acc: Record<string, number>, product) => {
        acc[product.product_id] =
          (acc[product.product_id] || 0) + product.quantity;
        return acc;
      },
      {}
    );

    const sortedProducts = Object.entries(mostSoldProduct).sort(
      (a, b) => b[1] - a[1]
    );
    const top5Products = sortedProducts.slice(0, 5);

    return top5Products;
  } catch (error) {
    console.error("Error fetching top sales:", error);
    return [];
  }
};

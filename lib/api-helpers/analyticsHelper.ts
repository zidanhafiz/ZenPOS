"use server";
import { type SupabaseClient } from "@supabase/supabase-js";

export const getTotalRevenue = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch current month transactions
    const { data: currentMonthData, error: currentMonthError } = await supabase
      .from("transactions")
      .select("total_price, quantity")
      .eq("payment_status", "PAID")
      .gte("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (currentMonthError) {
      console.error("Error fetching current month revenue:", currentMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Fetch last month transactions
    const { data: lastMonthData, error: lastMonthError } = await supabase
      .from("transactions")
      .select("total_price, quantity")
      .eq("payment_status", "PAID")
      .gte("created_at", lastMonthStart.toISOString())
      .lt("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (lastMonthError) {
      console.error("Error fetching last month revenue:", lastMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Calculate total revenue for current month
    const currentMonthRevenue = currentMonthData.reduce((total, transaction) => {
      return total + transaction.total_price;
    }, 0);

    // Calculate total revenue for last month
    const lastMonthRevenue = lastMonthData.reduce((total, transaction) => {
      return total + transaction.total_price;
    }, 0);

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthRevenue > 0) {
      percentageChange = ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
    }

    // Format percentage with + or - prefix and % suffix
    const formattedPercentage = `${
      percentageChange >= 0 ? "+" : ""
    }${percentageChange.toFixed(2)}%`;

    // Return the results
    return {
      value: currentMonthRevenue,
      percentage_change: formattedPercentage,
    };
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getTotalOrders = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch current month orders
    const { data: currentMonthData, error: currentMonthError } = await supabase
      .from("transactions")
      .select("id")
      .eq("payment_status", "PAID")
      .gte("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (currentMonthError) {
      console.error("Error fetching current month orders:", currentMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Fetch last month orders
    const { data: lastMonthData, error: lastMonthError } = await supabase
      .from("transactions")
      .select("id")
      .eq("payment_status", "PAID")
      .gte("created_at", lastMonthStart.toISOString())
      .lt("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (lastMonthError) {
      console.error("Error fetching last month orders:", lastMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Get order counts
    const currentMonthOrders = currentMonthData.length;
    const lastMonthOrders = lastMonthData.length;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthOrders > 0) {
      percentageChange = ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;
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
    console.error("Error calculating total orders:", error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getAverageDailySales = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    // Fetch current month transactions
    const { data: currentMonthData, error: currentMonthError } = await supabase
      .from("transactions")
      .select("total_price, created_at")
      .eq("payment_status", "PAID")
      .gte("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (currentMonthError) {
      console.error("Error fetching current month sales:", currentMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Fetch last month transactions
    const { data: lastMonthData, error: lastMonthError } = await supabase
      .from("transactions")
      .select("total_price, created_at")
      .eq("payment_status", "PAID")
      .gte("created_at", lastMonthStart.toISOString())
      .lt("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (lastMonthError) {
      console.error("Error fetching last month sales:", lastMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Group current month sales by day
    const currentMonthDays = new Set();
    let currentMonthTotal = 0;
    
    currentMonthData.forEach(transaction => {
      const day = new Date(transaction.created_at).toISOString().slice(0, 10);
      currentMonthDays.add(day);
      currentMonthTotal += transaction.total_price;
    });

    // Group last month sales by day
    const lastMonthDays = new Set();
    let lastMonthTotal = 0;
    
    lastMonthData.forEach(transaction => {
      const day = new Date(transaction.created_at).toISOString().slice(0, 10);
      lastMonthDays.add(day);
      lastMonthTotal += transaction.total_price;
    });

    // Calculate average daily sales
    const currentMonthAverage = currentMonthDays.size > 0 
      ? currentMonthTotal / currentMonthDays.size 
      : 0;
      
    const lastMonthAverage = lastMonthDays.size > 0 
      ? lastMonthTotal / lastMonthDays.size 
      : 0;

    // Calculate percentage change with improved handling
    let formattedPercentage;
    
    if (lastMonthAverage > 0) {
      // Normal case: last month had some sales
      const percentageChange = ((currentMonthAverage - lastMonthAverage) / lastMonthAverage) * 100;
      formattedPercentage = `${percentageChange >= 0 ? "+" : ""}${percentageChange.toFixed(2)}%`;
    } else if (currentMonthAverage > 0 && lastMonthAverage === 0) {
      // Case: No sales last month, but sales this month (infinite growth technically)
      formattedPercentage = "+∞%"; // Using infinity symbol for unlimited growth
    } else if (currentMonthAverage === 0 && lastMonthAverage === 0) {
      // Case: No sales in either month
      formattedPercentage = "+0.00%";
    } else if (currentMonthAverage === 0 && lastMonthAverage > 0) {
      // Case: Had sales last month, but none this month (100% loss)
      formattedPercentage = "-100.00%";
    } else {
      // Fallback for any unexpected scenario
      formattedPercentage = "+0.00%";
    }

    return {
      value: parseFloat(currentMonthAverage.toFixed(2)),
      percentage_change: formattedPercentage,
    };
  } catch (error) {
    console.error("Error calculating average daily sales:", error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getTotalProductSales = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch current month product sales
    const { data: currentMonthData, error: currentMonthError } = await supabase
      .from("transactions")
      .select("quantity")
      .eq("payment_status", "PAID")
      .gte("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (currentMonthError) {
      console.error("Error fetching current month product sales:", currentMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Fetch last month product sales
    const { data: lastMonthData, error: lastMonthError } = await supabase
      .from("transactions")
      .select("quantity")
      .eq("payment_status", "PAID")
      .gte("created_at", lastMonthStart.toISOString())
      .lt("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (lastMonthError) {
      console.error("Error fetching last month product sales:", lastMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Calculate total products sold in current month
    const currentMonthProducts = currentMonthData.reduce((total, transaction) => {
      return total + (transaction.quantity || 0);
    }, 0);

    // Calculate total products sold in last month
    const lastMonthProducts = lastMonthData.reduce((total, transaction) => {
      return total + (transaction.quantity || 0);
    }, 0);

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthProducts > 0) {
      percentageChange = ((currentMonthProducts - lastMonthProducts) / lastMonthProducts) * 100;
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
    console.error("Error calculating total product sales:", error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getTotalVisitors = async (supabase: SupabaseClient) => {
  try {
    // Get current and last month dates
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch current month visitors (transactions)
    const { data: currentMonthData, error: currentMonthError } = await supabase
      .from("transactions")
      .select("id")
      .eq("payment_status", "PAID")
      .gte("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (currentMonthError) {
      console.error("Error fetching current month visitors:", currentMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Fetch last month visitors (transactions)
    const { data: lastMonthData, error: lastMonthError } = await supabase
      .from("transactions")
      .select("id")
      .eq("payment_status", "PAID")
      .gte("created_at", lastMonthStart.toISOString())
      .lt("created_at", currentMonthStart.toISOString())
      .order("created_at", { ascending: true });

    if (lastMonthError) {
      console.error("Error fetching last month visitors:", lastMonthError);
      return { value: 0, percentage_change: "+0.00%" };
    }

    // Count total visitors for each month (each transaction = 1 visitor)
    const currentMonthVisitors = currentMonthData.length;
    const lastMonthVisitors = lastMonthData.length;

    // Calculate percentage change
    let percentageChange = 0;
    if (lastMonthVisitors > 0) {
      percentageChange = ((currentMonthVisitors - lastMonthVisitors) / lastMonthVisitors) * 100;
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
    console.error("Error calculating total visitors:", error);
    return { value: 0, percentage_change: "+0.00%" };
  }
};

export const getRevenueOverview = async (supabase: SupabaseClient) => {
  const now = new Date();
  try {
    // Get dates for the last 6 months
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // Fetch transactions for the last 6 months
    const { data, error } = await supabase
      .from("transactions")
      .select("created_at, total_price")
      .eq("payment_status", "PAID")
      .gte("created_at", sixMonthsAgo.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching revenue overview:", error);
      // Return zeroed data on error
      const fallbackData = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        fallbackData.push({
          month: date.toLocaleString("default", { month: "long" }),
          value: 0,
        });
      }
      return fallbackData;
    }

    // Initialize array for last 6 months with 0 values
    const monthsData: Array<{month: string; year: number; value: number}> = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthsData.push({
        month: date.toLocaleString("default", { month: "long" }),
        year: date.getFullYear(),
        value: 0,
      });
    }

    // Update values for months that have sales data
    if (data && data.length > 0) {
      data.forEach((record) => {
        const recordDate = new Date(record.created_at);
        const recordMonth = recordDate.toLocaleString("default", { month: "long" });
        const recordYear = recordDate.getFullYear();
        
        const monthIndex = monthsData.findIndex(
          (item) => item.month === recordMonth && item.year === recordYear
        );

        if (monthIndex !== -1) {
          monthsData[monthIndex].value += record.total_price;
        }
      });
    }

    // Format the values and return only the month names and values
    return monthsData.map(item => ({
      month: item.month,
      value: parseFloat(item.value.toFixed(2))
    }));
  } catch (error) {
    console.error("Error in getRevenueOverview:", error);
    // Return zeroed data on error
    const fallbackData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      fallbackData.push({
        month: date.toLocaleString("default", { month: "long" }),
        value: 0,
      });
    }
    return fallbackData;
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

    // First get all transactions for the current month
    const { data, error } = await supabase
      .from("transactions")
      .select(
        "created_at, quantity, total_price, payment_status, transaction_items (*)"
      )
      .eq("payment_status", "PAID")
      .gte("created_at", startOfMonth)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Extract product IDs and quantities from transaction items
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

    // Aggregate quantities by product ID
    const mostSoldProduct = allProducts.reduce(
      (acc: Record<string, number>, product) => {
        acc[product.product_id] =
          (acc[product.product_id] || 0) + product.quantity;
        return acc;
      },
      {}
    );

    // Sort products by quantity
    const sortedProducts = Object.entries(mostSoldProduct).sort(
      (a, b) => b[1] - a[1]
    );
    
    // Get top 5 product IDs
    const top5ProductIds = sortedProducts.slice(0, 5).map(([id]) => id);
    
    if (top5ProductIds.length === 0) {
      return [];
    }
    
    // Fetch product details for the top products
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("id, name, price")
      .in("id", top5ProductIds);
      
    if (productsError) {
      throw productsError;
    }
    
    // Combine product details with quantities
    const top5ProductsWithDetails = top5ProductIds.map(id => {
      const product = productsData.find(p => p.id === id);
      const quantity = mostSoldProduct[id];
      
      return {
        id,
        name: product?.name || "Unknown Product",
        quantity,
        total_value: quantity * (product?.price || 0)
      };
    });

    return top5ProductsWithDetails;
  } catch (error) {
    console.error("Error fetching top sales:", error);
    return [];
  }
};

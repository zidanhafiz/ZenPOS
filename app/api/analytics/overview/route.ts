import {
  getAverageDailySales,
  getTotalOrders,
  getTotalProductSales,
  getTotalRevenue,
} from "@/lib/api-helpers/analyticsHelper";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const revenue = await getTotalRevenue(supabase);
    const orders = await getTotalOrders(supabase);
    const sales = await getAverageDailySales(supabase);
    const products = await getTotalProductSales(supabase);

    return NextResponse.json({
      data: {
        revenue,
        orders,
        sales,
        products,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

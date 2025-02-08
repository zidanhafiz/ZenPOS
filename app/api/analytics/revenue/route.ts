import { getRevenueOverview } from "@/lib/api-helpers/analyticsHelper";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const revenueOverview = await getRevenueOverview(supabase);

    return NextResponse.json({
      data: revenueOverview,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

import { getTotalVisitors } from "@/lib/api-helpers/analyticsHelper";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const totalVisitors = await getTotalVisitors(supabase);

    return NextResponse.json({
      data: totalVisitors,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

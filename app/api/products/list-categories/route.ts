import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("distinct_category").select();

    if (error) throw error;

    const categories = data.map((item) => item.category);

    return NextResponse.json({
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

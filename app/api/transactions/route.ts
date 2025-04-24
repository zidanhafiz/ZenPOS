import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortBy = searchParams.get("sortBy") ?? "created_at";
    const order = searchParams.get("order") ?? "desc";
    const page = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 10;

    const supabase = await createClient();
    const queryBuilder = supabase
      .from("transactions")
      .select("*", { count: "exact" });

    const { data, error, count } = await queryBuilder
      .order(sortBy, { ascending: order === "asc" })
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) throw error;

    const totalPages = Math.ceil((count || 0) / itemsPerPage);

    return NextResponse.json({
      data,
      total_pages: totalPages,
      current_page: page,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

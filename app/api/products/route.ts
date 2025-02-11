import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortBy = searchParams.get("sortBy") ?? "name";
    const order = searchParams.get("order") ?? "asc";
    const page = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const itemsPerPage = Number(searchParams.get("limit")) || 6;

    const supabase = await createClient();
    let queryBuilder = supabase
      .from("products")
      .select("*", { count: "exact" });

    // Add search query filter if query parameter exists
    if (query && query !== "") {
      queryBuilder = queryBuilder.ilike("name", `%${query}%`);
    }

    // Add category filter if category parameter exists
    if (category && category !== "all") {
      queryBuilder = queryBuilder.eq("category", category);
    }

    // Get filtered and paginated data
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

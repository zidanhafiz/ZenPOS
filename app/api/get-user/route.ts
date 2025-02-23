import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    if (!user) throw new Error("User not found");

    const { data, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userError) throw userError;

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

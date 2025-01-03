import { verifyJWT } from "@/lib/jwt";
import userModels from "@/models/user";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("t");

    const baseUrl = process.env.BASE_URL;

    if (!token) {
      console.error("Token is required, redirecting to home page.");
      return NextResponse.redirect(new URL(`${baseUrl}/`));
    }

    const decodedToken = Buffer.from(token, "base64").toString("utf-8");
    const jwtPayload = await verifyJWT(decodedToken);

    if (!jwtPayload) {
      console.error("Invalid token, redirecting to home page.");
      return NextResponse.redirect(new URL(`${baseUrl}/`));
    }

    const user = await userModels.getUserById(jwtPayload.id);

    if (!user) {
      console.error("User not found");
      throw new Error(`User ${jwtPayload.id} not found`);
    }

    if (user.isVerified) {
      console.warn(`User ${jwtPayload.id} already verified, redirecting to home page.`);
      return NextResponse.redirect(new URL(`${baseUrl}/`));
    }

    await userModels.updateUser(user.id, { isVerified: true });

    console.log(`User ${jwtPayload.id} verified successfully, redirecting to home page.`);
    return NextResponse.redirect(new URL(`${baseUrl}/signup/finish?userId=${user.id}`));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

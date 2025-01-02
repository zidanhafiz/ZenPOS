import { verifyJWT } from "@/lib/jwt";
import Content from "./Content";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function FinishPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const token = searchParams.t as string;

  if (!token) {
    return redirect("/");
  }

  const decodedToken = Buffer.from(token, "base64").toString("utf-8");

  const jwtPayload = await verifyJWT(decodedToken);

  if (!jwtPayload) {
    return redirect("/");
  }

  return <Content />;
}

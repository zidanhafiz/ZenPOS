import { verifyToken } from "@/actions/auth";
import Content from "./Content";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function VerifyPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const token = searchParams.t as string;

  const response = await verifyToken(token);

  if (!response?.success) {
    redirect("/");
  }

  if (!response.data?.id) {
    redirect("/");
  }

  return <Content userId={response.data.id} />;
}

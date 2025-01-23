import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import ResendForm from "./ResendForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const getUser = async (userId: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      throw error.message;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await searchParams;

  if (!userId) {
    redirect("/login");
  }

  const user = await getUser(userId as string);

  if (user.is_verified) {
    redirect("/");
  }

  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify Email</CardTitle>
          <CardDescription>
            Please verify your email first. The verification link was sent into
            your email
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-3">
          <p className="text-sm text-slate-500">Didn&apos;t get email?</p>
          <ResendForm />
        </CardContent>
      </Card>
    </div>
  );
}

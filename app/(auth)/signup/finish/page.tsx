import userModels from "@/models/user";
import { redirect } from "next/navigation";
import { createVerifyToken } from "@/actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function FinishPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const userId = searchParams.userId as string;

  if (!userId) {
    console.error("User ID is required, redirecting to home page.");
    redirect("/");
  }

  const user = await userModels.getUserById(userId);

  if (!user) {
    console.error(`User ${userId} not found, redirecting to home page.`);
    redirect("/");
  }

  if (!user.isVerified) {
    const token = await createVerifyToken(userId);

    if (!token) {
      console.error(`Failed to create verify token for user ${userId}, redirecting to home page.`);
      redirect("/");
    }

    console.log(`User ${userId} not verified, redirecting to verify page.`);
    redirect(`/signup/verify?t=${token}`);
  }

  return (
    <div className='text-center h-screen mt-12'>
      <h4 className='text-3xl font-bold'>You&apos;re all set!</h4>
      <p className='text-muted-foreground mt-2'>You can now login to your account.</p>
      <Button asChild className='mt-4'>
        <Link href='/login'>Login</Link>
      </Button>
    </div>
  );
}

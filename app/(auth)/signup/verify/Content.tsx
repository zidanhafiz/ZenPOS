"use client";
import { resendVerifyEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

export default function Content({ userId }: { userId: string }) {
  const [count, setCount] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResendEmail = async () => {
    try {
      setLoading(true);

      const response = await resendVerifyEmail(userId);

      if (!response?.success) {
        toast({
          title: "Failed to resend email",
          description: response?.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Email resended",
        description: "We've sent you an email to verify your account. Please check your email and click the link to verify your account.",
      });

      setCount(15);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className='text-center h-screen mt-12'>
      <Info
        size={40}
        className='mx-auto'
      />
      <h4 className='text-3xl font-bold'>Verify your account</h4>
      <p className='text-muted-foreground mt-2'>
        We&apos;ve sent you an email to verify your account. Please check your email and click the link to verify your account.
      </p>
      <div className='flex items-center justify-center gap-2 mt-5'>
        <p className='text-sm text-muted-foreground'>Didn&apos;t receive the email? </p>
        {count > 0 ? (
          <p className='text-sm text-primary underline'>{count} seconds</p>
        ) : (
          <Button
            className='text-primary underline p-0'
            variant='link'
            onClick={handleResendEmail}
            disabled={loading}
          >
            {loading ? "Resending..." : "Resend email"}
          </Button>
        )}
      </div>
    </div>
  );
}

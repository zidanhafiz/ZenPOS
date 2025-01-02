"use client";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

export default function Content() {
  const [count, setCount] = useState<number>(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-center h-screen mt-12'>
      <Info
        size={40}
        className='mx-auto'
      />
      <h4 className='text-3xl font-bold'>You&apos;re all set!</h4>
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
          >
            Resend email
          </Button>
        )}
      </div>
    </div>
  );
}

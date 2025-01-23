"use client";
import { resendVerificationEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ResendForm({ email }: { email: string }) {
  const [count, setCount] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      if (count === 0) {
        clearInterval(timer);
        return;
      }
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const onClick = async () => {
    try {
      setLoading(true);
      await resendVerificationEmail(email);
      toast({
        title: "New verification email sent",
        description: "Please check your email",
      });
      setCount(60);
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {count > 0 ? (
        <Button disabled>{count}s</Button>
      ) : (
        <Button onClick={onClick} disabled={loading}>
          Resend email
        </Button>
      )}
    </div>
  );
}

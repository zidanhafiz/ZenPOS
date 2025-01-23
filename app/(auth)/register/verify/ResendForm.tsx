"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ResendForm() {
  const [count, setCount] = useState<number>(60);

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

  return (
    <div>
      {count > 0 ? (
        <Button disabled>{count}s</Button>
      ) : (
        <Button>Resend email</Button>
      )}
    </div>
  );
}

"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="my-8 mx-6 max-w-screen-lg md:flex md:items-center md:gap-4 md:mx-auto">
      <div className="w-full">
        <Image
          src="/error.jpg"
          width={400}
          height={400}
          alt="error"
          className="mx-auto"
        />
        <p className="text-sm text-center text-gray-500">
          Designed by{" "}
          <Link href="https://freepik.com" className="underline">
            Freepik
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 w-full md:items-start mt-8">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-gray-500">{error?.message}</p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}

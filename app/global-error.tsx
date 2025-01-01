"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className='antialiased'>
        <div className='px-6 flex flex-col md:flex-row justify-center items-center my-24 gap-7 md:gap-16'>
          <div className='flex flex-col items-center gap-6'>
            <Image
              src='/error.png'
              alt='error'
              width={180}
              height={180}
            />
            <Link
              href='https://www.flaticon.com/free-icons/error'
              className='text-xs text-muted-foreground'
              title='error icons'
            >
              Icon by Freepik - Flaticon
            </Link>
          </div>
          <div className='flex flex-col gap-2 max-w-sm'>
            <h2 className='text-2xl font-bold'>Something went wrong!</h2>
            <p className='text-sm text-muted-foreground'>Message: {error.message}</p>
            <Button
              className='mt-4 w-full md:w-fit'
              variant='destructive'
              onClick={() => reset()}
            >
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}

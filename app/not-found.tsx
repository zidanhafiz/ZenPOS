import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='px-6 flex flex-col md:flex-row justify-center items-center my-20 gap-7 md:gap-4'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          src='/not-found.png'
          alt='not-found'
          width={500}
          height={372}
        />
        <Link
          href='https://www.flaticon.com/free-icons/page-not-found'
          title='page not found icons'
          className='text-xs text-muted-foreground'
        >
          Icon by BZZRINCANTATION - Flaticon
        </Link>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-4xl font-bold'>404</span>
        <p className='text-lg font-medium'>Something is missing</p>
        <p className='text-sm text-muted-foreground'>Looks like the page you are looking for is not found</p>
        <Button
          asChild
          className='mt-4 w-full md:w-fit'
        >
          <Link href='/'>Go back to home</Link>
        </Button>
      </div>
    </div>
  );
}

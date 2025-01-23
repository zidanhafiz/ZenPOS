import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="my-8 mx-6 max-w-screen-lg md:flex md:items-center md:gap-4 md:mx-auto">
      <div className="w-full">
        <Image
          src="/notfound.jpg"
          width={400}
          height={400}
          alt="Not Found"
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
        <h2 className="text-2xl font-bold">Page not found!</h2>
        <p className="text-gray-500 text-sm">
          The page you are looking for is not found
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}

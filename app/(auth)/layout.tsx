import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className='max-w-lg mx-auto md:flex md:flex-col md:items-center md:justify-center md:h-screen py-10 px-6'>{children}</div>;
}

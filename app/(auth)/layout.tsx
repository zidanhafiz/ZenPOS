import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className='max-w-lg mx-auto my-10 md:my-20 px-6'>{children}</div>;
}

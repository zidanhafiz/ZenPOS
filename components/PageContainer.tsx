import { ScrollArea } from "@/components/ui/scroll-area";
import PageHeading from "./PageHeading";
import { ReactNode } from "react";

export default function PageContainer({
  title,
  description,
  children,
}: Readonly<{ title: string; description: string; children: ReactNode }>) {
  return (
    <main className="w-full grid h-full content-start">
      <PageHeading title={title} description={description} />
      <ScrollArea className="mt-6">{children}</ScrollArea>
    </main>
  );
}

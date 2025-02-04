import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <SidebarTrigger />
      <h4 className="text-lg font-semibold">{title}</h4>
      <Separator orientation="vertical" />
      <p className="text-xs md:text-sm text-gray-500">{description}</p>
    </div>
  );
}

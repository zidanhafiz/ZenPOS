import { Separator } from "@/components/ui/separator";

export default function Header({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <>
      <div className='flex items-center justify-between w-full'>
        <div>
          <h4 className='text-xl font-bold'>{title}</h4>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
        {icon}
      </div>
      <Separator className='my-5' />
    </>
  );
}

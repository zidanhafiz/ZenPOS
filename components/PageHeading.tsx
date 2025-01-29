export default function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h4 className="text-lg md:text-xl font-semibold">{title}</h4>
      <p className="text-xs md:text-sm text-gray-500">{description}</p>
    </div>
  );
}

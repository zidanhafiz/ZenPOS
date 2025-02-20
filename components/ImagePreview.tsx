"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ImagePreview({
  image,
  className,
}: {
  image?: File | string;
  className?: string;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!image) return;

    if (typeof image === "string") {
      setImageUrl(image);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(image);
  }, [image]);

  return (
    <div
      className={cn(
        "w-[200px] h-[200px] bg-gray-200 rounded-xl overflow-hidden",
        className
      )}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Product Image"
          className="object-cover"
          width={200}
          height={200}
        />
      )}
    </div>
  );
}

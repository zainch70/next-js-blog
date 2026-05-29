import Image from "next/image";
import { shouldOptimizeImage } from "@/app/lib/images";

interface CoverImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  aspectClass?: string;
  sizes?: string;
  imageClassName?: string;
}

export default function CoverImage({
  src,
  alt,
  priority = false,
  aspectClass = "aspect-[16/10]",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  imageClassName = "object-cover",
}: CoverImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-muted/20 ${aspectClass}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={!shouldOptimizeImage(src)}
        className={imageClassName}
        sizes={sizes}
      />
    </div>
  );
}

import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/content/types";

interface MediaZoomProps {
  image: ImageAsset;
  sizes: string;
  /** Rode accentlijn die bij hover vanaf links onder het beeld uitrolt. */
  withAccentLine?: boolean;
  /** Overlay bovenop het beeld, bijvoorbeeld een play-knop of label. */
  children?: ReactNode;
  className?: string;
}

/**
 * Beeld dat inzoomt zodra de omliggende `.group` hover krijgt. Bewust zonder JS:
 * een CSS-transitie op `transform` blijft op de compositor en dus vloeiend.
 */
export function MediaZoom({
  image,
  sizes,
  withAccentLine = false,
  children,
  className,
}: MediaZoomProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="size-full object-cover transition-transform duration-zoom ease-interact group-hover:scale-107 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
      />
      {children}
      {withAccentLine ? (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-slow ease-interact group-hover:scale-x-100"
        />
      ) : null}
    </div>
  );
}

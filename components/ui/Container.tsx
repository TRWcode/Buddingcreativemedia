import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  /** Rendert als ander element wanneer de semantiek daarom vraagt. */
  as?: ElementType;
  /** Anker-doel voor de navigatie. */
  id?: string;
  /** Naam van de sectie voor schermlezers, als er geen zichtbare kop boven staat. */
  "aria-label"?: string;
  className?: string;
}

/** Breedtebegrenzing + horizontale gutter. De enige plek waar die maten staan. */
export function Container({
  children,
  as: Tag = "div",
  id,
  className,
  "aria-label": ariaLabel,
}: ContainerProps) {
  return (
    <Tag id={id} aria-label={ariaLabel} className={cn("mx-auto w-full max-w-shell px-gutter", className)}>
      {children}
    </Tag>
  );
}

import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: string;
  className?: string;
}

/** Klein bovenschrift met rood streepje — terugkerend patroon in elke sectie. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
      <span className="text-eyebrow">{children}</span>
    </div>
  );
}

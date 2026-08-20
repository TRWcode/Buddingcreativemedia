import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "solid";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Pijl rechts van het label. Uit voor knoppen zonder richting. */
  withArrow?: boolean;
  className?: string;
}

const base =
  "group/btn relative isolate inline-flex items-center rounded-pill font-sans whitespace-nowrap " +
  "transition-[background-color,border-color,color] duration-base ease-interact";

/** Sommige varianten kleuren alleen de pijl rood in plaats van het hele label. */
const arrowAccent: Partial<Record<ButtonVariant, string>> = {
  ghost: "text-brand",
};

const variants: Record<ButtonVariant, string> = {
  // Gevuld rood met permanente glow die bij hover intensiveert.
  primary: "bg-brand text-white font-bold shadow-glow",
  // Transparant met hairline — secundaire actie op beeld.
  ghost:
    "border border-hairline-loud text-bone font-semibold backdrop-blur-[6px] " +
    "hover:border-brand hover:text-white",
  // Donker op een rood vlak (CTA-sectie).
  solid: "bg-ink text-white font-bold shadow-[0_1rem_2.75rem_rgb(0_0_0/0.35)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "gap-2 px-6 py-3 text-[0.9rem]",
  md: "gap-2.5 px-[1.875rem] py-4 text-base",
  lg: "gap-3 px-[2.625rem] py-[1.1875rem] text-[1.05rem]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = true,
  className,
}: ButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {/* Losse gloedlaag met een vaste schaduw. Bij hover animeert alleen de
          opacity — dat is compositor-werk, terwijl het animeren van box-shadow
          zelf de knop elke frame opnieuw laat tekenen. */}
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-pill opacity-0 shadow-glow-strong transition-opacity duration-base ease-interact group-hover/btn:opacity-100"
        />
      ) : null}

      {children}

      {withArrow ? (
        <span
          aria-hidden
          className={cn(
            "leading-none transition-transform duration-base ease-interact group-hover/btn:translate-x-1",
            arrowAccent[variant],
          )}
        >
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}

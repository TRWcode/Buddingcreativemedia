"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

interface AnchorLinkProps {
  /** Anker op de homepage (`#cases`) of een gewoon pad. */
  href: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * Link naar een sectie op de homepage die ook vanaf een andere pagina werkt.
 *
 * Op de homepage blijft de href een kaal anker, zodat `SmoothScroll` hem kan
 * onderscheppen en Lenis er soepel naartoe scrollt. Staan we ergens anders, dan
 * wordt er `/` voor gezet en navigeert de link eerst terug naar de homepage,
 * waarna `SmoothScroll` op de nieuwe pagina alsnog naar de sectie scrolt.
 */
export function AnchorLink({ href, children, onClick, className, ...rest }: AnchorLinkProps) {
  const pathname = usePathname();
  const resolved = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  return (
    <Link href={resolved} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}

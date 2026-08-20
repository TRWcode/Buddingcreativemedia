import type { ReactNode } from "react";

/** Pill met hairline-rand — voor disciplines en jaartallen. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-pill border border-hairline-strong px-4 py-[0.4375rem] text-[0.82rem] text-bone">
      {children}
    </span>
  );
}

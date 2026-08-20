import type { ReactNode } from "react";

/** Vierkant met afgeronde hoeken en rode gloed, als drager voor een icoon. */
export function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-14 items-center justify-center rounded-icon border border-brand/30 bg-brand/12 text-brand">
      {children}
    </span>
  );
}

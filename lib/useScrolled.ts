"use client";

import { useEffect, useState } from "react";

/** True zodra de pagina voorbij `threshold` pixels is gescrold. */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > threshold);

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, [threshold]);

  return scrolled;
}

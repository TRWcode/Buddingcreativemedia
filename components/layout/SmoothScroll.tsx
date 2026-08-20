"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { SCROLL } from "@/lib/motion";

/**
 * Zet Lenis op als smooth-scroll met momentum en houdt anker-links daarmee in
 * de pas. Rendert niets — puur een effect naast de bestaande DOM.
 *
 * Bij `prefers-reduced-motion` wordt Lenis niet geïnitialiseerd; de browser
 * scrollt dan gewoon native.
 */
export function SmoothScroll() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: SCROLL.duration,
      easing: SCROLL.easing,
      wheelMultiplier: SCROLL.wheelMultiplier,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anker-links door Lenis laten lopen, anders springt de pagina hard.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!hash || hash.length < 2) return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [prefersReduced]);

  return null;
}

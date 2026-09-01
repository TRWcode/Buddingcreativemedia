"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SCROLL } from "@/lib/motion";
import { registerLenis, scrollToHash } from "@/lib/scroll";

/**
 * Zet Lenis op als smooth-scroll met momentum en houdt anker-links daarmee in
 * de pas. Rendert niets — puur een effect naast de bestaande DOM.
 *
 * Bij `prefers-reduced-motion` wordt Lenis niet geïnitialiseerd; de browser
 * scrollt dan gewoon native. `lib/scroll.ts` valt in dat geval terug op
 * `window.scrollTo`, zodat anker-links blijven werken.
 */
export function SmoothScroll() {
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReduced) {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: SCROLL.duration,
      easing: SCROLL.easing,
      wheelMultiplier: SCROLL.wheelMultiplier,
      smoothWheel: true,
    });
    registerLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anker-links door Lenis laten lopen, anders springt de pagina hard.
    const onClick = (event: MouseEvent) => {
      // Een link die zijn eigen scroll al regelt — het mobiele menu moet eerst
      // dicht en van het slot af voordat er iets mag bewegen — heeft de
      // standaardactie al tegengehouden. Die niet nog eens afhandelen.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!hash) return;

      // `preventDefault` pas als er ook echt iets is om naartoe te gaan.
      if (scrollToHash(hash)) event.preventDefault();
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      registerLenis(null);
    };
  }, [prefersReduced]);

  /**
   * Aankomen op een adres mét anker, bijvoorbeeld `/#werkwijze` vanaf een
   * casepagina.
   *
   * De router verzet de scroll zelf, maar Lenis houdt daarnaast zijn eigen
   * boekhouding bij en die loopt op dat moment achter. Wie het aan de router
   * overliet kwam ergens halverwege de homepage uit in plaats van bij het blok
   * waar hij op tikte. `scrollToHash` zet die twee eerst gelijk en scrolt dan.
   */
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Twee frames wachten: de nieuwe pagina moet gerenderd en gemeten zijn,
    // anders wordt er naar een positie gescrold die nog verschuift.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => scrollToHash(hash));
    });

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [pathname]);

  return null;
}

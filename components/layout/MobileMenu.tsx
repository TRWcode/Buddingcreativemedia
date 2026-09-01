"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { Button } from "@/components/ui/Button";
import { EASE_ENTRANCE, STAGGER, transition } from "@/lib/motion";
import { lockScroll, scrollToHash, unlockScroll } from "@/lib/scroll";
import { navLinks, primaryCta, site } from "@/lib/content/site";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const panel = {
  // `pointerEvents` uit tijdens het uitfaden: de overlay staat dan nog een halve
  // seconde in beeld terwijl de pagina eronder al beweegt, en zou een tik in die
  // tussentijd opvangen.
  hidden: { opacity: 0, pointerEvents: "none" as const },
  shown: {
    opacity: 1,
    pointerEvents: "auto" as const,
    transition: { duration: 0.4, staggerChildren: STAGGER.tight, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_ENTRANCE } },
};

/** Alles wat binnen het paneel met Tab bereikbaar is. */
const FOCUSABLE = "a[href], button:not([disabled])";

/** Fullscreen navigatie-overlay met genummerde links, onder de nav-breakpoint. */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * Zolang het menu open staat beweegt de pagina eronder niet mee, blijft de
   * focus binnen het paneel en sluit Escape het.
   *
   * Het slot loopt via `lockScroll` en niet meer via de body op `overflow:
   * hidden` zetten. Dat laatste hield Lenis niet tegen — die schrijft elke frame
   * zijn eigen scrollpositie terug — en deed op iOS sowieso niets: daar scrolde
   * de pagina gewoon achter de overlay door.
   */
  useEffect(() => {
    if (!open) return;

    lockScroll();

    const opener = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Tab mag niet achter de overlay langs de pagina in lopen. De balk staat
      // boven de overlay, dus zonder dit is het logo het eerste wat je bereikt.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      // Terug naar de knop waarmee het menu geopend werd, zodat wie met het
      // toetsenbord navigeert niet bovenaan de pagina opnieuw begint.
      if (opener?.isConnected) opener.focus();
    };
  }, [open, onClose]);

  /**
   * Een tik op een menu-item.
   *
   * Wijst het naar een sectie op de pagina waar we al staan, dan sluit het menu
   * eerst en vertrekt de scroll daarna — in die volgorde, want zolang de overlay
   * open staat is de scroll op slot en komt de beweging niet aan. Dat was waarom
   * een tik op "Diensten" het menu wel sloot maar de pagina liet staan.
   *
   * Wijst het naar een echte pagina, dan doet de router gewoon zijn werk.
   */
  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      onClose();

      if (!href.startsWith("#") || pathname !== "/") return;

      event.preventDefault();
      // Eerst het slot eraf, dan pas vertrekken: Lenis wist bij `start()` een
      // lopende scroll-animatie, dus andersom zou de beweging meteen weer
      // sneuvelen. Wachten op de opruiming van het effect hierboven is een gok —
      // die loopt niet gegarandeerd binnen dezelfde frame. `unlockScroll` telt
      // mee hoe vaak het slot vastgehouden wordt, dus dat tweede slot-af doet
      // straks niets.
      unlockScroll();
      scrollToHash(href);
    },
    [onClose, pathname],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          variants={panel}
          initial="hidden"
          animate="shown"
          exit="hidden"
          transition={transition.base}
          className="fixed inset-0 z-950 flex flex-col overflow-hidden bg-ink px-[clamp(1.75rem,7vw,4rem)] pb-10 pt-[clamp(7rem,14vh,8.125rem)] nav:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgb(227_6_19/0.14),transparent_60%)]"
          />

          {/* Het scrollen zit op deze laag en niet op het paneel zelf. De balk
              met het logo staat boven de overlay en is doorzichtig; schuift het
              paneel in zijn geheel, dan loopt "Diensten" dwars door het logo
              heen zodra de lijst niet meer past — op een liggende telefoon of
              een klein scherm. Nu begint het scrollgebied onder de balk.

              `data-lenis-prevent`: Lenis staat stil zolang het menu open is en
              blokkeert dan alle scroll-events. Met dit attribuut laat hij deze
              laag met rust, zodat een lange lijst te scrollen blijft. */}
          <div
            data-lenis-prevent
            className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
          >
            <motion.div variants={item} className="mb-auto flex items-center gap-3">
              <span aria-hidden className="h-px w-7 bg-brand" />
              <span className="text-eyebrow">Menu</span>
            </motion.div>

            <nav className="my-auto flex flex-col gap-0.5 py-8" aria-label="Hoofdnavigatie">
              {navLinks.map((link, index) => (
                <motion.span key={link.label} variants={item}>
                  <AnchorLink
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.4rem,12vw,4rem)] font-semibold uppercase leading-[1.05] tracking-title transition-colors duration-fast hover:text-brand"
                  >
                    <span className="font-sans text-[0.85rem] font-medium tracking-[0.1em] text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </AnchorLink>
                </motion.span>
              ))}
            </nav>

            <motion.div variants={item} className="mt-auto flex flex-col gap-5">
              <Button href={primaryCta.href} size="md" className="self-start" onClick={onClose}>
                {primaryCta.label}
              </Button>
              <div className="flex flex-wrap gap-6 text-[0.9rem] text-muted">
                <a
                  href={`mailto:${site.email}`}
                  onClick={onClose}
                  className="transition-colors hover:text-brand"
                >
                  {site.email}
                </a>
                <span>{site.location}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

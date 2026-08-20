"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { EASE_ENTRANCE, STAGGER, transition } from "@/lib/motion";
import { navLinks, primaryCta, site } from "@/lib/content/site";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

const panel = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.4, staggerChildren: STAGGER.tight, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_ENTRANCE } },
};

/** Fullscreen navigatie-overlay met genummerde links, onder de nav-breakpoint. */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  // Achtergrond niet mee laten scrollen zolang het menu open staat.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          variants={panel}
          initial="hidden"
          animate="shown"
          exit="hidden"
          transition={transition.base}
          className="fixed inset-0 z-950 flex flex-col bg-ink px-[clamp(1.75rem,7vw,4rem)] pb-10 pt-[clamp(5.625rem,14vh,8.125rem)] nav:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgb(227_6_19/0.14),transparent_60%)]"
          />

          <motion.div variants={item} className="relative mb-auto flex items-center gap-3">
            <span aria-hidden className="h-px w-7 bg-brand" />
            <span className="text-eyebrow">Menu</span>
          </motion.div>

          <nav className="relative my-auto flex flex-col gap-0.5" aria-label="Hoofdnavigatie">
            {navLinks.map((link, index) => (
              <motion.span key={link.label} variants={item}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.4rem,12vw,4rem)] font-semibold uppercase leading-[1.05] tracking-title transition-colors duration-fast hover:text-brand"
                >
                  <span className="font-sans text-[0.85rem] font-medium tracking-[0.1em] text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </motion.span>
            ))}
          </nav>

          <motion.div variants={item} className="relative mt-auto flex flex-col gap-5">
            <Button href={primaryCta.href} size="md" className="self-start">
              {primaryCta.label}
            </Button>
            <div className="flex flex-wrap gap-6 text-[0.9rem] text-muted">
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
                {site.email}
              </a>
              <span>{site.location}</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

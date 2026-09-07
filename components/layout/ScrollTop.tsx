"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { transition } from "@/lib/motion";
import { scrollToTop } from "@/lib/scroll";

/** Straal van de voortgangsring in het 44×44-kader van de svg. */
const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Terug-naar-boven knop rechtsonder, met een ring die meeloopt met hoever je
 * op de pagina bent.
 *
 * De ring is er niet alleen voor de sier: hij vertelt hoeveel pagina er nog
 * onder je zit, en dat is precies de vraag die je stelt op het moment dat je
 * overweegt terug te gaan. Een kale pijl zegt alleen "omhoog".
 *
 * De knop verschijnt pas voorbij een scherm scrollen. Daarboven is de kop nog
 * in beeld en zou hij alleen maar over de hero liggen.
 *
 * De voortgang loopt via een motion value en niet via React-state. Scrollen
 * vuurt tientallen keren per seconde; met state zou dit component evenzo vaak
 * opnieuw renderen, terwijl er niets verandert behalve één getal in een
 * `stroke-dashoffset`. Framer schrijft die waarde buiten React om weg. Alleen
 * `visible` is state, en die klapt hooguit een paar keer per bezoek om.
 */
export function ScrollTop() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const progress = useMotionValue(0);

  // Vol getekend bij 0% en leeg bij 100% zou de ring achterstevoren lopen: de
  // ring hoort aan te groeien naarmate je verder komt.
  const dashoffset = useTransform(progress, (value) => CIRCUMFERENCE * (1 - value));

  useEffect(() => {
    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;

      progress.set(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      // Zelfde boolean betekent geen re-render: React slaat een set met een
      // gelijke waarde over.
      setVisible(y > window.innerHeight);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => scrollToTop({ immediate: prefersReduced ?? false })}
          aria-label="Terug naar boven"
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.9 }}
          transition={transition.base}
          className={
            "group/top fixed bottom-[clamp(1.25rem,3vw,2.25rem)] right-[clamp(1.25rem,3vw,2.25rem)] z-900 " +
            "flex size-[3.25rem] items-center justify-center rounded-full " +
            "border border-hairline-strong bg-ink/80 text-bone backdrop-blur-[10px] " +
            "transition-[background-color,border-color,color] duration-base ease-interact " +
            "hover:border-brand hover:bg-brand hover:text-white print:hidden"
          }
        >
          {/* De ring ligt over de rand van de knop heen. `-rotate-90` zet het
              startpunt op twaalf uur in plaats van op drie uur. */}
          <svg
            aria-hidden
            viewBox="0 0 44 44"
            className="pointer-events-none absolute inset-0 size-full -rotate-90"
          >
            <motion.circle
              cx="22"
              cy="22"
              r={RADIUS}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashoffset }}
            />
          </svg>

          <ArrowIcon className="size-[1.15rem] -rotate-90 transition-transform duration-base ease-interact group-hover/top:-translate-y-0.5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

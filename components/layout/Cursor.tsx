"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePointerFine } from "@/lib/usePointerFine";

const SPRING = { stiffness: 280, damping: 30, mass: 0.6 } as const;
const BASE_SIZE = 34;
const HOVER_SCALE = 58 / BASE_SIZE;

/**
 * Ring die de cursor met vertraging volgt en groter wordt boven klikbare
 * elementen. Alleen met een precieze pointer en als beweging niet is afgezet.
 *
 * De ring heeft een vaste maat en groeit via `scale` — het animeren van
 * `width`/`height` zou elke frame een layout afdwingen. De hover-detectie hangt
 * aan `pointerover`, dat alleen vuurt bij het oversteken van een elementgrens,
 * in plaats van bij elke muisbeweging.
 */
export function Cursor() {
  const prefersReduced = useReducedMotion();
  const isFine = usePointerFine();
  const enabled = isFine && !prefersReduced;

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  useEffect(() => {
    if (!enabled) return;

    // Alleen positie bijwerken — motion values schrijven buiten React om,
    // dus dit veroorzaakt geen re-render.
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      setHovering(
        Boolean((event.target as HTMLElement | null)?.closest("a, button, [data-cursor-grow]")),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-1020 size-[2.125rem] rounded-full border-[1.5px] border-brand"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        scale: hovering ? HOVER_SCALE : 1,
        backgroundColor: hovering ? "rgb(227 6 19 / 0.15)" : "rgb(227 6 19 / 0)",
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
    />
  );
}

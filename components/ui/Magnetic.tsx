"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePointerFine } from "@/lib/usePointerFine";

interface MagneticProps {
  children: ReactNode;
  /** Hoe ver het element de cursor volgt, als fractie van de halve breedte. */
  strength?: number;
  className?: string;
}

const SPRING = { stiffness: 260, damping: 24, mass: 0.5 } as const;

/**
 * Trekt zijn kind subtiel naar de cursor. Alleen actief met een precieze pointer
 * en wanneer de bezoeker beweging niet heeft afgezet.
 */
export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const prefersReduced = useReducedMotion();
  const isFine = usePointerFine();
  const enabled = isFine && !prefersReduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength * 1.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}

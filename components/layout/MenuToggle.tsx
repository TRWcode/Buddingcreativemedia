"use client";

import { motion } from "framer-motion";
import { transition } from "@/lib/motion";

interface MenuToggleProps {
  open: boolean;
  onToggle: () => void;
  controls: string;
}

/** Twee streepjes die naar een kruis vouwen. Alleen zichtbaar onder de nav-breakpoint. */
export function MenuToggle({ open, onToggle, controls }: MenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Menu sluiten" : "Menu openen"}
      aria-expanded={open}
      aria-controls={controls}
      className="relative z-10 flex size-11 flex-col items-center justify-center gap-1.5 nav:hidden"
    >
      <motion.span
        className="block h-0.5 w-[1.625rem] rounded-sm bg-bone"
        animate={open ? { y: 4, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={transition.base}
      />
      <motion.span
        className="block h-0.5 w-[1.625rem] rounded-sm bg-bone"
        animate={open ? { scaleX: 1, y: -4, rotate: -45 } : { scaleX: 0.69, y: 0, rotate: 0 }}
        transition={transition.base}
      />
    </button>
  );
}

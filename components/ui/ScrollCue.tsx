"use client";

import { motion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motion";

interface ScrollCueProps {
  label: string;
}

/** Scroll-hint onderaan de hero: label met een zacht deinende accentlijn. */
export function ScrollCue({ label }: ScrollCueProps) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="text-[0.68rem] font-medium uppercase tracking-label text-muted">
        {label}
      </span>
      <motion.span
        aria-hidden
        className="h-11 w-px bg-linear-to-b from-brand to-transparent"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2, ease: EASE_OUT_SOFT, repeat: Infinity }}
      />
    </div>
  );
}

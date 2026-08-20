"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { heroLine, STAGGER } from "@/lib/motion";

export interface MaskedLine {
  readonly text: string;
  readonly accent?: boolean;
}

interface MaskedLinesProps {
  lines: readonly MaskedLine[];
  /** `mount` voor above-the-fold koppen, `scroll` voor koppen verderop. */
  trigger?: "mount" | "scroll";
  delay?: number;
  className?: string;
}

/**
 * Toont regels die van onder een masker omhoog schuiven — de signature-reveal
 * voor grote display-koppen. Elke regel is een eigen clip-container.
 */
export function MaskedLines({
  lines,
  trigger = "mount",
  delay = 0.15,
  className,
}: MaskedLinesProps) {
  const playOnMount = trigger === "mount";

  return (
    <motion.span
      data-motion
      className={cn("block", className)}
      initial="hidden"
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: STAGGER.loose, delayChildren: delay } },
      }}
      {...(playOnMount
        ? { animate: "shown" }
        : { whileInView: "shown" as const, viewport: { once: true, amount: 0.4 } })}
    >
      {lines.map((line) => (
        <span key={line.text} className="clip-line">
          <motion.span
            variants={heroLine}
            className={cn("inline-block", line.accent && "text-brand")}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

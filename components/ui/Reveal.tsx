"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT } from "@/lib/motion";

type RevealTag = "div" | "section" | "article" | "li" | "p" | "span";

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  /** Extra vertraging in seconden, voor handmatige volgorde buiten een Stagger. */
  delay?: number;
  variants?: Variants;
  /** `scroll` wacht tot het element in beeld komt, `mount` speelt direct af. */
  trigger?: "scroll" | "mount";
  className?: string;
}

/**
 * Reveal voor een los element: fade + subtiele upward-translate, één keer.
 * Above-the-fold gebruik je `trigger="mount"`; alles daaronder scroll-getriggerd.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  variants = fadeUp,
  trigger = "scroll",
  className,
}: RevealProps) {
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      data-motion
      className={className}
      variants={variants}
      initial="hidden"
      transition={delay ? { delay } : undefined}
      {...(trigger === "mount"
        ? { animate: "shown" as const }
        : { whileInView: "shown" as const, viewport: VIEWPORT })}
    >
      {children}
    </Tag>
  );
}

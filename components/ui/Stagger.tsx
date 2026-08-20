"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerParent, STAGGER, VIEWPORT } from "@/lib/motion";

type StaggerTag = "div" | "section" | "article" | "ul" | "header";

interface StaggerProps {
  children: ReactNode;
  as?: StaggerTag;
  /** Vertraging tussen kinderen in seconden. */
  stagger?: number;
  /** Wachttijd voordat het eerste kind start. */
  delay?: number;
  /** `mount` speelt direct af (hero), `scroll` wacht tot het in beeld komt. */
  trigger?: "scroll" | "mount";
  className?: string;
}

/**
 * Groepeert kinderen zodat ze na elkaar binnenkomen. De kinderen zelf zijn
 * `StaggerItem`s — die erven de animatiestatus en hebben geen eigen delay nodig.
 */
export function Stagger({
  children,
  as = "div",
  stagger = STAGGER.base,
  delay = 0,
  trigger = "scroll",
  className,
}: StaggerProps) {
  const Tag = motion[as] as typeof motion.div;
  const playOnMount = trigger === "mount";

  return (
    <Tag
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      {...(playOnMount
        ? { animate: "shown" }
        : { whileInView: "shown" as const, viewport: VIEWPORT })}
    >
      {children}
    </Tag>
  );
}

type ItemTag = "div" | "p" | "li" | "span" | "h1" | "h2" | "h3";

interface StaggerItemProps {
  children: ReactNode;
  as?: ItemTag;
  variants?: Variants;
  className?: string;
}

/** Eén element binnen een `Stagger`. Erft timing van de ouder. */
export function StaggerItem({
  children,
  as = "div",
  variants = fadeUp,
  className,
}: StaggerItemProps) {
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag data-motion className={className} variants={variants}>
      {children}
    </Tag>
  );
}

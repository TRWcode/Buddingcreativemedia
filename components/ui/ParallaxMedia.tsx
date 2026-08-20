"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT_SOFT } from "@/lib/motion";
import type { ImageAsset } from "@/lib/content/types";

interface ParallaxMediaProps {
  image: ImageAsset;
  /** Hoogste prioriteit voor het LCP-beeld van de pagina. */
  priority?: boolean;
  sizes?: string;
}

/** Hoever het beeld meeschuift over de volledige scroll van de sectie. */
const PARALLAX_SHIFT = 25;
const KEN_BURNS_FROM = 1.18;
const KEN_BURNS_TO = 1.06;

/**
 * Full-bleed achtergrondbeeld met twee bewegingen: een trage ken-burns bij het
 * laden en een parallax-verschuiving tijdens het scrollen.
 *
 * De wrapper is 112% hoog en begint 8% boven de sectie, zodat er bij maximale
 * verschuiving nergens een gat aan de rand valt.
 *
 * `prefersReduced` mag de *markup* niet veranderen — de hook geeft op de server
 * een andere waarde dan op de client, wat een hydration mismatch oplevert. Daarom
 * sturen we alleen de eindwaarden aan; de startstand is aan beide kanten gelijk.
 */
export function ParallaxMedia({ image, priority = false, sizes = "100vw" }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${prefersReduced ? 0 : PARALLAX_SHIFT}%`],
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-[8%] left-0 h-[112%] w-full will-change-transform"
        style={{ y }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: KEN_BURNS_FROM }}
          animate={{ scale: prefersReduced ? KEN_BURNS_FROM : KEN_BURNS_TO }}
          transition={{ duration: 9, ease: EASE_OUT_SOFT }}
        >
          <Image
            src={image.src}
            alt=""
            fill
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            sizes={sizes}
            quality={82}
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

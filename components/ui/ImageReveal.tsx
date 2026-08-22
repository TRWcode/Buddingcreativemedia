"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeUp, imageSettle, VIEWPORT } from "@/lib/motion";
import type { ImageAsset } from "@/lib/content/types";

interface ImageRevealProps {
  image: ImageAsset;
  sizes: string;
  /**
   * Verhouding van het kader. Laat leeg om de aspect-klasse uit `className` te
   * gebruiken; geef een getal mee om het beeld zijn eigen verhouding te laten
   * houden en dus niet bij te snijden.
   */
  aspect?: number;
  /** Kader: aspect-klasse en eventuele afwijkende radius. */
  className?: string;
  priority?: boolean;
}

/**
 * Beeld dat bij binnenkomst opkomt terwijl het zelf uit een lichte overscale
 * terugzakt. Twee lagen, twee snelheden: het kader is klaar terwijl het beeld
 * nog even doorloopt — dat leest rustiger dan één enkele beweging.
 *
 * De binnenste laag erft de animatiestatus van de buitenste; alleen `opacity`
 * en `transform` bewegen, dus er valt niets te hertekenen per frame.
 */
export function ImageReveal({
  image,
  sizes,
  aspect,
  className,
  priority = false,
}: ImageRevealProps) {
  return (
    <motion.figure
      data-motion
      style={aspect ? { aspectRatio: aspect } : undefined}
      className={cn("relative overflow-hidden rounded-media border border-hairline", className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
    >
      <motion.div data-motion className="h-full w-full" variants={imageSettle}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </motion.figure>
  );
}

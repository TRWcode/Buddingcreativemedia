"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Eén globale motion-instelling. `reducedMotion="user"` laat Framer Motion alle
 * transform-animaties overslaan voor bezoekers die beweging hebben afgezet —
 * fades blijven lopen, zodat niets onzichtbaar blijft hangen.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

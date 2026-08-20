"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { ProcessStep as ProcessStepData } from "@/lib/content/werkwijze";

interface ProcessStepProps {
  step: ProcessStepData;
  /** De laatste stap krijgt geen doorlopende lijn onder zich. */
  isLast: boolean;
}

/** Padlengte van het vinkje — genoeg om het pad volledig te verbergen. */
const CHECK_PATH_LENGTH = 30;

/**
 * Eén stap op de tijdlijn. Framer bepaalt alleen wanneer de stap in beeld komt;
 * de ring die zich vult en het vinkje dat zichzelf tekent zijn CSS-transities,
 * zodat alle kleuren uit de tokens blijven komen.
 */
export function ProcessStep({ step, isLast }: ProcessStepProps) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setActive(true)}
      viewport={{ once: true, amount: 0.5 }}
      className={cn(
        "relative border-l pl-[3.375rem]",
        isLast ? "border-transparent" : "border-hairline-strong pb-11",
      )}
    >
      <span
        className={cn(
          "absolute -left-[1.1875rem] top-0 flex size-[2.375rem] items-center justify-center rounded-full border",
          "transition-colors duration-slow ease-interact",
          active ? "border-brand bg-brand text-white" : "border-brand/50 bg-surface text-brand",
        )}
      >
        <CheckIcon
          className="size-[1.125rem] transition-[stroke-dashoffset] duration-slow ease-interact"
          style={{
            strokeDasharray: CHECK_PATH_LENGTH,
            strokeDashoffset: active ? 0 : CHECK_PATH_LENGTH,
            transitionDelay: "100ms",
          }}
        />
      </span>

      <Reveal>
        <h3 className="mb-3 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-semibold uppercase tracking-[-0.01em]">
          {step.title}
        </h3>
        <p className="text-[1.02rem] leading-[1.6] text-muted">{step.description}</p>
      </Reveal>
    </motion.div>
  );
}

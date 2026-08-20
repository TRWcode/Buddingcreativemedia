import type { Transition, Variants } from "framer-motion";

/**
 * Motion-tokens voor Framer Motion. Spiegelt de waarden in `app/globals.css`
 * (--ease-*, --duration-*) zodat CSS-transities en Framer hetzelfde ritme
 * aanhouden. Durations hier in seconden, want dat verwacht Framer.
 *
 * Wijzig je een waarde hier, wijzig hem dan ook in globals.css — en omgekeerd.
 */

/**
 * Een sterk front-loaded curve zoals expo — cubic-bezier(.19,1,.22,1) — zet bij
 * korte afstanden vrijwel alle beweging in de eerste frames en laat de rest
 * sub-pixel uitkruipen. Dat oogt als haperen. Deze curve verdeelt de beweging
 * gelijkmatiger en heeft een korte staart.
 */
export const EASE_ENTRANCE = [0.25, 0.8, 0.35, 1] as const;
export const EASE_OUT_SOFT = [0.33, 1, 0.68, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.35,
  slow: 0.5,
  reveal: 0.7,
} as const;

/** Vertraging tussen opeenvolgende kinderen in een gestaggerde groep. */
export const STAGGER = {
  tight: 0.06,
  base: 0.09,
  loose: 0.14,
} as const;

export const transition = {
  reveal: { duration: DURATION.reveal, ease: EASE_ENTRANCE },
  base: { duration: DURATION.base, ease: EASE_ENTRANCE },
  fast: { duration: DURATION.fast, ease: EASE_OUT_SOFT },
} satisfies Record<string, Transition>;

/**
 * Lenis-instellingen. Bewust een duration-model in plaats van een lerp: bij een
 * lerp is de beweging op slag het snelst en kruipt daarna asymptotisch uit, wat
 * per muiswiel-klik een schok met een lange staart geeft. Met een vaste duur en
 * een zachte ease-out is het snelheidsverloop veel gelijkmatiger.
 */
export const SCROLL = {
  duration: 0.62,
  /** Ease-out met exponent 2 — kort genoeg om direct aan te voelen. */
  easing: (t: number) => 1 - Math.pow(1 - t, 2),
  wheelMultiplier: 1,
} as const;

/** Standaard viewport-instelling voor scroll-reveals: één keer, net voor beeldrand. */
export const VIEWPORT = { once: true, amount: 0.12, margin: "0px 0px -8% 0px" } as const;

/* ---------------------------------------------------------------------------
   Variants
   Elke variant heeft een `hidden` en `shown` state, zodat groepen via
   `variants` overerven en er nergens losse delays in componenten staan.
   --------------------------------------------------------------------------- */

/** Fade + subtiele upward-translate — de basis-reveal van de hele site. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: transition.reveal },
};

/** Alleen fade — voor elementen waar verschuiven te druk wordt. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_SOFT } },
};

/** Container die zijn kinderen na elkaar binnen laat komen. */
export const staggerParent = (stagger: number = STAGGER.base, delay = 0): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Eén regel van de hero-kop: schuift van onder het masker omhoog. */
export const heroLine: Variants = {
  hidden: { y: "115%", rotate: 3, opacity: 0 },
  shown: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.82, ease: EASE_ENTRANCE } },
};

/** Horizontale lijn die vanaf links uitrolt (accent onder eyebrows). */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE_ENTRANCE } },
};

/** Reduced-motion fallback: alles staat meteen op zijn eindstand. */
export const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0, scaleX: 1, rotate: 0 },
  shown: { opacity: 1, y: 0, scaleX: 1, rotate: 0, transition: { duration: 0 } },
};

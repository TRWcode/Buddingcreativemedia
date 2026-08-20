import type { CtaLink } from "./types";

export const contact = {
  eyebrow: "Klaar om te starten?",
  title: "Let's Talk",
  description:
    "Vertel ons over je merk, event of project. We denken graag met je mee over het beeld dat jouw verhaal vertelt.",
  cta: { label: "Neem contact op", href: "mailto:info@buddingcreativemedia.nl" } satisfies CtaLink,
} as const;

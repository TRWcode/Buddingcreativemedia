import type { SectionIntro } from "./types";

export interface ProcessStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

/**
 * Dit blok hangt onder "Over Ons" in de navigatie, dus dat is ook wat de
 * eyebrow zegt. Stond er "Onze werkwijze", en dan klikte je op Over Ons en
 * landde je op een kop die iets anders heet — de bezoeker denkt dan dat hij
 * verkeerd terecht is gekomen en scrollt door. Het anker blijft `#werkwijze`:
 * dat adres staat in de nav, de footer en in externe links.
 */
export const werkwijzeIntro: SectionIntro & { readonly titleLines: readonly string[] } = {
  eyebrow: "Over ons",
  title: "Beeld dat blijft hangen",
  /** Laatste regel krijgt de accentkleur. */
  titleLines: ["Beeld dat", "blijft", "hangen"],
  description:
    "We maken foto's en video's voor merken, bedrijven en events — vanuit Almere, en overal waar het gebeurt. Eén aanspreekpunt, korte lijnen en beeld dat doet waar je het voor liet maken.",
};

export const processSteps: readonly ProcessStep[] = [
  {
    id: "focus",
    title: "Eerst het doel",
    description:
      "We vragen waar het beeld voor is voordat de camera uit de tas komt. Dat bepaalt de shotlijst, en het scheelt je een tweede shoot.",
  },
  {
    id: "locatie",
    // Heette "Helder & prettig contact", terwijl de tekst eronder over
    // onopvallend werken op locatie ging. De kop dekt nu de tekst; het contact
    // is naar de derde stap verhuisd, waar het thuishoort.
    title: "Onopvallend aanwezig",
    description:
      "We bewegen ons rustig door de locatie, vangen de sfeer en missen de momenten niet die er echt toe doen. Jij hoeft niets te regisseren.",
  },
  {
    id: "plezier",
    title: "Betrokken & met plezier",
    description:
      "Korte lijnen, één aanspreekpunt en geen jargon. We houden van het vak en werken naar een resultaat waar we allebei trots op zijn.",
  },
];

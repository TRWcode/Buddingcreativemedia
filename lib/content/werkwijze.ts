import type { SectionIntro } from "./types";

export interface ProcessStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export const werkwijzeIntro: SectionIntro & { readonly titleLines: readonly string[] } = {
  eyebrow: "Onze werkwijze",
  title: "Elk beeld vertelt een verhaal",
  /** Laatste regel krijgt de accentkleur. */
  titleLines: ["Elk beeld", "vertelt een", "verhaal"],
  description:
    "We hechten veel waarde aan een fijne samenwerking, en dat zie je terug in het resultaat. Creativiteit, duidelijke communicatie en werk dat echt impact maakt, met plezier en betrokkenheid.",
};

export const processSteps: readonly ProcessStep[] = [
  {
    id: "focus",
    title: "Creatief met focus",
    description:
      "We denken creatief mee in beeld én boodschap, zodat elk resultaat echt werkt voor jouw doel.",
  },
  {
    id: "contact",
    title: "Helder & prettig contact",
    description:
      "We bewegen ons onopvallend door de locatie, leggen de sfeer vast en houden rekening met de essentiële momenten.",
  },
  {
    id: "plezier",
    title: "Betrokken & met plezier",
    description:
      "We zijn persoonlijk betrokken, houden van ons vak en werken samen naar een resultaat waar iedereen trots op is.",
  },
];

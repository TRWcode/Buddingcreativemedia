import type { CtaLink } from "./types";
import type { FormField } from "./forms";
import { contactHref } from "./site";

export { emptyOptionLabel, honeypotField } from "./forms";

/** Het afsluitende rode blok onderaan elke pagina. */
export const contact = {
  eyebrow: "Klaar om te starten?",
  title: "Let's Talk",
  description:
    "Vertel ons over je merk, event of project. We denken graag met je mee over het beeld dat jouw verhaal vertelt.",
  cta: { label: "Neem contact op", href: contactHref } satisfies CtaLink,
} as const;

export const contactFields: readonly FormField[] = [
  {
    name: "naam",
    label: "Naam",
    type: "text",
    required: true,
    autoComplete: "name",
    placeholder: "Voor- en achternaam",
    half: true,
  },
  {
    name: "email",
    label: "E-mailadres",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "naam@bedrijf.nl",
    half: true,
  },
  {
    name: "telefoon",
    label: "Telefoon",
    type: "tel",
    autoComplete: "tel",
    placeholder: "Optioneel",
    half: true,
  },
  {
    name: "opdracht",
    label: "Waar gaat het om?",
    type: "select",
    options: ["Fotografie", "Videografie", "Fotografie en video", "Weet ik nog niet"],
    half: true,
  },
  {
    name: "periode",
    label: "Datum of periode",
    type: "text",
    // Bewust een tekstveld en geen datumkiezer. "Ergens in het najaar" en "de
    // week van de opening" zijn echte antwoorden; een datumkiezer dwingt tot
    // een precieze dag die er nog niet is, en dan wordt er maar wat ingevuld.
    placeholder: "14 maart, of ergens in het najaar",
    half: true,
  },
  {
    name: "locatie",
    label: "Locatie",
    type: "text",
    placeholder: "Almere, op locatie, of nog te bepalen",
    half: true,
  },
  {
    name: "bericht",
    label: "Je bericht",
    type: "textarea",
    required: true,
    placeholder:
      "Vertel kort wat je voor ogen hebt: wat er te zien moet zijn, waar het beeld voor gebruikt wordt en met hoeveel mensen je bent.",
  },
];

export const contactPage = {
  eyebrow: "Contact",
  heading: ["Let's", "Talk"] as const,
  metaTitle: "Contact",
  metaDescription:
    "Neem contact op met Budding Creative Media voor fotografie en video in Almere en omstreken. Vertel kort over je project, we reageren meestal binnen een werkdag.",
  intro:
    "Vertel ons over je merk, event of project. Hoe meer we vooraf weten, hoe scherper we je kunnen zeggen wat het kost en wat het oplevert. Weet je het nog niet precies? Stuur dan gewoon je vraag; we denken graag mee.",
  formHeading: "Stuur een aanvraag",
  formIntro: "Alleen naam, e-mail en je bericht zijn verplicht. De rest scheelt ons een vraag terug.",
  submitLabel: "Verstuur aanvraag",
  submitPendingLabel: "Bezig met versturen",
  directHeading: "Liever direct",
  directIntro:
    "Bellen of appen mag ook. Voor een lopende opdracht is dat vaak sneller dan een formulier.",
  responseHeading: "Wat er daarna gebeurt",
  responseSteps: [
    "Je krijgt meestal binnen een werkdag antwoord van ons.",
    "We bellen kort of mailen door om het plan en de planning scherp te krijgen.",
    "Je ontvangt een offerte met een vaste prijs en een leverdatum.",
  ],
} as const;

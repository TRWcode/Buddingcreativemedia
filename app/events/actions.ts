"use server";

import { canSignUp, eventSignupFields, findEvent, formatEventDate } from "@/lib/content/events";
import { honeypotField } from "@/lib/content/forms";
import type { FormState } from "@/lib/content/forms";
import { site } from "@/lib/content/site";

const SUCCESS =
  "Bedankt, we hebben je aanmelding binnen. Je krijgt binnen een werkdag bericht.";

const UNAVAILABLE =
  `Het versturen lukte niet. Probeer het zo nog eens, of mail ons rechtstreeks op ${site.email}.`;

const INCOMPLETE = "Er ontbreekt nog iets. Hieronder staat wat er aangevuld moet worden.";

const CLOSED = "Voor dit event kun je je niet meer aanmelden.";

const MAX_LENGTH: Record<string, number> = {
  naam: 120,
  email: 160,
  telefoon: 40,
  bedrijf: 120,
  ervaring: 60,
  opmerking: 2000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function read(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.naam) errors.naam = "Vul je naam in.";

  if (!values.email) {
    errors.email = "Vul je e-mailadres in, anders kunnen we je niet bevestigen.";
  } else if (!EMAIL.test(values.email)) {
    errors.email = "Dit e-mailadres klopt niet. Controleer het even.";
  }

  const aantal = Number(values.aantal);
  if (!values.aantal || !Number.isInteger(aantal) || aantal < 1 || aantal > 10) {
    errors.aantal = "Vul een aantal in tussen 1 en 10.";
  }

  if (values.akkoord !== "ja") {
    errors.akkoord = "Je moet akkoord gaan voordat we je kunnen inschrijven.";
  }

  for (const [name, limit] of Object.entries(MAX_LENGTH)) {
    const value = values[name];
    if (value && value.length > limit) {
      errors[name] = `Dit veld mag maximaal ${limit} tekens bevatten.`;
    }
  }

  return errors;
}

/**
 * Verwerkt een aanmelding voor een event.
 *
 * Net als het contactformulier slaat dit niets op: de aanmelding gaat als
 * e-mail de deur uit. Dat is bewust de eenvoudigste vorm die werkt, en het is
 * ook het punt waar dit later verandert.
 *
 * ── Waar Stapit en de betaling inhaken ──────────────────────────────────────
 *
 * Zodra de aanmelding via het dashboard moet lopen, komt er hieronder één stap
 * bij, op de plek die met TODO is gemarkeerd: de aanmelding als lead of boeking
 * naar Stapit posten in plaats van (of naast) de mail. Stapit heeft daar het
 * meeste al voor staan — klanten, boekingen, facturen en een `payment_id` in
 * `documents` — en de betaling zelf is daar een openstaand roadmap-punt
 * (Mollie/iDEAL, met een publieke betaalpagina en een webhook).
 *
 * Bouw de betaling dus niet hier. Deze site hoort de aanmelding door te geven;
 * het dashboard maakt de factuur en de betaallink, en bevestigt de plek zodra
 * de webhook binnen is. Dat houdt bedragen, btw en administratie op één plek,
 * en dan hoeft deze site nooit een betaalstatus te kennen.
 */
export async function submitEventSignup(
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const eventId = read(formData, "eventId");
  const event = findEvent(eventId);

  if (!event || !canSignUp(event)) {
    return { status: "error", message: CLOSED, errors: {}, values: {} };
  }

  const values: Record<string, string> = {};
  for (const field of eventSignupFields) {
    values[field.name] = read(formData, field.name);
  }

  if (read(formData, honeypotField)) {
    return { status: "success", message: SUCCESS, errors: {}, values: {} };
  }

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: INCOMPLETE, errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey || !from) {
    console.error("[event] RESEND_API_KEY of CONTACT_FROM_EMAIL ontbreekt.");
    return { status: "error", message: UNAVAILABLE, errors: {}, values };
  }

  const lines = eventSignupFields
    .map((field) => {
      const value = values[field.name];
      return value ? `${field.label}: ${value}` : null;
    })
    .filter((line): line is string => line !== null);

  const text = [
    `Nieuwe aanmelding via ${site.url}`,
    "",
    `Event: ${event.title}`,
    `Datum: ${formatEventDate(event.date)}`,
    `Locatie: ${event.location}`,
    event.price ? `Prijs: ${event.price}` : null,
    "",
    ...lines,
    "",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Aanmelding ${event.title} (${values.naam})`,
        text,
      }),
    });

    if (!response.ok) {
      console.error("[event] Resend gaf status", response.status, await response.text());
      return { status: "error", message: UNAVAILABLE, errors: {}, values };
    }
  } catch (error) {
    console.error("[event] Versturen mislukt:", error);
    return { status: "error", message: UNAVAILABLE, errors: {}, values };
  }

  // TODO Stapit: hier de aanmelding als lead of boeking doorzetten naar het
  // dashboard, en de bevestiging met betaallink daarvandaan laten komen.

  // De bevestiging naar de deelnemer is belangrijk maar niet kritiek: de
  // aanmelding is op dit punt al binnen. Mislukt hij, dan loggen we dat en
  // houden we het scherm op geslaagd — anders meldt iemand zich twee keer aan.
  await sendConfirmation({ apiKey, from, event, values }).catch((error) => {
    console.error("[event] Bevestiging naar de deelnemer mislukt:", error);
  });

  return { status: "success", message: SUCCESS, errors: {}, values: {} };
}

async function sendConfirmation({
  apiKey,
  from,
  event,
  values,
}: {
  apiKey: string;
  from: string;
  event: NonNullable<ReturnType<typeof findEvent>>;
  values: Record<string, string>;
}): Promise<void> {
  const text = [
    `Hoi ${values.naam},`,
    "",
    `We hebben je aanmelding voor ${event.title} ontvangen.`,
    "",
    `Datum: ${formatEventDate(event.date)}`,
    event.duration ? `Tijd: ${event.duration}` : null,
    `Locatie: ${event.location}`,
    event.price ? `Prijs: ${event.price}` : null,
    values.aantal ? `Aantal personen: ${values.aantal}` : null,
    "",
    "Je hoort binnen een werkdag van ons of er plek is en hoe je betaalt.",
    "Je plek staat vast zodra de betaling binnen is.",
    "",
    "Met vriendelijke groet,",
    site.name,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [values.email],
      reply_to: site.email,
      subject: `Je aanmelding voor ${event.title}`,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend gaf status ${response.status}`);
  }
}

"use server";

import { contactFields, honeypotField } from "@/lib/content/contact";
import { site } from "@/lib/content/site";
import type { ContactState } from "./state";

const SUCCESS_MESSAGE =
  "Bedankt, je aanvraag is verstuurd. We reageren meestal binnen een werkdag.";

const UNAVAILABLE_MESSAGE =
  `Het versturen lukte niet. Probeer het zo nog eens, of mail ons rechtstreeks op ${site.email}.`;

const INCOMPLETE_MESSAGE =
  "Er ontbreekt nog iets. Hieronder staat wat er aangevuld moet worden.";

/** Grens per veld. Houdt de mail leesbaar en de payload klein. */
const MAX_LENGTH: Record<string, number> = {
  naam: 120,
  email: 160,
  telefoon: 40,
  opdracht: 60,
  periode: 120,
  locatie: 120,
  bericht: 4000,
};

/**
 * Bewust ruim. Een strengere regex wijst vaker geldige adressen af dan hij
 * ongeldige tegenhoudt, en of het adres echt bestaat blijkt toch pas als de
 * mail eruit gaat.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function read(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.naam) errors.naam = "Vul je naam in.";

  if (!values.email) {
    errors.email = "Vul je e-mailadres in, anders kunnen we niet antwoorden.";
  } else if (!EMAIL.test(values.email)) {
    errors.email = "Dit e-mailadres klopt niet. Controleer het even.";
  }

  if (!values.bericht) {
    errors.bericht = "Vertel kort waar het om gaat.";
  } else if (values.bericht.length < 10) {
    errors.bericht = "Een paar woorden meer helpt ons je beter te antwoorden.";
  }

  for (const [name, limit] of Object.entries(MAX_LENGTH)) {
    const value = values[name];
    if (value && value.length > limit) {
      errors[name] = `Dit veld mag maximaal ${limit} tekens bevatten.`;
    }
  }

  return errors;
}

/** De platte tekst van de mail. Geen HTML, dus ook niets om te ontsnappen. */
function composeMessage(values: Record<string, string>): string {
  const lines = contactFields
    .map((field) => {
      const value = values[field.name];
      return value ? `${field.label}: ${value}` : null;
    })
    .filter((line): line is string => line !== null);

  return `Nieuwe aanvraag via het contactformulier op ${site.url}\n\n${lines.join("\n")}\n`;
}

/**
 * Verwerkt het contactformulier.
 *
 * Er wordt niets opgeslagen: de aanvraag gaat als e-mail de deur uit en is
 * daarna van deze server verdwenen. Dat is precies wat de privacyverklaring
 * belooft, dus houd dat zo als hier ooit iets bijkomt.
 *
 * De functie gooit nooit. Een mislukte verzending is voor de bezoeker geen
 * crash maar een melding met een uitweg: het e-mailadres staat er dan bij.
 */
export async function submitContactForm(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: Record<string, string> = {};
  for (const field of contactFields) {
    values[field.name] = read(formData, field.name);
  }

  // Het honeypot-veld is voor een bezoeker onzichtbaar en onbereikbaar. Is het
  // gevuld, dan zit er een bot achter. We doen alsof het gelukt is: een bot die
  // een foutmelding krijgt, probeert het meteen opnieuw.
  if (read(formData, honeypotField)) {
    return { status: "success", message: SUCCESS_MESSAGE, errors: {}, values: {} };
  }

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: INCOMPLETE_MESSAGE, errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey || !from) {
    console.error(
      "[contact] RESEND_API_KEY of CONTACT_FROM_EMAIL ontbreekt; er kan niets verstuurd worden.",
    );
    return { status: "error", message: UNAVAILABLE_MESSAGE, errors: {}, values };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Antwoorden gaat rechtstreeks naar de aanvrager, zonder het adres over
        // te typen. Het afzenderadres blijft van het eigen domein: een vreemd
        // adres in `from` wordt door SPF en DMARC geweigerd.
        reply_to: values.email,
        subject: `Website-aanvraag: ${values.opdracht || "algemeen"} (${values.naam})`,
        text: composeMessage(values),
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend gaf status", response.status, await response.text());
      return { status: "error", message: UNAVAILABLE_MESSAGE, errors: {}, values };
    }
  } catch (error) {
    console.error("[contact] Versturen mislukt:", error);
    return { status: "error", message: UNAVAILABLE_MESSAGE, errors: {}, values };
  }

  return { status: "success", message: SUCCESS_MESSAGE, errors: {}, values: {} };
}

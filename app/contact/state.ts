/**
 * De staat die de server action teruggeeft en het formulier rendert.
 *
 * Staat los van `actions.ts` omdat een bestand met `"use server"` alleen async
 * functies mag exporteren. De begintoestand hoort daar dus niet thuis.
 */

export type ContactStatus = "idle" | "success" | "error";

export interface ContactState {
  readonly status: ContactStatus;
  /** Melding boven het formulier. Leeg zolang er niets te melden valt. */
  readonly message: string;
  /** Veldnaam naar foutmelding, voor de tekst onder het invoerveld zelf. */
  readonly errors: Readonly<Record<string, string>>;
  /** Wat er was ingevuld, zodat een afgekeurd formulier niet leeg terugkomt. */
  readonly values: Readonly<Record<string, string>>;
}

export const emptyContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

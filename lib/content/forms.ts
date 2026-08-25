/**
 * De vorm van een formulierveld, gedeeld door het contactformulier en het
 * aanmeldformulier voor events.
 *
 * Beide formulieren moeten er hetzelfde uitzien en zich hetzelfde gedragen; dat
 * lukt alleen als ze uit dezelfde beschrijving renderen. Een veld toevoegen doe
 * je in de content van dat formulier, niet in het component.
 */

export type FormFieldType = "text" | "email" | "tel" | "number" | "select" | "textarea" | "checkbox";

export interface FormField {
  readonly name: string;
  readonly label: string;
  readonly type: FormFieldType;
  readonly required?: boolean;
  readonly placeholder?: string;
  /** Toelichting onder het veld, voor iets dat uitleg nodig heeft. */
  readonly hint?: string;
  readonly autoComplete?: string;
  /** Alleen bij `select`. De lege keuze staat er automatisch voor. */
  readonly options?: readonly string[];
  /** Alleen bij `number`. */
  readonly min?: number;
  readonly max?: number;
  /** Halve kolom in het raster; anders volle breedte. */
  readonly half?: boolean;
}

/** De keuze in een select die geldt als er nog niets is gekozen. */
export const emptyOptionLabel = "Maak een keuze";

/**
 * Het verborgen veld dat bots wel invullen en bezoekers niet. De naam is
 * bewust gewoon en verleidelijk; een veld dat `honeypot` heet vult niemand in.
 * Beide formulieren gebruiken hetzelfde veld.
 */
export const honeypotField = "website";

/** De staat die een formulier-action teruggeeft. */
export interface FormState {
  readonly status: "idle" | "success" | "error";
  /** Melding boven het formulier. Leeg zolang er niets te melden valt. */
  readonly message: string;
  /** Veldnaam naar foutmelding, voor de tekst onder het invoerveld zelf. */
  readonly errors: Readonly<Record<string, string>>;
  /** Wat er was ingevuld, zodat een afgekeurd formulier niet leeg terugkomt. */
  readonly values: Readonly<Record<string, string>>;
}

export const emptyFormState: FormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

/**
 * Bouwstenen voor de juridische pagina's.
 *
 * De teksten staan hier als data en niet als JSX, om dezelfde reden als alle
 * andere copy in deze map: de opmaak hoort in het component, de woorden horen
 * hier. Bij een juridische tekst weegt dat zwaarder dan elders. Wie een artikel
 * aanpast, moet dat kunnen doen zonder een `<p>` te kunnen breken, en een
 * diff van een tekstwijziging moet leesbaar blijven.
 */

export type LegalBlock =
  /** Losse alinea zonder nummer. Ook de afsluitende zin onder een opsomming. */
  | { readonly kind: "text"; readonly text: string }
  /** Genummerd lid, bijvoorbeeld 3.2. Het nummer hangt links van de tekst. */
  | { readonly kind: "clause"; readonly number: string; readonly text: string }
  /** Opsomming, hangt onder het lid of de alinea erboven. */
  | { readonly kind: "list"; readonly items: readonly string[] }
  /** Begrippenlijst, rendert als `<dl>` in plaats van als opsomming. */
  | {
      readonly kind: "definitions";
      readonly items: readonly { readonly term: string; readonly text: string }[];
    };

export interface LegalArticle {
  /** Anker en doel van de inhoudsopgave, bijvoorbeeld `artikel-7`. */
  readonly id: string;
  /** Het nummer los van de titel, zodat het als eigen label kan renderen. */
  readonly number: string;
  readonly title: string;
  readonly blocks: readonly LegalBlock[];
}

export interface LegalDocument {
  readonly eyebrow: string;
  /** Twee regels voor de gemaskeerde kop; de tweede krijgt de accentkleur. */
  readonly heading: readonly [string, string];
  /** Titel en omschrijving voor `metadata`, los van de kop op de pagina. */
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly intro: string;
  /** ISO-datum. Het component maakt er een Nederlandse datum van. */
  readonly updated: string;
  readonly articles: readonly LegalArticle[];
}

/**
 * De ondernemingsgegevens waar beide documenten naar verwijzen.
 *
 * Een leeg veld wordt overal weggelaten in plaats van als lege regel getoond.
 * Vul KvK-nummer en btw-id in zodra ze bekend zijn: een privacyverklaring moet
 * de verwerkingsverantwoordelijke identificeerbaar maken, en het KvK-nummer is
 * daarvoor het gebruikelijke anker.
 */
export const company = {
  legalName: "Budding Creative Media",
  /** Straat en huisnummer. Leeg laten als je geen vestigingsadres publiceert. */
  street: "",
  postalCode: "",
  city: "Almere",
  country: "Nederland",
  kvk: "",
  vat: "",
} as const;

/** De ingevulde regels van het adresblok, in de volgorde waarin ze horen. */
export function companyLines(): readonly string[] {
  return [
    company.legalName,
    company.street,
    [company.postalCode, company.city].filter(Boolean).join(" "),
    company.country,
  ].filter((line) => line.length > 0);
}

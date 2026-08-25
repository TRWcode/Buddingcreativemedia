/** Gedeelde content-types. Elke sectie-content voldoet aan een van deze vormen. */

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  /** Intrinsieke afmetingen — verplicht, zodat next/image geen CLS veroorzaakt. */
  readonly width: number;
  readonly height: number;
  /**
   * Welk deel van het beeld overeind blijft als `object-cover` moet bijsnijden,
   * bijvoorbeeld `"right"` of `"30% center"`. Standaard het midden.
   *
   * Nodig bij beeld waarvan het onderwerp niet in het midden zit. Een smal
   * scherm laat van een liggende foto maar een derde van de breedte zien, en
   * dan bepaalt deze waarde of je het onderwerp ziet of een willekeurige hoek.
   */
  readonly objectPosition?: string;
}

export interface CtaLink {
  readonly label: string;
  readonly href: string;
}

export interface SectionIntro {
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
}

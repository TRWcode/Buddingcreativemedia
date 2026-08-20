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

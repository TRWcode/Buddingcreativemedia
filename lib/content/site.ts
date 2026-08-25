import type { CtaLink, ImageAsset, NavLink } from "./types";

/**
 * Het telefoonnummer in internationale notatie, of `null` zolang het niet
 * bekend is. Op `null` verdwijnen telefoon en WhatsApp overal uit beeld — een
 * half ingevuld nummer is erger dan geen nummer: dat is een klikbare link die
 * nergens uitkomt, en de bezoeker merkt dat pas nadat hij belt.
 */
const phone: string | null = null;

interface Site {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly location: string;
  readonly email: string;
  /** Zie hierboven: `null` betekent "nog geen nummer", niet "geen nummer". */
  readonly phone: string | null;
  readonly url: string;
}

// Expliciet getypt in plaats van `as const`: anders versmalt `phone` tot het
// letterlijke type `null` en denkt TypeScript overal dat er nooit een nummer
// kan zijn, ook nadat je er een hebt ingevuld.
export const site: Site = {
  name: "Budding Creative Media",
  tagline: "Fotografie & Video · Almere",
  description:
    "Fotografie en video die merken, bedrijven en events visueel sterk in beeld brengt. Gevestigd in Almere.",
  location: "Almere · Nederland",
  email: "info@buddingcreativemedia.nl",
  phone,
  /** Vervang door het productie-domein zodra dat live staat. */
  url: "https://www.buddingcreativemedia.nl",
};

/**
 * De uitgaande contact-links, afgeleid van het nummer hierboven. `null` zodra
 * er geen nummer is, zodat elke plek die ze rendert dezelfde afweging maakt.
 */
export const phoneHref = site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : null;
export const whatsappHref = site.phone
  ? `https://wa.me/${site.phone.replace(/\D/g, "")}`
  : null;
export const mailHref = `mailto:${site.email}`;

/**
 * Het merklogo, wit-variant met transparante achtergrond — de enige die op de
 * donkere ondergrond werkt. De marges zijn er in het bestand al af, dus de
 * afmetingen hieronder zijn precies de illustratie: ruimte eromheen regel je
 * met CSS, niet met transparante pixels.
 */
export const siteLogo: ImageAsset = {
  src: "/media/brand/logo.webp",
  alt: site.name,
  width: 560,
  height: 105,
};

/** De vaste routes. Eén plek, zodat links niet uiteenlopen. */
export const portfolioHref = "/portfolio";
export const eventsHref = "/events";
export const contactHref = "/contact";
export const termsHref = "/algemene-voorwaarden";
export const privacyHref = "/privacyverklaring";

export const navLinks: readonly NavLink[] = [
  { label: "Portfolio", href: portfolioHref },
  { label: "Events", href: eventsHref },
  { label: "Diensten", href: "#diensten" },
  { label: "Cases", href: "#cases" },
  { label: "Over Ons", href: "#werkwijze" },
];

export const primaryCta: CtaLink = { label: "Let's Talk", href: contactHref };

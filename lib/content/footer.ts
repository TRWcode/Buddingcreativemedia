import type { NavLink } from "./types";
import { contactHref, portfolioHref, privacyHref, termsHref } from "./site";

export type SocialPlatform = "instagram" | "facebook" | "youtube";

export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly href: string;
}

export const footerColumns = {
  navigation: { heading: "Navigatie" },
  contact: { heading: "Contact" },
} as const;

/** Vervang de `#` zodra de kanalen bekend zijn. */
export const socialLinks: readonly SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
];

export const footerNav: readonly NavLink[] = [
  { label: "Portfolio", href: portfolioHref },
  { label: "Events", href: "#events" },
  { label: "Diensten", href: "#diensten" },
  { label: "Cases", href: "#cases" },
  { label: "Over Ons", href: "#werkwijze" },
  { label: "Contact", href: contactHref },
];

/**
 * De juridische pagina's, in de onderste balk. Ze horen niet in de gewone
 * navigatie: je zoekt ze pas als je ze nodig hebt, en dan kijk je onderaan.
 */
export const legalLinks: readonly NavLink[] = [
  { label: "Algemene voorwaarden", href: termsHref },
  { label: "Privacyverklaring", href: privacyHref },
];

export const copyright = `© ${new Date().getFullYear()} Budding Creative Media`;

/** Credit in de onderste balk — de partij die de site heeft gebouwd. */
export const credit = {
  prefix: "Website door",
  label: "Stapit",
  href: "https://stapit.com",
} as const;

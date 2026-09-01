import type { NavLink } from "./types";
import {
  casesHref,
  contactHref,
  eventsHref,
  portfolioHref,
  privacyHref,
  termsHref,
} from "./site";

export type SocialPlatform = "instagram" | "youtube" | "linkedin";

export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly href: string;
}

export const footerColumns = {
  navigation: { heading: "Navigatie" },
  contact: { heading: "Contact" },
} as const;

/**
 * De kanalen die daadwerkelijk bestaan. Geen Facebook: dat is er niet, en een
 * icoon dat naar een lege of niet-bestaande pagina wijst kost meer vertrouwen
 * dan het oplevert.
 *
 * LinkedIn is het persoonlijke profiel van Erwin en geen bedrijfspagina. Dat is
 * voor een eenmanszaak in beeld ook het eerlijkere adres — daar zit het gezicht
 * achter het werk. Het `label` zegt daarom "LinkedIn" en niet de bedrijfsnaam.
 */
export const socialLinks: readonly SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/budding_creative_media/",
  },
  { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/@BuddingCreativeMedia" },
  { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/erwinbudding/" },
];

/** Dezelfde volgorde en dezelfde bestemmingen als de hoofdnavigatie, plus Contact. */
export const footerNav: readonly NavLink[] = [
  { label: "Portfolio", href: portfolioHref },
  { label: "Cases", href: casesHref },
  { label: "Events", href: eventsHref },
  { label: "Diensten", href: "#diensten" },
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

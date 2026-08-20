import type { NavLink } from "./types";

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
  { label: "Portfolio", href: "#cases" },
  { label: "Events", href: "#events" },
  { label: "Diensten", href: "#diensten" },
  { label: "Cases", href: "#cases" },
  { label: "Over Ons", href: "#werkwijze" },
];

export const copyright = `© ${new Date().getFullYear()} Budding Creative Media`;

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Iconenset uit het ontwerp. Allemaal 24×24 met `currentColor` als lijnkleur,
 * zodat ze de kleur van hun context overnemen.
 */
const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CameraIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="2.5" y="6" width="19" height="14" rx="3" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 6l1.5-2.5h5L16 6" />
    </svg>
  );
}

export function VideoIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={2.4} aria-hidden {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.8} aria-hidden {...props}>
      <rect x="3" y="4.5" width="18" height="17" rx="3" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.8} aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...strokeProps} strokeWidth={1.8} aria-hidden {...props}>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <path d="M22 8.6a4 4 0 00-2.8-2.8C17.4 5.3 12 5.3 12 5.3s-5.4 0-7.2.5A4 4 0 002 8.6 41 41 0 001.5 12 41 41 0 002 15.4a4 4 0 002.8 2.8c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5A4 4 0 0022 15.4 41 41 0 0022.5 12 41 41 0 0022 8.6z" />
      <path d="M10 15l5-3-5-3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="M3.5 7.5l7.63 5.09a1.6 1.6 0 001.74 0L20.5 7.5" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...strokeProps} aria-hidden {...props}>
      <path d="M7.4 3.5H4.9a1.9 1.9 0 00-1.9 2.1A16.5 16.5 0 0018.4 21a1.9 1.9 0 002.1-1.9v-2.5a1.3 1.3 0 00-1.1-1.3l-2.6-.4a1.3 1.3 0 00-1.2.5l-.9 1.2a12.9 12.9 0 01-5.8-5.8l1.2-.9a1.3 1.3 0 00.5-1.2l-.4-2.6a1.3 1.3 0 00-1.3-1.1z" />
    </svg>
  );
}

/**
 * Merkglyph, dus als gevuld silhouet en niet in de lijnstijl van de set — een
 * nagetekende WhatsApp in outline leest niet meer als WhatsApp.
 */
export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.35M12.05 21.8a9.87 9.87 0 01-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26 9.88 9.88 0 0116.88-6.99 9.83 9.83 0 012.89 7 9.88 9.88 0 01-9.89 9.89m8.42-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.09.54 4.14 1.58 5.94L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.44c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41" />
    </svg>
  );
}

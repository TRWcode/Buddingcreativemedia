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

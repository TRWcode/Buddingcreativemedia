import type { ReactNode } from "react";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { mailHref, phoneHref, site, whatsappHref } from "@/lib/content/site";

interface ContactChannel {
  readonly label: string;
  readonly value: string;
  /** Zonder href rendert de regel als tekst in plaats van als link. */
  readonly href: string | null;
  readonly icon: ReactNode;
  readonly external?: boolean;
}

/**
 * Zet een breekpunt na de apenstaart.
 *
 * Een e-mailadres is één woord en breekt uit zichzelf nergens. Met alleen
 * `break-words` knipt de browser waar hij toevallig uitkomt, en dan lees je
 * "info@buddingcreativemedia.n" met een losse "l" eronder. Na de @ is de plek
 * waar een lezer de breuk verwacht.
 */
function Breakable({ value }: { value: string }) {
  const at = value.indexOf("@");
  if (at === -1) return <>{value}</>;

  return (
    <>
      {value.slice(0, at + 1)}
      <wbr />
      {value.slice(at + 1)}
    </>
  );
}

/**
 * De directe kanalen naast het formulier.
 *
 * Telefoon en WhatsApp verschijnen alleen als er een nummer in `site.ts` staat.
 * Zolang dat er niet is, blijft er een blok over met mail en vestigingsplaats;
 * dat leest als een bewuste keuze, terwijl een knop die nergens heen belt als
 * een fout leest.
 */
export function ContactDetails() {
  const channels: ContactChannel[] = [
    {
      label: "Mail ons",
      value: site.email,
      href: mailHref,
      icon: <MailIcon className="size-6" />,
    },
    ...(phoneHref && site.phone
      ? [
          {
            label: "Bel ons",
            value: site.phone,
            href: phoneHref,
            icon: <PhoneIcon className="size-6" />,
          },
        ]
      : []),
    ...(whatsappHref
      ? [
          {
            label: "WhatsApp",
            value: "Stuur een bericht",
            href: whatsappHref,
            icon: <WhatsAppIcon className="size-6" />,
            external: true,
          },
        ]
      : []),
    {
      label: "Werkgebied",
      value: "Almere en omstreken, heel Nederland op aanvraag",
      href: null,
      icon: <PinIcon className="size-6" />,
    },
  ];

  return (
    <ul className="space-y-4">
      {channels.map((channel) => {
        const body = (
          <>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-icon border border-brand/30 bg-brand/12 text-brand">
              {channel.icon}
            </span>
            {/* `min-w-0` laat de tekstkolom krimpen naast het icoon, `break-words`
                laat het e-mailadres afbreken. Zonder allebei loopt
                info@buddingcreativemedia.nl op een smal scherm buiten de kaart:
                het is één woord en breekt uit zichzelf nergens. */}
            <span className="min-w-0">
              <span className="block text-[0.74rem] uppercase tracking-label text-muted">
                {channel.label}
              </span>
              <span className="mt-1 block break-words font-medium leading-[1.4]">
                <Breakable value={channel.value} />
              </span>
            </span>
          </>
        );

        return (
          <li key={channel.label}>
            {channel.href ? (
              <a
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="flex items-center gap-4 rounded-card border border-hairline bg-surface p-4 transition-colors duration-fast hover:border-brand/40"
              >
                {body}
              </a>
            ) : (
              <div className="flex items-center gap-4 rounded-card border border-hairline p-4 text-muted">
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

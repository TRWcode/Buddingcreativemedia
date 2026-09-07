import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import { MediaZoom } from "@/components/ui/MediaZoom";
import { CameraIcon, PlayIcon, VideoIcon } from "@/components/ui/icons";
import type { Service } from "@/lib/content/services";

const icons = {
  camera: CameraIcon,
  video: VideoIcon,
} as const;

/**
 * Eén dienstenkaart: beeldstrook boven, daaronder de discipline in één zin en
 * de lijst met wat je concreet kunt bestellen.
 *
 * Het beeld is bewust een strook en geen halve kaart meer. Zodra de lijst
 * eronder staat is de foto de sfeer bij de kop, niet de inhoud — en twee kaarten
 * met elk een foto van 20rem plus een lijst worden op een telefoon een scroll
 * van drie schermen. Zo blijft de hele dienstenrij binnen één blik.
 */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-surface">
      <MediaZoom
        image={service.image}
        sizes="(max-width: 45rem) 100vw, 50vw"
        withAccentLine
        className="h-[clamp(11rem,20vw,16rem)]"
      >
        {service.showPlay ? (
          <span className="absolute left-1/2 top-1/2 flex size-[4.125rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand/90 text-white shadow-glow transition-transform duration-base ease-interact group-hover:scale-112">
            <PlayIcon className="size-[1.375rem]" />
          </span>
        ) : null}
      </MediaZoom>

      <div className="flex flex-1 flex-col p-[clamp(1.75rem,3.5vw,2.875rem)]">
        {/* Wrapt op smalle schermen. "VIDEOGRAFIE" is in de display-letter geen
            woord dat kan afbreken, en naast een badge van 56px past het onder de
            360px niet meer op één regel — zonder `flex-wrap` loopt de kop dan de
            kaart uit. Met wrap zakt de titel onder de badge, wat er precies zo
            uitziet als de gestapelde opzet van hiervoor. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <IconBadge>
            <Icon className="size-[1.625rem]" />
          </IconBadge>
          <h3 className="font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-semibold uppercase tracking-title">
            {service.title}
          </h3>
        </div>

        <p className="mt-6 max-w-[29rem] text-[1.02rem] leading-[1.6] text-muted">
          {service.description}
        </p>

        {/* Naam en toelichting staan naast elkaar zolang ze samen op één regel
            passen en vallen daaronder vanzelf uit elkaar. Dat scheelt een
            breakpoint: de kaart is de halve pagina breed op desktop en de hele
            pagina op een telefoon, en `flex-wrap` regelt allebei zonder dat er
            ergens een kolombreedte hardgecodeerd staat. */}
        <ul className="mt-8 border-t border-hairline">
          {service.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-hairline py-3.5"
            >
              <span className="font-display text-[1.05rem] font-medium tracking-title text-bone">
                {item.name}
              </span>
              <span className="text-[0.92rem] leading-[1.5] text-muted">{item.summary}</span>
            </li>
          ))}
        </ul>

        {/* `mt-auto` houdt de twee links op dezelfde hoogte, ook al heeft de ene
            discipline een dienst meer dan de andere. */}
        <Link
          href={service.link.href}
          className="mt-auto inline-flex items-center gap-2 pt-7 font-bold text-brand transition-colors duration-fast hover:text-bone"
        >
          {service.link.label}
          <span aria-hidden className="leading-none">
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}

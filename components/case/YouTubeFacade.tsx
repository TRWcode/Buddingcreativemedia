"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PlayIcon } from "@/components/ui/icons";
import { privacyHref } from "@/lib/content/site";
import type { ImageAsset } from "@/lib/content/types";

const SIZES = "(max-width: 720px) 100vw, 87.5rem";

/**
 * Een YouTube-video die pas geladen wordt als de bezoeker erop klikt.
 *
 * De reden is niet snelheid maar de privacyverklaring. Een gewone embed legt al
 * bij het openen van de pagina verbinding met Google en zet cookies, ook bij
 * iemand die de video nooit afspeelt. Dan is de belofte dat deze site geen
 * cookies plaatst niet meer waar en is er een toestemmingsbanner nodig op elke
 * pagina van de site — voor een videoblok dat op twee cases staat.
 *
 * Zo blijft het bij: niets tot de klik, en daarna precies wat de bezoeker zelf
 * heeft aangezet. Daarom staat de poster ook lokaal in `public/media/video/` en
 * niet als `i.ytimg.com`-adres; dat laatste zou alsnog een verzoek naar Google
 * zijn bij het laden van de pagina.
 *
 * `youtube-nocookie.com` doet minder dan de naam belooft — er worden nog steeds
 * cookies gezet zodra de speler laadt. Het is de betere van de twee domeinen,
 * niet een vrijbrief om de melding weg te laten.
 */
export function YouTubeFacade({
  videoId,
  poster,
  title,
}: {
  videoId: string;
  poster: ImageAsset;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        className="size-full border-0"
      />
    );
  }

  return (
    <>
      <Image src={poster.src} alt={poster.alt} fill sizes={SIZES} className="object-cover" />
      <span aria-hidden className="absolute inset-0 bg-ink/45" />

      {/* De hele poster is de knop: dat is het grootste doel dat er is en het
          leest als een speler in plaats van als een afbeelding met een knopje. */}
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group/play absolute inset-0 flex items-center justify-center"
      >
        <span className="flex size-[4.125rem] items-center justify-center rounded-full bg-brand/90 text-white shadow-glow transition-transform duration-base ease-interact group-hover/play:scale-110">
          <PlayIcon className="size-[1.375rem]" />
        </span>
        <span className="sr-only">{title} afspelen</span>
      </button>

      {/* Boven de knop, zodat de link naar de privacyverklaring klikbaar blijft
          en niet de video start. */}
      <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent px-5 pb-4 pt-10 text-[0.8rem] leading-[1.5] text-bone/80">
        <span className="pointer-events-auto">
          Afspelen laadt YouTube; Google plaatst daarbij cookies. Zie de{" "}
          <Link
            href={privacyHref}
            className="underline underline-offset-2 transition-colors duration-fast hover:text-brand"
          >
            privacyverklaring
          </Link>
          .
        </span>
      </p>
    </>
  );
}

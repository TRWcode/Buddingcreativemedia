import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlayIcon } from "@/components/ui/icons";
import { YouTubeFacade } from "./YouTubeFacade";
import type { CaseVideo as CaseVideoContent } from "@/lib/content/cases";
import type { ImageAsset } from "@/lib/content/types";

const SIZES = "(max-width: 720px) 100vw, 87.5rem";

/**
 * De bewegende oplevering van een case, in hetzelfde kader als de mozaïek
 * eronder. Drie standen, allemaal uit de content gestuurd:
 *
 * - `src` gezet: gewoon de speler.
 * - `src` gezet met `isPlaceholder`: de speler met een label erbij, zodat een
 *   voorbeeldclip nooit voor de echte oplevering doorgaat.
 * - `youtubeId` gezet: de poster met een play-knop, die YouTube pas laadt na
 *   een klik. Zie `YouTubeFacade` voor waarom dat zo moet.
 * - geen van beide: de poster met de melding dat de montage nog volgt, in
 *   plaats van een lege speler of een gat in de pagina.
 *
 * Geen autoplay en geen loop: de rest van de pagina is stil en een aftermovie
 * heeft geluid. `preload="metadata"` haalt alleen de header op, dus het kader
 * kost niets tot iemand op play drukt.
 */
export function CaseVideo({ video }: { video: CaseVideoContent }) {
  return (
    <Container
      as="section"
      aria-label="Video uit deze case"
      className="pb-[clamp(3.5rem,9vh,6rem)]"
    >
      <Reveal className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Eyebrow>{video.label}</Eyebrow>
        {video.isPlaceholder ? <PlaceholderTag /> : null}
      </Reveal>

      <Reveal>
        <figure>
          <div className="relative aspect-16/9 overflow-hidden rounded-media border border-hairline bg-surface">
            {video.src ? (
              <video
                src={video.src}
                poster={video.poster.src}
                controls
                playsInline
                preload="metadata"
                className="size-full object-cover"
              />
            ) : video.youtubeId ? (
              <YouTubeFacade
                videoId={video.youtubeId}
                poster={video.poster}
                title={video.title ?? video.label}
              />
            ) : (
              <PendingVideo poster={video.poster} />
            )}
          </div>

          <figcaption className="mt-4 max-w-[38rem] text-[0.95rem] leading-[1.6] text-muted">
            {video.caption}
            {video.isPlaceholder ? (
              <>
                {" "}
                <span className="text-bone">
                  Dit is nog een voorbeeldmontage uit de foto&apos;s van deze case; de echte video
                  komt op deze plek te staan.
                </span>
              </>
            ) : null}
          </figcaption>
        </figure>
      </Reveal>
    </Container>
  );
}

/** Klein label naast de eyebrow, zodat de stand ook zonder bijschrift duidelijk is. */
function PlaceholderTag() {
  return (
    <span className="rounded-pill border border-brand/40 bg-brand/10 px-3 py-1 text-[0.68rem] uppercase tracking-label text-brand">
      Voorbeeld
    </span>
  );
}

/**
 * Stand zonder bronbestand: de poster gedimd, met een play-knop en de melding
 * erover. Dezelfde knop als op de dienstenkaart, zodat de plek meteen als
 * videokader leest.
 */
function PendingVideo({ poster }: { poster: ImageAsset }) {
  return (
    <>
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes={SIZES}
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/50 px-6 text-center">
        <span className="flex size-[4.125rem] items-center justify-center rounded-full bg-brand/90 text-white shadow-glow">
          <PlayIcon className="size-[1.375rem]" />
        </span>
        <p className="font-display text-[clamp(1.1rem,2.4vw,1.5rem)] font-semibold uppercase tracking-title">
          Hier komt de video
        </p>
        <p className="max-w-[26rem] text-[0.95rem] leading-[1.6] text-muted">
          De montage wordt nog aangeleverd. Zodra het bestand er is, speelt hij op deze plek af.
        </p>
      </div>
    </>
  );
}

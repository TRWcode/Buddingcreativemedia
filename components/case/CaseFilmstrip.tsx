import Image from "next/image";
import type { ImageAsset } from "@/lib/content/types";

/**
 * Zoveel tegels moet één helft van de strip minstens bevatten. Bij een korte
 * case zou de rij anders smaller zijn dan het scherm en ontstaat er een gat
 * halverwege de cyclus; herhalen van de lijst voorkomt dat.
 */
const MIN_TILES = 8;

/**
 * Onder dit aantal unieke beelden komt dezelfde foto binnen één scherm terug en
 * leest de strip als een haperende loop in plaats van een overzicht. Dan is geen
 * strip beter dan een strip: de mozaïek verderop toont het werk alsnog.
 */
const MIN_UNIQUE = 4;

/**
 * Doorlopende strook beeld uit de case — een overzicht in beweging, voordat de
 * mozaïek verderop elk frame de ruimte geeft. Puur CSS, net als de woordenstrip
 * onder de hero: de rij staat twee keer in de DOM, dus `-50%` is precies één
 * cyclus. Bij hover staat hij stil.
 *
 * Decoratief: dezelfde beelden staan verderop op de pagina met hun eigen
 * alt-tekst, dus hier zou een schermlezer ze alleen dubbel voorlezen.
 */
export function CaseFilmstrip({ images }: { images: readonly ImageAsset[] }) {
  if (images.length < MIN_UNIQUE) return null;

  const repeats = Math.ceil(MIN_TILES / images.length);
  const half = Array.from({ length: repeats }, () => images).flat();

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-hairline py-[clamp(0.875rem,2vh,1.25rem)] motion-reduce:overflow-x-auto"
    >
      <div className="flex w-max animate-marquee-slow gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex gap-4">
            {half.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative aspect-16/9 w-[clamp(13rem,26vw,21rem)] shrink-0 overflow-hidden rounded-media border border-hairline"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 60vw, 21rem"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

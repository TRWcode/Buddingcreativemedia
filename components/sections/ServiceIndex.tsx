"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CameraIcon, VideoIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { serviceItemId, services, servicesIndex } from "@/lib/content/services";
import type { Service, ServiceItem } from "@/lib/content/services";

const icons = {
  camera: CameraIcon,
  video: VideoIcon,
} as const;

interface IndexEntry {
  readonly id: string;
  readonly item: ServiceItem;
  readonly service: Service;
}

/**
 * Alle diensten platgeslagen, in de volgorde waarin ze op de pagina staan.
 * Buiten het component: de content is statisch, dus dit hoeft niet bij elke
 * render — en dus bij elke muisbeweging — opnieuw te worden uitgerekend.
 */
const entries: readonly IndexEntry[] = services.flatMap((service) =>
  service.items.map((item) => ({ id: serviceItemId(item.name), item, service })),
);

/**
 * De index: alle negen diensten op één scherm, met rechts het beeld van de
 * dienst waar je overheen staat.
 *
 * Deze pagina legt negen diensten uit en dat kost lengte. Zonder overzicht
 * betekent dat scrollen tot je toevallig tegenkomt waarvoor je kwam. Hier zie je
 * de hele lijst in één blik, spring je met één tik naar de uitleg, en zie je
 * ondertussen van elke naam waar hij op uitkomt — want "campagnebeeld" zegt pas
 * iets als je het beeld erbij ziet.
 *
 * Het paneel rechts is bewust `aria-hidden`: naam en samenvatting staan ernaast
 * al in de lijst, en een schermlezer die ze twee keer voorleest maakt het
 * overzicht juist onoverzichtelijk. Onder de nav-breedte verdwijnt het paneel
 * helemaal — daar is geen muis om mee te wijzen, en zijn de negen regels zelf
 * het overzicht.
 */
export function ServiceIndex() {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? "");
  const active = entries.find((entry) => entry.id === activeId) ?? entries[0];

  return (
    <Container as="section" aria-labelledby="diensten-index" className="pb-section">
      <div className="mb-[clamp(2.25rem,5vh,3.25rem)] flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <Reveal className="mb-5">
            <Eyebrow>{servicesIndex.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal>
            <h2
              id="diensten-index"
              className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold uppercase leading-[0.95] tracking-headline"
            >
              {servicesIndex.title}
            </h2>
          </Reveal>
        </div>

        <Reveal as="p" className="max-w-[26rem] text-[1rem] leading-[1.6] text-muted">
          {servicesIndex.description}
        </Reveal>
      </div>

      <div className="grid items-start gap-[clamp(2rem,4vw,3.5rem)] nav:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
        <div className="flex flex-col gap-[clamp(2rem,4vh,3rem)]">
          {services.map((service) => {
            const Icon = icons[service.icon];

            return (
              <div key={service.id}>
                <Reveal className="mb-1">
                  {/* De kop van de groep springt naar de hoofdstukopening van
                      die discipline; de regels eronder naar een dienst. Zo kun
                      je vanaf hier zowel "laat me alles over video zien" als
                      "ik zoek specifiek een aftermovie". */}
                  <a
                    href={`#${service.id}`}
                    className="group inline-flex items-center gap-3 py-1"
                  >
                    <Icon className="size-[1.15rem] shrink-0 text-brand" />
                    <h3 className="font-display text-[1.05rem] font-semibold uppercase tracking-label transition-colors duration-fast group-hover:text-brand">
                      {service.title}
                    </h3>
                    <span className="text-[0.8rem] tabular-nums text-muted">
                      {service.items.length} diensten
                    </span>
                  </a>
                </Reveal>

                {/* De haarlijn onder de laatste regel zit op de lijst en niet
                    op de regels zelf: elke regel is het enige kind van zijn
                    `li`, dus `last:` zou daar altijd aanslaan en overal een
                    dubbele lijn opleveren. */}
                <ul className="border-b border-hairline">
                  {service.items.map((item, index) => {
                    const id = serviceItemId(item.name);
                    const isActive = id === activeId;

                    return (
                      <li key={item.name}>
                        {/* Kaal anker: SmoothScroll vangt elke href="#..." op de
                            pagina af en scrolt er met de juiste ruimte onder de
                            balk naartoe. */}
                        <a
                          href={`#${id}`}
                          onMouseEnter={() => setActiveId(id)}
                          onFocus={() => setActiveId(id)}
                          className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-hairline py-4"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "w-6 shrink-0 font-sans text-[0.78rem] font-medium tabular-nums tracking-[0.1em]",
                              "text-muted transition-colors duration-fast group-hover:text-brand",
                              isActive && "nav:text-brand",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={cn(
                              "font-display text-[clamp(1.1rem,1.6vw,1.35rem)] font-semibold uppercase tracking-title",
                              "transition-colors duration-fast group-hover:text-brand",
                              isActive && "nav:text-brand",
                            )}
                          >
                            {item.name}
                          </span>

                          {/* Onder de nav-breedte zakt de samenvatting naar een
                              eigen regel: `w-full` past niet naast de naam, dus
                              wikkelt hij, en `order-last` zet hem daarbij onder
                              de pijl in plaats van erboven. Zonder dat werd hij
                              als krimpende kolom van een centimeter of drie
                              naast de naam geperst. Vanaf de nav-breedte is er
                              ruimte en vult hij juist de regel op. */}
                          <span className="order-last w-full min-w-0 text-[0.92rem] leading-[1.5] text-muted nav:order-none nav:w-auto nav:flex-1">
                            {item.summary}
                          </span>

                          <span
                            aria-hidden
                            className="ml-auto shrink-0 leading-none text-brand transition-transform duration-base ease-interact group-hover:translate-y-1"
                          >
                            &darr;
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Blijft staan terwijl je de lijst ernaast langsgaat. */}
        <div aria-hidden className="hidden nav:block">
          <div className="sticky top-30">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-hairline bg-surface">
              {active ? (
                /* De key hangt aan het beeld zelf: React zet er dan een nieuw
                   element neer in plaats van de bron van het bestaande te
                   verwisselen, en daardoor speelt de fade bij elke wissel
                   opnieuw af. */
                <Image
                  key={active.id}
                  src={active.item.thumb.src}
                  alt={active.item.thumb.alt}
                  fill
                  sizes="(max-width: 56.25rem) 100vw, 22rem"
                  className="animate-fade-in object-cover"
                />
              ) : null}

              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink via-ink/75 to-transparent p-5 pt-14">
                <span className="text-[0.68rem] font-medium uppercase tracking-label text-brand">
                  {active?.service.title}
                </span>
                <p className="mt-2 font-display text-[1.2rem] font-semibold uppercase tracking-title">
                  {active?.item.name}
                </p>
                <p className="mt-1.5 text-[0.9rem] leading-[1.5] text-muted">
                  {active?.item.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

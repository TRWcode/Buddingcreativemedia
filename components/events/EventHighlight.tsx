import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { MediaZoom } from "@/components/ui/MediaZoom";
import { CalendarIcon, ClockIcon, PinIcon } from "@/components/ui/icons";
import {
  eventFallbackImage,
  eventSignupHref,
  eventsPage,
  formatEventDate,
} from "@/lib/content/events";
import type { EventItem } from "@/lib/content/events";

/**
 * Het event waar je je nu voor kunt aanmelden.
 *
 * Dit is het enige blok op de pagina met beeld, een knop en een accentrand. Al
 * het andere is bewust rustiger: wie hier komt, komt om te kijken of er iets
 * open staat, en dat moet je in één oogopslag zien zonder te lezen.
 */
export function EventHighlight({ event }: { event: EventItem }) {
  const facts = [
    { icon: CalendarIcon, label: "Datum", value: formatEventDate(event.date) },
    ...(event.duration
      ? [{ icon: ClockIcon, label: "Tijd", value: event.duration }]
      : []),
    { icon: PinIcon, label: "Locatie", value: event.location },
  ];

  return (
    <article className="group grid overflow-hidden rounded-panel border border-brand/30 bg-surface shadow-glow nav:grid-cols-[1.15fr_1fr]">
      <div className="order-2 p-[clamp(1.625rem,3vw,2.75rem)] nav:order-1">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-pill bg-brand px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-label text-white">
            Inschrijving open
          </span>
          <span className="text-eyebrow">{event.kind}</span>
        </div>

        <h3 className="mb-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold uppercase leading-[1.05] tracking-title">
          {event.title}
        </h3>

        <p className="mb-7 max-w-[34rem] leading-[1.65] text-muted">{event.description}</p>

        <dl className="mb-8 grid gap-x-8 gap-y-4 stack:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3">
              <fact.icon className="size-[1.125rem] shrink-0 text-brand" />
              <div>
                <dt className="text-[0.7rem] uppercase tracking-label text-muted">{fact.label}</dt>
                <dd className="text-bone">{fact.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        {/* Prijs en plekken staan los van de feiten hierboven: dat zijn de twee
            dingen waarop iemand afhaakt of doorklikt, dus die horen naast de
            knop en niet ergens in een rij iconen. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <Magnetic>
            <Button href={eventSignupHref(event.id)}>{eventsPage.signupLabel}</Button>
          </Magnetic>
          <p className="text-[0.92rem] text-muted">
            {event.price ? <span className="text-bone">{event.price}</span> : null}
            {event.price && event.spots ? " · " : null}
            {event.spots}
          </p>
        </div>
      </div>

      <MediaZoom
        image={event.image ?? eventFallbackImage}
        sizes="(max-width: 900px) 100vw, 40vw"
        className="order-1 min-h-60 nav:order-2"
      >
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-surface to-transparent to-40% nav:bg-linear-to-r"
        />
      </MediaZoom>
    </article>
  );
}

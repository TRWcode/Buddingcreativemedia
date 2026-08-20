import { MediaZoom } from "@/components/ui/MediaZoom";
import { CalendarIcon, ClockIcon, PinIcon } from "@/components/ui/icons";
import type { EventCard as EventCardData, EventDetailIcon } from "@/lib/content/events";

const icons: Record<EventDetailIcon, typeof CalendarIcon> = {
  calendar: CalendarIcon,
  clock: ClockIcon,
  pin: PinIcon,
};

/** Eventkaart met diagonale "Nieuw"-wimpel, details en beeld dat inzoomt. */
export function EventCard({ event }: { event: EventCardData }) {
  return (
    <article className="group relative grid overflow-hidden rounded-panel border border-hairline bg-surface stack:grid-cols-[1.3fr_1fr]">
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 z-2 size-30 overflow-hidden">
        <span className="absolute -right-9 top-6.5 rotate-45 bg-brand px-11 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white shadow-glow">
          {event.ribbon}
        </span>
      </div>

      <div className="p-[clamp(1.625rem,3vw,2.5rem)]">
        <h3 className="mb-4 pr-16 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold uppercase tracking-[-0.01em]">
          {event.title}
        </h3>
        <p className="mb-6.5 text-base leading-[1.6] text-muted">{event.description}</p>

        <dl className="flex flex-col gap-3.5">
          {event.details.map((detail) => {
            const Icon = icons[detail.icon];
            return (
              <div key={detail.value} className="flex items-center gap-3">
                <dt className="sr-only">{detail.icon}</dt>
                <Icon className="size-[1.125rem] shrink-0 text-brand" />
                <dd className="text-bone">{detail.value}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <MediaZoom
        image={event.image}
        sizes="(max-width: 720px) 100vw, 30vw"
        className="min-h-65"
      >
        {/* Laat het beeld in het paneel oplossen: gestapeld vanaf boven,
            naast elkaar vanaf links. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-surface to-transparent to-30% stack:bg-linear-to-r"
        />
      </MediaZoom>
    </article>
  );
}

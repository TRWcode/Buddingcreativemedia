import { eventsPage, formatEventDate } from "@/lib/content/events";
import type { EventItem } from "@/lib/content/events";

/**
 * Een aangekondigd event waarvan de inschrijving nog niet open is.
 *
 * Geen beeld en geen knop. Er valt hier nog niets te doen, en een knop die
 * niets doet leest als een fout; een kaart zonder knop leest als "later".
 */
export function EventUpcoming({ event }: { event: EventItem }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-hairline bg-surface p-6">
      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <time dateTime={event.date} className="font-medium text-bone">
          {formatEventDate(event.date)}
        </time>
        <span aria-hidden className="h-px w-4 bg-brand" />
        <span className="text-eyebrow">{event.kind}</span>
      </div>

      <h3 className="mb-3 font-display text-[1.35rem] font-semibold uppercase leading-[1.15] tracking-title">
        {event.title}
      </h3>

      <p className="mb-6 text-[0.95rem] leading-[1.6] text-muted">{event.description}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-hairline pt-4 text-[0.86rem] text-muted">
        <span>{event.location}</span>
        <span>{event.price ?? eventsPage.soonLabel}</span>
      </div>
    </article>
  );
}

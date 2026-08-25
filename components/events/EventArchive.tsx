import { formatEventDateShort } from "@/lib/content/events";
import type { EventItem } from "@/lib/content/events";

/** Hoeveel er zichtbaar blijven staan; de rest gaat achter de uitklap. */
const VISIBLE = 3;

function ArchiveRow({ event }: { event: EventItem }) {
  return (
    // Op een telefoon onder elkaar: datum, titel, soort. Naast elkaar met een
    // rechts uitgelijnde derde kolom werd het op 360px een rafelige trap, omdat
    // de titel dan toch over twee regels brak.
    <li className="border-t border-hairline py-3.5 text-[0.92rem] stack:flex stack:flex-wrap stack:items-baseline stack:gap-x-4">
      <time dateTime={event.date} className="block tabular-nums text-muted stack:w-28 stack:shrink-0">
        {formatEventDateShort(event.date)}
      </time>
      <span className="mt-0.5 block text-bone stack:mt-0">{event.title}</span>
      <span className="mt-0.5 block text-muted stack:ml-auto stack:mt-0">
        {event.kind} · {event.location}
      </span>
    </li>
  );
}

/**
 * Wat geweest is.
 *
 * Bewust het stilste blok van de pagina: geen beeld, geen knoppen, één regel
 * per event. Je kunt je er niet meer voor aanmelden, dus het enige wat het doet
 * is laten zien dát er dingen gebeuren — en dat mag niet concurreren met wat er
 * nog wél open staat.
 *
 * Alleen de laatste paar staan uitgeklapt. Groeit de lijst, dan wordt het
 * archief dus niet langer maar juist compacter ten opzichte van de rest. Het
 * uitklappen loopt via `<details>` en niet via state: dat werkt zonder
 * JavaScript en heeft de toetsenbord- en schermlezerafhandeling al ingebouwd.
 */
export function EventArchive({ events }: { events: readonly EventItem[] }) {
  if (events.length === 0) return null;

  const shown = events.slice(0, VISIBLE);
  const rest = events.slice(VISIBLE);

  return (
    <div>
      <ul>
        {shown.map((event) => (
          <ArchiveRow key={event.id} event={event} />
        ))}
      </ul>

      {rest.length > 0 ? (
        <details className="group/archive border-t border-hairline">
          <summary className="flex cursor-pointer list-none items-center gap-2 py-3.5 text-[0.92rem] text-muted transition-colors duration-fast hover:text-brand [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden
              className="text-brand transition-transform duration-base ease-interact group-open/archive:rotate-180"
            >
              &#9662;
            </span>
            <span className="group-open/archive:hidden">
              Nog {rest.length} eerdere {rest.length === 1 ? "event" : "events"}
            </span>
            <span className="hidden group-open/archive:inline">Inklappen</span>
          </summary>

          <ul>
            {rest.map((event) => (
              <ArchiveRow key={event.id} event={event} />
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

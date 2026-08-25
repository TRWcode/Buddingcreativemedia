import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { EventCard } from "./EventCard";
import {
  eventFallbackImage,
  eventsCta,
  eventsIntro,
  splitEvents,
  toEventCard,
} from "@/lib/content/events";

/**
 * De etalage op de homepage: één event, en een knop naar de agenda.
 *
 * Getoond wordt waar je je nu voor kunt aanmelden; is dat er niet, dan het
 * eerstvolgende dat is aangekondigd. Staat er helemaal niets meer op de rol,
 * dan verdwijnt de sectie in plaats van een lege kaart te tonen — een agenda
 * met niets erin zegt iets anders dan geen agenda.
 */
export function Events() {
  const { open, upcoming } = splitEvents();
  const featured = open[0] ?? upcoming[0];

  if (!featured) return null;

  return (
    <Container as="section" id="events" className="py-section">
      <div className="grid items-center gap-[clamp(2.5rem,5vw,5rem)] stack:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal className="mb-5">
            <Eyebrow>{eventsIntro.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mb-6.5 font-display text-[clamp(2.6rem,6vw,5.4rem)] font-bold uppercase leading-[0.92] tracking-headline">
              {eventsIntro.title}
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.08} className="mb-4 max-w-[25rem] text-[1.08rem] leading-[1.6] text-muted">
            {eventsIntro.description}
          </Reveal>
          <Reveal delay={0.16} className="mt-3.5">
            <Magnetic>
              <Button href={eventsCta.href}>{eventsCta.label}</Button>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal>
          <EventCard event={toEventCard(featured, eventFallbackImage)} />
        </Reveal>
      </div>
    </Container>
  );
}

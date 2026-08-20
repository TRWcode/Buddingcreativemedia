import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { EventCard } from "./EventCard";
import { eventsCta, eventsIntro, featuredEvent } from "@/lib/content/events";

export function Events() {
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
          <EventCard event={featuredEvent} />
        </Reveal>
      </div>
    </Container>
  );
}

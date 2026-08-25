import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventSignupForm } from "@/components/events/EventSignupForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { CalendarIcon, ClockIcon, PinIcon } from "@/components/ui/icons";
import {
  canSignUp,
  events,
  eventSignupHref,
  eventSignupPage,
  eventsHref,
  findEvent,
  formatEventDate,
} from "@/lib/content/events";
import { fadeIn } from "@/lib/motion";

/**
 * Alleen events waarvoor de inschrijving openstaat krijgen een aanmeldpagina.
 * De datum blijft buiten deze lijst: die verschuift met de tijd en dit draait
 * bij de build. Of het event al geweest is, controleert de pagina zelf.
 */
export function generateStaticParams() {
  return events.filter((event) => event.signupOpen).map((event) => ({ id: event.id }));
}

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = findEvent(id);
  if (!event) return {};

  return {
    title: `Aanmelden: ${event.title}`,
    description: `Meld je aan voor ${event.title} op ${formatEventDate(event.date)} in ${event.location}.`,
    alternates: { canonical: eventSignupHref(event.id) },
    // Een aanmeldformulier hoort niet in de zoekresultaten; de agenda wel.
    robots: { index: false, follow: true },
  };
}

export default async function EventSignupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = findEvent(id);

  if (!event) notFound();

  const open = canSignUp(event);

  const facts = [
    { icon: CalendarIcon, label: "Datum", value: formatEventDate(event.date) },
    ...(event.duration ? [{ icon: ClockIcon, label: "Tijd", value: event.duration }] : []),
    { icon: PinIcon, label: "Locatie", value: event.location },
  ];

  return (
    <Container id="top" className="pb-section pt-[clamp(8rem,20vh,11rem)]">
      <Reveal trigger="mount" variants={fadeIn} className="mb-7">
        <Link
          href={eventsHref}
          className="group/back -my-2 inline-flex items-center gap-2 py-2 text-[0.86rem] font-medium text-muted transition-colors duration-fast hover:text-bone"
        >
          <span
            aria-hidden
            className="text-brand transition-transform duration-base ease-interact group-hover/back:-translate-x-1"
          >
            &larr;
          </span>
          {eventSignupPage.backLabel}
        </Link>
      </Reveal>

      <header className="mb-section-sm max-w-[42rem]">
        <Reveal trigger="mount" variants={fadeIn} className="mb-6">
          <Eyebrow>{eventSignupPage.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="break-words font-display text-[clamp(1.9rem,7vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-headline">
          {event.title}
        </h1>

        <Reveal
          as="p"
          trigger="mount"
          variants={fadeIn}
          delay={0.3}
          className="mt-6 leading-[1.7] text-muted"
        >
          {event.description}
        </Reveal>
      </header>

      <div className="grid gap-x-16 gap-y-section-sm nav:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section className="min-w-0">
          {open ? (
            <>
              <h2 className="mb-8 font-display text-[clamp(1.35rem,5.5vw,1.75rem)] font-bold uppercase leading-[1.1] tracking-title">
                {eventSignupPage.formHeading}
              </h2>
              <EventSignupForm event={event} />
            </>
          ) : (
            // De route bestaat zolang `signupOpen` aanstaat, maar de datum kan
            // intussen voorbij zijn. Dan geen formulier dat nergens toe leidt.
            <div className="rounded-card border border-hairline bg-surface p-8">
              <h2 className="mb-3 font-display text-[1.5rem] font-bold uppercase leading-[1.1] tracking-title">
                {eventSignupPage.fullHeading}
              </h2>
              <p className="mb-6 leading-[1.7] text-muted">{eventSignupPage.fullBody}</p>
              <Magnetic>
                <Button href={eventsHref}>Naar de agenda</Button>
              </Magnetic>
            </div>
          )}
        </section>

        <aside className="min-w-0 space-y-section-sm">
          <section aria-labelledby="details">
            <h2
              id="details"
              className="mb-6 font-display text-[clamp(1.35rem,5.5vw,1.75rem)] font-bold uppercase leading-[1.1] tracking-title"
            >
              Het event
            </h2>

            <dl className="space-y-4 rounded-card border border-hairline bg-surface p-6">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-3">
                  <fact.icon className="size-[1.125rem] shrink-0 text-brand" />
                  <div className="min-w-0">
                    <dt className="text-[0.7rem] uppercase tracking-label text-muted">
                      {fact.label}
                    </dt>
                    <dd className="break-words text-bone">{fact.value}</dd>
                  </div>
                </div>
              ))}

              {event.price || event.spots ? (
                <div className="border-t border-hairline pt-4 text-[0.92rem] text-muted">
                  {event.price ? <span className="text-bone">{event.price}</span> : null}
                  {event.price && event.spots ? " · " : null}
                  {event.spots}
                </div>
              ) : null}
            </dl>
          </section>

          <section aria-labelledby="daarna">
            <h2
              id="daarna"
              className="mb-6 font-display text-[clamp(1.35rem,5.5vw,1.75rem)] font-bold uppercase leading-[1.1] tracking-title"
            >
              {eventSignupPage.afterHeading}
            </h2>
            <ol className="space-y-4">
              {eventSignupPage.afterSteps.map((step, index) => (
                <li key={step} className="flex gap-4 leading-[1.6] text-muted">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-mark border border-brand/30 bg-brand/12 text-[0.82rem] font-bold text-brand">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </Container>
  );
}

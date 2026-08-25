import type { Metadata } from "next";
import { EventArchive } from "@/components/events/EventArchive";
import { EventHighlight } from "@/components/events/EventHighlight";
import { EventUpcoming } from "@/components/events/EventUpcoming";
import { ContactCta } from "@/components/sections/ContactCta";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { eventNotifyHref, eventsHref, eventsPage, splitEvents } from "@/lib/content/events";
import { fadeIn } from "@/lib/motion";

export const metadata: Metadata = {
  title: eventsPage.metaTitle,
  description: eventsPage.metaDescription,
  alternates: { canonical: eventsHref },
};

/**
 * Of een event "binnenkort" of "geweest" is, hangt af van de dag waarop de
 * pagina gerenderd wordt. Bij een puur statische pagina zou dat de builddatum
 * zijn en zou een voorbije cursus tot de volgende deploy blijven staan alsof
 * hij nog komt. Een uur is ruim genoeg voor een agenda die in dagen denkt.
 */
export const revalidate = 3600;

/**
 * Kop boven een blok. Ziet eruit als een `Eyebrow` maar is een echte `h2`, want
 * dit zijn de drie ankers waarop iemand met een schermlezer door de pagina
 * springt. Vandaar de opmaak hier en niet het `Eyebrow`-component: dat rendert
 * een `div`, en die hoort niet in een kop.
 */
function BlockHeading({ id, children }: { id: string; children: string }) {
  return (
    <Reveal className="mb-7">
      <h2 id={id} className="flex items-center gap-3">
        <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
        <span className="text-eyebrow">{children}</span>
      </h2>
    </Reveal>
  );
}

export default function EventsPage() {
  const { open, announced, past } = splitEvents();

  return (
    <>
      <Container id="top" className="pb-section pt-[clamp(8rem,20vh,11rem)]">
        <header className="mb-section-sm max-w-[42rem]">
          <Reveal trigger="mount" variants={fadeIn} className="mb-6">
            <Eyebrow>{eventsPage.eyebrow}</Eyebrow>
          </Reveal>

          <h1 className="font-display text-[clamp(2.5rem,9vw,5.75rem)] font-bold uppercase leading-[0.92] tracking-headline">
            <MaskedLines
              lines={[{ text: eventsPage.heading[0] }, { text: eventsPage.heading[1], accent: true }]}
              delay={0.15}
            />
          </h1>

          <Reveal
            as="p"
            trigger="mount"
            variants={fadeIn}
            delay={0.8}
            className="mt-8 text-[1.08rem] leading-[1.7] text-muted"
          >
            {eventsPage.intro}
          </Reveal>
        </header>

        <section aria-labelledby="open" className="mb-section-sm">
          <BlockHeading id="open">{eventsPage.openHeading}</BlockHeading>

          {open.length > 0 ? (
            <div className="space-y-6">
              {open.map((event) => (
                <Reveal key={event.id}>
                  <EventHighlight event={event} />
                </Reveal>
              ))}
            </div>
          ) : (
            // Een lege agenda is geen fout, maar wel een moment om iets aan te
            // bieden: dit is precies wanneer iemand zijn naam wil achterlaten.
            <Reveal className="rounded-card border border-hairline bg-surface p-8">
              <p className="mb-6 max-w-[34rem] leading-[1.65] text-muted">
                {eventsPage.openEmpty}
              </p>
              <Magnetic>
                <Button href={eventNotifyHref}>Houd me op de hoogte</Button>
              </Magnetic>
            </Reveal>
          )}
        </section>

        {announced.length > 0 ? (
          <section aria-labelledby="binnenkort" className="mb-section-sm">
            <BlockHeading id="binnenkort">{eventsPage.upcomingHeading}</BlockHeading>

            {/* `auto-fit` in plaats van een vast aantal kolommen: er staan hier
                een tot vier kaarten en dat wisselt per seizoen. Een vaste
                indeling laat bij elk ander aantal een gat vallen. De bovengrens
                van 22rem houdt één losse kaart op kaartformaat in plaats van
                hem over de volle breedte uit te rekken. */}
            <Stagger className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),22rem))]">
              {announced.map((event) => (
                <StaggerItem key={event.id} className="h-full">
                  <EventUpcoming event={event} />
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ) : null}

        {past.length > 0 ? (
          <section aria-labelledby="geweest">
            <BlockHeading id="geweest">{eventsPage.pastHeading}</BlockHeading>

            <Reveal as="p" className="mb-6 max-w-[34rem] text-[0.95rem] leading-[1.6] text-muted">
              {eventsPage.pastIntro}
            </Reveal>

            <Reveal>
              <EventArchive events={past} />
            </Reveal>
          </section>
        ) : null}
      </Container>

      <ContactCta />
    </>
  );
}

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { clientLogos, clientsIntro } from "@/lib/content/clients";
import type { ClientLogo } from "@/lib/content/clients";

/**
 * Rustige band met klantlogo's tussen Diensten en Cases. Bewust laag in nadruk:
 * de kop van de Cases-sectie komt er direct achteraan, dus deze strook heeft
 * geen eigen display-titel maar alleen een eyebrow en één regel.
 *
 * De logo's staan op 60% dekking en trekken bij hover bij. Alleen `opacity`
 * animeert — dat is compositor-werk en houdt de rij rustig.
 */
export function Clients() {
  return (
    <section aria-label="Klanten" className="border-y border-hairline bg-ink">
      <Container className="grid items-center gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-9 py-[clamp(2.5rem,6vh,3.5rem)] nav:grid-cols-[auto_1fr]">
        <div>
          <Reveal className="mb-3.5">
            <Eyebrow>{clientsIntro.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal as="p" delay={0.06} className="max-w-[20rem] text-[0.95rem] leading-[1.5] text-muted">
            {clientsIntro.description}
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="flex flex-wrap items-center justify-center gap-x-[clamp(2.25rem,6vw,5.5rem)] gap-y-8 nav:justify-end"
        >
          {clientLogos.map((client) => (
            <StaggerItem key={client.id} as="li" className="group/logo">
              <ClientMark client={client} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

/** Het logo zelf; wordt een link zodra er in de content een `href` staat. */
function ClientMark({ client }: { client: ClientLogo }) {
  const mark = (
    <span className="flex items-center" style={{ height: client.height }}>
      <Image
        src={client.logo.src}
        alt={client.logo.alt}
        width={client.logo.width}
        height={client.logo.height}
        sizes="200px"
        className="h-full w-auto max-w-full object-contain opacity-60 transition-opacity duration-base ease-interact group-hover/logo:opacity-100"
      />
    </span>
  );

  if (!client.href) return mark;

  return (
    <a href={client.href} target="_blank" rel="noreferrer">
      {mark}
    </a>
  );
}

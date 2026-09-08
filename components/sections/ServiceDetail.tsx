import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CameraIcon, VideoIcon } from "@/components/ui/icons";
import { serviceItemId } from "@/lib/content/services";
import type { Service } from "@/lib/content/services";

const icons = {
  camera: CameraIcon,
  video: VideoIcon,
} as const;

/**
 * Eén discipline op `/diensten`: een hoofdstukopening over de volle breedte,
 * en daaronder de diensten als genummerde regels.
 *
 * De opening is beeldvullend en niet langer een kolom naast een kader. Dit is
 * de plek waar de pagina van discipline wisselt, en dat moet je zien voordat je
 * het leest — bij een fotograaf hoort dat een foto te zijn die het scherm vult,
 * niet een plaatje van 45% breed naast een alinea. Dezelfde doeken als de hero
 * op de homepage en de kop van een case, zodat het als hetzelfde huis leest.
 *
 * De diensten eronder blijven regels en worden geen kaarten. Negen kaarten met
 * elk drie zinnen worden een muur waarin alles even zwaar weegt; als opsomming
 * met een haarlijn ertussen kun je op de namen scannen en alleen doorlezen bij
 * wat je zoekt. Wat er wel bij is gekomen: de samenvatting onder de naam, zodat
 * elke regel eerst in zeven woorden zegt waar hij over gaat, en een beeld dat
 * groot genoeg is om iets te bewijzen.
 *
 * Er staat geen play-knop over de opening, ook niet bij video. Dit is een
 * stilstaande foto, en een play-knop die niets afspeelt is een belofte die de
 * pagina niet waarmaakt.
 */
export function ServiceDetail({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const Icon = icons[service.icon];
  const chapter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section id={service.id} aria-labelledby={`${service.id}-titel`}>
      {/* `hero-legible` doet hier één ding: het kleurt de eyebrow wit. Grijs op
          een foto valt weg, en de kop eronder heeft aan het doek genoeg. */}
      <div className="hero-legible relative isolate flex min-h-[clamp(20rem,52vh,31rem)] flex-col justify-end overflow-hidden border-y border-hairline">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="100vw"
          quality={82}
          className="-z-10 object-cover"
          style={
            service.image.objectPosition
              ? { objectPosition: service.image.objectPosition }
              : undefined
          }
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--case-overlay)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--hero-veil)]"
        />

        <Container className="py-[clamp(2.5rem,6vh,4rem)] pt-[clamp(5rem,14vh,8rem)]">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-9">
            <div>
              <Reveal className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                <IconBadge>
                  <Icon className="size-[1.625rem]" />
                </IconBadge>
                <Eyebrow>{`Discipline ${chapter} · ${service.items.length} diensten`}</Eyebrow>
              </Reveal>

              <h2
                id={`${service.id}-titel`}
                className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold uppercase leading-[0.92] tracking-headline"
              >
                <MaskedLines trigger="scroll" delay={0} lines={[{ text: service.title }]} />
              </h2>

              {/* Lichter dan het gebruikelijke grijs: deze alinea staat op een
                  foto en niet op de paginakleur. */}
              <Reveal
                as="p"
                delay={0.12}
                className="mt-7 max-w-[38rem] text-[1.08rem] leading-[1.7] text-bone/85"
              >
                {service.lead}
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <Magnetic>
                <Button href={service.link.href} variant="ghost">
                  {service.link.label}
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </Container>
      </div>

      <Container className="py-[clamp(3.5rem,9vh,5.5rem)]">
        {/* De laatste regel krijgt ook een haarlijn onder zich, zodat de lijst
            als blok wordt afgesloten in plaats van in het niets op te houden. */}
        <Stagger as="ul" className="border-b border-hairline">
          {service.items.map((item, itemIndex) => (
            /* Drie kolommen op de nav-breedte: naam, tekst, beeld. Het beeld
               staat rechts omdat daar de ruimte al was — de tekstkolom loopt
               niet door tot de rand, dus zonder beeld eindigde elke regel in
               een leeg blok van een paar honderd pixels.

               Eronder valt alles onder elkaar, maar niet in dezelfde volgorde:
               daar komt het beeld tussen de naam en de uitleg te staan. Je weet
               dan al welke dienst het is, ziet meteen hoe die eruitziet, en
               leest de drie zinnen alleen als het beeld je iets zei — precies de
               volgorde waarin iemand een fotograaf beoordeelt. */
            <StaggerItem
              key={item.name}
              as="li"
              className="group grid items-start gap-x-[clamp(1.75rem,3.5vw,3rem)] gap-y-6 border-t border-hairline py-[clamp(2rem,4vw,3rem)] nav:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_clamp(15rem,22vw,22rem)]"
            >
              {/* Het anker zit op deze kolom en niet op de regel zelf: de index
                  bovenaan de pagina springt hiernaartoe, en dan hoort de naam
                  boven aan het scherm te staan. */}
              <div id={serviceItemId(item.name)}>
                {/* Een omlijnd cijfer in plaats van een gevuld: het geeft de
                    regel het formaat van een hoofdstuknummer zonder de naam
                    ernaast te beconcurreren. `-webkit-text-stroke` staat hier
                    inline omdat de eigenschap met een streepje begint, en
                    Tailwind dat in een klassenaam als een negatieve waarde
                    leest. */}
                <span
                  aria-hidden
                  style={{
                    WebkitTextStroke: "1px var(--color-hairline-loud)",
                    color: "transparent",
                  }}
                  className="block font-display text-[clamp(2.5rem,4vw,3.25rem)] font-bold leading-none tabular-nums"
                >
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>

                {/* `break-words` is het vangnet voor een lange naam: die breekt
                    dan af in plaats van de kolom ernaast in te lopen. */}
                <h3 className="mt-3.5 break-words font-display text-[clamp(1.3rem,2vw,1.6rem)] font-semibold uppercase tracking-title">
                  {item.name}
                </h3>

                <p className="mt-2.5 text-[0.95rem] leading-[1.5] text-muted">{item.summary}</p>
              </div>

              <div className="order-3 nav:order-none">
                <p className="max-w-[40rem] text-[1.02rem] leading-[1.7] text-muted">{item.body}</p>

                <p className="mt-7 text-[0.7rem] font-medium uppercase tracking-label text-muted">
                  Denk aan
                </p>
                {/* Losse pillen in plaats van een rij woorden met puntjes
                    ertussen: zo zijn het drie dingen die je kunt aanwijzen in
                    plaats van een grijze regel die je overslaat. */}
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.examples.map((example) => (
                    <li
                      key={example}
                      className="rounded-pill border border-hairline-strong px-3.5 py-1.5 text-[0.82rem] text-bone/85"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-2 overflow-hidden rounded-media border border-hairline bg-surface nav:order-none">
                <Image
                  src={item.thumb.src}
                  alt={item.thumb.alt}
                  width={item.thumb.width}
                  height={item.thumb.height}
                  sizes="(max-width: 56.25rem) 100vw, 22rem"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-zoom ease-interact group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 nav:aspect-[4/3]"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

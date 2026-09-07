import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { CameraIcon, VideoIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/content/services";

const icons = {
  camera: CameraIcon,
  video: VideoIcon,
} as const;

/**
 * Eén discipline op `/diensten`: een kop met beeld, en daaronder de diensten
 * als genummerde regels.
 *
 * Bewust regels en geen kaarten. Negen kaarten met elk drie zinnen erin worden
 * een muur waarin alles even zwaar weegt; als opsomming met een haarlijn ertussen
 * kun je op de namen scannen en alleen doorlezen bij wat je zoekt. Het genummerde
 * rijtje is bovendien al de taal van deze site — het mobiele menu en de
 * werkwijze-stappen doen hetzelfde.
 *
 * Op de detailpagina staat er geen play-knop over het beeld, ook niet bij video.
 * Hier is het een stilstaande foto, en een play-knop die niets afspeelt is een
 * belofte die de pagina niet waarmaakt.
 */
export function ServiceDetail({ service, withDivider }: { service: Service; withDivider: boolean }) {
  const Icon = icons[service.icon];

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-titel`}
      className={cn("py-section", withDivider && "border-t border-hairline")}
    >
      <Container>
        <div className="grid items-center gap-[clamp(2.5rem,6vw,4.5rem)] nav:grid-cols-2">
          <div>
            <Reveal className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-3">
              <IconBadge>
                <Icon className="size-[1.625rem]" />
              </IconBadge>
              <h2
                id={`${service.id}-titel`}
                className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold uppercase leading-[0.95] tracking-headline"
              >
                {service.title}
              </h2>
            </Reveal>

            <Reveal as="p" delay={0.08} className="max-w-[34rem] text-[1.08rem] leading-[1.7] text-muted">
              {service.lead}
            </Reveal>

            <Reveal delay={0.16} className="mt-9">
              <Magnetic>
                <Button href={service.link.href} variant="ghost">
                  {service.link.label}
                </Button>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal className="overflow-hidden rounded-card border border-hairline bg-surface">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              width={service.image.width}
              height={service.image.height}
              sizes="(max-width: 56.25rem) 100vw, 45vw"
              className="aspect-[4/3] w-full object-cover"
              style={
                service.image.objectPosition
                  ? { objectPosition: service.image.objectPosition }
                  : undefined
              }
            />
          </Reveal>
        </div>

        {/* De laatste regel krijgt ook een haarlijn onder zich, zodat de lijst
            als blok wordt afgesloten in plaats van in het niets op te houden. */}
        <Stagger as="ul" className="mt-[clamp(3rem,7vh,4.5rem)] border-b border-hairline">
          {service.items.map((item, index) => (
            /* Drie kolommen op de nav-breedte: naam, tekst, beeld. Het beeld
               staat rechts omdat daar de ruimte al was — de tekstkolom loopt
               niet door tot de rand, dus zonder beeld eindigde elke regel in
               een leeg blok van een paar honderd pixels. Eronder valt alles
               onder elkaar en komt het beeld als laatste, want daar is het de
               bevestiging van wat je net gelezen hebt en niet de aankondiging. */
            <StaggerItem
              key={item.name}
              as="li"
              className="grid items-start gap-x-[clamp(1.75rem,3.5vw,3rem)] gap-y-5 border-t border-hairline py-[clamp(1.75rem,3vw,2.5rem)] nav:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_clamp(11rem,15vw,16rem)]"
            >
              {/* Het nummer staat boven de naam en niet ernaast. "Bedrijfs-
                  reportage" is zeventien tekens in een display-letter die niet
                  kan afbreken; naast een nummer plus tussenruimte blijft er van
                  deze kolom te weinig over en loopt de kop de tekst ernaast in.
                  `break-words` is het vangnet als een naam ooit toch langer
                  wordt: dan breekt hij lelijk af in plaats van eroverheen te
                  lopen. */}
              <div>
                <span
                  aria-hidden
                  className="block font-sans text-[0.8rem] font-medium tabular-nums tracking-[0.1em] text-brand"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2.5 break-words font-display text-[clamp(1.25rem,1.85vw,1.5rem)] font-semibold uppercase tracking-title">
                  {item.name}
                </h3>
              </div>

              <div>
                <p className="max-w-[40rem] text-[1rem] leading-[1.65] text-muted">{item.body}</p>
                <p className="mt-4 text-[0.88rem] leading-[1.6] text-muted">
                  <span className="text-bone/70">Denk aan </span>
                  {item.examples.join(" · ")}
                </p>
              </div>

              <div className="group/beeld overflow-hidden rounded-media border border-hairline bg-surface">
                <Image
                  src={item.thumb.src}
                  alt={item.thumb.alt}
                  width={item.thumb.width}
                  height={item.thumb.height}
                  sizes="(max-width: 56.25rem) 100vw, 16rem"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-zoom ease-interact group-hover/beeld:scale-105 motion-reduce:transition-none motion-reduce:group-hover/beeld:scale-100"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

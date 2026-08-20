import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { caseSpotlight } from "@/lib/content/cases";

/**
 * Uitgelichte case: een scheve polaroid die bij hover rechttrekt, naast het
 * verhaal. De rotatie zit op de wrapper zodat het beeld zelf scherp blijft.
 */
export function CaseSpotlight() {
  const spotlight = caseSpotlight;

  return (
    <div className="mb-[clamp(3.5rem,8vh,5.625rem)] grid items-center gap-[clamp(1.75rem,5vw,4.5rem)] stack:grid-cols-2">
      <Reveal className="flex justify-center">
        <figure className="w-full max-w-[26.25rem] -rotate-5 rounded-[4px] bg-bone p-4 pb-[3.875rem] shadow-lift transition-transform duration-slow ease-interact hover:-rotate-1 hover:scale-103 motion-reduce:transition-none">
          <div className="overflow-hidden bg-ink">
            <Image
              src={spotlight.image.src}
              alt={spotlight.image.alt}
              width={spotlight.image.width}
              height={spotlight.image.height}
              sizes="(max-width: 720px) 90vw, 420px"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-[1.375rem] text-center font-display text-[1.25rem] font-medium tracking-title text-ink">
            {spotlight.caption}
          </figcaption>
        </figure>
      </Reveal>

      <div>
        <Reveal>
          <span className="mb-5 inline-flex items-center gap-2 text-[0.74rem] font-bold uppercase tracking-label text-brand">
            <span aria-hidden>&#9679;</span>
            {spotlight.badge}
          </span>
        </Reveal>

        <Reveal as="div" delay={0.08}>
          <h3 className="mb-[1.375rem] font-display text-[clamp(1.9rem,3.4vw,3rem)] font-semibold uppercase leading-none tracking-title">
            {spotlight.title}
          </h3>
          <p className="mb-7 max-w-[29rem] text-[1.08rem] leading-[1.6] text-muted">
            {spotlight.description}
          </p>
          <div className="mb-[1.875rem] flex flex-wrap gap-2.5">
            {spotlight.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <Link
            href={spotlight.link.href}
            className="inline-flex items-center gap-2 font-bold text-bone transition-colors duration-fast hover:text-brand"
          >
            {spotlight.link.label}
            <span aria-hidden className="leading-none text-brand">
              &rarr;
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

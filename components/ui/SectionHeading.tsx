import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Kop-niveau; standaard h2 omdat de hero de h1 bezet. */
  as?: "h2" | "h3";
  className?: string;
}

/**
 * Terugkerende sectiekop: eyebrow, display-titel en optionele intro rechts.
 * Elk onderdeel reveal't los zodat de opbouw gelaagd aanvoelt.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-section-sm flex flex-wrap items-end justify-between gap-8",
        className,
      )}
    >
      <div>
        <Reveal className="mb-5">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal>
          <Tag className="font-display text-[clamp(2.6rem,6vw,5.4rem)] font-bold uppercase leading-[0.92] tracking-headline">
            {title}
          </Tag>
        </Reveal>
      </div>
      {description ? (
        <Reveal as="p" className="max-w-[26rem] text-[1.1rem] leading-[1.55] text-muted">
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  portfolioActiveCategories,
  portfolioByCategory,
  portfolioCounts,
  type PortfolioCategory,
  type PortfolioItem,
  type PortfolioMedium,
} from "@/lib/content/portfolio";

const MEDIA: readonly { readonly id: PortfolioMedium; readonly label: string }[] = [
  { id: "fotografie", label: "Fotografie" },
  { id: "videografie", label: "Videografie" },
];

/**
 * Het beeld vult zijn kolom en houdt zijn eigen verhouding. Een vaste uitsnede
 * zou hier tegen het werk in werken: een staand portret en een drone-panorama
 * horen niet in hetzelfde kader geperst te worden. Zie ook de mozaïek op een
 * casepagina, die om dezelfde reden `full` op de eigen ratio laat staan.
 */
function PortfolioTile({ item, priority }: { item: PortfolioItem; priority: boolean }) {
  return (
    <figure
      className={cn(
        "group relative mb-[clamp(0.875rem,2vw,1.375rem)] block break-inside-avoid",
        "overflow-hidden rounded-media border border-hairline bg-surface",
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        priority={priority}
        sizes="(max-width: 45rem) 100vw, (max-width: 75rem) 50vw, 30rem"
        className="w-full transition-transform duration-zoom ease-interact group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {item.shoot ? (
        <figcaption
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-5",
            "bg-linear-to-t from-ink/85 to-transparent",
            "opacity-0 transition-opacity duration-base ease-interact",
            "group-hover:opacity-100 group-focus-within:opacity-100",
            "motion-reduce:transition-none",
          )}
        >
          <span className="font-display text-[0.95rem] font-medium tracking-title text-bone">
            {item.shoot}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Het portfolio met zijn twee filterlagen: eerst het medium, daarbinnen de
 * categorie. Beide staan in de URL noch in de router, want een filter is hier
 * een blik op dezelfde pagina en geen eigen bestemming; terug in de browser
 * hoort naar de vorige pagina te gaan, niet naar het vorige filter.
 *
 * Alleen categorieen met werk komen in beeld. Een filter dat op nul uitkomt is
 * een dood einde, en welke dat zijn verschilt zodra er beeld bij komt.
 */
export function PortfolioGrid() {
  const [medium, setMedium] = useState<PortfolioMedium>("fotografie");
  const [category, setCategory] = useState<PortfolioCategory | undefined>(undefined);

  const categories = useMemo(() => portfolioActiveCategories(medium), [medium]);
  const counts = useMemo(() => portfolioCounts(medium), [medium]);
  const items = useMemo(() => portfolioByCategory(medium, category), [medium, category]);

  function pickMedium(next: PortfolioMedium) {
    setMedium(next);
    // Het categoriefilter hoort bij het vorige medium; die kan hier leeg zijn.
    setCategory(undefined);
  }

  return (
    <>
      <div role="group" aria-label="Discipline" className="flex flex-wrap justify-center gap-3">
        {MEDIA.map((option) => {
          const active = option.id === medium;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => pickMedium(option.id)}
              className={cn(
                "rounded-pill px-8 py-3.5 font-display text-[1.05rem] font-semibold tracking-title",
                "transition-colors duration-base ease-interact",
                active
                  ? "bg-brand text-white shadow-glow"
                  : "text-muted hover:text-bone focus-visible:text-bone",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {categories.length > 0 ? (
        <div
          role="group"
          aria-label="Categorie"
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3.5"
        >
          <FilterButton active={category === undefined} onClick={() => setCategory(undefined)}>
            All
          </FilterButton>
          {categories.map((option) => (
            <FilterButton
              key={option.id}
              active={category === option.id}
              onClick={() => setCategory(option.id)}
            >
              {option.label}
              <span className="ml-1.5 text-[0.72em] align-super tabular-nums opacity-60">
                {counts[option.id]}
              </span>
            </FilterButton>
          ))}
        </div>
      ) : null}

      {items.length > 0 ? (
        /* De key laat de kolommen opnieuw opbouwen bij een filterwissel, zodat
           de beelden invaden in plaats van te verspringen. */
        <div
          key={`${medium}-${category ?? "all"}`}
          className="mt-[clamp(2.5rem,6vh,4rem)] animate-fade-in columns-1 gap-[clamp(0.875rem,2vw,1.375rem)] stack:columns-2 nav:columns-3"
        >
          {items.map((item, index) => (
            <PortfolioTile key={item.id} item={item} priority={index < 3} />
          ))}
        </div>
      ) : (
        <EmptyState medium={medium} />
      )}
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        // py met negatieve marge: het tikdoel wordt ruim 40px hoog terwijl de rij
        // even hoog blijft. Op een telefoon was dit 25px en dus lastig te raken.
        "-mx-2 -my-2.5 px-2 py-2.5 text-[0.95rem] font-medium transition-colors duration-fast ease-interact",
        active ? "text-brand" : "text-muted hover:text-bone focus-visible:text-bone",
      )}
    >
      {children}
    </button>
  );
}

/** Alleen bereikbaar via Videografie, zolang daar nog geen werk onder staat. */
function EmptyState({ medium }: { medium: PortfolioMedium }) {
  return (
    <p className="mx-auto mt-[clamp(3rem,8vh,5rem)] max-w-[30rem] text-center text-[1.02rem] leading-[1.65] text-muted">
      {medium === "videografie"
        ? "De videoselectie staat nog niet online. Bekijk in de tussentijd de aftermovies en reels bij de cases."
        : "Er staat nog geen werk in deze categorie."}
    </p>
  );
}

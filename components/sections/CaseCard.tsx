import Link from "next/link";
import { MediaZoom } from "@/components/ui/MediaZoom";
import type { CaseCard as CaseCardData } from "@/lib/content/cases";

/** Casekaart: beeld met zoom, een label dat bij hover invalt, en de metadata. */
export function CaseCard({ item }: { item: CaseCardData }) {
  return (
    <article className="group">
      <Link href={item.href} className="block">
        <MediaZoom
          image={item.image}
          sizes="(max-width: 720px) 100vw, 33vw"
          className="aspect-4/3 rounded-media border border-hairline"
        >
          <span className="pointer-events-none absolute left-4 top-4 -translate-y-2 rounded-pill bg-brand px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white opacity-0 transition-[opacity,transform] duration-base ease-interact group-hover:translate-y-0 group-hover:opacity-100">
            Bekijk &rarr;
          </span>
        </MediaZoom>

        <div className="px-1 pt-5">
          <h3 className="font-display text-[1.35rem] font-semibold uppercase tracking-[-0.01em] transition-colors duration-fast group-hover:text-brand">
            {item.title}
          </h3>
          <p className="mt-1.5 text-muted">{item.client}</p>
          <div className="mt-3.5 flex items-center justify-between border-t border-hairline pt-3.5 text-[0.86rem] text-muted">
            <span>{item.disciplines}</span>
            <span>{item.year}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

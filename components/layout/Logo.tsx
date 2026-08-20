import Link from "next/link";
import { site } from "@/lib/content/site";

/** Merk-lockup: rood vierkant monogram naast de tweeregelige naam. */
export function Logo() {
  const [firstLine, secondLine] = site.nameLines;

  return (
    <Link href="#top" className="flex items-center gap-3" aria-label={`${site.name} — naar boven`}>
      <span
        aria-hidden
        className="flex size-[2.375rem] shrink-0 items-center justify-center rounded-mark bg-brand font-display text-[1.35rem] font-bold leading-none text-white"
      >
        {site.monogram}
      </span>
      <span className="whitespace-nowrap font-display text-[0.82rem] font-semibold uppercase leading-[1.05] tracking-[0.14em]">
        {firstLine}
        <br />
        <span className="text-muted">{secondLine}</span>
      </span>
    </Link>
  );
}

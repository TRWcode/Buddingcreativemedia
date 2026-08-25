import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedLines } from "@/components/ui/MaskedLines";
import { Reveal } from "@/components/ui/Reveal";
import { fadeIn } from "@/lib/motion";
import type { LegalArticle, LegalBlock, LegalDocument } from "@/lib/content/legal";

const dutchDate = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Inspringing van de tekst van een lid: de breedte van het nummer plus de gap. */
const CLAUSE_INDENT = "pl-13 nav:pl-[3.75rem]";

function Blocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  // Heeft een artikel genummerde leden, dan springt de tekst daarvan in. Een
  // opsomming of een afsluitende zin hoort dan onder diezelfde tekstkolom te
  // beginnen en niet tegen de nummers aan. Artikel 1 heeft geen nummers, dus
  // daar zou dezelfde inspringing juist een lege geul opleveren.
  const indent = blocks.some((block) => block.kind === "clause") ? CLAUSE_INDENT : "";

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const key = block.kind === "clause" ? block.number : `${block.kind}-${index}`;

        switch (block.kind) {
          case "clause":
            return (
              <p key={key} className="flex gap-3 leading-[1.75] text-muted nav:gap-4">
                <span className="w-10 shrink-0 font-medium tabular-nums text-bone nav:w-11">
                  {block.number}
                </span>
                <span className="min-w-0 break-words">{block.text}</span>
              </p>
            );

          case "text":
            return (
              <p key={key} className={`break-words leading-[1.75] text-muted ${indent}`}>
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={key} className={`space-y-2 break-words leading-[1.75] text-muted ${indent}`}>
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-6 before:absolute before:left-0 before:top-[0.82em] before:h-px before:w-3 before:bg-brand"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "definitions":
            return (
              <dl key={key} className={`space-y-3 break-words leading-[1.75] text-muted ${indent}`}>
                {block.items.map((item) => (
                  <div key={item.term}>
                    <dt className="inline font-medium text-bone">{item.term}: </dt>
                    <dd className="inline">{item.text}</dd>
                  </div>
                ))}
              </dl>
            );
        }
      })}
    </div>
  );
}

function Article({ article }: { article: LegalArticle }) {
  return (
    <section id={article.id} className="scroll-mt-28 border-t border-hairline pt-9">
      {/* Juridisch Nederlands zit vol lange samenstellingen. Op 28px liep
          "Aansprakelijkheid" 32px buiten de kolom op een scherm van 320px, en
          een kop breekt niet uit zichzelf af. Vandaar dat de maat meeschaalt en
          `break-words` als vangnet meeloopt. */}
      <h2 className="mb-6 break-words font-display text-[clamp(1.35rem,5.5vw,1.75rem)] font-bold uppercase leading-[1.1] tracking-title">
        <span className="mb-3 block text-eyebrow text-brand">Artikel {article.number}</span>
        {article.title}
      </h2>
      <Blocks blocks={article.blocks} />
    </section>
  );
}

/**
 * De opmaak voor een juridisch document. Beide pagina's delen hem, zodat de
 * algemene voorwaarden en de privacyverklaring niet uit elkaar gaan lopen.
 *
 * De artikelen zelf animeren bewust niet. Overal elders op de site komt inhoud
 * scroll-getriggerd in beeld, maar dit is een tekst die je leest en waarin je
 * terugzoekt; zeventien blokken die stuk voor stuk moeten opkomen zitten dat
 * in de weg. Alleen de kop bovenaan doet mee met de rest van de site.
 */
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    // In print valt de vaste header weg, en daarmee ook de reden voor de ruimte
    // die eronder was vrijgehouden.
    <Container as="article" id="top" className="pb-section pt-[clamp(8rem,20vh,11rem)] print:pt-0">
      <header className="mb-section-sm max-w-[46rem]">
        <Reveal trigger="mount" variants={fadeIn} className="mb-6">
          <Eyebrow>{doc.eyebrow}</Eyebrow>
        </Reveal>

        {/* De regels zitten in een masker met `overflow: hidden` en kunnen dus
            niet afbreken; wat niet past wordt afgekapt. "voorwaarden" liep op
            320px 37px buiten het kader, vandaar de lagere ondergrens. */}
        <h1 className="font-display text-[clamp(1.9rem,8.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-headline">
          <MaskedLines
            lines={[{ text: doc.heading[0] }, { text: doc.heading[1], accent: true }]}
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
          {doc.intro}
        </Reveal>
      </header>

      <div className="grid gap-x-16 gap-y-12 nav:grid-cols-[15rem_minmax(0,1fr)] print:block">
        {/* Alleen op breedte, waar de kolom naast de tekst past. Op mobiel zou
            een inhoudsopgave van zeventien regels de tekst wegduwen die de
            bezoeker kwam lezen. */}
        <aside className="max-nav:hidden print:hidden">
          <nav
            aria-label="Inhoudsopgave"
            data-lenis-prevent
            className="sticky top-28 max-h-[calc(100svh-9rem)] overflow-y-auto"
          >
            <p className="mb-5 text-[0.74rem] uppercase tracking-label text-muted">Inhoud</p>
            <ol className="space-y-2.5 text-[0.88rem] leading-[1.4]">
              {doc.articles.map((article) => (
                <li key={article.id}>
                  <a
                    href={`#${article.id}`}
                    className="flex gap-3 text-muted transition-colors duration-fast hover:text-brand"
                  >
                    <span className="w-5 shrink-0 tabular-nums">{article.number}</span>
                    <span>{article.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 max-w-[46rem] space-y-11">
          {doc.articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}

          <p className="border-t border-hairline pt-9 text-[0.9rem] text-muted">
            Laatst bijgewerkt op{" "}
            <time dateTime={doc.updated}>{dutchDate.format(new Date(doc.updated))}</time>.
          </p>
        </div>
      </div>
    </Container>
  );
}

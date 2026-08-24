import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseFilmstrip } from "@/components/case/CaseFilmstrip";
import { CaseGallery } from "@/components/case/CaseGallery";
import { CaseHero } from "@/components/case/CaseHero";
import { CaseMeta } from "@/components/case/CaseMeta";
import { CaseNext } from "@/components/case/CaseNext";
import { CaseStory } from "@/components/case/CaseStory";
import { CaseVideo } from "@/components/case/CaseVideo";
import { ContactCta } from "@/components/sections/ContactCta";
import { caseHref, caseStudies, findCaseStudy, nextCaseStudy } from "@/lib/content/cases";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

/** Alle cases staan in de content, dus ze worden alle vier vooraf gebouwd. */
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

/** Een slug die hier niet bij staat bestaat niet — geen render on-demand. */
export const dynamicParams = false;

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) return {};

  const url = caseHref(study.slug);
  const title = `${study.title} · ${study.client}`;
  const images = [
    {
      url: study.hero.src,
      width: study.hero.width,
      height: study.hero.height,
      alt: study.hero.alt,
    },
  ];

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: study.summary, images },
    twitter: { card: "summary_large_image", title, description: study.summary, images: [study.hero.src] },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <CaseHero study={study} />
      <CaseMeta study={study} />
      <CaseFilmstrip images={[study.hero, ...study.gallery]} />
      <CaseStory study={study} />
      {study.video ? <CaseVideo video={study.video} /> : null}
      <CaseGallery images={study.gallery} />
      <CaseNext study={nextCaseStudy(study.slug)} />
      <ContactCta />
    </>
  );
}

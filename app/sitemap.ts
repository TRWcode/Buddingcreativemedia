import type { MetadataRoute } from "next";
import { caseHref, caseStudies } from "@/lib/content/cases";
import { privacy } from "@/lib/content/privacy";
import {
  contactHref,
  eventsHref,
  portfolioHref,
  privacyHref,
  site,
  termsHref,
} from "@/lib/content/site";
import { terms } from "@/lib/content/terms";

/**
 * De sitemap wordt uit dezelfde constanten opgebouwd als de navigatie, zodat
 * een route die verhuist niet stilletjes uit de sitemap verdwijnt en er nooit
 * een adres in staat dat niet meer bestaat.
 *
 * De juridische pagina's dragen de datum uit hun eigen document; die verandert
 * alleen als de tekst verandert, en dat is precies wanneer een crawler opnieuw
 * moet kijken. De rest krijgt de builddatum.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  return [
    { url: url("/"), lastModified: built, changeFrequency: "monthly", priority: 1 },
    { url: url(portfolioHref), lastModified: built, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/cases"), lastModified: built, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((study) => ({
      url: url(caseHref(study.slug)),
      lastModified: built,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    // De agenda verandert vaker dan de rest, en wat er staat is tijdgebonden.
    { url: url(eventsHref), lastModified: built, changeFrequency: "weekly", priority: 0.8 },
    { url: url(contactHref), lastModified: built, changeFrequency: "yearly", priority: 0.9 },
    {
      url: url(termsHref),
      lastModified: new Date(terms.updated),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: url(privacyHref),
      lastModified: new Date(privacy.updated),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

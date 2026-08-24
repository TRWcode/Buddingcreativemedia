import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

/**
 * Alles mag geïndexeerd worden; er is niets op deze site dat verborgen hoort te
 * blijven. De verwijzing naar de sitemap is het enige wat hier echt werk doet.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}

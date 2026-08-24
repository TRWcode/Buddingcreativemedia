import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { ContactCta } from "@/components/sections/ContactCta";
import { terms } from "@/lib/content/terms";
import { termsHref } from "@/lib/content/site";

export const metadata: Metadata = {
  title: terms.metaTitle,
  description: terms.metaDescription,
  alternates: { canonical: termsHref },
};

export default function TermsPage() {
  return (
    <>
      <LegalPage doc={terms} />
      <ContactCta />
    </>
  );
}

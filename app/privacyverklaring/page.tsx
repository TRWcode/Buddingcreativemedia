import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { ContactCta } from "@/components/sections/ContactCta";
import { privacy } from "@/lib/content/privacy";
import { privacyHref } from "@/lib/content/site";

export const metadata: Metadata = {
  title: privacy.metaTitle,
  description: privacy.metaDescription,
  alternates: { canonical: privacyHref },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalPage doc={privacy} />
      <ContactCta />
    </>
  );
}

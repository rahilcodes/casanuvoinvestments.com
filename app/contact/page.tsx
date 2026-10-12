import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactView } from "@/components/contact/ContactView";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Casa Nuvo Investments. Call ${SITE.phoneUS} or ${SITE.phoneGY}, email ${SITE.email}, or visit us in Subryanville, Georgetown.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Suspense>
      <ContactView />
    </Suspense>
  );
}

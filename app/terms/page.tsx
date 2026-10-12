import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `The terms that govern use of the ${SITE.name} website and services.`,
  alternates: { canonical: "/terms" },
};

// Text from the original site, with its unfilled "[Your Company Name]" / jurisdiction placeholders completed.
const TERMS = [
  {
    title: "User Agreement",
    text: "By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from using our services.",
  },
  {
    title: "Service Availability",
    text: "We strive to provide accurate and up-to-date information about our properties and services. However, we do not guarantee the availability, accuracy, or completeness of the content provided, and reserve the right to modify or discontinue services at any time without prior notice.",
  },
  {
    title: "Intellectual Property Rights",
    text: `All content, including but not limited to text, images, logos, and graphics, is the intellectual property of ${SITE.name} or third parties. Unauthorized use or reproduction of any content is strictly prohibited and may result in legal action.`,
  },
  {
    title: "User Responsibilities",
    text: "Users are responsible for maintaining the confidentiality of any account information they use with our services. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.",
  },
  {
    title: "Limitation of Liability",
    text: `${SITE.name} and its affiliates are not liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use our services, or for any content obtained through our website.`,
  },
  {
    title: "Privacy",
    text: "We respect your privacy and are committed to protecting your personal information. Details you share through our forms are used only to respond to your enquiry and are never sold or shared with unrelated third parties.",
  },
  {
    title: "Amendments to Terms",
    text: "We reserve the right to update or revise these Terms and Conditions at any time without prior notice. Your continued use of our website following any changes constitutes acceptance of the new terms.",
  },
  {
    title: "Governing Law",
    text: "These Terms and Conditions are governed by the laws of the Co-operative Republic of Guyana, and any disputes arising from these terms will be resolved in the appropriate courts of Guyana.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        crumbs={[{ label: "Terms and Conditions" }]}
        title={
          <>
            Terms <em className="text-gold-bright italic">&amp;</em> Conditions
          </>
        }
        intro="Our Terms and Conditions govern the use of our website and services. By accessing our site, you acknowledge and accept these terms, which are designed to ensure a safe and productive experience for all users."
      />
      <section className="bg-paper py-20 md:py-28">
        <div className="wrap-narrow">
          <ol className="grid gap-px border-y border-ink/10 bg-ink/10">
            {TERMS.map((t, i) => (
              <li key={t.title} className="grid gap-4 bg-paper py-9 sm:grid-cols-[80px_1fr]">
                <span className="text-[15px] font-semibold text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-[1.4rem] leading-tight font-semibold tracking-[-0.025em] text-ink">{t.title}</h2>
                  <p className="mt-3 text-[16.5px] leading-[1.85] text-stone">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-[16px] leading-relaxed text-stone">
            For any questions or clarifications regarding these Terms and Conditions, please{" "}
            <Link href="/contact" className="text-gold-deep underline underline-offset-4">
              reach out to us directly
            </Link>
            . Your understanding and compliance with these terms are essential to maintaining a positive experience for all users of our services.
          </p>
        </div>
      </section>
    </>
  );
}

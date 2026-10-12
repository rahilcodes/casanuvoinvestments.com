import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ADDRESS_LINE, COMMERCIAL_INTENTS, LOCATIONS, SECTORS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Casa Nuvo Investments. Call ${SITE.phoneUS} or ${SITE.phoneGY}, email ${SITE.email}, or visit us in Subryanville, Georgetown.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const selling = sp.topic === "sell";
  const commercial = sp.topic === "commercial";
  const address = typeof sp.address === "string" ? sp.address.slice(0, 200) : "";
  const defaultMessage = selling
    ? `I’d like a valuation for my property${address ? ` at ${address}` : ""}.`
    : commercial
      ? commercialMessage(sp.sector, sp.intent, sp.location)
      : "";
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;
  const lines: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: "whatsapp", label: "Call or WhatsApp · Guyana", value: SITE.phoneGY, href: SITE.whatsapp, external: true },
    { icon: "phone", label: "Call · United States", value: SITE.phoneUS, href: SITE.phoneUSHref },
    { icon: "mail", label: "Email", value: SITE.email, href: SITE.emailHref },
    { icon: "pin", label: "Office", value: ADDRESS_LINE, href: directions, external: true },
  ];
  return (
    <>
      <PageHero
        eyebrow={selling ? "Selling or letting" : commercial ? "Commercial enquiry" : "Contact us"}
        crumbs={[{ label: "Contact" }]}
        image="/images/georgetown-street.jpg"
        title={
          selling ? (
            <>
              Request a <em className="text-gold-bright">valuation</em>
            </>
          ) : commercial ? (
            <>
              Let’s talk <em className="text-gold-bright">commercial</em>
            </>
          ) : (
            <>
              Get in <em className="text-gold-bright">touch</em>
            </>
          )
        }
        intro={
          selling
            ? "Tell us about your property and we’ll arrange a visit and a realistic valuation, with no obligation."
            : commercial
              ? "Warehouses, commercial land or office buildings, to buy, lease or sell. Tell us the size, location and budget and we’ll come back with options."
              : "Whether you need a warehouse, a commercial site, an office building or a home, tell us what you have in mind and we’ll take it from there."
        }
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-ink">Speak with a specialist</h2>
            <p className="mt-4 max-w-md text-[16.5px] leading-relaxed text-stone">
              We reply to every enquiry within one business day. For the fastest response, message us on WhatsApp.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-3">
              {lines.map((l) => (
                <li key={l.label} className="min-w-0">
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-[18px] bg-white p-3 pr-5 text-ink no-underline ring-1 ring-ink/8 transition-shadow hover:ring-ink/25"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-ink text-gold">
                      <Icon name={l.icon} className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] text-stone">{l.label}</span>
                      <span className="block text-[15.5px] leading-snug font-semibold break-words">{l.value}</span>
                    </span>
                    <Icon name="arrow" className="h-4 w-4 flex-none text-ink/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-deep" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="pill-light min-h-11 text-[14px]">
                <Icon name="instagram" className="h-4 w-4" /> Instagram
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="pill-light min-h-11 text-[14px]">
                <Icon name="facebook" className="h-4 w-4" /> Facebook
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(14,13,11,0.35)] ring-1 ring-ink/6 sm:p-10 lg:col-span-7">
            <h2 className="mb-8 text-[clamp(1.6rem,2.4vw,2rem)] font-semibold tracking-[-0.03em] text-ink">{selling ? "About your property" : commercial ? "About your requirement" : "How can we help?"}</h2>
            <ContactForm
              source={selling ? "contact-page-sell" : commercial ? "contact-page-commercial" : "contact-page"}
              defaultMessage={defaultMessage}
              defaultInterest={selling ? "Selling" : "Commercial"}
            />
          </Reveal>
        </div>
      </section>

      <section aria-label="Office location" className="bg-[linear-gradient(to_bottom,var(--color-paper)_50%,var(--color-bone)_50%)]">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-5">
          <div className="relative h-[460px] overflow-hidden rounded-[28px] bg-sand sm:rounded-[36px]">
            <iframe
              title="Casa Nuvo Investments office, Subryanville, Georgetown"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[0.6]"
            />
            <div className="pointer-events-none relative flex h-full items-end p-4 sm:p-8">
              <div className="pointer-events-auto max-w-sm rounded-[22px] bg-ink p-6 text-paper shadow-2xl sm:p-7">
                <p className="text-[13px] font-semibold text-gold">Visit us</p>
                <p className="mt-2 text-[1.3rem] leading-snug font-semibold tracking-[-0.02em]">{SITE.address.street}</p>
                <p className="mt-1 text-paper/65">
                  {SITE.address.area}, {SITE.address.city}, {SITE.address.country}
                </p>
                <a href={directions} target="_blank" rel="noopener noreferrer" className="pill-gold mt-5 min-h-11 text-[14px]">
                  Get directions <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type Param = string | string[] | undefined;

/** Pre-filled message for a commercial enquiry from the hero search or a sector link, e.g. “I’m looking to lease commercial land in East Bank Demerara.” */
function commercialMessage(sectorParam: Param, intentParam: Param, locationParam: Param) {
  const sector = SECTORS.find((s) => s.slug === sectorParam);
  const intent = COMMERCIAL_INTENTS.find((i) => i.value === intentParam);
  const where = LOCATIONS.find((l) => l.slug === locationParam)?.name;
  const place = where ? ` in ${where}` : "";
  if (intent?.value === "sell" || intent?.value === "lease-out") {
    return `I’d like to ${intent.phrase} my ${sector?.owned ?? "commercial property"}${place}.`;
  }
  return `I’m looking to ${intent?.phrase ?? "buy or lease"} ${sector?.seeking ?? "commercial property"}${place}.`;
}

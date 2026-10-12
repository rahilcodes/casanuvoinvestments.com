import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SECTORS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial Real Estate",
  description:
    "Commercial real estate brokerage in Guyana: warehouses and industrial buildings, commercial land and office buildings to buy, sell or lease across Georgetown and Demerara.",
  alternates: { canonical: "/commercial" },
};

const SERVICES: { icon: IconName; title: string; text: string }[] = [
  { icon: "search", title: "Buying", text: "We find, shortlist and negotiate warehouses, sites and office buildings for owner-occupiers and investors." },
  { icon: "chart", title: "Selling", text: "We price your commercial property on real comparables, take it to qualified buyers and negotiate the sale." },
  { icon: "key", title: "Leasing", text: "We represent tenants looking for space and landlords looking for the right tenant, from viewing to signed lease." },
  { icon: "compass", title: "Advice & valuation", text: "Straight answers on what a property is worth, what it should rent for and what to check before you commit." },
];

const CLIENTS = [
  "Businesses expanding or relocating",
  "International companies setting up in Guyana",
  "Investors looking for income-producing property",
  "Landowners and developers",
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial real estate"
        crumbs={[{ label: "Commercial" }]}
        image="https://images.unsplash.com/photo-1758304481551-25138093050b"
        title={
          <>
            Warehouses, land &amp; <em className="text-gold-bright">offices.</em>
          </>
        }
        intro={`${SITE.name} is a commercial real estate brokerage. We help businesses, investors and owners buy, sell and lease commercial property across Guyana.`}
      >
        <nav aria-label="Property types" className="flex flex-wrap gap-2">
          {SECTORS.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="pill-glass min-h-11 text-[14px]">
              <Icon name={s.icon} className="h-4 w-4 text-gold" strokeWidth={1.8} /> {s.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* Sectors */}
      <section className="bg-paper py-24 md:py-32" aria-label="What we broker">
        <div className="wrap grid gap-24 md:gap-32">
          {SECTORS.map((s, i) => (
            <article key={s.slug} id={s.slug} className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14" aria-labelledby={`${s.slug}-title`}>
              <Reveal variant="clip" className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-ink-3">
                  <Image src={s.detailImage} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className="photo object-cover" />
                </div>
              </Reveal>
              <Reveal className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-gold">
                    <Icon name={s.icon} className="h-[22px] w-[22px]" strokeWidth={1.7} />
                  </span>
                  <span className="text-[13px] font-semibold tracking-[0.18em] text-stone">0{i + 1}</span>
                </div>
                <h2 id={`${s.slug}-title`} className="t-h2 mt-7 text-ink">
                  {s.name}
                </h2>
                <p className="mt-5 text-[16.5px] leading-[1.7] text-stone">{s.blurb}</p>
                <ul className="mt-8 grid gap-3 border-t border-ink/10 pt-8">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[15.5px] text-ink">
                      <Icon name="check" className="mt-0.5 h-5 w-5 flex-none text-gold-deep" strokeWidth={2} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href={`/contact?topic=commercial&sector=${s.slug}`} className="pill-dark">
                    Enquire about {s.short.toLowerCase()} <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                  <Link href={`/contact?topic=commercial&sector=${s.slug}&intent=sell`} className="pill-light">
                    Sell or lease yours
                  </Link>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-bone py-24 md:py-32" aria-labelledby="services-title">
        <div className="wrap">
          <Reveal className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <h2 id="services-title" className="t-h2 text-ink lg:col-span-6">
              How we work for you
            </h2>
            <p className="text-[16.5px] leading-[1.7] text-stone lg:col-span-5 lg:col-start-8">
              One team handles the search, the numbers and the negotiation, whether you are taking space, selling a building or investing.
            </p>
          </Reveal>
          <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-5">
            {SERVICES.map((sv, i) => (
              <Reveal as="li" key={sv.title} delay={i * 90} className="flex flex-col rounded-[22px] bg-paper p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-gold">
                  <Icon name={sv.icon} className="h-[22px] w-[22px]" strokeWidth={1.7} />
                </span>
                <h3 className="mt-10 text-[19px] font-semibold tracking-[-0.02em] text-ink">{sv.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.65] text-stone">{sv.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we work with */}
      <section className="relative isolate overflow-hidden bg-ink py-24 text-paper md:py-32" aria-labelledby="clients-title">
        <div aria-hidden="true" className="absolute -top-40 -left-40 -z-10 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="kicker-light">Who we work with</p>
            <h2 id="clients-title" className="mt-6 text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.1] font-medium tracking-[-0.035em] text-balance">
              Commercial clients who need the right space, at the right price.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact?topic=commercial" className="pill-gold">
                Start a commercial enquiry <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="pill-glass">
                <Icon name="whatsapp" className="h-4 w-4 text-gold" /> WhatsApp us
              </a>
            </div>
          </Reveal>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {CLIENTS.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 80} className="flex items-start gap-4 rounded-[20px] bg-white/[0.06] p-6 ring-1 ring-white/10">
                <span className="text-[13px] font-semibold tracking-[0.18em] text-gold">0{i + 1}</span>
                <span className="text-[16.5px] leading-snug font-semibold">{c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

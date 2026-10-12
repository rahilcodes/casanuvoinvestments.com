import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";
import { Emblem } from "@/components/Logo";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/property/Gallery";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import { ShareActions } from "@/components/property/ShareActions";
import { TourForm } from "@/components/property/TourForm";
import { formatNumber, formatPrice, locationName, priceSuffix, statusLabel } from "@/lib/format";
import { getProperty, getSimilar, PROPERTIES } from "@/lib/properties";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return { title: "Property not found" };
  const title = `${p.title} · ${formatPrice(p)}${p.status === "rent" ? " / month" : ""}`;
  return {
    title,
    description: `${statusLabel(p)} in ${p.neighborhood}, ${locationName(p.location)}. ${p.beds} bedrooms${p.baths ? `, ${p.baths} bathrooms` : ""}. ${p.description[0].slice(0, 120)}…`,
    alternates: { canonical: `/properties/${p.slug}` },
    openGraph: { title, images: p.images[0] ? [{ url: p.images[0] }] : undefined },
  };
}

export default async function PropertyPage({ params }: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const url = `${SITE.url}/properties/${p.slug}`;
  const similar = getSimilar(p);
  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: "bed", label: "Bedrooms", value: String(p.beds) },
    ...(p.baths !== undefined ? [{ icon: "bath" as const, label: "Bathrooms", value: String(p.baths) }] : []),
    ...(p.garage ? [{ icon: "car" as const, label: "Garage", value: String(p.garage) }] : []),
    ...(p.sqft ? [{ icon: "area" as const, label: "Size", value: `${formatNumber(p.sqft)} sq ft` }] : []),
    { icon: "key", label: "Type", value: p.type },
  ];
  const waText = encodeURIComponent(`Hello Casa Nuvo, I'm interested in ${p.title} (${formatPrice(p)}${priceSuffix(p) ? " " + priceSuffix(p) : ""}). ${url}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    url,
    description: p.description.join(" "),
    image: p.images.map((i) => `${SITE.url}${i}`),
    datePosted: p.listed,
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: p.status === "sale" ? "GYD" : "USD",
      businessFunction: p.status === "sale" ? "http://purl.org/goodrelations/v1#Sell" : "http://purl.org/goodrelations/v1#LeaseOut",
    },
    address: { "@type": "PostalAddress", streetAddress: p.address, addressRegion: locationName(p.location), addressCountry: "GY" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative isolate overflow-hidden bg-ink pb-36 text-paper">
        <div aria-hidden="true" className="absolute -top-40 -right-40 -z-10 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="wrap pt-[120px] md:pt-[136px]">
          <nav aria-label="Breadcrumb" className="animate-fade">
            <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-paper/60">
              <li>
                <Link href="/" className="text-paper/60 no-underline hover:text-paper">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-paper/35">/</li>
              <li>
                <Link href={`/properties?status=${p.status}`} className="text-paper/60 no-underline hover:text-paper">
                  {statusLabel(p)}
                </Link>
              </li>
              <li aria-hidden="true" className="text-paper/35">/</li>
              <li>
                <Link href={`/properties?location=${p.location}`} className="text-paper/60 no-underline hover:text-paper">
                  {locationName(p.location)}
                </Link>
              </li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 gap-8 pt-10 md:pt-14 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="animate-fade-up [animation-delay:100ms]">
              <div className="flex flex-wrap gap-1.5">
                <span className={`chip ${p.status === "sale" ? "bg-gold text-ink" : "bg-paper text-ink"}`}>{statusLabel(p)}</span>
                {p.labels.filter((l) => l === "Open House").map((l) => (
                  <span key={l} className="chip border border-white/20 text-paper/80">
                    {l}
                  </span>
                ))}
              </div>
              <h1 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)] text-paper">{p.title}</h1>
              <p className="mt-5 flex items-start gap-2 text-[15.5px] text-paper/70">
                <Icon name="pin" className="mt-0.5 h-4 w-4 flex-none text-gold" />
                {p.address}
              </p>
            </div>
            <div className="animate-fade-up lg:text-right [animation-delay:200ms]">
              <p className="text-[13.5px] font-semibold text-gold">{p.status === "sale" ? "Asking price" : "Monthly rent"}</p>
              <p className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-paper">{formatPrice(p)}</p>
              {priceSuffix(p) && <p className="mt-2 text-[14px] text-paper/60">per month, furnished</p>}
            </div>
          </div>
        </div>
      </section>

      <div className="wrap relative z-10 -mt-24 animate-fade-up [animation-delay:250ms]">
        <Gallery images={p.images} title={p.title} />
      </div>

      <div className="wrap grid grid-cols-1 gap-16 py-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20 lg:py-20">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-ink/10 pb-8">
            <dl className="flex flex-wrap gap-x-10 gap-y-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="flex items-center gap-2 text-[13.5px] text-stone">
                    <Icon name={f.icon} className="h-4 w-4 text-gold-deep" />
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-[1.3rem] leading-tight font-semibold tracking-[-0.02em] text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <ShareActions slug={p.slug} title={p.title} url={url} />
          </div>

          <Reveal as="section" className="mt-14" aria-labelledby="desc">
            <p className="eyebrow">Overview</p>
            <h2 id="desc" className="mt-5 text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-ink">
              About this {p.status === "sale" ? "home" : "residence"}
            </h2>
            <div className="mt-7 grid gap-5 text-[17px] leading-[1.85] text-ink/75">
              {p.description.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className="mt-16" aria-labelledby="features">
            <p className="eyebrow">Features</p>
            <h2 id="features" className="mt-5 text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-ink">
              Amenities &amp; highlights
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-x-12 border-t border-ink/10 sm:grid-cols-2">
              {p.amenities.map((a) => (
                <li key={a} className="flex items-center gap-4 border-b border-ink/10 py-4">
                  <Icon name="check" className="h-4 w-4 flex-none text-gold-deep" strokeWidth={1.8} />
                  <span className="text-[15.5px] text-ink">{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="mt-16" aria-labelledby="location">
            <p className="eyebrow">Location</p>
            <h2 id="location" className="mt-5 text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-ink">
              {p.neighborhood}, {locationName(p.location)}
            </h2>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[22px] bg-sand">
              <iframe
                title={`Map of ${p.neighborhood}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${p.neighborhood}, ${locationName(p.location)}, Guyana`)}&z=14&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.6] contrast-[1.05]"
              />
            </div>
            <p className="mt-3 text-[13.5px] text-stone">Map shows the general area. The exact address is shared when you book a viewing.</p>
          </Reveal>

          {p.status === "sale" && (
            <Reveal as="section" className="mt-16" aria-labelledby="mortgage">
              <p className="eyebrow">Financing</p>
              <h2 id="mortgage" className="mt-5 mb-8 text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-ink">
                Mortgage calculator
              </h2>
              <MortgageCalculator price={p.price} />
            </Reveal>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Enquire about this property">
          <div className="rounded-[28px] bg-white p-7 shadow-[0_40px_80px_-50px_rgba(14,13,11,0.35)] ring-1 ring-ink/6 sm:p-9">
            <div className="flex items-center gap-4 border-b border-ink/10 pb-6">
              <span className="grid h-14 w-14 flex-none place-items-center rounded-full bg-ink">
                <Emblem className="h-9 w-9" />
              </span>
              <div>
                <p className="text-[1.1rem] leading-tight font-semibold tracking-[-0.02em] text-ink">Casa Nuvo Investments</p>
                <p className="mt-0.5 text-[13.5px] text-stone">Listing team</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <a href={`${SITE.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="btn min-h-11 border border-ink/15 px-3 text-ink hover:border-ink hover:bg-ink hover:text-paper">
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
              </a>
              <a href={SITE.phoneUSHref} className="btn min-h-11 border border-ink/15 px-3 text-ink hover:border-ink hover:bg-ink hover:text-paper">
                <Icon name="phone" className="h-4 w-4" /> Call
              </a>
            </div>
            <h2 className="mt-9 text-[1.45rem] leading-tight font-semibold tracking-[-0.03em] text-ink">Schedule a tour</h2>
            <p className="mt-1.5 mb-6 text-[14px] text-stone">Choose a time that suits you — we’ll confirm within the day.</p>
            <TourForm slug={p.slug} title={p.title} />
          </div>
          {p.ref && <p className="mt-4 text-center text-[13px] text-stone">Reference {p.ref}</p>}
        </aside>
      </div>

      <section className="border-t border-ink/10 bg-paper py-24" aria-labelledby="similar">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="similar" className="h-section text-ink">
                Similar listings
              </h2>
            </div>
            <Link href={`/properties?status=${p.status}`} className="link-arrow text-ink hover:text-gold-deep">
              View all {statusLabel(p).toLowerCase()} <Icon name="arrow" className="arrow h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <PropertyCard p={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

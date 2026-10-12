import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/Carousel";
import { CommercialIndex } from "@/components/CommercialIndex";
import { ContactPanel } from "@/components/ContactPanel";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { HeroSearch } from "@/components/home/HeroSearch";
import { Icon, type IconName } from "@/components/Icon";
import { ListingTile } from "@/components/ListingTile";
import { ProofStrip } from "@/components/ProofStrip";
import { Reveal } from "@/components/Reveal";
import { Voices } from "@/components/Voices";
import { TESTIMONIALS } from "@/lib/insights";
import { FOR_RENT, FOR_SALE } from "@/lib/properties";
import { FOUNDER, LOCATIONS, SITE } from "@/lib/site";

/** Rentals in display order, strongest photography first; anything unlisted follows. */
const RENT_ORDER = [
  "windsor-estate-townhouse",
  "windsor-estate-single-family",
  "atlantic-towers",
  "happy-acres-property",
  "republic-park-townhouse",
  "la-parfaite-harmonie-two-bedroom",
  "green-acres-property",
  "la-parfaite-harmonie-one-bedroom",
];

/** Home-page photography per region: a real street or home in each, no repeats of the hero. */
const AREA_IMAGES: Record<string, { src: string; position?: string }> = {
  georgetown: { src: "/images/georgetown-street.jpg", position: "object-[60%_50%]" },
  "east-bank-demerara": { src: "/images/properties/windsor-estate-single-family-1.jpg" },
  "east-coast-demerara": { src: "/images/properties/lusignan-two-story-1.jpg" },
  "west-bank-demerara": { src: "/images/properties/la-parfaite-harmonie-one-bedroom-1.jpg" },
};

/** What working with the team is like, in plain terms (home page only). */
const VALUES: { icon: IconName; title: string; text: string }[] = [
  { icon: "compass", title: "Local knowledge", text: "We work in Georgetown and Demerara every day, so advice on sites, prices and rents comes from the ground." },
  { icon: "handshake", title: "One team, start to finish", text: "The people who show you the property are the people who negotiate the deal and see it through to closing." },
  { icon: "shield", title: "Straight answers", text: "We tell you what a property is really worth and what to check before you commit." },
];

const SELL_STEPS = [
  { title: "Valuation", text: "We visit, look at comparable sales and rents nearby and agree a realistic asking price or rent with you." },
  { title: "Marketing", text: "Your property is listed on our site and taken to the buyers, tenants and investors we are already working with." },
  { title: "Offer to closing", text: "We handle viewings, offers and negotiation and stay with you through to closing." },
];

/** Business clients first (commercial is the core of the business), then a homeowner. */
const VOICES = [TESTIMONIALS[4], TESTIMONIALS[2], TESTIMONIALS[1]];

export default function HomePage() {
  const sale = [...FOR_SALE].sort((a, b) => b.price - a.price);
  const rentals = FOR_RENT.filter((p) => p.images.length).sort((a, b) => rank(RENT_ORDER, a.slug) - rank(RENT_ORDER, b.slug));

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section aria-labelledby="hero-title">
        <div className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-ink text-paper sm:h-[100svh] sm:max-h-[1040px]">
          <HeroBackdrop />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,13,11,0.82)_0%,rgba(14,13,11,0.5)_40%,rgba(14,13,11,0.05)_75%)]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-ink/75 to-transparent" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/30 sm:hidden" />

          <div className="wrap flex flex-1 flex-col justify-end pt-36 pb-8 sm:pb-12">
            <p className="kicker-light animate-fade-up before:hidden">Commercial real estate brokerage · Guyana</p>
            <h1 id="hero-title" className="t-display mt-5 max-w-[13ch] animate-fade-up text-[clamp(3.1rem,7.2vw,7rem)] [animation-delay:120ms]">
              Space for <span className="t-accent text-gold-bright">business</span> in Guyana.
            </h1>
            <p className="mt-6 max-w-[36rem] animate-fade-up text-[17px] leading-[1.65] text-paper/80 [animation-delay:240ms] sm:text-[18px]">
              Warehouses, commercial land and office buildings to buy, lease or sell, brokered by people who know the market. Homes for sale and rent, too.
            </p>
            <div className="mt-10 animate-fade-up [animation-delay:380ms]">
              <HeroSearch />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── PROOF ───────────── */}
      <section aria-label="Casa Nuvo in numbers" className="border-b border-ink/10 bg-paper">
        <ProofStrip />
      </section>

      {/* ───────────── COMMERCIAL ───────────── */}
      <section className="relative isolate overflow-hidden bg-ink py-24 text-paper md:py-32" aria-labelledby="sectors-title">
        <div aria-hidden="true" className="absolute -top-48 -right-40 -z-10 h-[560px] w-[560px] rounded-full bg-gold/10 blur-[130px]" />
        <div className="wrap">
          <Reveal className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="kicker-light before:hidden">Commercial real estate</p>
              <h2 id="sectors-title" className="t-h2 mt-6 max-w-[16ch] text-paper">
                Built for the businesses <span className="t-accent text-gold-bright">building</span> Guyana.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-7 lg:col-span-4 lg:col-start-9">
              <p className="text-[16.5px] leading-[1.7] text-paper/65">
                Logistics warehouses, development land, corporate offices and income-producing assets. We advise the companies, investors and owners
                shaping the market on every purchase, sale and lease.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/commercial" className="pill-gold">
                  Explore commercial <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/contact?topic=commercial" className="pill-glass">
                  Submit a requirement
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 md:mt-20">
            <CommercialIndex />
          </div>

          <Reveal className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2.5 text-[15px] text-paper/60">
              <Icon name="home" className="h-4 w-4 flex-none text-gold" strokeWidth={1.8} />
              Also residential: a select portfolio of homes for sale and furnished rentals.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] font-semibold">
              <Link href="/properties?status=sale" className="inline-flex items-center gap-1.5 text-paper no-underline hover:text-gold-bright">
                {FOR_SALE.length} homes for sale <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
              <Link href="/properties?status=rent" className="inline-flex items-center gap-1.5 text-paper no-underline hover:text-gold-bright">
                {FOR_RENT.length} rentals <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── FOUNDER ───────────── */}
      <section className="relative isolate overflow-hidden border-t border-white/10 bg-ink py-24 text-paper md:py-32" aria-labelledby="founder-title">
        <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure className="relative mx-auto aspect-[4/5] max-w-[500px] lg:mx-0">
              {/* Glow sits behind the portrait; the photo is opaque on top, its black backdrop feathered out by a mask. */}
              <div aria-hidden="true" className="absolute -inset-[12%] z-0 rounded-full bg-[radial-gradient(closest-side,rgb(198_161_91/0.28),transparent)]" />
              <div className="absolute inset-0 z-10 [mask-image:radial-gradient(ellipse_68%_74%_at_50%_44%,black_50%,transparent_92%)]">
                <Image
                  src="/images/founder.jpg"
                  alt={FOUNDER.name ? `${FOUNDER.name}, ${FOUNDER.role}` : `The ${FOUNDER.role}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 500px"
                  className="object-cover object-top"
                />
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-ink to-transparent" />
              <figcaption className="absolute inset-x-4 bottom-4 z-20 rounded-[18px] bg-white/10 px-5 py-4 ring-1 ring-white/15 backdrop-blur-md">
                {FOUNDER.name && <span className="block text-[16px] font-semibold">{FOUNDER.name}</span>}
                <span className={`block ${FOUNDER.name ? "mt-0.5 text-[13.5px] text-paper/65" : "text-[14.5px] font-semibold"}`}>{FOUNDER.role}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker-light">Meet the founder</p>
              <h2 id="founder-title" className="mt-6 text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[1.1] font-medium tracking-[-0.035em] text-balance">
                “We don’t just invest in properties. We elevate lifestyles and build wealth.”
              </h2>
              <p className="mt-7 max-w-[38rem] text-[16.5px] leading-[1.75] text-paper/65">
                Casa Nuvo is a commercial brokerage first: warehouses, commercial land and office buildings across Georgetown and Demerara, alongside a select portfolio of homes.
                Whether you’re a business looking for space, an investor building income or an owner ready to sell, you deal directly with the people who know the market.
              </p>
            </Reveal>

            <ul className="mt-12 grid grid-cols-1 gap-8 border-t border-white/12 pt-10 sm:grid-cols-3 sm:gap-6">
              {VALUES.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 90}>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-ink">
                    <Icon name={v.icon} className="h-[22px] w-[22px]" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.015em]">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-paper/65">{v.text}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={150} className="mt-12 flex flex-wrap gap-3">
              <Link href="/contact" className="pill-gold">
                Book a consultation <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/about" className="pill-glass">
                Our story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── FOR SALE ───────────── */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="sale-title">
        <div className="wrap">
          <Reveal className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Residential</p>
              <h2 id="sale-title" className="t-h2 mt-5 text-ink">
                Homes for sale
              </h2>
            </div>
            <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-8">
              <p className="text-[16.5px] leading-[1.7] text-stone">
                From a renovation opportunity in Subryanville to move-in-ready family homes on the East Coast. Prices in Guyanese dollars.
              </p>
              <Link href="/properties?status=sale" className="pill-dark">
                All homes for sale <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {sale.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ListingTile p={p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </Reveal>
            ))}
            <Reveal delay={180}>
              <div className="flex h-full min-h-[320px] flex-col justify-between rounded-[22px] bg-bone p-8 sm:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-gold">
                  <Icon name="search" className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.03em] text-ink">Not seeing the right home?</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-stone">Tell us your budget and must-haves and we will search for you, including homes not yet listed here.</p>
                  <Link href="/contact" className="pill-dark mt-7">
                    Tell us what you need <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── FOR RENT ───────────── */}
      <section className="overflow-hidden bg-bone py-24 md:py-32" aria-labelledby="rent-title">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4 lg:pt-2">
            <p className="eyebrow">Residential</p>
            <h2 id="rent-title" className="t-h2 mt-5 text-ink">
              Furnished rentals
            </h2>
            <p className="mt-6 max-w-sm text-[16.5px] leading-[1.7] text-stone">
              City apartments, townhouses and family homes in gated communities, ready to move into. Rents are monthly, in US dollars.
            </p>
            <Link href="/properties?status=rent" className="pill-dark mt-8">
              All {FOR_RENT.length} rentals <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="min-w-0 lg:col-span-8">
            <Carousel label="Homes for rent" itemClassName="w-[80%] sm:w-[46%] lg:w-[44%]">
              {rentals.map((p) => (
                <ListingTile key={p.slug} p={p} variant="overlay" sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 30vw" />
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* ───────────── AREAS ───────────── */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="areas-title">
        <div className="wrap">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 id="areas-title" className="t-h2 text-ink">
              Explore by area
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-[1.7] text-stone">
              From Georgetown’s business districts to the growing corridors of the East Bank, East Coast and West Bank.
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:mt-16 lg:grid-cols-4">
            {LOCATIONS.map((l, i) => {
              const img = AREA_IMAGES[l.slug] ?? { src: l.image };
              return (
                <Reveal as="li" key={l.slug} delay={i * 80}>
                  <Link
                    href={`/properties?location=${l.slug}`}
                    className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[22px] bg-ink-3 p-4 text-paper no-underline sm:p-6"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className={`photo object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06] ${img.position ?? ""}`}
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                    <span className="relative block text-[clamp(1.05rem,1.6vw,1.35rem)] leading-tight font-semibold tracking-[-0.02em] text-balance">{l.name}</span>
                    <span className="relative mt-2 inline-flex items-center gap-1.5 text-[13.5px] text-paper/75 transition-colors group-hover:text-gold-bright">
                      View listings <Icon name="arrow" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────── SELLING ───────────── */}
      <section className="bg-bone py-24 md:py-32" aria-labelledby="sell-title">
        <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">For owners</p>
            <h2 id="sell-title" className="t-h2 mt-5 text-ink">
              Selling or leasing out a property?
            </h2>
            <p className="mt-6 max-w-md text-[16.5px] leading-[1.7] text-stone">
              Warehouse, land, office building or home: get a realistic valuation and a team that finds the buyer or tenant and handles the negotiation for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact?topic=sell" className="pill-dark">
                Request a valuation <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="pill-light">
                <Icon name="whatsapp" className="h-4 w-4 text-gold-deep" /> WhatsApp us
              </a>
            </div>
          </Reveal>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
            {SELL_STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="flex flex-col rounded-[22px] bg-paper p-7">
                <span className="text-[14px] font-semibold text-gold-deep">Step {i + 1}</span>
                <h3 className="mt-10 text-[19px] font-semibold tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-stone">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── CLIENTS ───────────── */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="voices-title">
        <div className="wrap">
          <Reveal className="mb-12 md:mb-16">
            <h2 id="voices-title" className="t-h2 max-w-xl text-ink">
              What our clients say
            </h2>
          </Reveal>
          <Voices items={VOICES} />
        </div>
      </section>

      {/* ───────────── CONTACT ───────────── */}
      {/* The panel straddles the paper / bone edge so it flows into the footer. */}
      <section className="bg-[linear-gradient(to_bottom,var(--color-paper)_50%,var(--color-bone)_50%)]" aria-labelledby="contact-title">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-5">
          <ContactPanel withForm />
        </div>
      </section>
    </>
  );
}

function rank(order: string[], slug: string) {
  const i = order.indexOf(slug);
  return i === -1 ? order.length : i;
}

import type { Metadata } from "next";
import Image from "next/image";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ProofStrip } from "@/components/ProofStrip";
import { Reveal } from "@/components/Reveal";
import { Voices } from "@/components/Voices";
import { PILLARS, TESTIMONIALS } from "@/lib/insights";
import { FOUNDER } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Casa Nuvo Investments is a commercial real estate brokerage in Guyana, founded on integrity, expertise and a commitment to excellence. Our story, vision and mission.",
  alternates: { canonical: "/about" },
};

const AIMS = [
  {
    title: "Our vision",
    text: "To redefine real estate investment with solutions tailored to each client: a seamless journey where every step is backed by market insight and sound strategy.",
  },
  {
    title: "Our mission",
    text: "To help individuals and businesses reach their financial goals through smart, sustainable investments in commercial, industrial, mixed-use and residential property.",
  },
];

const PILLAR_ICONS: IconName[] = ["compass", "key", "shield"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Casa Nuvo"
        crumbs={[{ label: "About" }]}
        image="https://images.unsplash.com/photo-1574958269340-fa927503f3dd"
        title={
          <>
            Where innovation meets <em className="text-gold-bright">opportunity.</em>
          </>
        }
        intro="Founded on integrity, expertise and a commitment to excellence, we curate premium real estate and investment opportunities that help our clients build wealth."
      />

      {/* Story */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="story">
        <div className="wrap grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <figure className="relative mx-auto aspect-[4/5] max-w-[460px] overflow-hidden rounded-[28px] bg-black lg:mx-0">
              <Image src="/images/founder.jpg" alt={FOUNDER.name ? `${FOUNDER.name}, ${FOUNDER.role}` : `The ${FOUNDER.role}`} fill sizes="(max-width: 1024px) 90vw, 460px" className="object-cover object-top" />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-[18px] bg-white/10 px-5 py-4 text-paper ring-1 ring-white/15 backdrop-blur-md">
                {FOUNDER.name && <span className="block text-[16px] font-semibold">{FOUNDER.name}</span>}
                <span className={`block ${FOUNDER.name ? "mt-0.5 text-[13.5px] text-paper/65" : "text-[14.5px] font-semibold"}`}>{FOUNDER.role}</span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow">Our story</p>
              <h2 id="story" className="h-section mt-5 text-ink">
                Commercial brokers in Guyana’s growing market
              </h2>
              <div className="mt-8 grid gap-5 text-[17px] leading-[1.8] text-stone">
                <p>
                  Casa Nuvo is, at its core, a commercial real estate brokerage. Most of our work is warehouses and industrial buildings, commercial
                  land and office buildings, for businesses, investors and owners across Georgetown and Demerara.
                </p>
                <p>
                  We also handle a select portfolio of homes for sale and rent. Whether it’s a distribution warehouse, a development site, an office
                  building or a family home, our commitment to innovation and client success means results you can rely on.
                </p>
              </div>
            </Reveal>
            <Reveal as="figure" delay={120} className="mt-12 rounded-[22px] bg-bone p-8 sm:p-10">
              <blockquote className="text-[clamp(1.4rem,2.3vw,1.9rem)] leading-[1.3] font-medium tracking-[-0.025em] text-ink">
                “We don’t just invest in properties; we elevate lifestyles and build wealth.”
              </blockquote>
              <figcaption className="mt-5 text-[14px] text-stone">{FOUNDER.name ? `${FOUNDER.name}, ${FOUNDER.role}` : FOUNDER.role}</figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Casa Nuvo in numbers" className="border-y border-ink/10 bg-paper">
        <ProofStrip />
      </section>

      {/* Vision, mission and principles */}
      <section className="bg-bone py-24 md:py-32" aria-labelledby="principles">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {AIMS.map((a, i) => (
              <Reveal key={a.title} delay={i * 100} className="rounded-[22px] bg-paper p-8 sm:p-10">
                <h2 className="text-[clamp(1.6rem,2.4vw,2.1rem)] font-semibold tracking-[-0.03em] text-ink">{a.title}</h2>
                <p className="mt-4 max-w-lg text-[16.5px] leading-[1.75] text-stone">{a.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 md:mt-28">
            <h2 id="principles" className="h-section max-w-2xl text-ink">
              What sets us apart
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-stone">
              Three principles guide every introduction, viewing and negotiation we handle on your behalf.
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 100} className="rounded-[22px] bg-paper p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-gold">
                  <Icon name={PILLAR_ICONS[i]} className="h-[22px] w-[22px]" strokeWidth={1.7} />
                </span>
                <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.02em] text-ink">{p.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.7] text-stone">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="clients">
        <div className="wrap">
          <Reveal className="mb-12 md:mb-16">
            <h2 id="clients" className="h-section text-ink">
              What our clients say
            </h2>
          </Reveal>
          <Voices items={TESTIMONIALS} />
        </div>
      </section>
    </>
  );
}

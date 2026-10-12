import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { INSIGHTS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: "Guidance on commercial property, investing, buying and renting real estate in Guyana from the Casa Nuvo Investments team.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [lead, ...rest] = INSIGHTS;
  return (
    <>
      <PageHero
        eyebrow="Insights"
        crumbs={[{ label: "Insights" }]}
        title={
          <>
            Notes from the <em className="text-gold-bright italic">Casa Nuvo</em> team
          </>
        }
        intro="Practical guidance on commercial property, investment and every stage of your real estate journey in Guyana."
      />

      <section className="bg-paper py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <article className="group relative grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-ink-3">
                <Image src={lead.image} alt="" fill preload sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.04]" />
              </div>
              <div>
                <p className="eyebrow">
                  {lead.category} · {lead.readMinutes} min read
                </p>
                <h2 className="h-section mt-6">
                  <Link href={`/insights/${lead.slug}`} className="text-ink no-underline after:absolute after:inset-0 after:content-[''] group-hover:text-gold-deep">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-5 text-[1.15rem] leading-snug font-medium text-ink/80">{lead.kicker}</p>
                <p className="mt-4 text-[16.5px] leading-relaxed text-stone">{lead.dek}</p>
                <span className="pill-dark mt-8">
                  Read the article <Icon name="arrow" className="arrow h-4 w-4" />
                </span>
              </div>
            </article>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-14 border-t border-ink/10 pt-16 md:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <article className="group relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-ink-3">
                    <Image src={a.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]" />
                  </div>
                  <p className="eyebrow mt-5">
                    {a.category} · {a.readMinutes} min read
                  </p>
                  <h2 className="h-card mt-2 text-[1.4rem]">
                    <Link href={`/insights/${a.slug}`} className="text-ink no-underline after:absolute after:inset-0 after:content-[''] group-hover:text-gold-deep">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone">{a.dek}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/CtaLink";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/PropertyCard";
import { getInsight, INSIGHTS, type Block } from "@/lib/insights";
import { PROPERTIES } from "@/lib/properties";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: `${a.kicker}. ${a.dek}`,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: "article", title: a.title, images: [{ url: a.image }] },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();

  const idx = INSIGHTS.findIndex((x) => x.slug === a.slug);
  const next = INSIGHTS[(idx + 1) % INSIGHTS.length];
  const featured = PROPERTIES.filter((p) => p.images.length && p.labels.length).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    image: a.image.startsWith("http") ? a.image : `${SITE.url}${a.image}`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={`${a.category} · ${a.readMinutes} min read`}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: a.title }]}
        title={a.title}
        intro={
          <>
            <span className="font-semibold text-paper">{a.kicker}.</span> {a.dek}
          </>
        }
      />

      <div className="wrap relative z-10 -mt-12">
        <div className="relative mx-auto aspect-[21/9] max-w-[1100px] overflow-hidden rounded-[28px] bg-ink-3">
          <Image src={a.image} alt="" fill preload sizes="(max-width: 1100px) 100vw, 1100px" className="object-cover" />
        </div>
      </div>

      <article className="wrap-narrow py-20 md:py-24">
        <div className="prose-casa">
          {a.body.map((b, i) => (
            <BlockView key={i} block={b} first={i === 0} />
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-[22px] bg-bone p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[1.4rem] leading-tight font-semibold tracking-[-0.03em] text-ink">Ready to take the next step?</p>
            <p className="mt-1 text-stone">Speak with a Casa Nuvo specialist today.</p>
          </div>
          <CtaLink href="/contact">Contact us</CtaLink>
        </div>
      </article>

      <section className="border-t border-ink/10 bg-paper py-20 md:py-24" aria-label="Featured properties">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h-section text-ink">Featured properties</h2>
            <Link href={`/insights/${next.slug}`} className="link-arrow text-ink hover:text-gold-deep">
              Next: {next.title} <Icon name="arrow" className="arrow h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BlockView({ block, first }: { block: Block; first: boolean }) {
  switch (block.type) {
    case "p":
      return first ? (
        <p className="first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:font-serif first-letter:text-[4.75rem] first-letter:leading-[0.75] first-letter:text-gold-deep">
          {block.text}
        </p>
      ) : (
        <p>{block.text}</p>
      );
    case "h2":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul className="my-8 grid gap-px border-y border-ink/10 bg-ink/10">
          {block.items.map((it) => (
            <li key={it.title} className="flex gap-5 bg-paper py-5">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-5 flex-none bg-gold" />
              <span className="text-[17px] leading-[1.7] text-ink/80">
                <strong className="font-semibold text-ink">{it.title}:</strong> {it.text}
              </span>
            </li>
          ))}
        </ul>
      );
    case "cards":
      return (
        <div className="my-10 grid gap-4 sm:grid-cols-2">
          {block.items.map((it, i) => (
            <div key={it.title} className={`rounded-[20px] bg-white p-7 ring-1 ring-ink/8 ${i === block.items.length - 1 && block.items.length % 2 ? "sm:col-span-2" : ""}`}>
              <span className="text-[14px] font-semibold text-gold-deep">0{i + 1}</span>
              <h3 className="mt-3 text-[1.2rem] leading-snug font-semibold tracking-[-0.02em] text-ink">{it.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-stone">{it.text}</p>
            </div>
          ))}
        </div>
      );
  }
}

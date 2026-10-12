import Image from "next/image";
import Link from "next/link";

/**
 * Dark interior-page header under the transparent site header: breadcrumbs,
 * a large title (an <em> in it becomes the page's serif accent), an intro and
 * an optional faint backdrop photo.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill preload sizes="100vw" className="photo animate-slow-zoom object-cover opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,11,0.55),#0e0d0b_92%)]" />
        </div>
      )}
      <div aria-hidden="true" className="absolute -top-40 -right-40 -z-10 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="wrap pt-[120px] pb-16 md:pt-[136px] md:pb-20">
        <nav aria-label="Breadcrumb" className="animate-fade">
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px] text-paper/60">
            <li>
              <Link href="/" className="text-paper/60 no-underline hover:text-paper">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true" className="text-paper/35">
                  /
                </span>
                {c.href ? (
                  <Link href={c.href} className="text-paper/60 no-underline hover:text-paper">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="truncate text-paper/85">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid grid-cols-1 items-end gap-8 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className="kicker-light animate-fade-up">{eyebrow}</p>
            <h1 className="t-display mt-5 animate-fade-up text-[clamp(2.6rem,5.6vw,5.25rem)] text-paper [animation-delay:100ms]">{title}</h1>
          </div>
          {intro && <div className="animate-fade-up text-[16.5px] leading-[1.7] text-paper/70 [animation-delay:250ms] lg:col-span-4 lg:pb-2">{intro}</div>}
        </div>
        {children && <div className="mt-10 animate-fade-up [animation-delay:350ms]">{children}</div>}
      </div>
    </section>
  );
}

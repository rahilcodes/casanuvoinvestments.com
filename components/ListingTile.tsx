import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Icon, type IconName } from "@/components/Icon";
import { PropertyImage } from "@/components/PropertyImage";
import { formatNumber, formatPrice, locationName } from "@/lib/format";
import type { Property } from "@/lib/properties";

/**
 * Photo-first listing tile, used everywhere a listing appears.
 * - `card`: photo with the price on it, details below (sales, search results)
 * - `overlay`: taller photo with the details set on it (the rentals row)
 * Only "Open House" is shown as a label: it is time-sensitive and useful,
 * whereas "Hot Offer" on half the listings reads as discounting.
 */
export function ListingTile({ p, sizes, variant = "card", preload }: { p: Property; sizes: string; variant?: "card" | "overlay"; preload?: boolean }) {
  const label = p.labels.find((l) => l === "Open House");
  const place = `${p.neighborhood}, ${locationName(p.location)}`;
  const price = (
    <>
      {formatPrice(p)}
      {p.status === "rent" && <span className="ml-0.5 text-[12.5px] font-medium opacity-70">/mo</span>}
    </>
  );
  const photo = (
    <div className="photo absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.045]">
      <PropertyImage src={p.images[0]} alt={p.title} sizes={sizes} priority={preload} />
    </div>
  );
  const chips = (
    <>
      {label && <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-ink">{label}</span>}
      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton slug={p.slug} title={p.title} />
      </div>
    </>
  );
  const link = (
    <Link href={`/properties/${p.slug}`} className="text-inherit no-underline after:absolute after:inset-0 after:content-['']">
      {p.title}
    </Link>
  );

  if (variant === "overlay") {
    return (
      <article className="group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-ink-3 text-paper">
        {photo}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
        {chips}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[20px] leading-none font-semibold tracking-[-0.02em]">{price}</p>
          <h3 className="mt-3 text-[17px] leading-snug font-semibold tracking-[-0.015em]">{link}</h3>
          <p className="mt-1 text-[14px] text-paper/70">{place}</p>
          <Specs p={p} className="mt-3 text-paper/80" iconClassName="text-gold-bright" />
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-ink-3">
        {photo}
        {chips}
        <p className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-[15px] font-semibold tracking-[-0.01em] text-ink shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
          {price}
        </p>
      </div>

      <div className="flex items-start justify-between gap-4 pt-5">
        <div className="min-w-0">
          <h3 className="text-[18px] leading-snug font-semibold tracking-[-0.02em] text-ink">{link}</h3>
          <p className="mt-1 text-[14.5px] text-stone">{place}</p>
        </div>
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-10 w-10 flex-none place-items-center rounded-full text-ink ring-1 ring-ink/12 transition-all duration-500 group-hover:bg-ink group-hover:text-paper group-hover:ring-ink"
        >
          <Icon name="arrow" className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </span>
      </div>
      <Specs p={p} className="mt-3 text-ink/70" iconClassName="text-gold-deep" />
    </article>
  );
}

function Specs({ p, className, iconClassName }: { p: Property; className: string; iconClassName: string }) {
  const specs: { icon: IconName; text: string }[] = [
    { icon: "bed", text: `${p.beds} bed${p.beds === 1 ? "" : "s"}` },
    ...(p.baths ? [{ icon: "bath" as const, text: `${p.baths} bath${p.baths === 1 ? "" : "s"}` }] : []),
    ...(p.sqft ? [{ icon: "area" as const, text: `${formatNumber(p.sqft)} sq ft` }] : []),
  ];
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] ${className}`}>
      {specs.map((s) => (
        <li key={s.icon} className="inline-flex items-center gap-1.5">
          <Icon name={s.icon} className={`h-4 w-4 ${iconClassName}`} />
          {s.text}
        </li>
      ))}
    </ul>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Icon } from "@/components/Icon";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES, PROPERTY_TYPES } from "@/lib/properties";
import { applyFilters, filtersToQuery, PRICE_OPTIONS, type Filters } from "@/lib/search";
import { LOCATIONS, SITE } from "@/lib/site";

/** Sticky filter bar + results grid. Filters live in the URL so searches are shareable. */
export function ListingsExplorer({ initial }: { initial: Filters }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [filters, setFilters] = useState(initial);
  const [prevInitial, setPrevInitial] = useState(initial);

  // Follow back/forward navigation (derived-state reset during render).
  if (prevInitial !== initial) {
    setPrevInitial(initial);
    setFilters(initial);
  }

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    if ("status" in patch) next.max = 0;
    setFilters(next);
    const q = filtersToQuery(next);
    startTransition(() => router.replace(q ? `/properties?${q}` : "/properties", { scroll: false }));
  };

  const results = applyFilters([...PROPERTIES], filters);
  const active = Boolean(filters.status || filters.location || filters.type || filters.beds || filters.max);

  return (
    <>
      <div className="sticky top-[var(--header-offset,72px)] z-30 border-b border-ink/8 bg-paper/95 backdrop-blur-xl transition-[top] duration-700 ease-[var(--ease-luxe)]">
        {/* One swipeable row on phones so the sticky bar stays a single line; wraps from tablet up. */}
        <div className="wrap no-scrollbar flex flex-nowrap items-center gap-2 overflow-x-auto py-3 sm:flex-wrap sm:gap-x-3 sm:gap-y-3 sm:overflow-visible sm:py-4">
          <div role="radiogroup" aria-label="Listing status" className="flex flex-none rounded-full bg-white p-1 ring-1 ring-ink/12">
            {(
              [
                ["", "All"],
                ["sale", "For sale"],
                ["rent", "For rent"],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={filters.status === v}
                onClick={() => update({ status: v })}
                className={`min-h-9 cursor-pointer rounded-full px-3.5 text-[14px] whitespace-nowrap sm:px-4 font-semibold transition-colors ${
                  filters.status === v ? "bg-ink text-paper" : "text-stone hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <FilterSelect label="Location" value={filters.location} onChange={(v) => update({ location: v })}>
            <option value="">All locations</option>
            {LOCATIONS.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="Property type" value={filters.type} onChange={(v) => update({ type: v })}>
            <option value="">All types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </FilterSelect>
          <FilterSelect label="Bedrooms" value={filters.beds ? String(filters.beds) : ""} onChange={(v) => update({ beds: Number(v) || 0 })}>
            <option value="">Any beds</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+ beds
              </option>
            ))}
          </FilterSelect>
          {filters.status && (
            <FilterSelect label="Maximum price" value={filters.max ? String(filters.max) : ""} onChange={(v) => update({ max: Number(v) || 0 })}>
              <option value="">{filters.status === "rent" ? "Any rent" : "Any price"}</option>
              {PRICE_OPTIONS[filters.status].map((o) => (
                <option key={o.value} value={o.value}>
                  Up to {o.label}
                  {filters.status === "rent" ? " / mo" : ""}
                </option>
              ))}
            </FilterSelect>
          )}

          <div className="flex flex-none items-center gap-3 sm:ml-auto">
            {active && (
              <button
                type="button"
                onClick={() => update({ status: "", location: "", type: "", beds: 0, max: 0 })}
                className="min-h-11 cursor-pointer rounded-full px-3 text-[14px] font-semibold text-gold-deep underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="bg-paper pt-12 pb-28" aria-live="polite" aria-busy={pending}>
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[14.5px] text-stone">
              <span className="mr-1 text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">{results.length}</span> {results.length === 1 ? "property" : "properties"}
              {filters.location && <> in {LOCATIONS.find((l) => l.slug === filters.location)?.name}</>}
            </p>
              <FilterSelect label="Sort by" value={filters.sort} onChange={(v) => update({ sort: v as Filters["sort"] })}>
                <option value="featured">Featured first</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </FilterSelect>
          </div>

          {results.length ? (
            <div className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-12 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 ${pending ? "opacity-60" : ""}`}>
              {results.map((p, i) => (
                <div key={p.slug} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                  <PropertyCard p={p} priority={i < 3} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-16 max-w-lg py-16 text-center">
              <Icon name="search" className="mx-auto h-8 w-8 text-gold" />
              <h2 className="mt-6 text-[1.9rem] leading-tight font-semibold tracking-[-0.03em]">No exact matches — yet.</h2>
              <p className="mt-4 text-stone">
                New homes come to us before they reach the market. Tell us what you’re looking for and we’ll be in touch.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-dark">
                  Tell us what you need
                </Link>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  WhatsApp us
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterSelect({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="relative flex-none">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`select-box h-11 w-auto rounded-full pl-4 text-[14px] ${value ? "border-ink/50 font-semibold" : ""}`}>
        {children}
      </select>
    </label>
  );
}

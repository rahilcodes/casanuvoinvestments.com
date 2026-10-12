import type { ListingStatus, Property } from "@/lib/properties";

/** Max-price options: GYD for sales, USD per month for rentals. */
export const PRICE_OPTIONS: Record<ListingStatus, { value: number; label: string }[]> = {
  sale: [
    { value: 50_000_000, label: "GYD $50M" },
    { value: 75_000_000, label: "GYD $75M" },
    { value: 100_000_000, label: "GYD $100M" },
    { value: 150_000_000, label: "GYD $150M" },
    { value: 250_000_000, label: "GYD $250M" },
  ],
  rent: [
    { value: 1_500, label: "US$1,500" },
    { value: 2_500, label: "US$2,500" },
    { value: 3_500, label: "US$3,500" },
    { value: 5_000, label: "US$5,000" },
    { value: 10_000, label: "US$10,000" },
    { value: 20_000, label: "US$20,000" },
  ],
};

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export interface Filters {
  status: "" | ListingStatus;
  location: string;
  type: string;
  beds: number;
  max: number;
  sort: SortKey;
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export function parseFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const status = first(sp.status);
  const sort = first(sp.sort);
  return {
    status: status === "sale" || status === "rent" ? status : "",
    location: first(sp.location),
    type: first(sp.type),
    beds: Number(first(sp.beds)) || 0,
    max: Number(first(sp.max)) || 0,
    sort: (["featured", "price-asc", "price-desc", "newest"] as const).includes(sort as SortKey) ? (sort as SortKey) : "featured",
  };
}

export function applyFilters(list: Property[], f: Filters) {
  const out = list.filter(
    (p) =>
      (!f.status || p.status === f.status) &&
      (!f.location || p.location === f.location) &&
      (!f.type || p.type === f.type) &&
      (!f.beds || p.beds >= f.beds) &&
      // A max price only makes sense within one currency.
      (!f.max || !f.status || p.price <= f.max),
  );
  const rank = (p: Property) => (p.labels.length ? 2 : 0) + (p.images.length ? 1 : 0);
  switch (f.sort) {
    case "price-asc":
      return out.sort((a, b) => a.status.localeCompare(b.status) || a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => a.status.localeCompare(b.status) || b.price - a.price);
    case "newest":
      return out.sort((a, b) => b.listed.localeCompare(a.listed));
    default:
      return out.sort((a, b) => rank(b) - rank(a));
  }
}

export function filtersToQuery(f: Filters) {
  const q = new URLSearchParams();
  if (f.status) q.set("status", f.status);
  if (f.location) q.set("location", f.location);
  if (f.type) q.set("type", f.type);
  if (f.beds) q.set("beds", String(f.beds));
  if (f.max && f.status) q.set("max", String(f.max));
  if (f.sort !== "featured") q.set("sort", f.sort);
  return q.toString();
}

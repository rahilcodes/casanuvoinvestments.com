import type { Property } from "@/lib/properties";
import { LOCATIONS } from "@/lib/site";

/** GYD sale prices in millions ("GYD $150M"), USD rents per month ("US$2,500"). */
export function formatPrice(p: Pick<Property, "status" | "price">) {
  if (p.status === "sale") {
    const m = p.price / 1_000_000;
    return `GYD $${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  return `US$${p.price.toLocaleString("en-US")}`;
}

export function priceSuffix(p: Pick<Property, "status">) {
  return p.status === "rent" ? "/ month" : "";
}

export function statusLabel(p: Pick<Property, "status">) {
  return p.status === "sale" ? "For Sale" : "For Rent";
}

export function locationName(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug)?.name ?? slug;
}

export function plural(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

import type { MetadataRoute } from "next";
import { INSIGHTS } from "@/lib/insights";
import { PROPERTIES } from "@/lib/properties";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/commercial", "/about", "/properties", "/insights", "/contact", "/terms"].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const properties = PROPERTIES.map((p) => ({
    url: `${SITE.url}/properties/${p.slug}`,
    lastModified: p.listed,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const insights = INSIGHTS.map((a) => ({ url: `${SITE.url}/insights/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.5 }));
  return [...pages, ...properties, ...insights];
}

import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ListingsExplorer } from "@/components/listings/ListingsExplorer";
import { PageHero } from "@/components/PageHero";
import { parseFilters } from "@/lib/search";
import { LOCATIONS } from "@/lib/site";

function heading(status: string, location: string) {
  const where = LOCATIONS.find((l) => l.slug === location)?.name;
  const what = status === "sale" ? "Homes for sale" : status === "rent" ? "Homes for rent" : "Residential properties";
  return { what, where };
}

export async function generateMetadata({ searchParams }: PageProps<"/properties">): Promise<Metadata> {
  const f = parseFilters(await searchParams);
  const { what, where } = heading(f.status, f.location);
  return {
    title: where ? `${what} in ${where}` : what,
    description: `${what}${where ? ` in ${where}` : ""}, Guyana, from Casa Nuvo Investments. Furnished rentals and homes for sale across Georgetown and Demerara. Looking for warehouses, land or offices? See our commercial services.`,
    alternates: { canonical: "/properties" },
  };
}

export default async function PropertiesPage({ searchParams }: PageProps<"/properties">) {
  const filters = parseFilters(await searchParams);
  const { what, where } = heading(filters.status, filters.location);
  return (
    <>
      <PageHero
        eyebrow="Residential listings"
        crumbs={[{ label: "Properties" }]}
        image={filters.status === "rent" ? "/images/properties/happy-acres-property-2.jpg" : "/images/properties/green-acres-property-2.jpg"}
        title={
          where ? (
            <>
              {what} <em className="text-gold-bright italic">in {where}</em>
            </>
          ) : (
            <>
              {what.split(" ").slice(0, -1).join(" ")} <em className="text-gold-bright italic">{what.split(" ").slice(-1)}</em>
            </>
          )
        }
        intro="Homes for sale and furnished rentals across Georgetown, East Bank, East Coast and West Bank Demerara. Sale prices in Guyanese dollars; rentals are monthly, in US dollars."
      >
        <Link href="/commercial" className="pill-glass min-h-11 text-[14px]">
          <Icon name="warehouse" className="h-4 w-4 text-gold" strokeWidth={1.8} /> Looking for warehouses, land or offices? <span className="text-gold-bright">Commercial</span>
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </PageHero>
      <ListingsExplorer initial={filters} />
    </>
  );
}

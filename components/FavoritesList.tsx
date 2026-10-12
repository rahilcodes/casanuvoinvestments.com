"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PropertyCard } from "@/components/PropertyCard";
import { useFavorites } from "@/lib/favorites";
import { PROPERTIES } from "@/lib/properties";

export function FavoritesList() {
  const slugs = useFavorites();
  const saved = PROPERTIES.filter((p) => slugs.includes(p.slug));

  if (!saved.length) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-pale text-gold-deep">
          <Icon name="heart" className="h-7 w-7" />
        </span>
        <h2 className="mt-8 text-[2rem] leading-tight font-semibold tracking-[-0.035em] text-ink">No favorites yet</h2>
        <p className="mt-4 text-stone">Tap the heart on any property to keep it here for later. Favorites are saved on this device.</p>
        <Link href="/properties" className="btn-dark mt-10">
          Browse properties <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-[14.5px] text-stone">
        <span className="mr-1 text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">{saved.length}</span> saved {saved.length === 1 ? "property" : "properties"}
      </p>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((p) => (
          <PropertyCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}

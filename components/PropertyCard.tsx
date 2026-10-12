import { ListingTile } from "@/components/ListingTile";
import type { Property } from "@/lib/properties";

/** Listing card for result grids (search, favorites, similar listings). */
export function PropertyCard({
  p,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority,
}: {
  p: Property;
  sizes?: string;
  priority?: boolean;
}) {
  return <ListingTile p={p} sizes={sizes} preload={priority} />;
}

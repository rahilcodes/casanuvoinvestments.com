import type { Metadata } from "next";
import { FavoritesList } from "@/components/FavoritesList";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved Casa Nuvo properties.",
  robots: { index: false },
};

export default function FavoritesPage() {
  return (
    <>
      <PageHero
        eyebrow="Your shortlist"
        crumbs={[{ label: "Favorites" }]}
        title={
          <>
            Favorite <em className="text-gold-bright italic">properties</em>
          </>
        }
      />
      <section className="bg-paper py-16 pb-28">
        <div className="wrap">
          <FavoritesList />
        </div>
      </section>
    </>
  );
}

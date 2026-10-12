"use client";

import { Icon } from "@/components/Icon";
import { useFavorite } from "@/lib/favorites";

export function FavoriteButton({ slug, title, variant = "overlay" }: { slug: string; title: string; variant?: "overlay" | "outline" }) {
  const [saved, toggle] = useFavorite(slug);
  const base =
    variant === "overlay"
      ? "h-11 w-11 bg-ink/40 text-paper backdrop-blur-md hover:bg-ink/70"
      : "h-12 w-12 border border-line text-ink hover:border-gold";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from favorites` : `Save ${title} to favorites`}
      className={`grid cursor-pointer place-items-center rounded-full transition-all duration-300 ${base}`}
    >
      <Icon
        name="heart"
        className={`h-[19px] w-[19px] transition-transform duration-300 ${saved ? "scale-110 fill-gold text-gold" : ""}`}
        strokeWidth={1.7}
      />
    </button>
  );
}

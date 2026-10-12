"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { FavoriteButton } from "@/components/FavoriteButton";

export function ShareActions({ slug, title, url }: { slug: string; title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title} — Casa Nuvo Investments ${url}`);
  const btn = "grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line text-ink no-underline transition-colors hover:border-gold hover:text-gold-deep";

  return (
    <div className="flex items-center gap-2">
      <FavoriteButton slug={slug} title={title} variant="outline" />
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp (opens in a new tab)" className={btn}>
        <Icon name="whatsapp" className="h-[18px] w-[18px]" />
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook (opens in a new tab)" className={btn}>
        <Icon name="facebook" className="h-[18px] w-[18px]" />
      </a>
      <button
        type="button"
        className={btn}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable */
          }
        }}
      >
        <Icon name={copied ? "check" : "link"} className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

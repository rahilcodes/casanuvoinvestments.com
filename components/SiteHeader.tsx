"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { useFavorites } from "@/lib/favorites";
import { SITE } from "@/lib/site";

/** Primary navigation: commercial (the core business) first, then residential, selling and the company. */
const LINKS = [
  { label: "Commercial", href: "/commercial" },
  { label: "Buy", href: "/properties?status=sale" },
  { label: "Rent", href: "/properties?status=rent" },
  { label: "Sell", href: "/contact?topic=sell" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const favorites = useFavorites();
  const menuId = useId();

  // Close the menu on navigation (derived-state reset during render).
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Solid once scrolled; slides away while scrolling down, returns on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Publish the header's current height (0 while it is slid away) so sticky bars,
  // such as the listings filters, can pin directly beneath it.
  useEffect(() => {
    const h = hidden && !open ? 0 : scrolled ? 72 : 88;
    document.documentElement.style.setProperty("--header-offset", `${h}px`);
  }, [hidden, open, scrolled]);

  // Query-string links (Buy / Rent / Sell) share a pathname, so only plain routes get a current state.
  const isActive = (href: string) => !href.includes("?") && (pathname === href || pathname.startsWith(href + "/"));
  // Transparent with light text over the dark page heroes; a light glass bar once scrolled.
  const light = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,translate] duration-700 ease-[var(--ease-luxe)] ${
          open ? "border-b border-white/10 bg-ink" : light ? "border-b border-ink/8 bg-paper/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className={`wrap flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-[72px]" : "h-[88px]"}`}>
          <Link href="/" aria-label={`${SITE.name} home`} className="flex-none no-underline">
            <Logo tone={light ? "dark" : "light"} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className={`flex items-center gap-1 rounded-full p-1 ring-1 transition-colors duration-500 ${light ? "bg-ink/[0.03] ring-ink/8" : "bg-white/[0.06] ring-white/10 backdrop-blur-md"}`}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 text-[14px] font-medium no-underline transition-colors ${
                      light
                        ? "text-ink/70 hover:bg-ink/[0.06] hover:text-ink aria-[current=page]:bg-ink/[0.07] aria-[current=page]:text-ink"
                        : "text-paper/80 hover:bg-white/10 hover:text-paper aria-[current=page]:bg-white/12 aria-[current=page]:text-paper"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={SITE.phoneUSHref}
              className={`mr-2 hidden items-center gap-2 text-[14px] font-medium no-underline transition-colors xl:flex ${light ? "text-ink/75 hover:text-ink" : "text-paper/80 hover:text-paper"}`}
            >
              <Icon name="phone" className={`h-4 w-4 ${light ? "text-gold-deep" : "text-gold"}`} />
              {SITE.phoneUS}
            </a>
            <Link
              href="/favorites"
              aria-label={`Favorites (${favorites.length})`}
              className={`relative grid h-11 w-11 place-items-center rounded-full no-underline transition-colors ${light ? "text-ink/80 hover:bg-ink/[0.06] hover:text-ink" : "text-paper/85 hover:bg-white/10 hover:text-paper"}`}
            >
              <Icon name="heart" className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9.5px] font-bold text-ink">{favorites.length}</span>
              )}
            </Link>
            <Link href="/contact" className="pill-gold hidden min-h-11 px-5 text-[14px] sm:inline-flex">
              Book a consultation
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={`grid h-11 w-11 cursor-pointer place-items-center lg:hidden ${light ? "text-ink" : "text-paper"}`}
            >
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: outside <header>, whose backdrop-filter would otherwise contain this fixed panel. */}
      <div id={menuId} hidden={!open} className="fixed inset-x-0 bottom-0 z-[45] overflow-y-auto bg-ink lg:hidden" style={{ top: scrolled ? 72 : 88 }}>
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col py-8">
          <ul className="flex flex-col">
            {[{ label: "Home", href: "/" }, ...LINKS, { label: "All properties", href: "/properties" }, { label: "Favorites", href: "/favorites" }, { label: "Contact", href: "/contact" }].map((l, i) => (
              <li key={l.href} className="border-b border-white/10" style={{ animation: `fade-up .7s var(--ease-luxe) ${i * 45}ms both` }}>
                <Link href={l.href} className="flex items-center justify-between py-4 text-[1.6rem] font-medium tracking-[-0.03em] text-paper no-underline hover:text-gold">
                  {l.label}
                  <Icon name="arrow" className="h-5 w-5 text-gold" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10 text-[15px] text-paper/75">
            <a href={SITE.phoneUSHref} className="text-paper/75 no-underline">
              {SITE.phoneUS}
            </a>
            <a href={SITE.phoneGYHref} className="text-paper/75 no-underline">
              {SITE.phoneGY}
            </a>
            <a href={SITE.emailHref} className="break-all text-paper/75 no-underline">
              {SITE.email}
            </a>
            <Link href="/contact" className="pill-gold mt-4">
              Book a consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

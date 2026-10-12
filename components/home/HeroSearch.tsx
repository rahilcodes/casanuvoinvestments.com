"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { COMMERCIAL_INTENTS, LOCATIONS, SECTORS } from "@/lib/site";
import { PROPERTY_TYPES } from "@/lib/properties";
import { PRICE_OPTIONS } from "@/lib/search";

type Tab = "commercial" | "buy" | "rent" | "sell";
const TABS: { id: Tab; label: string; short?: string }[] = [
  { id: "commercial", label: "Commercial" },
  { id: "buy", label: "Buy a home", short: "Buy" },
  { id: "rent", label: "Rent a home", short: "Rent" },
  { id: "sell", label: "Sell", short: "Sell" },
];

/**
 * Hero search: a segmented Commercial / Buy / Rent / Sell switch over one rounded bar.
 * Commercial (the default, the core of the business) opens a pre-filled
 * commercial enquiry on /contact; Buy / Rent search the residential listings on
 * /properties (GYD / USD per month); Sell sends the owner to the contact page
 * with their address pre-filled. Plain GET forms, so they
 * also work before hydration. Fields appear as width allows: Location on
 * phones, then type and price, then bedrooms; the full filters live on /properties.
 */
export function HeroSearch() {
  const [tab, setTab] = useState<Tab>("commercial");
  const [sector, setSector] = useState("");
  const [intent, setIntent] = useState<string>(COMMERCIAL_INTENTS[0].value);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [max, setMax] = useState("");
  const [beds, setBeds] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectTab = (t: Tab) => {
    setTab(t);
    setMax("");
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    selectTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "commercial") {
      const q = new URLSearchParams(Object.entries({ topic: "commercial", sector, intent, location }).filter(([, v]) => v));
      router.push(`/contact?${q}`);
      return;
    }
    if (tab === "sell") {
      const q = new URLSearchParams({ topic: "sell" });
      if (address.trim()) q.set("address", address.trim());
      router.push(`/contact?${q}`);
      return;
    }
    const q = new URLSearchParams(Object.entries({ status: tab === "buy" ? "sale" : "rent", location, type, beds, max }).filter(([, v]) => v));
    router.push(`/properties?${q}`);
  };

  const prices = tab === "buy" ? PRICE_OPTIONS.sale : tab === "rent" ? PRICE_OPTIONS.rent : [];

  return (
    <div className="w-full max-w-[1000px]">
      <div role="tablist" aria-label="What would you like to do?" className="inline-flex rounded-full bg-black/35 p-1 ring-1 ring-white/15 backdrop-blur-md">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`${id}-panel`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => selectTab(t.id)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={`h-9 cursor-pointer rounded-full px-3.5 text-[14px] font-semibold transition-colors duration-300 sm:px-5 ${
              tab === t.id ? "bg-white text-ink" : "text-paper/80 hover:text-paper"
            }`}
          >
            {t.short ? (
              <>
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </>
            ) : (
              t.label
            )}
          </button>
        ))}
      </div>

      <form
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${tab}`}
        action={tab === "sell" || tab === "commercial" ? "/contact" : "/properties"}
        method="get"
        onSubmit={submit}
        className="mt-3 flex flex-col gap-1 rounded-[22px] bg-white p-2 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] sm:flex-row sm:items-center sm:rounded-full"
      >
        {tab === "commercial" ? (
          <>
            <input type="hidden" name="topic" value="commercial" />
            <Field label="Property type">
              <select name="sector" value={sector} onChange={(e) => setSector(e.target.value)} className={selectCls}>
                <option value="">Any commercial property</option>
                {SECTORS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Divider />
            <Field label="Looking to" className="hidden sm:flex">
              <select name="intent" value={intent} onChange={(e) => setIntent(e.target.value)} className={selectCls}>
                {COMMERCIAL_INTENTS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
            <Divider className="hidden lg:block" />
            <Field label="Location" className="hidden lg:flex">
              <select name="location" value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls}>
                <option value="">Anywhere in Guyana</option>
                {LOCATIONS.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>
            <SubmitButton>Start enquiry</SubmitButton>
          </>
        ) : tab === "sell" ? (
          <>
            <input type="hidden" name="topic" value="sell" />
            <label className="flex min-w-0 flex-1 flex-col justify-center rounded-[16px] px-5 py-2.5 focus-within:bg-ink/[0.04] sm:rounded-full sm:px-6">
              <span className="text-[11.5px] font-semibold text-stone">Your property</span>
              <input
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address or neighbourhood"
                autoComplete="street-address"
                className="w-full min-w-0 bg-transparent text-[15px] font-medium text-ink outline-none placeholder:text-stone-2"
              />
            </label>
            <SubmitButton>Get a valuation</SubmitButton>
          </>
        ) : (
          <>
            <input type="hidden" name="status" value={tab === "buy" ? "sale" : "rent"} />
            <Field label="Location">
              <select name="location" value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls}>
                <option value="">All of Guyana</option>
                {LOCATIONS.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>
            <Divider />
            <Field label="Property type" className="hidden sm:flex">
              <select name="type" value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
                <option value="">Any type</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Divider />
            <Field label="Bedrooms" className="hidden lg:flex">
              <select name="beds" value={beds} onChange={(e) => setBeds(e.target.value)} className={selectCls}>
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}+ beds
                  </option>
                ))}
              </select>
            </Field>
            <Divider className="hidden lg:block" />
            <Field label={tab === "rent" ? "Monthly rent" : "Budget"} className="hidden sm:flex">
              <select name="max" value={max} onChange={(e) => setMax(e.target.value)} className={selectCls}>
                <option value="">Any price</option>
                {prices.map((o) => (
                  <option key={o.value} value={o.value}>
                    Up to {o.label}
                    {tab === "rent" ? " / mo" : ""}
                  </option>
                ))}
              </select>
            </Field>
            <SubmitButton>Search</SubmitButton>
          </>
        )}
      </form>
    </div>
  );
}

const selectCls = "w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent pr-6 text-[15px] font-medium text-ink outline-none";

function Field({ label, className = "flex", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label
      className={`relative min-w-0 flex-1 cursor-pointer flex-col justify-center rounded-[16px] px-5 py-2.5 transition-colors hover:bg-ink/[0.04] focus-within:bg-ink/[0.04] sm:rounded-full sm:px-6 ${className}`}
    >
      <span className="text-[11.5px] font-semibold text-stone">{label}</span>
      {children}
      <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute right-5 bottom-[17px] h-2 w-3 text-stone sm:right-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="m1 1.5 5 5 5-5" />
      </svg>
    </label>
  );
}

function Divider({ className = "hidden sm:block" }: { className?: string }) {
  return <span aria-hidden="true" className={`h-8 w-px flex-none bg-ink/10 ${className}`} />;
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="flex h-14 flex-none cursor-pointer items-center justify-center gap-2.5 rounded-[16px] bg-gold px-7 text-[15px] font-semibold text-ink transition-colors hover:bg-gold-bright sm:rounded-full"
    >
      <Icon name="search" className="h-[18px] w-[18px]" strokeWidth={2} />
      {children}
    </button>
  );
}

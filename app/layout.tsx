import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/site";

// Self-hosted (Latin subset) so builds never depend on reaching Google Fonts.
const manrope = localFont({
  src: "./fonts/manrope-variable.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GY",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0b",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/brand/casa-nuvo-emblem.png`,
  image: `${SITE.url}/brand/casa-nuvo-emblem.png`,
  email: SITE.email,
  telephone: [SITE.phoneUS, SITE.phoneGY],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: `${SITE.address.area}, ${SITE.address.city}`,
    addressCountry: "GY",
  },
  areaServed: ["Georgetown", "East Bank Demerara", "East Coast Demerara", "West Bank Demerara"],
  knowsAbout: ["Commercial real estate", "Warehouses", "Industrial property", "Commercial land", "Office buildings", "Commercial leasing", "Residential real estate"],
  sameAs: [SITE.social.facebook, SITE.social.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <noscript>
          <style>{`.reveal,.reveal-lines .line>span,.reveal-clip img{opacity:1!important;transform:none!important}.reveal-clip{clip-path:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Casa Nuvo on WhatsApp (opens in a new tab)"
          className="group fixed right-4 bottom-4 z-40 flex h-13 items-center sm:right-5 sm:bottom-5 gap-0 overflow-hidden rounded-full bg-ink pr-4 pl-4 text-paper no-underline shadow-[0_14px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/12 transition-all duration-500 hover:gap-3 hover:pr-6"
        >
          <Icon name="whatsapp" className="h-5 w-5 flex-none text-gold" strokeWidth={1.8} />
          <span className="max-w-0 overflow-hidden text-[14px] font-semibold whitespace-nowrap transition-all duration-500 group-hover:max-w-44">
            Chat on WhatsApp
          </span>
        </a>
      </body>
    </html>
  );
}

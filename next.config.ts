import type { NextConfig } from "next";

/**
 * Legacy WordPress (Houzez) URLs from the original casanuvoinvestments.com,
 * permanently redirected so old links, bookmarks and search results keep working.
 */
const LEGACY_PROPERTY_SLUGS: Record<string, string> = {
  "comfortable-apartment-bay-view": "lusignan-two-story",
  "luxury-apartment-ocean-view-3": "republic-park-two-story",
  "ample-apartment": "windsor-estate-duplex",
  "ample-penthouse": "duncan-street-property",
  "luxury-family-home-4": "subryanville-4th-avenue",
  "la-parfaite-harmonie-two-bedrooms": "la-parfaite-harmonie-two-bedroom",
  "gorgeous-villa": "la-parfaite-harmonie-one-bedroom",
  "windor-estate-townhouse": "windsor-estate-townhouse",
  "windsor-estate-single-family": "windsor-estate-single-family",
  "republic-park-townhouse": "republic-park-townhouse",
  "modern-office-space": "green-acres-property",
  "luxury-family-home-3": "happy-acres-property",
  "contemporary-apartment-3": "atlantic-towers",
  "gorgeous-villa-for-sale": "garnett-street-studio-rooms",
  "apartment-building-for-rent-providence-e-b-d": "providence-apartment-building",
  "bel-air-park-residence-for-rent": "bel-air-park-residence",
  "condo-for-rent-windsor-estates-e-b-d": "windsor-estates-condo",
  "property-for-rent-nabi-housing-scheme-e-b-d-gated-community": "nabi-housing-scheme-residence",
  "prospect-residence-copy": "daguiar-park-residence",
  "prospect-residence": "prospect-residence",
};

const nextConfig: NextConfig = {
  images: {
    // Hero photography from Unsplash (free licence), optimised through next/image.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*", search: "" }],
  },
  async redirects() {
    return [
      ...Object.entries(LEGACY_PROPERTY_SLUGS).map(([from, to]) => ({
        source: `/property/${from}`,
        destination: `/properties/${to}`,
        permanent: true,
      })),
      { source: "/current-listings", destination: "/properties", permanent: true },
      { source: "/status/for-sale", destination: "/properties?status=sale", permanent: true },
      { source: "/status/for-rent", destination: "/properties?status=rent", permanent: true },
      { source: "/city/:region", destination: "/properties?location=:region", permanent: true },
      { source: "/label/:label", destination: "/properties", permanent: true },
      { source: "/favorite-properties", destination: "/favorites", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/author/:name", destination: "/about", permanent: true },
      { source: "/your-perfect-home-awaits", destination: "/insights/your-perfect-home-awaits", permanent: true },
      { source: "/the-latest-in-real-estate-trends", destination: "/insights/the-latest-in-real-estate-trends", permanent: true },
      { source: "/maximizing-your-investments", destination: "/insights/maximizing-your-investments", permanent: true },
      { source: "/simplifying-your-property-journey", destination: "/insights/simplifying-your-property-journey", permanent: true },
    ];
  },
};

export default nextConfig;

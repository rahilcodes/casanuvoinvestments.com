/**
 * Site-wide facts in one place. Source: the archived casanuvoinvestments.com
 * (Wayback Machine, 8 Oct 2025). Change a value here and it updates everywhere.
 */
export const SITE = {
  name: "Casa Nuvo Investments",
  shortName: "Casa Nuvo",
  tagline: "Commercial Real Estate in Guyana",
  url: "https://casanuvoinvestments.com",
  description:
    "Casa Nuvo Investments is a commercial real estate brokerage in Guyana. Warehouses, commercial land and office buildings for sale and lease, plus a select residential portfolio across Georgetown and Demerara.",
  phoneUS: "+1 (954) 326-9537",
  phoneUSHref: "tel:+19543269537",
  phoneGY: "+592 643-5948",
  phoneGYHref: "tel:+5926435948",
  whatsapp: "https://wa.me/5926435948",
  email: "casanuvoinvestments1@gmail.com",
  emailHref: "mailto:casanuvoinvestments1@gmail.com",
  address: {
    street: "262 Fifth Street & Earls Avenue",
    area: "Subryanville",
    city: "Georgetown",
    country: "Guyana",
  },
  mapQuery: "Fifth Street and Earls Avenue, Subryanville, Georgetown, Guyana",
  social: {
    facebook: "https://www.facebook.com/casanuvoinvestments1/",
    instagram: "https://www.instagram.com/casa_nuvo_investments_1/",
  },
} as const;

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.area}, ${SITE.address.city}, ${SITE.address.country}`;

/**
 * The founder pictured on the home page. The original site gave no name;
 * set `name` once the client confirms it and it appears under the portrait.
 */
export const FOUNDER = {
  name: "",
  role: "Founder & Owner, Casa Nuvo Investments",
} as const;

/** "Our Stats" from the original home page. */
export const STATS = [
  { label: "In property sold", count: 1, prefix: "", suffix: "B+", unit: "GYD" },
  { label: "Team in Guyana", count: 1, prefix: "#", suffix: "", unit: "" },
  { label: "For client service", count: 1, prefix: "#", suffix: "", unit: "" },
  { label: "Clients served", count: 300, prefix: "", suffix: "+", unit: "" },
] as const;

export const LOCATIONS = [
  {
    slug: "georgetown",
    name: "Georgetown",
    blurb: "The capital’s most established addresses, from Subryanville to Bel Air Park.",
    image: "/images/st-georges-cathedral.jpg",
  },
  {
    slug: "east-bank-demerara",
    name: "East Bank Demerara",
    blurb: "Gated communities and family homes in Providence, Prospect and Peter’s Hall.",
    image: "/images/properties/green-acres-property-2.jpg",
  },
  {
    slug: "east-coast-demerara",
    name: "East Coast Demerara",
    blurb: "Spacious residences in Lusignan and Happy Acres, minutes from the city.",
    image: "/images/properties/happy-acres-property-1.jpg",
  },
  {
    slug: "west-bank-demerara",
    name: "West Bank Demerara",
    blurb: "Quiet, fully serviced apartments in La Parfaite Harmonie.",
    image: "/images/properties/la-parfaite-harmonie-one-bedroom-1.jpg",
  },
] as const;

export type LocationSlug = (typeof LOCATIONS)[number]["slug"];

export const NAV = [
  { label: "Commercial", href: "/commercial" },
  { label: "Residential", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * What Casa Nuvo brokers, commercial first: the client is a commercial broker
 * and residential is the smaller part of the business. Commercial enquiries go
 * to /contact?topic=commercial&sector=<slug>.
 *
 * Photography is free-licence Unsplash (unsplash.com/license), illustrative
 * only, not Casa Nuvo listings. Replace with the client's own photos when supplied:
 * - Loading docks ............... unsplash.com/photos/SJGC3NNOqU4 (photo-1780367261654)
 * - Empty warehouse interior .... photo-1772300704502
 * - Green land from above ....... photo-1685017399191
 * - Office building at dusk ..... photo-1574958269340
 * - Glass office building ....... photo-1773637780517
 * - Industrial park from above .. photo-1758304481551
 * - Commercial building at dusk . photo-1599580546666
 * - Commercial development aerial photo-1669003154621
 */
export const SECTORS = [
  {
    slug: "warehouses",
    seeking: "warehouse or industrial space",
    owned: "warehouse or industrial property",
    name: "Warehouses & Industrial",
    short: "Warehouses",
    tags: "Warehouses · Distribution · Yards",
    icon: "warehouse",
    blurb: "Warehouses, storage yards and light-industrial buildings for sale and lease, for logistics, distribution and supply businesses.",
    points: ["Warehouses and distribution space", "Storage yards and laydown areas", "Light-industrial and workshop buildings", "Build-to-suit warehouses"],
    image: "https://images.unsplash.com/photo-1780367261654-45395777b560",
    detailImage: "https://images.unsplash.com/photo-1772300704502-410f0fbd43bb",
  },
  {
    slug: "land",
    seeking: "commercial land",
    owned: "commercial land",
    name: "Commercial Land",
    short: "Land",
    tags: "Lots · Development sites · Corridor frontage",
    icon: "land",
    blurb: "Commercial lots and development sites along Guyana’s main corridors, for warehouses, retail, offices or a project of your own.",
    points: ["Commercial and mixed-use lots", "Industrial and development sites", "Road-frontage and corridor land", "Land for investment and land banking"],
    image: "https://images.unsplash.com/photo-1685017399191-e49325a1e77e",
    detailImage: "https://images.unsplash.com/photo-1758304481551-25138093050b",
  },
  {
    slug: "office",
    seeking: "an office building or office space",
    owned: "office building",
    name: "Office Buildings",
    short: "Offices",
    tags: "Buildings · Floors · Headquarters",
    icon: "office",
    blurb: "Whole office buildings and office floors in Georgetown and beyond, for owner-occupiers, investors and companies setting up in Guyana.",
    points: ["Whole office buildings", "Office floors and suites", "Corporate headquarters", "Owner-occupier and investor buildings"],
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd",
    detailImage: "https://images.unsplash.com/photo-1773637780517-d9beab4419a4",
  },
  {
    slug: "investment",
    seeking: "income-producing investment property",
    owned: "investment property",
    name: "Investment Property",
    short: "Investments",
    tags: "Tenanted assets · Mixed-use · Portfolios",
    icon: "chart",
    blurb: "Tenanted warehouses, office buildings and mixed-use property for investors who want rental income and long-term value in Guyana’s growing market.",
    points: ["Tenanted commercial buildings", "Mixed-use and retail property", "Portfolio acquisitions and sales", "Sale-and-leaseback opportunities"],
    image: "https://images.unsplash.com/photo-1669003154621-c7599510ae25",
    detailImage: "https://images.unsplash.com/photo-1599580546666-c26f15e00933",
  },
] as const;

export type SectorSlug = (typeof SECTORS)[number]["slug"];

/** Home-page hero slides, commercial first (same Unsplash sources as SECTORS). */
export const HERO_SLIDES = [
  { src: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd", position: "object-[60%_55%]" },
  { src: "https://images.unsplash.com/photo-1758304481551-25138093050b", position: "object-[50%_50%]" },
  { src: "https://images.unsplash.com/photo-1780367261654-45395777b560", position: "object-[50%_55%]" },
  { src: "https://images.unsplash.com/photo-1773637780517-d9beab4419a4", position: "object-[50%_40%]" },
  { src: "https://images.unsplash.com/photo-1685017399191-e49325a1e77e", position: "object-[50%_50%]" },
] as const;

/** "Looking to" options for commercial enquiries (hero search and contact page). */
export const COMMERCIAL_INTENTS = [
  { value: "buy", label: "Buy", phrase: "buy" },
  { value: "lease", label: "Lease", phrase: "lease" },
  { value: "sell", label: "Sell my property", phrase: "sell" },
  { value: "lease-out", label: "Lease out my property", phrase: "lease out" },
] as const;

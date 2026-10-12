import type { LocationSlug } from "@/lib/site";

/**
 * Casa Nuvo listings, rebuilt from the archived WordPress (Houzez) site.
 *
 * Sale prices are in Guyanese dollars. Rentals are monthly and in US dollars:
 * the original cards showed "GYD" on rentals, but every listing description
 * states the rent in USD per month, so USD is used here.
 */

export type ListingStatus = "sale" | "rent";
export type ListingLabel = "Hot Offer" | "Open House" | "Featured";

export interface Property {
  slug: string;
  title: string;
  status: ListingStatus;
  /** Sale: GYD. Rent: USD per month. */
  price: number;
  location: LocationSlug;
  neighborhood: string;
  address: string;
  type: string;
  beds: number;
  baths?: number;
  garage?: number;
  sqft?: number;
  labels: ListingLabel[];
  description: string[];
  amenities: string[];
  images: string[];
  /** Original Houzez property ID, kept for reference. */
  ref?: string;
  /** ISO date the listing was published on the original site (approximate). */
  listed: string;
}

const img = (slug: string, n = 1) => Array.from({ length: n }, (_, i) => `/images/properties/${slug}-${i + 1}.jpg`);

export const PROPERTIES: Property[] = [
  // ─── For sale ──────────────────────────────────────────────────────────
  {
    slug: "subryanville-4th-avenue",
    title: "Subryanville — 4th Avenue",
    status: "sale",
    price: 150_000_000,
    location: "georgetown",
    neighborhood: "Subryanville",
    address: "Lot 262 Fifth Street & Earls Avenue, Subryanville, Georgetown",
    type: "Single Family Home",
    beds: 3,
    baths: 2,
    garage: 1,
    sqft: 1200,
    labels: ["Featured", "Open House"],
    description: [
      "This fixer-upper property in the high-end residential area of Subryanville offers great potential for buyers looking to renovate. Located on 4th Avenue, Georgetown, the property features a spacious yard and inside parking.",
      "With 3 bedrooms and 2 bathrooms, it’s ideal for those seeking a prime location to invest in or transform into their dream home. The property has an energy efficiency rating of E.",
    ],
    amenities: ["Spacious yard", "Inside parking", "Prime Subryanville address", "Renovation potential"],
    images: img("subryanville-4th-avenue"),
    ref: "HZHZ33",
    listed: "2024-12-01",
  },
  {
    slug: "duncan-street-property",
    title: "Duncan Street Property",
    status: "sale",
    price: 130_000_000,
    location: "east-coast-demerara",
    neighborhood: "Lusignan",
    address: "Lusignan, East Coast Demerara",
    type: "Single Family Home",
    beds: 5,
    baths: 3,
    garage: 1,
    sqft: 2450,
    labels: ["Featured", "Open House"],
    description: [
      "This fully furnished and air-conditioned property offers modern living with all the comforts you need. With 5 bedrooms and 3 bathrooms, it is ideal for large families.",
      "Additional amenities include parking, a backup generator, hot and cold showers, and a filtration and pressurized water system. With an energy efficiency rating of F, this property is a great opportunity for those seeking a well-equipped, move-in-ready home in a prime location.",
    ],
    amenities: ["Fully furnished", "Air conditioned", "Backup generator", "Hot & cold showers", "Filtration & pressurized water", "Parking"],
    images: img("duncan-street-property"),
    ref: "HZHZ08",
    listed: "2024-12-01",
  },
  {
    slug: "republic-park-two-story",
    title: "Republic Park — Two Story",
    status: "sale",
    price: 140_000_000,
    location: "east-bank-demerara",
    neighborhood: "Republic Park",
    address: "Republic Park, East Bank Demerara",
    type: "Single Family Home",
    beds: 2,
    baths: 2,
    garage: 1,
    sqft: 1749,
    labels: ["Hot Offer"],
    description: [
      "This two-story property in Republic Park, East Bank Demerara, features 2 bedrooms and a variety of amenities, including an office, laundry room, front verandah and a side patio.",
      "With a remote gate for security and plenty of parking space, this property is ideal for those seeking a functional and spacious home in a convenient location.",
    ],
    amenities: ["Home office", "Laundry room", "Front verandah", "Side patio", "Remote-controlled gate", "Ample parking"],
    images: img("republic-park-two-story"),
    ref: "HZHZ29",
    listed: "2024-12-01",
  },
  {
    slug: "windsor-estate-duplex",
    title: "Windsor Estate — Duplex",
    status: "sale",
    price: 75_000_000,
    location: "east-bank-demerara",
    neighborhood: "Windsor Estate, Peter’s Hall",
    address: "Windsor Estate, Peter’s Hall, East Bank Demerara",
    type: "Duplex",
    beds: 3,
    baths: 1,
    garage: 1,
    sqft: 2300,
    labels: ["Hot Offer"],
    description: [
      "This stunning duplex in Windsor Estate, Peter’s Hall, East Bank Demerara, is fully air-conditioned and includes a range of modern amenities, such as appliances, a front and back balcony, and an elevator.",
      "The compound is secured with gates for added privacy and safety. With an energy efficiency rating of B, the home also includes a washer, microwave and cable TV, making it a comfortable and convenient living space.",
    ],
    amenities: ["Air conditioned", "Front & back balconies", "Elevator", "Gated compound", "Washer", "Microwave", "Cable TV"],
    images: img("windsor-estate-duplex"),
    ref: "HZHZ05",
    listed: "2024-12-01",
  },
  {
    slug: "lusignan-two-story",
    title: "Lusignan — Two Story",
    status: "sale",
    price: 50_000_000,
    location: "east-coast-demerara",
    neighborhood: "Lusignan",
    address: "Lusignan, East Coast Demerara",
    type: "Single Family Home",
    beds: 4,
    baths: 2,
    garage: 1,
    sqft: 2180,
    labels: ["Hot Offer"],
    description: [
      "Located in Lusignan on the East Coast of Demerara, this spacious two-story property offers 4 bedrooms and 2 bathrooms with ample living space. It comes semi-furnished, featuring elegant tiled floors and a tiled front yard.",
      "Ideal for larger families or those who enjoy entertaining, the property provides parking for up to 5 vehicles. With an energy efficiency rating of H, this home is a great opportunity for those seeking comfort and value in a desirable neighborhood.",
    ],
    amenities: ["Semi-furnished", "Tiled floors throughout", "Tiled front yard", "Parking for 5 vehicles"],
    images: img("lusignan-two-story"),
    ref: "HZHZ11",
    listed: "2024-12-01",
  },

  // ─── For rent ──────────────────────────────────────────────────────────
  {
    slug: "happy-acres-property",
    title: "Happy Acres Residence",
    status: "rent",
    price: 9_000,
    location: "east-coast-demerara",
    neighborhood: "Happy Acres",
    address: "Happy Acres, East Coast Demerara",
    type: "Single Family Home",
    beds: 4,
    baths: 3.5,
    garage: 1,
    sqft: 3400,
    labels: ["Featured"],
    description: [
      "This beautiful, fully furnished property in Happy Acres, East Coast Demerara, features 4 bedrooms and 3.5 bathrooms and is designed for comfort and luxury, with a swimming pool, outdoor washroom facilities, a back patio and an office on the ground floor.",
      "It is equipped with modern conveniences, including a fully air-conditioned interior, hot and cold water, a filtration and pressurized water system and a laundry area. Remote gate control and security cameras ensure safety and peace of mind in this upscale residence.",
    ],
    amenities: ["Swimming pool", "Fully furnished", "Air conditioned", "Ground-floor office", "Back patio", "Security cameras", "Remote gate", "Laundry area"],
    images: img("happy-acres-property", 2),
    ref: "HZHZ10",
    listed: "2024-12-01",
  },
  {
    slug: "garnett-street-studio-rooms",
    title: "Garnett Street — Studio Rooms",
    status: "rent",
    price: 20_000,
    location: "georgetown",
    neighborhood: "Garnett Street",
    address: "Garnett Street, Georgetown",
    type: "Studio Rooms",
    beds: 22,
    baths: 22,
    garage: 1,
    sqft: 5280,
    labels: [],
    description: [
      "Located on Garnett Street in Georgetown, this property offers 22 fully furnished, air-conditioned studio rooms. Ideal for extended-stay guests or corporate housing, each studio is equipped with internet service, kitchen facilities and access to a laundry area.",
      "Additional amenities include a back-up generator, security cameras and a dedicated bond area for storage. With an energy efficiency rating of H, this property combines convenience and comfort in a prime location.",
    ],
    amenities: ["22 furnished studios", "Air conditioned", "Internet", "Kitchen facilities", "Laundry area", "Backup generator", "Security cameras", "Storage bond"],
    images: img("garnett-street-studio-rooms"),
    ref: "HZHZ25",
    listed: "2024-12-01",
  },
  {
    slug: "windsor-estate-single-family",
    title: "Windsor Estate — Single Family",
    status: "rent",
    price: 4_500,
    location: "east-bank-demerara",
    neighborhood: "Windsor Estate, Peter’s Hall",
    address: "Windsor Estate, Peter’s Hall, East Bank Demerara",
    type: "Single Family Home",
    beds: 3,
    baths: 2.5,
    garage: 1,
    sqft: 2700,
    labels: ["Hot Offer"],
    description: [
      "Located in the desirable Windsor Estate, Peter’s Hall, East Bank Demerara, this fully furnished single-family home offers a spacious layout with 3 bedrooms, 2.5 bathrooms, a living room and a TV room, ideal for comfortable family living.",
      "The property features a laundry area, back patio and secure gated compound. Additional amenities include hot and cold water, a backup generator and ample parking. With an energy efficiency rating of A, this home offers both luxury and functionality in a safe, sought-after neighborhood.",
    ],
    amenities: ["Fully furnished", "TV room", "Back patio", "Gated compound", "Hot & cold water", "Backup generator", "Laundry area", "Energy rating A"],
    images: img("windsor-estate-single-family"),
    ref: "HZHZ46",
    listed: "2024-12-01",
  },
  {
    slug: "windsor-estate-townhouse",
    title: "Windsor Estate Townhouse",
    status: "rent",
    price: 3_500,
    location: "east-bank-demerara",
    neighborhood: "Windsor Estate, Peter’s Hall",
    address: "Windsor Estate, Peter’s Hall, East Bank Demerara",
    type: "Townhouse",
    beds: 4,
    baths: 2,
    garage: 1,
    sqft: 4300,
    labels: ["Hot Offer"],
    description: [
      "This elegant townhouse in Windsor Estate, Peter’s Hall, East Bank Demerara, is fully furnished and air-conditioned, with a laundry area, a backyard and convenient parking.",
      "Residents enjoy a back-up generator, internet and cable services, and the added security of a gated compound, a comfortable and secure living experience in a prime, well-maintained community.",
    ],
    amenities: ["Fully furnished", "Air conditioned", "Backyard", "Laundry area", "Backup generator", "Internet & cable", "Gated compound"],
    images: img("windsor-estate-townhouse"),
    ref: "HZHZ19",
    listed: "2024-12-01",
  },
  {
    slug: "atlantic-towers",
    title: "Atlantic Towers",
    status: "rent",
    price: 3_500,
    location: "georgetown",
    neighborhood: "Sheriff Street",
    address: "Sheriff Street, Georgetown",
    type: "Condo",
    beds: 2,
    baths: 2,
    garage: 1,
    sqft: 1200,
    labels: [],
    description: [
      "Atlantic Towers on Sheriff Street, Georgetown, offers a luxurious living experience with fully furnished 2-bedroom, 2-bathroom apartments, a fully air-conditioned interior, hot and cold showers and a secured compound.",
      "Residents enjoy premium amenities, including a rooftop lawn tennis court, BBQ area, gym and elevators, along with the reassurance of a backup generator. With an energy efficiency rating of C, Atlantic Towers provides a comfortable, upscale lifestyle in a highly desirable location.",
    ],
    amenities: ["Rooftop tennis court", "Gym", "BBQ area", "Elevators", "Fully furnished", "Air conditioned", "Backup generator", "Secured compound"],
    images: img("atlantic-towers"),
    ref: "HZHZ17",
    listed: "2024-12-01",
  },
  {
    slug: "la-parfaite-harmonie-two-bedroom",
    title: "La Parfaite Harmonie — Two Bedroom",
    status: "rent",
    price: 2_500,
    location: "west-bank-demerara",
    neighborhood: "La Parfaite Harmonie",
    address: "La Parfaite Harmonie, West Bank Demerara",
    type: "Apartment",
    beds: 2,
    baths: 1,
    garage: 1,
    sqft: 2760,
    labels: [],
    description: [
      "This fully furnished two-bedroom residence in La Parfaite Harmonie, West Bank Demerara, is designed with comfort in mind and includes hot and cold showers, full air conditioning and WiFi.",
      "It is equipped with a backup generator, security camera system and a filtration system for added convenience and peace of mind. With an energy efficiency rating of B and available parking, it provides a modern and secure living space in a serene neighborhood.",
    ],
    amenities: ["Fully furnished", "Air conditioned", "WiFi", "Backup generator", "Security cameras", "Water filtration", "Parking"],
    images: img("la-parfaite-harmonie-two-bedroom"),
    ref: "HZHZ12",
    listed: "2024-12-01",
  },
  {
    slug: "republic-park-townhouse",
    title: "Republic Park — Townhouse",
    status: "rent",
    price: 2_000,
    location: "east-bank-demerara",
    neighborhood: "Republic Park, Phase 1",
    address: "Republic Park, Phase 1, East Bank Demerara",
    type: "Townhouse",
    beds: 2,
    baths: 2.5,
    garage: 1,
    sqft: 3410,
    labels: ["Hot Offer"],
    description: [
      "This fully furnished townhouse in Republic Park, Phase 1, East Bank Demerara, is designed for comfort and security, with 2 bedrooms and 2.5 bathrooms, a hot and cold water system, filtration and pressurized water and a back-up generator.",
      "Residents benefit from internet and cable services, security cameras, alarm systems and remote gate controls. With ample parking and an energy efficiency rating of E, this townhouse offers convenience and peace of mind in a desirable location.",
    ],
    amenities: ["Fully furnished", "Alarm system", "Security cameras", "Remote gate", "Backup generator", "Internet & cable", "Ample parking"],
    images: img("republic-park-townhouse"),
    ref: "HZHZ37",
    listed: "2024-12-01",
  },
  {
    slug: "green-acres-property",
    title: "Green Acres Residence",
    status: "rent",
    price: 2_000,
    location: "east-bank-demerara",
    neighborhood: "Green Acres, Providence",
    address: "Green Acres, Providence, East Bank Demerara",
    type: "Single Family Home",
    beds: 3,
    baths: 2.5,
    sqft: 1900,
    labels: ["Hot Offer"],
    description: [
      "Located in the gated community of Green Acres, Providence, East Bank Demerara, this 3-bedroom, 2.5-bathroom home offers a luxurious and convenient lifestyle. Fully furnished and air-conditioned, it includes hot and cold water, a pressurized and filtration water system, and internet and cable services.",
      "Residents enjoy a back patio, car port and laundry area, along with additional storage in overhead water tanks. With an energy efficiency rating of B, this property combines comfort, functionality and security in an ideal setting.",
    ],
    amenities: ["Gated community", "Fully furnished", "Air conditioned", "Back patio", "Car port", "Laundry area", "Internet & cable"],
    images: img("green-acres-property", 9),
    ref: "HZHZ41",
    listed: "2024-12-01",
  },
  {
    slug: "la-parfaite-harmonie-one-bedroom",
    title: "La Parfaite Harmonie — One Bedroom",
    status: "rent",
    price: 1_500,
    location: "west-bank-demerara",
    neighborhood: "La Parfaite Harmonie",
    address: "La Parfaite Harmonie, West Bank Demerara",
    type: "Apartment",
    beds: 1,
    baths: 1,
    garage: 1,
    labels: [],
    description: [
      "This cozy, fully furnished residence in La Parfaite Harmonie, West Bank Demerara, features 1 bedroom and 1 bathroom, with modern conveniences like hot and cold showers, full air conditioning and WiFi.",
      "Enhanced with a filtration system, backup generator and security camera system, the property ensures comfort and security. With an energy efficiency rating of B and available parking, it provides a convenient, comfortable living experience in a tranquil area.",
    ],
    amenities: ["Fully furnished", "Air conditioned", "WiFi", "Backup generator", "Security cameras", "Water filtration", "Parking"],
    images: img("la-parfaite-harmonie-one-bedroom"),
    ref: "HZHZ23",
    listed: "2024-12-01",
  },

  // Newer rentals, published November–December 2025. Their photos were not preserved by the archive.
  {
    slug: "bel-air-park-residence",
    title: "Bel Air Park Residence",
    status: "rent",
    price: 5_000,
    location: "georgetown",
    neighborhood: "Bel Air Park",
    address: "Bel Air Park, Georgetown",
    type: "Single Family Home",
    beds: 4,
    garage: 1,
    labels: [],
    description: [
      "Located in the highly desirable Bel Air Park area, this fully furnished home offers four spacious self-contained bedrooms, ideal for comfortable and private living. The interior is fully air-conditioned and equipped with hot and cold water, providing year-round convenience.",
      "Additional features include a garage, back-up generator and remote-controlled gates for enhanced security and ease of access, with a relaxing back patio and premium amenities throughout.",
    ],
    amenities: ["4 self-contained bedrooms", "Fully furnished", "Air conditioned", "Garage", "Backup generator", "Remote gates", "Back patio"],
    images: [],
    listed: "2025-11-22",
  },
  {
    slug: "providence-apartment-building",
    title: "Providence Apartment Building",
    status: "rent",
    price: 5_000,
    location: "east-bank-demerara",
    neighborhood: "Providence",
    address: "Providence, East Bank Demerara",
    type: "Apartment Building",
    beds: 2,
    labels: [],
    description: [
      "Located in the sought-after Providence, E.B.D area, this apartment building offers six fully furnished units, each featuring two self-contained bedrooms for comfortable modern living. Every unit includes a spacious living area, fully equipped kitchen, air-conditioning, and hot and cold water.",
      "The property also provides a back-up generator for uninterrupted power. Overlooking Hero’s Highway, it offers a convenient and secure location ideal for professionals and families.",
    ],
    amenities: ["6 furnished units", "2 self-contained bedrooms per unit", "Equipped kitchens", "Air conditioned", "Backup generator", "Overlooks Hero’s Highway"],
    images: [],
    listed: "2025-11-22",
  },
  {
    slug: "windsor-estates-condo",
    title: "Windsor Estates Condo",
    status: "rent",
    price: 5_000,
    location: "east-bank-demerara",
    neighborhood: "Windsor Estates",
    address: "Windsor Estates, East Bank Demerara",
    type: "Condo",
    beds: 3,
    sqft: 2150,
    labels: [],
    description: [
      "Located in the prestigious Windsor Estates, E.B.D, this fully furnished condo offers comfortable modern living with three spacious bedrooms and a well-designed interior, a fully equipped kitchen, air-conditioning throughout, and hot and cold water.",
      "A back-up generator and water filtration system ensure continuous comfort and reliability. Ideal for families or professionals, this condo provides secure, premium living in a highly sought-after community.",
    ],
    amenities: ["Fully furnished", "Equipped kitchen", "Air conditioned", "Backup generator", "Water filtration", "Washer"],
    images: [],
    listed: "2025-11-22",
  },
  {
    slug: "nabi-housing-scheme-residence",
    title: "Nabi Housing Scheme Residence",
    status: "rent",
    price: 5_000,
    location: "east-bank-demerara",
    neighborhood: "Nabi Housing Scheme",
    address: "Nabi Housing Scheme (gated community), East Bank Demerara",
    type: "Single Family Home",
    beds: 4,
    baths: 2.5,
    garage: 1,
    sqft: 2150,
    labels: [],
    description: [
      "Located in the gated Nabi Housing Scheme, E.B.D, this home offers secure, comfortable and modern living with 4 bedrooms (including one en suite) and 2.5 bathrooms. It features a fully furnished living room, dining area and well-equipped kitchen, complemented by air-conditioned rooms and pressurized hot and cold water.",
      "The property includes a back-up generator and parking. Set in a peaceful neighborhood, it is ideal for families seeking premium, move-in-ready living.",
    ],
    amenities: ["Gated community", "En-suite primary", "Fully furnished", "Air conditioned", "Pressurized hot & cold water", "Backup generator", "Parking"],
    images: [],
    listed: "2025-11-22",
  },
  {
    slug: "daguiar-park-residence",
    title: "D’Aguiar Park Residence",
    status: "rent",
    price: 5_000,
    location: "east-bank-demerara",
    neighborhood: "D’Aguiar Park",
    address: "D’Aguiar Park, East Bank Demerara",
    type: "Single Family Home",
    beds: 3,
    baths: 2,
    labels: [],
    description: [
      "Located in D’Aguiar Park, East Bank Demerara, this charming elevated home features three comfortable bedrooms and two modern bathrooms, ideal for families or professionals seeking a peaceful living environment.",
      "It comes fully furnished and fully air-conditioned, with a well-appointed kitchen, spacious living room and beautifully maintained lawns within a secure gated community. A welcoming verandah and ample outdoor space complete a relaxed lifestyle in a desirable E.B.D location.",
    ],
    amenities: ["Gated community", "Fully furnished", "Air conditioned", "Verandah", "Maintained lawns", "WiFi & cable"],
    images: [],
    listed: "2025-12-06",
  },
  {
    slug: "prospect-residence",
    title: "Prospect Residence",
    status: "rent",
    price: 4_500,
    location: "east-bank-demerara",
    neighborhood: "Prospect",
    address: "Prospect, East Bank Demerara",
    type: "Single Family Home",
    beds: 5,
    baths: 3,
    labels: [],
    description: [
      "Located in Prospect, East Bank Demerara, this spacious home features five well-appointed bedrooms and three modern bathrooms, offering comfort for large families.",
      "The property comes fully furnished for a move-in-ready experience, with ample living space and quality finishes throughout, an excellent option in a prime E.B.D location.",
    ],
    amenities: ["5 bedrooms", "Fully furnished", "Air conditioned", "Washer", "WiFi"],
    images: [],
    listed: "2025-11-23",
  },
];

export function getProperty(slug: string) {
  return PROPERTIES.find((p) => p.slug === slug);
}

export const FOR_SALE = PROPERTIES.filter((p) => p.status === "sale");
export const FOR_RENT = PROPERTIES.filter((p) => p.status === "rent");

/** Same status first, then same region, excluding the listing itself. */
export function getSimilar(p: Property, n = 3) {
  return PROPERTIES.filter((x) => x.slug !== p.slug)
    .map((x) => ({ x, score: (x.status === p.status ? 2 : 0) + (x.location === p.location ? 1 : 0) + (x.images.length ? 0.5 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ x }) => x);
}

export const PROPERTY_TYPES = Array.from(new Set(PROPERTIES.map((p) => p.type))).sort();

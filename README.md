# Casa Nuvo Investments — website

Rebuild of **casanuvoinvestments.com** (a WordPress/Houzez site that went offline when hosting lapsed).
Content comes from the Wayback Machine capture of 8 Oct 2025, plus listings and photos from nearby captures.
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. No database: listings are typed data in `lib/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Pages

| Route | Notes |
| --- | --- |
| `/` | Commercial-first hero + search (Commercial / Buy / Rent / Sell), stats, “What we broker” sectors, founder, residential sale & rentals, areas, owners, testimonials, contact form |
| `/commercial` | Warehouses & Industrial, Commercial Land, Office Buildings, services, who we work with |
| `/about` | Story, vision & mission, stats, pillars, testimonials, contact details |
| `/properties` | All listings. Filters live in the URL: `status` (`sale`/`rent`), `location`, `type`, `beds`, `max`, `sort` |
| `/properties/[slug]` | Gallery + lightbox, facts, description, amenities, area map, mortgage calculator (sales), tour request, WhatsApp/call, similar listings |
| `/insights`, `/insights/[slug]` | The four articles from the original site |
| `/contact` | Contact details, enquiry form, office map |
| `/favorites` | Hearted listings (saved in the visitor's browser) |
| `/terms` | Terms and Conditions |
| `POST /api/leads` | Receives every form (contact, tour requests) |

Old WordPress URLs (`/property/…`, `/current-listings`, `/status/…`, `/city/…`, the article slugs, `/terms-and-conditions`)
permanently redirect (308) to their new pages — see `next.config.ts`.

## Editing content

- **Contact details, stats, locations:** `lib/site.ts`
- **Commercial sectors and hero slides:** `SECTORS` and `HERO_SLIDES` in `lib/site.ts`. Commercial enquiries go to
  `/contact?topic=commercial&sector=…&intent=…`, which pre-fills the message. Photos are illustrative Unsplash images until the client supplies their own.
- **Listings:** `lib/properties.ts`. Add photos to `public/images/properties/<slug>-1.jpg`, `-2.jpg`, … and set `images`.
  Sale prices are GYD; rentals are USD per month. A listing with `images: []` shows a "Photos on request" panel.
- **Articles, testimonials, pillars:** `lib/insights.ts`

## Before launch

1. **Form delivery.** `app/api/leads/route.ts` currently only logs submissions on the server. Connect email
   (e.g. Resend/Postmark to casanuvoinvestments1@gmail.com) or a CRM there.
2. **Photos.** The Wayback Machine kept only one photo for most listings (nine for Green Acres, two for Happy
   Acres) and none for the six rentals added in Nov–Dec 2025. Ask the client for full photo sets.
3. **Confirm with the client:**
   - Green Acres rent: card said 2,000, its description said USD 4,000/month (site uses 2,000).
   - Rental currency: old cards said "GYD $2,500" but descriptions say USD; the site shows USD.
   - A few old listings had conflicting bed/bath counts between the card and the description; the card values are used.
   - The founder portrait has no name or title on the original site; add one if the client wants it.
4. Point the domain at the new host; `SITE.url` in `lib/site.ts` drives canonical URLs, the sitemap and structured data.

## Design system

- **Type:** Cormorant Garamond (display, set large and tight) + Manrope (text, small tracked labels). Italic gold is an
  accent reserved for one phrase per hero, never a pattern on every heading. Apostrophes and quotes are typographic (’ “ ”).
- **Colour:** ink `#0e0d0b`, paper/bone ivories, one brushed gold. Tokens live in `app/globals.css`.
- **Motion** (`components/Reveal.tsx`): `Reveal` (fade-lift), `Reveal variant="clip"` (curtain wipe for photos) and
  `RevealLines` (headings rise line by line out of a mask). Everything is static under `prefers-reduced-motion`.
- **Signature pieces:** `HeroSlideshow` (arched frame), `HeroSearch` (search written as a sentence), `SaleIndex`
  (catalogue list with a cursor-following photo), `LocationExplorer`, `CtaLink` (label + filling ring), the
  hide-on-scroll header and the full-bleed wordmark in the footer.

## Notes

- Fonts (Cormorant Garamond, Manrope) are self-hosted in `app/fonts/`.
- The previous project these designs were adapted from is kept, unbuilt, in `design_handoff_yala_realty/`
  (including its source in `_yala_source/`). It is excluded from TypeScript and ESLint and can be deleted.

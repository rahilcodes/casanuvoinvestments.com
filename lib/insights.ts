/** The four articles from the original site, kept word for word where possible. Investment-led order: the homes article comes last. */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: { title: string; text: string }[] }
  | { type: "cards"; items: { title: string; text: string }[] };

export interface Insight {
  slug: string;
  title: string;
  kicker: string;
  dek: string;
  category: string;
  readMinutes: number;
  image: string;
  body: Block[];
}

export const INSIGHTS: Insight[] = [
  {
    slug: "maximizing-your-investments",
    title: "Maximizing Your Investments",
    kicker: "Guide to Smart Investments",
    dek: "Unlock the potential of real estate with expert guidance.",
    category: "Investing",
    readMinutes: 3,
    // Commercial photography (Unsplash, free licence): this article leads the Insights page.
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd",
    body: [
      {
        type: "p",
        text: "Real estate continues to be one of the safest and most lucrative investment opportunities, offering unmatched potential for financial security and long-term wealth creation. Whether you’re buying your first property, diversifying your portfolio, or seeking a dream home, the real estate market provides opportunities that cater to every need and aspiration.",
      },
      {
        type: "p",
        text: "However, thriving in this ever-evolving market requires more than just intuition — it demands a clear strategy backed by data-driven insights and market expertise. With the right guidance, you can make decisions that not only maximize your returns but also set the foundation for sustained growth and stability.",
      },
      { type: "h2", text: "Why Real Estate is the Perfect Investment" },
      {
        type: "p",
        text: "Real estate has long been a cornerstone of wealth-building, and for good reason. Here’s why it remains an ideal choice:",
      },
      {
        type: "list",
        items: [
          { title: "Stable Asset Value", text: "Unlike other volatile investments, real estate provides steady growth over time." },
          { title: "Dual Income Potential", text: "Benefit from both property appreciation and rental income streams." },
          { title: "Inflation Hedge", text: "Real estate values often rise alongside inflation, preserving your purchasing power." },
          { title: "Tangible Investment", text: "Owning property gives you a physical, secure asset that stands the test of time." },
        ],
      },
      { type: "h2", text: "Take the First Step Today" },
      {
        type: "p",
        text: "Your real estate journey begins with the right guidance. Whether you’re ready to make a purchase or want to explore investment opportunities, we’re here to help.",
      },
      {
        type: "p",
        text: "Let us transform your vision into a reality. With our expertise and your ambitions, success in real estate is just a step away. Contact us today to start building a brighter financial future.",
      },
    ],
  },
  {
    slug: "the-latest-in-real-estate-trends",
    title: "The Latest in Real Estate Trends",
    kicker: "Stay Ahead of the Curve",
    dek: "Explore the latest developments shaping the real estate market.",
    category: "Market",
    readMinutes: 3,
    image: "/images/st-georges-cathedral.jpg",
    body: [
      {
        type: "p",
        text: "In today’s dynamic real estate landscape, staying ahead requires more than just information — it demands insights tailored to your goals. Whether you’re a first-time homebuyer, an experienced investor, or someone looking to upgrade to your dream home, understanding market trends is crucial.",
      },
      {
        type: "p",
        text: "Let us empower you with the knowledge and guidance to navigate the complexities of the real estate market. From the latest developments in home design to shifting property values, we’re here to ensure you’re always one step ahead.",
      },
      { type: "h2", text: "Why Staying Informed Matters" },
      {
        type: "p",
        text: "The real estate market is ever-evolving, influenced by economic shifts, lifestyle trends, and local development projects. Staying informed helps you:",
      },
      {
        type: "list",
        items: [
          { title: "Make Better Financial Decisions", text: "Understand property values, mortgage trends, and investment opportunities." },
          { title: "Seize Opportunities Early", text: "Be the first to discover new listings, upcoming neighborhoods, and lucrative investment options." },
          { title: "Avoid Pitfalls", text: "Minimize risks by staying aware of market conditions, legal requirements, and potential challenges." },
        ],
      },
      { type: "h2", text: "Your Trusted Partner in Real Estate" },
      {
        type: "p",
        text: "We don’t just offer properties; we offer possibilities. Our team combines market expertise with personalized service to ensure you:",
      },
      {
        type: "list",
        items: [
          { title: "Discover Homes That Fit Your Lifestyle", text: "From cozy apartments to sprawling estates, we help match you with properties that suit your needs and preferences." },
          { title: "Achieve Long-Term Goals", text: "Whether you’re buying your first home or building a portfolio, we provide tailored strategies for lasting success." },
          { title: "Simplify the Process", text: "We handle the details, so you can focus on what matters most — your future." },
        ],
      },
      { type: "h2", text: "Your Journey Starts Here" },
      {
        type: "p",
        text: "The perfect home isn’t just a place; it’s a feeling, a foundation for memories, and a step toward your dreams. With our guidance, you’re not just finding a property — you’re crafting a future.",
      },
      {
        type: "p",
        text: "Let’s work together to turn your real estate vision into reality. Start exploring today and discover the difference expertise and dedication can make.",
      },
    ],
  },
  {
    slug: "simplifying-your-property-journey",
    title: "Simplifying Your Property Journey",
    kicker: "Stress-Free Property Buying and Selling",
    dek: "Step-by-step guidance for a seamless experience.",
    category: "Guidance",
    readMinutes: 3,
    image: "/images/properties/green-acres-property-4.jpg",
    body: [
      {
        type: "p",
        text: "Navigating the real estate market can feel overwhelming, especially with the myriad of options, market fluctuations, and complex paperwork involved. Whether you’re a first-time buyer, an experienced investor, or someone looking for the perfect place to call home, the journey can be intimidating. But it doesn’t have to be.",
      },
      {
        type: "p",
        text: "We’re here to simplify the process, turning what may seem like a daunting task into an exciting and rewarding experience. With expert guidance, market insights, and a client-focused approach, we’ll ensure that every step of your real estate journey is clear, confident, and successful.",
      },
      { type: "h2", text: "Why the Real Estate Market Feels Complex" },
      { type: "p", text: "The real estate market is often seen as challenging due to its dynamic nature and intricacies, such as:" },
      {
        type: "list",
        items: [
          { title: "Market Trends", text: "Constantly changing property values and demand." },
          { title: "Legal Formalities", text: "Contracts, deeds, and regulations can feel overwhelming." },
          { title: "Investment Risks", text: "Ensuring a purchase aligns with your financial goals." },
          { title: "Emotional Decisions", text: "Balancing personal desires with practical considerations." },
        ],
      },
      { type: "h2", text: "How We Simplify the Process" },
      { type: "p", text: "Our goal is to take the stress out of real estate and make it a seamless experience for you. Here’s how:" },
      {
        type: "list",
        items: [
          { title: "Personalized Guidance", text: "Every client has unique needs. We take the time to understand your preferences, budget, and goals to present tailored options." },
          { title: "Comprehensive Market Insights", text: "Stay informed with up-to-date data on property values, neighborhood trends, and market conditions." },
          { title: "Simplified Processes", text: "From narrowing down choices to managing paperwork, we handle the details so you can focus on making decisions." },
          { title: "Transparent Communication", text: "No jargon, no hidden fees — just clear, honest conversations every step of the way." },
        ],
      },
      { type: "h2", text: "Let’s Make Real Estate Easy" },
      {
        type: "p",
        text: "The process of buying, selling, or investing in real estate doesn’t have to be intimidating. With the right partner, it becomes an opportunity to achieve your dreams.",
      },
      {
        type: "p",
        text: "Let us simplify the process and turn your vision into reality. Contact us today to get started on your real estate journey with confidence.",
      },
    ],
  },
  {
    slug: "your-perfect-home-awaits",
    title: "Your Perfect Home Awaits",
    kicker: "Discover Your Dream Home Today",
    dek: "Handpicked properties that fit your lifestyle and budget.",
    category: "Buying",
    readMinutes: 3,
    image: "/images/properties/happy-acres-property-2.jpg",
    body: [
      {
        type: "p",
        text: "At Casa Nuvo Investments, we understand that finding the perfect home is one of the most important decisions in your life. That’s why we’ve crafted a home-buying process designed to be as smooth, straightforward, and stress-free as possible. Our team is committed to connecting you with properties that meet your unique needs and preferences, no matter where you are on your home-buying journey.",
      },
      {
        type: "p",
        text: "Whether you’re looking for a cozy apartment in the heart of the city, a family-friendly house with ample space for your loved ones, or a luxurious villa to call your own, we’ve got something for everyone. Our extensive property listings feature a wide range of homes, from affordable options to high-end residences, each carefully selected to ensure quality, comfort, and value.",
      },
      { type: "h2", text: "Why Choose Us?" },
      {
        type: "cards",
        items: [
          {
            title: "Personalized Guidance",
            text: "We take the time to listen to your needs, preferences, and budget to help you find a home that truly fits. Our expert team will guide you every step of the way, from the initial search to finalizing your purchase.",
          },
          {
            title: "Diverse Property Options",
            text: "We offer a diverse range of homes, including apartments, houses, townhouses, and villas, across various locations. Whether you’re a first-time buyer or searching for a second home, our listings cater to every lifestyle and budget.",
          },
          {
            title: "Transparent Process",
            text: "We believe in transparency and honesty. Our dedicated team will provide you with all the information you need about each property, including its features, amenities, pricing, and more, to ensure you can make an informed decision.",
          },
          {
            title: "Financing Made Easy",
            text: "We know that securing the right financing can be a challenge. That’s why we work closely with trusted financial partners to offer you mortgage solutions tailored to your needs, ensuring you get the best deal.",
          },
          {
            title: "Expert Negotiators",
            text: "Our experienced negotiators work hard to secure the best price for you. We’ll make sure you get value for your investment, whether you’re buying your first home or upgrading to a new one.",
          },
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}

export const TESTIMONIALS = [
  {
    quote:
      "Casa Nuvo Investments turned my real estate dreams into reality! Their team guided me every step of the way, and I couldn’t be happier with my returns. Highly recommend them for anyone looking to grow their portfolio!",
    name: "Sarah T.",
    role: "Investor",
  },
  {
    quote:
      "Casa Nuvo Investments made our home-buying experience seamless and stress-free. Their expert guidance and dedication helped us find the perfect property with ease.",
    name: "Kenya Soval",
    role: "Homeowner",
  },
  {
    quote:
      "Working with Casa Nuvo was a game-changer. They took the time to understand my financial goals and delivered tailored solutions that exceeded my expectations. Their professionalism and transparency are unmatched.",
    name: "James R.",
    role: "Entrepreneur",
  },
  {
    quote: "Working with Casa Nuvo Investments was a game-changer for us! Our agent was attentive and truly understood our needs.",
    name: "Roy Bennett",
    role: "Client",
  },
  {
    quote:
      "Casa Nuvo Investments offers a level of service that’s hard to find in today’s market. They don’t just sell you a property; they become your partners in success. I’m thrilled with the growth of my investment portfolio!",
    name: "Michael",
    role: "Business Owner",
  },
  {
    quote: "The level of service we received from our agent at Casa Nuvo Investments was outstanding.",
    name: "Kathleen Peterson",
    role: "Client",
  },
] as const;

export const PILLARS = [
  {
    title: "Strategic Market Insight",
    text: "We stay ahead of market trends to uncover opportunities that maximize your returns, giving you a competitive edge in the real estate landscape.",
  },
  {
    title: "Tailored Investment Solutions",
    text: "Every investor has unique goals. We craft personalized strategies that align with your vision, offering flexibility and a pathway to success.",
  },
  {
    title: "Unmatched Professionalism",
    text: "Our team is committed to transparency, reliability, and excellence, ensuring a seamless and rewarding investment experience.",
  },
] as const;

// ══ GEO SYSTEM — single source of truth ══
//
// 18 local landing pages, each with its own keyword targets, hero copy,
// local angle, differentiated service descriptions, FAQs and cross-links —
// not the same paragraph with the area name swapped. GeoPage.jsx renders
// entirely from this data; add/edit/remove a location here only. (Still a
// static site with no CMS/backend — an edit here needs a rebuild + deploy
// to go live, same as everything else. "No rebuilding pages" means no new
// page component to hand-author per location, not a live CMS.)
//
// Shared vs. per-location content, on purpose:
//   - TRUST_COPY and WHY_WRAPTORS_SHARED (3 of the 4 "why us" cards) are
//     brand philosophy, not local SEO content — it's fine for these to
//     repeat, the same way an "About us" footer repeats site-wide. Only
//     each location's trustHeading changes.
//   - Three of the seven FAQs per page (COMMON_FAQS) are genuinely
//     area-independent facts (pricing factors, wrap-vs-PPF, timeline) —
//     repeating a factual answer isn't thin content. The other four are
//     location-specific per page.
//   - Everything else (heroCopy, localAngle, service titles/descriptions,
//     4 area-specific FAQs, relatedAreas) is written per location around
//     that area's actual real-world profile (see each entry's comment).
//
// Field reference — see one full entry (Al Quoz) below for the shape.

export { SITE_URL } from '../lib/siteConfig.js';

export const SERVICE_CATALOG = {
  wraps:     { label: 'Vehicle Wraps',        path: '/services/wraps' },
  ppf:       { label: 'Paint Protection Film', path: '/services/ppf' },
  ceramic:   { label: 'Ceramic Coating',       path: '/services/ceramic' },
  tint:      { label: 'Window Tint',           path: '/services/tint' },
  starlight: { label: 'Starlight Headliner',   path: '/services/starlight' },
  commercial:{ label: 'Commercial Wrap',       path: '/services/wraps' },
};

// Category label shown above each service card — constant across every
// page, same as the reference spec ("CAR WRAPPING", "PAINT PROTECTION
// FILM", etc.). Per-location differentiation lives in title/description.
export const SERVICE_CATEGORY_LABEL = {
  wraps:   'Car Wrapping',
  ppf:     'Paint Protection Film',
  ceramic: 'Ceramic Coating',
  tint:    'Window Tint',
};

// Brand-philosophy copy, not local content — reused across every page.
export const TRUST_COPY = [
  "If you're comparing wrap shops, look beyond colour samples. A premium wrap should follow the vehicle's body lines properly, maintain clean edges, protect the original finish underneath and look intentional from every angle.",
  "Wraptors approaches the vehicle as a complete build, whether you're choosing a subtle satin colour change, a full custom transformation or protection for a car you want to keep factory-clean.",
];

// First 3 "why choose Wraptors" cards — identical everywhere. The 4th card
// is per-location (see whyWraptorsLocal on each entry below).
export const WHY_WRAPTORS_SHARED = [
  {
    title: 'Global Wraptors Standard',
    description: 'The same Wraptors identity and approach carried into the Dubai operation.',
  },
  {
    title: 'Full Vehicle Transformations',
    description: 'Wrap, PPF, coating and tint can be planned as one complete build rather than separate jobs.',
  },
  {
    title: 'Built Around The Car',
    description: 'Colour, finish, protection and details are selected around the actual vehicle rather than forcing every customer into the same package.',
  },
];

// 3 of the 7 FAQs per page — genuinely area-independent facts, so reusing
// the same answer everywhere isn't thin content.
export const COMMON_FAQS = [
  {
    q: 'How much does a full car wrap cost in Dubai?',
    a: "Cost depends on the vehicle's size, the finish (gloss, satin, matte, colour-shift or a custom design) and how much surface is covered. We quote after a short consultation rather than giving a blanket number, since two identical-looking wraps can differ a lot in film and labour depending on the car.",
  },
  {
    q: "What's the difference between vinyl wrap and colour PPF?",
    a: 'Vinyl wrap is a coloured or patterned film designed primarily for finish changes, with paint protection as a side benefit. Colour PPF is a thicker, self-healing protective film in a colour tint — built primarily to protect, with the colour effect as the secondary benefit. Which one is right depends on whether your priority is the look or the protection.',
  },
  {
    q: 'How long does a full vehicle wrap take?',
    a: 'Most full vehicle wraps take 3–5 working days depending on the vehicle and finish. PPF and ceramic coating timelines vary by coverage — we confirm an exact schedule at consultation.',
  },
];

export const LOCATIONS = [
  {
    locationName: 'Dubai',
    slug: 'dubai',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Dubai',
    secondaryKeywords: ['car wrap Dubai', 'vinyl wrap Dubai', 'PPF Dubai', 'ceramic coating Dubai', 'automotive customization Dubai'],
    seoTitle: 'Car Wrapping, PPF & Ceramic Coating in Dubai | Wraptors',
    metaDescription: "Wraptors is Dubai's studio for premium car wrapping, PPF, ceramic coating and window tinting — built and installed at our Al Quoz workshop, serving every district across the city.",
    h1: 'Premium Car Wrapping & Automotive Customization in Dubai',
    eyebrow: 'Wraptors Dubai',
    heroCopy: [
      "Wraptors brings its automotive transformation experience to Dubai. From full colour-change wraps and custom vinyl work to paint protection film, ceramic coating and window tinting, every vehicle is handled inside our Dubai studio at Dubai Creative Park, Warehouse B05, Al Quoz Industrial Area 4.",
      "Whether you're protecting factory paint, changing the entire character of the car or building something that shouldn't look like anything else on the road, this is where the work happens.",
    ],
    localAngleHeading: 'One studio. Every district.',
    localAngle: [
      "Dubai's roads run from daily commutes to weekend supercar meets, and the climate tests every finish — intense UV, blowing sand and long summers. That's the exact environment our wraps, PPF and ceramic coatings are built for.",
      "Whether you're protecting a new delivery before it ever sees the road, refreshing a daily driver, or branding a commercial fleet, our Al Quoz studio is set up to handle the full range — one team, one standard, across every district.",
    ],
    trustHeading: 'Looking for the best car wrap in Dubai?',
    services: [
      { id: 'wraps',   title: 'Car Wrapping Across Dubai',        description: 'Full colour changes, partial wraps and custom vehicle transformations installed at our Dubai workshop.' },
      { id: 'ppf',     title: 'PPF Installation, Dubai-Wide',      description: 'Clear and colour paint protection film designed to preserve high-impact exterior surfaces while keeping the finish at the centre of the build.' },
      { id: 'ceramic', title: 'Ceramic Coating Dubai',             description: "A finishing and protection layer designed for easier maintenance, gloss and resistance against the heat, sand and UV exposure cars face in Dubai." },
      { id: 'tint',    title: 'Premium Window Tinting Dubai',      description: 'Automotive window film for privacy, comfort and a cleaner overall vehicle finish, installed to UAE-legal specification.' },
    ],
    whyWraptorsLocal: {
      title: 'One Dubai Studio',
      description: 'Every service — wrap, PPF, coating and tint — comes from the same Al Quoz workshop, serving clients across the whole city.',
    },
    faqs: [
      { q: 'Where is Wraptors located in Dubai?', a: 'Our studio is in Al Quoz Industrial Area 4 — Dubai Creative Park, Warehouse B05. Every Dubai-wide booking is handled from this one location.' },
      { q: 'Do you serve areas outside Al Quoz?', a: 'Yes — we work with clients across Dubai, including Palm Jumeirah, Downtown, the Marina, Jumeirah, Business Bay, DIFC and beyond. Pickup and drop-off can be arranged for eligible builds.' },
      { q: 'Is PPF worth it for cars in Dubai?', a: "For most owners, yes — Dubai's combination of intense UV, blown sand and long parking hours in direct sun accelerates paint wear more than milder climates. PPF is one of the most requested services across every area we serve." },
      { q: 'Do you wrap luxury cars, SUVs and performance cars in Dubai?', a: "Yes — our client base across Dubai spans daily-driven SUVs, luxury sedans, exotics and performance builds. Every vehicle gets the same installation standard regardless of type." },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['al-quoz', 'downtown-dubai', 'dubai-marina', 'palm-jumeirah'],
    featuredOnHomepage: false,
    homepageDisplayOrder: null,
  },
  {
    // The only page that presents itself as the physical location — every
    // other page says it serves clients from this studio instead.
    locationName: 'Al Quoz',
    slug: 'al-quoz',
    isPhysicalStudio: true,
    primaryKeyword: 'car wrapping Al Quoz',
    secondaryKeywords: ['PPF Al Quoz', 'ceramic coating Al Quoz', 'window tinting Al Quoz', 'car wrap Dubai'],
    seoTitle: 'Premium Car Wrapping & PPF in Al Quoz, Dubai | Wraptors',
    metaDescription: 'Wraptors Dubai studio in Al Quoz — full colour-change wraps, PPF, ceramic coating and window tinting, all installed in-house at Dubai Creative Park, Warehouse B05.',
    h1: 'Premium Car Wrapping & PPF in Al Quoz, Dubai',
    eyebrow: 'Wraptors Dubai · Al Quoz',
    heroCopy: [
      'Wraptors brings its automotive transformation experience to the heart of Al Quoz, Dubai. From full colour-change wraps and custom vinyl work to paint protection film, ceramic coating and window tinting, every vehicle is handled inside our Dubai studio at Dubai Creative Park, Warehouse B05, Al Quoz Industrial Area 4.',
      "Whether you're protecting factory paint, changing the entire character of the car or building something that shouldn't look like anything else on the road, this is where the work happens.",
    ],
    localAngleHeading: 'Built in Al Quoz. Made for Dubai.',
    localAngle: [
      "Al Quoz has become one of Dubai's key automotive districts, and Wraptors sits directly inside it.",
      'Our Dubai studio gives us the space to handle complete vehicle transformations under one roof, with the installation environment, lighting and attention required for high-end wrap and protection work.',
      "For clients searching for premium car wrapping in Dubai, the difference isn't simply the film. It's the preparation, installation, finishing and final presentation.",
    ],
    trustHeading: 'Looking for the best car wrap in Al Quoz?',
    services: [
      { id: 'wraps',   title: 'Full & Custom Car Wraps in Al Quoz',   description: 'Full colour changes, partial wraps and custom vehicle transformations installed at our Dubai workshop.' },
      { id: 'ppf',     title: 'PPF Installation in Al Quoz',           description: "Clear and colour paint protection film designed to preserve high-impact exterior surfaces while keeping the vehicle's finish at the centre of the build." },
      { id: 'ceramic', title: 'Ceramic Coating Dubai',                 description: 'A finishing and protection layer designed for easier maintenance, gloss and additional resistance against the conditions cars experience in Dubai.' },
      { id: 'tint',    title: 'Premium Window Tinting in Al Quoz',     description: 'Automotive window film for privacy, comfort and a cleaner overall vehicle finish.' },
    ],
    whyWraptorsLocal: {
      title: 'Al Quoz Studio',
      description: "The Dubai workshop is located directly inside one of the city's major automotive areas.",
    },
    faqs: [
      { q: 'Where can I get premium car wrapping in Al Quoz?', a: 'Directly at our Dubai studio — Dubai Creative Park, Warehouse B05, 32 9B St, Al Quoz Industrial Area 4. Every wrap is installed on-site, not subcontracted out.' },
      { q: 'Can I visit the Wraptors Dubai studio in Al Quoz?', a: 'Yes — walk-ins are welcome for a quick consultation, and booking ahead guarantees a specific time with the team. There is space to drop your vehicle off directly for the duration of the job.' },
      { q: 'Is PPF worth it for cars kept in Al Quoz workshops or garages?', a: "Yes — even garage-kept cars pick up dust, road debris and fine scratches from daily driving in an industrial district. PPF on high-impact panels keeps the factory finish intact underneath." },
      { q: 'Do you wrap luxury cars, SUVs and performance cars in Al Quoz?', a: 'Yes — the Al Quoz studio handles the full range, from daily-driven SUVs to exotics brought in specifically for a full transformation.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['dubai', 'dubai-marina', 'al-barsha', 'motor-city'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 1,
  },
  {
    // Luxury/exotic villa community; salt air off the coast is a real,
    // specific reason PPF/ceramic matter here more than inland areas.
    locationName: 'Palm Jumeirah',
    slug: 'palm-jumeirah',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Palm Jumeirah',
    secondaryKeywords: ['PPF Palm Jumeirah', 'luxury car wrapping Dubai', 'ceramic coating Palm Jumeirah'],
    seoTitle: 'Luxury Car Wrapping & PPF in Palm Jumeirah | Wraptors',
    metaDescription: 'Wraptors serves Palm Jumeirah with luxury and exotic vehicle wraps, paint protection film and ceramic coating, delivered from our Wraptors Dubai studio in Al Quoz.',
    h1: 'Luxury Car Wrapping & PPF in Palm Jumeirah',
    eyebrow: 'Wraptors Dubai · Palm Jumeirah',
    heroCopy: [
      "Palm Jumeirah's villa community runs some of the most exclusive vehicle collections in Dubai. Wraptors serves Palm Jumeirah clients from our Dubai studio in Al Quoz, with full colour-change wraps, paint protection film, ceramic coating and window tinting built around exotic and luxury vehicles.",
      "Whether it's a single showpiece or a full multi-car collection, every build is planned around the vehicle, not a standard package.",
    ],
    localAngleHeading: 'Coastal living. Serious protection.',
    localAngle: [
      "Salt air and constant sun exposure make the Palm a harder environment on paint than most of the city — PPF and ceramic coating aren't optional extras here, they're the difference between a finish that still looks new in year five and one that doesn't.",
      "We coordinate pickup and drop-off for Palm Jumeirah villa owners and multi-car collections, so a full protection package doesn't mean losing use of the car for a week.",
    ],
    trustHeading: 'Looking for the best car wrap in Palm Jumeirah?',
    services: [
      { id: 'ppf',     title: 'PPF for Palm Jumeirah Vehicles',     description: 'Full-front and full-body coverage designed to hold up against salt air and constant sun exposure.' },
      { id: 'ceramic', title: 'Ceramic Coating Palm Jumeirah',      description: 'Multi-year protection built for coastal exposure, keeping gloss and resistance intact between details.' },
      { id: 'wraps',   title: 'Luxury & Exotic Car Wraps',          description: 'Colour and finish changes for exotic and luxury builds, installed with the same precision as a full restoration.' },
      { id: 'tint',    title: 'Window Tinting for Villa-Parked Cars', description: 'Heat-rejecting film for vehicles that spend long hours parked in direct coastal sun.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Palm Jumeirah',
      description: 'Palm Jumeirah clients are served directly from the Wraptors Dubai studio in Al Quoz, with pickup and drop-off coordinated around your schedule.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Palm Jumeirah?', a: 'Wraptors serves Palm Jumeirah clients from our Dubai studio in Al Quoz, with pickup and drop-off coordinated for eligible builds — particularly for PPF and ceramic coating bookings.' },
      { q: 'Is PPF worth it for cars on Palm Jumeirah?', a: "It's one of the most requested services on the Palm specifically — the combination of salt air and near-constant sun exposure accelerates paint wear more than almost anywhere else in the city." },
      { q: 'Can you handle exotic and low-volume vehicles?', a: 'Yes — our team regularly works on exotic and limited-production vehicles and treats every finish with the same precision, regardless of rarity.' },
      { q: 'Do you wrap luxury cars, SUVs and performance cars on Palm Jumeirah?', a: 'Yes — Palm Jumeirah is one of our most active areas for exotic and luxury builds, from single showpieces to full multi-car collections.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['jumeirah', 'dubai-marina', 'jbr', 'emirates-hills'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 2,
  },
  {
    // Beachfront villas + boutique businesses — heavy direct sun exposure,
    // tint-forward angle distinct from Palm Jumeirah's salt-air framing.
    locationName: 'Jumeirah',
    slug: 'jumeirah',
    isPhysicalStudio: false,
    primaryKeyword: 'window tinting Jumeirah',
    secondaryKeywords: ['car wrapping Jumeirah', 'PPF Jumeirah', 'ceramic coating Jumeirah'],
    seoTitle: 'Car Wrapping, PPF & Window Tinting in Jumeirah | Wraptors',
    metaDescription: "Wraptors serves Jumeirah's beachfront villas and businesses with car wrapping, PPF, ceramic coating and heat-rejecting window tint, from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & Window Tinting in Jumeirah',
    eyebrow: 'Wraptors Dubai · Jumeirah',
    heroCopy: [
      "Jumeirah's beachfront villas and boutique businesses see some of the most direct sun exposure anywhere in Dubai. Wraptors serves Jumeirah with car wrapping, paint protection film, ceramic coating and premium window tinting from our Dubai studio in Al Quoz.",
      'Ceramic window tint and PPF are two of the most requested services in the area, for exactly that reason.',
    ],
    localAngleHeading: 'Beachfront sun. Real protection.',
    localAngle: [
      "From Jumeirah Beach Road's villas to the boutiques and cafés nearby, we work with a mix of residential and business clients — daily drivers that need real UV and heat protection, and statement vehicles that need to look the part.",
      'Ceramic tint is a particularly common request here: it blocks significantly more heat than standard film, which matters when a car sits parked in direct sun for hours at a time.',
    ],
    trustHeading: 'Looking for the best window tinting in Jumeirah?',
    services: [
      { id: 'tint',    title: 'Premium Window Tinting in Jumeirah', description: 'Ceramic film built for heavy, direct sun exposure, with heat rejection prioritised alongside visibility.' },
      { id: 'ppf',     title: 'PPF for Beachfront Vehicles',        description: 'Front-end and full-body protection against coastal grit, sun and daily beach-road driving.' },
      { id: 'ceramic', title: 'Ceramic Coating Jumeirah',           description: "Gloss retention built to hold up through Dubai's hottest months of direct beachfront sun." },
      { id: 'wraps',   title: 'Car Wrapping for Homes & Businesses', description: 'Full and partial wraps for residential vehicles and small business fleets around Jumeirah.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Jumeirah',
      description: 'Jumeirah clients are served from the Wraptors Dubai studio in Al Quoz, a short drive from Jumeirah Beach Road.',
    },
    faqs: [
      { q: 'What tint percentage do you recommend for Jumeirah’s climate?', a: "We'll walk you through UAE-legal options and recommend a ceramic film percentage based on how much heat rejection you want versus visibility — most Jumeirah clients lean toward maximum legal heat rejection." },
      { q: 'Is PPF worth it for cars in Jumeirah?', a: 'Yes — the combination of beachfront sun and coastal grit is one of the harder environments in Dubai for paint. PPF on the front end and high-impact panels is one of our most common Jumeirah bookings.' },
      { q: 'Do you work with businesses on fleet vehicles in Jumeirah?', a: 'Yes — we handle both single vehicles and small commercial fleets for businesses based in and around Jumeirah.' },
      { q: 'Do you wrap luxury cars, SUVs and performance cars in Jumeirah?', a: "Yes — Jumeirah's mix of beachfront villas and boutique businesses brings us everything from daily SUVs to statement performance builds." },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['palm-jumeirah', 'jbr', 'al-barsha', 'dubai-marina'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 3,
  },
  {
    // High-rise residents, Marina Walk car-spotting culture, visibility-
    // driven finishes (colour-shift, satin) as the differentiator.
    locationName: 'Dubai Marina',
    slug: 'dubai-marina',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Dubai Marina',
    secondaryKeywords: ['vinyl wrap Dubai Marina', 'PPF Dubai Marina', 'ceramic coating Dubai Marina'],
    seoTitle: 'Car Wrapping & PPF in Dubai Marina | Wraptors',
    metaDescription: "From colour-shift wraps to PPF and ceramic coating, Wraptors serves Dubai Marina's high-rise residents and Marina Walk car culture from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & Styling in Dubai Marina',
    eyebrow: 'Wraptors Dubai · Dubai Marina',
    heroCopy: [
      "Dubai Marina has one of the city's most visible car cultures — Marina Walk sees more supercars on a Friday evening than most cities see in a year. Wraptors serves Marina residents who want their build to stand out, with the durability to back it up, from our Dubai studio in Al Quoz.",
      'Colour-shift wraps, PPF, ceramic coating and window tint — planned as one build, not separate jobs.',
    ],
    localAngleHeading: 'Seen daily. Protected properly.',
    localAngle: [
      "High-rise living means most Marina clients don't have space to store or work on a car themselves — we make drop-off and collection simple, and turn builds around fast so you're not without your car for long.",
      'Colour-shift and satin finishes are especially popular in the Marina, where a build gets seen constantly — we walk clients through finish options that hold up in photos and in person, day and night.',
    ],
    trustHeading: 'Looking for the best car wrap in Dubai Marina?',
    services: [
      { id: 'wraps',   title: 'Car Wrapping in Dubai Marina',   description: 'Colour-shift, satin and gloss finishes built to be seen on Marina Walk and beyond.' },
      { id: 'tint',    title: 'Window Tinting for High-Rises',  description: 'Ceramic film sized for glass-heavy Marina apartments and towers, cutting heat without cutting visibility.' },
      { id: 'ceramic', title: 'Ceramic Coating Dubai Marina',   description: 'Show-ready gloss maintained between Marina Walk appearances and daily driving.' },
      { id: 'ppf',     title: 'PPF for Marina Vehicles',        description: 'Protection that keeps a fresh wrap or factory finish looking new through frequent city use.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Dubai Marina',
      description: 'Marina clients are served from the Wraptors Dubai studio in Al Quoz, with drop-off, collection and valet-friendly scheduling coordinated around building logistics.',
    },
    faqs: [
      { q: 'Can you accommodate valet or building drop-off in the Marina?', a: 'Yes — we regularly coordinate pickup and drop-off for Marina residents to work around building valet and parking logistics.' },
      { q: 'What finishes are most popular in Dubai Marina?', a: 'Colour-shift, satin and gloss-black finishes are consistently the most requested — the Marina has a strong scene for builds that stand out.' },
      { q: 'Is PPF worth it for cars used daily in the Marina?', a: "Yes — frequent valet parking and tight garage spaces mean daily-driven Marina cars pick up door dings and fine scratches quickly. PPF on high-contact panels is a common addition to a Marina wrap." },
      { q: 'Do you offer evening or weekend consultations for Marina clients?', a: 'Yes, we can schedule consultations outside standard hours — just let us know when booking.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['jbr', 'jlt', 'palm-jumeirah', 'al-quoz'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 4,
  },
  {
    // Beachfront apartment community adjacent to the Marina — similar
    // exposure profile, but framed around beach-residence daily parking
    // rather than Marina Walk visibility.
    locationName: 'JBR',
    slug: 'jbr',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping JBR Dubai',
    secondaryKeywords: ['PPF JBR', 'window tinting Jumeirah Beach Residence', 'ceramic coating JBR'],
    seoTitle: 'Car Wrapping & PPF in JBR (Jumeirah Beach Residence) | Wraptors',
    metaDescription: "Wraptors serves JBR's beachfront apartment community with car wrapping, PPF, ceramic coating and window tinting, from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & Protection in JBR',
    eyebrow: 'Wraptors Dubai · JBR',
    heroCopy: [
      'Jumeirah Beach Residence puts residents steps from the beach and a daily routine of valet parking and salt-carried sea air. Wraptors serves JBR with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.',
      'Every build is planned around how the car is actually used day to day, not a one-size finish.',
    ],
    localAngleHeading: 'Beachfront living, daily use.',
    localAngle: [
      "JBR's towers put a lot of vehicles through frequent valet handling and beachfront parking, both of which are harder on a finish than most residential areas — door dings, fine scratches and salt-carried air add up quickly.",
      "PPF on high-contact panels and a ceramic coating are two of the most requested combinations for JBR residents who want their car to hold up to daily beach-community use without looking worn down."
    ],
    trustHeading: 'Looking for the best car wrap in JBR?',
    services: [
      { id: 'ppf',     title: 'PPF for JBR Vehicles',         description: 'High-contact panel protection built for frequent valet parking and salt-carried sea air.' },
      { id: 'ceramic', title: 'Ceramic Coating JBR',           description: 'Gloss and protection that holds up against daily beachfront use and constant sun.' },
      { id: 'wraps',   title: 'Car Wrapping in JBR',           description: 'Full and partial colour changes for residents who want their build to stand out along The Walk.' },
      { id: 'tint',    title: 'Window Tinting for Beach Residences', description: 'Heat-rejecting film for cars parked in direct sun through the day.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving JBR',
      description: 'JBR clients are served from the Wraptors Dubai studio in Al Quoz, with pickup and drop-off coordinated around valet and building logistics.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near JBR?', a: 'Wraptors serves JBR clients from our Dubai studio in Al Quoz, a short drive away, with pickup and drop-off coordinated for eligible builds.' },
      { q: 'Is PPF worth it for cars parked at JBR daily?', a: "Yes — frequent valet handling and beachfront salt air both accelerate wear on high-contact panels. PPF is one of the most common first bookings for JBR residents." },
      { q: 'Can you work around JBR building valet and parking?', a: 'Yes — we coordinate pickup and drop-off around valet schedules and building access for JBR residents.' },
      { q: 'Do you wrap luxury cars, SUVs and performance cars in JBR?', a: "Yes — JBR's resident mix brings us everything from daily-driven SUVs to statement performance and exotic builds." },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['dubai-marina', 'jumeirah', 'palm-jumeirah', 'jlt'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 7,
  },
  {
    // Business/tourism district — Burj Khalifa, hotels, corporate offices;
    // fleet branding + understated executive protection.
    locationName: 'Downtown Dubai',
    slug: 'downtown-dubai',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Downtown Dubai',
    secondaryKeywords: ['fleet branding Dubai', 'PPF Downtown Dubai', 'ceramic coating Downtown Dubai'],
    seoTitle: 'Executive Car Wrapping & Fleet Branding in Downtown Dubai | Wraptors',
    metaDescription: 'Wraptors serves Downtown Dubai with executive vehicle wraps, fleet branding, PPF and ceramic coating for corporate and personal vehicles.',
    h1: 'Executive Car Wrapping & Fleet Branding in Downtown Dubai',
    eyebrow: 'Wraptors Dubai · Downtown Dubai',
    heroCopy: [
      "Downtown Dubai is the city's business and tourism address — Burj Khalifa, Dubai Mall and a concentration of corporate offices and luxury hotels. Wraptors serves Downtown with executive vehicle wraps, fleet branding, PPF and ceramic coating from our Dubai studio in Al Quoz.",
      'From a single executive car to a full commercial fleet, every build is planned as one job, not separate services.',
    ],
    localAngleHeading: 'Fleet identity. Executive finish.',
    localAngle: [
      'Commercial and fleet wrapping is one of the most requested services from Downtown-based businesses — a consistent, precision-cut brand identity across every vehicle in a fleet, visible across one of the busiest parts of the city.',
      "For personal vehicles, we see steady demand for PPF and ceramic coating from executives who want their car protected but understated — a finish that looks factory-new without drawing attention to the fact it's been wrapped or coated.",
    ],
    trustHeading: 'Looking for the best car wrap in Downtown Dubai?',
    services: [
      { id: 'commercial', title: 'Fleet Branding in Downtown Dubai', description: 'Fleet-wide branding with a consistent, precision-cut identity across every vehicle.' },
      { id: 'wraps',       title: 'Executive Car Wrapping',           description: 'Understated colour and finish changes for personal vehicles that still need to make a statement.' },
      { id: 'ppf',         title: 'PPF for Downtown Vehicles',        description: 'Discreet protection for daily-driven executive vehicles navigating one of the busiest parts of the city.' },
      { id: 'ceramic',     title: 'Ceramic Coating Downtown Dubai',   description: 'A factory-new finish that holds up under dense city driving and valet parking.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Downtown Dubai',
      description: 'Downtown and DIFC-area clients are served from the Wraptors Dubai studio in Al Quoz, with scheduling built around corporate calendars.',
    },
    faqs: [
      { q: 'Do you offer fleet branding for multiple vehicles in Downtown Dubai?', a: 'Yes — full fleet wrapping with consistent branding across every vehicle is one of our core services for Downtown-based businesses.' },
      { q: 'Can you work around a busy office schedule?', a: "Yes, we coordinate fleet and executive vehicle bookings to minimise downtime — including staggered fleet scheduling so you're never without every vehicle at once." },
      { q: 'Do hotel guests or visitors use Wraptors while staying Downtown?', a: "We've worked with a number of clients staying at Downtown hotels who wanted protection or styling done during a short visit — timelines can be arranged around a stay." },
      { q: 'Is PPF worth it for executive cars driven daily in Downtown Dubai?', a: 'Yes — dense traffic, valet parking and frequent stop-start driving all add up to more paint wear than a quieter suburb. PPF on high-contact panels is a common addition for Downtown executives.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['business-bay', 'difc', 'al-quoz', 'dubai-marina'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 5,
  },
  {
    // Canal-front business towers — corporate professionals commuting by
    // car, discreet PPF/styling angle, distinct from Downtown's tourism mix.
    locationName: 'Business Bay',
    slug: 'business-bay',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Business Bay',
    secondaryKeywords: ['PPF Business Bay', 'ceramic coating Business Bay', 'car wrap Dubai'],
    seoTitle: 'Car Wrapping & PPF in Business Bay, Dubai | Wraptors',
    metaDescription: 'Wraptors serves Business Bay with discreet vehicle wraps, PPF and ceramic coating for professionals commuting through one of Dubai’s busiest canal-front business districts.',
    h1: 'Car Wrapping & PPF in Business Bay',
    eyebrow: 'Wraptors Dubai · Business Bay',
    heroCopy: [
      "Business Bay's canal-front towers put a lot of commuter vehicles through daily stop-start traffic and valet parking. Wraptors serves Business Bay with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.",
      'Most Business Bay clients want protection and a subtle finish upgrade, not a loud transformation — we plan the build around that.',
    ],
    localAngleHeading: 'Commute-ready protection.',
    localAngle: [
      "Business Bay's towers mean daily valet parking, tight garage entries and constant canal-front traffic — all of which add up to more fine scratches and paint wear than a quieter suburb.",
      'PPF on high-contact panels, paired with a ceramic coating, is the most common Business Bay booking — protection that holds up to daily commuting without changing how the car looks.',
    ],
    trustHeading: 'Looking for the best car wrap in Business Bay?',
    services: [
      { id: 'ppf',     title: 'PPF for Business Bay Commuters', description: 'High-contact panel protection built for daily valet parking and canal-front traffic.' },
      { id: 'ceramic', title: 'Ceramic Coating Business Bay',   description: 'A low-maintenance gloss and protection layer for cars driven daily through the district.' },
      { id: 'wraps',   title: 'Discreet Car Wrapping',          description: 'Subtle satin and colour changes for professionals who want an upgrade without a loud statement.' },
      { id: 'tint',    title: 'Window Tinting Business Bay',    description: 'Heat-rejecting film for towers with heavy glass exposure and long daily commutes.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Business Bay',
      description: 'Business Bay clients are served from the Wraptors Dubai studio in Al Quoz, with scheduling built around commuter and valet timing.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Business Bay?', a: 'Wraptors serves Business Bay clients from our Dubai studio in Al Quoz, with pickup and drop-off coordinated for eligible builds.' },
      { q: 'Is PPF worth it for a daily commuter car in Business Bay?', a: 'Yes — daily valet parking and canal-front traffic wear on paint faster than most people expect. PPF on the front end and door edges is our most common Business Bay booking.' },
      { q: 'Can you keep the finish understated for a corporate vehicle?', a: 'Yes — most Business Bay clients choose satin or subtle colour work specifically to stay understated. We plan the finish around that brief.' },
      { q: 'Do you offer fleet or multi-vehicle bookings for Business Bay companies?', a: 'Yes — we handle both single executive vehicles and small company fleets based in Business Bay.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['downtown-dubai', 'difc', 'al-quoz', 'jlt'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 8,
  },
  {
    // Financial district — banking/finance executives, valet-heavy,
    // most understated/discreet framing of any location.
    locationName: 'DIFC',
    slug: 'difc',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping DIFC',
    secondaryKeywords: ['PPF DIFC Dubai', 'ceramic coating DIFC', 'luxury car wrapping Dubai'],
    seoTitle: 'Discreet Car Wrapping & PPF in DIFC, Dubai | Wraptors',
    metaDescription: "Wraptors serves DIFC's finance and banking professionals with discreet vehicle wraps, PPF and ceramic coating from our Dubai studio in Al Quoz.",
    h1: 'Discreet Car Wrapping & PPF in DIFC',
    eyebrow: 'Wraptors Dubai · DIFC',
    heroCopy: [
      'The Dubai International Financial Centre is one of the most valet-heavy districts in the city, and its cars are handled by more hands in a week than almost anywhere else. Wraptors serves DIFC with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.',
      'DIFC builds tend toward protection first, styling second — we plan around that.',
    ],
    localAngleHeading: 'Discretion, done properly.',
    localAngle: [
      'Frequent valet handling in DIFC means more door dings, curb strikes and fine scratches than a typical daily commute — PPF on the panels that take the most contact is the single most requested DIFC service.',
      'When clients do want a finish change, it tends to be subtle — satin black, deep gloss or a factory-look protective film rather than a loud colour statement.',
    ],
    trustHeading: 'Looking for the best car wrap in DIFC?',
    services: [
      { id: 'ppf',     title: 'PPF for DIFC Vehicles',        description: 'Door-edge and high-contact panel protection built for frequent valet handling.' },
      { id: 'ceramic', title: 'Ceramic Coating DIFC',          description: 'A low-maintenance, factory-clean finish for cars handled by valet daily.' },
      { id: 'wraps',   title: 'Discreet Colour Transformations', description: 'Satin, deep gloss and subtle colour work for finance professionals who want understated presence.' },
      { id: 'tint',    title: 'Window Tinting DIFC',           description: 'Heat-rejecting film for towers with heavy glass and long parking hours in the sun.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving DIFC',
      description: 'DIFC clients are served from the Wraptors Dubai studio in Al Quoz, with pickup and drop-off built around valet and office schedules.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near DIFC?', a: 'Wraptors serves DIFC clients from our Dubai studio in Al Quoz, with pickup and drop-off coordinated around valet and office schedules.' },
      { q: 'Is PPF worth it for a car handled by valet daily in DIFC?', a: 'Yes — frequent valet handling is one of the hardest daily environments on paint. PPF on door edges and high-contact panels is our most requested DIFC service by a clear margin.' },
      { q: 'Can you keep a DIFC build understated?', a: 'Yes — most DIFC clients choose satin, deep gloss or factory-look protection specifically to stay discreet. We plan the build around that.' },
      { q: 'Do you offer confidential or discreet service for finance professionals?', a: 'Yes — we treat every client relationship discreetly and never share vehicle or project details without permission.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['business-bay', 'downtown-dubai', 'al-quoz', 'dubai-marina'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 9,
  },
  {
    // Newer premium golf-course family community — luxury SUVs and family
    // vehicles, distinct from Emirates Hills' older ultra-private prestige.
    locationName: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Dubai Hills Estate',
    secondaryKeywords: ['PPF Dubai Hills', 'ceramic coating Dubai Hills Estate', 'luxury SUV wrap Dubai'],
    seoTitle: 'Car Wrapping & PPF in Dubai Hills Estate | Wraptors',
    metaDescription: "Wraptors serves Dubai Hills Estate's golf-course community with luxury SUV and family vehicle wraps, PPF and ceramic coating from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & PPF in Dubai Hills Estate',
    eyebrow: 'Wraptors Dubai · Dubai Hills Estate',
    heroCopy: [
      "Dubai Hills Estate's golf-course villas and family homes bring a different vehicle mix than the city centre — more luxury SUVs, fewer daily commuters. Wraptors serves Dubai Hills with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.",
      'Builds here tend to balance protection with a clean, premium finish that suits a family vehicle as much as a weekend car.',
    ],
    localAngleHeading: 'Family-first. Still premium.',
    localAngle: [
      "As one of Dubai's newer premium communities, Dubai Hills Estate has a strong mix of luxury SUVs and multi-vehicle households — cars that see genuine daily use, not just weekend outings.",
      "PPF and ceramic coating are the most common requests here, since most Dubai Hills vehicles are driven daily and need protection that holds up without demanding constant upkeep."
    ],
    trustHeading: 'Looking for the best car wrap in Dubai Hills Estate?',
    services: [
      { id: 'ppf',     title: 'PPF for Dubai Hills SUVs',     description: 'Full-front and high-contact panel protection sized for family SUVs and daily use.' },
      { id: 'ceramic', title: 'Ceramic Coating Dubai Hills Estate', description: 'Low-maintenance gloss and protection built for vehicles that see real daily mileage.' },
      { id: 'wraps',   title: 'Car Wrapping for Family Vehicles', description: 'Clean colour and finish changes suited to SUVs and family vehicles, not just weekend cars.' },
      { id: 'tint',    title: 'Window Tinting Dubai Hills',   description: 'Heat-rejecting film for family vehicles that spend long hours parked in the sun.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Dubai Hills Estate',
      description: 'Dubai Hills clients are served from the Wraptors Dubai studio in Al Quoz, with pickup and drop-off arranged around family schedules.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Dubai Hills Estate?', a: 'Wraptors serves Dubai Hills Estate clients from our Dubai studio in Al Quoz, with pickup and drop-off arranged for eligible builds.' },
      { q: 'Is PPF worth it for a family SUV in Dubai Hills?', a: 'Yes — SUVs driven daily for school runs and errands pick up stone chips and fine scratches quickly. PPF on the front end is our most common Dubai Hills booking.' },
      { q: 'Do you wrap luxury SUVs and family vehicles in Dubai Hills Estate?', a: 'Yes — Dubai Hills is one of our strongest areas for luxury SUVs specifically, alongside the occasional weekend or performance car.' },
      { q: 'Can you coordinate around school and family schedules?', a: 'Yes — we work with Dubai Hills families to schedule drop-off and collection around school runs and daily routines.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['emirates-hills', 'arabian-ranches', 'jvc', 'al-barsha'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 10,
  },
  {
    // Ultra-private gated villa community — multi-car collections, at-
    // property discreet service, the original prestige address.
    locationName: 'Emirates Hills',
    slug: 'emirates-hills',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Emirates Hills',
    secondaryKeywords: ['PPF Emirates Hills', 'luxury car wrapping Dubai', 'ceramic coating Emirates Hills'],
    seoTitle: 'Private Car Wrapping & PPF in Emirates Hills | Wraptors',
    metaDescription: "Discreet, at-property vehicle wraps, PPF and ceramic coating for Emirates Hills' private villa community, from the Wraptors Dubai studio in Al Quoz.",
    h1: 'Private Car Wrapping & PPF in Emirates Hills',
    eyebrow: 'Wraptors Dubai · Emirates Hills',
    heroCopy: [
      "Emirates Hills is one of Dubai's most private residential communities, and many of our clients here maintain multi-car collections. Wraptors serves Emirates Hills with discreet, at-property car wrapping, PPF and ceramic coating from our Dubai studio in Al Quoz.",
      "We offer discreet, at-property service for owners who'd rather not send a car off-site.",
    ],
    localAngleHeading: 'Discreet. At your property.',
    localAngle: [
      'Gated villa living often means a private garage housing several vehicles — we coordinate service across an entire collection at once where it makes sense, rather than one car at a time.',
      'Privacy matters to Emirates Hills clients as much as craftsmanship does. Our team works quietly and professionally, whether that’s a single ceramic coating appointment or protecting an entire garage before a car goes into storage.',
    ],
    trustHeading: 'Looking for the best car wrap in Emirates Hills?',
    services: [
      { id: 'ppf',       title: 'PPF for Emirates Hills Collections', description: 'Full-collection protection, scheduled around you and your garage.' },
      { id: 'ceramic',   title: 'Ceramic Coating Emirates Hills',      description: 'Long-term gloss for cars that see occasional, weekend or storage use.' },
      { id: 'wraps',     title: 'Private Vehicle Wrapping',            description: 'Discreet or statement finishes, planned around a private collection rather than a single car.' },
      { id: 'starlight', title: 'Starlight Headliner Installations',   description: 'A bespoke interior touch for a standout build, installed with the same discretion as everything else.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Emirates Hills',
      description: 'For eligible services, our team can work at your Emirates Hills property directly, rather than requiring drop-off at the Al Quoz studio.',
    },
    faqs: [
      { q: 'Do you offer at-home service in Emirates Hills?', a: 'Yes — for eligible services we can arrange for our team to work at your property rather than requiring drop-off at the Al Quoz studio.' },
      { q: 'Can you service multiple vehicles in one visit?', a: 'Yes, we regularly coordinate service across multi-car collections for Emirates Hills clients in a single scheduled visit.' },
      { q: 'Is my privacy protected when working with Wraptors?', a: 'Absolutely — we treat every client relationship discreetly and never share vehicle or project details without permission.' },
      { q: 'Do you wrap luxury cars, SUVs and performance cars in Emirates Hills?', a: 'Yes — Emirates Hills is one of our strongest areas for full collections spanning luxury SUVs, exotics and performance vehicles.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['palm-jumeirah', 'dubai-hills-estate', 'arabian-ranches', 'al-quoz'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 6,
  },
  {
    // Family villa community, SUVs/4x4s, heat + paint protection for
    // desert-adjacent daily driving — distinct outdoor/off-road angle.
    locationName: 'Arabian Ranches',
    slug: 'arabian-ranches',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Arabian Ranches',
    secondaryKeywords: ['PPF Arabian Ranches', '4x4 wrap Dubai', 'ceramic coating Arabian Ranches'],
    seoTitle: 'Car Wrapping & PPF in Arabian Ranches | Wraptors',
    metaDescription: "Wraptors serves Arabian Ranches' family SUVs and 4x4s with car wrapping, PPF and ceramic coating built for heat and desert-adjacent driving, from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & PPF in Arabian Ranches',
    eyebrow: 'Wraptors Dubai · Arabian Ranches',
    heroCopy: [
      "Arabian Ranches' family villas and desert-adjacent roads mean a vehicle mix built around SUVs and 4x4s. Wraptors serves Arabian Ranches with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.",
      'Heat and fine desert dust are the two biggest factors we plan around here.',
    ],
    localAngleHeading: 'Built for the desert edge.',
    localAngle: [
      "Vehicles based near Arabian Ranches deal with more heat exposure and fine airborne dust than cars parked closer to the coast — it's a different kind of wear, and it calls for a different protection plan.",
      'PPF on the front end and a proper ceramic coating are the two services we recommend most for Arabian Ranches SUVs and family 4x4s driven daily.',
    ],
    trustHeading: 'Looking for the best car wrap in Arabian Ranches?',
    services: [
      { id: 'ppf',     title: 'PPF for Arabian Ranches SUVs & 4x4s', description: 'Front-end and high-contact protection built for heat and fine desert dust.' },
      { id: 'ceramic', title: 'Ceramic Coating Arabian Ranches',      description: 'Heat- and dust-resistant gloss protection sized for daily-driven family vehicles.' },
      { id: 'wraps',   title: 'SUV & 4x4 Car Wrapping',               description: 'Colour and finish changes suited to SUVs and 4x4s, not just sedans.' },
      { id: 'tint',    title: 'Window Tinting Arabian Ranches',       description: 'Heat-rejecting film for family vehicles parked outdoors through the day.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Arabian Ranches',
      description: 'Arabian Ranches clients are served from the Wraptors Dubai studio in Al Quoz, with pickup and drop-off arranged for eligible builds.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Arabian Ranches?', a: 'Wraptors serves Arabian Ranches clients from our Dubai studio in Al Quoz, with pickup and drop-off arranged for eligible builds.' },
      { q: 'Is PPF worth it for SUVs and 4x4s in Arabian Ranches?', a: 'Yes — heat and fine desert dust wear on paint differently than city driving. PPF on the front end and high-contact panels is our most common Arabian Ranches booking.' },
      { q: 'Do you wrap SUVs and family vehicles, not just sports cars?', a: 'Yes — SUVs and 4x4s are the majority of what we wrap for Arabian Ranches clients, alongside the occasional performance or weekend car.' },
      { q: 'How does Dubai heat affect ceramic coating maintenance?', a: 'Heat accelerates how quickly a coating breaks down without proper care — we’ll walk you through a simple maintenance routine so the protection lasts as long as it should.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['dubai-hills-estate', 'motor-city', 'jvc', 'al-barsha'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 11,
  },
  {
    // Dense high-rise towers around the lakes — professional/expat
    // residents, similar to Marina/JBR but its own distinct cluster.
    locationName: 'JLT',
    slug: 'jlt',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping JLT Dubai',
    secondaryKeywords: ['PPF Jumeirah Lake Towers', 'ceramic coating JLT', 'car wrap Dubai'],
    seoTitle: 'Car Wrapping & PPF in JLT (Jumeirah Lake Towers) | Wraptors',
    metaDescription: "Wraptors serves JLT's high-rise towers with car wrapping, PPF, ceramic coating and window tinting for daily-driven and weekend vehicles, from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & PPF in JLT',
    eyebrow: 'Wraptors Dubai · JLT',
    heroCopy: [
      "Jumeirah Lake Towers packs a dense professional and expat community into towers built around the lakes. Wraptors serves JLT with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.",
      "Most JLT builds split between practical daily-driver protection and weekend styling projects.",
    ],
    localAngleHeading: 'Towers, lakes, daily miles.',
    localAngle: [
      "JLT's basement parking and tight tower access mean cars pick up door dings and fine scratches quickly — PPF on the doors and front end is one of the most requested services here.",
      "It's also a strong area for weekend and enthusiast builds — residents with a daily driver and a second car they want to make their own with a full wrap or custom finish.",
    ],
    trustHeading: 'Looking for the best car wrap in JLT?',
    services: [
      { id: 'ppf',     title: 'PPF for JLT Towers',        description: 'Door and front-end protection built for tight basement parking and daily tower access.' },
      { id: 'ceramic', title: 'Ceramic Coating JLT',        description: 'Low-maintenance gloss for cars driven daily out of a JLT tower.' },
      { id: 'wraps',   title: 'Car Wrapping in JLT',        description: 'Full and partial colour changes for daily drivers and weekend project cars alike.' },
      { id: 'tint',    title: 'Window Tinting JLT',         description: 'Heat-rejecting film for lake-facing towers with long daily sun exposure.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving JLT',
      description: 'JLT clients are served from the Wraptors Dubai studio in Al Quoz, with pickup and drop-off coordinated around tower access.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near JLT?', a: 'Wraptors serves JLT clients from our Dubai studio in Al Quoz, with pickup and drop-off coordinated around tower access and parking.' },
      { q: 'Is PPF worth it for cars parked in JLT basement garages?', a: "Yes — tight basement parking is one of the most common causes of door dings and edge scratches. PPF on doors and the front end is our most requested JLT service." },
      { q: 'Do you handle weekend or enthusiast project cars in JLT?', a: 'Yes — JLT has a strong enthusiast community, and we regularly work on second cars being wrapped or customised as a personal project.' },
      { q: 'Can you coordinate pickup around tower access restrictions?', a: 'Yes — we work with JLT building access and visitor parking rules to make drop-off and collection straightforward.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['dubai-marina', 'jbr', 'business-bay', 'al-quoz'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 12,
  },
  {
    // Enthusiast/performance car community near Dubai Autodrome — track-
    // day builds, wraps/PPF framed around performance driving.
    locationName: 'Motor City',
    slug: 'motor-city',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Motor City Dubai',
    secondaryKeywords: ['performance car wrap Dubai', 'PPF Motor City', 'track car wrap Dubai'],
    seoTitle: 'Performance Car Wrapping & PPF in Motor City, Dubai | Wraptors',
    metaDescription: "Wraptors serves Motor City's performance and enthusiast car community with track-ready wraps, PPF and ceramic coating from our Dubai studio in Al Quoz.",
    h1: 'Performance Car Wrapping & PPF in Motor City',
    eyebrow: 'Wraptors Dubai · Motor City',
    heroCopy: [
      "Motor City is built around performance driving — Dubai Autodrome sits at its centre, and the resident base reflects it. Wraptors serves Motor City with car wrapping, PPF and ceramic coating from our Dubai studio in Al Quoz, built around how these cars are actually driven.",
      "Whether it's a track-day car or a daily performance build, we plan the finish and protection around real use, not just how it looks parked.",
    ],
    localAngleHeading: 'Built for how it’s driven.',
    localAngle: [
      "Track-driven and enthusiast cars take a different kind of abuse than a daily commuter — stone chips at speed, heat cycling from track days, and owners who actually care about every panel line.",
      "PPF coverage tends to go further here — full-body rather than just the front end — and wraps are chosen as much for the build's character as for looks.",
    ],
    trustHeading: 'Looking for the best car wrap in Motor City?',
    services: [
      { id: 'ppf',     title: 'PPF for Track & Performance Cars', description: 'Full-body coverage built for stone chips at speed and repeated track use.' },
      { id: 'wraps',   title: 'Performance Car Wrapping',          description: 'Colour, satin and custom finishes for daily performance cars and dedicated track builds.' },
      { id: 'ceramic', title: 'Ceramic Coating Motor City',        description: 'Protection and gloss that holds up to heat cycling and frequent detailing between track days.' },
      { id: 'tint',    title: 'Window Tinting Motor City',         description: 'Heat-rejecting film for performance vehicles that spend long hours in the sun between drives.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Motor City',
      description: 'Motor City clients are served from the Wraptors Dubai studio in Al Quoz, close to Dubai Autodrome, with builds planned around real performance use.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Motor City?', a: 'Wraptors serves Motor City clients from our Dubai studio in Al Quoz, a short drive from Dubai Autodrome.' },
      { q: 'Is PPF worth it for a track-driven car?', a: "Yes, more so than almost any other use case — stone chips at speed and heat cycling from track days wear paint fast. We typically recommend full-body coverage rather than just the front end." },
      { q: 'Do you wrap performance and enthusiast builds, not just daily cars?', a: 'Yes — Motor City is one of our strongest areas for dedicated performance and track-day builds alongside daily-driven cars.' },
      { q: 'Can PPF or a wrap handle repeated track use?', a: 'Yes, when installed and maintained properly — we’ll walk you through the right coverage and care routine for a car that sees regular track time.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['arabian-ranches', 'jvc', 'al-barsha', 'al-quoz'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 13,
  },
  {
    // Central, accessible, mall-adjacent district — practical daily-driver
    // clientele, convenience/turnaround angle rather than luxury framing.
    locationName: 'Al Barsha',
    slug: 'al-barsha',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Al Barsha',
    secondaryKeywords: ['PPF Al Barsha', 'window tinting Al Barsha', 'ceramic coating Al Barsha'],
    seoTitle: 'Car Wrapping & PPF in Al Barsha, Dubai | Wraptors',
    metaDescription: "Wraptors serves Al Barsha with fast-turnaround car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz, a short drive away.",
    h1: 'Car Wrapping & PPF in Al Barsha',
    eyebrow: 'Wraptors Dubai · Al Barsha',
    heroCopy: [
      'Al Barsha sits central and well-connected, close to Mall of the Emirates and a short drive from our Dubai studio in Al Quoz. Wraptors serves Al Barsha with car wrapping, PPF, ceramic coating and window tinting.',
      'Most Al Barsha bookings are practical, daily-driven vehicles — we prioritise a clear timeline and a finish that holds up to real use.',
    ],
    localAngleHeading: 'Central, practical, premium.',
    localAngle: [
      "Al Barsha's location makes it one of the easiest areas in Dubai to coordinate drop-off and collection with our Al Quoz studio, without the longer trip from more outlying communities.",
      'Clients here tend to want protection and a clean finish upgrade without unnecessary complexity — we keep the process straightforward from quote to collection.',
    ],
    trustHeading: 'Looking for the best car wrap in Al Barsha?',
    services: [
      { id: 'ppf',     title: 'PPF for Al Barsha Daily Drivers', description: 'Front-end and high-contact protection for vehicles in regular daily use.' },
      { id: 'ceramic', title: 'Ceramic Coating Al Barsha',       description: 'Low-maintenance gloss and protection for busy daily schedules.' },
      { id: 'wraps',   title: 'Car Wrapping in Al Barsha',       description: 'Full and partial colour changes with a straightforward, fast-turnaround process.' },
      { id: 'tint',    title: 'Window Tinting Al Barsha',        description: 'Heat-rejecting film installed to UAE-legal specification.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Al Barsha',
      description: 'Al Barsha is one of the closest and easiest areas to coordinate with our Dubai studio in Al Quoz for quick drop-off and collection.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Al Barsha?', a: 'Wraptors serves Al Barsha clients from our Dubai studio in Al Quoz — one of the shortest trips of any area we serve.' },
      { q: 'How quickly can I get a car wrapped or protected from Al Barsha?', a: "Timelines depend on the service, but Al Barsha's proximity to Al Quoz makes drop-off and collection especially easy to coordinate around your schedule." },
      { q: 'Is PPF worth it for a daily-driven car from Al Barsha?', a: 'Yes — regular daily driving on busy Sheikh Zayed Road-adjacent traffic wears on the front end faster than owners expect. PPF is our most common Al Barsha booking.' },
      { q: 'Do you handle simple, practical bookings as well as full builds?', a: "Yes — most Al Barsha clients want a straightforward protection or finish upgrade, and we keep that process simple from quote to collection." },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['al-quoz', 'jvc', 'jumeirah', 'dubai-hills-estate'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 14,
  },
  {
    // Rapidly-growing residential community — value-conscious premium
    // families in newer developments, distinct from the older estates.
    locationName: 'JVC',
    slug: 'jvc',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping JVC Dubai',
    secondaryKeywords: ['PPF Jumeirah Village Circle', 'ceramic coating JVC', 'window tinting JVC'],
    seoTitle: 'Car Wrapping & PPF in JVC (Jumeirah Village Circle) | Wraptors',
    metaDescription: "Wraptors serves JVC's growing residential community with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & PPF in JVC',
    eyebrow: 'Wraptors Dubai · JVC',
    heroCopy: [
      "Jumeirah Village Circle is one of Dubai's fastest-growing residential communities, with a resident base that expects premium results without unnecessary cost. Wraptors serves JVC with car wrapping, PPF, ceramic coating and window tinting from our Dubai studio in Al Quoz.",
      "We plan every JVC build around real value — the right protection and finish for how the car is actually used.",
    ],
    localAngleHeading: 'Growing community, real value.',
    localAngle: [
      "JVC's newer buildings and family-focused layout bring us a lot of first-time wrap and PPF clients — owners protecting a new vehicle properly from day one rather than repairing wear later.",
      'We take the time to walk new clients through what actually matters for their vehicle and budget, rather than upselling a package they don’t need.',
    ],
    trustHeading: 'Looking for the best car wrap in JVC?',
    services: [
      { id: 'ppf',     title: 'PPF for New Vehicles in JVC',   description: 'Front-end protection for newly delivered cars, installed before daily wear starts.' },
      { id: 'ceramic', title: 'Ceramic Coating JVC',            description: 'A practical, long-term gloss and protection layer for daily-driven vehicles.' },
      { id: 'wraps',   title: 'Car Wrapping in JVC',            description: 'Full and partial colour changes for JVC’s growing resident community.' },
      { id: 'tint',    title: 'Window Tinting JVC',             description: 'Heat-rejecting film installed to UAE-legal specification.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving JVC',
      description: 'JVC clients are served from the Wraptors Dubai studio in Al Quoz, with honest guidance on what protection or finish actually suits the vehicle.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near JVC?', a: 'Wraptors serves JVC clients from our Dubai studio in Al Quoz, with pickup and drop-off coordinated for eligible builds.' },
      { q: 'Should I protect a new car before daily driving starts?', a: "Yes — most JVC clients bring a new delivery in for PPF before it ever sees regular traffic, which is the most cost-effective time to protect it." },
      { q: 'Is ceramic coating worth it for a first car purchase?', a: "For most owners, yes — it reduces long-term maintenance and keeps resale condition higher, which matters for a first premium vehicle purchase." },
      { q: 'Do you offer honest guidance rather than upselling?', a: 'Yes — we walk every JVC client through what their vehicle and budget actually need rather than defaulting to the most expensive package.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['jlt', 'al-barsha', 'dubai-hills-estate', 'motor-city'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 15,
  },
  {
    // Racecourse/hotel glamour district — luxury and performance vehicles,
    // event-driven presentation builds tied to the Meydan calendar.
    locationName: 'Meydan',
    slug: 'meydan',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Meydan Dubai',
    secondaryKeywords: ['luxury car wrapping Dubai', 'PPF Meydan', 'ceramic coating Meydan'],
    seoTitle: 'Luxury Car Wrapping & PPF in Meydan, Dubai | Wraptors',
    metaDescription: "Wraptors serves Meydan's racecourse and hotel district with luxury and performance vehicle wraps, PPF and ceramic coating from our Dubai studio in Al Quoz.",
    h1: 'Luxury Car Wrapping & PPF in Meydan',
    eyebrow: 'Wraptors Dubai · Meydan',
    heroCopy: [
      'Meydan carries a certain presence — the racecourse, the hotel, and a resident base with genuinely exceptional vehicles. Wraptors serves Meydan with luxury and performance car wrapping, PPF and ceramic coating from our Dubai studio in Al Quoz.',
      'Builds here are often planned around a specific event or appearance as much as everyday use.',
    ],
    localAngleHeading: 'Presence, on and off the track.',
    localAngle: [
      "Meydan's racecourse calendar means a lot of vehicles need to look their best for a specific date, not just eventually — we plan timelines around real deadlines.",
      'Full custom transformations and colour-shift finishes are common here, alongside the protection work needed to keep an exceptional car in exceptional condition.',
    ],
    trustHeading: 'Looking for the best car wrap in Meydan?',
    services: [
      { id: 'wraps',   title: 'Luxury Car Wrapping in Meydan', description: 'Full custom transformations and colour-shift finishes for statement vehicles.' },
      { id: 'ppf',     title: 'PPF for Meydan Collections',     description: 'Full-body protection built to keep an exceptional vehicle in exceptional condition.' },
      { id: 'ceramic', title: 'Ceramic Coating Meydan',         description: 'Show-ready gloss timed around events, appearances and the racecourse calendar.' },
      { id: 'tint',    title: 'Window Tinting Meydan',          description: 'Heat-rejecting film for vehicles that spend long hours parked in the sun between appearances.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Meydan',
      description: 'Meydan clients are served from the Wraptors Dubai studio in Al Quoz, with builds planned around specific dates and appearances where needed.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Meydan?', a: 'Wraptors serves Meydan clients from our Dubai studio in Al Quoz, with pickup and drop-off coordinated for eligible builds.' },
      { q: 'Can you plan a build around a specific event or appearance?', a: "Yes — we regularly plan Meydan builds around a firm deadline, whether that's a race day, an event or a specific appearance." },
      { q: 'Do you wrap luxury cars, SUVs and performance cars in Meydan?', a: 'Yes — Meydan is one of our strongest areas for genuinely exceptional vehicles, from luxury SUVs to full exotic collections.' },
      { q: 'Is PPF worth it for a showpiece vehicle?', a: "Yes — a vehicle that needs to look flawless for appearances benefits the most from full-body PPF, since it protects the finish without changing how the car looks." },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['nad-al-sheba', 'emirates-hills', 'business-bay', 'al-quoz'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 16,
  },
  {
    // Equestrian/stables area beside Meydan — luxury villa residents,
    // quieter and more understated than Meydan's event-driven energy.
    locationName: 'Nad Al Sheba',
    slug: 'nad-al-sheba',
    isPhysicalStudio: false,
    primaryKeyword: 'car wrapping Nad Al Sheba',
    secondaryKeywords: ['PPF Nad Al Sheba', 'ceramic coating Nad Al Sheba', 'luxury car wrapping Dubai'],
    seoTitle: 'Car Wrapping & PPF in Nad Al Sheba, Dubai | Wraptors',
    metaDescription: "Wraptors serves Nad Al Sheba's luxury villa community with understated vehicle wraps, PPF and ceramic coating from our Dubai studio in Al Quoz.",
    h1: 'Car Wrapping & PPF in Nad Al Sheba',
    eyebrow: 'Wraptors Dubai · Nad Al Sheba',
    heroCopy: [
      "Nad Al Sheba's quieter, equestrian-adjacent villas bring a different pace than neighbouring Meydan — understated luxury rather than event-driven presence. Wraptors serves Nad Al Sheba with car wrapping, PPF and ceramic coating from our Dubai studio in Al Quoz.",
      'Most builds here favour long-term protection and a clean, restrained finish.',
    ],
    localAngleHeading: 'Quiet streets, careful builds.',
    localAngle: [
      "Nad Al Sheba's villa residents tend to keep multi-car garages and prioritise long-term condition over standing out — protection-first work is the norm here.",
      'PPF and ceramic coating make up most of what we do in the area, with wraps reserved for subtle satin or factory-look finishes rather than loud colour changes.',
    ],
    trustHeading: 'Looking for the best car wrap in Nad Al Sheba?',
    services: [
      { id: 'ppf',     title: 'PPF for Nad Al Sheba Villas',   description: 'Full-body protection for villa-garaged vehicles prioritising long-term condition.' },
      { id: 'ceramic', title: 'Ceramic Coating Nad Al Sheba',  description: 'Restrained, long-lasting gloss protection for multi-car villa collections.' },
      { id: 'wraps',   title: 'Understated Car Wrapping',      description: 'Satin and factory-look finishes for owners who prefer restraint over a loud statement.' },
      { id: 'tint',    title: 'Window Tinting Nad Al Sheba',   description: 'Heat-rejecting film for villa-parked vehicles.' },
    ],
    whyWraptorsLocal: {
      title: 'Serving Nad Al Sheba',
      description: 'Nad Al Sheba clients are served from the Wraptors Dubai studio in Al Quoz, with the same discretion we bring to any private villa community.',
    },
    faqs: [
      { q: 'Where can I get premium car wrapping near Nad Al Sheba?', a: 'Wraptors serves Nad Al Sheba clients from our Dubai studio in Al Quoz, with pickup and drop-off coordinated for eligible builds.' },
      { q: 'Can you keep a Nad Al Sheba build understated?', a: 'Yes — most clients here choose satin or factory-look protective finishes specifically to stay restrained. We plan the build around that.' },
      { q: 'Do you service multi-car villa collections in Nad Al Sheba?', a: 'Yes — we regularly coordinate protection and finish work across an entire villa garage rather than one car at a time.' },
      { q: 'Is PPF worth it for cars that are driven infrequently?', a: 'Yes — even infrequently driven cars are exposed to sun and heat while parked, and PPF protects the finish whether the car is on the road or in storage.' },
      ...COMMON_FAQS,
    ],
    relatedAreas: ['meydan', 'emirates-hills', 'dubai-hills-estate', 'al-quoz'],
    featuredOnHomepage: true,
    homepageDisplayOrder: 17,
  },
];

export function getLocationBySlug(slug) {
  return LOCATIONS.find((loc) => loc.slug === slug);
}

export function getFeaturedLocations() {
  return LOCATIONS
    .filter((loc) => loc.featuredOnHomepage)
    .sort((a, b) => (a.homepageDisplayOrder ?? 999) - (b.homepageDisplayOrder ?? 999));
}

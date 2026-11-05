// ══ SERVICE SEO CONTENT — core-page detail sections + focus pages ══
//
// Two things live here:
//
// 1. SERVICE_DETAILS: the visible "in Dubai" detail section near the end of
//    each core service page (Wraps, PPF, Ceramic, Tint). Plain, useful copy
//    with real H2/H3 headings, so each page carries its search term in
//    readable text rather than in hidden or stuffed blocks.
//
// 2. FOCUS_PAGES: narrower pages rendered by FocusServicePage.jsx: the
//    Chrome Delete service page and four vehicle-specific pages.
//
//    `published: false` means the page builds and can be previewed at its
//    URL, but carries `noindex`, is left out of sitemap.xml and is not
//    linked from any other page. The model pages wait on real Dubai photos
//    from the client (see DUBAI-FINAL-CHECKLIST.md). To publish one: add
//    its photos (src/data/projectGalleries.js) and set `published: true`.
//    Links to it and its sitemap.xml entry (written by the build, see
//    scripts/prerender.mjs) then appear automatically. All four were published on 2026-11-03 with the
//    client's confirmed project photos.
//
// No prices, warranty terms, durability figures or customer projects are
// stated anywhere below. Brand and model names are used descriptively;
// each model page says Wraptors is independent of the manufacturer.

export const FOCUS_PAGES = [
  {
    slug: 'chrome-delete',
    published: true,
    parent: { label: 'Car Wrapping', path: '/services/wraps/' },
    quoteService: 'wraps',
    seoTitle: 'Chrome Delete Dubai | Blackout Trim Wrapping | Wraptors',
    metaDescription: 'Chrome delete in Dubai at the Wraptors studio in Al Quoz: window surrounds, grilles, badges and brightwork wrapped in gloss black, satin or colour film.',
    serviceName: 'Chrome Delete',
    eyebrow: 'Wraptors Dubai · Chrome Delete',
    headline: 'Lose The Chrome.',
    supportingLine: 'Window Surrounds · Grilles · Badges · Brightwork',
    intro: {
      kicker: 'Your Trim',
      statement: 'Blacked Out.',
      description: 'Chrome delete covers the bright trim on a car in wrap film, most often gloss or satin black, so the brightwork stops pulling the eye away from the body. At our Al Quoz studio in Dubai, each piece is cleaned, prepared and wrapped individually, with edges finished around the trim rather than across it. The original chrome stays untouched underneath.',
    },
    sections: [
      {
        heading: 'What Chrome Delete Covers',
        body: [
          'Every car carries its brightwork differently, so a chrome delete is planned piece by piece rather than sold as a fixed kit. We go around the car with you and agree which parts change and which stay.',
        ],
        points: [
          'Window surrounds and the trim along the top of the doors',
          'Grille surrounds, grille slats and bumper inserts',
          'Badges, model lettering and emblems',
          'Mirror caps, door handles and roof rails',
          'Lower door strips, side vents and tailgate trim',
        ],
      },
      {
        heading: 'Film, Not Paint',
        body: [
          'Painting or powder-coating trim is permanent and usually means removing parts from the car. Wrap film sits over the existing chrome, so the change can be taken back to standard later, which matters on a leased car or one you plan to sell. Parts that run very hot, such as exhaust tips, are not suited to film and are left as they are.',
        ],
      },
      {
        heading: 'Gloss Black, Satin Black or Colour',
        body: [
          'Gloss black is the closest match to most black glass and piano-black interiors. Satin black reads softer and suits matte and satin wraps. A colour-matched or contrasting finish is possible too: some owners match the trim to the brake calipers or the interior instead.',
        ],
        links: [
          { label: 'Matte, Satin or Gloss in Dubai', to: '/learn/matte-satin-gloss-wrap-dubai/' },
          { label: 'Caliper Painting', to: '/services/caliper-painting/' },
          { label: 'Wheel Painting', to: '/services/wheel-painting/' },
        ],
      },
      {
        heading: 'Chrome Delete in Dubai Conditions',
        body: [
          'Window surrounds and roof rails sit in direct overhead sun, so the film choice and the way edges are finished matter more here than in a milder climate. Hand washing is the safest way to look after it: avoid automatic brush washes and keep a pressure washer away from the film edges.',
        ],
      },
      {
        heading: 'On Its Own or as Part of a Wrap',
        body: [
          'Chrome delete can be booked on its own, added to a full colour-change wrap, or planned alongside PPF and window tint so the trim, glass and paint all finish together.',
        ],
        links: [
          { label: 'Car Wrapping in Dubai', to: '/services/wraps/' },
          { label: 'Window Tint', to: '/services/tint/' },
          { label: 'Changing Your Car Colour in Dubai', to: '/learn/changing-car-colour-dubai/' },
        ],
      },
    ],
    process: {
      eyebrow: 'The Process',
      heading: 'Trim, Piece By Piece.',
      steps: [
        { n: '01', title: 'Walkaround', desc: 'We go around the car together and agree which trim pieces change, and the finish for each.' },
        { n: '02', title: 'Preparation', desc: 'Each piece is cleaned and degreased. Badges and trim are removed where that gives a cleaner edge.' },
        { n: '03', title: 'Installation', desc: 'Film is fitted to each piece, with edges wrapped around the trim rather than cut across it.' },
        { n: '04', title: 'Final Check', desc: 'Edges and corners are checked in the studio lighting and anything removed is refitted before handover.' },
      ],
    },
    faqs: [
      { q: 'What is chrome delete?', a: 'Chrome delete covers the chrome and bright trim on a car, such as window surrounds, grille trim, badges and mirror caps, in wrap film. Most owners choose gloss or satin black for a blacked-out look, but the trim can also be done in a colour.' },
      { q: 'Can chrome delete be removed later?', a: 'Yes. Because it is film over the original trim, it can be removed by an installer and the chrome underneath is left as it was.' },
      { q: 'Can I do chrome delete without wrapping the whole car?', a: 'Yes. Chrome delete is often booked on its own. It can also be combined with a full or partial wrap, PPF or window tint.' },
      { q: 'How long does a chrome delete take?', a: 'It depends on how many pieces the car has and whether trim needs to come off. We confirm the timing once we have seen the car and agreed the scope.' },
    ],
  },

  // ── Project pages ────────────────────────────────────────────────────
  // Each one is built around a real, client-confirmed Wraptors project
  // (photos: src/data/projectGalleries.js). Confirmed: the vehicle and the
  // service. Everything else described is what the photos visibly show.
  // Not stated anywhere (not supplied): coverage extent, film or wrap
  // brand, colour/finish names, star count, model years, where the work
  // was done or how long it took.
  {
    slug: 'g-class-wrap',
    published: true,
    parent: { label: 'Car Wrapping', path: '/services/wraps/' },
    quoteService: 'wraps',
    seoTitle: 'G-Class Wrap Dubai | Mercedes G-Wagon Wrapping | Wraptors',
    metaDescription: 'A Wraptors Mercedes G-Class vehicle wrap project, and how we plan G-Class wraps around the flat panels, hinges and trim at our Al Quoz studio in Dubai.',
    serviceName: 'G-Class Wrap',
    eyebrow: 'Wraptors Dubai · G-Class Wrap',
    headline: 'Built Square.',
    supportingLine: 'Mercedes G-Class · Vehicle Wrap',
    intro: {
      kicker: 'The Project',
      statement: 'G-Class.',
      description: 'A black Mercedes G-Class from the Wraptors project collection, wrapped by the Wraptors team. Few cars are less forgiving to wrap. The large flat panels show any ripple or stretch mark, and the exposed hinges, trim strips and spare-wheel cover all have to be worked around cleanly.',
    },
    sections: [
      {
        heading: 'What the Photos Show',
        body: [
          'The gallery shows the finished car from the front, both sides and the rear: the flat doors and bonnet, the flared arches over the multi-spoke wheels, the spare-wheel cover on the tailgate, and the car parked outside a Wraptors studio.',
          'Straight-on side profiles are the hardest test for a G-Class wrap, because light runs evenly across the whole flank and shows any flaw in the film.',
        ],
      },
      {
        heading: 'Why the G-Class Is Different to Wrap',
        body: [
          'The detail is in the hardware: the turn-signal housings on top of the front wings, the exposed door hinges, the trim strips along the doors, the wheel-arch flares and the spare-wheel cover. Each is either removed or worked around so the film finishes cleanly at the edge instead of stopping short or bridging gaps.',
        ],
      },
      {
        heading: 'Planning a G-Class Wrap',
        body: [
          'Satin and matte finishes emphasise the G-Class’s flat surfaces and hard edges; gloss gives more depth and reflection. Many owners pair a wrap with a chrome delete on the grille, window surrounds and door strips, or with PPF on the upright front and lower doors, which take most of the stone chips and sand.',
          'A full colour change can affect the colour recorded on the registration, so check the current Dubai Police and RTA requirements before booking.',
        ],
        links: [
          { label: 'Chrome Delete', to: '/services/chrome-delete/' },
          { label: 'Paint Protection Film', to: '/services/ppf/' },
          { label: 'Changing Your Car Colour in Dubai', to: '/learn/changing-car-colour-dubai/' },
        ],
      },
    ],
    faqs: [
      { q: 'Can a G-Class be wrapped without removing the door hinges and trim?', a: 'Some pieces can be wrapped in place, but the cleanest results usually come from removing trim where practical so the film can be finished around the edges. We agree what comes off at the walkaround.' },
      { q: 'Is satin or matte better than gloss on a G-Class?', a: 'Neither is better; it comes down to the look you want. Satin and matte emphasise the flat panels and hard edges, gloss gives more depth and reflection. We can show samples on the car before you choose.' },
      { q: 'Can you wrap a G-Class and add PPF at the same time?', a: 'Yes. A common approach is PPF on the most exposed areas and a wrap for the colour change, planned together so the two finish cleanly.' },
    ],
    disclaimer: 'Mercedes-Benz, G-Class and G-Wagon are trademarks of Mercedes-Benz Group AG. Wraptors is an independent studio and is not affiliated with or endorsed by Mercedes-Benz.',
  },

  {
    slug: 'lamborghini-urus-ppf',
    published: true,
    parent: { label: 'Paint Protection Film', path: '/services/ppf/' },
    quoteService: 'ppf',
    seoTitle: 'Lamborghini Urus PPF Dubai | Paint Protection Film | Wraptors',
    metaDescription: 'A Wraptors Lamborghini Urus paint protection film project in matte black, and how we plan Urus PPF around its intakes, creases and arches in Dubai.',
    serviceName: 'Lamborghini Urus PPF',
    eyebrow: 'Wraptors Dubai · Lamborghini Urus PPF',
    headline: 'Protect The Edges.',
    supportingLine: 'Lamborghini Urus · Paint Protection Film',
    intro: {
      kicker: 'The Project',
      statement: 'Urus.',
      description: 'A matte black Lamborghini Urus from the Wraptors project collection, protected with paint protection film by the Wraptors team. The Urus is used like an SUV but shaped like a supercar, so the film has to follow sharp creases, deep intakes and wide arches without drawing attention to itself.',
    },
    sections: [
      {
        heading: 'What the Photos Show',
        body: [
          'The gallery stays close to the parts of a Urus that take the most punishment: the front three-quarter with its deep intakes, the wide rear arches over the wheels, and the lower doors and sills. These are the areas debris from the road and the car’s own front tyres reaches first.',
          'On a matte car, protection also has to keep the surface looking matte. Film that adds shine would change the look the owner chose.',
        ],
      },
      {
        heading: 'Where a Urus Takes Damage',
        body: [
          'The front bumper, the leading edge of the long bonnet and the headlights take most of the stone chips. The wide rear arches and lower doors catch debris thrown up by the front wheels, and the sills pick up sand and grit, especially on cars that see motorway and desert driving.',
        ],
        links: [
          { label: 'Is PPF Worth It in Dubai?', to: '/learn/is-ppf-worth-it-dubai/' },
        ],
      },
      {
        heading: 'Fitting Film Around the Urus’s Shape',
        body: [
          'The Urus has deep intakes, sharp body creases and tight radii around the lights and vents. Film has to be stretched, relieved and finished carefully in these areas so the edges do not lift and the creases stay crisp. Coverage, from the front end to the full body, is agreed with the owner around how the car is driven and parked.',
        ],
        links: [
          { label: 'Clear PPF vs Colour PPF', to: '/learn/clear-ppf-vs-colour-ppf/' },
          { label: 'How Long Does PPF Last in Dubai?', to: '/learn/how-long-does-ppf-last-dubai/' },
        ],
      },
    ],
    faqs: [
      { q: 'Should I protect a new Urus before driving it?', a: 'If you plan to fit PPF, before the car covers many kilometres is best. The paint is at its cleanest and needs the least preparation.' },
      { q: 'Can PPF go on a matte Urus?', a: 'Yes. A matte or satin PPF protects a matte finish without making it glossy. We confirm the right film for your car at the quote stage.' },
      { q: 'Can ceramic coating go over PPF on a Urus?', a: 'Yes. Many owners coat over the film to make washing easier. PPF handles chips and scratches; the coating handles gloss and easy cleaning.' },
    ],
    disclaimer: 'Lamborghini and Urus are trademarks of Automobili Lamborghini S.p.A. Wraptors is an independent studio and is not affiliated with or endorsed by Lamborghini.',
  },

  {
    slug: 'rolls-royce-starlight-headliner',
    published: true,
    parent: { label: 'Starlight Headliner', path: '/services/starlight/' },
    quoteService: 'starlight',
    heroMedia: 'starfield',
    seoTitle: 'Rolls-Royce Starlight Headliner Dubai | Wraptors',
    metaDescription: 'A Wraptors starlight headliner project in a white Rolls-Royce, and how we plan fibre-optic starlight roofs for Rolls-Royce cabins at our Dubai studio.',
    serviceName: 'Rolls-Royce Starlight Headliner',
    eyebrow: 'Wraptors Dubai · Rolls-Royce Starlight Headliner',
    headline: 'A Sky Of Your Own.',
    supportingLine: 'Rolls-Royce · Fibre-Optic Starlight Headliner',
    intro: {
      kicker: 'The Project',
      statement: 'After Dark.',
      description: 'A white Rolls-Royce from the Wraptors project collection, fitted with a fibre-optic starlight headliner by the Wraptors team. With the lights on, the roof lining becomes a field of small points of light above the rear cabin.',
    },
    sections: [
      {
        heading: 'What the Photos Show',
        body: [
          'The main photo is taken inside the cabin with the starlight lit, looking across the stars above the rear seats. The others show the car itself: the white body with its darker upper section, the Rolls-Royce badge on the bodywork and the emblem up close.',
        ],
      },
      {
        heading: 'For Cars Built Without the Factory Option',
        body: [
          'Rolls-Royce made the starlit roof famous with its factory Starlight Headliner option, but many Rolls-Royce cars were built without it. Owners come to us because their car was ordered without one, because they bought it used, or because they want a layout or colour the original specification did not offer.',
          'Our installation is an aftermarket fibre-optic headliner, not a Rolls-Royce factory part. If your car is still under the manufacturer’s warranty, check with your dealer how an aftermarket interior change is treated before booking.',
        ],
      },
      {
        heading: 'Planning Your Own',
        body: [
          'Star density runs from around 500 stars for a subtle effect up to 2,500 for a fuller sky, and the colour can be set from pure white through warm and cool tones, with an optional shooting-star effect. Every model has its own headliner shape and roof hardware, so we assess the cabin before confirming a layout.',
        ],
        links: [
          { label: 'Design Your Night Sky', to: '/services/starlight/' },
        ],
      },
    ],
    faqs: [
      { q: 'Is this the same as the Rolls-Royce factory Starlight Headliner?', a: 'No. Ours is an aftermarket fibre-optic headliner installed by Wraptors, not a Rolls-Royce factory option or part.' },
      { q: 'Which Rolls-Royce models can have a starlight headliner?', a: 'We assess each car individually. The headliner shape, sunroof and roof hardware all affect the layout, so we confirm what is possible once we have seen the vehicle.' },
      { q: 'Can I choose the star colour and density?', a: 'Yes. Density runs from around 500 to 2,500 stars and the colour is customisable, with an optional shooting-star effect.' },
    ],
    disclaimer: 'Rolls-Royce and Starlight Headliner are trademarks of Rolls-Royce Motor Cars Limited. Wraptors is an independent studio and is not affiliated with or endorsed by Rolls-Royce.',
  },

  {
    slug: 'porsche-ppf',
    published: true,
    parent: { label: 'Paint Protection Film', path: '/services/ppf/' },
    quoteService: 'ppf',
    seoTitle: 'Porsche 911 PPF Dubai | Paint Protection Film | Wraptors',
    metaDescription: 'A Wraptors Porsche 911 paint protection film project in dark green with gold wheels, and how we plan 911 PPF at our studio in Al Quoz, Dubai.',
    serviceName: 'Porsche PPF',
    eyebrow: 'Wraptors Dubai · Porsche PPF',
    headline: 'Keep It Factory.',
    supportingLine: 'Porsche 911 · Paint Protection Film',
    intro: {
      kicker: 'The Project',
      statement: '911.',
      description: 'A dark green Porsche 911 on gold wheels from the Wraptors project collection, protected with paint protection film by the Wraptors team. On a car like this the colour is the point, so the film has one job: keep the finish looking exactly as it does while the car is driven.',
    },
    sections: [
      {
        heading: 'What the Photos Show',
        body: [
          'The gallery covers the car from every side: the front three-quarter, the bonnet, headlights and Porsche crest, the rear arch over the gold wheel, and the rear deck with its Porsche lettering. Those are the same areas that pick up the most stone chips on a 911.',
        ],
      },
      {
        heading: 'The 911’s Rear Arches',
        body: [
          'The 911 is wide at the rear and narrow at the front, so the rear arches sit directly in the path of debris thrown up by the front tyres. Along with the front bumper, bonnet and headlights, they are one of the first places a 911 picks up chips, which is why the rear arches are a common addition to front-end protection.',
        ],
        links: [
          { label: 'Is PPF Worth It in Dubai?', to: '/learn/is-ppf-worth-it-dubai/' },
        ],
      },
      {
        heading: 'Protecting a Colour You Chose',
        body: [
          'Special-order and Paint to Sample colours are difficult to match if a panel ever needs repainting, which makes protecting the original paint more worthwhile. PPF can be finished in gloss to keep the look as it is, or in satin to change gloss paint to a satin look that can be reversed later.',
        ],
        links: [
          { label: 'Clear PPF vs Colour PPF', to: '/learn/clear-ppf-vs-colour-ppf/' },
          { label: 'PPF vs Ceramic Coating', to: '/learn/ppf-vs-ceramic-coating/' },
        ],
      },
    ],
    faqs: [
      { q: 'What PPF coverage do most 911 owners choose?', a: 'Front-end coverage is the most common starting point, often with the rear arches added. Full-body PPF suits owners who want every panel protected. We recommend coverage after seeing the car and hearing how it is driven.' },
      { q: 'Can PPF be fitted to a GT car’s front splitter and aero parts?', a: 'Exposed aero parts can usually be covered, depending on their shape and material. We assess each part at the walkaround.' },
      { q: 'Can ceramic coating go over PPF on a Porsche?', a: 'Yes. Coating over the film adds gloss and makes washing easier, while the PPF underneath handles chips and scratches.' },
    ],
    disclaimer: 'Porsche and 911 are trademarks of Dr. Ing. h.c. F. Porsche AG. Wraptors is an independent studio and is not affiliated with or endorsed by Porsche.',
  },
];

export const FOCUS_PAGE_PATH = (slug) => `/services/${slug}/`;

const UNPUBLISHED_PATHS = new Set(
  FOCUS_PAGES.filter((p) => !p.published).map((p) => FOCUS_PAGE_PATH(p.slug))
);

// Drops links to focus pages that aren't published yet, so no live page
// links to a page still waiting on photos or approval.
export function publishedLinks(links = []) {
  return links.filter((l) => !UNPUBLISHED_PATHS.has(l.to));
}

// ── Core service pages ──────────────────────────────────────────────────
export const SERVICE_DETAILS = {
  wraps: {
    serviceName: 'Car Wrapping',
    projects: ['g-class-wrap'],
    path: '/services/wraps/',
    eyebrow: 'Car Wrapping Dubai',
    heading: 'Car Wrapping in Dubai, From Our Al Quoz Studio',
    lead: 'Every wrap at Wraptors Dubai is installed in-house at our studio in Al Quoz Industrial Area 4. Colour, finish and coverage are agreed with you first, then the car is prepared and wrapped panel by panel.',
    items: [
      { heading: 'Full and Partial Wraps', body: 'A full wrap changes the colour of every painted panel. A partial wrap covers selected areas, such as the roof, bonnet, mirrors or a two-tone split, for a smaller change.' },
      { heading: 'Gloss, Satin and Matte Finishes', body: 'Gloss gives depth and reflection, satin sits between the two, and matte gives a flat, modern look that needs a little more care.', links: [{ label: 'Choosing a Finish', to: '/learn/matte-satin-gloss-wrap-dubai/' }] },
      { heading: 'Chrome Delete', body: 'Window surrounds, grilles, badges and brightwork wrapped in black or a colour, on their own or as part of a full wrap.', links: [{ label: 'Chrome Delete', to: '/services/chrome-delete/' }] },
      { heading: 'Commercial and Fleet Wraps', body: 'Branded wraps for a single company vehicle or a full fleet, with design placement planned around each vehicle’s panels.' },
      { heading: 'Stripes, Decals and Accents', body: 'Racing stripes, decals and smaller accents can be added on their own or planned with a wrap.', links: [{ label: 'Stripes & Decals', to: '/services/stripes-decals/' }] },
      { heading: 'Wrap Care Through a Dubai Summer', body: 'Bonnets, roofs and boot lids take the most sun. Hand washing and avoiding pressure washers at the edges keep a wrap looking right for longer.', links: [{ label: 'Wraps in Dubai Summer', to: '/learn/car-wrap-dubai-summer-heat/' }] },
      { heading: 'Changing Your Car’s Colour', body: 'A full colour change can affect your registration details. Check the current Dubai Police and RTA requirements before booking.', links: [{ label: 'What to Know Before You Wrap', to: '/learn/changing-car-colour-dubai/' }] },
    ],
    links: [
      { label: 'Paint Protection Film', to: '/services/ppf/' },
      { label: 'Visit the Al Quoz Studio', to: '/areas/al-quoz/' },
    ],
  },
  ppf: {
    serviceName: 'Paint Protection Film',
    projects: ['porsche-ppf', 'lamborghini-urus-ppf'],
    path: '/services/ppf/',
    eyebrow: 'PPF Dubai',
    heading: 'PPF in Dubai: Coverage, Film and Care',
    lead: 'Paint protection film is a clear or coloured urethane layer fitted over the paint to take the stone chips, sand and light scratches that Dubai roads throw at a car. At our Al Quoz studio, coverage is planned around how the car is driven and parked.',
    items: [
      { heading: 'Front-End or Full-Body PPF', body: 'Front-end coverage protects the bumper, bonnet, wings, headlights and mirrors. Full-body PPF covers every painted panel, so the whole car keeps its original finish.', links: [{ label: 'Is PPF Worth It in Dubai?', to: '/learn/is-ppf-worth-it-dubai/' }] },
      { heading: 'Clear, Matte and Colour PPF', body: 'Clear gloss film keeps the factory look. Matte film protects matte paint or gives gloss paint a satin look. Colour PPF changes the colour and protects in one film.', links: [{ label: 'Clear vs Colour PPF', to: '/learn/clear-ppf-vs-colour-ppf/' }] },
      { heading: 'PPF and Ceramic Coating Together', body: 'PPF stops physical damage; a ceramic coating adds gloss and makes washing easier. Many owners use both: PPF on exposed panels, coating over the whole car.', links: [{ label: 'PPF vs Ceramic Coating', to: '/learn/ppf-vs-ceramic-coating/' }] },
      { heading: 'How Long PPF Lasts in Dubai', body: 'Lifespan depends on the film, the coverage, how the car is parked and how it is washed. Heat and sun are the main factors here.', links: [{ label: 'PPF Lifespan in Dubai', to: '/learn/how-long-does-ppf-last-dubai/' }] },
    ],
    links: [
      { label: 'Ceramic Coating', to: '/services/ceramic/' },
      { label: 'Visit the Al Quoz Studio', to: '/areas/al-quoz/' },
    ],
  },
  ceramic: {
    serviceName: 'Ceramic Coating',
    path: '/services/ceramic/',
    eyebrow: 'Ceramic Coating Dubai',
    heading: 'Ceramic Coating in Dubai: What to Expect',
    lead: 'A ceramic coating bonds to the paint to add gloss, UV resistance and a surface that is easier to wash. It does not stop stone chips. At our Al Quoz studio, the paint is inspected and prepared before anything is applied.',
    items: [
      { heading: 'Paint Correction First', body: 'A coating seals the paint as it finds it. Swirls and light scratches are corrected first so they are not locked in under the gloss.', links: [{ label: 'Correction Before Coating', to: '/learn/paint-correction-before-ceramic-coating/' }] },
      { heading: 'Water Spots and Dubai Water', body: 'Coated cars can still show water spots from mineral-heavy water. Most wipe off with a soft microfibre towel if they are not left to bake in the sun.', links: [{ label: 'Why Water Spots Still Appear', to: '/learn/ceramic-coating-water-spots-dubai/' }] },
      { heading: 'Coating Over PPF', body: 'Coating can go over paint protection film as well as paint, so a car with PPF on the front keeps the same gloss and easy washing across every panel.', links: [{ label: 'PPF vs Ceramic Coating', to: '/learn/ppf-vs-ceramic-coating/' }] },
      { heading: 'What a Coating Protects', body: 'Gloss, UV resistance and easier cleaning, yes. Chips, deep scratches and dents, no. Knowing the difference helps you choose the right protection.', links: [{ label: 'What Ceramic Coating Protects', to: '/learn/what-ceramic-coating-protects-dubai/' }] },
      { heading: 'Detailing Between Coats', body: 'Regular detailing keeps a coated car at its best inside and out, and is the right preparation before any coating.', links: [{ label: 'Auto Detailing', to: '/services/detailing/' }] },
    ],
    links: [
      { label: 'Paint Protection Film', to: '/services/ppf/' },
      { label: 'Window Tint', to: '/services/tint/' },
      { label: 'Visit the Al Quoz Studio', to: '/areas/al-quoz/' },
    ],
  },
  starlight: {
    serviceName: 'Starlight Headliner',
    path: '/services/starlight/',
    projects: ['rolls-royce-starlight-headliner'],
    eyebrow: 'Starlight Headliner Dubai',
    heading: 'Starlight Headliners in Dubai',
    lead: 'A fibre-optic starlight headliner turns the roof lining into a night sky. At our Al Quoz studio, star density, colour and layout are planned around the cabin before the headliner is fitted.',
    items: [
      { heading: 'Density and Colour', body: 'Star density runs from around 500 stars for a subtle effect up to 2,500 for a fuller sky, with the colour chosen from pure white through warm and cool tones.' },
      { heading: 'Shooting Stars', body: 'An optional shooting-star effect adds occasional movement across the ceiling on top of the fixed layout.' },
      { heading: 'Planned Around the Cabin', body: 'Headliner shape, sunroofs and roof hardware all affect the layout, so we assess the cabin before confirming a design.' },
      { heading: 'Part of a Custom Interior', body: 'A starlight headliner can be planned alongside new mats, trim colours and materials so the whole cabin works as one design.', links: [{ label: 'Custom Interiors', to: '/services/custom-interiors/' }] },
    ],
    links: [
      { label: 'Window Tint', to: '/services/tint/' },
      { label: 'Visit the Al Quoz Studio', to: '/areas/al-quoz/' },
    ],
  },
  tint: {
    serviceName: 'Window Tint',
    path: '/services/tint/',
    eyebrow: 'Window Tint Dubai',
    heading: 'Car Window Tinting in Dubai',
    lead: 'Window film in Dubai is about heat first and looks second. At our Al Quoz studio, the film and shade are chosen around heat rejection, privacy, night-time visibility and the legal limits, then cut and fitted to each piece of glass.',
    items: [
      { heading: 'Ceramic Film for Heat Rejection', body: 'Ceramic film reduces solar heat and glare without needing to be very dark, and it does not interfere with GPS, phone or radio signals.', links: [{ label: 'Ceramic vs Regular Tint', to: '/learn/ceramic-tint-vs-regular-tint/' }] },
      { heading: 'Legal Tint Levels in Dubai', body: 'UAE traffic rules limit how dark the side and rear windows can be and restrict tint on the windscreen. We only fit compliant shades and confirm the current limits for your car.', links: [{ label: 'Window Tint Laws in Dubai', to: '/learn/window-tint-laws-dubai/' }] },
      { heading: 'Choosing a Shade for Dubai Heat', body: 'A darker shade is not always cooler. Film quality matters more for heat than darkness, so the shade can be chosen for privacy and looks.', links: [{ label: 'Tint for Dubai Heat', to: '/learn/window-tint-dubai-heat/' }] },
      { heading: 'How Long Tint Lasts', body: 'Good film fitted properly should not bubble, peel or turn purple. Constant sun is the main stress, which is why the film choice matters.', links: [{ label: 'Tint Lifespan in Dubai', to: '/learn/how-long-does-window-tint-last-dubai/' }] },
    ],
    links: [
      { label: 'Ceramic Coating', to: '/services/ceramic/' },
      { label: 'Chrome Delete', to: '/services/chrome-delete/' },
      { label: 'Visit the Al Quoz Studio', to: '/areas/al-quoz/' },
    ],
  },
};

// Shared business entity for page-level Service schema (matches the
// site-wide AutomotiveBusiness JSON-LD in index.html).
export const PROVIDER = {
  '@type': 'AutomotiveBusiness',
  name: 'Wraptors Dubai',
  telephone: '+971567279727',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '32 9B St, Unit B05, Al Quoz Industrial Area 4',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
};

export function serviceSchema({ name, description, url, siteUrl, crumbs }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `${name} in Dubai`,
        serviceType: name,
        description,
        url,
        provider: PROVIDER,
        areaServed: { '@type': 'City', name: 'Dubai' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.label,
          item: `${siteUrl}${c.path}`,
        })),
      },
    ],
  };
}

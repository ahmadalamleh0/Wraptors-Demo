// Service-page FAQs — customer-facing questions answered before someone
// books, not SEO copy. Keyed by the same service id used across
// SERVICE_PAGES / aftercareProducts.js (wraps, ppf, ceramic, tint).
// A service with no entry here simply doesn't render an FAQ section (see
// ServiceFaqSection.jsx) rather than showing placeholder questions.
export const SERVICE_FAQS = {
  wraps: [
    {
      q: 'How do I choose the right wrap finish for my car?',
      a: 'We normally look at the body shape, factory trim, wheels, interior colour and how loud you actually want the car to be before choosing the finish. The best wrap is the one that looks like it belongs on that specific car.',
    },
    {
      q: 'How do I keep a wrapped car looking good in Dubai?',
      a: 'Do not treat it like bare paint. Hand washing is the safest option. Avoid aggressive automatic brush washes, harsh degreasers and blasting a pressure washer directly into wrap edges. Bird droppings, tree sap and heavy contamination should not sit on the film for days, especially when the car is baking outside.',
    },
    {
      q: 'Can a wrap look as clean as paint up close?',
      a: 'Yes, when the installation is done properly. The difference shows around edges, corners, handles, trim and complicated body lines. A premium wrap should feel integrated into the vehicle, not like vinyl was simply laid over it.',
    },
    {
      q: 'What is chrome delete?',
      a: 'Chrome delete covers the chrome and bright trim on a car, such as window surrounds, grille trim, badges and mirror caps, in wrap film. Most owners choose gloss or satin black for a blacked-out look, but the trim can also be done in a colour that matches or contrasts with the car. Because it is film, the original trim stays underneath.',
    },
  ],
  ppf: [
    {
      q: 'What does PPF actually protect the paint from?',
      a: 'PPF creates a physical layer over the paint to help protect against stone chips, light scratches, road debris and everyday wear. It is especially useful on exposed areas such as the bonnet, bumper, mirrors and front fenders, where damage tends to happen first.',
    },
    {
      q: 'Do I need full body PPF or just the high impact areas?',
      a: 'Not every vehicle needs the same coverage. High impact protection makes sense when the priority is protecting the areas that take the most abuse, while full body PPF is better for owners who want more complete protection across the entire exterior. How you drive, where the car is parked and how important preserving the original paint is should determine the coverage.',
    },
    {
      q: 'Will PPF change the way my car looks?',
      a: 'Clear PPF is designed to preserve the original appearance of the paint while adding protection. There are also different finishes and colour PPF options if you actually want to change the character of the vehicle while protecting it. The installation should look integrated into the car rather than like a layer sitting on top of it.',
    },
    {
      q: 'What separates a proper PPF installation from a bad one?',
      a: 'A good installation comes down to preparation, clean alignment, controlled stretching, properly finished edges and attention around difficult panels. Poor installation usually starts showing itself around edges, corners, seams and complicated body lines. The film matters, but the person installing it matters just as much.',
    },
  ],
  ceramic: [
    {
      q: 'What does ceramic coating actually protect against?',
      a: 'It chemically bonds to the paint to create a harder, glossier, more hydrophobic surface. Water beads and slides off more easily, which carries dust and light contamination with it, and it adds a real layer of UV and chemical resistance that helps the paint hold its colour and depth over time.',
    },
    {
      q: 'Will it stop stone chips or scratches?',
      a: 'No. A coating has no meaningful thickness to absorb a physical impact like a stone chip or a key dragged across a panel. If chip and scratch protection is the priority, that is what PPF is built for — many owners run PPF on the highest-impact panels with ceramic coating over the whole car for gloss and easy maintenance.',
    },
    {
      q: 'Does my car need paint correction before coating?',
      a: 'It depends on the paint condition. A car with visible swirl marks or light scratches benefits from correction first, since coating seals the paint exactly as it finds it — existing haze or scratching is still there afterward, just under a glossier surface. Paint that is already in good shape may only need a light enhancement polish.',
    },
    {
      q: 'How do I look after a ceramic-coated car day to day?',
      a: 'Washing gets easier since less grime bonds to the surface, but it is not maintenance-free. Bird droppings, tree sap and heavy contamination should still be cleaned off in reasonable time. Fresh water spots from Dubai’s mineral-heavy water are normal and usually wipe off with a soft microfiber towel — reduced beading and a duller finish are the real signs the coating needs attention.',
    },
    {
      q: 'How long does a coating last, and does it need reapplying?',
      a: 'Longevity depends on the product used, how the car is maintained and how it is parked and driven day to day. Ask our team about the specific coating and expected lifespan as part of your quote, so you know what to expect before booking.',
    },
  ],
  tint: [
    {
      q: 'What are the benefits of window tinting?',
      a: 'Window tinting helps reduce heat and glare, provides UV protection, enhances privacy, and helps protect your interior from fading while refining your vehicle’s appearance.',
    },
    {
      q: 'How long does window tinting take?',
      a: 'Most installations take 2–4 hours, depending on the vehicle and number of windows. We take the time needed for precise application and a clean finish.',
    },
    {
      q: 'What tint options can I choose in Dubai?',
      a: 'Our team can help you choose a suitable film for your vehicle, preferred appearance, and applicable local requirements.',
    },
    {
      q: 'How do I care for my tinted windows?',
      a: 'Follow the installer’s recommended curing time before lowering your windows. Clean with a soft cloth and an ammonia-free cleaner, and avoid abrasive materials or sharp objects near the film.',
    },
    {
      q: 'Does window tinting come with a warranty?',
      a: 'Ask our team about the manufacturer and installation warranty available with your selected film.',
    },
  ],
  starlight: [
    {
      q: 'How many stars and what colours can I choose?',
      a: 'Density runs from 500 stars for a subtle effect up to 2,500 for a fuller night sky, and colour is fully customisable — from Pure White and Ice Blue through Warm Gold, Purple, Emerald and more. You can preview combinations before committing to a layout.',
    },
    {
      q: 'Can I add a shooting star effect?',
      a: 'Yes, it is an optional addition on top of the standard fixed layout, giving the ceiling occasional movement rather than a completely static field.',
    },
    {
      q: 'Will the installation fit my vehicle’s headliner?',
      a: 'Layout, density and visual direction are planned around your specific cabin so the finished installation feels integrated into the vehicle rather than added afterward. We assess the headliner before confirming a design.',
    },
    {
      q: 'How long does a starlight installation take?',
      a: 'Timelines vary depending on star count, headliner complexity and whether the shooting star effect is included. We can give you a clearer timeframe once we have reviewed your vehicle.',
    },
  ],
  detailing: [
    { q: 'Is detailing worth doing before PPF or ceramic coating?', a: 'Yes. Film and coatings go onto the surface as they find it, so the car is cleaned and prepared first. We include the preparation the job needs when we quote.' },
    { q: 'How often should a car be detailed in Dubai?', a: 'It depends on how the car is used and where it is parked. Cars parked outdoors pick up dust and sand quickly and benefit from more frequent care. We can suggest a routine once we have seen the car.' },
    { q: 'Can I book interior or exterior detailing on its own?', a: 'Yes. Interior and exterior detailing can be booked together or separately.' },
  ],
  'custom-interiors': [
    { q: 'Can you change the colour of my interior?', a: 'Yes. We talk through colours and materials at the consultation and confirm what suits your car before any work starts.' },
    { q: 'Can a custom interior be combined with a starlight headliner?', a: 'Yes. Many owners plan both together so the colours and materials work with the lighting.' },
    { q: 'How long does a custom interior take?', a: 'It depends on the scope. We confirm a timeline once the design and materials are agreed.' },
  ],
  'stripes-decals': [
    { q: 'Can racing stripes be removed later?', a: 'Yes. Stripes and decals are film, so they can be removed by an installer.' },
    { q: 'Can stripes be combined with a wrap or PPF?', a: 'Yes. They are usually planned together so the layers and edges work with each other. We confirm the approach for your car at the quote.' },
    { q: 'Do you design custom decals?', a: 'Yes. We can source the decal you have in mind or design one from scratch with you.' },
  ],
  'caliper-painting': [
    { q: 'Can my calipers match my wrap colour?', a: 'Yes. Calipers can be matched to the wrap or paint, or chosen to contrast with it. We go through the options at the quote.' },
    { q: 'Can calipers be done together with wheel painting?', a: 'Yes, and planning both together usually gives the most cohesive result.' },
  ],
  'wheel-painting': [
    { q: 'Can you paint my wheels to match my wrap?', a: 'Yes. Wheel colours can be matched to a wrap or chosen to contrast with it. We go through the options at the quote.' },
    { q: 'Can you paint the calipers at the same time?', a: 'Yes. Wheels and calipers are often planned together so they work as a pair.' },
  ],
  'custom-builds': [
    {
      q: 'Will a body kit fit my vehicle?',
      a: 'Fitment depends on your specific make, model and the kit itself. We assess compatibility for your vehicle before confirming any installation.',
    },
    {
      q: 'Can I supply my own body kit?',
      a: 'Yes, we can work with a body kit you provide. We review the parts alongside your vehicle to confirm fitment and installation requirements before starting.',
    },
    {
      q: 'How long does a custom build take?',
      a: 'Timelines vary depending on the scope of the build, parts availability and the amount of fitment work involved. We can give you a clearer timeframe once we have reviewed your project.',
    },
    {
      q: 'How do I get a quote for a custom build?',
      a: 'Share your vehicle details and what you have in mind through the quote form on this page, or reach out to our team directly, and we will walk you through the next steps.',
    },
  ],
};

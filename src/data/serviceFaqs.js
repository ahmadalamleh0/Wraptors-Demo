// Service-page FAQs — customer-facing questions answered before someone
// books, not SEO copy. Keyed by the same service id used across
// SERVICE_PAGES / aftercareProducts.js (wraps, ppf, ceramic, tint).
// Only Wraps and PPF have real, approved copy so far; a service with no
// entry here simply doesn't render an FAQ section (see
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
};

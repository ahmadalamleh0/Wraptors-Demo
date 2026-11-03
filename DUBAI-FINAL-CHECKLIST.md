# Wraptors Dubai: Final Checklist

**Date:** 2026-10-29 (updated after the final release check). **Live site:** <https://wraptorsdubai.com> (Netlify; `www` 301 → bare domain).

**Sources:**
- The client's two "SEO Proposal & Audit" slides (WhatsApp, 26 Oct): *On-Page SEO Priorities* and *Content Gap & Keyword Architecture*
- The follow-up instructions of 29 Oct
- Git history up to `1d6bdff`
- The live site

**How "live" was verified:**
- All 49 routes were fetched from wraptorsdubai.com and compared with a local production build of `1d6bdff`: titles, descriptions, canonicals, robots tags, H1s and visible text.
- They were identical, apart from article dates (a time-zone bug, fixed below).
- The live CSS contains the 26 Oct service-card font.
- So `1d6bdff` is what's deployed.

Bundle file hashes differ between the Windows and Linux builds, so the comparison is by content, not by file name.

---

## 1. Completed and verified live

| Client request | Live state |
|---|---|
| New Dubai number **+971 56 727 9727** everywhere | All `tel:` links, every WhatsApp link (`wa.me/971567279727`), footer, area-page CTAs and LocalBusiness schema. No old number anywhere in source or build. |
| One primary keyword per core page | Titles: "PPF Dubai \| …", "Car Wrapping Dubai \| …", "Ceramic Coating Dubai \| …", "Window Tint Dubai \| …". Homepage: "Wraptors Dubai \| Car Wrapping, PPF & Ceramic Coating Studio". |
| H1s contain the search term (wraps, PPF) | Service H1s read "Wraptors Dubai · Car Wrapping Bespoke Styling", "Wraptors Dubai · Paint Protection Film Preserve The Original.", and so on. The visible eyebrow sits inside the H1. |
| Fix social links set to "#" | No `#` or empty links on any of the 49 pages. Footer: Instagram `@wraptors.dubai`, YouTube channel. TikTok/Facebook hidden until real Dubai URLs exist. All displayed social URLs return 200. |
| Every article links to its service page and the quote form | 16/16 articles link to their service page and `/#cta`, plus an area page. |
| Location pages link to service pages | 18/18 area pages link to 3–4 service pages. |
| Sitemap, canonicals, indexability | 49 sitemap URLs, all trailing-slash on the bare domain. Self-referencing canonicals, no `noindex`, robots.txt points to this site's own sitemap. Unique titles; one H1 per page. |
| Reviews presentation | Canadian reviews are no longer passed off as Dubai: labelled "Client Experiences Across Wraptors", with no invented 5.0 / 581 rating. *(Real Dubai reviews: see §3.)* |
| Services card design | The restored landing-page cards, linked to the service pages, with Rajdhani 700 uppercase titles (`cdc54a5`, confirmed in the live CSS). |
| Educational blogs (client list) | All exist: PPF vs ceramic, how long PPF lasts in Dubai, wrap care in Dubai summer, and tint legality (in the window tinting guide, "Legal Considerations"). |

## 2. Fixed locally, not deployed (this commit)

Checked with a production-context build (`CONTEXT=production npm run build`, 49/49 prerendered), lint, link and SEO checks over all 49 routes, and browser screenshots at 1440 / 834 / 390 with no console errors and no horizontal overflow.

| Change | Detail |
|---|---|
| **Colour PPF** on the PPF page | A new "Colour PPF / Colour, Protected." block in the page's existing intro style, after "What the Film Does". It explains colour change plus protection from the same urethane film family as clear PPF, and that the film is removable. Anchor `#colour-ppf`. Text only (see §3 for imagery). |
| **Matte / satin / gloss** on the Wraps page | Woven into the existing "Your Car / Reintroduced." copy, with the block's built-in finish markers: Gloss · Satin · Matte · Chrome Delete. |
| **Chrome Delete** | Explained in the same copy (window surrounds, badges, brightwork in black or a custom colour), plus a new Wraps FAQ "What is chrome delete?" and a **Chrome Delete** option in the quote form's Vehicle Wraps step. The Wraps meta description now names gloss, satin, matte and chrome delete (160 characters). |
| **WhatsApp** | Every integration audited: floating button, booking CTA, `/book`, `/franchise`, the quote form hand-off and area CTAs. All use `971567279727`. The floating button and booking CTA now read the number from the one shared constant (`src/lib/whatsappEnquiry.js`). The hand-off messages keep their intended blank-line spacing (previously stripped). `wa.me` resolves to WhatsApp's chat for `phone=971567279727`, with the prefilled text intact. |
| **Internal links without the trailing slash** | Every internal link pointed at a URL that 301s on Netlify (e.g. `/about` → `/about/`). All internal links now use the final `/…/` URL (`pagePath()` in `src/lib/siteConfig.js`), and the Navbar active state is normalised. |
| **FAQ answers missing from the HTML** | Answers rendered only after a click, so no FAQ answer on any service, area or article page was in the prerendered HTML. They're now always present and just `hidden` while closed, with no visual change. |
| **Article dates one day early** | Dates parsed as UTC showed the previous day west of UTC, and made the prerendered date depend on the build machine. Dates are now parsed as local dates. |
| **Every location page links to the studio** | Area pages get "Visit The Al Quoz Studio" (→ `/areas/al-quoz/`) in the CTA row. The Al Quoz page gets "Get Directions To The Studio" (Google Maps, the same address as the Visit Us map). Live, only 11/18 area pages linked to the studio. |
| **Dead store buttons** | `wraptorsstore.com` returns Shopify's "Store unavailable" (HTTP 402). The aftercare products still show; only their "Shop Product" buttons are hidden, until `STORE_URL` in `src/data/aftercareProducts.js` is set. |

**Deploy:** none. These changes are committed locally only and need review, push and a Netlify deploy.

## 3. Requires client information or approval

| Item | What's needed |
|---|---|
| **Prices in titles / price pages** ("from AED 749 / 2,500 / 6,500") | Real, current starting prices per service, in writing. Not invented. |
| **Dubai Google reviews** | The actual Dubai reviews, or confirmation to show the Dubai Google rating. The current reviews are Canadian, labelled honestly. |
| **WhatsApp account** | The shop must confirm **+971 56 727 9727** has an active WhatsApp (Business) account. Links route correctly, but `wa.me` can't prove an account exists. |
| **Store link** | A working store URL for the aftercare products (`wraptorsstore.com` is unavailable). |
| **Authentic Dubai hero / media** | Every video in the project shows **Canadian** locations (brick plazas, Ontario plates, "Wraptors East" signage), including the current hero, a car meet with "DUBAI" lettering added. No authentic Dubai footage exists to swap in; the shop needs to supply studio and car footage. Hero left unchanged as instructed. |
| **Colour PPF imagery** | A photo from a confirmed Dubai colour-PPF job. The blue McLaren set used in a colour-PPF article can't be confirmed as colour PPF, and its setting isn't Dubai. |
| **Homepage H1 keyword** | "Crafted with purpose. Built for legacy." has no search term. A hidden prefix was removed on purpose (`001e9ef`). A visible wording change needs design and copy approval. |
| **Wraps title wording** | The client asked for "Car Wrapping Dubai \| Luxury Colour Change Wraps". Live: "Car Wrapping Dubai \| Colour Change & Custom Wraps \| Wraptors". The primary keyword is already first; change it if the client wants their exact wording. |
| **Instagram account** (not changed) | Footer and Global Locations link `instagram.com/wraptors.dubai` (with a dot, added 17 Sep). The mobile menu links the brand account `instagram.com/wraptors`. The earlier Dubai landing page config says "update to Dubai when **@wraptorsdubai** is live" (no dot), implying the Dubai account didn't exist in July. Instagram shows the same login wall for every handle, so the account can't be verified without logging in. **The shop must confirm the exact Dubai handle**; then all three links can point to it. YouTube is the brand channel (`@TorontoWraptors`). Supply Dubai TikTok and Facebook URLs to re-enable them. |
| **Global Locations count** (shown as 16; briefly removed and restored on 2026-10-30 at the client's request) | The stat says **16 Locations**, but the section lists **15**: UAE 1 (Dubai), Canada 9 (Mississauga HQ, Vaughan, Ottawa, Wraptors East, Barrie, Hamilton, Calgary, Waterloo, Kingston), USA 4 (Miami, Orlando, Fort Lauderdale, Scottsdale), South Africa 1 (Cape Town). `fb523fd` (21 Sep, "bump locations count") changed the stat from 15 to 16 without adding a location. **The client must name the 16th location, or approve showing 15.** The globe also has no markers for Wraptors East, Waterloo and Kingston (12 markers vs 15 listed). |
| **Brabus / body kit naming** | `/services/custom-builds/` covers body kits. Using "Brabus" in titles or headings implies a brand relationship, so that needs the client's confirmation that it's permitted and accurate. |
| **Location page count** | The slide says "existing 19"; the site has 18 area pages. Confirm whether one is missing. |
| **Colour PPF / finishes copy** | New visible copy on PPF and Wraps (and the Chrome Delete FAQ) needs sign-off. Chrome Delete is confirmed offered (29 Oct); matte, satin and gloss are described as finish options without brand or durability claims. |

## 4. Optional future SEO improvements (not done, by instruction or because they'd be thin)

| Idea | Assessment |
|---|---|
| Separate Colour PPF / Matte & Satin / Chrome Delete pages | Not created. Each is now covered on its parent service page, plus existing articles ("Clear PPF vs Colour PPF", "Vinyl Wrap vs Colour PPF", "Matte, Satin or Gloss Wrap in Dubai"). A separate page would duplicate them until there's distinct content (real galleries, process, pricing). |
| Price pages | Only with confirmed prices; otherwise thin and risky. |
| Brand / model pages (G-Class wrap, Urus PPF, Rolls-Royce starlight, Porsche PPF) | Not created. They need real Dubai project galleries for each model to avoid thin or doorway pages, and must not imply official brand partnerships. |
| Meta descriptions over 160 characters | 12 pages at 163–181 characters (8 area pages, PPF, Starlight, `/book/` and one article) may be truncated in search results. A cosmetic trim. |
| Wraps "Reintroduced." statement breaks as "REINTRODUCE / D." at 1440 px | Pre-existing on live (same measurements). A design tweak if wanted. |
| Search Console | Submit the sitemap after the next deploy and monitor the Coverage and Performance reports. No GSC access was available for this audit. |

---

## 5. Final release check (2026-10-29, local production build of `f5feb7b`)

| Check | Result |
|---|---|
| Lint | Clean |
| Production build | `CONTEXT=production npm run build`: 49/49 routes prerendered |
| Sitemap | 49 URLs, all `https://wraptorsdubai.com/…/` (bare domain, trailing slash) |
| robots.txt | `Allow: /`, own sitemap only |
| Indexing | 0 pages with a robots `noindex`; 49/49 canonicals equal their sitemap URL |
| Internal links | No slash-less, `#`, empty or broken internal links |
| Phone | Only +971 56 727 9727: display text, `tel:+971567279727`, schema `+971567279727`. No other UAE numbers in source or build. |
| WhatsApp | Only `wa.me/971567279727`, on all 8 pages that link it, including the quote, booking and franchise hand-offs |

**To publish:** push `f5feb7b` and this checklist update to `origin/main` (Netlify deploys from it), then re-run the live comparison. Waiting on the owner's approval.

---

## 6. SEO pass, 2026-11-03 (local, not deployed)

### Done

| Area | Change |
|---|---|
| Core service pages | Each of Wraps, PPF, Ceramic and Tint gets a visible "in Dubai" section before the quote form: a keyword H2 (e.g. "Car Wrapping in Dubai, From Our Al Quoz Studio"), four to six H3 topics with links to the matching guides, then links to related services, the Al Quoz studio and the quote form. Each page also gets Service and BreadcrumbList JSON-LD. Content: `src/data/serviceSeo.js`. |
| Titles and H1s | Wraps title now uses the client's wording, "Car Wrapping Dubai \| Luxury Colour Change Wraps \| Wraptors". PPF H1 eyebrow reads "Wraptors Dubai · PPF Paint Protection Film". "Bespoke Styling" kept. Hero designs unchanged. |
| Chrome Delete page | `/services/chrome-delete/`: own title, description, canonical, H1, process, FAQs, Service, BreadcrumbList and FAQPage schema, a quote form (Vehicle Wraps) and links to Wraps, Tint, guides and the studio. Published and in the sitemap. Linked from Wraps, Tint, 8 area pages and 2 wrap guides. The hero uses a dark gradient; no photo is shown. |
| Colour PPF, matte and satin | Kept on the PPF and Wraps pages: no separate pages, because the content would duplicate them. |
| Model pages (unpublished) | `/services/g-class-wrap/`, `/services/lamborghini-urus-ppf/`, `/services/rolls-royce-starlight-headliner/` and `/services/porsche-ppf/`, with vehicle-specific content, FAQs, schema and a manufacturer disclaimer. They build and can be previewed, but are `noindex, follow`, left out of the sitemap and not linked from any page until they're published. No photos, projects or results are claimed. |
| Area pages | All 18 get a "Before You Book" row with two guides suited to the area, plus Chrome Delete and/or Starlight where relevant. They already linked to the services and the studio. Fixed: the Starlight card on Emirates Hills had no category label. |
| Guides | The PPF vs ceramic, PPF lifespan and summer wrap care guides already existed and link to their services and the quote form; they now also link to related services. New guide: **Window Tint Laws in Dubai** (`/learn/window-tint-laws-dubai/`). The tint guide's vague legal section now gives the reported limits and links to the new guide. |
| Homepage | Headline unchanged. The label above it reads "Dubai Studio · Al Quoz, UAE"; the services line reads "Car wrapping · PPF · Ceramic coating · Window tint" (two lines on mobile). Both lines were already visible on the page; nothing hidden. |
| Social | Every Dubai Instagram link is `https://www.instagram.com/wraptors.dubai/` (footer, mobile menu, Global Locations), and the site-wide business schema has it as `sameAs`. |
| Meta descriptions | Six over 165 characters trimmed: area pages Dubai, Al Quoz, Business Bay, Arabian Ranches and JLT, and one article. |

Not changed, as instructed: reviews, the "16 Locations" stat, the aftercare store and prices.

### Needs photos or client approval before publishing

| Page | What's needed |
|---|---|
| G-Class Wrap, Urus PPF, Rolls-Royce Starlight, Porsche PPF | Real Dubai project photos for each. To publish: add a gallery, set `published: true` in `src/data/serviceSeo.js` and add the URL to `public/sitemap.xml`. Links from the PPF and Wraps pages and the PPF guides appear automatically. Also needs the client to approve the copy and the use of the brand names. |
| Chrome Delete | Live without photos. Add real chrome delete photos when available. |
| Window Tint Laws in Dubai | Legal figures (50% side and rear, windscreen strip about 15 cm, AED 1,500 fine) are as publicly reported by Dubai Police and Gulf News. Each is attributed and readers are told to confirm. The client should check and approve this guide before deploying. |
| Prices | Still pending approved prices. |

### Checks

- `CONTEXT=production npm run build`: 55/55 routes. That's 49 plus Chrome Delete, the tint-laws guide and the four unpublished pages.
- Sitemap: 51 URLs. Every published page has a self-canonical, one H1, a unique title and a description of 160 characters or fewer, with no `noindex`. All JSON-LD blocks parse.
- No broken, slash-less, `#` or localhost links. Every `#cta` link has a quote form on the same page.
- The four unpublished pages: `noindex`, not in the sitemap, linked from 0 pages.
- One existing issue, not changed: `/book/` has no internal links pointing to it.
- Browser at 1440, 834 and 390 px: no console errors, no horizontal overflow, one H1 per page.
- Existing, not changed: on inner pages at 1440 px, the centred navbar logo overlaps the "Services" link.

## 7. Release-prep fixes, 2026-11-03 (local, not deployed)

| Item | Result |
|---|---|
| Navbar logo over "Services" (desktop) | **Fixed.** The links + CTA were wider than the right half of the bar. From 1680px nothing changes. At 1360–1679px it's the same bar with tighter link spacing. Below 1360px the links move into the existing full-screen menu, with the Start Your Build button kept on desktop. Checked at 1920, 1680, 1600, 1440, 1366, 1360, 1280, 1024, 834 and 390px: no overlap, and the menu opens with all 7 links. |
| Window Tint Laws guide | **Revised against official sources.** AED 1,500 cites the federal violations schedule, Ministerial Resolution No. 178/2017, item 68 (exceeding the permitted tint percentage, or tinting without permission). 50% side/rear is attributed to Dubai Police's 2017 announcement; the schedule itself sets no percentage. Added Dubai impoundment under Decree No. 30 of 2023, with a reported AED 10,000 release fee. **The 15 cm windscreen-strip claim is removed**: no current official guidance was found, so the windscreen is treated as off-limits. Also removed from the tint guide's legal section. |
| `/book/` | **Reported, not changed.** The page works: the form validates and hands off to WhatsApp, because it has no email/Web3Forms delivery. Its only entry point, the homepage "Book your visit" CTA, was removed on purpose in `5be95e8` (19 Oct). It's still in the sitemap but has no internal links. Client to decide: re-add a link, or drop it from the sitemap. |
| Model pages | All four `noindex, follow`, 0 sitemap entries, 0 pages linking (production build). |
| Contact links | 74 `tel:+971567279727`. 13 WhatsApp links, all `wa.me/971567279727`. 113 Instagram links, all `https://www.instagram.com/wraptors.dubai/`, 0 to the brand account. |
| Quote form | Tested in the browser with the Web3Forms request **intercepted** (nothing sent), on the Chrome Delete page and the homepage. The payload carries the service, vehicle, build detail and access key, and success shows "Request received". A failed submission falls back to WhatsApp with the enquiry prefilled. **Real delivery was not tested**: it needs `VITE_WEB3FORMS_KEY` set in Netlify's environment, which is not checked here, and one live test submission. |

## 8. Project pages published, 2026-11-03 (local, not deployed)

The client-supplied photos in `singleprojects/` are confirmed as real Wraptors projects for each vehicle and service.
- Photos are matched by vehicle and converted to WebP at 1440 and 720 px: 21 photos, 16 MB down to 4.6 MB.
- Captions say "Wraptors Project" and do not claim where the work was done. The photos appear to have been taken at a Wraptors studio outside Dubai.

| Page | Photos used | Left out |
|---|---|---|
| `/services/porsche-ppf/` | 7, dark green 911, gold wheels | 1 grey 911: can't confirm it's the same car |
| `/services/g-class-wrap/` | 6, black G-Class | 3 pre-made collages; 1 starlight interior that isn't confirmed for this car |
| `/services/lamborghini-urus-ppf/` | 4, matte black Urus | 1 collage that includes a yellow Urus, which could imply an unconfirmed before/after |
| `/services/rolls-royce-starlight-headliner/` | 4, white Rolls-Royce incl. the lit starlight cabin | none |

- **Content:** each page leads with its gallery, then "What the Photos Show", then advice specific to that car. Only the vehicle and service are stated as fact. No coverage extent, film brand, finish name, star count or location is claimed.
- **Indexing:** all four are indexable and in the sitemap. Wraps, PPF and Starlight get "Selected Work" cards. Each project page links to its service, the other projects, the studio and the quote form. The homepage Porsche 911 GTS card (same car) gets a "View Project" link.
- **Details that would strengthen the pages:**
  - PPF coverage extent for the Porsche and Urus.
  - Whether either PPF changed the colour or finish. The homepage card lists the Porsche as "Gloss Midnight Green · Satin Gold Wheels · Ceramic Coating", which is not PPF, and the supplied folder also has a grey 911.
  - What the G-Class wrap covered, and its colour.
  - The Rolls-Royce model and the star count.

Also on this date: Dubai's Global Locations globe and list styling now match the Hamilton and Tri-City sites, with Dubai highlighted. The YouTube reel no longer overlays titles on the video thumbnails.

## 9. Footer Services directory + additional service pages, 2026-11-03 (local)

- **Footer:** the same Services column as Hamilton and Tri-City.
  - Desktop: Navigation, Services and Contact sit side by side.
  - Mobile: Services spans the full width under the boat photo, in two columns. The drop is set to 150px because Dubai's navigation is two links shorter.
  - 12 links, all working, with Custom Builds last.
  - Homepage service cards are unchanged.
- **New pages:** client-confirmed services, built on Dubai's ServicePage template, with Service and BreadcrumbList structured data, FAQs and a quote form that opens on the right service.
  - `/services/detailing/`
  - `/services/custom-interiors/`
  - `/services/stripes-decals/`
  - `/services/caliper-painting/`
  - `/services/wheel-painting/`
  - The copy makes no claims about products, materials, warranties, prices or timings.
  - Hero photos are existing Wraptors images, used decoratively without project claims.
  - Contextual links come from the Wraps, Ceramic, Chrome Delete and Starlight pages.
  - The homepage quote form's step-1 list is unchanged.
- **Checks:** production build 60/60; sitemap 60 URLs; the SEO scan passes except the known `/book/` orphan. Browser check: 7 pages at 1440, 834 and 390px with no errors or overflow, and 12 footer links on every page.
- **Other changes the same day (all three sites):**
  - Homepage order: Visit Us, Service Areas, brands banner, Global Locations, quote form.
  - New mobile floating "Get a Quote" link. It hides over the hero, the quote form and the footer.

## 10. Final consistency check, 2026-11-03 (development frozen)

- **Porsche 911:** the homepage card now also lists **PPF** (confirmed), next to its existing Gloss Midnight Green, Satin Gold Wheels and Ceramic Coating tags. The project page says "dark green with gold wheels" and "protected with paint protection film". Neither says the green is colour PPF.
- **Project titles:** these no longer read as Dubai-completed projects. "… PPF Dubai | Paint Protection Film | Wraptors" replaces "… Project". The project text says "Wraptors project collection" and makes no studio-location claim. "Dubai" refers only to the service offered at the Al Quoz studio.
- **Verified:** 60/60 pages build. The sitemap has 60 URLs, all indexable with self-canonicals, and the built site has 0 noindex pages. Galleries: G-Class 6, Urus 4, Rolls-Royce 4, Porsche 7. Selected Work links: Wraps → G-Class; PPF → Porsche and Urus; Starlight → Rolls-Royce. All 12 footer service links resolve. Browser checks at 1440, 834 and 390px are clean.
- **Unchanged:** reviews, hero, 16 Locations, aftercare store and pricing.

# Wraptors Dubai: Final Checklist

**Date:** 2026-10-29. **Live site:** <https://wraptorsdubai.com> (Netlify; `www` 301 → bare domain).

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
| **Social accounts** | The mobile menu links Instagram `@wraptors` (brand), the footer `@wraptors.dubai`; confirm which to use. YouTube is the brand channel (`@TorontoWraptors`). Supply Dubai TikTok and Facebook URLs to re-enable them. |
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

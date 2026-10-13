# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**The audience the site speaks to:** travellers who have the money and the time for a
considered trip but not the patience for a package. They arrive already suspicious of
tour operators, they have usually failed once at planning it themselves, and they are
deciding between studios in a browser tab, usually at night, usually while a trip they
keep postponing sits unresolved.

Roughly a third travel alone; families with young children are an explicit, named segment.
Several travellers are older or have a mobility constraint and need routes built around
diet, altitude, walking distance and medical needs rather than patched afterwards.

**Who consumes the work:** this is a fictional showcase brand. The site is a demonstration
of design craft, and it is evaluated as one.

## Product Purpose

Meridian & Co. presents itself as a 14-person boutique travel studio that drafts, books
and hand-manages one traveller's journey at a time, then hands over a single itinerary.
The page exists to turn that promise into a request for a trip brief.

Success on this surface means a first-time visitor understands within seconds what the
studio is, why it is different from a tour operator, and how to start a conversation —
and a design reviewer sees craft that could not have been produced by default.

## Positioning

The stated mechanism is continuity of a named human: the planner who drafts your route is
the planner who answers when you write, in your timezone, from the first brief to the
day you get home. Secondary and supporting claims — free planning until the route is
approved, a 20% deposit with the balance 60 days out, no booking fee, group caps of ten,
no single-room supplement, unlimited revisions before final payment.

## Operating Context

A visitor arrives from search or a recommendation with an unfinished idea, fills a trip
brief, and receives a reply within one working day containing questions rather than a
quote. That reply is the real conversion event; everything on the page is in service of
earning it. Planners work in named regions they return to each season.

## Capabilities and Constraints

- Single-page static site: `index.html`, `css/style.css`, `js/script.js`. No build step,
  no bundler, no runtime dependencies, no framework.
- Sections in order: header, hero with boarding-pass search, route ticker, destinations
  with region filtering, featured journeys, three-step process, animated stats band,
  when-to-go month rail, testimonials, planner profiles, practicalities, field notes,
  FAQ accordion, trip brief form, dispatch signup, footer.
- Interactions that must keep working: sticky header state, mobile nav drawer, scroll
  reveals with per-element stagger, region filtering shared between the destination chips
  and the boarding-pass search, animated counters, FAQ accordion, and both forms' inline
  validation with announced results.
- A `TravelAgency` and `FAQPage` JSON-LD block is embedded in the page head and **must
  stay consistent with the visible copy**. The FAQ answers appear in both places and
  diverge silently if either is edited alone.
- All imagery is remote Unsplash stock with a branded gradient fallback. There are no
  local image assets and no licensed photography.
- Fonts load from the Google Fonts CDN as three families. Self-hosting before launch is a
  known production note, not yet done.
- Both forms are front-end only. No endpoint exists. Validation is client-side.
- **Fictional, and must stay legibly fictional:** every price, the `68 countries` and
  `24k travellers` and `96% book again` figures, the `4.9` rating, all three testimonials,
  all four planner profiles with their names, languages and planning-since dates, the
  California seller-of-travel licence number, and the founding date.
- Open, undecided: no analytics, no consent banner, no cookie surface, no accessibility
  statement page, no locale/currency handling despite USD prices.

## Brand Commitments

Confirmed with the user and binding on all future work:

- **The name `Meridian & Co.`** — wordmark, ampersand lockup and four-point star mark stay
  as they are.
- **The dark aurora glass mood is binding identity**, not a starting suggestion. A
  redesign elevates this world at full material range; it does not replace it with a
  different aesthetic.
- **Live geographic coordinates** are a signature motif, threaded through destination
  cards, testimonials and the scrolling route ticker.
- **The boarding-pass search panel** with its perforated dividers, tabbed Journeys / Stays
  / Local guides modes and Region / When / Pace fields is a signature element.
- **All copy and the full page structure survive.** Section order, every heading and every
  paragraph are preserved. Visual treatment is what changes.

The voice is locked by that same copy: plain-spoken, understated, specific, and openly
hostile to package travel and sales language. Any new copy written for this brand must
sound like the copy already shipped.

## Evidence on Hand

There is no real evidence of any kind. No customer data, no bookings, no reviews from a
third-party platform, no press, no awards, no photography the studio owns, no case studies.

Future work must not fabricate: real award badges, star ratings attributed to a named
platform, security or certification marks, partner or airline logos, press quotes,
mapped route lines implying proprietary data, or any citation. Dramatic presentation of
the fictional figures is welcome; inventing new proof is not.

## Product Principles

1. **One named human, end to end.** Every structural choice serves the idea that a specific
   planner owns the whole journey. Avoid anything that reads as a call centre.
2. **Show the mechanism, don't describe it.** The site's own answer to doubt is working
   specifics — a real time zone, a real season, a real seat count — not adjectives.
3. **Nothing surprises you after payment.** Pricing, inclusions, deposit and change terms
   are stated on the page, not held for a call.
4. **Coordinates over adjectives.** Precision is the brand's register. A lat/long says more
   than a paragraph.
5. **The reader is capable.** Assume an adult with money and scepticism. Respect them with
   density and specificity instead of reassurance.

## Accessibility & Inclusion

WCAG 2.2 AA is a hard gate, confirmed by the user.

Baseline already shipped and to be held or improved: skip link, visible `:focus-visible`
ring on every interactive element, `aria-expanded` on the nav toggle, `aria-selected` on
the search tabs, `role="status"` + `aria-live="polite"` on both forms and on both filter
result counts, decorative layers `aria-hidden`, informative images with real `alt` text,
form errors signalled by colour **and** text, `prefers-reduced-motion` honoured for
reveals, the ticker and smooth scrolling, and focus moved to the first invalid field.
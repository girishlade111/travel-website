---
name: Meridian & Co.
description: Boutique travel studio — dark aurora glass on near-black, drawn as a route.
colors:
  void: "#04050C"
  ink: "#080B18"
  ink-2: "#101736"
  aurora-violet: "#7C5CFF"
  aurora-orchid: "#C084FC"
  aurora-rose: "#E246A4"
  aurora-teal: "#14B8A6"
  aurora-emerald: "#34D399"
  signal-sun: "#F7A23B"
  signal-gold: "#FFD166"
  signal-coral: "#FF6B5B"
  aurora-sky: "#56CCF2"
  text: "#F2F5FF"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.45rem, 6.4vw, 5.15rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 3.9vw, 3.05rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bodoni Moda, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 0.965rem + 0.18vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.04em–0.14em"
rounded:
  sm: "12px"
  md: "20px"
  lg: "26px"
  pill: "999px"
spacing:
  rail: "clamp(26px, calc((100vw - 1180px)/2 - 52px), 78px)"
  shell: "1180px"
  edge: "20px"
  section-pad: "clamp(5rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-sun}"
    textColor: "#1A1005"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.75rem"
  button-primary-hover:
    backgroundColor: "#FFB257"
  button-secondary:
    backgroundColor: "{colors.aurora-teal}"
    textColor: "#032420"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.75rem"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0.95rem 1.75rem"
  chip:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "rgba(242,245,255,0.72)"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem"
  chip-active:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.1rem"
  glass-panel:
    backgroundColor: "linear-gradient(165deg, rgba(242,245,255,0.12), rgba(242,245,255,0.05))"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "1.55rem 1.7rem"
---

# Design System: Meridian & Co.

## Overview

**Creative North Star: "The Route Spine"**

This system is a piece of travel instrumentation drawn at the scale of a magazine. The
page is one continuous hairline route running down its left margin; every section docks
into that line as a waypoint, and the route visibly draws itself as the reader scrolls.
Coordinates are not decoration applied to a layout — they are the layout's skeleton, and
the way the brand's precision speaks. A boutique studio that sells "a planner who has
actually walked the route" should look like a document produced by someone who has.

The ground is near-black and the colour lives in the sky, not on the surface. Four soft
blurred blooms — violet, teal, gold, rose — drift behind everything, and every frosted
panel sits *on* that aurora and refracts it. Glass is therefore a specific optical effect
with something behind it to distort, never a frosted rectangle laid on a flat field. The
aurora is deliberately restrained: it frames and edges the composition rather than
washing it.

Density is editorial. Content is set generously and allowed to be long; the scroll is
paced like a printed feature, with a wide quiet passage earning the next dense one.
Imagery is real photography of real places, cropped at a consistent ratio, never
illustrated. Voice belongs to the brand, not the system — see `PRODUCT.md`.

**Key Characteristics:**
- One continuous drawn route binds every section; sections dock into it rather than stacking independently.
- Colour lives behind the glass, not on it. Surfaces stay dark; accents are small and load-bearing.
- Precision is the register: real coordinates, real durations, real seat counts, tabular figures.
- Editorial pacing — long quiet passages, one signature interaction, no scattered hover effects.
- Every elevation shadow is neutral and offset. Never a coloured glow.

## Colors

A near-black ground carrying a four-hue aurora, with two signal colours that carry meaning
rather than decoration.

### Primary
- **Signal Sun** (#F7A23B): the primary accent and the page's only true action colour. It marks the primary button, the emphasised word in a headline, coordinates, the travelling node on the route, and live state. Its scarcity is the point — if a screen has more than a handful of sun-coloured elements, something is wrong.
- **Aurora Violet** (#7C5CFF): the leading hue of the sky and the top of the route line. Used in the aurora bloom and in gradients that carry elevation.

### Secondary
- **Aurora Teal** (#14B8A6): the second signal colour, reserved for the secondary action and for confirmatory affordances (included-list markers, meter fills). Never used as a background wash.
- **Signal Coral** (#FF6B5B): the exclusion/negative counterpart to teal — "arranged by you" markers and form error states. Errors are signalled by coral **and** by text, never colour alone.

### Tertiary
- **Aurora Orchid** (#C084FC): coordinates, shoulder-season badges, and the cool end of the aurora. Data-adjacent colour.
- **Aurora Sky** (#56CCF2): present in the aurora and in the stats ledger only.
- **Signal Gold** (#FFD166): soft status — live messaging and "seats left" urgency. Distinguished from Signal Sun by being paler and used at smaller sizes.
- **Aurora Rose** (#E246A4): aurora only. Never used on text or controls.
- **Aurora Emerald** (#34D399): single semantic role — a live/on-duty indicator. Paired with a text label, never standing alone.

### Neutral
- **Void** (#04050C): the page ground.
- **Ink** (#080B18) / **Ink-2** (#101736): raised dark surfaces, header when stuck, and dark bands.
- **Text** (#F2F5FF): all primary text.
- **Text Dim** (rgba(242,245,255,0.72)): body copy and descriptions.
- **Text Dim-2** (rgba(242,245,255,0.58)): secondary metadata.
- **Text Faint** (rgba(242,245,255,0.55)): the floor for small labels. Measured ≥5.3:1 on the ground.
- **Glass Line** (rgba(242,245,255,0.14)) / **Soft** (0.08) / **Strong** (0.26): the entire border vocabulary, in three weights only.

### Named Rules

**The Scarcity Rule.** Signal Sun marks the primary action, the emphasised word, and live
state — nothing else. Aurora Rose and Signal Gold never touch a control.

**The Rule-Weight Rule.** Borders exist in exactly three weights: soft (0.08) for internal
dividers, standard (0.14) for card edges, strong (0.26) for interactive underlines and
input strokes. A fourth weight is not a style choice, it is drift.

**The Glass Needs Something Rule.** A frosted panel is only correct where it sits over
the aurora and visibly refracts it. Glass on a flat dead field is decoration; remove it
or give it something behind it.

## Typography

**Display Font:** Bodoni Moda (fallback Georgia, Times New Roman, serif)
**Body Font:** Archivo (fallback system-ui, -apple-system, sans-serif)
**Label/Mono Font:** JetBrains Mono (fallback ui-monospace, SFMono-Regular, monospace)

**Character:** A high-contrast didone against a neutral grotesque and a mono reserved
for measurement. Bodoni supplies the editorial luxury a travel house needs and its
extreme thick/thin contrast gives headlines real presence at scale; Archivo stays quiet
so it never competes; the mono is the brand's voice of fact and is used *only* where a
number, coordinate, price, duration or timestamp appears.

### Hierarchy
- **Display** (800, `clamp(2.45rem, 6.4vw, 5.15rem)`, 0.98, -0.03em): the hero headline only. Never below the fold.
- **Headline** (800, `clamp(2rem, 3.9vw, 3.05rem)`, 1.02, -0.025em): section titles.
- **Title** (600, `clamp(1.6rem, 2.6vw, 2.1rem)`, 1.06): card and destination names.
- **Body** (400, `clamp(1rem, 0.965rem + 0.18vw, 1.0625rem)`, 1.65): paragraphs. Measure capped at 52–62ch.
- **Label** (500, 0.75rem, 0.04–0.14em, uppercase): coordinates, field labels, metadata, rail annotations.

All headings are `text-wrap: balance`.

### Named Rules

**The 12-Pixel Floor.** No functional text renders below 12px (0.75rem). Micro-labels get
their delicacy from tracking and colour, never from shrinking. This is a hard legibility
floor, not a ramp value.

**The Mono Is Reserved For Facts.** JetBrains Mono appears only where a real value lives —
coordinates, times, prices, durations, seat counts, versions. Setting body copy in mono
is a costume, not a choice.

**Roman Over Italic For Display.** Emphasis in a headline comes from weight, size or the
signal colour — never from italic alone. Oversized italic serif display is the most
recognisable AI-landing-page tell.

## Layout

A single content measure of **1180px**, centred, with the page's left margin reserved for
the route spine. The spine sits at `--rail`, a value derived from the viewport:

```
--rail: clamp(26px, calc((100vw - 1180px) / 2 - 52px), 78px)
```

So the route sits in the page's own margin on wide screens, and closes in as the layout
tightens. Below **1300px** the shell stops centring and anchors left of the rail
(`margin-left: 72px`) so the route never collides with content — this is the layout's
single most important responsive decision.

Section rhythm is `clamp(5rem, 9vw, 8.5rem)` top and bottom, which puts more space above a
heading than below it.

Breakpoints, each doing one job:

| Width | Change |
|---|---|
| ≤ 1300px | Shell anchors left of the route; rail closes to 26px |
| ≤ 1180px | Hero, process, FAQ, plan and dispatch grids collapse to one column |
| ≤ 1024px | Primary nav becomes an off-canvas drawer |
| ≤ 900px | Journey and destination rows stack; month rail to 3 columns |
| ≤ 640px | Single column throughout; rail to 20px; buttons full width |

Verified free of horizontal overflow at 1600, 1440, 1280, 1100, 1024, 960, 900, 820,
768, 700, 640, 540, 480, 414, 390, 360 and 320px.

## Elevation & Depth

Depth is **tonal first, shadow second**. Surfaces separate by ground value — Void, Ink,
translucent glass over the aurora — and only genuinely floating elements carry a shadow.
Every shadow in the system is neutral near-black with a real offset and blur.

### Shadow Vocabulary
- **Ambient** (`0 18px 40px -22px rgba(2,3,10,0.9)`): resting elevation on buttons and chips.
- **Lifted** (`0 54px 104px -46px rgba(2,3,10,0.95)`): glass panels — the manifest, the trip-brief form.
- **Dock** (`0 -30px 70px -34px rgba(2,3,10,0.95)`): the boarding pass, which rises *out of* the hero rather than onto it.
- **Node** (`5px 5px 16px -6px rgba(2,3,10,0.95)`): the travelling route marker.

### Named Rules

**The Neutral Shadow Rule.** No coloured shadow, no zero-offset glow, no chromatic halo.
Colour comes from the surface and the aurora; shadows only ever describe height. A
zero-offset coloured `box-shadow` is the default "cool" look of generated interfaces.

**The Glass Rule.** A panel that floats gets `backdrop-filter: blur(24–26px)
saturate(130%)` over a 0.12→0.05 white gradient and the Lifted shadow. Drop the blur and
the panel stops being glass and starts being a grey box.

## Shapes

Corners are generous and consistent: **12px** on small media and chips, **20px** on cards
and the boarding pass, **26px** on hero-scale panels. Pill geometry (`999px`) is reserved
for anything actionable — buttons and chips — so that *interactive = pill* reads
instantly.

The boarding pass is the one silhouette that carries real edge language: a perforated
notch column where it docks into the route, and dashed rules that always mean
perforated stock rather than decoration.

## Components

### Buttons
- **Shape:** fully rounded pill (999px).
- **Primary:** Signal Sun (#F7A23B) on near-black text (#1A1005), padding 0.95rem 1.75rem, weight 600, Ambient shadow.
- **Secondary:** Aurora Teal (#14B8A6) on #032420.
- **Ghost:** 6% white over the aurora with a 26%-white border and a 12px backdrop blur.
- **Hover / Focus:** `translateY(-2px)` plus a 0.35s ease-out; primary lightens to #FFB257, ghost brightens its border to 42%. Focus is a 2px Signal Sun ring at 3px offset — never `outline: none`.

### Chips
- **Style:** 6% white fill, 14% white border, 0.8125rem.
- **State:** the active chip inverts to solid Text on Ink. Chips drive both the destination
  filters and the when-to-go region selector, and the active state must be obvious at a glance.

### Cards / Containers
- **Corner Style:** 20px (media 12px, hero panels 26px).
- **Background:** media place a 1px Rule border over a dark gradient; real content never
  sits on a bare card background.
- **Shadow Strategy:** see Elevation. Only hero-scale panels are lifted.
- **Internal Padding:** 1.6–1.7rem standard, 2.35–2.6rem on hero panels.

**Do not build grids of equal cards.** Every collection on this site varies its scale and
asymmetry on purpose — destinations are an alternating route list, planners are a roster
with gradient monograms, field notes stagger in type size, testimonials run one lead
full-width above two smaller. An equal icon+heading+text card row is the failure mode.

### Inputs / Fields
- **Style:** no box. Transparent background with a 1px Rule-Strong bottom border and no
  border-radius — an underline, not a field. Selects add a CSS-drawn chevron rotated 45°;
  never a glyph or icon font.
- **Focus:** border shifts to Signal Sun with a 2px Signal Sun ring at 4px offset.
- **Error:** border shifts to Signal Coral, the field takes `is-error`, and the message in
  the `role="status"` region names the problem and the recovery. Colour is never the only cue.

### Navigation
- Fixed, transparent at rest; gains a 72%-opaque Ink background with `blur(20px)
  saturate(140%)` and a soft Rule border past 40px of scroll. Nav links are 0.875rem in
  Text Dim and brighten to Text on hover. Below 1024px a right-hand drawer slides in at
  0.45s ease-out, closes on link click and on Escape, and reports state via
  `aria-expanded`.

### Route Spine (signature)
A 1px vertical line at `--rail` spanning the whole document, gradient violet → teal →
gold. A brighter overlay draws over it in `scaleY()` bound to scroll progress, seeded at
5% so the route reads as already-drawn in the first viewport. Each section contributes a
`.dock` node with a short connector reaching toward its content, and a vertical
annotation in the margin carries what the section is. A fixed overlay on the same line
carries the travelling node and a live readout naming the section currently on screen.
The whole spine is `aria-hidden`; it is never the only place information lives.

### Boarding Pass (signature)
A glass panel spanning from the route to the content edge, docked into the spine with a
perforated notch at the join. Tabs (Journeys / Stays / Local guides) as pills, the active
one solid Text on Ink. Fields are underlined, separated by dashed perforations, with a
single full-width action at the end.

## Do's and Don'ts

### Do:
- **Do** dock every section into the route spine and let the line draw with scroll.
- **Do** keep glass panels over the aurora so they have something to refract.
- **Do** use real coordinates, durations and prices in JetBrains Mono — the brand's register is precision.
- **Do** signal errors with coral *and* text, and hold WCAG 2.2 AA as a hard gate.
- **Do** keep functional text at 12px or larger and re-measure contrast after any change.
- **Do** theme browser surfaces — selection, caret, scrollbar, focus ring, underline offset, tabular figures.
- **Do** honour `prefers-reduced-motion` fully: reveals shown, ticker stopped, smooth scroll off, aurora still.

### Don't:
- **Don't** put a tracked-caps kicker or eyebrow above a heading. Section labels belong in
  the margin as vertical annotations; the heading carries its own weight.
- **Don't** use coloured shadows, zero-offset glows, gradient text, glyph/emoji icons or
  system display faces.
- **Don't** animate anything that isn't tied to real state. No pulsing "live" dots over
  static data.
- **Don't** run equal-size card rows as the page's structure.
- **Don't** let the ticker move while it's off screen, or in reduced motion.
- **Don't** shrink type to make something fit — rewrap it or raise the clamp floor.
- **Don't** invent proof. No real awards, ratings platforms, press, partner logos or
  safety marks; the content is fictional and must stay legibly so.
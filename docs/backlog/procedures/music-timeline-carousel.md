# Procedure: Music timeline → carousel

**Status:** Behaviour locked (**slow autoplay, pause on hover**). Content model changed 19 Oct.  
**Checklist:** `../CHECKLIST.md` §4.

## Problem

The current “two cards side by side” is wrong. Also Beursschouwburg + BX1 are **old examples** — final site: they belong in **history**, not as the Music-page “now” strip.

## Target

- **Music page:** carousel of **latest / current** activity (after an activities audit).
- **History timeline** (placement TBD — maybe deeper page or later Music section): past events; Beursschouwburg + BX1 fine there; **hotlink** images when stable.
- One primary slide, prev/next, dots/counter.
- **QA-M1 = B:** slow autoplay, pause on hover.

## Implementation sketch

1. Replace `Timeline.ts` markup/CSS; keep `mountTimeline` behaviour or rewrite as carousel controls.
2. On narrow screens: one slide full width (already the case for “one visible”).
3. Prefer CSS scroll-snap or a small transform track — no new library unless needed.
4. If **QA-C2** = local images, copy into `assets/images/timeline/` and update data paths.

## Acceptance

- Does not feel like the current dual glass card strip.
- Works with keyboard (optional) and touch swipe if using scroll-snap.
- Still only “things that happened”, not upcoming shows.

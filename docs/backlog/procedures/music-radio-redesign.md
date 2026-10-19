# Procedure: Music radio redesign

**Status:** Direction locked (**QA-M2 = B**). Ready to implement when asked.  
**Checklist:** `../CHECKLIST.md` §5.

## Problem

Music page radio blocks and `radio.html` feel like the same content twice.

## Target

- Music page: **BRUZZ featured** (main residency, The Waffle Show). **Kiosk** = occasional → small secondary link only.
- `radio.html`: owns the long BRUZZ / Kiosk story and links.
- One source of long copy; Music page uses a short teaser.

## Implementation sketch

Reuse `site/data/radio.ts`. Add or use a short `teaser` for Music; full `text` on the radio page.

## Acceptance

- Reading Music then Radio does not feel copy-pasted.
- Fixed image frames stay (no tall BRUZZ stretch).

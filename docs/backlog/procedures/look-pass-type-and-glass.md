# Procedure: Look pass — type, glass, section bands

**Status:** L2 + L3 direction locked. **L1 deferred** (Loumana font audit).  
**Checklist:** `../CHECKLIST.md` §3.

## Type

**Do not change title scale until Loumana finishes his font audit (QA-L1).**  
Keep Cactus Jack / BDO Grotesk until then.

## Glass (**QA-L2 = B**)

Touch `--glass`, `--glass-hover`, `--glass-line`.

- Near-solid dark panels: e.g. `rgba(0,0,0,0.45)` or deep blue, thin border, less frosted blur.
- Re-check radio, shows, school cards, games tiles.

## Section bands (**QA-L3**)

```css
.band--ink {
  background: #000; /* or near-black — tune by eye */
  padding-block: var(--space-xl);
}
```

- **Releases:** confirmed first band.
- Other Music sections: add while implementing if they need to pop.
- Technology: later round.

## Acceptance

- Titles feel intentional, not oversized or sparse.
- Cards readable on the gradient.
- At least Releases clearly “pops” on its band.

# Open questions — answers

**Updated:** 19 October 2026  
Answered items stay here for the record. New questions go at the bottom if needed.

---

## Deploy

**QA-D1 — answered**  
**B for now:** project site  
`https://Loumana1.github.io/portofilio-site-loumana/`  
Repo: [Loumana1/portofilio-site-loumana](https://github.com/Loumana1/portofilio-site-loumana)  
Vite `base`: `'/portofilio-site-loumana/'`  
In a few weeks: custom domain **loumana.co** → then usually `base: '/'` + Pages custom domain.

**QA-D2 — answered**  
Commit needed media into the repo. Very few files should be over ~100 MB. Videos / heavy audio may move to Drive later.  
**Must ship now:** 3D models (Moog, computer) — keep them in Git / deploy.  
**On-page beat files:** keep example plays for now. Future: a **beat marketplace** where featured beats are dynamic (e.g. most downloaded, newest). Note in checklist; do not build the marketplace yet.

---

## Content

**QA-C1 — answered**  
Collaborators and mix/master credits already lived in the **hub prototype** (`Prototyes/hub_prototype/music.html`). They were dropped when the TypeScript site was slimmed; restore them from there.

| Release | Collaborator (closed meta) | Produced | Mixed | Mastered |
| :--- | :--- | :--- | :--- | :--- |
| Places EP | ROCA MORA | Loumana | Loumana | Studio Master |
| Géométrie EP | Roxy Rose | Loumana | Loumana | Dr Blaster |
| Nethaan | Anthéna | Loumana | PHASM | Peter DeWachter |
| 6 Secondes | Mahungu | Loumana | KK | Peter DeWachter |

**Closed card (basic):** album title + year. Collaborator line is allowed as light meta.  
**Open / detail (extra):** mix, master, roles, story, links.

**QA-C2 — answered (important)**  
Beursschouwburg + BX1 are **old examples** (events ~2+ years ago). In the **final** site they belong on a **history timeline**, **not** as the Music-page carousel of “current” things.  
Images: **mix** — prefer **hotlinks** when stable (Beursschouwburg, BX1 are fine as hotlinks); local copies when hotlink is unreliable.  
**Backlog:** go through Loumana’s **latest activities**, then map what belongs on Music (current) vs history timeline.

---

## Look

**QA-L1 — deferred**  
Loumana will do a full font audit himself. No type-scale change until that audit.

**QA-L2 — answered: B**  
Near-solid dark panels (`rgba(0,0,0,0.45)` or deep blue), thin border, less frosted glass.

**QA-L3 — answered**  
Yes to full-width dark/black **section bands**. Releases confirmed. Other Music sections: apply during look pass; start with Releases.

---

## Music sections

**QA-M1 — answered: B**  
Slow autoplay, pause on hover.

**QA-M2 — answered: B**  
Music page: **BRUZZ featured** (main residency). Kiosk = occasional → small secondary link. Long copy on `radio.html`.

**QA-M3 — leaning A**  
2×2 large-cover grid, but it may feel big — try 2×2 with slightly smaller covers / more padding, or responsive (2 cols desktop, 1 mobile). Revisit after a first mock if still too large.

---

## Still open / soft

- Exact list of which Music sections besides Releases get a black band (decide while implementing L3).
- Latest-activities pass before building the Music “current” carousel content.

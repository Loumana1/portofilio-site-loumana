# Version 3 — Hub Prototype Plan (Cursor)

**Date:** August 27, 2026  
**Prototype (Cursor):** `src/Prototyes/hub_prototype/` — static HTML, clean design  
**Prototype (Gemini):** `src/Prototyes/routing_prototype_gemini/` — leave untouched  
**Related:** `research_prototype_gemini.md`, `SITEMAP_CODE_MAP.md`

---

## 1. Two prototypes, two purposes

| Folder | Owner | Stack | Purpose |
| :--- | :--- | :--- | :--- |
| `hub_prototype/` | Cursor | Static HTML/CSS/JS | Clean Petr-style hub + content pages |
| `routing_prototype_gemini/` | Gemini | React + Vite | Experimental routing + React player |

Do **not** merge or overwrite Gemini's folder when iterating on the Cursor direction.

---

## 2. Locked decisions

- **Mental model:** Hub (routing interface), not scroll narrative
- **Homepage:** Single viewport, minimal copy, four discipline links
- **Taxonomy:** Music · Radio · Digital · Audio art
- **Bridging:** One line in hub bio — not site structure (see §4)
- **Press kit:** Separate page at `/press.html` for bookers
- **First deep page:** Music (player, beats, releases)

---

## 3. Audience routing

| Visitor | Primary destination |
| :--- | :--- |
| Beatmaker (samples/VST) | `digital.html` → 808 MAX |
| Rapper (free/buy beats) | `music.html` → Free / Exclusive |
| DJ (external downloads) | `music.html` → DJ downloads |
| Booker | `press.html` |
| Curator / client | `audio-art.html` |

---

## 4. What “bridging” was

From `prototypes/new-design-approach/QUESTIONS_AND_CONTEXT.md`:

> *Bridging gaps between disciplines. Bridging gaps between genres.*

That was a **narrative scroll model** for Version 2 — sections flowing into each other to *show* bridging. You chose the **hub** instead.

Bridging now lives in:

1. **Hub bio** — one sentence about working across music, radio, digital, audio art
2. **Project pages** — e.g. Géométrie EP = engineering ↔ music
3. **Press kit** — short positioning paragraph

It is **not** the homepage architecture.

---

## 5. Content map (from this repo)

Already wired in `hub_prototype/` HTML from:

- `simpler site/mvc/data/releases.php` — Places, Géométrie, Nethaan, 6 Secondes
- `simpler site/mvc/data/radio.php` — BRUZZ, Kiosk Radio
- `simpler site/mvc/data/projects.php` — Trap Machine, games, GitHub
- `_art-installation.php` — Quai Branly
- `_vst-showcase.php` — 808 MAX
- `_sidebar.php` — bio, contact, working with

---

## 6. Petr Menhart reference

**Copy:** one-screen orientation, paragraph bio, discipline links as primary navigation.

**Adapt (Petr++):**

- “Now” line (Quai Branly)
- Press kit link for bookers
- Music page with player (beats are a product, not just portfolio)
- Four worlds matching your practice, not graphic design fields

---

## 7. Hub page spec

```text
Loumana
Producer · DJ · Radio host · Audio developer

[short bio — bridging in one line]

Music          Beats, releases, DJ sets
Radio          BRUZZ, Kiosk Radio
Digital        VST, web apps, code
Audio art      Installations & spatial work

Now — Quai Branly, Paris 2025–2026
Brussels · Burkina Faso
Press · booking@loumana.com · @loumana_
```

Rules: no carousel, no skills grid, no forced animation on home.

---

## 8. Music page spec

Tabs: **Exclusive · Free · Releases · DJ downloads**

- Persistent bottom player bar (mock — wire audio when files exist)
- Exclusive beats with price
- Free beats for rappers
- Releases with Spotify/Bandcamp links
- DJ packs as external links

---

## 9. Visual direction (implemented)

**Concept: Studio Day** — warm stone paper, ink type, brass editorial labels.

| Token | Value |
| :--- | :--- |
| Paper | `#e9e5dc` |
| Ink | `#121316` |
| Brass labels | `#9a7b2e` |
| Signal blue | `#1792cf` |
| Display font | Cactus Jack |
| Body font | BDO Grotesk |

Hub uses a **split layout**: bio left, numbered portals with thumbnails right. All pages share the same light editorial system.

---

## 10. Phase 2 (after review)

- [x] Real audio in player (3 mp3 from `src/assets/audio/Afro/`)
- [x] Release covers, radio images, Quai Branly photo wired
- [x] All streaming / external links from simpler site
- [ ] DJ download URLs (still placeholders)
- [ ] Press kit PDF export
- [ ] Optional 3D accent on hub only

---

## 11. How to run

```bash
cd src/Prototyes/hub_prototype
python3 -m http.server 8080
```

Open `http://localhost:8080`.

---

*Gemini rationale doc (`research_prototype_gemini.md`) remains valid for React/player experiments. This doc governs the static Cursor prototype only.*

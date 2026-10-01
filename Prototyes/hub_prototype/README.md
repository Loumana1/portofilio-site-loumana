# Loumana Hub Prototype (Cursor)

Fully built static hub site. **Separate from** `routing_prototype_gemini/`.

## Run

```bash
cd src/Prototyes/hub_prototype
python3 -m http.server 8080
```

Open `http://localhost:8080` — required for audio playback (file:// blocks mp3).

---

## Design vision

**Concept: Studio Day**

Warm stone paper (`#e9e5dc`) and ink type — like a press kit on a producer's desk, not a dark tech portfolio or a generic white SaaS landing page.

| Choice | Rationale |
| :--- | :--- |
| **Cactus Jack** (display) | Already in the project — gives Loumana a distinct voice on titles and hub portals |
| **BDO Grotesk** (body) | Clean, modern, readable — matches existing simpler site tokens |
| **Brass labels** (`#9a7b2e`) | Section indices and metadata — editorial, not neon |
| **Signal blue** (`#1792cf`) | Links and active states — from existing brand accent |
| **Split hub layout** | Bio left, numbered portals right with thumbnail previews — Petr's clarity + visual routing |

**Copy tone:** Direct, specific, no "welcome to my world". Names real collaborators, venues, and labels.

---

## Site map

```
index.html          Hub — choose your world
music.html          Beats (real mp3) · SoundCloud · releases · live
radio.html          BRUZZ · Kiosk · Waffle Show context
digital.html        808 MAX · sample packs · web projects · stack
audio-art.html      Quai Branly case study
press.html          Bookers — bio, dates, links, contact
```

---

## Assets

Images and audio load from `assets/` and release covers from `../simpler site/mvc/resources/`.

Content sourced from simpler site partials, `data/*.php`, and `releases.js`.

---

## Files

```
hub_prototype/
  index.html
  music.html · radio.html · digital.html · audio-art.html · press.html
  css/styles.css
  js/data.js · layout.js · music.js
```

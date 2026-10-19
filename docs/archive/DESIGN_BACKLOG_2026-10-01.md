# Design backlog

**Started:** 1 October 2026  
**Status:** Look direction locked on 1 October 2026. Nothing is built. A few questions remain at the end.  
**Structure and stack:** `HUB_DECISIONS.md`. This file is about look and page order only.

The new site takes pieces from four places. Each piece below names where it comes from so it can be opened and compared.

| Source | Where to look |
| :--- | :--- |
| Hub prototype | `src/Prototyes/hub_prototype/` |
| Gemini routing prototype | `src/Prototyes/routing_prototype_gemini/src/pages/Home.jsx`, `index.css` |
| Simpler site | `src/Prototyes/simpler site/mvc/views/partials/` and `souajoana-inspired-landing.html` |
| Old software page | Git only: `git show c26e2c5:software-style.css` and `software.html` |

---

## 1. Palette

Cream is out. The hub prototype’s paper (`#e9e5dc`) and brass labels are rejected.

The direction is dark, and dark means deep blue, not plain black.

### The old software page, recovered from Git

```css
--color-bg-deep-blue: #002366;
--color-bg-aqua:      #107C74;
--color-text-primary: #ffffff;
--color-text-secondary: rgba(255, 255, 255, 0.7);
--color-accent:       #A6D1C9;   /* soft aqua */

.software-main-bg {
  background:
    linear-gradient(to top, #107C74 0%, transparent 15%),
    radial-gradient(ellipse at top left, #107C74 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, #002366 0%, transparent 50%),
    linear-gradient(135deg, #002366 0%, #107C74 100%);
}
```

A grain layer sits on top: an SVG fractal-noise tile at 150 px, opacity 0.25, `mix-blend-mode: overlay`.

The transparent boxes from that page:

```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
/* hover */
background: rgba(255, 255, 255, 0.15);
border-color: rgba(255, 255, 255, 0.3);
```

Locked: push the aqua toward a darker teal so the page stays blue and the green recedes. Working teal `#0b4f4a` in place of `#107C74` in the gradient. Deep blue `#002366` stays. Grain and glass stay. The exact mix is judged by eye when a page exists.

### Gemini home, for comparison

Background `#050505`, text `#f2f2f2`, cyan accent `#00e5ff`, muted `#666`. This is the “black” you liked on the landing. The blue above replaces it; the layout stays.

---

## 2. Type

Keep from the hub prototype:

- Cactus Jack for titles. The size scale too: `--title-hero: clamp(4.5rem, 14vw, 8rem)`, `--title-page: clamp(3.25rem, 8vw, 5.25rem)`, `--title-section: clamp(2.1rem, 4.5vw, 3rem)`.
- BDO Grotesk for body.

Drop Bebas Neue and Inter (old software page, Gemini). They were stand-ins.

---

## 3. Home

Layout from the Gemini `Home.jsx`:

- Full viewport, no scroll.
- Name large.
- One line under the name: **Artist, music producer, computer dev.**
- Then two large text links, stacked: **Music** and **Technology**. Hover shows an arrow sliding in from the left (Gemini’s `.nav-link::before` with `→`).
- Small footer line: place, year, and the About link.
- Background: deep blue toward teal, not `#050505`.
- No illustration for now. Parked ideas, not chosen: a single line drawing of a mixer in the margin, a grain field with no object, a cropped photo of hands on decks faded into the blue. None of these go on the page until you pick one.

---

## 4. Music page

Order from the simpler site, top to bottom. Pieces swapped where noted.

| # | Block | Take from | Notes |
| :--- | :--- | :--- | :--- |
| 1 | 3D Moog, spinning, page title under it | Simpler site `_hero.php`, hub `hub-moog.js` | Keep the point-cloud render. No “Welcome to Loumana’s World” copy. |
| 2 | Timeline carousel | Simpler site `_carousel.php`, rebuilt as a dated list | Two cards visible at once. Newest event on the left. Each card is one thing that happened: photo, date, title, one link. First card: Nethaan release party at Beursschouwburg, 21 November 2024. Then the BX1 Rapol’OG feature, once it has a date. New events you send later go to the front. |
| 3 | Upcoming shows | Simpler site compact tour bar | Only shows that have not happened yet. For now, four example cards, labeled as examples, not real dates. Day, month, venue, city, status pill. Replace them when real dates exist. |
| 4 | Radio | Simpler site `_radio.php` | BRUZZ and Kiosk as two blocks. Clicking opens the radio page (hub `radio.html` is the current version of that page). |
| 5 | Releases | Hub prototype `music.html` release cards | One row per release, cover left, title, year, collaborator, `+` to expand credits and story. Not the simpler site’s big cover with a thumbnail strip. |
| 6 | Born to Make Beats | Simpler site `_releases.php`, lower part | Text left, SoundCloud embed right, SoundCloud and Bandcamp pills. Beats since 2011. |
| 7 | Featured beats | Simpler site, same partial | Short list of tracks with cover, play button, title, genre and year. Plays on the page, no persistent player. |
| 8 | Download press kit | New | Last block on the page. Link to `assets/downloads/press-kit-loumana.pdf`. |

Release facts come from `LOUMANA_ARTIST_PROFILE.md`. The hub cards show “ROCA MORA” and “Roxy Rose” as collaborators on Places and Géométrie. Those names are not in the press texts for those EPs. Check before reuse.

---

## 5. Technology page

Same skeleton. Computer 3D model on top.

| # | Block | Take from | Notes |
| :--- | :--- | :--- | :--- |
| 1 | 3D computer, page title | Simpler site `three-viewer.js`, `computer-model.js` | Same render style as the Moog. |
| 2 | Snap to Grid | Simpler site `_dev-projects.php` showcase, hub `digital.html` | Large card. Screenshot, short text, link to snaptogrid.org. |
| 3 | 808 MAX | Simpler site `_vst-showcase.php` | Screenshot, text, link. HISE instrument. |
| 4 | Micro-opacités | Simpler site `_art-installation.php` | Rename from Quai Branly. Venue is Centre Wallonie-Bruxelles, Paris, then Nyege Nyege, Brussels. Facts in `LOUMANA_DEV_PATH.md`. |
| 5 | School projects | Screenshots in `Documents/SCHOOL` | Only projects that have a picture. Four cards, glass tiles. See the list under this table. |
| 6 | Games | Old software page `software.html` project grid, simpler site `_games.php` | Trap Machine, Rhythm Clicker, Reaction Time. Square transparent tiles. |
| 7 | Download CV | New | Last block on the page. Link to `assets/downloads/cv-zie-alassane-traore.pdf`. |

The four cards, in this order. Pictures stay in `Documents/SCHOOL` until the page is built. Use one image per card.

| Card | What it is | Picture to use | Code |
| :--- | :--- | :--- | :--- |
| EPayFC | Auction site, course PRWB, 2025–2026. PHP, AJAX. With Hugo Castelain and Sam Prophete Nsengimana. | `PRW.png` (browse). `piano_prwb.png` is the item page. | https://github.com/Loumana1/epayfc-auction-ajax-php |
| ReserVite | Restaurant reservations, course PRBD, 2025–2026. Flutter, PostgreSQL, PostgREST. With Sam Prophete Nsengimana. | `sg.png` (new reservation). Do not use `sgbd.png`: it shows a teacher email and debug logins. | Course copy is on Bitbucket `prbd-2526-c06`. The CV also names GitHub `reservite-fullstack-flutter-postgrest`. |
| Scratch | Block editor that draws with a turtle, course ANC, 2025–2026. Java, JavaFX. With Hugo and Sam Prophete Nsengimana. | `ANC4.png` | Course copy is on Bitbucket `anc_2526_c06`. The CV names GitHub `scratch-drawing-javafx`. |
| Restaurant | Terminal reservation desk, course TGPR, 2025–2026. Java, Lanterna. Group C02. | `TGPR.png` | Bitbucket `tgpr-2526-c02`. Not a public GitHub repo. |

`TGPR 2.png`, `prwb_image4.png`, `sgbd3.png`, and `sgb3.png` are extra shots of the same four projects. They are not extra cards.

Dropped from the simpler site on this page: the “I just can’t choose” keyhole section, the skills bento grid, the contact footer hub. Not asked for.

---

## 6. Radio page

Exists in the hub prototype as `radio.html`: BRUZZ and Kiosk as two feature splits with links. Reskin to the dark palette. Content from the artist profile. Nothing else decided.

---

## 7. Kept from the hub prototype

- Title scale and Cactus Jack.
- Release row with expandable detail.
- Separate pages per subject, with a shared header drawn once.
- Radio page.

## 8. Left behind

- Cream paper, brass labels, signal blue.
- Hub split layout with numbered portals and thumbnails.
- Simpler site sidebar.
- Simpler site release selector (big cover + thumbnail strip).
- Gemini’s four links and pure black.
- 3D on the home page.

---

## Locked on 1 October 2026

- Teal darker than `#107C74`. Working value `#0b4f4a`.
- Second door: **Technology**.
- Line under the name: **Artist, music producer, computer dev.**
- No home illustration yet.
- Glass boxes on Music and on Technology.
- Press kit and CV are the last block on their page.
- The carousel is a timeline. Two cards at a time. Newest first. The Nethaan night at Beursschouwburg, 21 November 2024, is the concert that was called Scarborough.
- The bar under the timeline is upcoming shows only. Four example cards until real dates exist.
- Beats since 2011.

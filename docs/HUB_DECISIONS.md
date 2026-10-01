# Hub decisions

**Date:** 1 October 2026  
**Status:** Structure and stack are locked. The look is not chosen yet.  
**Do not code from this file until the look pass.**

This is the record of the decisions made while reviewing `src/`, `src/Prototyes/`, and the older prototypes. It replaces the direction in `archive/VERSION_1_BACKLOG.md` and the four-door plan in `archive/research_prototype_cursor.md`. Those files, plus the Gemini note, the version 1 sitemap, and the empty general backlog, live in `docs/archive/`.

---

## 1. What the site is

A personal hub. The homepage is an entry point, not the whole website.

Two doors, plus a small About control:

| Place | What it holds |
| :--- | :--- |
| **Home** | Identity, Music, Computer, About |
| **Music** | Releases, DJ work, radio. Radio can open its own page for the longer story. |
| **Computer** | Dev projects, the stacks in use, audio-art installations |
| **About** | Short orientation. Not a third practice. |
| **Timeline** | Things that happened: a DJ set, an exhibition, a release, a broadcast. Fed by both doors. Not a shop. |

Audio art lives in Computer. Radio lives in Music. Neither is a door on the homepage.

Later, and not part of this build: a shop that links to Shopify. Checkout and orders stay on Shopify.

---

## 2. Downloads

The press kit and the CV are files, not pages.

- Music offers **Download press kit**.
- Computer offers **Download CV**.

The site does not render either document. A password is optional and can wait. Leave a home address or a private phone number out of the CV.

---

## 3. Stack

| Layer | Choice |
| :--- | :--- |
| Pages | HTML and CSS |
| Logic | TypeScript |
| Build | Vite |
| 3D | Three.js, only on the pages that use it |
| Content | JSON or TypeScript data (events, releases, projects) |
| Version control | Git |
| Hosting | Static files |
| Commerce | Shopify, later |
| Server, database, CMS, accounts | None, until a concrete feature needs one |

The music player does not keep playing across pages. React is not the frame of the site.

PHP in `Prototyes/simpler site/mvc` only includes partials. It is not the runtime to keep.

---

## 4. How the idea moved

| Generation | Role | Keep as material | Leave as structure |
| :--- | :--- | :--- | :--- |
| `src/*.html` and the paired CSS/JS | Older multi-page site. Obsolete. | Nothing. Git commit `c26e2c5` still has it. | The pages themselves. |
| `prototypes/new-design-approach/` (parent folder, outside this repo) | A long scroll that tells one story across years. | Dated episodes, as timeline entries. | The scroll as the homepage. |
| `Prototyes/simpler site` | One landing that contains every section, plus a PHP split of that page. | Release, radio, project, and tour data. The 3D models, release cards, radio blocks, Quai Branly, 808 MAX. | The single scroll. PHP. |
| `Prototyes/hub_prototype` | Quiet entry screen, then separate pages. | The homepage-as-entry idea. | Four doors (Music, Radio, Digital, Audio art). |
| `Prototyes/routing_prototype_gemini` | React routes and a player that stays alive. | Nothing required. A look reference only, if wanted later. | React. The persistent player. Placeholder routes. |
| `Prototyes/routing_prototype` | Empty Vite cache. | Nothing. | The folder. |

---

## 5. Workspace plan

The Git repository root is `src/`, not the parent `Portfolio website` folder. There is one commit, `c26e2c5` ("first commit"). It tracks the old HTML site and `assets/`.

These are **not in Git yet**. Deleting them would not be recoverable from history:

- `Prototyes/`
- `docs/` (including this file)
- Newer files under `assets/` (gradient pages, Moog and computer models, several images)

The parent folder (`prototypes/`, `Archived docs/`, `resources/`) is outside this repository entirely.

The decisions, `Prototyes/`, and `.gitignore` are committed. The obsolete site at the `src` root is removed from the working tree. The first commit, `c26e2c5`, still has those pages.

Removed from the working tree:

- `index.html`, `about.html`, `music.html`, `software.html`, `book-me.html`, `legal.html`, `beats-download.html`, `js-exo-1.html`
- `style.css`, `script.js`, `music-style.css`, `music-script.js`, `software-style.css`, `software-script.js`
- `js/` and `images/` at the `src` root, if nothing in the prototypes references them

Keep:

- `assets/` (fonts, audio, images, models)
- `Prototyes/` until the look pass says what to mine
- `docs/`

`resources/` in the parent folder stays. The simpler site and the hub read release covers from it.

Files over 1 MB (video, audio, large images, `.ply` models, and the generated model scripts) are listed in `.gitignore`. They stay on disk. The first commit still contains the copies that were already tracked. Ignoring them does not shrink that history.

The new site, when it starts, is a new folder. It does not grow inside the old pages.

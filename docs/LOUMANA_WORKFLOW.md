# Project workflow

**Updated:** 4 October 2026  
**Repo root:** `src/` (not the parent `Portfolio website` folder)

Read these before writing about Loumana or changing the site:

1. `src/docs/HUB_DECISIONS.md` — two doors, stack, hosting goal
2. `src/docs/LOUMANA_ARTIST_PROFILE.md` — music
3. `src/docs/LOUMANA_DEV_PATH.md` — software
4. `src/docs/backlog/CHECKLIST.md` — what is left to do
5. `src/docs/backlog/OPEN_QUESTIONS.md` — unanswered decisions

If a prototype, an old HTML page, or `resources/Who_is_loumana.txt` disagrees with the profiles and hub decisions, follow those docs. Do not invent dates, venues, or job titles.

---

## Backlog workflow (how we work)

Loumana describes ideas (design + content) in chat. The assistant:

1. Writes them into `docs/backlog/CHECKLIST.md` as checkboxes.
2. If the how is non-obvious, adds or updates a file under `docs/backlog/procedures/` and links it from the checklist.
3. Asks clarifying questions in `docs/backlog/OPEN_QUESTIONS.md` (IDs like `QA-D1`).
4. Implements only when asked to execute a checklist section (or when Loumana says “go” on a topic).
5. Ticks the box when the work is done. Does not delete checked items.

Do **not** treat `docs/archive/` as active backlog. The old 1 Oct design lock lives there as history.

---

## Where things are

| Path | Role |
| :--- | :--- |
| `src/docs/` | Hub decisions, profiles, workflow |
| `src/docs/backlog/` | Active checklist, QAs, procedures |
| `src/docs/archive/` | Retired docs |
| `src/site/` | Vite TypeScript site (the real site) |
| `src/Prototyes/` | Reference prototypes. Mine them. Not the live site. |
| `src/assets/` | Fonts, audio, images, models, games, `downloads/` |
| `resources/` (parent, outside Git) | Raw press texts, photos, covers |
| `prototypes/` (parent, outside Git) | Older experiments |

---

## Files and Git

- New files: kebab-case (`press-kit-loumana.pdf`). `README.md` stays uppercase.
- Commit only when asked. Do not `git add .`. Do not commit `.env`, credentials, or the private mailbox as page copy.
- Files over 1 MB, video, audio, and `.ply` models are gitignored. They stay on disk. Deploy must plan for them (`backlog` §1, **QA-D2**).
- `main` tracks `origin`. Do not force-push.
- The parent folder is not the Git repository.

---

## Deploy goal

Final hosting: **GitHub Pages**, with a CI pipeline so each change on `main` updates what visitors see. Details: `docs/backlog/procedures/github-pages-deploy.md`. Dev still uses `npm run dev` (Vite). Production is the static `dist/` output.

---

## 3D

Three.js point clouds from model scripts under `assets/models/`. Do not switch to Spline unless asked.

---

## What this file used to demand

Older rules (wait for every edit, `git add .` after every change, obsolete paths) are void. Follow this file and the backlog.

# Master checklist

**Updated:** 19 October 2026  
**Status of the TypeScript site:** about **60%**. Most requested blocks exist. Look and several Music sections still wrong. Final goal: **auto-deploy to GitHub Pages** on every push to `main`, later **loumana.co**.

Answers: [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md).  
Locked facts: `../HUB_DECISIONS.md`, profiles. Old design lock: `../archive/DESIGN_BACKLOG_2026-10-01.md`.

---

## 0. Docs & workflow

- [x] Create `docs/backlog/` with checklist + procedures + open questions
- [x] Archive the 1 Oct design backlog
- [x] Document the backlog workflow in `LOUMANA_WORKFLOW.md`
- [x] Record QA answers (19 Oct 2026)
- [ ] Keep profiles and data files aligned whenever copy changes (see §2)
- [ ] After each design pass, tick items here

---

## 1. Deploy on GitHub Pages (final goal)

Goal: push to `main` → CI builds → visitors see the update. Domain later: **loumana.co**.

- [x] Decide Pages mode — project repo [portofilio-site-loumana](https://github.com/Loumana1/portofilio-site-loumana); domain loumana.co later
- [x] Repo name known → Vite `base: '/portofilio-site-loumana/'`
- [ ] Set Vite `base` to `'/portofilio-site-loumana/'`
- [ ] Add GitHub Actions: install → `npm run build` → deploy `dist/`
- [ ] Turn on Pages (Actions as source)
- [x] Media plan — commit needed assets; 3D models must ship; heavy video/audio may go Drive later — [`procedures/github-pages-deploy.md`](./procedures/github-pages-deploy.md)
- [ ] Un-ignore / commit Moog + computer model files so production has 3D
- [ ] Smoke-test live URL
- [ ] Document push → CI → live in workflow
- [ ] Later: attach **loumana.co** (CNAME + DNS) and switch `base` if needed

---

## 2. Content coherence

- [ ] Audit `site/data/*` against profiles
- [x] Restore release **credits** from hub prototype into `releases.ts` (produced / mixed / mastered / collaborators)
- [ ] Music page “current” strip ≠ history: Beursschouwburg + BX1 are **history only** in the final site
- [ ] **Go through Loumana’s latest activities**, list them, map: Music (current) vs history timeline vs drop
- [ ] Shows: keep “example” until real dates
- [ ] Technology links + games paths OK
- [ ] About + Find me match profiles
- [ ] No leftover Quai Branly UI copy
- [ ] Future note (do not build yet): **beat marketplace** — featured beats become dynamic (newest / most downloaded); current on-page examples are placeholders

---

## 3. Design polish (global)

- [ ] **QA-L1 deferred** — Loumana does a full font audit; no forced type pass until then
- [ ] Glass → near-solid dark panels (**QA-L2 = B**) — [`procedures/look-pass-type-and-glass.md`](./procedures/look-pass-type-and-glass.md)
- [ ] Section bands (**QA-L3**): start with **Releases** full-width black/dark; add others while implementing
- [ ] Home + header after look settles
- [ ] Mobile pass after desktop accepted

---

## 4. Music — current carousel vs history

- [ ] Split concepts: **Music “now” carousel** (latest activity) vs **history timeline** (past events like Beursschouwburg, BX1)
- [ ] For history images: hotlink when stable (Beursschouwburg, BX1 OK); local when needed
- [ ] Build carousel UI (slow autoplay, pause on hover — **QA-M1 = B**)
- [ ] Fill carousel from latest-activities map (not the old two examples alone)
- [ ] Procedure: [`procedures/music-timeline-carousel.md`](./procedures/music-timeline-carousel.md)

---

## 5. Music — Radio

- [ ] Music page: **BRUZZ featured** + small Kiosk link (**QA-M2 = B**)
- [ ] Long copy only on `radio.html`
- [ ] Procedure: [`procedures/music-radio-redesign.md`](./procedures/music-radio-redesign.md)

---

## 6. Music — Releases

Closed: **title + year** (basic). Optional light collaborator. No long description.  
Open: story + full credits + links.  
Layout lean: **2×2** grid, watch size (**QA-M3 ≈ A**, may need smaller covers).

- [ ] Redesign closed state (large covers, 2×2, tune size)
- [ ] Redesign open / detail
- [x] Credit fields in `releases.ts`
- [ ] Wire credits into the UI (closed meta + open detail)
- [ ] Releases on full-width dark band
- [ ] Procedure: [`procedures/music-releases-redesign.md`](./procedures/music-releases-redesign.md)

---

## 7. Already shipped

- [x] Vite + TypeScript MPA (home, music, technology, radio, about)
- [x] Home doors + About
- [x] Music / Technology shells filled
- [x] Games under `assets/games/.../index.html`
- [x] Project → GitHub / site links
- [x] Music “Find me”

---

## Next focus

1. ~~Answer QAs~~ → done 19 Oct  
2. Latest-activities map (before Music carousel content)  
3. Wire release credits into the new Releases UI + glass/bands  
4. Deploy pipeline when Loumana says go (`base` = `/portofilio-site-loumana/`)  
5. Font audit stays with Loumana (L1)

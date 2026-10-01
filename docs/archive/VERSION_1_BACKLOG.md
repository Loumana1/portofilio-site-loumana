# Version 1 Backlog & Active Task Map

**Current Status**: Active Development (Prototype Iteration)  
**Version**: 1.0 (Central Landing Page Redesign - Sidebar Layout)  

---

## 🎯 Active Tasks Map

### Phase 1: Setup & Documentation
- [x] Establish agent rules in [.agents/AGENTS.md](file:///Users/loumana/Documents/Coding/Portfolio%20website/.agents/AGENTS.md)
- [x] Create documentation & backlog folder structure in `src/docs/`
- [x] Analyze reference design ([souajoana.com](https://souajoana.com)) for layout & typography structure
- [x] Update site map and codebase map in [SITEMAP_CODE_MAP.md](file:///Users/loumana/Documents/Coding/Portfolio%20website/src/docs/SITEMAP_CODE_MAP.md)

### Phase 2: Prototype Creation & Visual Aesthetics ([`src/Prototyes/simpler site/`](file:///Users/loumana/Documents/Coding/Portfolio%20website/src/Prototyes/simpler%20site/souajoana-inspired-landing.html))
- [x] Build standalone prototype [souajoana-inspired-landing.html](file:///Users/loumana/Documents/Coding/Portfolio%20website/src/Prototyes/simpler%20site/souajoana-inspired-landing.html)
- [x] Apply **Blue-Yellow Organic Gradient Drift** background (`#1792cf`, `#7fd3db`, `#ded16b`, `#e8c94a`) with SVG fractal noise grain overlay
- [x] Apply **Main Site Typography**: `BDO Grotesk` (body), `Cactus Jack` (headings/nav), and `Space Grotesk` (metadata)
- [x] Implement **Top Sticky Navigation Bar**:
  - [x] Bold, prominent category pill buttons (`Tour Dates`, `Latest News`, `Releases`, `Audio Dev`, `Games & Projects`, `Contact`)
- [x] Implement **Floaty 3D Hero Stage with Direct Action Buttons**:
  - [x] Left Column (Computer / Tech): `Ask for a Website`, `Check Out Plugins`, `Check Out Installations`
  - [x] Right Column (Moog Synth / Music): `Stream on Spotify`, `Stream on Apple Music`, `Buy Beats`, `Listen to DJ Set`
  - [x] Continuous solid surface rendering using soft overlapping radial splat textures (filling point gaps)
  - [x] Default upright resting orientation: Computer rotated 180° Y and 90° X; Moog Synth at clean showcase angle
  - [x] Interactive drag with inertia decay that stays in place (no continuous auto-spinning) and smoothly settles back to static rest position after inactivity
- [x] Implement **Thick Section Divider** separating 3D hero stage from content stream
- [x] Implement **50/50 Split Screen Section (Tour Dates & Latest News First)**:
  - [x] Left Column: Tour Dates & DJ Schedule with dates, venues, cities, and live status badges (`On Air`, `Tickets`, `RSVP`, `Lineup`)
  - [x] Right Column: Latest News & Updates (BRUZZ residency schedule, 808 MAX audio VST beta, Free club bangers drop)
- [x] Implement fixed left sidebar card with dashed border container:
  - [x] Loumana bio & statement
  - [x] `WORKING WITH` section (BRUZZ, Adorable Collective, etc.)
  - [x] `WHAT I DO` section (DJing, Music Production, VST Plugins, Software Engineering)
  - [x] `FOUND ON THE WEB` / links
  - [x] Contact & Instagram links at bottom
- [x] Implement **Top Horizontal Sticky Header Nav with Dropdown Sub-Options**:
  - [x] Removed `"Navigation:"` text label for a cleaner, centered layout
  - [x] Increased button typography size (`1.25rem` bold display font)
  - [x] Consolidated into 4 high-level dropdown menus: **`ABOUT`**, **`BEATS`**, **`DEV`**, **`LEGAL`**
  - [x] Smooth glassmorphism dropdown menus on hover & click across desktop and mobile
- [x] Implement **Unwrapped 4-Card Releases & Beatmaking Section**:
  - [x] Section title `RELEASES` on top with `DISCOGRAPHY` badge
  - [x] Static 4-card unwrapped responsive grid (Places EP, Géométrie EP, Nethaan, 6 Secondes)
  - [x] Direct streaming links on cards (Spotify, Apple Music, YouTube, Bandcamp)
  - [x] Pure Vanilla JS detail modal with track info, producer/mixing credits, story description, and custom background tints
  - [x] **Compact Beatmaking & SoundCloud Section** (shrunk down, tight layout, SoundCloud & Bandcamp quick links, SoundCloud playlist embed)
  - [x] **Beats Store & Licensing Section** (Free Non-Commercial €0, Standard Lease 50 €, Exclusive Rights 300 € with transparent policy)
  - [x] **Interactive Audio Preview Player** (built-in HTML5 play/pause, time tracker, scrub bar, free instant downloads)
  - [x] **Creative Discovery Transition Section** (Keyhole scroll reveal: *Songwriting, VST* / *Art, Computer Science* expanding into *"I just can't choose"*)
  - [x] Commented out Sample Packs & VST Presets showcase in code for future use
- [x] Implement **Hero 3D Stage Refinement (Single 3D Moog Model)**:
  - [x] Title: `Welcome to Loumana's World` with subtitle
  - [x] Streamlined strictly to 3 key action buttons: `Stream on Spotify`, `Art Installation`, `Buy Beats`
- [x] Implement **Streamlined Section Flow**:
  - [x] 1st: **Hero Stage** (3D Moog, `Welcome to Loumana's World`, 3 buttons)
  - [x] 2nd: **Tour Dates & Latest News** (50/50 split grid)
  - [x] 3rd: **Radio Residencies** (Side-by-side split layout: Left DJ sketch illustration & Right vertically stacked painted cards for BRUZZ Media and Kiosk Radio)
  - [x] 4th: **Releases & Beats Store** (Discography cards, beat previews, licensing tiers)
  - [x] 5th: **Floating 3D Computer & Snap To Grid Large Showcase** (*"Here are all my dev projects"*, high-res sequencer UI screenshot, stem playback, MIDI export, direct link to snaptogrid.org)
  - [x] 6th: **Musée du Quai Branly Audio Installation Section (Paris)** (Side-by-side)
  - [x] 7th: **808 MAX VST Plugin Showcase** (Side-by-side)
  - [x] 8th: **Interactive Games & Open Source Repositories Grid** (Trap Machine, Rhythm Clicker, Reaction Time, GitHub Repositories)
  - [x] 9th: **Creative Discovery Transition Section** (Keyhole scroll reveal: *Songwriting, VST* / *Art, Computers* expanding into *"I just can't choose"*)
  - [x] 10th: **SnapToGrid-Inspired "PROFESSIONAL AT" Skills Bento Grid**
  - [x] 11th: **Work With Me & Real Footer Hub**

### Phase 3: Review & Main Codebase Integration
- [ ] Review prototype with user for design feedback & audio integration
- [ ] Integrate approved prototype into main `src/index.html` and `src/style.css`
- [ ] Clean up deprecated multi-page code and GSAP scroll triggers

---

## 📋 Detailed Specs & Reference Notes

- **Reference URL**: `https://souajoana.com`
- **Prototype Path**: `src/Prototyes/simpler site/souajoana-inspired-landing.html`
- **Gradient Base**: `src/assets/gradiant backgrounds/blue-yellow-drift.html`
- **3D Models Directory**: `src/assets/models/` (`computer.ply`, `moog.ply`)
- **Fonts**: `src/assets/fonts/bdogrotesk-vf.ttf`, `src/assets/fonts/cactus-jack.ttf`

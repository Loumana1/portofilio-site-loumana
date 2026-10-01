# Site Map & Codebase Map (Version 1 - Sidebar Layout)

## 🌐 Site Map (Central Landing Page Architecture)

```mermaid
graph TD
    subgraph Central Landing Page (index.html)
        subgraph Fixed Left Sidebar
            Bio["Loumana Bio & Statement"]
            WorkingWith["WORKING WITH (BRUZZ, Adorable Collective)"]
            Services["WHAT I DO (DJ, Beatmaker, VST, Software)"]
            ContactLinks["CONTACT & SOCIALS (Email, Instagram)"]
        end

        subgraph Main Content Stream (Right Column)
            NavHeader["Top Navigation (ABOUT | BEATS | DEV | LEGAL)"]
            HeroStage["Hero Stage (3D Moog Synth & Quick Actions)"]
            TourNewsSec["Tour Dates & Latest News (50/50 Split Grid)"]
            RadioResidencies["Radio Residencies (BRUZZ & Kiosk Radio)"]
            ReleasesSec["Releases & Beats Store (#releases)"]
            SnapToGridSec["Snap To Grid & 3D Computer (#dev-projects)"]
            QuaiBranlySec["Musée du Quai Branly Audio Installation (#art-installation)"]
            VSTSec["808 MAX VST Plugin (#audio-dev)"]
            GamesSec["Playable Games & GitHub Code (#dev-games)"]
            CreativeDiscovery["Creative Discovery Transition (I Just Can't Choose)"]
            SkillsBento["Skills Bento Grid (#skills)"]
            FooterHub["Work With Me & Footer Hub (#contact)"]
        end
    end

    NavHeader -. Smooth Scroll Anchor .-> TourNewsSec
    NavHeader -. Smooth Scroll Anchor .-> RadioResidencies
    NavHeader -. Smooth Scroll Anchor .-> ReleasesSec
    NavHeader -. Smooth Scroll Anchor .-> SnapToGridSec
    NavHeader -. Smooth Scroll Anchor .-> VSTSec
    NavHeader -. Smooth Scroll Anchor .-> SkillsBento
    NavHeader -. Smooth Scroll Anchor .-> FooterHub
```

---

## 💻 Codebase Map & Entry Points

| Location | Type | Purpose |
| :--- | :--- | :--- |
| `prototypes/souajoana-inspired-landing.html` | Prototype HTML | Central landing page prototype inspired by `souajoana.com` |
| `src/index.html` | Entry Point | Central landing page HTML |
| `src/style.css` | Design System | CSS variables, typography, sidebar flexbox/grid layout |
| `src/script.js` | Light JS | Anchor scroll, player toggles, responsive mobile menu drawer |
| `src/docs/` | Documentation | Version 1 Backlog, General Roadmap, Site Maps |
| `src/docs/VERSION_1_BACKLOG.md` | Active Backlog | Task map with checkboxes for Version 1 execution |
| `resources/` & `src/images/` | Media Assets | Audio clips, photos, VST graphics, and video cards |

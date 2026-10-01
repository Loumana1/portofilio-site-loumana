# Version 3: Routing Interface Prototype

## Rationale & Direction
After evaluating the overwhelming "wow" effect of Version 1 and the overly dense layout of Version 2, we researched how other multidisciplinary audio artists and creative technologists organize their online presence (e.g., Xavier Velastin, Andrew Melchior, Simon Audio).

We concluded that a **Routing Interface** or **Archive** model is the most effective approach for a multidisciplinary practice. The website is not the artwork itself; it is the interface *to* the artwork. 

**Core Philosophies:**
1. **Curate, Don't Collect:** The user should immediately know who Loumana is and be able to choose their path.
2. **Separate Identity from Experience:** The homepage establishes identity with strict minimalism (typography, spacing, single 3D element). The immersive experiences are reserved for deep pages (e.g., Art Installations, Beat Player).
3. **Persistent Audio:** A custom music player will persist while browsing the Music section for exclusive beat sales.

## Information Architecture
*   **The Hub (Homepage):** Single viewport. No scrolling. Identity statement + links to the worlds.
*   **The Worlds:**
    *   **MUSIC:** Beats, DJ mixes, releases, dates. (Features the persistent custom audio player).
    *   **SOUND / TECH:** Technical projects, DSP, Pure Data, spatial audio. (Archive format).
    *   **ART:** Installations, exhibitions. (Highly visual, immersive format).
    *   **DIGITAL:** Web experiments, applications.

## Technical Approach for Prototype
Since the music section requires a persistent audio player with state management (play/pause, current track, tracklist), we are building the prototype using **React** (via Vite). This allows us to use a global state manager (like Context API or Zustand) to keep the player alive and playing seamlessly while the user navigates between different tracks or sub-pages within the Music world.

The styling will focus on high-contrast, clean typography, and minimalist spacing.

### Prototype Structure
The prototype will be located in `src/Prototyes/routing_prototype` and will demonstrate:
1. The single-viewport landing page.
2. The routing structure to the "Worlds".
3. A mock persistent audio player in the Music section.

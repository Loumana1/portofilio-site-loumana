# Procedure: Music releases redesign

**Status:** Credits data restored (19 Oct). UI redesign still open. Layout lean: **2×2**, watch size.  
**Checklist:** `../CHECKLIST.md` §6.

## Problem

Current UI: thin expandable rows. Long story visible in the expand. Credits were missing from TypeScript data (they lived in the hub). Feels like a list, not records.

## Target UX

| State | What shows |
| :--- | :--- |
| Closed | Large cover, **title + year** (basic). Optional collaborator line. **No** long description. Mix/master stay for open state. |
| Open (click) | Full story, produced / mixed / mastered, all platform links |

Section sits on a **full-width dark/black band** so it stands out from the gradient page.

## Data (`site/data/releases.ts`)

Extend each release with verified fields, for example:

```ts
credits?: {
  mix?: string;
  master?: string;
  roles?: { name: string; role: string }[];
};
```

Fill only from the chosen source in **QA-C1**. Do not invent names.

## Implementation sketch

1. Replace `ReleaseRows` closed markup with the layout from **QA-M3** (grid / scroll / one-hero).
2. Detail: expand in place, side panel, or modal — pick the lightest that fits large cover + text; prefer no second page unless asked.
3. Wrap the section in a band class (e.g. `.band--ink`) defined in the look pass.
4. Keep Spotify / Bandcamp / YouTube / event links in the open state only.

## Acceptance

- Closed state has no paragraph story.
- Credits visible when we have them.
- Covers read as the main visual.
- Band background separates Releases from neighbouring sections.

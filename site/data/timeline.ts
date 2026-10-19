// Things that happened. Newest first. Add a new entry at the top.
// Images are hotlinked from the venue and BX1 for now, as the simpler
// site did. Replace with local copies when you have the files.
// Decisions: docs/DESIGN_BACKLOG.md §4, block 2.

export type TimelineEntry = {
  date: string; // ISO date, YYYY-MM-DD
  title: string;
  kind: 'release party' | 'media' | 'show' | 'exhibition' | 'release' | 'broadcast';
  place?: string;
  image?: string;
  link?: { href: string; label: string };
};

export const timeline: TimelineEntry[] = [
  {
    date: '2024-11-21',
    title: 'Nethaan release party',
    kind: 'release party',
    place: 'Beursschouwburg, Brussels',
    image: 'https://beursschouwburg.be/site/assets/files/163416/loumana_anthena_no_typo.1200x630.jpeg',
    link: { href: 'https://beursschouwburg.be/nl/events/nethaan-release-party/', label: 'Event' },
  },
  {
    date: '2022-11-04',
    title: "Rapol'OG DJ set on BX1",
    kind: 'media',
    place: 'BX1, Brussels',
    image: 'https://bx1.ams3.digitaloceanspaces.com/wp-content/uploads/2022/11/04145502/Loumana.jpg',
    link: {
      href: 'https://bx1.be/categories/culture/rapolog-fait-la-part-belle-aux-dj-durant-les-vacances-decouvrez-le-set-de-loumana-des-20h00/',
      label: 'Watch',
    },
  },
];

// Technology page content. Source: docs/LOUMANA_DEV_PATH.md.
// Decisions: docs/DESIGN_BACKLOG.md §5.

export type Project = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  year: string;
  link?: { href: string; label: string };
  image?: string;
};

const gh = (repo: string) => `https://github.com/Loumana1/${repo}`;

// Large cards, in page order.
export const featured: Project[] = [
  {
    id: 'snap-to-grid',
    title: 'Snap to Grid',
    summary:
      'Web step sequencer. Create, share, and export rhythms as MIDI. REST API on Slim 4, JWT and Google sign-in, tests in CI.',
    stack: ['PHP', 'JavaScript', 'MySQL', 'Slim 4', 'PHPUnit', 'Playwright'],
    year: '2026',
    link: { href: 'https://snaptogrid.org', label: 'Open site' },
    image: '/images/snaptogrid_showcase.png',
  },
  {
    id: '808-max',
    title: '808 MAX',
    summary:
      'Sample instrument for 808 bass. Saturation, envelope, filter, live waveform, reverse. VST3, AU, standalone. Free, GPL-3.',
    stack: ['HISE', 'HISE Script', 'GLSL'],
    year: '2025–2026',
    link: { href: gh('808-Max-VST-Plugin'), label: 'GitHub' },
    image: '/images/vst_808_max_screenshot.png',
  },
  {
    id: 'micro-opacites',
    title: 'Micro-opacités',
    summary:
      'Generative sound installation for 8 speakers. Sound by Simon Mahungu, Pure Data by Alassane Traoré. Centre Wallonie-Bruxelles, Paris, and Nyege Nyege, Brussels, September 2026.',
    stack: ['Pure Data', 'Python', 'Raspberry Pi', 'Ambisonics'],
    year: '2026',
    link: { href: gh('memoires-en-transite'), label: 'GitHub' },
    image: '/images/quai_branly_installation.jpg',
  },
];

// School projects with a picture. Web copies in assets/images/school/.
export const school: Project[] = [
  {
    id: 'epayfc',
    title: 'EPayFC',
    image: '/images/school/epayfc.jpg',
    summary: 'Auction site. Offers, bids, buy-now, image management, AJAX filters.',
    stack: ['PHP', 'AJAX', 'MySQL'],
    year: '2025–2026',
    link: { href: gh('epayfc-auction-ajax-php'), label: 'GitHub' },
  },
  {
    id: 'reservite',
    title: 'ReserVite',
    image: '/images/school/reservite.jpg',
    summary: 'Restaurant reservations. Business rules in PL/pgSQL, REST through PostgREST, Flutter client.',
    stack: ['Flutter', 'PostgreSQL', 'PostgREST', 'JWT'],
    year: '2025–2026',
    link: { href: gh('reservite-fullstack-flutter-postgrest'), label: 'GitHub' },
  },
  {
    id: 'scratch',
    title: 'Scratch',
    image: '/images/school/scratch.jpg',
    summary: 'Block editor that draws with a turtle. Palette, program, scene.',
    stack: ['Java', 'JavaFX', 'MVVM'],
    year: '2025–2026',
    link: { href: gh('scratch-drawing-javafx'), label: 'GitHub' },
  },
  {
    id: 'restaurant-tgpr',
    title: 'Restaurant',
    image: '/images/school/restaurant.jpg',
    summary: 'Terminal desk for tables, reservations, orders, and payments.',
    stack: ['Java', 'Lanterna'],
    year: '2025–2026',
    link: { href: gh('restaurant-management-lanterna'), label: 'GitHub' },
  },
];

// Small browser pieces. Playable pages live in assets/games/.
export const games: Project[] = [
  {
    id: 'trap-machine',
    title: 'Trap Machine',
    summary: '16-step drum sequencer and beat mixer.',
    stack: ['Web Audio'],
    year: '2025',
    link: { href: '/games/trap-machine/index.html', label: 'Play' },
  },
  {
    id: 'rhythm-clicker',
    title: 'Rhythm Clicker',
    summary: 'Timing game against syncopated tempos.',
    stack: ['Canvas'],
    year: '2025',
    link: { href: '/games/rhythm-clicker/index.html', label: 'Play' },
  },
  {
    id: 'reaction-time',
    title: 'Reaction Time',
    summary: 'Visual and audio reaction benchmark.',
    stack: ['DOM', 'Timers'],
    year: '2025',
    link: { href: '/games/reaction-time/index.html', label: 'Play' },
  },
];

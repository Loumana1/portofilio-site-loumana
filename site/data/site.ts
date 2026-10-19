// Facts shared by every page. Source: docs/LOUMANA_ARTIST_PROFILE.md
// and docs/LOUMANA_DEV_PATH.md. Change them there first, then here.

export const site = {
  name: 'Loumana',
  line: 'Artist, music producer, computer dev.',
  place: 'Brussels · Burkina Faso',
  year: new Date().getFullYear(),
  email: 'loumana_@hotmail.com',
  booking: 'jim@la-brique.be',
  links: {
    instagram: 'https://instagram.com/loumana_',
    facebook: 'https://facebook.com/loumanabeats',
    adorable: 'https://www.instagram.com/adorablebx',
    soundcloud: 'https://soundcloud.com/loumana',
    bandcamp: 'https://loumana.bandcamp.com',
    appleMusic: 'https://music.apple.com/us/artist/loumana/1448045207',
    residentAdvisor: 'https://ra.co/dj/loumana',
    mixcloud: 'https://www.mixcloud.com/LOUMANA/',
    beacons: 'https://beacons.ai/loumana',
    github: 'https://github.com/Loumana1',
    linkedin: 'https://www.linkedin.com/in/zie-alassane-traore-734281127/',
    bruzz: 'https://www.bruzz.be',
    kiosk: 'https://kioskradio.com',
  },
  downloads: {
    pressKit: '/downloads/press-kit-loumana.pdf',
    cv: '/downloads/cv-zie-alassane-traore.pdf',
  },
} as const;

export type Door = { href: string; label: string };

export const doors: Door[] = [
  { href: '/music.html', label: 'Music' },
  { href: '/technology.html', label: 'Technology' },
];

export const nav: Door[] = [...doors, { href: '/about.html', label: 'About' }];

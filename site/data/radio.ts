// Radio. Source: docs/LOUMANA_ARTIST_PROFILE.md §Radio.
// Both blocks on the Music page open the radio page.

export type Station = {
  id: string;
  name: string;
  show: string;
  since?: string;
  where: string;
  text: string;
  image: string;
  logo?: true;
  link: string;
  linkLabel: string;
};

export const stations: Station[] = [
  {
    id: 'bruzz',
    name: 'BRUZZ',
    show: 'The Waffle Show',
    since: 'Since September 2021',
    where: '98.8 FM, Brussels',
    text: 'Interviews, emerging artists, and guest mixes on Brussels’ cultural radio. Guests have included Dr. Peet, David Numwami, Blu Samu, and Izzy Kaya.',
    image: '/images/radio/bruzz.jpg',
    link: 'https://www.bruzz.be',
    linkLabel: 'bruzz.be',
  },
  {
    id: 'kiosk',
    name: 'Kiosk Radio',
    show: 'Live sets',
    where: 'Parc Royal, Brussels',
    text: 'Live video sets from the wooden kiosk in Parc Royal. Club edits, future beats, UK bass, baile funk.',
    image: '/images/radio/kiosk.png',
    logo: true,
    link: 'https://kioskradio.com',
    linkLabel: 'kioskradio.com',
  },
];

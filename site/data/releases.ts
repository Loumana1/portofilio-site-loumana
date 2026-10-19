// Releases. Facts: docs/LOUMANA_ARTIST_PROFILE.md.
// Credits restored from Prototyes/hub_prototype/music.html (19 Oct 2026).
// Closed UI: title + year (+ optional collaborator). Open: story + full credits + links.

export type ReleaseCredits = {
  produced: string;
  mixed: string;
  mastered: string;
};

export type Release = {
  id: string;
  title: string;
  year: number;
  with?: string;
  cover: string;
  label: string;
  story: string;
  credits: ReleaseCredits;
  links: { spotify?: string; bandcamp?: string; youtube?: string; event?: string };
};

export const releases: Release[] = [
  {
    id: 'nethaan',
    cover: '/images/covers/nethaan.jpg',
    title: 'Nethaan',
    year: 2024,
    with: 'Anthéna',
    label: 'x-pert / Beursschouwburg release party',
    story:
      'Between hip-hop and electronic music. Stories, some lived and some invented, about drug abuse in club culture, self-discovery, love, and sobriety. Out 13 November 2024.',
    credits: {
      produced: 'Loumana',
      mixed: 'PHASM',
      mastered: 'Peter DeWachter',
    },
    links: {
      spotify: 'https://open.spotify.com/album/33wW9SW1ABNv51zOcySkk2',
      bandcamp: 'https://x-pert.bandcamp.com/album/nethaan',
      event: 'https://beursschouwburg.be/nl/events/nethaan-release-party/',
    },
  },
  {
    id: 'places',
    cover: '/images/covers/places.jpg',
    title: 'Places EP',
    year: 2023,
    with: 'ROCA MORA',
    label: 'Waffle Street Records',
    story:
      'Second EP. Electronic and orchestral. Self-discovery and the search for a place of your own. Tracks include Ending Pleasure and Le Louvre.',
    credits: {
      produced: 'Loumana',
      mixed: 'Loumana',
      mastered: 'Studio Master',
    },
    links: {
      spotify: 'https://open.spotify.com/album/7Hp66JUF1jvDwjZKGvsMr9',
      bandcamp: 'https://loumana.bandcamp.com/album/ep-places',
      youtube: 'https://www.youtube.com/watch?v=as5XelcZa38',
    },
  },
  {
    id: 'six-secondes',
    cover: '/images/covers/six-secondes.jpg',
    title: '6 Secondes',
    year: 2021,
    with: 'Mahungu',
    label: 'Waffle Street Records',
    story:
      'A beatmaker and a rapper. Time slipping away, Africa and Europe, colonization, breakups.',
    credits: {
      produced: 'Loumana',
      mixed: 'KK',
      mastered: 'Peter DeWachter',
    },
    links: {
      bandcamp: 'https://wafflestreetrecords.bandcamp.com/album/6-secondes',
    },
  },
  {
    id: 'geometrie',
    cover: '/images/covers/geometrie.jpg',
    title: 'Géométrie EP',
    year: 2019,
    with: 'Roxy Rose',
    label: 'Cosmic Pop Records, CPR020',
    story:
      'First EP, out 9 September 2019. Future beat. Release party at La Cabane, Brussels, 14 September 2019.',
    credits: {
      produced: 'Loumana',
      mixed: 'Loumana',
      mastered: 'Dr Blaster',
    },
    links: {
      spotify: 'https://open.spotify.com/album/6oFQCKzK0Lhwi1tA7wtncX',
      bandcamp: 'https://cosmicpoprecords.bandcamp.com/album/cpr020-g-om-trie',
      youtube: 'https://www.youtube.com/watch?v=UOQmkozfGkM',
    },
  },
];

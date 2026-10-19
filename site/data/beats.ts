// Featured beats, played on the page. Audio files live in assets/audio
// and are gitignored, so they exist on disk and in the deploy only.
// Years are the file dates; correct them if the beats are older.

export type Beat = {
  id: string;
  title: string;
  genre: string;
  year: number;
  audio: string;
  cover: string;
};

export const beats: Beat[] = [
  {
    id: 'big-bum',
    title: 'Big Bum',
    genre: 'Afro / club',
    year: 2025,
    audio: '/audio/Afro/BIG BUM MIX 1.mp3',
    cover: '/images/MusicPageImages/Afro.png',
  },
  {
    id: 'lotus',
    title: 'Lotus',
    genre: 'Future beat / rap',
    year: 2025,
    audio: '/audio/Afro/LOTUS GIFD Mix 1 v2.mp3',
    cover: '/images/MusicPageImages/Hiphop.png',
  },
  {
    id: 'to-choose',
    title: 'To Choose Is to Forsake',
    genre: 'Experimental',
    year: 2025,
    audio: '/audio/Afro/To choose is to foresake V3.mp3',
    cover: '/images/MusicPageImages/Electronic.png',
  },
];

// SoundCloud playlist embed used on the simpler site. Dark player colour.
export const soundcloudEmbed =
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2152543130&color=%23a6d1c9&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true';

/**
 * Loumana hub — site content & asset paths
 * Source: simpler site/mvc/data + partials + releases.js
 */

const PATH = {
  assets: 'assets',
  resources: 'resources',
  prototypes: '../../../prototypes',
  beatsStore: '../../../beats-download.html',
  software: '../../../software.html',
};

const SITE = {
  name: 'Loumana',
  role: 'Producer · DJ · Radio host · Audio developer',
  location: 'Brussels · Burkina Faso',
  bio: `I make club music, broadcast on Brussels radio, build audio tools, and create spatial installations. Born in Burkina Faso, based in Brussels — I work at the crossing of bass culture, technology, and sound art.`,
  now: {
    label: 'Now',
    text: 'Musée du Quai Branly — spatial audio installation, Paris 2025–2026',
    link: 'audio-art.html',
  },
  contact: {
    email: 'booking@loumana.com',
    instagram: '@loumana_',
    instagramUrl: 'https://instagram.com/loumana_',
  },
  links: {
    spotify: 'https://open.spotify.com',
    soundcloud: 'https://soundcloud.com/loumana',
    bandcamp: 'https://loumana.bandcamp.com',
    github: 'https://github.com/Loumana1',
  },
  worlds: [
    {
      id: 'music',
      path: 'music.html',
      index: '01',
      label: 'Music',
      note: 'Beats, releases, SoundCloud',
      image: `${PATH.assets}/images/MusicPageImages/Afro.png`,
    },
    {
      id: 'radio',
      path: 'radio.html',
      index: '02',
      label: 'Radio',
      note: 'BRUZZ · Kiosk Radio',
      image: `${PATH.assets}/images/bruzz_radio.jpg`,
    },
    {
      id: 'digital',
      path: 'digital.html',
      index: '03',
      label: 'Digital',
      note: '808 MAX · web tools · code',
      image: `${PATH.assets}/images/vst_808_max_screenshot.png`,
    },
    {
      id: 'audio-art',
      path: 'audio-art.html',
      index: '04',
      label: 'Audio art',
      note: 'Installations · spatial work',
      image: `${PATH.assets}/images/quai_branly_installation.jpg`,
    },
  ],
};

const RELEASES = [
  {
    id: 'places',
    title: 'Places EP',
    year: '2024',
    label: 'Waffle Street',
    collaborators: 'ROCA MORA',
    cover: `${PATH.resources}/EP_COVER_PLACES_stickers.png`,
    description:
      'A sonic journey through self-discovery — cinematic electronics and orchestral textures exploring the search for a place of your own.',
    links: {
      spotify: 'https://open.spotify.com/album/7Hp66JUF1jvDwjZKGvsMr9?si=--9KZbzoSY6FEb-pQeKZXA',
      bandcamp: 'https://loumana.bandcamp.com/album/ep-places',
      youtube: 'https://www.youtube.com/watch?v=as5XelcZa38',
    },
  },
  {
    id: 'geometrie',
    title: 'Géométrie EP',
    year: '2019',
    label: 'Cosmic Pop Records',
    collaborators: 'Roxy Rose',
    cover: `${PATH.resources}/Loumana_Geometrie_FINAL-2.jpg`,
    description:
      'Future beat, atmospheric hip-hop and cosmic synthesis — migration, identity, and belonging from the first track, Ligne.',
    links: {
      spotify: 'https://open.spotify.com/album/6oFQCKzK0Lhwi1tA7wtncX',
      bandcamp: 'https://cosmicpoprecords.bandcamp.com/album/cpr020-g-om-trie',
      youtube: 'https://www.youtube.com/watch?v=UOQmkozfGkM',
    },
  },
  {
    id: 'nethaan',
    title: 'Nethaan',
    subtitle: 'ft. Anthéna',
    year: '2024',
    label: 'Beursschouwburg',
    collaborators: 'Anthéna',
    cover: `${PATH.resources}/http___gather.fandalism.com_2420727--6E9DBFAA-967C-43BD-B9893354019117FA--0--12767813--NETHAANFINALCORR2.jpg`,
    description:
      'Electronic music and rap fused through stories of self-discovery, love, and sobriety in club culture.',
    links: {
      spotify: 'https://open.spotify.com/album/33wW9SW1ABNv51zOcySkk2',
      bandcamp: 'https://x-pert.bandcamp.com/album/nethaan',
      event: 'https://beursschouwburg.be/nl/events/nethaan-release-party/',
    },
  },
  {
    id: 'six-secondes',
    title: '6 Secondes',
    subtitle: 'ft. Mahungu',
    year: '2021',
    label: 'Waffle Street Records',
    collaborators: 'Mahungu',
    cover: `${PATH.resources}/Cover 6 secondes EP mahugu-loumana.jpg`,
    description:
      'Time, duality Africa–Europe, colonisation, and heartbreak on punchy productions.',
    links: {
      bandcamp: 'https://wafflestreetrecords.bandcamp.com/album/6-secondes',
    },
  },
];

const BEATS = [
  {
    id: 'big-bum',
    title: 'Big Bum Mix 1',
    genre: 'Afro / Club Banger',
    year: '2024',
    audio: `${PATH.assets}/audio/Afro/BIG BUM MIX 1.mp3`,
    cover: `${PATH.assets}/images/MusicPageImages/Afro.png`,
    exclusive: false,
  },
  {
    id: 'lotus',
    title: 'Lotus GIFD Mix 1 v2',
    genre: 'Future Beat / Rap',
    year: '2024',
    audio: `${PATH.assets}/audio/Afro/LOTUS GIFD Mix 1 v2.mp3`,
    cover: `${PATH.assets}/images/MusicPageImages/Hiphop.png`,
    exclusive: false,
  },
  {
    id: 'choose',
    title: 'To Choose Is to Forsake',
    genre: 'Experimental',
    year: '2024',
    audio: `${PATH.assets}/audio/Afro/To choose is to foresake V3.mp3`,
    cover: `${PATH.assets}/images/MusicPageImages/Afro.png`,
    exclusive: false,
  },
];

const RADIO = [
  {
    name: 'BRUZZ Media',
    show: 'The Waffle Show & Live Curation',
    type: 'Monthly residency · 98.8 FM Brussels',
    description:
      'Four years of monthly broadcasting on Brussels\' cultural radio — artist interviews, underground scene spotlights, and guest DJ mixes with Dr. Peet, David Numwami, Blu Samu, and Izzy Kaya.',
    image: `${PATH.assets}/images/bruzz_radio.jpg`,
    link: 'https://www.bruzz.be',
    linkLabel: 'bruzz.be',
  },
  {
    name: 'Kiosk Radio',
    show: 'Parc Royal Resident & Guest Sets',
    type: 'Live video · Parc Royal, Brussels',
    description:
      'Live streams from the wooden kiosk in Parc Royal — club edits, future beats, UK bass, and baile funk, broadcast globally.',
    image: `${PATH.assets}/images/kiosk-radio.png`,
    link: 'https://kioskradio.com',
    linkLabel: 'kioskradio.com',
  },
];

const DIGITAL = {
  featured: {
    title: '808 MAX',
    status: 'In development',
    subtitle: 'Bass & sub harmonic synthesizer',
    description:
      'Built with HISE scripting and custom analog saturation. Color-coded 808 samples, multi-stage distortion, AHDSR shaping, and filter curves — VST3 / AU.',
    image: `${PATH.assets}/images/vst_808_max_screenshot.png`,
    tags: ['HISE', 'VST3', 'AU', 'DSP'],
    link: `${PATH.software}#vst-section`,
  },
  packs: [
    {
      title: '808 MAX Signature Bank',
      type: 'VST Presets',
      price: '€10',
      description: '50+ sub bass, glide 808s, and saturation curves.',
      link: PATH.beatsStore,
    },
    {
      title: 'Club Bangers Drum Kit Vol. 1',
      type: 'Drum Kit',
      price: '€10',
      description: 'Kicks, claps, percussion loops, and rims.',
      link: PATH.beatsStore,
    },
    {
      title: 'Future Beats Loop Stack',
      type: 'Loops',
      price: '€10',
      description: 'Rhodes, analog synths, and future bounce stems.',
      link: PATH.beatsStore,
    },
    {
      title: 'Vocal Chops & Club FX',
      type: 'Vocal FX',
      price: '€10',
      description: 'Vocal shots, risers, glitches, and ad-libs.',
      link: PATH.beatsStore,
    },
  ],
  projects: [
    {
      title: 'Snap To Grid',
      type: 'Web platform',
      description: 'Interactive sequencer bridging music and visual grids.',
      image: `${PATH.assets}/images/snaptogrid_showcase.png`,
      link: 'https://www.snaptogrid.org/#profile',
      external: true,
    },
    {
      title: 'Trap Machine',
      type: 'WebAudio',
      description: '16-step drum sequencer and beat mixer.',
      link: `${PATH.prototypes}/Beat Mixer/index.html`,
    },
    {
      title: 'Rhythm Clicker',
      type: 'Game',
      description: 'Rhythmic precision against syncopated tempos.',
      link: `${PATH.prototypes}/Games/RhythmClicker/index.html`,
    },
    {
      title: 'Reaction Time',
      type: 'Benchmark',
      description: 'Visual and auditory reflex measurement.',
      link: `${PATH.prototypes}/Games/ReactionTime/index.html`,
    },
    {
      title: 'GitHub',
      type: 'Open source',
      description: 'WebGL, DSP, and creative web utilities.',
      link: 'https://github.com/Loumana1',
      external: true,
    },
  ],
  stack: [
    'JavaScript · React · Node',
    'C++ · JUCE · HISE · Web Audio',
    'Three.js · WebGL · Blender',
    'Flutter · Odoo · PostgreSQL',
  ],
};

const AUDIO_ART = {
  title: 'Musée du Quai Branly',
  subtitle: 'Audio installation & sound archives',
  location: 'Paris, France',
  period: '2025–2026',
  description:
    'An immersive spatial audio installation with poet Simon Shungu. Historical recordings from the Bibliothèque Nationale de France sound archives are woven through multi-channel spatialization, spoken word, and deep atmospheric synthesis.',
  image: `${PATH.assets}/images/quai_branly_installation.jpg`,
  tags: ['Simon Shungu', 'BnF Archives', 'Multi-channel', 'Spatial audio'],
};

const PRESS = {
  portrait: `${PATH.assets}/images/WeCanDance.jpeg`,
  bio: `Alassane Traoré — Loumana — is a producer, DJ, and audio developer based in Brussels. Born in Burkina Faso, he releases on Waffle Street and Cosmic Pop Records, hosts The Waffle Show on BRUZZ, broadcasts from Kiosk Radio, and builds VST plugins and web audio tools.`,
  longBio: `Loumana's work bridges club culture and conceptual sound — from Géométrie (2019) to Places (2024) and the Nethaan collaboration with Anthéna. He performs live with custom finger-drumming setups, curates Brussels' underground on radio, and creates spatial installations for institutions including the Musée du Quai Branly.`,
  workingWith: ['BRUZZ Radio', 'Waffle Show', 'Adorable Collective', 'Vibe Studio', 'Beursschouwburg'],
  highlights: [
    'BRUZZ residency — The Waffle Show (4+ years)',
    'Kiosk Radio — Parc Royal live broadcasts',
    'Musée du Quai Branly — spatial audio (2025–2026)',
    '808 MAX VST — HISE-based bass instrument',
    'Releases: Places EP, Géométrie EP, Nethaan, 6 Secondes',
    'Live: We Can Dance, Fuse, Adorable Collective',
  ],
  dates: [
    { day: '18', month: 'Apr', year: '2026', venue: 'BRUZZ Radio Live', city: 'Brussels' },
    { day: '02', month: 'May', year: '2026', venue: 'Fuse Club Night', city: 'Brussels' },
  ],
  pressLinks: [
    {
      label: 'BX1 — Rapol\'OG DJ set',
      url: 'https://bx1.be/categories/culture/rapolog-fait-la-part-belle-aux-dj-durant-les-vacances-decouvrez-le-set-de-loumana-des-20h00/',
    },
  ],
};

const SOUNDCLOUD_EMBED =
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/soundcloud%3Ausers%3A2152543130&color=%231792cf&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true';

if (typeof module !== 'undefined') module.exports = { PATH, SITE, RELEASES, BEATS, RADIO, DIGITAL, AUDIO_ART, PRESS, SOUNDCLOUD_EMBED };

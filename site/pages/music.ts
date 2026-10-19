import { page } from '../main';
import '../styles/music.css';

import { BornToMakeBeats, FeaturedBeats, mountBeats } from '../components/Beats';
import { Download } from '../components/Download';
import { Hero3D, mountHero3D } from '../components/Hero3D';
import { MusicLinks } from '../components/MusicLinks';
import { RadioBlocks } from '../components/RadioBlocks';
import { ReleaseRows, mountReleaseRows } from '../components/ReleaseRows';
import { Shows } from '../components/Shows';
import { Timeline, mountTimeline } from '../components/Timeline';
import { beats, soundcloudEmbed } from '../data/beats';
import { stations } from '../data/radio';
import { releases } from '../data/releases';
import { shows } from '../data/shows';
import { site } from '../data/site';
import { timeline } from '../data/timeline';

// Block order: DESIGN_BACKLOG.md §4, plus links before the press kit.
page(
  '/music.html',
  [
    Hero3D({ id: 'moog', label: 'Music', title: 'Releases, sets, radio.', hint: 'Drag the synth.' }),
    Timeline(timeline),
    Shows(shows),
    RadioBlocks(stations),
    ReleaseRows(releases),
    BornToMakeBeats(soundcloudEmbed),
    FeaturedBeats(beats),
    MusicLinks(),
    Download({
      label: 'Press',
      title: 'Press kit.',
      text: 'Bio, photos, and links in one PDF.',
      href: site.downloads.pressKit,
      cta: 'Download the press kit',
    }),
  ].join(''),
);

const main = document.querySelector('main');
if (main) {
  mountHero3D('moog', 'MOOG_MODEL_DATA');
  mountTimeline(main);
  mountReleaseRows(main);
  mountBeats(main);
}

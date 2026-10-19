import { page } from '../main';
import '../styles/about.css';
import { site } from '../data/site';
import { withBase } from '../paths';

page(
  '/about.html',
  `
  <section class="section wrap about">
    <p class="label">About</p>
    <h1 class="title-page">Zie Alassane Traoré</h1>
    <p class="about__aka">Loumana on the music.</p>

    <div class="about__grid">
      <div class="about__col">
        <p>
          Born in Burkina Faso in 1998. Grew up across five African countries,
          then Brussels at 14. Beats since 2011. Music producer, DJ, radio host,
          and a computer science student who builds instruments and tools for sound.
        </p>
        <p>
          The music sits between electronic, hip-hop, ambient, and orchestral color.
          The code sits next to it: sequencers, a free 808 instrument, a generative
          installation for eight speakers.
        </p>
      </div>
      <div class="about__col">
        <p class="label">Contact</p>
        <ul class="about__list">
          <li><a href="mailto:${site.email}">${site.email}</a></li>
          <li><a href="mailto:${site.booking}">Booking · ${site.booking}</a></li>
          <li><a href="${site.links.instagram}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="${site.links.soundcloud}" target="_blank" rel="noopener">SoundCloud</a></li>
          <li><a href="${site.links.github}" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="${site.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
        <p class="label" style="margin-top:var(--space-md)">Doors</p>
        <ul class="about__list">
          <li><a href="${withBase('/music.html')}">Music</a></li>
          <li><a href="${withBase('/technology.html')}">Technology</a></li>
        </ul>
      </div>
    </div>
  </section>`,
);

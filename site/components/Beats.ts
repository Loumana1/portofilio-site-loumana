import type { Beat } from '../data/beats';
import { site } from '../data/site';
import { esc } from './format';

// Block 6: Born to Make Beats, text left, SoundCloud right.
// Block 7: Featured beats, play on the page. One <audio>, no persistent
// player; leaving the page stops the sound.

export function BornToMakeBeats(embed: string): string {
  return `
    <section class="section" id="beats">
      <div class="wrap">
        <div class="btmb">
          <div class="btmb__text">
            <p class="label">Beats</p>
            <h2 class="title-section">Born to make beats.</h2>
            <p>
              Beats since 2011, at thirteen. SoundCloud is where they went first, with the goal of
              getting picked up by Soulection. The archive is still there. Beats made for other
              artists are on Spotify.
            </p>
            <div class="pills">
              <a class="pill" href="${site.links.soundcloud}" target="_blank" rel="noopener">SoundCloud ↗</a>
              <a class="pill" href="${site.links.bandcamp}" target="_blank" rel="noopener">Bandcamp ↗</a>
            </div>
          </div>
          <div class="btmb__embed glass">
            <iframe
              title="Loumana on SoundCloud"
              width="100%"
              height="400"
              scrolling="no"
              frameborder="no"
              loading="lazy"
              allow="autoplay"
              src="${embed}"></iframe>
          </div>
        </div>
      </div>
    </section>`;
}

function track(b: Beat): string {
  return `
    <li class="beat" data-beat="${b.id}" data-src="${esc(b.audio)}">
      <img class="beat__cover" src="${esc(b.cover)}" alt="" loading="lazy" />
      <button class="beat__play" type="button" aria-label="Play ${esc(b.title)}" aria-pressed="false">
        <span class="beat__icon-play">▶</span>
        <span class="beat__icon-pause">❚❚</span>
      </button>
      <div class="beat__info">
        <span class="beat__title">${esc(b.title)}</span>
        <span class="beat__meta">${esc(b.genre)} · ${b.year}</span>
      </div>
      <div class="beat__bar"><div class="beat__fill"></div></div>
      <span class="beat__time">0:00</span>
    </li>`;
}

export function FeaturedBeats(beats: Beat[]): string {
  return `
    <section class="section section--tight" id="featured-beats">
      <div class="wrap">
        <div class="section__head">
          <p class="label">Featured beats</p>
        </div>
        <ul class="beats glass">${beats.map(track).join('')}</ul>
      </div>
    </section>`;
}

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

export function mountBeats(root: ParentNode): void {
  const rows = Array.from(root.querySelectorAll<HTMLElement>('.beat[data-src]'));
  if (!rows.length) return;

  const audio = new Audio();
  audio.preload = 'none';
  let current: HTMLElement | null = null;

  const setPlaying = (row: HTMLElement | null, playing: boolean) => {
    rows.forEach((r) => {
      const on = r === row && playing;
      r.classList.toggle('is-playing', on);
      r.querySelector('.beat__play')?.setAttribute('aria-pressed', String(on));
    });
  };

  rows.forEach((row) => {
    const btn = row.querySelector<HTMLButtonElement>('.beat__play');
    const bar = row.querySelector<HTMLElement>('.beat__bar');
    btn?.addEventListener('click', () => {
      if (current === row && !audio.paused) {
        audio.pause();
        setPlaying(row, false);
        return;
      }
      if (current !== row) {
        current = row;
        audio.src = row.dataset.src ?? '';
        rows.forEach((r) => {
          const fill = r.querySelector<HTMLElement>('.beat__fill');
          if (fill) fill.style.width = '0%';
        });
      }
      void audio.play().then(() => setPlaying(row, true)).catch(() => setPlaying(row, false));
    });
    bar?.addEventListener('click', (e) => {
      if (current !== row || !audio.duration) return;
      const rect = bar.getBoundingClientRect();
      audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });
  });

  audio.addEventListener('timeupdate', () => {
    if (!current) return;
    const fill = current.querySelector<HTMLElement>('.beat__fill');
    const time = current.querySelector<HTMLElement>('.beat__time');
    if (fill && audio.duration) fill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    if (time) time.textContent = fmt(audio.currentTime);
  });
  audio.addEventListener('ended', () => setPlaying(current, false));
  audio.addEventListener('pause', () => setPlaying(current, false));
}

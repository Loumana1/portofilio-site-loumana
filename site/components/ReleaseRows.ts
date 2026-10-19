import type { Release } from '../data/releases';
import { esc } from './format';

// One row per release: cover, title, year, collaborator, + to expand.
// From the hub prototype release cards. Decisions: DESIGN_BACKLOG §4 block 5.

const linkLabel: Record<keyof Release['links'], string> = {
  spotify: 'Spotify',
  bandcamp: 'Bandcamp',
  youtube: 'YouTube',
  event: 'Event',
};

function row(r: Release): string {
  const links = (Object.keys(r.links) as (keyof Release['links'])[])
    .filter((k) => r.links[k])
    .map((k) => `<a class="pill" href="${esc(r.links[k]!)}" target="_blank" rel="noopener">${linkLabel[k]} ↗</a>`)
    .join('');
  const panelId = `release-${r.id}`;
  return `
    <li class="release glass" data-release="${r.id}">
      <button class="release__hit" type="button" aria-expanded="false" aria-controls="${panelId}">
        <img class="release__cover" src="${esc(r.cover)}" alt="" loading="lazy" />
        <span class="release__summary">
          <span class="release__title">${esc(r.title)}</span>
          <span class="release__meta">${r.year}${r.with ? ` · with ${esc(r.with)}` : ''}</span>
        </span>
        <span class="release__plus" aria-hidden="true">+</span>
      </button>
      <div class="release__panel" id="${panelId}">
        <div class="release__panel-inner">
          <p class="release__label">${esc(r.label)}</p>
          <p class="release__story">${esc(r.story)}</p>
          <div class="pills">${links}</div>
        </div>
      </div>
    </li>`;
}

export function ReleaseRows(releases: Release[]): string {
  const sorted = [...releases].sort((a, b) => b.year - a.year);
  return `
    <section class="section" id="releases">
      <div class="wrap">
        <div class="section__head">
          <p class="label">Releases</p>
          <h2 class="title-section">Records.</h2>
        </div>
        <ul class="releases">${sorted.map(row).join('')}</ul>
      </div>
    </section>`;
}

/** One row open at a time. Escape closes. */
export function mountReleaseRows(root: ParentNode): void {
  const rows = Array.from(root.querySelectorAll<HTMLElement>('.release[data-release]'));
  const set = (row: HTMLElement, open: boolean) => {
    row.classList.toggle('is-open', open);
    row.querySelector('.release__hit')?.setAttribute('aria-expanded', String(open));
  };
  rows.forEach((row) => {
    const hit = row.querySelector<HTMLButtonElement>('.release__hit');
    hit?.addEventListener('click', () => {
      const open = row.classList.contains('is-open');
      rows.forEach((r) => set(r, false));
      if (!open) set(row, true);
    });
    hit?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') rows.forEach((r) => set(r, false));
    });
  });
}

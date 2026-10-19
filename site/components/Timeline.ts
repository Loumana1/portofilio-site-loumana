import type { TimelineEntry } from '../data/timeline';
import { withBase } from '../paths';
import { esc, splitDate } from './format';

// Things that happened. Two cards visible, newest on the left,
// arrows move one card at a time. Decisions: DESIGN_BACKLOG §4 block 2.

function card(e: TimelineEntry): string {
  const d = splitDate(e.date);
  const img = e.image
    ? `<img class="tl-card__img" src="${esc(withBase(e.image))}" alt="" loading="lazy" />`
    : `<div class="tl-card__img tl-card__img--empty"></div>`;
  const link = e.link
    ? `<a class="pill" href="${esc(e.link.href)}" target="_blank" rel="noopener">${esc(e.link.label)} ↗</a>`
    : '';
  return `
    <li class="tl-card glass">
      ${img}
      <div class="tl-card__body">
        <p class="tl-card__meta"><time datetime="${e.date}">${d.long}</time> · ${esc(e.kind)}</p>
        <h3 class="tl-card__title">${esc(e.title)}</h3>
        ${e.place ? `<p class="tl-card__place">${esc(e.place)}</p>` : ''}
        ${link}
      </div>
    </li>`;
}

export function Timeline(entries: TimelineEntry[]): string {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  return `
    <section class="section" id="timeline">
      <div class="wrap">
        <div class="section__head section__head--row">
          <div>
            <p class="label">Timeline</p>
            <h2 class="title-section">Things that happened.</h2>
          </div>
          <div class="tl-nav" hidden>
            <button class="tl-nav__btn" data-tl="prev" aria-label="Earlier" disabled>←</button>
            <button class="tl-nav__btn" data-tl="next" aria-label="Later">→</button>
          </div>
        </div>
        <div class="tl-viewport">
          <ul class="tl-track" data-index="0">${sorted.map(card).join('')}</ul>
        </div>
      </div>
    </section>`;
}

/** Wire the arrows. Call after the HTML is in the document. */
export function mountTimeline(root: ParentNode): void {
  const track = root.querySelector<HTMLElement>('.tl-track');
  const nav = root.querySelector<HTMLElement>('.tl-nav');
  const prev = root.querySelector<HTMLButtonElement>('[data-tl="prev"]');
  const next = root.querySelector<HTMLButtonElement>('[data-tl="next"]');
  if (!track || !nav || !prev || !next) return;

  const cards = () => Array.from(track.children) as HTMLElement[];
  const visible = () => (window.matchMedia('(max-width: 720px)').matches ? 1 : 2);
  let index = 0;

  const apply = () => {
    const list = cards();
    const max = Math.max(0, list.length - visible());
    index = Math.min(index, max);
    const first = list[0];
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0') : 0;
    track.style.transform = `translateX(${-index * step}px)`;
    nav.hidden = max === 0;
    prev.disabled = index === 0;
    next.disabled = index >= max;
  };

  prev.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    apply();
  });
  next.addEventListener('click', () => {
    index += 1;
    apply();
  });
  window.addEventListener('resize', apply);
  apply();
}

import type { Show } from '../data/shows';
import { esc, splitDate } from './format';

// Upcoming shows only. Past dates are filtered out at render time.
// Decisions: DESIGN_BACKLOG §4 block 3.

const statusLabel: Record<Show['status'], string> = {
  'on air': 'On air',
  tickets: 'Tickets',
  free: 'Free',
  'sold out': 'Sold out',
};

function item(s: Show): string {
  const d = splitDate(s.date);
  const pill = `<span class="pill pill--${s.status.replace(' ', '-')}">${statusLabel[s.status]}</span>`;
  const inner = `
    <div class="show__date">
      <span class="show__day">${d.day}</span>
      <span class="show__month">${d.month}</span>
    </div>
    <div class="show__info">
      <p class="show__venue">${esc(s.venue)}</p>
      <p class="show__city">${esc(s.city)}</p>
    </div>
    ${pill}`;
  return s.link
    ? `<a class="show glass" href="${esc(s.link)}" target="_blank" rel="noopener">${inner}</a>`
    : `<div class="show glass">${inner}</div>`;
}

export function Shows(all: Show[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const examples = upcoming.some((s) => s.example);

  if (upcoming.length === 0) {
    return `
      <section class="section section--tight" id="shows">
        <div class="wrap">
          <p class="label">Upcoming shows</p>
          <p class="muted">No dates announced. Follow Instagram for the next one.</p>
        </div>
      </section>`;
  }

  return `
    <section class="section section--tight" id="shows">
      <div class="wrap">
        <div class="section__head section__head--row">
          <p class="label">Upcoming shows</p>
          ${examples ? '<p class="muted">Example dates, until real ones exist.</p>' : ''}
        </div>
        <div class="shows">${upcoming.map(item).join('')}</div>
      </div>
    </section>`;
}

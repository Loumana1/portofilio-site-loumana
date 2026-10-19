import type { Project } from '../data/projects';
import { withBase } from '../paths';
import { esc } from './format';

// Small browser pieces. Whole tile opens the playable page.

function tile(p: Project): string {
  const tags = p.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const cta = p.link ? `<span class="pill">${esc(p.link.label)} →</span>` : '';
  const body = `
      <p class="label">${esc(p.year)}</p>
      <h3 class="game__title">${esc(p.title)}</h3>
      <p class="game__text">${esc(p.summary)}</p>
      <div class="tags">${tags}</div>
      ${cta}`;
  if (p.link) {
    return `<a class="game glass" href="${esc(withBase(p.link.href))}">${body}</a>`;
  }
  return `<article class="game glass">${body}</article>`;
}

export function Games(projects: Project[]): string {
  return `
    <section class="section" id="games">
      <div class="wrap">
        <div class="section__head">
          <p class="label">Games</p>
          <h2 class="title-section">Small browser pieces.</h2>
        </div>
        <div class="games-grid">${projects.map(tile).join('')}</div>
      </div>
    </section>`;
}

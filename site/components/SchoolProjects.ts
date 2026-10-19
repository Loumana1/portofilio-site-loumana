import type { Project } from '../data/projects';
import { esc } from './format';

// Four school project cards with screenshots. Whole card opens GitHub.

function tile(p: Project): string {
  const img = p.image
    ? `<img class="school__img" src="${esc(p.image)}" alt="" loading="lazy" />`
    : `<div class="school__img school__img--empty"></div>`;
  const tags = p.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const cta = p.link ? `<span class="pill">${esc(p.link.label)} ↗</span>` : '';
  const body = `
      ${img}
      <div class="school__body">
        <p class="label">${esc(p.year)}</p>
        <h3 class="school__title">${esc(p.title)}</h3>
        <p class="school__text">${esc(p.summary)}</p>
        <div class="tags">${tags}</div>
        ${cta}
      </div>`;
  if (p.link) {
    return `<a class="school glass" href="${esc(p.link.href)}" target="_blank" rel="noopener">${body}</a>`;
  }
  return `<article class="school glass">${body}</article>`;
}

export function SchoolProjects(projects: Project[]): string {
  return `
    <section class="section" id="school">
      <div class="wrap">
        <div class="section__head">
          <p class="label">School</p>
          <h2 class="title-section">Course projects.</h2>
        </div>
        <div class="school-grid">${projects.map(tile).join('')}</div>
      </div>
    </section>`;
}

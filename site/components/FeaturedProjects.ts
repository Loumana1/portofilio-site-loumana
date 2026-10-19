import type { Project } from '../data/projects';
import { esc } from './format';

// Large project cards: Snap to Grid, 808 MAX, Micro-opacités.
// Whole card is the link when one exists.

function card(p: Project, flip: boolean): string {
  const media = p.image
    ? `<div class="feature__media"><img src="${esc(p.image)}" alt="" loading="lazy" /></div>`
    : `<div class="feature__media feature__media--empty"></div>`;
  const tags = p.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const cta = p.link ? `<span class="pill">${esc(p.link.label)} ↗</span>` : '';
  const body = `
      ${media}
      <div class="feature__body">
        <p class="label">${esc(p.year)}</p>
        <h2 class="title-section">${esc(p.title)}</h2>
        <p class="feature__text">${esc(p.summary)}</p>
        <div class="tags">${tags}</div>
        ${cta}
      </div>`;
  const flipClass = flip ? ' feature--flip' : '';
  if (p.link) {
    const external = p.link.href.startsWith('http');
    return `
    <a class="feature glass${flipClass}" id="${p.id}" href="${esc(p.link.href)}"${external ? ' target="_blank" rel="noopener"' : ''}>
      ${body}
    </a>`;
  }
  return `
    <article class="feature glass${flipClass}" id="${p.id}">
      ${body}
    </article>`;
}

export function FeaturedProjects(projects: Project[]): string {
  return `
    <section class="section" id="featured">
      <div class="wrap feature-list">
        ${projects.map((p, i) => card(p, i % 2 === 1)).join('')}
      </div>
    </section>`;
}

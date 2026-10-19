import type { Station } from '../data/radio';
import { withBase } from '../paths';
import { esc } from './format';

// BRUZZ and Kiosk as two blocks. Each opens the radio page.
// Decisions: DESIGN_BACKLOG §4 block 4.

function block(s: Station): string {
  const media = s.logo
    ? `<div class="radio-block__media radio-block__media--logo"><img src="${esc(withBase(s.image))}" alt="${esc(s.name)}" loading="lazy" /></div>`
    : `<div class="radio-block__media"><img src="${esc(withBase(s.image))}" alt="" loading="lazy" /></div>`;
  return `
    <a class="radio-block glass" href="${withBase('/radio.html')}#${s.id}">
      ${media}
      <div class="radio-block__body">
        <p class="label">${esc(s.where)}</p>
        <h3 class="radio-block__name">${esc(s.name)}</h3>
        <p class="radio-block__show">${esc(s.show)}${s.since ? ` · ${esc(s.since)}` : ''}</p>
        <p class="radio-block__text">${esc(s.text)}</p>
        <span class="radio-block__more">Radio page →</span>
      </div>
    </a>`;
}

export function RadioBlocks(stations: Station[]): string {
  return `
    <section class="section" id="radio">
      <div class="wrap">
        <div class="section__head">
          <p class="label">Radio</p>
          <h2 class="title-section">On air.</h2>
        </div>
        <div class="radio-grid">${stations.map(block).join('')}</div>
      </div>
    </section>`;
}

import type { Station } from '../data/radio';
import { esc } from './format';

// Full radio page: two feature splits + short context.
// Reference: Prototyes/hub_prototype/radio.html.

function split(s: Station, flip: boolean): string {
  const media = s.logo
    ? `<div class="split__media split__media--logo"><img src="${esc(s.image)}" alt="${esc(s.name)}" loading="lazy" /></div>`
    : `<div class="split__media"><img src="${esc(s.image)}" alt="" loading="lazy" /></div>`;
  return `
    <article class="split glass${flip ? ' split--flip' : ''}" id="${s.id}">
      ${media}
      <div class="split__body">
        <p class="label">${esc(s.where)}${s.since ? ` · ${esc(s.since)}` : ''}</p>
        <h2 class="title-section">${esc(s.name)}</h2>
        <p class="split__show">${esc(s.show)}</p>
        <p class="split__text">${esc(s.text)}</p>
        <a class="pill" href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.linkLabel)} ↗</a>
      </div>
    </article>`;
}

export function RadioPage(stations: Station[]): string {
  return `
    <header class="section wrap">
      <p class="label">Radio</p>
      <h1 class="title-page">On air.</h1>
      <p class="lead">
        Radio bridges music and exposition. Hip-hop as a way into rock, pop, metal,
        electronic, and drum &amp; bass. Club music you can’t play in clubs, and a
        platform for young producers.
      </p>
    </header>
    <section class="section section--tight">
      <div class="wrap split-list">
        ${stations.map((s, i) => split(s, i % 2 === 1)).join('')}
      </div>
    </section>
    <section class="section wrap" id="waffle">
      <p class="label">Context</p>
      <h2 class="title-section">The Waffle Show</h2>
      <p class="lead">
        Started in September 2021. A monthly show on BRUZZ for interviews, emerging
        artists, and guest mixes. Guests have included Dr. Peet, David Numwami,
        Blu Samu, and Izzy Kaya.
      </p>
    </section>`;
}

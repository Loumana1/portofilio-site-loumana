import { site } from '../data/site';
import { esc } from './format';

// Socials and music profiles on the Music page.
// Source: docs/LOUMANA_ARTIST_PROFILE.md §Links.

type Link = { label: string; href: string };

const profiles: Link[] = [
  { label: 'SoundCloud', href: site.links.soundcloud },
  { label: 'Bandcamp', href: site.links.bandcamp },
  { label: 'Apple Music', href: site.links.appleMusic },
  { label: 'Resident Advisor', href: site.links.residentAdvisor },
  { label: 'Mixcloud', href: site.links.mixcloud },
  { label: 'Beacons', href: site.links.beacons },
];

const socials: Link[] = [
  { label: 'Instagram', href: site.links.instagram },
  { label: 'Facebook', href: site.links.facebook },
  { label: 'Adorable', href: site.links.adorable },
];

function group(title: string, links: Link[]): string {
  return `
    <div class="links-group">
      <p class="label">${esc(title)}</p>
      <ul class="links-list">
        ${links
          .map(
            (l) =>
              `<li><a class="pill" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a></li>`,
          )
          .join('')}
      </ul>
    </div>`;
}

export function MusicLinks(): string {
  return `
    <section class="section" id="links">
      <div class="wrap">
        <div class="section__head">
          <p class="label">Elsewhere</p>
          <h2 class="title-section">Find me.</h2>
        </div>
        <div class="links-grid glass">
          ${group('Music profiles', profiles)}
          ${group('Socials', socials)}
          <div class="links-group">
            <p class="label">Mail</p>
            <ul class="links-list">
              <li><a class="pill" href="mailto:${site.email}">${esc(site.email)}</a></li>
              <li><a class="pill" href="mailto:${site.booking}">Booking</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
}

import { site } from '../data/site';

/** Shared footer. Place, year, and the few links worth repeating. */
export function Footer(): string {
  return `
    <footer class="footer">
      <div class="wrap">
        <span>${site.name} · ${site.place} · ${site.year}</span>
        <span>
          <a href="${site.links.instagram}" target="_blank" rel="noopener">Instagram</a> ·
          <a href="${site.links.soundcloud}" target="_blank" rel="noopener">SoundCloud</a> ·
          <a href="${site.links.github}" target="_blank" rel="noopener">GitHub</a> ·
          <a href="mailto:${site.email}">Mail</a>
        </span>
      </div>
    </footer>`;
}

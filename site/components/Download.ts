import { withBase } from '../paths';

// Last block on Music (press kit) and Technology (CV). A file, not a page.

type Props = { label: string; title: string; text: string; href: string; cta: string };

export function Download({ label, title, text, href, cta }: Props): string {
  return `
    <section class="section" id="download">
      <div class="wrap">
        <div class="download glass">
          <div>
            <p class="label">${label}</p>
            <h2 class="title-section">${title}</h2>
            <p class="muted">${text}</p>
          </div>
          <a class="button" href="${withBase(href)}" download>${cta}</a>
        </div>
      </div>
    </section>`;
}

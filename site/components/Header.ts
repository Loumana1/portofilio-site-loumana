import { nav, site } from '../data/site';
import { withBase } from '../paths';

/** Sticky header for inner pages. Marks the current page in the nav. */
export function Header(current: string): string {
  const links = nav
    .map((item) => {
      const here = item.href === current ? ' aria-current="page"' : '';
      return `<a href="${withBase(item.href)}"${here}>${item.label}</a>`;
    })
    .join('');

  return `
    <header class="header">
      <div class="wrap">
        <a class="header__mark" href="${withBase('/')}">${site.name}</a>
        <nav class="header__nav" aria-label="Main">${links}</nav>
      </div>
    </header>`;
}

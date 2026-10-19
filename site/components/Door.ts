import type { Door as DoorData } from '../data/site';

/** A large text link on the home page. Arrow appears on hover. */
export function Door({ href, label }: DoorData): string {
  return `<a class="door" href="${href}">${label}</a>`;
}

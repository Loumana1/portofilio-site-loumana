// Shared bootstrap. Every page script imports this first.
// It loads the styles and adds the background layers.
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

export function ground(): void {
  document.body.insertAdjacentHTML('afterbegin', '<div class="ground"></div><div class="grain"></div>');
}

/** Inner page frame: header, your content, footer. */
export function page(current: string, content: string): void {
  ground();
  const app = document.getElementById('app');
  if (!app) throw new Error('#app missing');
  app.innerHTML = `${Header(current)}<main>${content}</main>${Footer()}`;
}

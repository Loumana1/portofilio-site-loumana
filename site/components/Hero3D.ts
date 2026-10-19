import { modelFromWindow, mountPointCloud } from './PointCloud';

// Page top: a spinning point-cloud object, the page title under it.
// Decisions: DESIGN_BACKLOG §4 block 1 and §5 block 1.

type Props = { id: string; label: string; title: string; hint?: string };

export function Hero3D({ id, label, title, hint }: Props): string {
  return `
    <section class="hero3d">
      <div class="wrap">
        <div class="hero3d__stage" id="${id}" aria-hidden="true"></div>
        <p class="label">${label}</p>
        <h1 class="title-page">${title}</h1>
        ${hint ? `<p class="hero3d__hint muted">${hint}</p>` : ''}
      </div>
    </section>`;
}

export function mountHero3D(id: string, key: 'MOOG_MODEL_DATA' | 'COMPUTER_MODEL_DATA'): void {
  const stage = document.getElementById(id);
  const data = modelFromWindow(key);
  if (!stage || !data) return;
  mountPointCloud(stage, data);
}

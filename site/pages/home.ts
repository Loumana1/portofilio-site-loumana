import { ground } from '../main';
import '../styles/home.css';

import { Door } from '../components/Door';
import { doors, site } from '../data/site';
import { withBase } from '../paths';

ground();

const app = document.getElementById('app');
if (!app) throw new Error('#app missing');

app.innerHTML = `
  <main class="home wrap">
    <h1 class="home__name">${site.name}</h1>
    <p class="home__line">${site.line}</p>
    <nav class="home__doors" aria-label="Sections">
      ${doors.map(Door).join('')}
    </nav>
    <p class="home__foot">
      <span>${site.place} · ${site.year}</span>
      <a href="${withBase('/about.html')}">About</a>
    </p>
  </main>`;

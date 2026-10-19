import { page } from '../main';
import '../styles/radio.css';

import { RadioPage } from '../components/RadioPage';
import { stations } from '../data/radio';

page('/radio.html', RadioPage(stations));

// Jump to #bruzz / #kiosk when arriving from the Music page.
if (location.hash) {
  requestAnimationFrame(() => {
    document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
  });
}

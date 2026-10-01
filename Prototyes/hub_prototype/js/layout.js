(function () {
  const page = document.body.dataset.page || 'hub';

  function renderHeader() {
    const el = document.getElementById('site-header');
    if (!el) return;

    const nav = SITE.worlds
      .map(
        (w) =>
          `<a href="${w.path}" class="${page === w.id ? 'is-active' : ''}">${w.label}</a>`
      )
      .join('');

    el.innerHTML = `
      <a class="site-header__logo" href="index.html">${SITE.name}</a>
      <nav class="site-header__nav" aria-label="Main">
        ${nav}
        <a href="press.html" class="${page === 'press' ? 'is-active' : ''}">Press</a>
      </nav>
    `;
  }

  function renderFooter() {
    const el = document.getElementById('site-footer');
    if (!el) return;

    el.innerHTML = `
      <div>
        <strong>${SITE.name}</strong> · ${SITE.location}<br />
        <a href="mailto:${SITE.contact.email}">${SITE.contact.email}</a>
      </div>
      <div class="footer-links">
        <a href="${SITE.links.soundcloud}" target="_blank" rel="noopener">SoundCloud</a>
        <a href="${SITE.links.spotify}" target="_blank" rel="noopener">Spotify</a>
        <a href="${SITE.links.bandcamp}" target="_blank" rel="noopener">Bandcamp</a>
        <a href="${SITE.links.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="${SITE.contact.instagramUrl}" target="_blank" rel="noopener">${SITE.contact.instagram}</a>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
  });
})();

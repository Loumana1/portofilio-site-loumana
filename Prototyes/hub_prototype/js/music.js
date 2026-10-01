(function () {
  const audio = new Audio();
  let current = null;
  let playing = false;

  const playerBar = document.getElementById('player-bar');
  const playerCover = document.getElementById('player-cover');
  const playerTitle = document.getElementById('player-title');
  const playerMeta = document.getElementById('player-meta');
  const playerToggle = document.getElementById('player-toggle');
  const playerScLink = document.getElementById('player-sc');

  function getRows() {
    return document.querySelectorAll('.beat-track-row[data-audio], .track-item[data-audio]');
  }

  function updateUI() {
    getRows().forEach((row) => {
      const active = current && row.dataset.id === current.id;
      row.classList.toggle('is-active', active);

      const legacyBtn = row.querySelector('.track-item__play');
      if (legacyBtn) legacyBtn.textContent = active && playing ? '⏸' : '▶';
    });

    if (!current || !playerBar) return;

    if (!playing && !current) {
      playerBar.classList.remove('is-visible');
      document.body.classList.remove('has-player');
      return;
    }

    playerBar.classList.add('is-visible');
    document.body.classList.add('has-player');
    if (playerCover) {
      playerCover.src = current.cover;
      playerCover.alt = current.title;
    }
    if (playerTitle) playerTitle.textContent = current.title;
    if (playerMeta) playerMeta.textContent = `${current.genre} · ${current.year}`;
    if (playerToggle) playerToggle.textContent = playing ? '⏸' : '▶';
  }

  function playTrack(beat) {
    if (current && current.id === beat.id) {
      if (playing) {
        audio.pause();
        playing = false;
      } else {
        audio.play();
        playing = true;
      }
      updateUI();
      return;
    }

    current = beat;
    audio.src = beat.audio;
    audio.play();
    playing = true;
    updateUI();
  }

  audio.addEventListener('ended', () => {
    playing = false;
    updateUI();
  });

  getRows().forEach((row) => {
    const beat = {
      id: row.dataset.id,
      title: row.dataset.title,
      genre: row.dataset.genre,
      year: row.dataset.year,
      audio: row.dataset.audio,
      cover: row.dataset.cover,
    };

    const btn = row.querySelector('.track-play-btn') || row.querySelector('.track-item__play');
    if (btn) btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playTrack(beat);
    });
  });

  if (playerToggle) {
    playerToggle.addEventListener('click', () => {
      if (!current) return;
      if (playing) {
        audio.pause();
        playing = false;
      } else {
        audio.play();
        playing = true;
      }
      updateUI();
    });
  }

  if (playerScLink && typeof SITE !== 'undefined') {
    playerScLink.href = SITE.links.soundcloud;
  }
})();

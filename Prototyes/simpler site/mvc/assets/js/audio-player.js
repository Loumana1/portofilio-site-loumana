/**
 * Interactive Audio Preview Player Engine (Vanilla HTML5 Audio)
 */
    const beatPlayer = new Audio();
    let currentActiveRow = null;

    function formatBeatTime(seconds) {
      if (isNaN(seconds) || seconds === Infinity || !isFinite(seconds)) return '00:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }

    document.querySelectorAll('.beat-track-row').forEach(row => {
      const playBtn = row.querySelector('.track-play-btn');
      const iconPlay = row.querySelector('.icon-play');
      const iconPause = row.querySelector('.icon-pause');
      const progressBar = row.querySelector('.track-progress-bar');
      const progressFill = row.querySelector('.track-progress-fill');
      const timeDisplay = row.querySelector('.track-time');
      const audioSrc = row.getAttribute('data-src');

      function togglePlay() {
        if (currentActiveRow === row && !beatPlayer.paused) {
          beatPlayer.pause();
          row.classList.remove('playing');
          if (iconPlay) iconPlay.style.display = 'block';
          if (iconPause) iconPause.style.display = 'none';
        } else {
          // Pause any previously playing track and reset its icons
          if (currentActiveRow && currentActiveRow !== row) {
            const prevPlay = currentActiveRow.querySelector('.icon-play');
            const prevPause = currentActiveRow.querySelector('.icon-pause');
            currentActiveRow.classList.remove('playing');
            if (prevPlay) prevPlay.style.display = 'block';
            if (prevPause) prevPause.style.display = 'none';
          }

          if (beatPlayer.src !== new URL(audioSrc, window.location.href).href) {
            beatPlayer.src = audioSrc;
          }

          beatPlayer.play().then(() => {
            currentActiveRow = row;
            row.classList.add('playing');
            if (iconPlay) iconPlay.style.display = 'none';
            if (iconPause) iconPause.style.display = 'block';
          }).catch(err => {
            console.warn("Audio playback notice:", err);
          });
        }
      }

      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          togglePlay();
        });
      }

      // Seek / scrub on progress bar click
      if (progressBar) {
        progressBar.addEventListener('click', (e) => {
          e.stopPropagation();
          if (beatPlayer.duration) {
            const rect = progressBar.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            if (currentActiveRow !== row) {
              togglePlay();
            }
            beatPlayer.currentTime = pos * beatPlayer.duration;
          }
        });
      }
    });

    // Global audio update listeners
    beatPlayer.addEventListener('timeupdate', () => {
      if (currentActiveRow) {
        const progressFill = currentActiveRow.querySelector('.track-progress-fill');
        const timeDisplay = currentActiveRow.querySelector('.track-time');
        if (progressFill && beatPlayer.duration) {
          const pct = (beatPlayer.currentTime / beatPlayer.duration) * 100;
          progressFill.style.width = `${pct}%`;
        }
        if (timeDisplay) {
          timeDisplay.textContent = formatBeatTime(beatPlayer.currentTime);
        }
      }
    });

    beatPlayer.addEventListener('ended', () => {
      if (currentActiveRow) {
        const iconPlay = currentActiveRow.querySelector('.icon-play');
        const iconPause = currentActiveRow.querySelector('.icon-pause');
        const progressFill = currentActiveRow.querySelector('.track-progress-fill');
        const timeDisplay = currentActiveRow.querySelector('.track-time');
        currentActiveRow.classList.remove('playing');
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
        if (progressFill) progressFill.style.width = '0%';
        if (timeDisplay) timeDisplay.textContent = '00:00';
        currentActiveRow = null;
      }
    });

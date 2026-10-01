/**
 * Release card expand / collapse
 */
(function () {
  const cards = document.querySelectorAll('.release-card[data-release]');
  if (!cards.length) return;

  function closeAll(except) {
    cards.forEach((card) => {
      if (card === except) return;
      card.classList.remove('is-expanded');
      const btn = card.querySelector('.release-card__hit');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function toggle(card) {
    const isOpen = card.classList.contains('is-expanded');
    closeAll(card);

    if (!isOpen) {
      card.classList.add('is-expanded');
      card.querySelector('.release-card__hit')?.setAttribute('aria-expanded', 'true');
    } else {
      card.classList.remove('is-expanded');
      card.querySelector('.release-card__hit')?.setAttribute('aria-expanded', 'false');
    }
  }

  cards.forEach((card) => {
    const hit = card.querySelector('.release-card__hit');
    if (!hit) return;

    hit.addEventListener('click', () => toggle(card));

    hit.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(card);
      }
      if (e.key === 'Escape') {
        closeAll();
      }
    });

    card.querySelectorAll('.stream-icon').forEach((link) => {
      link.addEventListener('click', (e) => e.stopPropagation());
    });
  });
})();

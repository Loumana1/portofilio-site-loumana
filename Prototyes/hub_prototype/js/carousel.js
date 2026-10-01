(function () {
  const track = document.getElementById('news-carousel-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!track || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  const totalSlides = dots.length || 1;

  function updateSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentSlide));
  }

  prevBtn.addEventListener('click', () => updateSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => updateSlide(currentSlide + 1));
  dots.forEach((dot, idx) => dot.addEventListener('click', () => updateSlide(idx)));

  let timer = setInterval(() => updateSlide(currentSlide + 1), 6000);
  const container = document.querySelector('.news-carousel-container');
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(timer));
    container.addEventListener('mouseleave', () => {
      timer = setInterval(() => updateSlide(currentSlide + 1), 6000);
    });
  }
})();

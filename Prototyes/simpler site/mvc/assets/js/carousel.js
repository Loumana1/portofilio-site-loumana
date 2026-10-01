/**
 * Featured Highlights Carousel
 */
    (function initNewsCarousel() {
      const track = document.getElementById('news-carousel-track');
      const prevBtn = document.getElementById('carousel-prev-btn');
      const nextBtn = document.getElementById('carousel-next-btn');
      const dots = document.querySelectorAll('.carousel-dot');
      if (!track || !prevBtn || !nextBtn) return;

      let currentSlide = 0;
      const totalSlides = dots.length;

      function updateSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }

      prevBtn.addEventListener('click', () => updateSlide(currentSlide - 1));
      nextBtn.addEventListener('click', () => updateSlide(currentSlide + 1));
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => updateSlide(idx));
      });

      // Auto play every 6 seconds
      let autoPlayTimer = setInterval(() => updateSlide(currentSlide + 1), 6000);
      const container = document.querySelector('.news-carousel-container');
      if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        container.addEventListener('mouseleave', () => {
          autoPlayTimer = setInterval(() => updateSlide(currentSlide + 1), 6000);
        });
      }
    })();

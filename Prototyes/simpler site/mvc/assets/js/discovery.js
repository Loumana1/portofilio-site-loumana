/**
 * Creative Discovery GSAP ScrollTrigger Animation
 */
    window.addEventListener('DOMContentLoaded', () => {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const discoverySection = document.querySelector('.section_discovery-container');
        if (discoverySection) {
          const wrapper = discoverySection.querySelector('.discovery-wrapper');
          const component = discoverySection.querySelector('.discovery-component');
          const imgWrap = discoverySection.querySelector('.discovery-img-wrap');
          const heading1 = discoverySection.querySelector('.discovery-heading._1');
          const heading2 = discoverySection.querySelector('.discovery-heading._2');
          const imgText = discoverySection.querySelector('.discovery-img-text');
          const imgHint = discoverySection.querySelector('.discovery-img-hint');
          const img = discoverySection.querySelector('.discovery-img');
          const scrollNote = discoverySection.querySelector('.discovery-scroll-note');

          // Initial small keyhole box
          gsap.set(component, {
            width: '140px',
            height: '90px'
          });
          gsap.set(img, { scale: 1.45 });
          if (imgHint) gsap.set(imgHint, { opacity: 1 });
          gsap.set(imgText, { opacity: 0, scale: 0.95, y: 15 });
          gsap.set(heading1, { x: 0, opacity: 1 });
          gsap.set(heading2, { x: 0, opacity: 1 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            }
          });

          tl.to(component, {
            width: '100%',
            height: '100%',
            ease: 'power1.inOut',
            duration: 1
          })
          .to(img, {
            scale: 1,
            ease: 'power1.inOut',
            duration: 1
          }, '<');

          if (imgHint) {
            tl.to(imgHint, {
              opacity: 0,
              duration: 0.35,
              ease: 'power1.out'
            }, '<');
          }

          tl.to(heading1, {
            x: -140,
            opacity: 0,
            duration: 0.7,
            ease: 'power1.out'
          }, '<')
          .to(heading2, {
            x: 140,
            opacity: 0,
            duration: 0.7,
            ease: 'power1.out'
          }, '<')
          .to(imgText, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          }, '<0.3');
        }
      }
    });

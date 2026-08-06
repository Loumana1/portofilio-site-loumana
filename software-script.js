```
/* ====================================
   SOFTWARE PAGE JAVASCRIPT
   ==================================== */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial reveal animation for "Selected Prototypes" title
    gsap.to(".text-item", {
        scrollTrigger: {
            trigger: ".section-home-projects",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        transform: "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0) rotateZ(0) skew(0, 0)",
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });

    // 3D Tilt Effect on hover for Project Cards
    const projectCards = document.querySelectorAll('.project-link-wrapper:not([style*="default"])'); // Exclude coming soon

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max +/- 8 degrees)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            gsap.to(card.querySelector('.project-content-wrapper'), {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
             gsap.to(card.querySelector('.project-content-wrapper'), {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});
```

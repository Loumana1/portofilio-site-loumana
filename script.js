// ============================================
// GLOBAL SETUP & INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // VIDEO HANDLING - Global Video Playback
    // ============================================
    // Force all videos to play automatically
    const allVideos = document.querySelectorAll('video');

    allVideos.forEach((video, index) => {
        // Remove duplicate IDs
        if (video.id === 'header-video' && index > 0) {
            video.removeAttribute('id');
        }

        // Force video to load and play
        video.addEventListener('loadeddata', () => {
            video.play().catch(() => {
                // Autoplay prevented - will retry on user interaction
            });
        });


        video.addEventListener('error', () => {
            // Video loading error - fail silently
        });

        video.addEventListener('canplay', () => {
            video.play().catch(() => {
                // Autoplay prevented - will retry on user interaction
            });
        });

        // Try to play immediately
        video.load();
        video.play().catch(() => {
            // Initial play failed - will retry on user interaction
        });
    });

    // ============================================
    // LANDING PAGE SECTION
    // ============================================
    // Header Video Carousel Logic - 3 videos only
    const headerCarouselItems = document.querySelectorAll('.header-carousel-item');
    let carouselInterval = null;

    if (headerCarouselItems.length > 0) {
        let currentHeaderIndex = 0;

        // Preload and start all videos at 0:01 (hidden)
        headerCarouselItems.forEach((item, index) => {
            const video = item.querySelector('video');
            if (video) {
                video.currentTime = 0; // Start at 0:01
                // Preload all videos
                video.load();
                // Start playing all videos (they'll be hidden until active)
                video.play().catch(() => {
                    // Video play error - fail silently
                });
            }
        });



        // Function to switch to next video
        const rotateHeaderVideo = () => {
            // Start next video playing before switching (2 seconds before)
            const nextIndex = (currentHeaderIndex + 1) % headerCarouselItems.length;
            const nextItem = headerCarouselItems[nextIndex];
            const nextVideo = nextItem.querySelector('video');

            if (nextVideo) {
                // Start next video at 0è0:07, 1 second before switch
                nextVideo.currentTime = 8; // Start at 00:07
                nextVideo.play().catch(() => {
                    // Video play error - fail silently
                });
            }

            // After a short delay, switch visibility
            setTimeout(() => {
                // Hide current video
                headerCarouselItems[currentHeaderIndex].classList.remove('active');

                // Show next video (already playing)
                nextItem.classList.add('active');
                currentHeaderIndex = nextIndex;

                // Update text for the new video
            }, 100); // Small delay to let video start playing
        };

        // Initialize first video and show corresponding text


        // Rotate every 5 seconds
        carouselInterval = setInterval(rotateHeaderVideo, 5000);

        // Clean up interval on page unload
        window.addEventListener('beforeunload', () => {
            if (carouselInterval) {
                clearInterval(carouselInterval);
            }
        });
    }

    // Header Content Animations (Title & Text)
    const headerTitleLeft = document.getElementById('title-header-section-loumana-left');
    const headerTitleRight = document.getElementById('title-header-section-world-right');

    if (headerTitleLeft && headerTitleRight) {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.from([headerTitleLeft, headerTitleRight], {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    // ============================================
    // HEADER SCROLL LOGIC
    // ============================================
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // DJ CAREER SECTION
    // ============================================

    // DJ Discovery Scroll Interaction (Noura "Keyhole" Reveal)
    const djDiscoverySection = document.querySelector('.section_dj-discovery');
    if (djDiscoverySection) {
        const component = djDiscoverySection.querySelector('.dj-discovery_component');
        const imgWrap = djDiscoverySection.querySelector('.dj-discovery_img-wrap');
        const heading1 = djDiscoverySection.querySelector('.dj-discovery_heading._1');
        const heading2 = djDiscoverySection.querySelector('.dj-discovery_heading._2');
        const imgText = djDiscoverySection.querySelector('.dj-discovery_img-text');
        const img = djDiscoverySection.querySelector('.dj-discovery_img');

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.dj-discovery_wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        });

        // Initial states - container starts small and centered
        gsap.set(component, {
            width: '11vw',
            height: '7vh'
        });

        gsap.set(img, { scale: 1.4 });
        gsap.set(imgText, { opacity: 0, y: '1.5rem' });
        gsap.set(heading1, { right: 'calc(50% + 8rem)' }); /* Increased for more space between text and image */
        gsap.set(heading2, { left: 'calc(50% + 8rem)' }); /* Increased for more space between text and image */
        gsap.set(imgWrap, { borderRadius: '1rem' });

        // Animation - expand container to full screen
        timeline
            .to(component, {
                width: '100vw',
                height: '100vh',
                duration: 1,
                ease: 'power1.inOut'
            })
            .to(img, {
                scale: 1,
                duration: 1,
                ease: 'power1.inOut'
            }, '<')
            .to(imgWrap, {
                borderRadius: '2rem',
                duration: 1
            }, '<')
            .to(heading1, {
                right: 'calc(100% + 8rem)', /* Increased for more space between text and image */
                duration: 1
            }, '<')
            .to(heading2, {
                left: 'calc(100% + 8rem)', /* Increased for more space between text and image */
                duration: 1
            }, '<')
            .to(imgText, {
                opacity: 1,
                y: '0rem',
                duration: 0.6
            }, '<0.2');

        // "Keep scrolling" button timing
        const scrollNoteText = djDiscoverySection.querySelector('.scroll-note_text');

        if (scrollNoteText) {
            gsap.set(scrollNoteText, {
                opacity: 0,
                visibility: 'hidden'
            });

            gsap.to(scrollNoteText, {
                opacity: 0.7,
                visibility: 'visible',
                duration: 0.8,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: '.dj-discovery_wrapper',
                    start: 'top 70%', // Start earlier (higher on page)
                    end: 'top 20%',
                    scrub: false,
                    toggleActions: 'play none none none'
                }
            });

            gsap.to(scrollNoteText, {
                top: '20px',
                duration: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.dj-discovery_wrapper',
                    start: 'top 40%',
                    end: 'top 20%',
                    scrub: 1,
                    onEnter: () => {
                        gsap.set(scrollNoteText, {
                            opacity: 0.7,
                            visibility: 'visible'
                        });
                    }
                }
            });

            // Force ScrollTrigger to refresh after setup
            // This ensures correct trigger positions even if page loads mid-section
            ScrollTrigger.refresh();
        }
    }

    // ============================================
    // DJ CAREER SECTION - Text Opacity + Progressive Images
    // ============================================
    const djCareerSection = document.querySelector('.section_dj-skills');

    // DJ Banner - Continuous scrolling animation (independent of scroll)
    const djBannerTrack = document.querySelector('.dj-skills-banner-track');
    if (djBannerTrack) {
        // Wait for layout to calculate widths properly
        setTimeout(() => {
            const bannerItems = djBannerTrack.querySelectorAll('.dj-skills-banner-item');
            // Calculate width of first set (11 items)
            let firstSetWidth = 0;
            for (let i = 0; i < 11; i++) {
                if (bannerItems[i]) {
                    firstSetWidth += bannerItems[i].offsetWidth + 64; // 64px = 4rem margin
                }
            }

            // Continuous scroll animation (medium speed, infinite loop)
            gsap.to(djBannerTrack, {
                x: -firstSetWidth,
                duration: 30,
                // Medium speed (30 seconds for one loop)
                ease: 'none',
                repeat: -1,
                // Infinite loop
            });
        }, 100);
    }

    if (djCareerSection) {
        const djSkillsHeading = document.querySelector('.dj-skills-heading');
        const scrollContent = djCareerSection.querySelector('.dj-skills-scroll-content');
        const images = djCareerSection.querySelectorAll('.dj-skills-image');

        // Pin section so background image stays in viewport until section ends
        // Bug 1 Fix: Check scrollContent exists before using it
        if (scrollContent) {
            ScrollTrigger.create({
                trigger: djCareerSection,
                start: 'top top',
                end: () => `+=${scrollContent.offsetHeight}`,
                pin: true,
                pinSpacing: true
            });
        }

        if (djSkillsHeading && scrollContent) {
            const textBox = document.querySelector('.dj-skills-text-box');
            const isMobile = window.innerWidth <= 430;

            if (isMobile) {
                // ============================================
                // MOBILE: Animation en bulk (simple)
                // ============================================

                // Don't split text into characters on mobile - keep as is
                // Set initial state
                gsap.set(djSkillsHeading, { opacity: 0 });
                if (textBox) {
                    gsap.set(textBox, { opacity: 0, y: 50 });
                }

                // Set initial state - images start invisible
                images.forEach((img) => {
                    gsap.set(img, {
                        opacity: 0,
                        y: 30,
                        scale: 0.95
                    });
                });

                // Create ScrollTrigger for mobile (bulk animation)
                ScrollTrigger.create({
                    trigger: scrollContent,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const scrollProgress = self.progress; // 0 to 1

                        // Text box: Simple fade-in + slide-up (one step)
                        if (textBox) {
                            if (scrollProgress < 0.2) {
                                gsap.set(textBox, { opacity: 0, y: 50 });
                            } else if (scrollProgress >= 0.2 && scrollProgress <= 0.5) {
                                const progress = (scrollProgress - 0.2) / 0.3; // 0 to 1
                                gsap.set(textBox, {
                                    opacity: progress,
                                    y: 50 - (progress * 50)
                                });
                            } else {
                                gsap.set(textBox, { opacity: 1, y: 0 });
                            }
                        }

                        // Text: Simple fade-in (all text at once, not character-by-character)
                        if (scrollProgress < 0.2) {
                            gsap.set(djSkillsHeading, { opacity: 0 });
                        } else if (scrollProgress >= 0.2 && scrollProgress <= 0.5) {
                            const progress = (scrollProgress - 0.2) / 0.3; // 0 to 1
                            gsap.set(djSkillsHeading, { opacity: progress });
                        } else {
                            gsap.set(djSkillsHeading, { opacity: 1 });
                        }

                        // Images: Grouped fade-in (all at once, not progressive)
                        if (scrollProgress >= 0.4) {
                            images.forEach((img) => {
                                if (!img.classList.contains('visible')) {
                                    img.classList.add('visible');
                                    gsap.to(img, {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        duration: 0.8,
                                        ease: 'power2.out'
                                    });
                                }
                            });
                        } else {
                            images.forEach((img) => {
                                if (img.classList.contains('visible')) {
                                    img.classList.remove('visible');
                                    gsap.to(img, {
                                        opacity: 0,
                                        y: 30,
                                        scale: 0.95,
                                        duration: 0.4,
                                        ease: 'power2.in'
                                    });
                                }
                            });
                        }
                    }
                });
            } else {
                // ============================================
                // DESKTOP: Character-by-character animation (original)
                // ============================================

                // Split text into characters and wrap each in a span for stagger animation
                const text = djSkillsHeading.textContent;
                const chars = text.split('');
                djSkillsHeading.innerHTML = '';
                chars.forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char; // Keep normal spaces to allow text wrapping
                    span.style.display = 'inline'; // Keep inline layout
                    span.style.opacity = '0.2'; // Initial opacity
                    djSkillsHeading.appendChild(span);
                });
                const charSpans = djSkillsHeading.querySelectorAll('span');

                // Force initial state - all characters start at light opacity (0.2)
                // This ensures correct state regardless of page load position
                gsap.set(charSpans, { opacity: 0.2 });

                // Set initial state - text box starts off-screen at bottom
                if (textBox) {
                    gsap.set(textBox, { yPercent: 100 });
                }

                // Check if section is already in viewport on load
                // If so, we'll let ScrollTrigger handle it, but ensure initial state is set
                const sectionRect = djCareerSection.getBoundingClientRect();
                const isSectionVisible = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;

                // Always ensure initial state, even if section is visible
                // ScrollTrigger will handle animation from current scroll position
                if (isSectionVisible) {
                    // Section is visible - ensure characters start at 0.2
                    // ScrollTrigger will animate them based on scroll position
                    gsap.set(charSpans, { opacity: 0.2 });
                }

                // Set initial state - images start invisible
                images.forEach((img, index) => {
                    // Get rotation from CSS classes
                    let rotation = 0;
                    if (img.classList.contains('dj-skills-image-1')) rotation = -5;
                    else if (img.classList.contains('dj-skills-image-2')) rotation = 5;
                    else if (img.classList.contains('dj-skills-image-3')) rotation = 3;
                    else if (img.classList.contains('dj-skills-image-4')) rotation = -4;

                    gsap.set(img, {
                        opacity: 0,
                        y: 80,
                        scale: 0.8,
                        rotation: rotation
                    });
                });

                // Create ScrollTrigger for scroll-based animations
                // Note: Using ScrollTrigger.create() directly since all animations are handled
                // via gsap.set()/gsap.to() in onUpdate, not via timeline methods
                const textScrollTrigger = ScrollTrigger.create({
                    trigger: scrollContent,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true,
                    onStart: (self) => {
                        // Check current progress and set initial state accordingly
                        // This handles page reload mid-section and scroll direction
                        const currentProgress = self.progress;
                        gsap.set(charSpans, { opacity: 0.2 });

                        if (textBox) {
                            // Set box position based on current scroll progress
                            if (currentProgress > 0.5) {
                                // Already past animation threshold - box should be at final position
                                gsap.set(textBox, { yPercent: -80 });
                            } else if (currentProgress < 0.3) {
                                // Before animation starts - box should be at initial position
                                gsap.set(textBox, { yPercent: 100 });
                            } else {
                                // In between - calculate intermediate position
                                const slideProgress = (currentProgress - 0.3) / 0.2; // 0 to 1
                                gsap.set(textBox, { yPercent: 100 - (slideProgress * 180) });
                            }
                        }
                    },
                    onEnter: () => {
                        // Entering from top (scrolling down) - set to initial state
                        gsap.set(charSpans, { opacity: 0.2 });
                        if (textBox) {
                            gsap.set(textBox, { yPercent: 100 });
                        }
                    },
                    onEnterBack: (self) => {
                        // Entering from bottom (scrolling up) - set based on current progress
                        const currentProgress = self.progress;

                        if (textBox) {
                            // If already past animation threshold, set to final position immediately
                            if (currentProgress > 0.5) {
                                gsap.set(textBox, { yPercent: -80 });
                            } else if (currentProgress < 0.3) {
                                gsap.set(textBox, { yPercent: 100 });
                            } else {
                                // In between - set to correct intermediate position
                                const slideProgress = (currentProgress - 0.3) / 0.2;
                                gsap.set(textBox, { yPercent: 100 - (slideProgress * 180) });
                            }
                        }
                    },
                    onUpdate: (self) => {
                        const scrollProgress = self.progress; // 0 to 1

                        // Text box slide: starts later (when section is pinned at top)
                        // Changed from 15% to 30% - starts rising only after section reaches top viewport
                        // This logic respects thresholds for both scroll directions
                        if (textBox) {
                            if (scrollProgress < 0.3) {
                                // Before 30%: text box off-screen (section not yet pinned at top)
                                gsap.set(textBox, { yPercent: 100 });
                            } else if (scrollProgress >= 0.3 && scrollProgress <= 0.5) {
                                // 30% to 50%: slide up from bottom to final position (slower rise)
                                const slideProgress = (scrollProgress - 0.3) / 0.2; // 0 to 1
                                gsap.set(textBox, { yPercent: 100 - (slideProgress * 180) });
                            } else {
                                // After 50%: text box at final position (no animation, just set)
                                gsap.set(textBox, { yPercent: -80 });
                            }
                        }

                        // Text opacity: character by character using stagger concept
                        // Calculate how many characters should be visible based on scroll progress
                        if (scrollProgress < 0.3) {
                            // Before 30%: all characters at initial light opacity
                            gsap.set(charSpans, { opacity: 0.2 });
                        } else {
                            // After 30%: reveal characters one by one (slower animation)
                            // Use only 50% of remaining scroll (30% → 80%) for character reveal
                            const charRevealProgress = Math.min((scrollProgress - 0.3) / 0.5, 1); // 0 to 1, capped at 80% scroll
                            const totalChars = charSpans.length;
                            const visibleChars = Math.floor(charRevealProgress * totalChars);

                            // Set opacity for each character based on its position
                            charSpans.forEach((span, index) => {
                                if (index < visibleChars) {
                                    // Character should be visible - calculate its opacity
                                    // First characters get full opacity, later ones fade in
                                    const charProgress = (index + 1) / visibleChars;
                                    const charOpacity = 1; // 0.2 → 1.0
                                    gsap.set(span, { opacity: charOpacity });
                                } else {
                                    // Character not yet visible
                                    gsap.set(span, { opacity: 0.2 });
                                }
                            });
                        }

                        // Progressive images: based on text opacity with better animation
                        // Images should appear/disappear correctly in both scroll directions
                        const textOpacity = scrollProgress < 0.3 ? 0.2 : (0.2 + ((scrollProgress - 0.3) / 0.7 * 0.8));

                        images.forEach((img) => {
                            const triggerOpacity = parseFloat(img.dataset.opacityTrigger || 0);

                            // Get rotation from CSS classes
                            let rotation = 0;
                            if (img.classList.contains('dj-skills-image-1')) rotation = -5;
                            else if (img.classList.contains('dj-skills-image-2')) rotation = 5;
                            else if (img.classList.contains('dj-skills-image-3')) rotation = 3;
                            else if (img.classList.contains('dj-skills-image-4')) rotation = -4;

                            if (textOpacity >= triggerOpacity) {
                                // Image should be visible with animation
                                if (!img.classList.contains('visible')) {
                                    img.classList.add('visible');
                                    gsap.to(img, {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        rotation: rotation,
                                        duration: 1.2,
                                        ease: 'power3.out'
                                    });
                                }
                            } else {
                                // Image should be hidden (works for both scroll directions)
                                if (img.classList.contains('visible')) {
                                    img.classList.remove('visible');
                                    gsap.to(img, {
                                        opacity: 0,
                                        y: 80,
                                        scale: 0.8,
                                        rotation: rotation,
                                        duration: 0.6,
                                        ease: 'power2.in'
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }
    }

    // ============================================
    // DJ ACTIVITIES SCROLL SECTION
    // ============================================
    // Horizontal Scroll Animation with White Blocks (Desktop)
    // Vertical Stack with Vertical Animation (Mobile)
    //
    // SECTION COORDINATION NOTES:
    // - Desktop: This section uses pin: true with horizontal scroll
    // - Mobile: Stack vertical, no pin, vertical animation for white blocks
    // - White blocks (adorable-block-left/right) have position: fixed, z-index: 1000
    // - Transition: DJ Activities → Releases (blocks handle themselves)
    //
    const djActivitiesWrapper = document.querySelector('.dj-activities-wrapper');
    const djActivitiesContainer = document.querySelector('.dj-activities-container');

    if (djActivitiesWrapper && djActivitiesContainer) {
        let resizeHandler = null;
        let currentScrollTrigger = null;

        const initAnimation = () => {
            // Clean up existing ScrollTrigger
            if (currentScrollTrigger) {
                currentScrollTrigger.kill();
                currentScrollTrigger = null;
            }

            const isMobile = window.innerWidth <= 430;
            const leftBlock = document.querySelector('.adorable-block-left');
            const rightBlock = document.querySelector('.adorable-block-right');

            if (isMobile) {
                // ============================================
                // MOBILE: Stack Vertical + Vertical Animation
                // ============================================
                // CALCULATION: Mobile wrapper has min-height: 50vh (or 100vh for container)
                // Timeline: Opacity (0.1) + Blocks animation (1.0 parallel) = 1.0 units total
                // Using 100vh scroll distance for smooth animation
                // Each unit = 100vh of scroll (100vh / 1.0)

                // Set initial state for blocks (vertical position)
                if (leftBlock && rightBlock) {
                    gsap.set([leftBlock, rightBlock], {
                        opacity: 0,
                        visibility: 'hidden',
                        zIndex: 1000
                    });
                    // Start from top and bottom (vertical animation)
                    gsap.set(leftBlock, { top: '-50vh', left: '0' });
                    gsap.set(rightBlock, { bottom: '-50vh', right: '0' });
                }

                // Create Timeline for mobile (vertical animation, no pin)
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: djActivitiesWrapper,
                        start: 'top top',
                        end: '+=100%', // 100vh scroll distance (matches container min-height: 100vh)
                        scrub: 1,
                        pin: false, // No pin on mobile
                        invalidateOnRefresh: false,
                        onLeave: () => {
                            // Blocks naturally disappear
                        },
                        onLeaveBack: () => {
                            // Hide blocks when going back up
                            if (leftBlock && rightBlock) {
                                gsap.set([leftBlock, rightBlock], { opacity: 0, visibility: 'hidden' });
                            }
                        }
                    }
                });

                // Animate blocks in vertically
                // Timeline structure:
                //   - Opacity: 0.1 units (0 to 0.1) = ~10vh of scroll
                //   - Blocks movement: 1.0 units (0 to 1.0, parallel) = ~100vh of scroll
                // Total: 1.0 units = 100vh
                if (leftBlock && rightBlock) {
                    tl.to([leftBlock, rightBlock], {
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.1 // ~10vh of scroll
                    })
                        .to(leftBlock, {
                            top: '0vh',
                            ease: 'power2.inOut',
                            duration: 1.0 // ~100vh of scroll
                        }, '<') // Start at same time as opacity
                        .to(rightBlock, {
                            bottom: '0vh',
                            ease: 'power2.inOut',
                            duration: 1.0 // ~100vh of scroll
                        }, '<'); // Start at same time as opacity
                }

                currentScrollTrigger = tl.scrollTrigger;
            } else {
                // ============================================
                // DESKTOP: Horizontal Scroll (Original Behavior)
                // ============================================
                const containerWidth = djActivitiesContainer.scrollWidth;
                const viewportWidth = window.innerWidth;
                const textPart = document.querySelector('[data-part="connect-text"]');

                if (!textPart) return;

                // Calculate target X to center the text part
                const textCenter = textPart.offsetLeft + (textPart.offsetWidth / 2);
                const targetX = textCenter - (viewportWidth / 2);

                // Ensure we don't scroll past the end or start
                const maxScroll = containerWidth - viewportWidth;
                const finalScrollX = Math.max(0, Math.min(targetX, maxScroll));

                // Set initial position
                gsap.set(djActivitiesContainer, { x: 0 });

                // Initial state for blocks (horizontal position)
                if (leftBlock && rightBlock) {
                    gsap.set([leftBlock, rightBlock], {
                        opacity: 0,
                        visibility: 'hidden',
                        zIndex: 1000
                    });
                    gsap.set(leftBlock, { left: '-50vw', top: 'auto' });
                    gsap.set(rightBlock, { right: '-50vw', bottom: 'auto' });
                }

                // Create Timeline
                // Timeline duration: Step 1 (1) + Step 2 (1) + Step 3 (1) = 3 units
                // ScrollTrigger end set to 500% (5 viewport heights) to slow down scroll experience
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: djActivitiesWrapper,
                        start: 'top top',
                        end: '+=500%', // Increased from 300% to 500% to slow down scroll
                        scrub: 1.5, // Increased scrub value for smoother, slower scroll
                        pin: true,
                        invalidateOnRefresh: true,
                        onLeave: () => {
                            // Blocks naturally disappear when section unpins
                        },
                        onLeaveBack: () => {
                            // Hide blocks when going back up
                            if (leftBlock && rightBlock) {
                                gsap.set([leftBlock, rightBlock], { opacity: 0, visibility: 'hidden' });
                            }
                        }
                    }
                });

                // Step 1: Scroll horizontally until text is centered
                tl.to(djActivitiesContainer, {
                    x: -finalScrollX,
                    ease: 'none',
                    duration: 1
                });

                // Step 2: Animate blocks in horizontally
                if (leftBlock && rightBlock) {
                    tl.to([leftBlock, rightBlock], {
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.1
                    }, '>')
                        .to(leftBlock, {
                            left: '0vw',
                            ease: 'power2.inOut',
                            duration: 1
                        }, '<')
                        .to(rightBlock, {
                            right: '0vw',
                            ease: 'power2.inOut',
                            duration: 1
                        }, '<');
                }

                // Step 3: Hold for a moment
                tl.to({}, { duration: 1 });

                currentScrollTrigger = tl.scrollTrigger;
            }

            // CRITICAL: Refresh all ScrollTriggers after pinning layout changes
            // This ensures subsequent sections (like Releases) recalculate their start positions
            // based on the new page height created by pinSpacing.
            ScrollTrigger.refresh();
        };

        // Initialize after a short delay to ensure layout is calculated
        setTimeout(initAnimation, 100);

        // Refresh on resize with cleanup
        resizeHandler = () => {
            ScrollTrigger.refresh();
            setTimeout(initAnimation, 100);
        };
        window.addEventListener('resize', resizeHandler);

        // Clean up resize listener on page unload
        window.addEventListener('beforeunload', () => {
            if (resizeHandler) {
                window.removeEventListener('resize', resizeHandler);
            }
            if (currentScrollTrigger) {
                currentScrollTrigger.kill();
            }
        });
    }

    // ============================================
    // RELEASES SECTION
    // ============================================
    // Scroll-Triggered "Window Opening" Grid Animation
    //
    // SECTION COORDINATION NOTES:
    // - This section uses pin: true
    // - Section has z-index: 10 (lower than DJ Activities blocks)
    // - Transition: DJ Activities → Releases (blocks handle themselves)
    // - Transition: Releases → Software (both use pin: true, works smoothly)
    //
    const releasesSection = document.querySelector('.releases-pinned-section');
    const releaseCards = document.querySelectorAll('.release-card');
    const releasesSectionWrapper = document.querySelector('.releases-sticky-wrapper');
    const releaseTitleHeader = document.querySelector('.releases-side-title');

    if (releasesSection && releaseCards.length > 0) {
        let resizeTimeout;
        let releaseTriggers = []; // Track all triggers to kill them on refresh

        const initReleases = () => {
            // Clean up existing ScrollTriggers
            releaseTriggers.forEach(trigger => trigger.kill());
            releaseTriggers = [];

            const cards = Array.from(releaseCards);
            const totalCards = cards.length;
            let clickAnimationTriggered = false; // Reset click trigger state

            // Initial Setup - Cards start VISIBLE and stacked in center at 1.5x size
            cards.forEach((card, i) => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.transform = 'translate(-50%, -50%) scale(1.5)';
                card.style.left = '50%';
                card.style.top = '50%';

                gsap.set(card, {
                    opacity: 1,
                    visibility: 'visible',
                    scale: 1.5,
                    xPercent: -50,
                    yPercent: -50,
                    x: 0,
                    y: 0,
                    zIndex: totalCards - i
                });

                const desc = card.querySelector('.release-desc-inner');
                if (desc) {
                    desc.style.opacity = '0';
                    gsap.set(desc, { opacity: 0, y: 20 });
                }
            });

            // Create Main Timeline
            // CALCULATION: Section height is 400vh, viewport is 100vh
            // Scroll distance: 400vh - 100vh = 300vh
            // Timeline structure (ULTRA SLOW, MAXIMUM VISIBILITY):
            //   - Pause: 1.5, Title/Cards: 10.0, Hold: 4.0
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: releasesSection,

                    start: 'top +=20%',
                    end: 'bottom bottom',








                    scrub: 1,
                    pin: releasesSectionWrapper,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            // Track main trigger
            if (tl.scrollTrigger) releaseTriggers.push(tl.scrollTrigger);

            // Hold Phase
            tl.to({}, { duration: 1.5 });

            // Title Movement & Color Change
            if (releaseTitleHeader) {
                tl.to(releaseTitleHeader, {
                    top: '15%',
                    left: '50%',
                    xPercent: -50,
                    yPercent: 0,
                    scale: 0.8,
                    transformOrigin: 'center center',
                    duration: 10.0,
                    ease: 'power2.inOut'
                }, 1.5);

                const titleText = releaseTitleHeader.querySelector('.releases-big-title');
                if (titleText) {
                    tl.to(titleText, {
                        textAlign: 'center',
                        duration: 10.0
                    }, 1.5);
                }
            }

            // Grid Positions Helper
            const calculateGridPositions = () => {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const cardWidth = 300;

                const availableWidth = viewportWidth * 0.95;

                let scale = 1;
                const totalWidthRaw = totalCards * cardWidth;

                if (totalWidthRaw > availableWidth) {
                    scale = availableWidth / (totalCards * cardWidth * 1.05);
                }
                scale = Math.min(scale, 1.0);
                scale = Math.max(scale, 0.5);

                const scaledCardWidth = cardWidth * scale;

                let gap = (availableWidth - (totalCards * scaledCardWidth)) / (totalCards - 1);
                gap = Math.min(gap, 40);
                gap = Math.max(gap, 10);

                const totalUsedWidth = (totalCards * scaledCardWidth) + ((totalCards - 1) * gap);
                const startX = -totalUsedWidth / 2 + scaledCardWidth / 2;
                const targetY = viewportHeight * 0.25;

                return {
                    positions: cards.map((_, i) => ({
                        x: startX + (i * (scaledCardWidth + gap)),
                        y: targetY,
                        scale: scale
                    }))
                };
            };

            // Cards Animation
            cards.forEach((card, i) => {
                tl.to(card, {
                    x: () => calculateGridPositions().positions[i].x,
                    y: () => calculateGridPositions().positions[i].y,
                    scale: () => calculateGridPositions().positions[i].scale,
                    opacity: 1, // Explicitly force opacity 1 to prevent disappearing
                    rotation: 0,
                    duration: 10.0,
                    ease: 'power2.out'
                }, 1.5 + (i * 0.2));

                const desc = card.querySelector('.release-desc-inner');
                if (desc) {
                    tl.to(desc, {
                        opacity: 1,
                        y: 0,
                        duration: 1.0,
                        ease: 'power2.out'
                    }, 10.5 + (i * 0.2));
                }
            });

            // Final Hold
            tl.to({}, { duration: 4.0 });

            // Ensure visibility when scrolling in/out
            const hideTrigger = ScrollTrigger.create({
                trigger: releasesSection,
                start: 'top bottom',
                end: 'top top',
                scrub: false,
                onEnter: () => {
                    // Show cards when entering section from top
                    cards.forEach((card) => {
                        gsap.set(card, { opacity: 1 });
                        card.style.opacity = '1';
                    });
                },
                onEnterBack: () => {
                    // Ensure cards are visible when scrolling back up into section
                    cards.forEach((card) => {
                        gsap.set(card, { opacity: 1 });
                        card.style.opacity = '1';
                    });
                },
                onLeaveBack: () => {
                    // Hide when completely leaving the section to the bottom (scrolling up past it)
                    cards.forEach((card) => {
                        gsap.set(card, { opacity: 0 });
                        card.style.opacity = '0';
                    });
                },
                onLeave: () => {
                    // visiblewhen scrolling down past section
                    cards.forEach((card) => {
                        gsap.set(card, { opacity: 1 });
                        card.style.opacity = '1';
                    });
                }
            });
            releaseTriggers.push(hideTrigger);

            // Click animation pulse
            const clickTrigger = ScrollTrigger.create({
                trigger: releasesSection,
                start: 'top top',
                end: 'bottom bottom',
                scrub: false,
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Trigger when almost done (85%)
                    if (progress >= 0.85 && !clickAnimationTriggered) {
                        clickAnimationTriggered = true;
                        cards.forEach((card, i) => {
                            gsap.to(card, {
                                scale: '+=0.08',
                                duration: 0.4,
                                yoyo: true,
                                repeat: 1,
                                ease: 'power2.inOut',
                                delay: i * 0.1
                            });
                        });
                    }
                    if (progress < 0.85) {
                        clickAnimationTriggered = false;
                    }
                }
            });
            releaseTriggers.push(clickTrigger);

            // CRITICAL: Refresh all ScrollTriggers after setup
            ScrollTrigger.refresh();
        };

        // Initialize after delay (robustness for pinning/layout)
        setTimeout(initReleases, 200);

        // Resize handler
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initReleases, 250);
        });

        // Clean up on unload
        window.addEventListener('beforeunload', () => {
            releaseTriggers.forEach(trigger => trigger.kill());
        });

        // Release Modal - Click handlers
        const releaseModal = document.getElementById('release-modal');
        const modalBody = document.getElementById('modal-body');
        const modalClose = document.querySelector('.release-modal-close');

        // Release data
        const releaseData = {
            'places': {
                title: 'Places EP',
                year: '2023',
                producedBy: 'Loumana',
                mixedBy: 'Loumana',
                masteredBy: null,
                collaborators: 'ROCA MORA',
                label: 'Waffle Street',
                spotify: 'https://open.spotify.com/album/7Hp66JUF1jvDwjZKGvsMr9?si=--9KZbzoSY6FEb-pQeKZXA&nd=1&dlsi=0492631604f445e8&referral=labelaffiliate&utm_source=1110lDsqrSV&utm_medium=Indie_Distrokid&utm_campaign=labelaffiliate',
                appleMusic: null,
                youtube: 'https://www.youtube.com/watch?v=as5XelcZa38&list=PLZQ7cwTfoiEr68lT5mC2YwnJZ-idZOatA&index=1',
                bandcamp: 'https://loumana.bandcamp.com/album/ep-places',
                dominantColor: '#2d5016', // Darker green
                description: '‘Places’, the second EP by Brussels-based artist Loumana, offers a captivating sonic journey that goes beyond pure musical expression. Through a delicate fusion of electronic and orchestral elements, Loumana explores the theme of self-discovery and the pursuit of a space that is uniquely one’s own. The EP unfolds as a poetic exploration of the desire to be somewhere else, a personal sanctuary. Tracks like ‘Ending Pleasure’ and ‘Le Louvre’ serve as artistic canvases for Loumana to paint sonic landscapes inspired by the places he holds dear. The melodies carry you to destinations both real and imaginary, reflecting the universal quest for a space that feels as uniquely one’s own.'
            },
            'geometrie': {
                title: 'Géométrie EP',
                year: '2019',
                producedBy: 'Loumana',
                mixedBy: 'Loumana',
                masteredBy: 'Dr Blaster',
                collaborators: 'Roxy Rose',
                label: 'Cosmic Pop Records',
                spotify: 'https://open.spotify.com/album/6oFQCKzK0Lhwi1tA7wtncX?si=B8JGV5fET4C-uFQOBtczpw',
                appleMusic: null,
                youtube: 'https://www.youtube.com/watch?v=UOQmkozfGkM&list=OLAK5uy_k21zg-b7DPIVqrMS0voKgCWF_qUlrmM9Y',
                bandcamp: 'https://cosmicpoprecords.bandcamp.com/album/cpr020-g-om-trie',
                dominantColor: '#4a1a5c', // Deep dark purple
                description: '« Est-ce qu\'il y a des migrants dans l\'espace ? On les appelle extra-terrestres, les migrants de l\'espace ! Ils ont beaucoup de choses à nous apprendre, les migrants de l\'espace ; le partage, l\'amour ! (…) Nous aussi on est des migrants de l\'espace, mais on ne le sait même pas encore qu\'on est des migrants de l\'espace ! » Entre paroles sensées et gros beat, Loumana nous invite directement et intimement dans sa bulle dès le premier track, Ligne. Est-ce que la thématique me parle à moi personnellement ? Ou bien est-elle en train de devenir universelle ? Difficile en tout cas d\'y rester indifférente. Le décor est planté, la ceinture est bouclée, au décollage je suis parée.'
            },
            'nethaan': {
                title: 'Nethaan',
                year: '2018',
                producedBy: 'Loumana',
                mixedBy: 'PHASM',
                masteredBy: 'Peter DeWachter',
                collaborators: 'ANTHENA (Rap Vocals)',
                label: 'Cosmic Pop Records',
                spotify: 'https://open.spotify.com/album/33wW9SW1ABNv51zOcySkk2?referral=labelaffiliate&utm_source=1101lBYKa9BR&utm_medium=Indie_Distrokid&utm_campaign=labelaffiliate',
                appleMusic: null,
                youtube: null,
                bandcamp: 'https://x-pert.bandcamp.com/album/nethaan',
                dominantColor: '#8b4513', // Orangey, brownish
                description: 'Loumana et Anthéna unissent leurs forces pour créer "Nethaan", un EP qui fusionne musique électronique et rap. À travers des récits inspirés de leurs expériences personnelles d\'Anthéna et d\'histoires fictives, ce projet aborde des sujets tels que la quête de soi, l\'amour, et la sobriété, tout en sensibilisant à l\'abus de drogues dans le milieu du clubbing. L\'objectif de cette collaboration est de briser les stéréotypes liés à la culture des clubs tout en attirant l\'attention sur les dangers de consommation de drogues. Le message reste réfléchi et ouvert à la discussion, sans pour autant être moralisateur.'
            },
            'six-secondes': {
                title: '6 Secondes',
                year: '2021',
                producedBy: 'Loumana',
                mixedBy: 'KK',
                masteredBy: 'Peter DeWachter',
                collaborators: 'MAHUNGU (Rap Vocals)',
                label: 'Cosmic Pop Records',
                spotify: null,
                appleMusic: null,
                youtube: null,
                bandcamp: 'https://wafflestreetrecords.bandcamp.com/album/6-secondes',
                dominantColor: '#d2691e', // Orange, brownish (clearer)
                description: 'Cette EP est le résultat d\'un travail collaboratif entre un Beatmaker et un Rappeur. Partageant une vision artistique commune, Loumana et Mahungu abordent le sujet : du temps s\'écoule, difficile de le maîtriser ; La dualité Afrique-Europe, questionnements sur la colonisation et finalement les ruptures amoureuses.'
            }
        };

        // Open modal function
        const openModal = (releaseId) => {
            const data = releaseData[releaseId];
            if (!data) return;

            // Set background color
            const modalContent = document.querySelector('.release-modal-content');
            if (modalContent) {
                modalContent.style.backgroundColor = data.dominantColor;
            }

            // Build modal content
            let content = `<h2 id="modal-title">${data.title}</h2>`;

            // Info grid
            content += '<div class="release-modal-info-grid">';
            content += `<div class="release-modal-info-item"><span class="release-modal-info-label">Year</span><span class="release-modal-info-value">${data.year}</span></div>`;
            content += `<div class="release-modal-info-item"><span class="release-modal-info-label">Produced By</span><span class="release-modal-info-value">${data.producedBy}</span></div>`;
            if (data.mixedBy) {
                content += `<div class="release-modal-info-item"><span class="release-modal-info-label">Mixed By</span><span class="release-modal-info-value">${data.mixedBy}</span></div>`;
            }
            if (data.masteredBy) {
                content += `<div class="release-modal-info-item"><span class="release-modal-info-label">Mastered By</span><span class="release-modal-info-value">${data.masteredBy}</span></div>`;
            }
            if (data.collaborators) {
                content += `<div class="release-modal-info-item"><span class="release-modal-info-label">Collaborators</span><span class="release-modal-info-value">${data.collaborators}</span></div>`;
            }
            content += `<div class="release-modal-info-item"><span class="release-modal-info-label">Label</span><span class="release-modal-info-value">${data.label}</span></div>`;
            content += '</div>';

            // Links
            content += '<div class="release-modal-links">';
            if (data.spotify) {
                content += `<a href="${data.spotify}" class="release-modal-link spotify" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                Spotify
            </a>`;
            }
            if (data.appleMusic) {
                content += `<a href="${data.appleMusic}" class="release-modal-link apple-music" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple Music
            </a>`;
            }
            if (data.youtube) {
                content += `<a href="${data.youtube}" class="release-modal-link youtube" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
            </a>`;
            }
            if (data.bandcamp) {
                content += `<a href="${data.bandcamp}" class="release-modal-link bandcamp" target="_blank" rel="noopener noreferrer">
                Bandcamp
            </a>`;
            }
            content += '</div>';

            // Description section
            if (data.description) {
                content += '<div class="release-modal-description">';
                content += '<h3>About</h3>';
                content += `<p>${data.description}</p>`;
                content += '</div>';
            }

            // CTA Button
            content += '<div class="release-modal-cta-wrapper">';
            content += '<a href="#contact" class="release-modal-cta">Buy an Exclusive beat</a>';
            content += '</div>';

            if (modalBody) modalBody.innerHTML = content;
            if (releaseModal) {
                releaseModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        // Close modal function
        const closeModal = () => {
            if (releaseModal) {
                releaseModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        // Add click handlers to cards
        releaseCards.forEach((card) => {
            card.addEventListener('click', (e) => {
                const releaseId = card.getAttribute('data-release');
                if (releaseId) {
                    openModal(releaseId);
                }
            });
        });

        // Close modal handlers
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (releaseModal) {
            releaseModal.addEventListener('click', (e) => {
                if (e.target === releaseModal || e.target.classList.contains('release-modal-backdrop')) {
                    closeModal();
                }
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && releaseModal && releaseModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ============================================
    // SOFTWARE SECTION
    // ============================================
    // Stripe-Style Split Layout (Two-Panel Hover Design)
    //
    // SECTION COORDINATION NOTES:
    // - No pinning needed (static section)
    // - Hover effects are CSS-only (color inversion on panels)
    // - No JavaScript animations needed (CSS handles all interactions)
    //



    // ============================================
    // NAVIGATION & UI ELEMENTS
    // ============================================

    // ============================================
    // DROPDOWN MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuLinks = dropdownMenu ? dropdownMenu.querySelectorAll('a') : [];

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from closing immediately

            const isActive = menuToggle.classList.toggle('active');
            dropdownMenu.classList.toggle('active');

            if (isActive) {
                // Animate links in Staggered (GSAP)
                gsap.fromTo(menuLinks,
                    { x: -30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power3.out',
                        delay: 0.1
                    }
                );
            }
        });

        // Close menu when clicking on a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                dropdownMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (dropdownMenu.classList.contains('active') &&
                !dropdownMenu.contains(e.target) &&
                !menuToggle.contains(e.target)) {

                menuToggle.classList.remove('active');
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // ============================================
    // FLOATING NAVIGATION BUTTON
    // ============================================

    const floatingNavToggle = document.getElementById('floatingNavToggle');
    const floatingNavMenu = document.getElementById('floatingNavMenu');
    const floatingNavItems = floatingNavMenu ? floatingNavMenu.querySelectorAll('.floating-nav-item') : [];

    if (floatingNavToggle && floatingNavMenu) {
        // Toggle menu on button click
        floatingNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            floatingNavToggle.classList.toggle('active');
            floatingNavMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        floatingNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                // Close menu
                floatingNavToggle.classList.remove('active');
                floatingNavMenu.classList.remove('active');

                // Smooth scroll to section
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingNavToggle.contains(e.target) && !floatingNavMenu.contains(e.target)) {
                floatingNavToggle.classList.remove('active');
                floatingNavMenu.classList.remove('active');
            }
        });
    }
    // ============================================
    // BEAT MAKING SECTION
    // ============================================
    // Beat Making Banner - Continuous scrolling animation (like DJ Skills banner)
    const beatMakingBannerTrack = document.querySelector('.beat-making-banner-track');
    if (beatMakingBannerTrack) {
        // Wait for layout to calculate widths properly
        setTimeout(() => {
            const bannerItems = beatMakingBannerTrack.querySelectorAll('.beat-making-banner-item');
            // Calculate width of first set (count unique items before first duplicate)
            // Count items until we see a repeat pattern
            let firstSetWidth = 0;
            const seenItems = new Set();
            let itemCount = 0;

            for (let i = 0; i < bannerItems.length; i++) {
                const itemText = bannerItems[i].textContent.trim();
                if (seenItems.has(itemText) && i > 0) {
                    // Found first duplicate, stop counting
                    break;
                }
                seenItems.add(itemText);
                if (bannerItems[i]) {
                    firstSetWidth += bannerItems[i].offsetWidth + 64; // 64px = 4rem margin
                    itemCount++;
                }
            }

            // Continuous scroll animation (medium speed, infinite loop)
            gsap.to(beatMakingBannerTrack, {
                x: -firstSetWidth,
                duration: 30,
                // Medium speed (30 seconds for one loop)
                ease: 'none',
                repeat: -1,
                // Infinite loop
            });
        }, 100);
        const items = beatMakingBannerTrack.querySelectorAll('.beat-making-banner-item');
        if (items.length < 20) {
            // Clone existing items to ensure enough length
            items.forEach(item => {
                const clone = item.cloneNode(true);
                beatMakingBannerTrack.appendChild(clone);
            });
        }
    }

    // ============================================
    // BEATS DOWNLOAD PAGE LOGIC (REDESIGN)
    // ============================================
    // ============================================
    // BEATS DOWNLOAD PAGE - iTunes Style
    // ============================================
    const beatsPageBody = document.querySelector('.beats-page-body');
    if (beatsPageBody) {
        const trackItems = document.querySelectorAll('.beats-track-item');
        const downloadModal = document.getElementById('beats-download-modal');
        const modalClose = document.querySelector('.beats-modal-close');
        const downloadForm = document.getElementById('beats-download-form');
        const downloadBtns = document.querySelectorAll('.beats-download-btn');
        const donateLink = document.querySelector('.beats-donate-link');

        let currentlyPlaying = null;
        let currentAudio = null;

        // Format time helper
        const formatTime = (seconds) => {
            if (isNaN(seconds)) return '--:--';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        // Play/Pause functionality
        trackItems.forEach((item, index) => {
            const playBtn = item.querySelector('.beats-play-btn');
            const audio = item.querySelector('.beats-audio');
            const durationSpan = item.querySelector('.beats-track-duration');

            // Load duration when metadata is available
            audio.addEventListener('loadedmetadata', () => {
                if (durationSpan) {
                    durationSpan.textContent = formatTime(audio.duration);
                }
            });

            // Play/Pause button click
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // If this track is already playing, pause it
                if (currentlyPlaying === item && !audio.paused) {
                    audio.pause();
                    playBtn.classList.remove('playing');
                    item.classList.remove('playing');
                    currentlyPlaying = null;
                    currentAudio = null;
                    return;
                }

                // Stop any currently playing audio
                if (currentAudio && currentAudio !== audio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    const prevItem = currentAudio.closest('.beats-track-item');
                    const prevBtn = prevItem.querySelector('.beats-play-btn');
                    prevBtn.classList.remove('playing');
                    prevItem.classList.remove('playing');
                }

                // Play this track
                audio.play();
                playBtn.classList.add('playing');
                item.classList.add('playing');
                currentlyPlaying = item;
                currentAudio = audio;
            });

            // Update UI when audio ends
            audio.addEventListener('ended', () => {
                playBtn.classList.remove('playing');
                item.classList.remove('playing');
                audio.currentTime = 0;
                currentlyPlaying = null;
                currentAudio = null;
            });

            // Update UI when audio is paused
            audio.addEventListener('pause', () => {
                if (audio.currentTime === 0 || audio.ended) {
                    playBtn.classList.remove('playing');
                    item.classList.remove('playing');
                }
            });
        });

        // Download button click - open modal
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (downloadModal) {
                    downloadModal.classList.add('active');
                }
            });
        });

        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                if (downloadModal) {
                    downloadModal.classList.remove('active');
                }
            });
        }

        // Close modal on outside click
        if (downloadModal) {
            downloadModal.addEventListener('click', (e) => {
                if (e.target === downloadModal) {
                    downloadModal.classList.remove('active');
                }
            });
        }

        // Handle "Donate & Download" link
        if (donateLink) {
            donateLink.addEventListener('click', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('beats-email');
                const email = emailInput ? emailInput.value : '';
                if (email) {
                    localStorage.setItem('user_email', email);
                    // Redirect to donation or handle donation
                    alert('Redirecting to donation page...');
                } else {
                    alert('Please enter your email first');
                }
            });
        }

        // Form submission
        if (downloadForm) {
            downloadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('beats-email');
                const submitBtn = downloadForm.querySelector('.beats-submit-btn');
                const email = emailInput ? emailInput.value : '';

                if (!email) {
                    alert('Please enter your email');
                    return;
                }

                // Store email
                localStorage.setItem('user_email', email);

                // Simulate processing
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.textContent = 'Download Started!';
                    setTimeout(() => {
                        alert(`Thank you! Download link sent to ${email}`);
                        downloadModal.classList.remove('active');
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        downloadForm.reset();
                    }, 1000);
                }, 1500);
            });
        }
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.querySelector('.footer-btn--back-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Also handle any other 'href="#top"' links
    document.querySelectorAll('a[href="#top"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            if (anchor !== backToTopBtn) { // Avoid double binding if selector matches
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

});

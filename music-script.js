// ====================================
// MUSIC PAGE - MAIN JAVASCRIPT
// ====================================

// ====================================
// TRACK DATA - REAL AUDIO FILES
// ====================================
const trackData = {
    'hip-hop': [
        { title: 'Money trees Z', file: 'assets/audio/Hip hop/Money trees Z.mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'dmx in church', file: 'assets/audio/Hip hop/dmx in church.wav', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'icarus v2', file: 'assets/audio/Hip hop/icarus v2.wav', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'low rider a bogota', file: 'assets/audio/Hip hop/low rider a bogota .wav', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'potassium', file: 'assets/audio/Hip hop/potassium.wav', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'rings of sommon', file: 'assets/audio/Hip hop/rings of sommon.mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'SELLING BOATS', file: 'assets/audio/Hip hop/SELLING BOATS .mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'SELLING PLANES', file: 'assets/audio/Hip hop/SELLING PLANES.mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'sweet Fever', file: 'assets/audio/Hip hop/sweet Fever.mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'Switches', file: 'assets/audio/Hip hop/Switches.mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'the media', file: 'assets/audio/Hip hop/the media.mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'Tournai', file: 'assets/audio/Hip hop/Tournai.mp3', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'loop 01-08-22 trap', file: 'assets/audio/Hip hop/loop 01-08-22 trap.wav', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' },
        { title: 'FOREST', file: 'assets/audio/Hip hop/Bombap /FOREST .wav', genre: 'Hip Hop', year: '2024', cover: 'assets/images/MusicPageImages/Hiphop.png' }
    ],
    'afro': [
        { title: 'BIG BUM MIX 1', file: 'assets/audio/Afro/BIG BUM MIX 1.mp3', genre: 'Afro', year: '2024', cover: 'assets/images/MusicPageImages/Afro.png' },
        { title: 'LOTUS GIFD Mix 1 v2', file: 'assets/audio/Afro/LOTUS GIFD Mix 1 v2.mp3', genre: 'Afro', year: '2024', cover: 'assets/images/MusicPageImages/Afro.png' },
        { title: 'To choose is to foresake V3', file: 'assets/audio/Afro/To choose is to foresake V3.mp3', genre: 'Afro', year: '2024', cover: 'assets/images/MusicPageImages/Afro.png' }
    ],
    'electronic': [
        { title: 'night club safari V2', file: 'assets/audio/night club safari V2.mp3', genre: 'Electronic', year: '2024', cover: 'assets/images/MusicPageImages/Electronic.png' },
        { title: 'Zropoto new version juillet 2025', file: 'assets/audio/Zropoto new version juillet 2025.mp3', genre: 'Electronic', year: '2025', cover: 'assets/images/MusicPageImages/Electronic.png' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // ====================================
    // SLIDESHOW FUNCTIONALITY REMOVED
    // ====================================
    // Custom Beat section is now static HTML


    // ====================================
    // AUDIO PLAYER STATE
    // ====================================
    let currentTrack = null;
    let currentAudio = null;
    let isPlaying = false;
    let currentTrackElement = null;
    let currentTrackIndex = 0;
    let trackList = [];

    const mainAudioPlayer = document.getElementById('mainAudioPlayer');
    const musicPlayer = document.getElementById('musicPlayer');
    const playerPlayPauseBtn = document.getElementById('playerPlayPause');
    const progressFill = document.getElementById('progressFill');
    const currentTimeSpan = document.getElementById('currentTime');
    const totalTimeSpan = document.getElementById('totalTime');
    const playerTrackName = document.getElementById('playerTrackName');
    const playerArtistName = document.getElementById('playerArtistName');
    const volumeSlider = document.getElementById('volumeSlider');

    // ====================================
    // UTILITY FUNCTIONS
    // ====================================
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Gradient colors for track covers
    const trackGradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];

    function getTrackGradient(index) {
        return trackGradients[index % trackGradients.length];
    }

    function updateProgressBar() {
        // Use ONLY mainAudioPlayer for progress
        if (mainAudioPlayer.src && !isNaN(mainAudioPlayer.duration) && mainAudioPlayer.duration > 0) {
            const progress = (mainAudioPlayer.currentTime / mainAudioPlayer.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTimeSpan.textContent = formatTime(mainAudioPlayer.currentTime);
        }
    }

    function updatePlayerInfo(trackElement) {
        // Try different selectors for different track views
        const trackName = trackElement.querySelector('.track-card__title')?.textContent ||
            trackElement.querySelector('.all-tracks-name')?.textContent ||
            'Unknown Track';
        playerTrackName.textContent = trackName;
        playerArtistName.textContent = 'Loumana';

        // Show player bar
        musicPlayer.classList.add('active');
    }

    function stopCurrentTrack() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        isPlaying = false;
        updatePlayPauseButton();
    }

    function updatePlayPauseButton() {
        const playSvg = playerPlayPauseBtn.querySelector('.play-svg');
        const pauseSvg = playerPlayPauseBtn.querySelector('.pause-svg');

        if (isPlaying) {
            playSvg.style.display = 'none';
            pauseSvg.style.display = 'block';
        } else {
            playSvg.style.display = 'block';
            pauseSvg.style.display = 'none';
        }
    }

    // ====================================
    // SIDEBAR NAVIGATION
    // ====================================
    const sidebarLinks = document.querySelectorAll('.sidebar__link[data-section]');
    const freeBeatsCategories = document.getElementById('categoriesSection');
    const buyBeatsCategories = document.getElementById('buyBeatsCategoriesSection');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');

            // Remove active from all
            sidebarLinks.forEach(l => l.classList.remove('sidebar__link--active'));
            link.classList.add('sidebar__link--active');

            // Update profile header
            const profileTitle = document.querySelector('.profile-header__title');
            if (section === 'free-beats') {
                profileTitle.textContent = 'Free Club Bangers';
                // Show free beats categories, hide buy beats
                if (freeBeatsCategories) freeBeatsCategories.style.display = 'block';
                if (buyBeatsCategories) buyBeatsCategories.style.display = 'none';
            } else if (section === 'buy-beats') {
                profileTitle.textContent = 'Buy Beats';
                // Show buy beats categories, hide free beats
                if (freeBeatsCategories) freeBeatsCategories.style.display = 'none';
                if (buyBeatsCategories) buyBeatsCategories.style.display = 'block';
            }

            console.log(`Switched to: ${section}`);
        });
    });

    // ====================================
    // TRACK PLAYBACK - MOST LISTENED
    // ====================================
    const trackCards = document.querySelectorAll('.track-card--large');

    // Build track list from Most Listened
    trackList = Array.from(trackCards).map((card, index) => ({
        element: card,
        title: card.querySelector('.track-card__title')?.textContent || `Track ${index + 1}`,
        index: index
    }));

    // Load tracks from trackData and populate Most Listened
    function populateMostListened() {
        const topTracksGrid = document.querySelector('.most-listened__grid') || document.querySelector('.top-tracks__grid');
        if (!topTracksGrid) return;

        // Get first tracks from each category for "Most Listened"
        const mostListened = [
            ...trackData['hip-hop'].slice(0, 2),
            ...trackData['afro'].slice(0, 1),
            ...trackData['electronic'].slice(0, 2)
        ].slice(0, 5); // Limit to 5 tracks

        // Clear existing tracks
        topTracksGrid.innerHTML = '';

        // Create track cards
        mostListened.forEach((track, index) => {
            const trackCard = document.createElement('div');
            trackCard.className = 'track-card';
            trackCard.dataset.trackIndex = index;
            trackCard.dataset.trackFile = track.file;
            const gradient = getTrackGradient(index);
            const coverImage = track.cover || '';
            trackCard.innerHTML = `
                <div class="track-rank">${index + 1}</div>
                <div class="track-card__artwork" style="background: ${gradient};">
                    ${coverImage ? `<img src="${coverImage}" alt="${track.title}" class="track-card__cover-img">` : ''}
                    <button class="track-card__play-btn" style="display: none;">▶</button>
                </div>
                <div class="track-card__info">
                    <h3 class="track-card__title">${track.title}</h3>
                    <p class="track-card__meta">${track.genre} · ${track.year}</p>
                    <p class="track-card__plays">-- plays</p>
                </div>
            `;

            // Create audio element
            const audio = document.createElement('audio');
            audio.preload = 'metadata';
            audio.src = track.file;
            trackCard.appendChild(audio);

            topTracksGrid.appendChild(trackCard);

            // Add event listeners
            const playBtn = trackCard.querySelector('.track-card__play-btn');


            trackCard.addEventListener('click', (e) => {
                if (e.target === playBtn || e.target.closest('.track-card__play-btn')) {
                    return;
                }
                playTrack(trackCard, audio, index);
            });

            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playTrack(trackCard, audio, index);
            });



            // Update track list
            trackList.push({
                element: trackCard,
                title: track.title,
                index: index
            });
        });

        // Re-initialize drag and drop after tracks are added
        makeTrackCardsDraggable();
    }

    // Initialize Most Listened
    populateMostListened();

    function playTrack(trackCard, audio, index) {
        // If same track, toggle play/pause
        if (currentTrackElement === trackCard && isPlaying) {
            mainAudioPlayer.pause();
            isPlaying = false;
            updatePlayPauseButton();
            return;
        }

        // Stop current track
        stopCurrentTrack();

        // Play this track - ONLY use mainAudioPlayer
        currentTrackElement = trackCard;
        currentAudio = audio; // Keep reference but don't play it
        currentTrackIndex = index;

        // Use ONLY mainAudioPlayer for playback
        mainAudioPlayer.src = audio.src;
        mainAudioPlayer.load();

        // Wait for metadata to load before playing
        const playAudio = () => {
            mainAudioPlayer.play().catch(e => console.log('Main audio play error:', e));
            isPlaying = true;
            updatePlayPauseButton();
            updatePlayerInfo(trackCard);
        };

        if (mainAudioPlayer.readyState >= 1) {
            // Metadata already loaded
            playAudio();
        } else {
            // Wait for metadata
            mainAudioPlayer.addEventListener('loadedmetadata', playAudio, { once: true });
        }
    }

    // ====================================
    // PLAYER CONTROLS
    // ====================================
    playerPlayPauseBtn.addEventListener('click', () => {
        // Control ONLY mainAudioPlayer
        if (!mainAudioPlayer.src) return;

        if (isPlaying) {
            mainAudioPlayer.pause();
            isPlaying = false;
        } else {
            mainAudioPlayer.play().catch(e => console.log('Play error:', e));
            isPlaying = true;
        }
        updatePlayPauseButton();
    });

    // Next button (music player)
    const playerNextBtn = document.querySelector('.next-btn');
    if (playerNextBtn) {
        playerNextBtn.addEventListener('click', () => {
            if (trackList.length > 0) {
                const nextIndex = (currentTrackIndex + 1) % trackList.length;
                const nextTrack = trackList[nextIndex];
                if (nextTrack && nextTrack.element) {
                    const audio = nextTrack.element.querySelector('audio');
                    if (audio) {
                        playTrack(nextTrack.element, audio, nextIndex);
                    }
                }
            }
        });
    }

    // Previous button
    const playerPrevBtn = document.querySelector('.prev-btn');
    if (playerPrevBtn) {
        playerPrevBtn.addEventListener('click', () => {
            if (trackList.length > 0) {
                const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : trackList.length - 1;
                const prevTrack = trackList[prevIndex];
                if (prevTrack && prevTrack.element) {
                    const audio = prevTrack.element.querySelector('audio');
                    if (audio) {
                        playTrack(prevTrack.element, audio, prevIndex);
                    }
                }
            }
        });
    }

    // Progress bar click - seek functionality
    const progressBarContainer = document.getElementById('progressBarContainer');
    if (progressBarContainer) {
        progressBarContainer.addEventListener('click', (e) => {
            if (mainAudioPlayer.src && !isNaN(mainAudioPlayer.duration) && mainAudioPlayer.duration > 0) {
                const rect = progressBarContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = Math.max(0, Math.min(1, clickX / rect.width));
                const newTime = percentage * mainAudioPlayer.duration;

                mainAudioPlayer.currentTime = newTime;
            }
        });
    }

    // Update progress bar continuously
    setInterval(() => {
        updateProgressBar();
    }, 100);

    // Update total time
    mainAudioPlayer.addEventListener('loadedmetadata', () => {
        totalTimeSpan.textContent = formatTime(mainAudioPlayer.duration);
    });

    // Handle audio end - auto play next track
    mainAudioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseButton();

        // Auto play next track if available
        if (trackList.length > 0) {
            const nextIndex = (currentTrackIndex + 1) % trackList.length;
            const nextTrack = trackList[nextIndex];
            if (nextTrack && nextTrack.element) {
                const audio = nextTrack.element.querySelector('audio');
                if (audio) {
                    playTrack(nextTrack.element, audio, nextIndex);
                }
            }
        }
    });

    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            if (currentAudio) {
                currentAudio.volume = volume;
            }
            mainAudioPlayer.volume = volume;
        });
        mainAudioPlayer.volume = 0.5;
    }

    // ====================================
    // CATEGORIES CLICK - FULL PAGE CHANGE
    // ====================================
    const categoryItems = document.querySelectorAll('.category-item');
    const genreView = document.getElementById('genreView');
    const genreViewTitle = document.getElementById('genreViewTitle');
    const genreViewContent = document.getElementById('genreViewContent');
    const genreViewBack = document.getElementById('genreViewBack');

    // Check if elements exist
    if (!genreView || !genreViewTitle || !genreViewContent) {
        console.warn('Genre view elements not found, some features may not work');
    }

    if (categoryItems.length > 0) {
        console.log(`Found ${categoryItems.length} category items`);
        categoryItems.forEach((categoryItem, index) => {
            // Make the whole category item clickable
            categoryItem.style.cursor = 'pointer';
            categoryItem.addEventListener('click', (e) => {
                console.log(`Category item ${index} clicked!`, categoryItem);
                e.preventDefault();
                e.stopPropagation();

                if (!genreView) {
                    console.error('❌ genreView element not found!');
                    alert('Error: Genre view element not found. Check console for details.');
                    return;
                }
                if (!genreViewTitle) {
                    console.error('❌ genreViewTitle element not found!');
                    return;
                }
                if (!genreViewContent) {
                    console.error('❌ genreViewContent element not found!');
                    return;
                }

                const category = categoryItem.getAttribute('data-category');
                console.log('✅ Category clicked:', category);
                console.log('✅ Genre view element:', genreView);
                console.log('✅ Genre view current display:', window.getComputedStyle(genreView).display);

                // Hide all category sections and show genre view
                document.querySelectorAll('.categories-section, .genre-section').forEach(section => {
                    section.style.display = 'none';
                });
                document.querySelectorAll('.most-listened, .hero-slideshow').forEach(section => {
                    section.style.display = 'none';
                });

                // Show genre view - use both display and visibility
                console.log('🔄 Setting genre view to visible...');
                genreView.style.display = 'block';
                genreView.style.visibility = 'visible';
                genreView.style.opacity = '1';
                genreView.style.position = 'relative';
                genreView.style.zIndex = '100';
                console.log('✅ Genre view display set to:', genreView.style.display);
                console.log('✅ Genre view computed display:', window.getComputedStyle(genreView).display);

                // Update title and icon
                const categoryName = categoryItem.querySelector('.category-title, .genre-title')?.textContent || category;
                if (genreViewTitle) {
                    genreViewTitle.textContent = categoryName;
                }

                // Set genre icon based on category
                const genreViewIcon = document.getElementById('genreViewIcon');
                if (genreViewIcon) {
                    let iconPath = '';
                    if (category === 'hip-hop') {
                        iconPath = 'assets/images/MusicPageImages/Hiphop.png';
                    } else if (category === 'afro') {
                        iconPath = 'assets/images/MusicPageImages/Afro.png';
                    } else if (category === 'electronic') {
                        iconPath = 'assets/images/MusicPageImages/Electronic.png';
                    }

                    if (iconPath) {
                        genreViewIcon.src = iconPath;
                        genreViewIcon.alt = categoryName;
                        genreViewIcon.style.display = 'block';
                    } else {
                        genreViewIcon.style.display = 'none';
                    }
                }

                // Update tab to show category name instead of "By Genre"
                const byGenreTab = document.querySelector('[data-tab="by-genre"]');
                if (byGenreTab) {
                    byGenreTab.textContent = categoryName;
                    byGenreTab.style.display = 'block';
                }

                // Hide everything below tabs except genre view
                document.querySelectorAll('.top-tracks').forEach(section => {
                    section.style.display = 'none';
                });

                // Load tracks for this category
                if (genreViewContent) {
                    loadGenreTracks(category, genreViewContent);
                }

                // Scroll to top of page to show genre view
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // Also ensure genre view is visible
                    genreView.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            });
        });
        console.log(`Attached click handlers to ${categoryItems.length} category items`);
    } else {
        console.warn('No category items found');
    }

    // Back button - Return to Overview
    if (genreViewBack) {
        genreViewBack.addEventListener('click', () => {
            // Hide genre view
            genreView.style.display = 'none';

            // Show overview sections (slideshow and most listened)
            document.querySelectorAll('.hero-slideshow, .most-listened').forEach(section => {
                section.style.display = 'block';
            });

            // Show appropriate category section based on active sidebar link
            const activeSection = document.querySelector('.sidebar__link--active')?.getAttribute('data-section');
            if (activeSection === 'buy-beats' && buyBeatsCategories) {
                buyBeatsCategories.style.display = 'block';
            } else if (freeBeatsCategories) {
                freeBeatsCategories.style.display = 'block';
            }

            // Show sections again
            document.querySelectorAll('.top-tracks').forEach(section => {
                section.style.display = 'block';
            });

            // Reset tab
            const byGenreTab = document.querySelector('[data-tab="by-genre"]');
            if (byGenreTab) {
                byGenreTab.style.display = 'none';
            }

            // Hide genre icon
            const genreViewIcon = document.getElementById('genreViewIcon');
            if (genreViewIcon) {
                genreViewIcon.style.display = 'none';
            }

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function loadGenreTracks(category, container) {
        let tracks = [];

        // Handle "most-purchased" category
        if (category === 'most-purchased') {
            // Use the same tracks as "Most Listened" for now
            tracks = [
                ...trackData['hip-hop'].slice(0, 2),
                ...trackData['afro'].slice(0, 1),
                ...trackData['electronic'].slice(0, 2)
            ].slice(0, 5);
        } else {
            // Get tracks from trackData
            tracks = trackData[category] || [];
        }

        if (tracks.length === 0) {
            container.innerHTML = '<p style="padding: 2rem; color: var(--color-text-secondary);">No tracks available for this category.</p>';
            return;
        }

        container.innerHTML = '';

        tracks.forEach((track, index) => {
            // Generate pseudo-random metadata for visual purposes
            const bpm = 120 + Math.floor(Math.random() * 40);
            const keys = ['Am', 'C', 'G', 'D', 'Em', 'F', 'Bm', 'Dm'];
            const key = keys[Math.floor(Math.random() * keys.length)];

            const trackRow = document.createElement('div');
            trackRow.className = 'track-row';
            trackRow.dataset.trackIndex = index;

            // Get cover or gradient
            const coverImage = track.cover || '';
            const gradient = getTrackGradient(index);
            const bgStyle = coverImage ? '' : `background: ${gradient};`;
            const imgHtml = coverImage ? `<img src="${coverImage}" alt="${track.title}" class="track-row__img">` : `<div style="width:100%;height:100%;${bgStyle}"></div>`;

            trackRow.innerHTML = `
                <div class="track-row__art">
                    ${imgHtml}
                    <div class="track-row__play-overlay">
                        <button class="track-row__play-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="track-row__center">
                    <div class="track-row__info">
                        <h3 class="track-row__main-title">${track.title}</h3>
                        <span class="track-row__artist">LOUMANA</span>
                    </div>
                    
                    <div class="track-row__waveform">
                        <!-- Generated bars -->
                        ${Array(40).fill(0).map(() => `<div class="waveform-bar" style="height: ${30 + Math.random() * 40}%"></div>`).join('')}
                    </div>
                    
                    <div class="track-row__meta">
                        <span class="meta-tag">${track.genre}</span>
                        <span class="meta-tag">${bpm} BPM</span>
                        <span class="meta-tag">${key}</span>
                        <span class="meta-tag">${track.year}</span>
                    </div>
                </div>
                
                <div class="track-row__actions">
                    <button class="action-btn like-add-btn" title="Add to Selection">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </button>
                    <button class="action-btn download-btn" title="Download">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                    </button>
                </div>
            `;

            const audio = document.createElement('audio');
            audio.preload = 'metadata';
            audio.src = track.file;
            trackRow.appendChild(audio);

            container.appendChild(trackRow);

            // Logic for play button
            const playBtn = trackRow.querySelector('.track-row__play-btn');
            const overlay = trackRow.querySelector('.track-row__play-overlay');
            const likeAddBtn = trackRow.querySelector('.like-add-btn');

            // Play Click
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                playTrack(trackRow, audio, index);
            });

            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playTrack(trackRow, audio, index);
            });

            // Like (Add to Cart) Click
            if (likeAddBtn) {
                likeAddBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToSelectedBits(track.title);

                    // Visual feedback
                    likeAddBtn.style.fill = 'var(--color-accent)';
                    likeAddBtn.querySelector('svg').style.fill = 'var(--color-accent)';
                    likeAddBtn.querySelector('svg').style.stroke = 'var(--color-accent)';
                });
            }
        });
    }

    // ====================================
    // TAB SWITCHING
    // ====================================
    const tabs = document.querySelectorAll('.content-tabs__tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.getAttribute('data-tab');

            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('content-tabs__tab--active'));
            tab.classList.add('content-tabs__tab--active');

            if (tabType === 'all-tracks') {
                // Show "All Tracks" view with Spotify Popular layout
                showAllTracksView();
            } else if (tabType === 'overview') {
                // Show overview (default)
                showOverviewView();
            }
        });
    });

    function showAllTracksView() {
        // Hide current sections
        document.querySelectorAll('.top-tracks, .latest-release-section, .categories-section, .genre-view').forEach(section => {
            section.style.display = 'none';
        });

        // Create and show All Tracks view (Spotify Popular style)
        let allTracksView = document.getElementById('allTracksView');
        if (!allTracksView) {
            allTracksView = document.createElement('section');
            allTracksView.id = 'allTracksView';
            allTracksView.className = 'all-tracks-view';
            allTracksView.innerHTML = `
                <div class="section-header">
                    <h2 class="section-header__title">All Tracks</h2>
                </div>
                <div class="all-tracks-list" id="allTracksList">
                    <!-- Tracks will be loaded here -->
                </div>
            `;
            document.querySelector('.main-content').appendChild(allTracksView);
        }

        allTracksView.style.display = 'block';
        loadAllTracks();
    }

    function showOverviewView() {
        // Show default sections
        document.querySelectorAll('.top-tracks, .latest-release-section, .categories-section').forEach(section => {
            section.style.display = 'block';
        });

        const allTracksView = document.getElementById('allTracksView');
        if (allTracksView) {
            allTracksView.style.display = 'none';
        }

        const genreView = document.getElementById('genreView');
        if (genreView) {
            genreView.style.display = 'none';
        }
    }

    function loadAllTracks() {
        const list = document.getElementById('allTracksList');
        if (!list) return;

        // Combine all tracks from all categories
        const allTracks = [
            ...trackData['hip-hop'],
            ...trackData['afro'],
            ...trackData['electronic']
        ];

        list.innerHTML = '';

        allTracks.forEach((track, index) => {
            // Generate pseudo-random metadata for visual purposes
            const bpm = 120 + Math.floor(Math.random() * 40);
            const keys = ['Am', 'C', 'G', 'D', 'Em', 'F', 'Bm', 'Dm'];
            const key = keys[Math.floor(Math.random() * keys.length)];

            const trackRow = document.createElement('div');
            trackRow.className = 'track-row';
            trackRow.dataset.trackIndex = index;

            // Get cover or gradient
            const coverImage = track.cover || '';
            const gradient = getTrackGradient(index);
            const bgStyle = coverImage ? '' : `background: ${gradient};`;
            const imgHtml = coverImage ? `<img src="${coverImage}" alt="${track.title}" class="track-row__img">` : `<div style="width:100%;height:100%;${bgStyle}"></div>`;
            trackRow.innerHTML = `
                <div class="track-row__art">
                    ${imgHtml}
                    <div class="track-row__play-overlay">
                        <button class="track-row__play-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="track-row__center">
                    <div class="track-row__info">
                        <h3 class="track-row__main-title">${track.title}</h3>
                        <span class="track-row__artist">LOUMANA</span>
                    </div>
                    
                    <div class="track-row__waveform">
                        <!-- Generated bars will be here -->
                        ${Array(40).fill(0).map(() => `<div class="waveform-bar" style="height: ${30 + Math.random() * 40}%"></div>`).join('')}
                    </div>
                    
                    <div class="track-row__meta">
                        <span class="meta-tag">${track.genre}</span>
                        <span class="meta-tag">${bpm} BPM</span>
                        <span class="meta-tag">${key}</span>
                        <span class="meta-tag">${track.year}</span>
                    </div>
                </div>
                
                <div class="track-row__actions">
                    <button class="action-btn like-add-btn" title="Add to Selection">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </button>
                    <button class="action-btn download-btn" title="Download">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                    </button>
                </div>
            `;

            const audio = document.createElement('audio');
            audio.preload = 'metadata';
            audio.src = track.file;
            trackRow.appendChild(audio);

            list.appendChild(trackRow);

            // Logic for play button
            const playBtn = trackRow.querySelector('.track-row__play-btn');
            const overlay = trackRow.querySelector('.track-row__play-overlay');
            const likeAddBtn = trackRow.querySelector('.like-add-btn');

            // Play Click
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                playTrack(trackRow, audio, index);
            });

            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playTrack(trackRow, audio, index);
            });

            // Add to Cart Click
            // Like (Add to Cart) Click
            if (likeAddBtn) {
                likeAddBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    addToSelectedBits(track.title);

                    // Visual feedback
                    likeAddBtn.style.fill = 'var(--color-accent)';
                    likeAddBtn.querySelector('svg').style.fill = 'var(--color-accent)';
                    likeAddBtn.querySelector('svg').style.stroke = 'var(--color-accent)';
                });
            }
        });

        // Re-initialize drag and drop after tracks are added
        makeTrackCardsDraggable();
    }

    // ====================================
    // DRAG & DROP - YOUR SELECTED BITS
    // ====================================
    const dropzone = document.getElementById('selectedBitsDropzone');
    const selectedBitsList = document.getElementById('selectedBitsList');
    let selectedBeats = [];

    // Function to make track cards draggable
    function makeTrackCardsDraggable() {
        const allTrackCards = document.querySelectorAll('.track-card, .all-tracks-item');
        allTrackCards.forEach(card => {
            // Remove existing listeners to avoid duplicates
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);

            newCard.setAttribute('draggable', 'true');
            newCard.addEventListener('dragstart', (e) => {
                const trackName = newCard.querySelector('.track-card__title')?.textContent ||
                    newCard.querySelector('.all-tracks-name')?.textContent || '';
                e.dataTransfer.setData('text/plain', trackName);
                newCard.style.opacity = '0.5';
            });
            newCard.addEventListener('dragend', () => {
                newCard.style.opacity = '1';
            });
        });
    }

    // Initialize drag and drop after tracks are loaded
    makeTrackCardsDraggable();

    // Dropzone handlers
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');

        const trackName = e.dataTransfer.getData('text/plain');
        if (trackName) {
            addToSelectedBits(trackName);
        }
    });

    function addToSelectedBits(trackName) {
        if (!selectedBeats.includes(trackName)) {
            selectedBeats.push(trackName);
            updateSelectedBitsDisplay();
        }
    }

    function updateSelectedBitsDisplay() {
        const placeholder = dropzone.querySelector('.dropzone-placeholder');
        if (selectedBeats.length > 0) {
            placeholder.style.display = 'none';
            selectedBitsList.innerHTML = selectedBeats.map((beat, index) => `
                <div class="selected-bit-item" data-index="${index}">
                    <span>${beat}</span>
                    <button class="remove-bit-btn" data-index="${index}">×</button>
                </div>
            `).join('');

            // Add remove handlers
            document.querySelectorAll('.remove-bit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    selectedBeats.splice(index, 1);
                    updateSelectedBitsDisplay();
                });
            });

            // Show checkout button
            addCheckoutButton();
        } else {
            placeholder.style.display = 'flex';
            selectedBitsList.innerHTML = '';
            // Remove checkout button if exists
            const existingBtn = document.querySelector('.checkout-selected-btn');
            if (existingBtn) existingBtn.remove();
        }
    }

    // ====================================
    // GENRE CARD PLAY BUTTON (House Vibes, etc.)
    // ====================================
    document.querySelectorAll('.genre-card__play-btn').forEach(playBtn => {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const genreCard = playBtn.closest('.genre-card');
            const genre = genreCard.getAttribute('data-genre');

            // Play first track in that genre from Most Listened
            const firstTrackInGenre = Array.from(trackCards).find(card => {
                const meta = card.querySelector('.track-card__meta')?.textContent || '';
                return meta.toLowerCase().includes(genre.toLowerCase());
            });

            if (firstTrackInGenre) {
                const audio = firstTrackInGenre.querySelector('audio');
                const index = Array.from(trackCards).indexOf(firstTrackInGenre);
                if (audio) {
                    playTrack(firstTrackInGenre, audio, index);
                }
            }
        });
    });

    // ====================================
    // CHECKOUT/DOWNLOAD MODAL
    // ====================================
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutModalBtn = document.getElementById('closeCheckoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutSummary = document.getElementById('checkoutSummary');
    const checkoutModalTitle = document.getElementById('checkoutModalTitle');
    const checkoutModalDescription = document.getElementById('checkoutModalDescription');
    const paymentGroup = document.getElementById('paymentGroup');
    const checkoutSubmitBtn = document.getElementById('checkoutSubmitBtn');

    // Function to open checkout modal
    function openCheckoutModal(isPaid = false) {
        // Update modal content based on context
        if (isPaid) {
            checkoutModalTitle.textContent = 'Purchase Your Selected Beats';
            checkoutModalDescription.textContent = 'Enter your email and name to complete your purchase.';
            paymentGroup.style.display = 'block';
            checkoutSubmitBtn.textContent = 'Purchase';
        } else {
            checkoutModalTitle.textContent = 'Download Your Selected Beats';
            checkoutModalDescription.textContent = 'Enter your email to download your selected beats.';
            paymentGroup.style.display = 'none';
            checkoutSubmitBtn.textContent = 'Download';
        }

        // Update summary
        checkoutSummary.innerHTML = selectedBeats.map(beat =>
            `<div class="checkout-summary-item">${beat}</div>`
        ).join('');

        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal handlers
    closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);
    checkoutModal.querySelector('.checkout-modal__overlay').addEventListener('click', closeCheckoutModal);

    function closeCheckoutModal() {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
        checkoutForm.reset();
    }

    // Form submission
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('checkoutEmail').value;
        const name = document.getElementById('checkoutName').value;

        // Determine if paid or free based on active section
        const activeSection = document.querySelector('.sidebar__link--active')?.getAttribute('data-section');
        const isPaid = activeSection === 'buy-beats';

        console.log('Checkout:', { email, name, beats: selectedBeats, isPaid });

        // In production: Send to backend, process payment, trigger downloads
        alert(`Thank you! ${isPaid ? 'Purchase' : 'Download'} will be processed.\n\nIn production, this would:\n- Save email/name\n- Process payment (if paid)\n- Trigger download of selected beats`);

        // Clear selection and close modal
        selectedBeats = [];
        updateSelectedBitsDisplay();
        closeCheckoutModal();
    });

    // ====================================
    // SEARCH FUNCTIONALITY
    // ====================================
    const searchInput = document.querySelector('.topbar__search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.toLowerCase().trim();

            searchTimeout = setTimeout(() => {
                if (query.length === 0) {
                    // Show all tracks
                    document.querySelectorAll('.track-card, .genre-track-item').forEach(card => {
                        card.style.display = '';
                    });
                    return;
                }

                // Search in track titles
                document.querySelectorAll('.track-card, .genre-track-item').forEach(card => {
                    const title = card.querySelector('.track-card__title, .genre-track-item__title')?.textContent.toLowerCase() || '';
                    const meta = card.querySelector('.track-card__meta, .genre-track-item__meta')?.textContent.toLowerCase() || '';

                    if (title.includes(query) || meta.includes(query)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 300);
        });
    }

    // Add checkout button to selected bits (when items are selected)
    function addCheckoutButton() {
        const existingBtn = document.querySelector('.checkout-selected-btn');
        if (existingBtn) existingBtn.remove();

        if (selectedBeats.length > 0) {
            const btn = document.createElement('button');
            btn.className = 'checkout-selected-btn';
            btn.textContent = selectedBeats.length === 1 ? 'Checkout' : `Checkout (${selectedBeats.length})`;
            btn.addEventListener('click', () => {
                const activeSection = document.querySelector('.sidebar__link--active')?.getAttribute('data-section');
                openCheckoutModal(activeSection === 'buy-beats');
            });
            dropzone.appendChild(btn);
        }
    }

    // ====================================
    // CUSTOM BEAT BUTTON
    // ====================================
    const customBeatBtn = document.querySelector('.custom-beat-btn');
    if (customBeatBtn) {
        customBeatBtn.addEventListener('click', () => {
            // In production: Open contact form or redirect
            alert('Custom Beat Request\n\nIn production, this would:\n- Open contact form\n- Or redirect to contact page\n- Or open email client');
        });
    }

    // ====================================
    // INITIALIZE
    // ====================================

    // Ensure genre view is hidden on page load
    if (genreView) {
        genreView.style.display = 'none';
        console.log('✅ Genre view initialized and hidden');
    } else {
        console.error('❌ Genre view element not found during initialization!');
    }

    console.log('Free Club Bangers - Loaded successfully! 🎵');
    console.log('Debug info:', {
        categoryItems: categoryItems.length,
        genreView: !!genreView,
        genreViewTitle: !!genreViewTitle,
        genreViewContent: !!genreViewContent,
        genreViewBack: !!genreViewBack
    });
});

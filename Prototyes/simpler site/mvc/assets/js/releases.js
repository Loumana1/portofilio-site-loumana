/**
 * Release Detail Modal & Interactive Releases Section
 */
      animate();

      window.addEventListener('resize', () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    }

    // Launch custom 3D point-cloud models on load:
    // 1. Hero Moog Synth: Isometric tilt (0.35 rad X, -0.4 rad Y)
    // 2. Dev Projects Computer: 0 deg around Y and 90 deg up on X (-1.35 rad)
    window.addEventListener('DOMContentLoaded', () => {
      initPlyViewer('viewer-moog', '../../assets/models/moog.ply', 'MOOG_MODEL_DATA', 0.35, -0.4, 0xe8c94a);
      initPlyViewer('viewer-computer-dev', '../../assets/models/computer.ply', 'COMPUTER_MODEL_DATA', -1.35, 0, 0x1792cf);

      // Dropdown Navigation Handler (Desktop hover & Mobile tap/click)
      const dropdownGroups = document.querySelectorAll('.nav-dropdown-group');
      dropdownGroups.forEach(group => {
        const btn = group.querySelector('.nav-pill-btn');
        const menu = group.querySelector('.nav-dropdown-menu');

        if (btn) {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = group.classList.contains('active');
            dropdownGroups.forEach(g => {
              if (g !== group) g.classList.remove('active');
            });
            group.classList.toggle('active', !isActive);
          });
        }

        if (menu) {
          menu.querySelectorAll('.nav-dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
              group.classList.remove('active');
            });
          });
        }
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown-group')) {
          dropdownGroups.forEach(g => g.classList.remove('active'));
        }
      });
    });

    /* ==========================================================================
       Release Cards & Modal Interaction Logic (Pure Vanilla JS, No GSAP)
       ========================================================================== */
    const releaseData = {
      'places': {
        title: 'Places EP',
        year: '2024',
        producedBy: 'Loumana',
        mixedBy: 'Loumana',
        masteredBy: 'Studio Master',
        collaborators: 'ROCA MORA',
        label: 'Waffle Street',
        dominantColor: '#1c3312',
        spotify: 'https://open.spotify.com/album/7Hp66JUF1jvDwjZKGvsMr9?si=--9KZbzoSY6FEb-pQeKZXA',
        appleMusic: 'https://music.apple.com',
        youtube: 'https://www.youtube.com/watch?v=as5XelcZa38&list=PLZQ7cwTfoiEr68lT5mC2YwnJZ-idZOatA',
        bandcamp: 'https://loumana.bandcamp.com/album/ep-places',
        description: '‘Places’, the second EP by Brussels-based artist Loumana, offers a captivating sonic journey that goes beyond pure musical expression. Through a delicate fusion of electronic and orchestral elements, Loumana explores the theme of self-discovery and the pursuit of a space that is uniquely one’s own. The EP unfolds as a poetic exploration of the desire to be somewhere else, a personal sanctuary.'
      },
      'geometrie': {
        title: 'Géométrie EP',
        year: '2019',
        producedBy: 'Loumana',
        mixedBy: 'Loumana',
        masteredBy: 'Dr Blaster',
        collaborators: 'Roxy Rose',
        label: 'Cosmic Pop Records',
        dominantColor: '#381347',
        spotify: 'https://open.spotify.com/album/6oFQCKzK0Lhwi1tA7wtncX',
        appleMusic: 'https://music.apple.com',
        youtube: 'https://www.youtube.com/watch?v=UOQmkozfGkM&list=OLAK5uy_k21zg-b7DPIVqrMS0voKgCWF_qUlrmM9Y',
        bandcamp: 'https://cosmicpoprecords.bandcamp.com/album/cpr020-g-om-trie',
        description: '« Est-ce qu\'il y a des migrants dans l\'espace ? On les appelle extra-terrestres, les migrants de l\'espace ! » Entre paroles sensées et gros beat, Loumana nous invite directement et intimement dans sa bulle dès le premier track, Ligne. Un univers riche mêlant future beat, hip-hop atmosphérique et synthèses cosmiques.'
      },
      'nethaan': {
        title: 'Nethaan (feat. Anthena)',
        year: '2018',
        producedBy: 'Loumana',
        mixedBy: 'PHASM',
        masteredBy: 'Peter DeWachter',
        collaborators: 'ANTHENA (Rap Vocals)',
        label: 'Cosmic Pop Records',
        dominantColor: '#52290e',
        spotify: 'https://open.spotify.com/album/33wW9SW1ABNv51zOcySkk2',
        appleMusic: 'https://music.apple.com',
        youtube: 'https://www.youtube.com',
        bandcamp: 'https://x-pert.bandcamp.com/album/nethaan',
        description: 'Loumana et Anthéna unissent leurs forces pour créer "Nethaan", un EP qui fusionne musique électronique et rap. À travers des récits inspirés de leurs expériences personnelles d\'Anthéna et d\'histoires fictives, ce projet aborde des sujets tels que la quête de soi, l\'amour, et la sobriété dans le milieu du clubbing.'
      },
      'six-secondes': {
        title: '6 Secondes (feat. Mahungu)',
        year: '2021',
        producedBy: 'Loumana',
        mixedBy: 'KK',
        masteredBy: 'Peter DeWachter',
        collaborators: 'MAHUNGU (Rap Vocals)',
        label: 'Cosmic Pop Records',
        dominantColor: '#6e360f',
        spotify: 'https://open.spotify.com',
        appleMusic: 'https://music.apple.com',
        youtube: 'https://www.youtube.com',
        bandcamp: 'https://wafflestreetrecords.bandcamp.com/album/6-secondes',
        description: 'Cet EP est le résultat d\'un travail collaboratif entre un Beatmaker et un Rappeur. Partageant une vision artistique commune, Loumana et Mahungu abordent le temps qui s\'écoule, la dualité Afrique-Europe, les questionnements sur la colonisation et les ruptures amoureuses sur des productions percutantes.'
      }
    };

    const modal = document.getElementById('release-modal');
    const modalBody = document.getElementById('modal-body');
    const modalContentBox = document.getElementById('modal-content-box');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');

    function openReleaseModal(releaseKey) {
      const data = releaseData[releaseKey];
      if (!data || !modal || !modalBody) return;

      if (modalContentBox) {
        modalContentBox.style.backgroundColor = data.dominantColor;
      }

      let html = `<h2 id="modal-title">${data.title}</h2>`;

      html += `<div class="release-modal-info-grid">`;
      html += `<div class="release-modal-info-item"><span class="release-modal-info-label">Year</span><span class="release-modal-info-value">${data.year}</span></div>`;
      html += `<div class="release-modal-info-item"><span class="release-modal-info-label">Produced By</span><span class="release-modal-info-value">${data.producedBy}</span></div>`;
      if (data.mixedBy) html += `<div class="release-modal-info-item"><span class="release-modal-info-label">Mixed By</span><span class="release-modal-info-value">${data.mixedBy}</span></div>`;
      if (data.masteredBy) html += `<div class="release-modal-info-item"><span class="release-modal-info-label">Mastered By</span><span class="release-modal-info-value">${data.masteredBy}</span></div>`;
      if (data.collaborators) html += `<div class="release-modal-info-item"><span class="release-modal-info-label">Collaborators</span><span class="release-modal-info-value">${data.collaborators}</span></div>`;
      if (data.label) html += `<div class="release-modal-info-item"><span class="release-modal-info-label">Label</span><span class="release-modal-info-value">${data.label}</span></div>`;
      html += `</div>`;

      html += `<div class="release-modal-links">`;
      if (data.spotify) {
        html += `<a href="${data.spotify}" target="_blank" rel="noopener noreferrer" class="release-modal-link spotify">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg> Spotify
        </a>`;
      }
      if (data.appleMusic) {
        html += `<a href="${data.appleMusic}" target="_blank" rel="noopener noreferrer" class="release-modal-link apple-music">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> Apple Music
        </a>`;
      }
      if (data.youtube) {
        html += `<a href="${data.youtube}" target="_blank" rel="noopener noreferrer" class="release-modal-link youtube">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> YouTube
        </a>`;
      }
      if (data.bandcamp) {
        html += `<a href="${data.bandcamp}" target="_blank" rel="noopener noreferrer" class="release-modal-link bandcamp">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M0 18.75l7.437-13.5h16.563l-7.438 13.5z"/></svg> Bandcamp
        </a>`;
      }
      html += `</div>`;

      if (data.description) {
        html += `<div class="release-modal-description">`;
        html += `<h3>About the Release</h3>`;
        html += `<p>${data.description}</p>`;
        html += `</div>`;
      }

      html += `<div class="release-modal-cta-wrapper">`;
      html += `<a href="#contact" class="release-modal-cta" onclick="closeReleaseModal()">Inquire Beat / Collab</a>`;
      html += `</div>`;

      modalBody.innerHTML = html;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeReleaseModal() {
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    // Attach click events to all cards
    document.querySelectorAll('.release-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-release');
        if (key) openReleaseModal(key);
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeReleaseModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeReleaseModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeReleaseModal();
      }
    });


    // Interactive Releases Section Logic without GSAP
    (function initInteractiveReleases() {
      const albumData = {
        'places': {
          title: 'Places EP',
          year: '2024',
          desc: 'An exploration of self-discovery through cinematic electronics and deep grooves. A sonic journey connecting the mind and body.',
          credits: [
            { role: 'Artists', name: 'Loumana' },
            { role: 'Mix Engineer', name: 'TBD' },
            { role: 'Master Engineer', name: 'TBD' }
          ],
          cover: '../../../resources/Producer and music making info/EP_COVER_PLACES_stickers.png',
          links: [
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>', url: 'https://open.spotify.com/album/7Hp66JUF1jvDwjZKGvsMr9' },
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>', url: 'https://music.apple.com' },
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>', url: 'https://www.youtube.com/watch?v=as5XelcZa38' }
          ]
        },
        'geometrie': {
          title: 'Géométrie EP',
          year: '2019',
          desc: 'A fusion of sharp rhythmic structures and melodic soundscapes, setting the foundation for future sonic explorations.',
          credits: [
            { role: 'Artists', name: 'Loumana' },
            { role: 'Mix Engineer', name: 'TBD' },
            { role: 'Master Engineer', name: 'TBD' }
          ],
          cover: '../../../resources/Producer and music making info/Loumana_Geometrie_FINAL-2.jpg',
          links: [
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>', url: 'https://open.spotify.com/album/6oFQCKzK0Lhwi1tA7wtncX' },
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>', url: 'https://music.apple.com' },
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>', url: 'https://www.youtube.com/watch?v=UOQmkozfGkM' }
          ]
        },
        'nethaan': {
          title: 'Nethaan (ft. Anthena)',
          year: '2018',
          desc: 'A collaborative project showcasing soulful vocals floating over intricately produced modern beats.',
          credits: [
            { role: 'Artists', name: 'Loumana, Anthena' },
            { role: 'Mix Engineer', name: 'TBD' },
            { role: 'Master Engineer', name: 'TBD' }
          ],
          cover: '../../../resources/Producer and music making info/http___gather.fandalism.com_2420727--6E9DBFAA-967C-43BD-B9893354019117FA--0--12767813--NETHAANFINALCORR2.jpg',
          links: [
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>', url: 'https://open.spotify.com/album/33wW9SW1ABNv51zOcySkk2' },
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>', url: 'https://music.apple.com' },
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M0 18.75l7.437-13.5h16.563l-7.438 13.5z"/></svg>', url: 'https://x-pert.bandcamp.com/album/nethaan' }
          ]
        },
        'six-secondes': {
          title: '6 Secondes (ft. Mahungu)',
          year: '2021',
          desc: 'A punchy and precise release reflecting the rapid pace of inspiration, featuring sharp verses by Mahungu.',
          credits: [
            { role: 'Artists', name: 'Loumana, Mahungu' },
            { role: 'Mix Engineer', name: 'TBD' },
            { role: 'Master Engineer', name: 'TBD' }
          ],
          cover: '../../../resources/Producer and music making info/Cover 6 secondes EP mahugu-loumana.jpg',
          links: [
            { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M0 18.75l7.437-13.5h16.563l-7.438 13.5z"/></svg>', url: 'https://wafflestreetrecords.bandcamp.com/album/6-secondes' }
          ]
        }
      };

      const selectors = document.querySelectorAll('.selector-item');
      const cover = document.getElementById('main-release-cover');
      const infoPanel = document.getElementById('release-info-panel');
      const title = document.getElementById('release-title');
      const year = document.getElementById('release-year');
      const desc = document.getElementById('release-desc');
      const creditsContainer = document.getElementById('release-credits');
      const linksContainer = document.getElementById('release-links');

      if (!selectors.length || !cover || !infoPanel) return;

      // Initialize credits on first load
      const initialId = document.querySelector('.selector-item.active')?.dataset.id || 'places';
      if(albumData[initialId] && creditsContainer) {
        creditsContainer.innerHTML = '';
        albumData[initialId].credits.forEach(credit => {
          const div = document.createElement('div');
          div.className = 'credit-item';
          div.innerHTML = `<span>${credit.role}:</span> ${credit.name}`;
          creditsContainer.appendChild(div);
        });
      }

      selectors.forEach(selector => {
        selector.addEventListener('click', () => {
          const id = selector.dataset.id;
          if (selector.classList.contains('active')) return;
          
          selectors.forEach(s => s.classList.remove('active'));
          selector.classList.add('active');

          infoPanel.classList.add('fading');
          cover.style.opacity = '0';
          
          setTimeout(() => {
            const data = albumData[id];
            if(data) {
              cover.src = data.cover;
              
              title.textContent = data.title;
              year.textContent = data.year;
              desc.textContent = data.desc;

              if(creditsContainer) {
                creditsContainer.innerHTML = '';
                data.credits.forEach(credit => {
                  const div = document.createElement('div');
                  div.className = 'credit-item';
                  div.innerHTML = `<span>${credit.role}:</span> ${credit.name}`;
                  creditsContainer.appendChild(div);
                });
              }

              linksContainer.innerHTML = '';
              data.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'release-link-btn';
                a.innerHTML = link.icon;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                linksContainer.appendChild(a);
              });
            }
            
            infoPanel.classList.remove('fading');
            cover.style.opacity = '1';
          }, 400); 
        });
      });
    })();


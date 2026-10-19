/* ============================================
   REACTION TIME TEST - JAVASCRIPT
   ============================================ */

// State
let times = [];
let startTime = null;
let waitingTimeout = null;
let state = 'idle'; // idle, waiting, ready, go

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const clickZone = document.getElementById('click-zone');
const message = document.getElementById('message');
const currentTimeEl = document.getElementById('current-time');
const bestTimeEl = document.getElementById('best-time');
const avgTimeEl = document.getElementById('avg-time');
const attemptsEl = document.getElementById('attempts');

// Buttons
document.getElementById('start-btn').addEventListener('click', startTest);
document.getElementById('back-btn').addEventListener('click', backToMenu);

// Click Zone Handler
clickZone.addEventListener('click', handleClick);

function startTest() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    resetToWaiting();
}

function backToMenu() {
    gameScreen.classList.remove('active');
    startScreen.classList.add('active');
    times = [];
    updateStats();
    resetToWaiting();
}

function resetToWaiting() {
    state = 'waiting';
    clickZone.className = 'click-zone waiting';
    clickZone.style.borderColor = ''; // Clear inline styles
    message.textContent = 'Click to Begin';
    if (waitingTimeout) clearTimeout(waitingTimeout);
}

function handleClick() {
    if (state === 'waiting') {
        // Start the waiting phase
        startWaitingPhase();
    } else if (state === 'ready') {
        // Too early!
        tooEarly();
    } else if (state === 'go') {
        // Measure reaction time!
        measureReaction();
    } else if (state === 'too-early') {
        // Reset after too early
        resetToWaiting();
    } else if (state === 'result') {
        // Show next attempt
        resetToWaiting();
    }
}

function startWaitingPhase() {
    state = 'ready';
    clickZone.className = 'click-zone ready';
    message.textContent = 'Wait for Green...';

    // Random delay between 2-5 seconds
    const delay = Math.random() * 3000 + 2000;

    waitingTimeout = setTimeout(() => {
        goGreen();
    }, delay);
}

function goGreen() {
    state = 'go';
    clickZone.className = 'click-zone go';
    message.textContent = 'CLICK NOW!';
    startTime = performance.now();
}

function tooEarly() {
    state = 'too-early';
    clickZone.className = 'click-zone too-early';
    message.textContent = 'Too Early! Click to Retry';
    if (waitingTimeout) clearTimeout(waitingTimeout);
}

function measureReaction() {
    if (!startTime) return;

    const endTime = performance.now();
    const reactionTime = Math.round(endTime - startTime);

    // Save time
    times.push(reactionTime);

    // Update display
    state = 'result';
    currentTimeEl.textContent = reactionTime;
    message.textContent = `${reactionTime}ms - Click to Continue`;

    // Update stats
    updateStats();

    // Add visual feedback based on speed
    if (reactionTime < 200) {
        clickZone.style.borderColor = '#00ff00';
        message.textContent = `${reactionTime}ms - AMAZING! 🔥`;
    } else if (reactionTime < 300) {
        clickZone.style.borderColor = '#A6D1C9';
        message.textContent = `${reactionTime}ms - Great! 👍`;
    } else {
        clickZone.style.borderColor = '#ffaa00';
        message.textContent = `${reactionTime}ms - Good! 👌`;
    }
}

function updateStats() {
    // Current attempt
    if (times.length > 0) {
        currentTimeEl.textContent = times[times.length - 1];
    } else {
        currentTimeEl.textContent = '---';
    }

    // Best time
    if (times.length > 0) {
        const best = Math.min(...times);
        bestTimeEl.textContent = best;
    } else {
        bestTimeEl.textContent = '---';
    }

    // Average time
    if (times.length > 0) {
        const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
        avgTimeEl.textContent = avg;
    } else {
        avgTimeEl.textContent = '---';
    }

    // Attempts
    attemptsEl.textContent = times.length;
}

// Prevent accidental exits
window.addEventListener('beforeunload', (e) => {
    if (times.length > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

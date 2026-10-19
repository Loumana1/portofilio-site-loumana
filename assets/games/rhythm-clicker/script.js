/* ============================================
   GOT RHYTHM? - MEMORY EDITION
   ============================================ */

// Configuration
const RECREATION_TIME_MS = 3000; // 3 seconds to recreate
const RHYTHMS = [
    { name: "Standard 4/4", pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0] },
    { name: "Son Clave (3-2)", pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0] },
    { name: "Tresillo", pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "Rock Beat", pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0] },
    { name: "Shiko", pattern: [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0] },
    { name: "Kpanlogo", pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0] },
    { name: "Soukous", pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0] },
    { name: "Afrobeat", pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0] },
    { name: "Bossa Nova", pattern: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0] },
    { name: "Funk", pattern: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0] }
];

const DIFFICULTY_SETTINGS = {
    easy: {
        window: 150, // +/- ms tolerance
        speeds: [70, 90]
    },
    normal: {
        window: 100,
        speeds: [90, 120]
    },
    hard: {
        window: 60,
        speeds: [120, 160]
    }
};

// Audio Context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// State
let gameQueue = [];
let currentRoundIndex = 0; // 0 or 1
let currentDifficulty = 'normal';
let bpm = 90;
let gamePhase = 'idle'; // 'idle', 'countdown', 'listening', 'recreating', 'results'

// Timing State
let originalBeatTimes = []; // Relative times of beats in ms
let userClickTimes = []; // Relative times of user clicks in ms
let recreationStartTime = 0;
let recreationTimerInterval = null;
let listenInterval = null;

// Stats
let sessionStats = {
    accuracySum: 0,
    roundsPlayed: 0
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const countdownOverlay = document.getElementById('countdown-overlay');
const countdownText = document.getElementById('countdown-text');
const beatCircle = document.getElementById('beat-circle');
const clickZone = document.getElementById('click-zone');
const currentRhythmNameEl = document.getElementById('current-rhythm-name');
const roundDisplayEl = document.getElementById('round-display');
const difficultySelect = document.getElementById('difficulty-select');
const phaseMessageEl = document.getElementById('phase-message');
const recreationTimerEl = document.getElementById('recreation-timer');
const accuracyEl = document.getElementById('accuracy');
const finalRankEl = document.getElementById('final-rank');
const rhythmReportEl = document.getElementById('rhythm-report');

// Event Listeners
document.getElementById('start-btn').addEventListener('click', initGame);
document.getElementById('back-btn').addEventListener('click', backToMenu);
document.getElementById('restart-btn').addEventListener('click', initGame);
clickZone.addEventListener('click', handleClick);
difficultySelect.addEventListener('change', (e) => currentDifficulty = e.target.value);

function initGame() {
    // Pick 1 Random Rhythm
    const randomIndex = Math.floor(Math.random() * RHYTHMS.length);
    gameQueue = [RHYTHMS[randomIndex]];

    // Reset State
    currentRoundIndex = 0;
    sessionStats = { accuracySum: 0, roundsPlayed: 0 };

    // UI Reset
    accuracyEl.textContent = "0%";
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    gameScreen.classList.add('active');

    if (audioCtx.state === 'suspended') audioCtx.resume();
    startCountdown();
}

function startCountdown() {
    gamePhase = 'countdown';
    countdownOverlay.classList.add('active');
    let count = 3;
    countdownText.textContent = "READY";

    const countInterval = setInterval(() => {
        if (count > 0) {
            countdownText.textContent = count;
            countdownText.style.animation = 'none';
            void countdownText.offsetWidth;
            countdownText.style.animation = 'countdownPop 0.8s ease-out';
            playTone(800, 'sine', 0.1);
            count--;
        } else {
            clearInterval(countInterval);
            countdownText.textContent = "GO!";
            // Lower pitch for GO sound
            playTone(600, 'sine', 0.3);
            setTimeout(() => {
                countdownOverlay.classList.remove('active');
                startListenPhase();
            }, 800);
        }
    }, 1000);
}

function startListenPhase() {
    gamePhase = 'listening';

    // Immersive Mode UI
    document.querySelector('.game-container').classList.add('listening-mode');
    phaseMessageEl.textContent = "LISTEN";
    phaseMessageEl.style.color = "var(--color-white)"; // White text on orange bg
    recreationTimerEl.classList.add('hidden');

    const rhythm = gameQueue[0];
    const diffSettings = DIFFICULTY_SETTINGS[currentDifficulty];
    bpm = diffSettings.speeds[currentRoundIndex];

    currentRhythmNameEl.textContent = rhythm.name;
    roundDisplayEl.textContent = `ROUND ${currentRoundIndex + 1} (${bpm} BPM)`;

    // Calculate beat timings
    originalBeatTimes = [];
    const stepDuration = (60 / bpm) / 4 * 1000;

    // DELAY START OF RHYTHM BY 1 SECOND
    setTimeout(() => {
        // Play the pattern ONCE
        let stepIndex = 0;
        const totalSteps = 16; // 1 bar
        const startTime = performance.now();

        // Play first beat immediately
        playListenStep(stepIndex, startTime, stepDuration);

        listenInterval = setInterval(() => {
            stepIndex++;
            if (stepIndex >= totalSteps) {
                clearInterval(listenInterval);
                setTimeout(startRecreationPhase, stepDuration); // Wait one beat before switching
            } else {
                playListenStep(stepIndex, startTime, stepDuration);
            }
        }, stepDuration);
    }, 1000);
}

function playListenStep(index, startTime, stepDuration) {
    const rhythm = gameQueue[0].pattern;
    if (rhythm[index] === 1) {
        // Record expected time relative to start
        originalBeatTimes.push(index * stepDuration);

        // Visual & Audio
        beatCircle.classList.remove('pulse');
        void beatCircle.offsetWidth;
        beatCircle.classList.add('pulse');
        playTone(1000, 'sine', 0.05);
    }
}

function startRecreationPhase() {
    // Show "YOUR TURN" Overlay
    countdownText.textContent = "YOUR TURN";
    countdownOverlay.classList.add('active');

    // Exit Immersive Mode (behind overlay)
    document.querySelector('.game-container').classList.remove('listening-mode');

    // Wait 1.5s then start game
    setTimeout(() => {
        countdownOverlay.classList.remove('active');

        gamePhase = 'recreating';
        phaseMessageEl.textContent = "YOUR TURN";
        phaseMessageEl.style.color = "var(--color-white)";
        recreationTimerEl.classList.remove('hidden');

        userClickTimes = [];
        recreationStartTime = performance.now();

        // Start 3s Timer
        let timeLeft = RECREATION_TIME_MS;
        recreationTimerEl.textContent = (timeLeft / 1000).toFixed(2);

        recreationTimerInterval = setInterval(() => {
            timeLeft -= 10;
            if (timeLeft <= 0) {
                timeLeft = 0;
                clearInterval(recreationTimerInterval);
                endRecreationPhase();
            }
            recreationTimerEl.textContent = (timeLeft / 1000).toFixed(2);
        }, 10);
    }, 1500);
}

function handleClick(e) {
    if (gamePhase !== 'recreating') return;

    // Visual Feedback
    const circle = document.createElement('div');
    circle.className = 'click-indicator';
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
    circle.style.background = 'radial-gradient(circle, var(--color-white), transparent)';
    circle.style.boxShadow = '0 0 20px var(--color-white)';
    document.body.appendChild(circle);
    setTimeout(() => circle.remove(), 600);

    // Audio Feedback (Re-enabled)
    playTone(1000, 'sine', 0.05);

    // Record Time (if timer has started)
    if (recreationTimerInterval) {
        const clickTime = performance.now() - recreationStartTime;
        userClickTimes.push(clickTime);
    }
}

function endRecreationPhase() {
    gamePhase = 'results';
    analyzeAccuracy();
}

function analyzeAccuracy() {
    const originalCount = originalBeatTimes.length;
    const userCount = userClickTimes.length;

    // 1. Count Check (Critical)
    if (userCount === 0) {
        finishRound(0);
        return;
    }

    // 2. Normalize Patterns (0.0 to 1.0)
    // We normalize based on the total duration of the pattern
    const originalDuration = originalBeatTimes[originalCount - 1];
    const userDuration = userClickTimes[userCount - 1];

    const normalizedOriginal = originalBeatTimes.map(t => t / originalDuration);
    const normalizedUser = userClickTimes.map(t => t / userDuration);

    // 3. Calculate Rhythm Match (Relative Spacing)
    // Compare each beat's relative position
    let totalError = 0;
    let comparisons = 0;

    // Compare up to the smaller number of beats
    const countToCompare = Math.min(originalCount, userCount);

    for (let i = 0; i < countToCompare; i++) {
        // Skip first beat (always 0.0)
        if (i === 0) continue;

        const diff = Math.abs(normalizedOriginal[i] - normalizedUser[i]);
        totalError += diff;
        comparisons++;
    }

    // 4. Calculate Score
    // Average error per beat
    const avgError = comparisons > 0 ? totalError / comparisons : 0;

    // Scale: 0.0 error = 100%, 0.1 error (10% off) = 90%
    // We want to be lenient. Let's say < 0.05 error is perfect.
    // And error > 0.2 is bad.

    let rhythmScore = 0;
    if (avgError <= 0.05) rhythmScore = 100;
    else if (avgError >= 0.25) rhythmScore = 0;
    else {
        // Linear scale between 0.05 (100) and 0.25 (0)
        rhythmScore = 100 - ((avgError - 0.05) / 0.20 * 100);
    }

    // 5. Penalties
    // Count Mismatch Penalty
    const countDiff = Math.abs(originalCount - userCount);
    if (countDiff > 0) {
        rhythmScore -= (countDiff * 15); // -15% per wrong beat count
    }

    // Tempo Penalty (if user played way too fast/slow)
    // Allow +/- 20% tempo difference without penalty
    const tempoRatio = userDuration / originalDuration;
    if (tempoRatio < 0.8 || tempoRatio > 1.2) {
        rhythmScore -= 10;
    }

    // Clamp Score
    const finalScore = Math.max(0, Math.round(rhythmScore));

    finishRound(finalScore);
}

function finishRound(score) {
    sessionStats.accuracySum += score;
    sessionStats.roundsPlayed++;

    // Show Round Result
    phaseMessageEl.textContent = `${score}%`;
    accuracyEl.textContent = `${Math.round(sessionStats.accuracySum / sessionStats.roundsPlayed)}%`;

    setTimeout(() => {
        nextRound();
    }, 2000);
}

function nextRound() {
    currentRoundIndex++;
    if (currentRoundIndex >= 2) {
        endGame();
    } else {
        startCountdown();
    }
}

function endGame() {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');

    const finalAvg = Math.round(sessionStats.accuracySum / sessionStats.roundsPlayed);
    const rhythm = gameQueue[0];

    rhythmReportEl.innerHTML = `
        <div class="report-item">
            <div>
                <h3>${rhythm.name}</h3>
                <p>2 Rounds Completed</p>
            </div>
            <div class="report-grade">${finalAvg}%</div>
        </div>
    `;

    let commentary = "";
    if (finalAvg >= 95) commentary = "🔥 Unbelievable! You've got rhythm in your DNA!";
    else if (finalAvg >= 80) commentary = "🎵 Great job! You do have rhythm!";
    else if (finalAvg >= 60) commentary = "👍 Not bad! Practice makes perfect.";
    else if (finalAvg >= 40) commentary = "😅 Completely off-beat! Maybe try Easy mode?";
    else commentary = "🤔 Hmm... rhythm might not be your thing.";

    finalRankEl.textContent = commentary;
}

function backToMenu() {
    clearInterval(listenInterval);
    clearInterval(recreationTimerInterval);
    gamePhase = 'idle';
    gameScreen.classList.remove('active');
    startScreen.classList.add('active');
}

function playTone(freq, type, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
}

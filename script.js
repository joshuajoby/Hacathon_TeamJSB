// ========================================
// UPSIDE DOWN COMMUNICATOR :: 1983
// Inter-Dimensional Communication System
// ========================================

// Morse Code Dictionary
const MORSE_CODE = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',
    'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
    'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
    'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
    'Z': '--..',  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', ' ': '/'
};

// System State
const state = {
    sanity: 100,
    isPossessed: false,
    isTransmitting: false,
    possessionTimer: null,
    sanityTimer: null,
    recoverySequence: [],
    currentTransmission: null
};

// Konami Code for Recovery
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
let konamiProgress = [];

// Audio Context for generating beeps
let audioContext;
let isAudioInitialized = false;

// DOM Elements
const elements = {
    input: document.getElementById('message-input'),
    transmitBtn: document.getElementById('transmit-btn'),
    sanityBar: document.getElementById('sanity-bar'),
    sanityPercent: document.getElementById('sanity-percentage'),
    systemStatus: document.getElementById('system-status'),
    interferenceLevel: document.getElementById('interference-level'),
    dimension: document.getElementById('dimension'),
    warningZone: document.getElementById('warning-zone'),
    signalStatus: document.getElementById('signal-status'),
    recoveryPanel: document.getElementById('recovery-panel'),
    recoverySequence: document.getElementById('recovery-sequence'),
    toggleDecoder: document.getElementById('toggle-decoder'),
    decoderPanel: document.getElementById('decoder-panel'),
    morseLights: document.querySelectorAll('.morse-light')
};

// ========================================
// INITIALIZATION
// ========================================

function init() {
    console.log('INITIALIZING UPSIDE DOWN COMMUNICATOR...');
    
    // Event Listeners
    elements.transmitBtn.addEventListener('click', handleTransmit);
    elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleTransmit();
    });
    elements.toggleDecoder.addEventListener('click', toggleDecoder);
    
    // Keyboard listener for recovery sequence
    document.addEventListener('keydown', handleKeyPress);
    
    // Initialize audio on first user interaction
    const initAudioOnInteraction = () => {
        initAudio();
        document.removeEventListener('click', initAudioOnInteraction);
        document.removeEventListener('keydown', initAudioOnInteraction);
    };
    
    document.addEventListener('click', initAudioOnInteraction);
    document.addEventListener('keydown', initAudioOnInteraction);
    
    // Start sanity degradation
    startSanityTimer();
    
    console.log('SYSTEM OPERATIONAL');
}

function initAudio() {
    if (!isAudioInitialized) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isAudioInitialized = true;
        console.log('AUDIO SYSTEM INITIALIZED');
        
        // Visual confirmation with beep
        playBeep(150, 800);
        setTimeout(() => playBeep(150, 1000), 200);
        
        // Clear any audio warnings
        const audioWarning = document.getElementById('audio-warning');
        if (audioWarning) {
            audioWarning.style.display = 'none';
        }
    }
}

// ========================================
// MORSE CODE TRANSMISSION
// ========================================

function textToMorse(text) {
    text = text.toUpperCase();
    let morse = '';
    
    for (let char of text) {
        if (MORSE_CODE[char]) {
            morse += MORSE_CODE[char] + ' ';
        }
    }
    
    return morse.trim();
}

async function handleTransmit() {
    if (state.isTransmitting) return;
    
    const message = elements.input.value.trim();
    if (!message) {
        showWarning('NO MESSAGE TO TRANSMIT');
        return;
    }
    
    initAudio(); // Ensure audio is initialized
    
    state.isTransmitting = true;
    elements.transmitBtn.disabled = true;
    elements.input.disabled = true;
    
    elements.signalStatus.textContent = 'TRANSMITTING...';
    
    const morse = textToMorse(message);
    console.log(`TRANSMITTING: ${message}`);
    console.log(`MORSE CODE: ${morse}`);
    
    await transmitMorse(morse);
    
    elements.signalStatus.textContent = 'TRANSMISSION COMPLETE';
    setTimeout(() => {
        elements.signalStatus.textContent = 'READY';
        elements.transmitBtn.disabled = false;
        elements.input.disabled = false;
        elements.input.value = '';
        elements.input.focus();
    }, 1000);
    
    state.isTransmitting = false;
}

async function transmitMorse(morse) {
    const signals = morse.split('');
    
    for (let signal of signals) {
        if (state.isPossessed) {
            // Corrupted transmission in possessed mode
            await corruptedSignal();
        } else {
            if (signal === '.') {
                await lightSignal(200); // Dot = 200ms
                playBeep(200, 800); // Higher pitch for dots
            } else if (signal === '-') {
                await lightSignal(600); // Dash = 600ms
                playBeep(600, 600); // Lower pitch for dashes
            } else if (signal === ' ') {
                await delay(400); // Space between letters
            } else if (signal === '/') {
                await delay(800); // Space between words
            }
        }
        
        await delay(200); // Space between signals
    }
}

async function lightSignal(duration) {
    // Light up specific pattern based on dot vs dash
    const isDot = duration === 200;
    const selectedLights = [];
    
    if (isDot) {
        // DOT: Light up center light only
        selectedLights.push(elements.morseLights[7]); // Center light
    } else {
        // DASH: Light up horizontal row (5 lights)
        selectedLights.push(elements.morseLights[5]);
        selectedLights.push(elements.morseLights[6]);
        selectedLights.push(elements.morseLights[7]);
        selectedLights.push(elements.morseLights[8]);
        selectedLights.push(elements.morseLights[9]);
    }
    
    // Turn on lights
    selectedLights.forEach(light => light.classList.add('active'));
    
    // Wait for duration
    await delay(duration);
    
    // Turn off lights
    selectedLights.forEach(light => light.classList.remove('active'));
}

async function corruptedSignal() {
    // Random, chaotic light patterns during possession
    const numFlashes = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < numFlashes; i++) {
        const randomLight = elements.morseLights[Math.floor(Math.random() * elements.morseLights.length)];
        randomLight.classList.add('active');
        
        playBeep(50, 200 + Math.random() * 800);
        
        await delay(50);
        randomLight.classList.remove('active');
        await delay(50);
    }
}

// ========================================
// AUDIO GENERATION
// ========================================

function playBeep(duration, frequency) {
    if (!isAudioInitialized || !audioContext) {
        console.warn('Audio not initialized. Click page to enable audio.');
        return;
    }
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'square'; // Harsh, retro sound
        
        // More audible volume with sharp attack and decay
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
        console.error('Audio error:', error);
    }
}

function playSiren() {
    if (!isAudioInitialized || !audioContext) {
        console.warn('Audio not initialized for siren');
        return;
    }
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.error('Siren audio error:', error);
    }
}

// ========================================
// SANITY METER SYSTEM
// ========================================

state.sanityTimer = setInterval(() => {
    if (state.isPossessed) return;

    state.sanity = Math.max(0, state.sanity - 7);
    updateSanityDisplay();

    if (state.sanity === 0) {
        triggerPossession();
    } else if (state.sanity <= 20) {
        elements.interferenceLevel.textContent = 'CRITICAL';
        elements.interferenceLevel.className = 'value status-danger';
    } else if (state.sanity <= 50) {
        elements.interferenceLevel.textContent = 'HIGH';
        elements.interferenceLevel.className = 'value status-warning';
    }
}, 50000);

function updateSanityDisplay() {
    elements.sanityBar.style.width = state.sanity + '%';
    elements.sanityPercent.textContent = state.sanity;
    
    // Update meter color based on sanity level
    elements.sanityBar.classList.remove('warning', 'danger');
    if (state.sanity <= 20) {
        elements.sanityBar.classList.add('danger');
    } else if (state.sanity <= 50) {
        elements.sanityBar.classList.add('warning');
    }
    
    // Update warnings
    if (state.sanity <= 30 && state.sanity > 0 && !state.isPossessed) {
        showWarning('!!! WARNING: NEURAL STABILITY CRITICAL !!!');
    } else if (state.sanity > 30) {
        clearWarning();
    }
}

// ========================================
// POSSESSION MODE
// ========================================

function triggerPossession() {
    if (state.isPossessed) return;
    
    console.log('POSSESSION TRIGGERED');
    state.isPossessed = true;
    
    // Update UI
    document.body.classList.add('possessed');
    elements.systemStatus.textContent = 'COMPROMISED';
    elements.systemStatus.className = 'value status-danger';
    elements.dimension.textContent = 'UPSIDE DOWN';
    elements.dimension.className = 'value status-danger';
    elements.interferenceLevel.textContent = 'MAXIMUM';
    
    // Show recovery panel
    elements.recoveryPanel.style.display = 'block';
    
    // Play siren sound
    playSiren();
    
    // Invert controls
    invertControls();
    
    // Auto-recovery after 30 seconds if not manually recovered
    state.possessionTimer = setTimeout(() => {
        if (state.isPossessed) {
            recoverFromPossession();
            showWarning('AUTO-RECOVERY INITIATED');
        }
    }, 30000);
}

function invertControls() {
    // Make input behave erratically
    const originalInput = elements.input;
    
    originalInput.addEventListener('input', scrambleInput);
}

function scrambleInput(e) {
    if (!state.isPossessed) return;
    
    // Randomly scramble the input text
    if (Math.random() > 0.7) {
        const text = e.target.value;
        const scrambled = text.split('').sort(() => Math.random() - 0.5).join('');
        e.target.value = scrambled;
    }
}

function recoverFromPossession() {
    console.log('RECOVERY SUCCESSFUL');
    state.isPossessed = false;
    konamiProgress = [];
    
    // Clear possession timer
    if (state.possessionTimer) {
        clearTimeout(state.possessionTimer);
        state.possessionTimer = null;
    }
    
    // Restore UI
    document.body.classList.remove('possessed');
    elements.systemStatus.textContent = 'OPERATIONAL';
    elements.systemStatus.className = 'value status-normal';
    elements.dimension.textContent = 'NORMAL';
    elements.dimension.className = 'value';
    elements.interferenceLevel.textContent = 'MINIMAL';
    elements.interferenceLevel.className = 'value';
    
    // Hide recovery panel
    elements.recoveryPanel.style.display = 'none';
    elements.recoverySequence.textContent = '';
    
    // Restore sanity to 100%
    state.sanity = 100;
    updateSanityDisplay();
    clearWarning();
    
    // Play success sound
    playBeep(100, 800);
    setTimeout(() => playBeep(100, 1000), 150);
    setTimeout(() => playBeep(100, 1200), 300);
}

// ========================================
// RECOVERY MECHANISM (KONAMI CODE)
// ========================================

function handleKeyPress(e) {
    if (!state.isPossessed) return;
    
    const key = e.key;
    
    // Check if key matches next in sequence
    if (key === KONAMI_CODE[konamiProgress.length]) {
        konamiProgress.push(key);
        updateRecoveryProgress();
        playBeep(50, 400 + (konamiProgress.length * 50));
        
        // Check if sequence is complete
        if (konamiProgress.length === KONAMI_CODE.length) {
            recoverFromPossession();
        }
    } else {
        // Wrong key - reset sequence
        if (konamiProgress.length > 0) {
            playSiren();
        }
        konamiProgress = [];
        updateRecoveryProgress();
    }
}

function updateRecoveryProgress() {
    const progress = konamiProgress.map(key => {
        if (key.startsWith('Arrow')) {
            return key.replace('Arrow', '').toUpperCase();
        }
        return key.toUpperCase();
    }).join(' ');
    
    elements.recoverySequence.textContent = progress || 'WAITING FOR INPUT...';
}

// ========================================
// UI UTILITIES
// ========================================

function showWarning(message) {
    elements.warningZone.innerHTML = `<div class="warning-message">${message}</div>`;
}

function clearWarning() {
    elements.warningZone.innerHTML = '';
}

function toggleDecoder() {
    const isHidden = elements.decoderPanel.style.display === 'none';
    elements.decoderPanel.style.display = isHidden ? 'block' : 'none';
    elements.toggleDecoder.textContent = isHidden ? '[HIDE]' : '[SHOW]';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========================================
// EASTER EGGS & ENHANCEMENTS
// ========================================

// Add some random screen flickers
setInterval(() => {
    if (Math.random() > 0.95 && !state.isPossessed) {
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
    }
}, 2000);

// Random interference spikes
setInterval(() => {
    if (Math.random() > 0.9 && !state.isPossessed && state.sanity < 70) {
        const lights = Array.from(elements.morseLights);
        const randomLight = lights[Math.floor(Math.random() * lights.length)];
        randomLight.classList.add('active');
        setTimeout(() => {
            randomLight.classList.remove('active');
        }, 100);
    }
}, 3000);

// Log system messages
console.log('%c HAWKINS NATIONAL LABORATORY ', 'background: #000; color: #33ff33; font-size: 20px; font-family: monospace;');
console.log('%c INTER-DIMENSIONAL COMMUNICATION TERMINAL V1.983 ', 'background: #000; color: #33ff33; font-size: 12px; font-family: monospace;');
console.log('%c AUTHORIZED PERSONNEL ONLY ', 'background: #000; color: #ff3333; font-size: 12px; font-family: monospace;');
console.log('%c ♪ CLICK OR PRESS ANY KEY TO INITIALIZE AUDIO ♪ ', 'background: #000; color: #ffaa00; font-size: 14px; font-family: monospace;');

// ========================================
// START SYSTEM
// ========================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

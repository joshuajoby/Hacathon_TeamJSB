# UPSIDE DOWN COMMUNICATOR :: 1983

**Hawkins National Laboratory - Inter-Dimensional Communication Terminal**

A retro-styled web application that simulates a crisis communication device capable of transmitting messages through electromagnetic interference using Morse code. Built with authentic 1980s terminal aesthetics and featuring dynamic corruption mechanics.

---

## 🎯 Core Features

### 1. **Cryptic Transmission Protocol (Non-Text Communication)**
- **Morse Code Encoding**: Messages are converted to Morse code and transmitted through visual light patterns
- **15 Interactive Lights**: Visual signal matrix displays dots (·) and dashes (−) through illuminated panels
- **Audio Feedback**: Authentic square-wave beeps accompany each signal (dots = 200ms, dashes = 600ms)
- **No Plain Text Display**: Messages cannot be read directly; observers must decode the Morse patterns
- **Built-in Decoder Reference**: Toggle-able Morse code legend for interpretation

### 2. **Mind Flayer Mode (Dynamic Corruption State)**
- **Neural Stability Meter**: Depletes at 1% per second, tracking system integrity
- **Automatic Possession Trigger**: When sanity reaches 0%, system enters "Possessed Mode" for 30 seconds
- **Corruption Effects**:
  - Screen shake and color inversion (purple/magenta color scheme)
  - Scrambled input (text randomly reorders while typing)
  - Chaotic light patterns and distorted audio
  - Interface glitches and inversions
  - Status indicators show "COMPROMISED" and "UPSIDE DOWN"
- **Warning System**: Progressive alerts at 50%, 30%, and critical levels

### 3. **Recovery Mechanism**
- **Konami Code Sequence**: `↑ ↑ ↓ ↓ ← → ← → B A`
- **Visual Progress Tracking**: On-screen display shows entered keys
- **Audio Feedback**: Ascending tones for correct inputs, siren for mistakes
- **Instant Recovery**: Restores sanity to 100% and returns system to normal
- **Auto-Recovery Failsafe**: Automatic restoration after 30 seconds if manual recovery fails

### 4. **1983 Hardware Aesthetic**
- **CRT Screen Effects**:
  - Animated scanlines
  - Radial vignette darkening
  - Screen flicker animation
  - Phosphor green glow
- **Terminal Design**:
  - Monochrome phosphor green (#33ff33) on black background
  - Blocky, pixelated borders (no rounded corners)
  - Terminal/monospace font throughout
  - Chunky buttons with bracket styling `[TRANSMIT]`
- **Retro Color Palette**:
  - Phosphor Green: Primary UI
  - Amber: Warnings
  - Red: Danger/Critical
  - Purple: Possession/Corruption
- **Period-Accurate Elements**:
  - No gradients, shadows only as glows
  - ASCII-style headers and footers
  - Analog-style progress bars
  - Blinking cursor indicators

---

## 🚀 How to Use

### Basic Operation

1. **Open the Application**
   - Open `index.html` in a modern web browser
   - Click anywhere to initialize audio system

2. **Send a Message**
   - Type your message in the input field (e.g., "HELP ME", "DANGER")
   - Click `[TRANSMIT]` or press Enter
   - Watch the light matrix display your message in Morse code
   - Listen to the audio beeps (dots and dashes)

3. **Decode Messages**
   - Click `[SHOW]` on the "MORSE DECODER REFERENCE" section
   - Use the legend to interpret light patterns:
     - **Dot (·)**: Short flash (200ms)
     - **Dash (−)**: Long flash (600ms)
     - **Letter Gap**: 400ms pause
     - **Word Gap**: 800ms pause

### Surviving Possession

1. **Monitor Neural Stability**
   - Watch the sanity meter deplete over time
   - Green = Safe (>50%)
   - Amber = Warning (20-50%)
   - Red = Critical (<20%)

2. **When Possessed**
   - Screen turns purple with violent shaking
   - Recovery panel appears with instructions
   - Enter the Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`
   - Use arrow keys and letter keys (not numpad)
   - Watch your progress on screen
   - Mistakes reset the sequence

3. **Recovery**
   - Successful code entry restores all systems
   - Sanity meter returns to 100%
   - Screen returns to normal green
   - Auto-recovery occurs after 30 seconds if needed

---

## 🎮 Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Advanced animations, grid layouts, custom properties
- **Vanilla JavaScript**: No frameworks or dependencies
- **Web Audio API**: Real-time beep generation

### Key Components

#### Morse Code System
```javascript
// Full alphabet + numbers support
const MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', ...
    '1': '.----', '2': '..---', ...
}
```

#### State Management
```javascript
const state = {
    sanity: 100,           // Current stability level
    isPossessed: false,    // Corruption state
    isTransmitting: false, // Transmission lock
    ...
}
```

#### Audio Generation
- Square wave oscillators for retro beep sounds
- Dynamic frequency modulation for sirens
- Exponential gain ramping for authentic tone decay

### File Structure
```
Hack/
├── index.html      # Main application structure
├── styles.css      # Retro terminal styling + animations
├── script.js       # Core logic and state management
└── README.md       # This file
```

---

## 🎨 Design Philosophy

### Retro Constraints
Following authentic 1980s limitations:
- **No Modern UI Elements**: No glassmorphism, soft shadows, or smooth gradients
- **Limited Color Palette**: Monochrome phosphor with accent colors
- **Chunky Geometry**: Box borders, hard edges, grid layouts
- **Terminal Typography**: Monospace fonts exclusively
- **CRT Simulation**: Scanlines, flicker, phosphor glow

### Thematic Coherence
- **Hawkins Lab Aesthetic**: References to "Stranger Things" universe
- **Cold War Era**: Department of Energy (DOE) clearance warnings
- **Scientific Terminal**: Technical language and status indicators
- **Crisis Scenario**: Warning messages and emergency protocols

---

## 🔊 Audio System

### Sound Effects
1. **Morse Beeps**
   - Dots: 600Hz, 200ms duration
   - Dashes: 600Hz, 600ms duration
   - Square wave for harsh, retro tone

2. **Alerts**
   - Siren: 200Hz→800Hz sweep, 500ms
   - Success: Ascending tone sequence (800Hz→1200Hz)

3. **Implementation**
   - Web Audio API for real-time synthesis
   - No external audio files required
   - Lazy initialization on first user interaction

---

## 📊 System Requirements

### Browser Compatibility
- **Chrome/Edge**: Fully supported
- **Firefox**: Fully supported
- **Safari**: Supported (may require audio initialization)
- **Mobile**: Supported with responsive layout

### Minimum Requirements
- Modern browser with ES6 support
- Web Audio API support
- JavaScript enabled
- Screen resolution: 320px width minimum

---

## 🎯 Challenge Requirements Met

### ✅ Cryptic Transmission Protocol
- ✓ Accepts text input
- ✓ Converts to visual Morse code signals
- ✓ No plain text display of output
- ✓ Interpretable through pattern recognition
- ✓ Audio + visual encoding

### ✅ Mind Flayer Mode
- ✓ Sanity/stability meter implementation
- ✓ Automatic possession trigger at 0%
- ✓ 30-second corruption period
- ✓ Inverted controls and scrambled behavior
- ✓ Visual glitches and color changes
- ✓ Recovery mechanism (Konami Code)
- ✓ Reactive state management

### ✅ 1983 Hardware Limit
- ✓ Authentic CRT aesthetics
- ✓ Monochrome phosphor green palette
- ✓ Scanline overlay
- ✓ Chunky terminal interface
- ✓ No modern UI paradigms
- ✓ Retro typography and spacing
- ✓ Period-appropriate design language

---

## 🎪 Easter Eggs & Special Features

1. **Random Screen Flickers**: Periodic brief opacity drops (5% chance every 2 seconds)
2. **Interference Spikes**: Random light activations when sanity is low
3. **Console Messages**: Retro startup sequences in browser console
4. **Input Scrambling**: Text randomly reorders during possession
5. **Progressive Warnings**: Status messages escalate with sanity loss
6. **Audio Progression**: Recovery sequence plays ascending tones

---

## 🔧 Customization

### Modify Sanity Depletion Rate
```javascript
// In script.js, line ~220
state.sanity = Math.max(0, state.sanity - 1); // Change -1 to adjust
```

### Change Possession Duration
```javascript
// In script.js, line ~270
setTimeout(() => { ... }, 30000); // Change 30000 (30 seconds)
```

### Adjust Color Scheme
```css
/* In styles.css, :root variables */
--phosphor-green: #33ff33;    /* Main color */
--possession-purple: #aa00ff; /* Corruption color */
```

---

## 🐛 Troubleshooting

### No Audio?
- **Click anywhere** on the page first (audio requires user interaction)
- Check browser audio permissions
- Ensure system volume is up

### Lights Not Flashing?
- Check console for JavaScript errors
- Verify browser supports CSS animations
- Refresh the page

### Recovery Code Not Working?
- Use **arrow keys** (not WASD)
- Type lowercase **b** and **a** (not B/A)
- Mistakes reset the sequence - start over
- Not case-sensitive for letters but must be lowercase

---

## 📜 Credits

**Developed for**: Hackathon Challenge - Problem Statement 3  
**Theme**: Upside Down Communicator  
**Inspiration**: Stranger Things, Cold War computing, Morse code telegraphy  
**Technology**: Pure HTML/CSS/JavaScript (no frameworks)  

---

## 📝 License

Educational project for hackathon submission. Free to use and modify.

---

## 🎯 Final Notes

**The gate is open. Traditional communication has failed.**

This decoder is the only link between worlds. It transmits truth through interference, survives corruption, and operates when everything else has collapsed.

**The message must get through.**

```
█ HAWKINS NATIONAL LABORATORY █
INTER-DIMENSIONAL COMMUNICATION TERMINAL :: V1.983
DOE CLEARANCE REQUIRED :: AUTHORIZED PERSONNEL ONLY
⚠ DIMENSIONAL BREACH IN PROGRESS ⚠
```

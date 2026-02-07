```markdown
# DEVELOPER.md — researchthe.net

> A satirical "landing page" that parodies Silicon Valley elitism and "deep tech" aesthetics. The site's core function is to look expensive, sound profound, and do absolutely nothing while keeping the user waiting indefinitely.

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Vibe** | "Silicon Valley Pomp" meets "Digital Latency" |
| **Palette** | Void Black (`#0a0a0a`), Obsidian Gray (`#1a1a1a`), Deep Purple (`#1a0a2e`) |
| **Typography** | Minimal serif (Cormorant Garamond) |
| **Tech Stack** | Vite + TypeScript + CSS (no frameworks) |
| **Behavior** | Infinite loading trap disguised as "optimization" |

---

## File Structure

```
researchthenet/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts              # Entry point, orchestrates all modules
│   ├── styles/
│   │   ├── main.css         # Global styles, variables, typography
│   │   ├── cursor.css       # Custom cursor element styling & animations
│   │   └── cli.css          # CLI corner styling
│   └── scripts/
│       ├── trap.ts          # Enter button logic, state management
│       ├── cursor.ts        # Custom cursor tracking & glitch effects
│       └── cli.ts           # CLI text stream loop
└── public/
    └── (static assets if needed)
```

---

## Phased Implementation

| Phase | Focus | Deliverable | Line Budget |
|-------|-------|-------------|-------------|
| **1** | Scaffold & Static Styling | Visual facade complete, no interactivity | ~250 lines |
| **2** | Enter Trap & DOM Manipulation | Button click triggers state change, legal blurb appears | ~200 lines |
| **3** | Custom Cursor & Glitch Effects | Fake cursor element with stutter/ghost trail, toast | ~250 lines |
| **4** | CLI Corner | Looping pseudo-technical log, speed increase | ~150 lines |

---

## Phase 1: Skeleton & Static Styling

**Goal:** Render the visual facade — dark gradients, typography, headline, sub-headline, and "Enter" button (non-functional).

### Step 1.1: Initialize Project

```bash
npm create vite@latest . -- --template vanilla-ts
npm install
```

### Step 1.2: Create `src/styles/main.css`

Define CSS custom properties and global styles:

```css
/* === CSS Custom Properties === */
:root {
  --void-black: #0a0a0a;
  --obsidian-gray: #1a1a1a;
  --deep-purple: #1a0a2e;
  --accent-purple: #2d1b4e;
  --text-primary: #e8e8e8;
  --text-muted: #6b6b6b;
  --text-legal: #4a4a4a;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}

/* === Reset & Base === */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  overflow: hidden;
}

body {
  font-family: var(--font-serif);
  background: linear-gradient(135deg, var(--deep-purple) 0%, var(--void-black) 50%, var(--obsidian-gray) 100%);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
}

/* === Typography === */
#facade {
    row-gap: 1rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.sub-headline {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  font-style: italic;
  color: var(--text-muted);
  max-width: 600px;
  line-height: 1.8;
  padding: 0 2rem;
}

/* === Enter Button === */
#enter-btn {
  margin-top: 4rem;
  padding: 1rem 4rem;
  font-family: var(--font-serif);
  font-size: 1rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--text-primary);
  background: transparent;
  border: 1px solid var(--text-muted);
  cursor: pointer;
  transition: all 0.4s ease;
}

#enter-btn:hover {
  border-color: var(--text-primary);
  box-shadow: 0 0 30px rgba(45, 27, 78, 0.5);
}

/* === Legal Blurb (Hidden by default) === */
#legal-blurb {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 700px;
  padding: 0 2rem;
  font-size: 8pt;
  color: var(--text-legal);
  line-height: 1.6;
  text-align: justify;
  opacity: 0;
  visibility: hidden;
  transition: opacity 2s ease-in, visibility 2s ease-in;
}

/* === State: Entered === */
body[data-entered] #enter-btn {
  display: none;
}

body[data-entered] #legal-blurb {
  opacity: 1;
  visibility: visible;
}

/* === Toast Notification === */
#toast {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  background: var(--obsidian-gray);
  border: 1px solid var(--accent-purple);
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 1rem 1.5rem;
  max-width: 300px;
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

#toast.visible {
  opacity: 1;
  transform: translateX(0);
}
```

### Step 1.3: Create `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>researchthe.net</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles/main.css">
  <link rel="stylesheet" href="/src/styles/cursor.css">
  <link rel="stylesheet" href="/src/styles/cli.css">
</head>
<body>
  <!-- Custom Cursor Element -->
  <div id="custom-cursor" aria-hidden="true">
    <div class="cursor-dot"></div>
    <div class="cursor-trail"></div>
  </div>

  <!-- Main Facade -->
  <main id="facade" class="facade">
    <h1>Decoding the Non-Trivial.</h1>
    <p class="sub-headline">Solving problems that don't exist yet,</p>
    <p class="sub-headline">using methods we haven't quite justified.</p>
    <p class="sub-headline">We appreciate your patience;</p>
    <p class="sub-headline">our servers are currently debating the ethics of their own existence.</p>
    <button id="enter-btn">Enter</button>
  </main>

  <!-- Legal Blurb -->
  <aside id="legal-blurb">
    <strong>NOTICE OF COGNITIVE RESTRUCTURING:</strong> By engaging with this portal, the user hereby agrees to relinquish all claims to linear logic, Newtonian causality, and the expectation of immediate gratification. Our proprietary delay-protocols are designed to filter for high-bandwidth consciousness. If you perceive a "glitch," please understand it is merely your reality attempting to catch up with our data-stream. This interface operates on a non-Euclidean time-scale; perceived latency is a feature, not a defect. Continued presence constitutes acceptance of temporal ambiguity.
  </aside>

  <!-- Toast Container -->
  <div id="toast" aria-live="polite"></div>

  <!-- CLI Corner -->
  <div id="cli-corner" aria-hidden="true"></div>

  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### Step 1.4: Create Empty Placeholder Files

Create empty files to establish structure:
- `src/styles/cursor.css`
- `src/styles/cli.css`
- `src/scripts/trap.ts`
- `src/scripts/cursor.ts`
- `src/scripts/cli.ts`

Create `src/main.ts` with placeholder:

```typescript
// Main entry point - will wire up modules in subsequent phases
console.log('[researchthe.net] Initializing...');
```

### Verification (Phase 1)

- [ ] `npm run dev` starts the development server
- [ ] Dark gradient background renders correctly
- [ ] Headline "DECODING THE NON-TRIVIAL." is visible and styled
- [ ] Sub-headline text appears in muted italic
- [ ] "Enter" button is centered and has hover effect
- [ ] Legal blurb is hidden (not visible)

---

## Phase 2: The "Enter" Trap & DOM Manipulation

**Goal:** Clicking "Enter" triggers the trap — button vanishes, legal blurb fades in, and the trap state is broadcast.

### Step 2.1: Create `src/scripts/trap.ts`

```typescript
/**
 * trap.ts
 * Manages the "Enter" trap state and DOM transitions.
 */

// Global state object
export const state = {
  entered: false,
  enteredAt: 0,
};

// Custom event for other modules to listen to
export const TRAP_ENTERED_EVENT = 'trap:entered';

/**
 * Initialize the trap mechanism.
 * Attaches click listener to the Enter button.
 */
export function initTrap(): void {
  const enterBtn = document.getElementById('enter-btn');
  
  if (!enterBtn) {
    console.error('[trap] Enter button not found');
    return;
  }

  enterBtn.addEventListener('click', handleEnter);
}

/**
 * Handle the Enter button click.
 * Triggers the trap state transition.
 */
function handleEnter(): void {
  if (state.entered) return; // Prevent double-trigger

  state.entered = true;
  state.enteredAt = Date.now();

  // Add data attribute to body for CSS state changes
  document.body.setAttribute('data-entered', 'true');

  // Dispatch custom event for other modules
  const event = new CustomEvent(TRAP_ENTERED_EVENT, {
    detail: { timestamp: state.enteredAt },
  });
  document.dispatchEvent(event);

  console.log('[trap] User has entered the void.');
}
```

### Step 2.2: Update `src/main.ts`

```typescript
/**
 * main.ts
 * Entry point - orchestrates all modules.
 */

import { initTrap } from './scripts/trap';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[researchthe.net] Initializing the void...');
  
  // Phase 2: Initialize trap
  initTrap();
});
```

### Verification (Phase 2)

- [ ] Clicking "Enter" hides the button immediately
- [ ] Legal blurb fades in over ~2 seconds
- [ ] Console logs "[trap] User has entered the void."
- [ ] `document.body` has `data-entered="true"` attribute after click
- [ ] Clicking multiple times only triggers once

---

## Phase 3: Custom Cursor & Glitch Effects

**Goal:** Replace native cursor with a custom element that tracks mouse position. Apply stutter and ghost trail effects. Show toast after 30 seconds.

### Step 3.1: Create `src/styles/cursor.css`

```css
/* === Hide Native Cursor After Entering === */
body[data-entered] {
  cursor: none;
}

body[data-entered] * {
  cursor: none;
}

/* === Custom Cursor Container === */
#custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

body[data-entered] #custom-cursor {
  opacity: 1;
}

/* === Cursor Dot (Main Cursor) === */
.cursor-dot {
  position: absolute;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  border: 2px solid var(--text-primary);
  border-radius: 50%;
  background: transparent;
  transition: transform 0.1s ease;
}

/* Spinning animation for "loading" effect */
.cursor-dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: cursor-spin 1s linear infinite;
}

@keyframes cursor-spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* === Ghost Trail === */
.cursor-trail {
  position: absolute;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  border: 1px solid var(--text-muted);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* === Glitch/Stutter State === */
#custom-cursor.glitch .cursor-dot {
  animation: cursor-glitch 0.2s steps(2) forwards;
}

#custom-cursor.glitch .cursor-trail {
  opacity: 0.4;
  animation: trail-glitch 0.3s ease-out forwards;
}

@keyframes cursor-glitch {
  0% { transform: translate(-50%, -50%) translate(0, 0); opacity: 1; }
  25% { transform: translate(-50%, -50%) translate(3px, -2px); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) translate(-4px, 3px); opacity: 0; }
  75% { transform: translate(-50%, -50%) translate(2px, 1px); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) translate(0, 0); opacity: 1; }
}

@keyframes trail-glitch {
  0% { 
    transform: translate(-50%, -50%) translate(0, 0) scale(1); 
    opacity: 0.4; 
  }
  100% { 
    transform: translate(-50%, -50%) translate(-15px, 10px) scale(1.5); 
    opacity: 0; 
  }
}

/* === Additional Ghost Trails (created dynamically) === */
.ghost-trail {
  position: fixed;
  width: 20px;
  height: 20px;
  border: 1px solid var(--text-legal);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  animation: ghost-fade 1.5s ease-out forwards;
}

@keyframes ghost-fade {
  0% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
}
```

### Step 3.2: Create `src/scripts/cursor.ts`

```typescript
/**
 * cursor.ts
 * Custom cursor tracking and glitch effects.
 */

import { TRAP_ENTERED_EVENT } from './trap';

// Cursor state
let cursorX = 0;
let cursorY = 0;
let isActive = false;


// DOM references
let cursorEl: HTMLElement | null = null;


/**
 * Initialize the custom cursor system.
 */
export function initCursor(): void {
  cursorEl = document.getElementById('custom-cursor');

  if (!cursorEl) {
    console.error('[cursor] Custom cursor element not found');
    return;
  }

  // Always track mouse position
  document.addEventListener('mousemove', handleMouseMove);

  // Activate effects when trap is entered
  document.addEventListener(TRAP_ENTERED_EVENT, activate);
}

/**
 * Track mouse position and update cursor element.
 */
function handleMouseMove(e: MouseEvent): void {
  cursorX = e.clientX;
  cursorY = e.clientY;

  if (cursorEl) {
    cursorEl.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  }
}

/**
 * Activate glitch effects after entering the trap.
 */
function activate(): void {
  if (isActive) return;
  isActive = true;

  console.log('[cursor] Activating glitch cursor...');

  // Start periodic glitch effect every 5 seconds (±1s randomness)
  scheduleNextGlitch();

  // Start toast timer (30 seconds)
  setTimeout(showToast, 30000);
}

/**
 * Schedule the next glitch with some randomness.
 */
function scheduleNextGlitch(): void {
  const baseDelay = 5000;
  const variance = Math.random() * 3000 - 1000; // -1s to +1s
  const delay = baseDelay + variance;

  glitchInterval = window.setTimeout(() => {
    triggerGlitch();
    scheduleNextGlitch(); // Recursively schedule the next one
  }, delay);
}

/**
 * Trigger a glitch effect on the cursor.
 */
function triggerGlitch(): void {
  if (!cursorEl) return;

  // Add glitch class
  cursorEl.classList.add('glitch');

  // Create ghost trails at current position
  createGhostTrail(cursorX, cursorY);
  
  // Staggered additional ghosts
  setTimeout(() => createGhostTrail(cursorX + 5, cursorY - 3), 50);
  setTimeout(() => createGhostTrail(cursorX - 8, cursorY + 4), 100);

  // Remove glitch class after animation
  setTimeout(() => {
    cursorEl?.classList.remove('glitch');
  }, 300);
}

/**
 * Create a ghost trail element at the specified position.
 */
function createGhostTrail(x: number, y: number): void {
  const ghost = document.createElement('div');
  ghost.className = 'ghost-trail';
  ghost.style.position = 'fixed';
  ghost.style.left = `${x}px`;
  ghost.style.top = `${y}px`;
  document.body.appendChild(ghost);

  // Remove after animation completes
  setTimeout(() => {
    ghost.remove();
  }, 600);
}

/**
 * Show the toast notification.
 */
function showToast(): void {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = 'Optimising your patience. Please do not refresh; the delay is intentional and proprietary.';
  toast.classList.add('visible');

  console.log('[cursor] Toast displayed.');

  // Optional: Hide after 10 seconds (or keep visible)
  // setTimeout(() => toast.classList.remove('visible'), 10000);
}
```

### Step 3.3: Update `src/main.ts`

```typescript
/**
 * main.ts
 * Entry point - orchestrates all modules.
 */

import { initTrap } from './scripts/trap';
import { initCursor } from './scripts/cursor';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[researchthe.net] Initializing the void...');
  
  // Phase 2: Initialize trap
  initTrap();

  // Phase 3: Initialize custom cursor
  initCursor();
});
```

### Verification (Phase 3)

- [ ] Before clicking "Enter": native cursor visible, custom cursor hidden
- [ ] After clicking "Enter": native cursor hidden, custom cursor visible at mouse position
- [ ] Custom cursor has spinning inner ring (loading effect)
- [ ] Every ~5 seconds, cursor "stutters" with offset jitter animation
- [ ] Ghost trail elements appear during glitch and fade out
- [ ] At 30 seconds, toast appears in bottom-right corner
- [ ] Toast text: "Optimising your patience..."

---

## Phase 4: CLI Corner

**Goal:** Render a looping stream of pseudo-technical nonsense in the bottom corner, speeding up after "Enter."

### Step 4.1: Create `src/styles/cli.css`

```css
/* === CLI Corner === */
#cli-corner {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  max-width: 300px;
  max-height: 150px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 10px;
  color: #3a7a6a;
  opacity: 0.4;
  line-height: 1.5;
  text-align: left;
}

/* === CLI Line === */
.cli-line {
  display: block;
  opacity: 0;
  transform: translateY(5px);
  animation: cli-fade-in 0.4s ease forwards;
}

@keyframes cli-fade-in {
  0% { 
    opacity: 0; 
    transform: translateY(5px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Prefix styling */
.cli-line::before {
  content: '> ';
  color: #2a5a4a;
}
```

### Step 4.2: Create `src/scripts/cli.ts`

```typescript
/**
 * cli.ts
 * CLI text stream simulation.
 */

import { TRAP_ENTERED_EVENT } from './trap';

// Pseudo-technical nonsense messages
const MESSAGES: string[] = [
  'Synergizing silence...',
  'Logic-leak in Sector 7G',
  'Refactoring the void',
  'Compiling absence',
  'Optimizing entropy',
  'Depreciating certainty',
  'Bootstrapping ambiguity',
  'Parsing the ineffable',
  'Allocating doubt',
  'Garbage-collecting hope',
  'Initializing infinite loop',
  'Deconstructing expectations',
  'Fragmenting coherence',
  'Normalizing chaos',
  'Inverting progress',
  'Suspending resolution',
  'Iterating stagnation',
  'Encrypting meaning',
  'Buffering eternity',
  'Deprecating urgency',
];

// Configuration
const SLOW_INTERVAL = 2000;  // 2 seconds before Enter
const FAST_INTERVAL = 800;   // 0.8 seconds after Enter
const MAX_LINES = 8;

// State
let cliEl: HTMLElement | null = null;
let intervalId: number | null = null;
let messageIndex = 0;

/**
 * Initialize the CLI corner stream.
 */
export function initCli(): void {
  cliEl = document.getElementById('cli-corner');
  
  if (!cliEl) {
    console.error('[cli] CLI corner element not found');
    return;
  }

  // Start slow stream immediately
  startStream(SLOW_INTERVAL);

  // Speed up when trap is entered
  document.addEventListener(TRAP_ENTERED_EVENT, () => {
    console.log('[cli] Accelerating data stream...');
    startStream(FAST_INTERVAL);
  });
}

/**
 * Start or restart the message stream at the given interval.
 */
function startStream(interval: number): void {
  // Clear existing interval if any
  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  // Start new interval
  intervalId = window.setInterval(addMessage, interval);
  
  // Add one immediately
  addMessage();
}

/**
 * Add a new message to the CLI corner.
 */
function addMessage(): void {
  if (!cliEl) return;

  // Get next message (cycling through the array)
  const message = MESSAGES[messageIndex % MESSAGES.length];
  messageIndex++;

  // Create line element
  const line = document.createElement('span');
  line.className = 'cli-line';
  line.textContent = message;

  // Append to CLI corner
  cliEl.appendChild(line);

  // Remove old lines if exceeding max
  while (cliEl.children.length > MAX_LINES) {
    cliEl.removeChild(cliEl.firstChild!);
  }
}
```

### Step 4.3: Final `src/main.ts`

```typescript
/**
 * main.ts
 * Entry point - orchestrates all modules.
 */

import { initTrap } from './scripts/trap';
import { initCursor } from './scripts/cursor';
import { initCli } from './scripts/cli';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('[researchthe.net] Initializing the void...');
  
  // Phase 2: Initialize trap
  initTrap();

  // Phase 3: Initialize custom cursor
  initCursor();

  // Phase 4: Initialize CLI corner
  initCli();

  console.log('[researchthe.net] All systems nominal. Awaiting user entrapment.');
});
```

### Verification (Phase 4)

- [ ] CLI corner visible in bottom-left, low opacity
- [ ] Messages appear every ~2 seconds before clicking "Enter"
- [ ] After clicking "Enter", messages appear every ~0.8 seconds
- [ ] Maximum 8 lines visible at any time (older lines removed)
- [ ] Lines fade in with subtle animation
- [ ] Messages cycle through the full list

---

## Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy Options

- **Netlify:** Drag & drop `dist/` folder
- **Vercel:** `vercel --prod`
- **GitHub Pages:** Push `dist/` contents to `gh-pages` branch

---

## Technical Boundaries

| Constraint | Implementation |
|------------|----------------|
| No frameworks | Vanilla TypeScript only, Vite for build |
| No user data | No forms, no localStorage, no analytics, no cookies |
| Static only | Deployable to any static host |
| Accessibility | Intentionally satirical; decorative elements have `aria-hidden="true"` |

---

## Final Verification Checklist

- [ ] Site loads with dark gradient background
- [ ] Headline, sub-headline, and "Enter" button visible
- [ ] Clicking "Enter" hides button, shows custom cursor
- [ ] Native cursor hidden, custom cursor tracks mouse perfectly
- [ ] Legal blurb fades in over 2 seconds
- [ ] Cursor glitches/stutters every ~5 seconds with ghost trails
- [ ] Toast appears at 30 seconds with "Optimising your patience..." text
- [ ] CLI corner streams text, speeds up after "Enter"
- [ ] No console errors
- [ ] No network requests after initial load
- [ ] Build completes successfully with `npm run build`

---

## Decisions Log

| Decision | Rationale |
|----------|-----------|
| Vite over raw bundling | Hot reload, zero-config TypeScript, clean production builds |
| Custom cursor element over CSS cursor | Full control over animations, ghost trails, and glitch effects |
| Custom events for module communication | Loose coupling between trap, cursor, and CLI modules |
| 4 phases instead of 3 | Keeps each phase focused and under 300 lines |
| Persistent toast (no auto-dismiss) | Reinforces the satirical "infinite wait" theme |

---

*This document is proprietary. By reading it, you have agreed to experience minor existential doubt.*
```

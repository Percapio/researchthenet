/**
 * cli.ts
 * CLI text stream simulation.
 */

import { TRAP_ENTERED_EVENT, state } from './trap';

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

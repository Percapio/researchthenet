/**
 * cursor.ts
 * Custom cursor tracking and glitch effects.
 */

import { TRAP_ENTERED_EVENT } from './trap';

// Cursor state
let cursorX = 0;
let cursorY = 0;
let isActive = false;
let glitchInterval: number | null = null;

// DOM references
let cursorEl: HTMLElement | null = null;
let trailEl: HTMLElement | null = null;

/**
 * Initialize the custom cursor system.
 */
export function initCursor(): void {
  cursorEl = document.getElementById('custom-cursor');
  trailEl = cursorEl?.querySelector('.cursor-trail') || null;

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
  const variance = Math.random() * 2000 - 1000; // -1s to +1s
  const delay = baseDelay + variance;

  glitchInterval = window.setTimeout(() => {
    triggerGlitch();
    scheduleNextGlitch(); // Schedule the next one
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

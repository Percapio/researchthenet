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

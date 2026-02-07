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

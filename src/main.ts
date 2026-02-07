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

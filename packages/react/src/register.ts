// Register all Glaze custom elements
// This is a side-effect module that should only run on the client

// Import all components to trigger their registration
// Import from main index to ensure all components are registered
import '@felixgeelhaar/glaze-components';

// Mark as registered to prevent double registration
declare global {
  interface Window {
    __GLAZE_COMPONENTS_REGISTERED__?: boolean;
  }
}

if (typeof window !== 'undefined' && !window.__GLAZE_COMPONENTS_REGISTERED__) {
  window.__GLAZE_COMPONENTS_REGISTERED__ = true;
  console.debug('[Glaze] Web Components registered');
}
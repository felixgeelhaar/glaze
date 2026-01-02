// Register all Glaze custom elements

// Import all components to trigger their registration
// Import from main index to ensure all components are registered
import '@felixgeelhaar/glaze-components';

// Mark as registered to prevent double registration
declare global {
  interface Window {
    __GLAZE_COMPONENTS_REGISTERED__?: boolean;
  }
}

export function registerGlazeComponents() {
  if (typeof window !== 'undefined' && !window.__GLAZE_COMPONENTS_REGISTERED__) {
    window.__GLAZE_COMPONENTS_REGISTERED__ = true;
    console.debug('[Glaze] Web Components registered for Vue');
  }
}

// Auto-register if in browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  registerGlazeComponents();
}
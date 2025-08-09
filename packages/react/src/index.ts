// Re-export all component wrappers
export * from './components/index.js';

// Re-export types
export * from './types.js';

// Side-effect import to register custom elements (client-side only)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  import('./register.js');
}
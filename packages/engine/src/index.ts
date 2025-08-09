export { glazePreset, glazePreset as default } from './preset.js';
export { glazePlugin } from './glass.plugin.js';
export { glazeUnoPreset } from './unocss.preset.js';

// Re-export for convenience
export const engine = {
  preset: () => import('./preset.js').then(m => m.glazePreset),
  plugin: () => import('./glass.plugin.js').then(m => m.glazePlugin),
  unocss: () => import('./unocss.preset.js').then(m => m.glazeUnoPreset),
};
import type { Preset } from '@unocss/core';

/**
 * Glaze Design System UnoCSS Preset
 * Provides equivalent functionality to Tailwind preset
 */
export const glazeUnoPreset = (): Preset => ({
  name: '@glaze/unocss-preset',
  theme: {
    colors: {
      bg: {
        DEFAULT: 'var(--color-bg-base)',
        base: 'var(--color-bg-base)',
        on: 'var(--color-bg-on)',
      },
      surface: {
        DEFAULT: 'var(--color-surface-base)',
        base: 'var(--color-surface-base)',
        on: 'var(--color-surface-on)',
      },
      primary: {
        DEFAULT: 'var(--color-primary-base)',
        base: 'var(--color-primary-base)',
        on: 'var(--color-primary-on)',
      },
      accent: {
        DEFAULT: 'var(--color-accent-base)',
        base: 'var(--color-accent-base)',
        on: 'var(--color-accent-on)',
      },
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      pill: 'var(--radius-pill)',
    },
    blur: {
      sm: 'var(--blur-sm)',
      md: 'var(--blur-md)',
      lg: 'var(--blur-lg)',
      xl: 'var(--blur-xl)',
    },
  },
  rules: [
    // Glass utilities
    ['glass', {
      'backdrop-filter': 'blur(var(--blur-md))',
      'background': 'var(--color-glass-tintLight)',
      'border': '1px solid var(--color-glass-border)',
      'box-shadow': 'var(--elevation-glass)',
    }],
    ['glass-sm', {
      'backdrop-filter': 'blur(var(--blur-sm))',
      'background': 'var(--color-glass-tintLight)',
      'border': '1px solid var(--color-glass-border)',
      'box-shadow': 'var(--elevation-glass)',
    }],
    ['glass-md', {
      'backdrop-filter': 'blur(var(--blur-md))',
      'background': 'var(--color-glass-tintLight)',
      'border': '1px solid var(--color-glass-border)',
      'box-shadow': 'var(--elevation-glass)',
    }],
    ['glass-lg', {
      'backdrop-filter': 'blur(var(--blur-lg))',
      'background': 'var(--color-glass-tintLight)',
      'border': '1px solid var(--color-glass-border)',
      'box-shadow': 'var(--elevation-glass)',
    }],
    // Surface utility
    ['surface', {
      'background-color': 'var(--color-surface-base)',
      'color': 'var(--color-surface-on)',
      'border-radius': 'var(--radius-md)',
    }],
  ],
  shortcuts: [
    // Button shortcuts
    ['btn', 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed'],
    ['btn-primary', 'btn bg-primary text-primary-on hover:opacity-90 active:scale-98'],
    // Card shortcut
    ['card', 'p-6 rounded-lg bg-surface text-surface-on shadow-1 transition-shadow hover:shadow-2'],
    // Field shortcut
    ['field', 'block w-full px-3 py-2 bg-bg text-bg-on border border-glass-border rounded-sm text-sm transition-all focus:outline-none focus:border-primary focus:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-bg-on placeholder:opacity-50'],
  ],
});

export default glazeUnoPreset;
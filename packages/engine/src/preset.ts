import type { Config } from 'tailwindcss';

/**
 * Glaze Design System Tailwind CSS Preset
 * Maps design tokens to Tailwind theme configuration
 */
export const glazePreset: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Semantic colors using CSS variables
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
        glass: {
          tintLight: 'var(--color-glass-tintLight)',
          tintDark: 'var(--color-glass-tintDark)',
          border: 'var(--color-glass-border)',
        },
        // Palette colors
        slate: {
          2: 'var(--palette-slate-2)',
          3: 'var(--palette-slate-3)',
          12: 'var(--palette-slate-12)',
        },
        indigo: {
          1: 'var(--palette-indigo-1)',
          9: 'var(--palette-indigo-9)',
        },
        pink: {
          1: 'var(--palette-pink-1)',
          9: 'var(--palette-pink-9)',
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
      boxShadow: {
        glass: 'var(--elevation-glass)',
        1: 'var(--elevation-1)',
        2: 'var(--elevation-2)',
      },
      backdropBlur: {
        sm: 'var(--blur-sm)',
        md: 'var(--blur-md)',
        lg: 'var(--blur-lg)',
        xl: 'var(--blur-xl)',
      },
      opacity: {
        'glass-sm': 'var(--opacity-glass-sm)',
        'glass-md': 'var(--opacity-glass-md)',
        'glass-lg': 'var(--opacity-glass-lg)',
      },
    },
  },
};

export default glazePreset;
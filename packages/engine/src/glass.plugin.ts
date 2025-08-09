import plugin from 'tailwindcss/plugin';

/**
 * Glaze Glass Morphism Plugin
 * Provides glass utilities and component shortcuts
 */
export const glazePlugin = plugin(
  function ({ addUtilities, addComponents }) {
    // Glass utilities
    const glassUtilities = {
      '.glass': {
        'backdrop-filter': 'blur(var(--blur-md))',
        'background': 'var(--color-glass-tintLight)',
        'border': '1px solid var(--color-glass-border)',
        'box-shadow': 'var(--elevation-glass)',
      },
      '.glass-sm': {
        'backdrop-filter': 'blur(var(--blur-sm))',
        'background': 'var(--color-glass-tintLight)',
        'border': '1px solid var(--color-glass-border)',
        'box-shadow': 'var(--elevation-glass)',
      },
      '.glass-md': {
        'backdrop-filter': 'blur(var(--blur-md))',
        'background': 'var(--color-glass-tintLight)',
        'border': '1px solid var(--color-glass-border)',
        'box-shadow': 'var(--elevation-glass)',
      },
      '.glass-lg': {
        'backdrop-filter': 'blur(var(--blur-lg))',
        'background': 'var(--color-glass-tintLight)',
        'border': '1px solid var(--color-glass-border)',
        'box-shadow': 'var(--elevation-glass)',
      },
      // Dark mode glass (using tintDark)
      '[data-theme="dark"] .glass, .dark .glass': {
        'background': 'var(--color-glass-tintDark)',
      },
      '[data-theme="dark"] .glass-sm, .dark .glass-sm': {
        'background': 'var(--color-glass-tintDark)',
      },
      '[data-theme="dark"] .glass-md, .dark .glass-md': {
        'background': 'var(--color-glass-tintDark)',
      },
      '[data-theme="dark"] .glass-lg, .dark .glass-lg': {
        'background': 'var(--color-glass-tintDark)',
      },
    };

    // Surface utility
    const surfaceUtilities = {
      '.surface': {
        'background-color': 'var(--color-surface-base)',
        'color': 'var(--color-surface-on)',
        'border-radius': 'var(--radius-md)',
      },
    };

    // Component shortcuts
    const components = {
      '.btn': {
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'padding': '0.5rem 1rem',
        'border-radius': 'var(--radius-md)',
        'font-weight': '500',
        'transition-property': 'all',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '150ms',
        'cursor': 'pointer',
        'outline': '2px solid transparent',
        'outline-offset': '2px',
        '&:focus-visible': {
          'outline-color': 'var(--color-primary-base)',
        },
        '&:disabled': {
          'opacity': '0.5',
          'cursor': 'not-allowed',
        },
      },
      '.btn-primary': {
        '@apply btn': {},
        'background-color': 'var(--color-primary-base)',
        'color': 'var(--color-primary-on)',
        '&:hover:not(:disabled)': {
          'opacity': '0.9',
        },
        '&:active:not(:disabled)': {
          'transform': 'scale(0.98)',
        },
      },
      '.card': {
        'padding': '1.5rem',
        'border-radius': 'var(--radius-lg)',
        'background-color': 'var(--color-surface-base)',
        'color': 'var(--color-surface-on)',
        'box-shadow': 'var(--elevation-1)',
        'transition-property': 'box-shadow',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '150ms',
        '&:hover': {
          'box-shadow': 'var(--elevation-2)',
        },
      },
      '.field': {
        'display': 'block',
        'width': '100%',
        'padding': '0.5rem 0.75rem',
        'background-color': 'var(--color-bg-base)',
        'color': 'var(--color-bg-on)',
        'border': '1px solid var(--color-glass-border)',
        'border-radius': 'var(--radius-sm)',
        'font-size': '0.875rem',
        'line-height': '1.25rem',
        'transition-property': 'border-color, box-shadow',
        'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'transition-duration': '150ms',
        '&:focus': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'border-color': 'var(--color-primary-base)',
          'box-shadow': '0 0 0 3px rgba(79, 70, 229, 0.1)',
        },
        '&:disabled': {
          'opacity': '0.5',
          'cursor': 'not-allowed',
        },
        '&::placeholder': {
          'color': 'var(--color-bg-on)',
          'opacity': '0.5',
        },
      },
    };

    addUtilities(glassUtilities);
    addUtilities(surfaceUtilities);
    addComponents(components);
  },
  {
    theme: {
      extend: {
        // Additional theme extensions if needed
      },
    },
  }
);

export default glazePlugin;
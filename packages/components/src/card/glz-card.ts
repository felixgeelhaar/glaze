import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A card component with glass morphism variants
 * @element glz-card
 */
@customElement('glz-card')
export class GlzCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all 0.2s ease;
    }

    :host([hidden]) {
      display: none;
    }

    .card {
      padding: var(--padding, 1.5rem);
      border-radius: inherit;
      min-height: var(--min-height, auto);
      height: 100%;
      transition: inherit;
    }

    :host([variant="solid"]) .card {
      background: var(--variant-bg, var(--color-surface-base));
      color: var(--variant-color, var(--color-surface-on));
      box-shadow: var(--elevation-1);
    }

    :host([variant="solid"]:hover) .card {
      box-shadow: var(--elevation-2);
    }

    :host([variant="glass"]) .card {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--glass-blur, var(--blur-md)));
      -webkit-backdrop-filter: blur(var(--glass-blur, var(--blur-md)));
      border: 1px solid var(--color-glass-border);
      box-shadow: var(--elevation-glass);
      color: var(--color-bg-on);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .card,
    :host(.dark) :host([variant="glass"]) .card {
      background: var(--color-glass-tintDark);
    }

    :host([variant="subtle"]) .card {
      background: transparent;
      border: 1px solid var(--color-glass-border);
      color: var(--variant-color, var(--color-surface-on));
    }

    :host([size="sm"]) .card {
      --padding: 1rem;
    }

    :host([size="md"]) .card {
      --padding: 1.5rem;
    }

    :host([size="lg"]) .card {
      --padding: 2rem;
    }

    :host([tone="primary"]) .card {
      --variant-bg: var(--color-primary-base);
      --variant-color: var(--color-primary-on);
    }

    :host([tone="accent"]) .card {
      --variant-bg: var(--color-accent-base);
      --variant-color: var(--color-accent-on);
    }

    :host([tone="neutral"]) .card {
      --variant-bg: var(--color-surface-base);
      --variant-color: var(--color-surface-on);
    }

    @media (prefers-reduced-motion: reduce) {
      :host,
      .card {
        transition: none;
      }
    }

    :host([data-reduced-transparency="true"]) .card {
      --glass-blur: none;
      opacity: 0.95;
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' | 'subtle' = 'solid';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String, reflect: true })
  tone?: 'primary' | 'neutral' | 'accent';

  override render() {
    return html`
      <div class="card" part="card">
        <slot></slot>
      </div>
    `;
  }
}
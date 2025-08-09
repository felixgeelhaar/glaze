import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * An accessible button component with glass morphism variants
 * @element glz-button
 */
@customElement('glz-button')
export class GlzButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      outline: none;
    }

    :host([hidden]) {
      display: none;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: var(--padding-y) var(--padding-x);
      font-size: var(--font-size);
      min-height: var(--height);
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      font-family: inherit;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Focus styles */
    button:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
      z-index: 1;
    }

    /* Size variants */
    :host([size="sm"]) button {
      --padding-x: 0.75rem;
      --padding-y: 0.375rem;
      --font-size: 0.875rem;
      --height: 2rem;
    }

    :host([size="md"]) button {
      --padding-x: 1rem;
      --padding-y: 0.5rem;
      --font-size: 1rem;
      --height: 2.5rem;
    }

    :host([size="lg"]) button {
      --padding-x: 1.25rem;
      --padding-y: 0.625rem;
      --font-size: 1.125rem;
      --height: 3rem;
    }

    /* Variant styles */
    :host([variant="solid"]) button {
      background: var(--variant-bg, var(--color-primary-base));
      color: var(--variant-color, var(--color-primary-on));
    }

    :host([variant="solid"]) button:not(:disabled):hover {
      opacity: 0.9;
    }

    :host([variant="solid"]) button:not(:disabled):active {
      transform: scale(0.98);
    }

    :host([variant="glass"]) button {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--glass-blur, var(--blur-md)));
      -webkit-backdrop-filter: blur(var(--glass-blur, var(--blur-md)));
      border: 1px solid var(--color-glass-border);
      box-shadow: var(--elevation-glass);
      color: var(--color-bg-on);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) button,
    :host(.dark) :host([variant="glass"]) button {
      background: var(--color-glass-tintDark);
    }

    :host([variant="glass"]) button:not(:disabled):hover {
      background: var(--color-glass-tintDark);
    }

    :host([variant="subtle"]) button {
      background: transparent;
      color: var(--variant-color, var(--color-primary-base));
      border: 1px solid currentColor;
    }

    :host([variant="subtle"]) button:not(:disabled):hover {
      background: var(--color-glass-tintLight);
    }

    /* Tone modifiers */
    :host([tone="primary"]) button {
      --variant-bg: var(--color-primary-base);
      --variant-color: var(--color-primary-on);
    }

    :host([tone="accent"]) button {
      --variant-bg: var(--color-accent-base);
      --variant-color: var(--color-accent-on);
    }

    :host([tone="neutral"]) button {
      --variant-bg: var(--color-surface-base);
      --variant-color: var(--color-surface-on);
    }

    /* Toggle state */
    :host([pressed="true"]) button {
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
      transform: scale(0.98);
    }

    /* Loading state */
    .spinner {
      display: inline-block;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      button {
        transition: none;
      }
      .spinner {
        animation: none;
        border-right-color: currentColor;
        opacity: 0.5;
      }
    }

    :host([data-reduced-transparency="true"]) button {
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

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean, reflect: true, attribute: 'pressed' })
  pressed = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  @state()
  private _isKeyDown = false;

  private _handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Toggle pressed state if it's a toggle button
    if (this.hasAttribute('aria-pressed')) {
      this.pressed = !this.pressed;
      this.setAttribute('aria-pressed', String(this.pressed));
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.loading) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._isKeyDown = true;
    }
  }

  private _handleKeyUp(e: KeyboardEvent) {
    if (this.disabled || this.loading) return;

    if ((e.key === ' ' || e.key === 'Enter') && this._isKeyDown) {
      e.preventDefault();
      this._isKeyDown = false;
      this.shadowRoot?.querySelector('button')?.click();
    }
  }

  override render() {
    return html`
      <button
        type="${this.type}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeyDown}"
        @keyup="${this._handleKeyUp}"
        aria-busy="${this.loading}"
        aria-disabled="${this.disabled}"
        aria-pressed="${this.hasAttribute('aria-pressed') ? this.pressed : nothing}"
        part="button"
      >
        ${this.loading ? html`<span class="spinner" aria-label="Loading"></span>` : ''}
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-button': GlzButton;
  }
}
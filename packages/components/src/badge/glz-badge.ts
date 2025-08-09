import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A badge component for displaying status, counts, or labels
 * @element glz-badge
 */
@customElement('glz-badge')
export class GlzBadge extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      --badge-height: 20px;
      --badge-padding: 0 8px;
      --badge-font-size: 0.75rem;
      --badge-font-weight: 600;
      --badge-border-radius: var(--radius-pill);
    }

    :host([size="small"]) {
      --badge-height: 16px;
      --badge-padding: 0 6px;
      --badge-font-size: 0.625rem;
    }

    :host([size="large"]) {
      --badge-height: 24px;
      --badge-padding: 0 10px;
      --badge-font-size: 0.875rem;
    }

    :host([variant="rounded"]) {
      --badge-border-radius: var(--radius-sm);
    }

    :host([variant="square"]) {
      --badge-border-radius: 0;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--badge-height);
      padding: var(--badge-padding);
      font-size: var(--badge-font-size);
      font-weight: var(--badge-font-weight);
      line-height: 1;
      border-radius: var(--badge-border-radius);
      white-space: nowrap;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      user-select: none;
    }

    /* Default variant */
    .badge {
      background: var(--color-surface-base);
      color: var(--color-surface-on);
      border: 1px solid var(--color-glass-border);
    }

    /* Primary variant */
    :host([color="primary"]) .badge {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: transparent;
    }

    /* Accent variant */
    :host([color="accent"]) .badge {
      background: var(--color-accent-base);
      color: var(--color-accent-on);
      border-color: transparent;
    }

    /* Success variant */
    :host([color="success"]) .badge {
      background: #10B981;
      color: white;
      border-color: transparent;
    }

    /* Warning variant */
    :host([color="warning"]) .badge {
      background: #F59E0B;
      color: white;
      border-color: transparent;
    }

    /* Error variant */
    :host([color="error"]) .badge {
      background: #EF4444;
      color: white;
      border-color: transparent;
    }

    /* Info variant */
    :host([color="info"]) .badge {
      background: #3B82F6;
      color: white;
      border-color: transparent;
    }

    /* Glass variant */
    :host([color="glass"]) .badge {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
      border: 1px solid var(--color-glass-border);
      color: var(--color-bg-on);
    }

    :host([data-theme="dark"]) :host([color="glass"]) .badge,
    :host(.dark) :host([color="glass"]) .badge {
      background: var(--color-glass-tintDark);
    }

    /* Outline variant */
    :host([outline]) .badge {
      background: transparent;
      border-width: 2px;
    }

    :host([outline][color="primary"]) .badge {
      color: var(--color-primary-base);
      border-color: var(--color-primary-base);
    }

    :host([outline][color="accent"]) .badge {
      color: var(--color-accent-base);
      border-color: var(--color-accent-base);
    }

    :host([outline][color="success"]) .badge {
      color: #10B981;
      border-color: #10B981;
    }

    :host([outline][color="warning"]) .badge {
      color: #F59E0B;
      border-color: #F59E0B;
    }

    :host([outline][color="error"]) .badge {
      color: #EF4444;
      border-color: #EF4444;
    }

    :host([outline][color="info"]) .badge {
      color: #3B82F6;
      border-color: #3B82F6;
    }

    /* Dot indicator */
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      margin-right: 6px;
      animation: pulse 2s infinite;
    }

    :host([dot-position="right"]) .dot {
      margin-right: 0;
      margin-left: 6px;
      order: 1;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    /* Icon support */
    ::slotted([slot="icon"]) {
      width: 12px;
      height: 12px;
      margin-right: 4px;
    }

    :host([size="large"]) ::slotted([slot="icon"]) {
      width: 14px;
      height: 14px;
    }

    /* Clickable state */
    :host([clickable]) .badge {
      cursor: pointer;
    }

    :host([clickable]) .badge:hover {
      opacity: 0.8;
      transform: translateY(-1px);
      box-shadow: var(--elevation-1);
    }

    :host([clickable]) .badge:active {
      transform: translateY(0);
      box-shadow: none;
    }

    /* Disabled state */
    :host([disabled]) .badge {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Animation */
    :host([animated]) .badge {
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .badge,
      .dot {
        animation: none;
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  color: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'glass' = 'default';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  variant: 'pill' | 'rounded' | 'square' = 'pill';

  @property({ type: Boolean, reflect: true })
  outline = false;

  @property({ type: Boolean })
  dot = false;

  @property({ type: String, attribute: 'dot-position' })
  dotPosition: 'left' | 'right' = 'left';

  @property({ type: Boolean, reflect: true })
  clickable = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'animated' })
  animated = false;

  @property({ type: String })
  label = '';

  private _handleClick = () => {
    if (!this.disabled && this.clickable) {
      this.dispatchEvent(new CustomEvent('glz-badge-click', {
        detail: { label: this.label || this.textContent },
        bubbles: true,
        composed: true
      }));
    }
  };

  override render() {
    return html`
      <span
        class="badge"
        part="badge"
        @click=${this._handleClick}
        role=${this.clickable ? 'button' : 'status'}
        tabindex=${this.clickable && !this.disabled ? '0' : '-1'}
        aria-label=${this.label || nothing}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        ${this.dot && this.dotPosition === 'left' ? html`<span class="dot" part="dot"></span>` : ''}
        <slot name="icon"></slot>
        <slot></slot>
        ${this.dot && this.dotPosition === 'right' ? html`<span class="dot" part="dot"></span>` : ''}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-badge': GlzBadge;
  }
}
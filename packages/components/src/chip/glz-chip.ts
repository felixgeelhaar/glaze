import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A chip component for interactive tags, filters, and selections
 * @element glz-chip
 */
@customElement('glz-chip')
export class GlzChip extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      --chip-height: 32px;
      --chip-padding: 0 12px;
      --chip-font-size: 0.875rem;
      --chip-font-weight: 500;
      --chip-border-radius: var(--radius-pill);
      --chip-gap: 8px;
    }

    :host([size="small"]) {
      --chip-height: 24px;
      --chip-padding: 0 8px;
      --chip-font-size: 0.75rem;
      --chip-gap: 6px;
    }

    :host([size="large"]) {
      --chip-height: 40px;
      --chip-padding: 0 16px;
      --chip-font-size: 1rem;
      --chip-gap: 10px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--chip-gap);
      height: var(--chip-height);
      padding: var(--chip-padding);
      font-size: var(--chip-font-size);
      font-weight: var(--chip-font-weight);
      line-height: 1;
      border-radius: var(--chip-border-radius);
      border: 2px solid transparent;
      transition: all 0.2s ease;
      cursor: default;
      user-select: none;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
    }

    /* Default variant */
    .chip {
      background: var(--color-surface-base);
      color: var(--color-surface-on);
      border-color: var(--color-glass-border);
    }

    /* Primary variant */
    :host([color="primary"]) .chip {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: transparent;
    }

    /* Accent variant */
    :host([color="accent"]) .chip {
      background: var(--color-accent-base);
      color: var(--color-accent-on);
      border-color: transparent;
    }

    /* Success variant */
    :host([color="success"]) .chip {
      background: #10B981;
      color: white;
      border-color: transparent;
    }

    /* Warning variant */
    :host([color="warning"]) .chip {
      background: #F59E0B;
      color: white;
      border-color: transparent;
    }

    /* Error variant */
    :host([color="error"]) .chip {
      background: #EF4444;
      color: white;
      border-color: transparent;
    }

    /* Glass variant */
    :host([color="glass"]) .chip {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
      border: 1px solid var(--color-glass-border);
      color: var(--color-bg-on);
    }

    :host([data-theme="dark"]) :host([color="glass"]) .chip,
    :host(.dark) :host([color="glass"]) .chip {
      background: var(--color-glass-tintDark);
    }

    /* Outline variant */
    :host([outline]) .chip {
      background: transparent;
    }

    :host([outline][color="primary"]) .chip {
      color: var(--color-primary-base);
      border-color: var(--color-primary-base);
    }

    :host([outline][color="accent"]) .chip {
      color: var(--color-accent-base);
      border-color: var(--color-accent-base);
    }

    :host([outline][color="success"]) .chip {
      color: #10B981;
      border-color: #10B981;
    }

    :host([outline][color="warning"]) .chip {
      color: #F59E0B;
      border-color: #F59E0B;
    }

    :host([outline][color="error"]) .chip {
      color: #EF4444;
      border-color: #EF4444;
    }

    /* Selectable state */
    :host([selectable]) .chip {
      cursor: pointer;
    }

    :host([selectable]) .chip:hover {
      opacity: 0.8;
      transform: translateY(-1px);
      box-shadow: var(--elevation-1);
    }

    :host([selectable]) .chip:active {
      transform: translateY(0);
    }

    /* Selected state */
    :host([selected]) .chip {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: var(--color-primary-base);
    }

    :host([selected][outline]) .chip {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
    }

    /* Disabled state */
    :host([disabled]) .chip {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Icon slots */
    .icon-start,
    .icon-end {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    :host([size="small"]) .icon-start,
    :host([size="small"]) .icon-end {
      width: 14px;
      height: 14px;
    }

    :host([size="large"]) .icon-start,
    :host([size="large"]) .icon-end {
      width: 20px;
      height: 20px;
    }

    ::slotted([slot="icon-start"]),
    ::slotted([slot="icon-end"]) {
      width: 100%;
      height: 100%;
    }

    /* Avatar support */
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      margin-left: -4px;
      background: var(--color-surface-base);
      border: 1px solid var(--color-bg-base);
    }

    :host([size="small"]) .avatar {
      width: 16px;
      height: 16px;
    }

    :host([size="large"]) .avatar {
      width: 24px;
      height: 24px;
    }

    ::slotted([slot="avatar"]) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Remove button */
    .remove-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      margin-right: -4px;
      margin-left: 4px;
      border: none;
      background: transparent;
      color: currentColor;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s ease;
      flex-shrink: 0;
      padding: 0;
      opacity: 0.6;
    }

    .remove-button:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.1);
    }

    .remove-button:active {
      transform: scale(0.9);
    }

    :host([size="small"]) .remove-button {
      width: 14px;
      height: 14px;
      margin-right: -2px;
    }

    :host([size="large"]) .remove-button {
      width: 18px;
      height: 18px;
    }

    .remove-icon {
      width: 12px;
      height: 12px;
    }

    :host([size="small"]) .remove-icon {
      width: 10px;
      height: 10px;
    }

    :host([size="large"]) .remove-icon {
      width: 14px;
      height: 14px;
    }

    /* Focus styles */
    .chip:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }

    /* Animation */
    :host([animated]) {
      animation: chipIn 0.3s ease;
    }

    @keyframes chipIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple 0.6s ease;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .chip,
      .remove-button {
        animation: none;
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  color: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'glass' = 'default';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true })
  outline = false;

  @property({ type: Boolean, reflect: true })
  selectable = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  removable = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'animated' })
  animated = false;

  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @state()
  private _ripples: Array<{ x: number; y: number; id: number }> = [];

  private _handleClick = (e: MouseEvent) => {
    if (this.disabled) return;

    if (this.selectable) {
      this.selected = !this.selected;
      this.dispatchEvent(new CustomEvent('glz-chip-select', {
        detail: { 
          selected: this.selected, 
          value: this.value || this.label || this.textContent 
        },
        bubbles: true,
        composed: true
      }));

      // Add ripple effect
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      this._ripples = [...this._ripples, { x, y, id }];
      
      setTimeout(() => {
        this._ripples = this._ripples.filter(r => r.id !== id);
      }, 600);
    }
  };

  private _handleRemove = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('glz-chip-remove', {
        detail: { value: this.value || this.label || this.textContent },
        bubbles: true,
        composed: true
      }));
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const chipEl = this.shadowRoot?.querySelector('.chip') as HTMLElement;
      if (chipEl) {
        chipEl.click();
      }
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (this.removable) {
        this._handleRemove(e);
      }
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override render() {
    return html`
      <div
        class="chip"
        part="chip"
        @click=${this._handleClick}
        role=${this.selectable ? 'checkbox' : 'status'}
        tabindex=${!this.disabled ? '0' : '-1'}
        aria-checked=${this.selectable ? String(this.selected) : nothing}
        aria-label=${this.label || nothing}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <slot name="avatar" class="avatar"></slot>
        
        <span class="icon-start">
          <slot name="icon-start"></slot>
        </span>
        
        <slot></slot>
        
        <span class="icon-end">
          <slot name="icon-end"></slot>
        </span>
        
        ${this.removable && !this.disabled ? html`
          <button
            class="remove-button"
            part="remove"
            @click=${this._handleRemove}
            tabindex="-1"
            aria-label="Remove chip"
          >
            <svg class="remove-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        ` : ''}
        
        ${this._ripples.map(ripple => html`
          <span
            class="ripple"
            style="left: ${ripple.x}px; top: ${ripple.y}px;"
          ></span>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-chip': GlzChip;
  }
}
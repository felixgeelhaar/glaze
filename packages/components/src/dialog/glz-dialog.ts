import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FocusTrap, LiveAnnouncer, prefersReducedTransparency } from '../utils/accessibility.js';

/**
 * An accessible dialog/modal component with focus trap
 * @element glz-dialog
 */
@customElement('glz-dialog')
export class GlzDialog extends LitElement {
  private focusTrap?: FocusTrap;
  private announcer = LiveAnnouncer.getInstance();
  static override styles = css`
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
    }

    :host([open]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
    }

    .dialog {
      position: relative;
      max-width: min(90vw, var(--max-width, 32rem));
      max-height: min(90vh, var(--max-height, auto));
      margin: 1rem;
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      overflow: auto;
      animation: slideUp 0.3s ease;
    }

    :host([variant="solid"]) .dialog {
      background: var(--color-surface-base);
      color: var(--color-surface-on);
      box-shadow: var(--elevation-2);
    }

    :host([variant="glass"]) .dialog {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-lg));
      -webkit-backdrop-filter: blur(var(--blur-lg));
      border: 1px solid var(--color-glass-border);
      box-shadow: var(--elevation-glass);
    }

    /* Reduced transparency support */
    @media (prefers-reduced-transparency: reduce) {
      :host([variant="glass"]) .dialog {
        background: var(--color-surface-base);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        opacity: 0.98;
      }
      
      .backdrop {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: rgba(0, 0, 0, 0.8);
      }
    }
    
    :host([data-reduced-transparency="reduce"]) :host([variant="glass"]) .dialog {
      background: var(--color-surface-base);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      opacity: 0.98;
    }
    
    :host([data-reduced-transparency="reduce"]) .backdrop {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(0, 0, 0, 0.8);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .dialog,
    :host(.dark) :host([variant="glass"]) .dialog {
      background: var(--color-glass-tintDark);
    }

    .close-button {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s;
    }

    .close-button:hover {
      background: var(--color-glass-tintLight);
    }

    .close-button:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(1rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .dialog {
        animation: none;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' = 'solid';

  @property({ type: String })
  label = 'Dialog';

  @state()
  private _previousFocus: HTMLElement | null = null;

  private _focusableElements: HTMLElement[] = [];
  private _firstFocusable: HTMLElement | null | undefined = null;
  private _lastFocusable: HTMLElement | null | undefined = null;

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
    }

    if (e.key === 'Tab') {
      this._handleTabKey(e);
    }
  };

  private _handleTabKey(e: KeyboardEvent) {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this._focusableElements = Array.from(
      this.shadowRoot?.querySelectorAll(focusableSelectors) || []
    ) as HTMLElement[];

    if (this._focusableElements.length === 0) return;

    this._firstFocusable = this._focusableElements[0];
    this._lastFocusable = this._focusableElements[this._focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === this._firstFocusable) {
        e.preventDefault();
        this._lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === this._lastFocusable) {
        e.preventDefault();
        this._firstFocusable?.focus();
      }
    }
  }

  show() {
    this._previousFocus = document.activeElement as HTMLElement;
    this.open = true;
    
    // Check for reduced transparency preference
    if (prefersReducedTransparency()) {
      this.setAttribute('data-reduced-transparency', 'reduce');
    }
    
    // Wait for render then activate focus trap
    this.updateComplete.then(() => {
      const dialogEl = this.shadowRoot?.querySelector('.dialog') as HTMLElement;
      if (dialogEl) {
        this.focusTrap = new FocusTrap(dialogEl);
        this.focusTrap.activate();
        
        // Listen for escape from focus trap
        dialogEl.addEventListener('escape-pressed', () => this.close());
      }
    });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Announce to screen readers
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('role', 'dialog');
    this.announcer.announce(`${this.label} dialog opened`, 'polite');
  }

  close() {
    this.open = false;
    
    // Deactivate focus trap
    if (this.focusTrap) {
      this.focusTrap.deactivate();
      this.focusTrap = undefined;
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove event listeners
    document.removeEventListener('keydown', this._handleKeyDown);
    
    // Return focus to previous element
    this._previousFocus?.focus();
    this._previousFocus = null;
    
    // Announce to screen readers
    this.announcer.announce('Dialog closed', 'polite');
    
    // Dispatch close event
    this.dispatchEvent(new CustomEvent('glz-dialog-close'));
  }

  private _handleBackdropClick(e: Event) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  override render() {
    return html`
      <div 
        class="backdrop" 
        @click="${this._handleBackdropClick}"
        aria-hidden="true"
      ></div>
      <div 
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-label="${this.label}"
        part="dialog"
      >
        <button
          class="close-button"
          @click="${this.close}"
          aria-label="Close dialog"
          part="close-button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-dialog': GlzDialog;
  }
}
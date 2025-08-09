import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LiveAnnouncer } from '../utils/accessibility.js';

/**
 * An accessible toast notification component with glass morphism variants
 * @element glz-toast
 */
@customElement('glz-toast')
export class GlzToast extends LitElement {
  private announcer = LiveAnnouncer.getInstance();
  static override styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 10000;
      pointer-events: none;
      max-width: 400px;
      margin: 1rem;
    }

    /* Position variants */
    :host([position="top-left"]) {
      top: 0;
      left: 0;
    }

    :host([position="top-center"]) {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="top-right"]) {
      top: 0;
      right: 0;
    }

    :host([position="bottom-left"]) {
      bottom: 0;
      left: 0;
    }

    :host([position="bottom-center"]) {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-right"]) {
      bottom: 0;
      right: 0;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: var(--radius-md);
      box-shadow: var(--elevation-2);
      margin-bottom: 0.5rem;
      pointer-events: auto;
      animation: slideIn 0.3s ease;
      transition: opacity 0.3s, transform 0.3s;
    }

    :host([closing]) .toast {
      opacity: 0;
      transform: translateX(100%);
    }

    /* Variant styles */
    :host([variant="solid"]) .toast {
      background: var(--color-surface-base);
      color: var(--color-surface-on);
      border: 1px solid var(--color-glass-border);
    }

    :host([variant="glass"]) .toast {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-lg));
      -webkit-backdrop-filter: blur(var(--blur-lg));
      border: 1px solid var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .toast,
    :host(.dark) :host([variant="glass"]) .toast {
      background: var(--color-glass-tintDark);
    }

    /* Type styles */
    :host([type="success"]) .icon {
      color: var(--color-success, #10b981);
    }

    :host([type="error"]) .icon {
      color: var(--color-error, #ef4444);
    }

    :host([type="warning"]) .icon {
      color: var(--color-warning, #f59e0b);
    }

    :host([type="info"]) .icon {
      color: var(--color-info, #3b82f6);
    }

    .icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .title {
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .message {
      font-size: 0.875rem;
      line-height: 1.25rem;
      opacity: 0.9;
    }

    .close-button {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background 0.2s;
      color: currentColor;
      opacity: 0.5;
    }

    .close-button:hover {
      background: var(--color-glass-tintLight);
      opacity: 1;
    }

    .close-button:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }

    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: var(--color-primary-base);
      border-radius: 0 0 var(--radius-md) var(--radius-md);
      animation: progress var(--duration) linear;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    :host([position*="left"]) .toast {
      animation-name: slideInLeft;
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    :host([position*="center"]) .toast {
      animation-name: slideInUp;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(-100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes progress {
      from {
        width: 100%;
      }
      to {
        width: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .toast {
        animation: none;
      }
      .progress-bar {
        animation: none;
        display: none;
      }
    }

    @media (max-width: 640px) {
      :host {
        max-width: calc(100vw - 2rem);
      }
      
      :host([position*="center"]) {
        width: calc(100vw - 2rem);
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' = 'solid';

  @property({ type: String, reflect: true })
  type: 'info' | 'success' | 'warning' | 'error' = 'info';

  @property({ type: String, reflect: true })
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'bottom-right';

  @property({ type: String })
  title = '';

  @property({ type: String })
  message = '';

  @property({ type: Number })
  duration = 5000;

  @property({ type: Boolean })
  closable = true;

  @property({ type: Boolean })
  showProgress = false;

  @property({ type: Boolean, reflect: true })
  open = false;

  @state()
  private _closing = false;

  private _timer?: number;
  private _pauseTimer?: number;

  override connectedCallback() {
    super.connectedCallback();
    if (this.open && this.duration > 0) {
      this._startTimer();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._startTimer();
        this._announceToScreenReaders();
      } else {
        this._clearTimer();
      }
    }
  }

  private _startTimer() {
    if (this.duration <= 0) return;
    
    this._clearTimer();
    this._timer = window.setTimeout(() => {
      this.close();
    }, this.duration);
  }

  private _clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = undefined;
    }
    if (this._pauseTimer) {
      clearTimeout(this._pauseTimer);
      this._pauseTimer = undefined;
    }
  }

  private _handleMouseEnter = () => {
    this._clearTimer();
  }

  private _handleMouseLeave = () => {
    this._startTimer();
  }

  private _announceToScreenReaders() {
    // Use centralized live announcer for screen reader announcements
    const announcement = `${this.type} notification: ${this.title || ''} ${this.message}`;
    const priority = this.type === 'error' ? 'assertive' : 'polite';
    this.announcer.announce(announcement, priority);
  }

  show() {
    this.open = true;
    this._closing = false;
  }

  close() {
    this._closing = true;
    this.toggleAttribute('closing', true);
    
    setTimeout(() => {
      this.open = false;
      this._closing = false;
      this.toggleAttribute('closing', false);
      
      this.dispatchEvent(new CustomEvent('glz-toast-close', {
        bubbles: true,
        composed: true
      }));
    }, 300);
  }

  private _handleClose() {
    this.close();
  }

  private _getIcon() {
    switch (this.type) {
      case 'success':
        return html`
          <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
        `;
      case 'error':
        return html`
          <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        `;
      case 'warning':
        return html`
          <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        `;
      case 'info':
      default:
        return html`
          <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
        `;
    }
  }

  override render() {
    if (!this.open && !this._closing) return html``;

    return html`
      <div 
        class="toast"
        role="alert"
        aria-live="${this.type === 'error' ? 'assertive' : 'polite'}"
        aria-atomic="true"
        @mouseenter="${this._handleMouseEnter}"
        @mouseleave="${this._handleMouseLeave}"
        part="toast"
      >
        ${this._getIcon()}
        
        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : ''}
          ${this.message ? html`<div class="message">${this.message}</div>` : ''}
        </div>
        
        ${this.closable ? html`
          <button
            class="close-button"
            @click="${this._handleClose}"
            aria-label="Close notification"
            part="close-button"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"/>
            </svg>
          </button>
        ` : ''}
        
        ${this.showProgress && this.duration > 0 ? html`
          <div 
            class="progress-bar" 
            style="--duration: ${this.duration}ms"
            part="progress"
          ></div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-toast': GlzToast;
  }
}
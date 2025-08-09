import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * An accessible input component with glass morphism variants
 * @element glz-input
 */
@customElement('glz-input')
export class GlzInput extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      width: 100%;
      max-width: var(--max-width, 100%);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-bg-on);
      margin-bottom: 0.25rem;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      width: 100%;
      padding: var(--padding-y) var(--padding-x);
      font-size: var(--font-size);
      min-height: var(--height);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-glass-border);
      font-family: inherit;
      background: transparent;
      color: var(--color-bg-on);
      transition: all 0.2s ease;
      outline: none;
    }

    input::placeholder {
      color: var(--color-bg-on);
      opacity: 0.5;
    }

    /* Size variants */
    :host([size="sm"]) input {
      --padding-x: 0.75rem;
      --padding-y: 0.375rem;
      --font-size: 0.875rem;
      --height: 2rem;
    }

    :host([size="md"]) input {
      --padding-x: 1rem;
      --padding-y: 0.5rem;
      --font-size: 1rem;
      --height: 2.5rem;
    }

    :host([size="lg"]) input {
      --padding-x: 1.25rem;
      --padding-y: 0.625rem;
      --font-size: 1.125rem;
      --height: 3rem;
    }

    /* Variant styles */
    :host([variant="solid"]) input {
      background: var(--color-surface-base);
      border-color: var(--color-glass-border);
    }

    :host([variant="glass"]) input {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-md));
      -webkit-backdrop-filter: blur(var(--blur-md));
      border-color: var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) input,
    :host(.dark) :host([variant="glass"]) input {
      background: var(--color-glass-tintDark);
    }

    :host([variant="subtle"]) input {
      background: transparent;
      border-color: var(--color-glass-border);
    }

    /* Focus styles */
    input:focus {
      border-color: var(--color-primary-base);
      box-shadow: 0 0 0 3px var(--color-primary-base-20);
    }

    /* Error state */
    :host([error]) input {
      border-color: var(--color-error, #ef4444);
    }

    :host([error]) input:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    .error-message {
      font-size: 0.875rem;
      color: var(--color-error, #ef4444);
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* Disabled state */
    input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Icons */
    .icon-start,
    .icon-end {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      color: var(--color-bg-on);
      opacity: 0.5;
    }

    .icon-start {
      left: var(--padding-x);
    }

    .icon-end {
      right: var(--padding-x);
    }

    :host([has-icon-start]) input {
      padding-left: calc(var(--padding-x) * 2.5);
    }

    :host([has-icon-end]) input {
      padding-right: calc(var(--padding-x) * 2.5);
    }

    /* Helper text */
    .helper-text {
      font-size: 0.875rem;
      color: var(--color-bg-on);
      opacity: 0.7;
      margin-top: 0.25rem;
    }

    /* Required indicator */
    .required {
      color: var(--color-error, #ef4444);
      margin-left: 0.25rem;
    }

    @media (prefers-reduced-motion: reduce) {
      input {
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' | 'subtle' = 'solid';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
  type: string = 'text';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  name = '';

  @property({ type: String })
  inputId = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String })
  errorMessage = '';

  @property({ type: String })
  helperText = '';

  @property({ type: String })
  pattern = '';

  @property({ type: Number })
  minlength?: number;

  @property({ type: Number })
  maxlength?: number;

  @property({ type: String })
  min = '';

  @property({ type: String })
  max = '';

  @property({ type: Number })
  step?: number;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: String })
  autocomplete = '';

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = '';

  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedby = '';

  @state()
  private _hasIconStart = false;

  @state()
  private _hasIconEnd = false;

  private _inputElement?: HTMLInputElement;

  override firstUpdated() {
    this._inputElement = this.shadowRoot?.querySelector('input') || undefined;
    this._checkSlots();
  }

  private _checkSlots() {
    const iconStartSlot = this.shadowRoot?.querySelector('slot[name="icon-start"]') as HTMLSlotElement;
    const iconEndSlot = this.shadowRoot?.querySelector('slot[name="icon-end"]') as HTMLSlotElement;
    
    this._hasIconStart = iconStartSlot?.assignedElements().length > 0;
    this._hasIconEnd = iconEndSlot?.assignedElements().length > 0;
    
    this.toggleAttribute('has-icon-start', this._hasIconStart);
    this.toggleAttribute('has-icon-end', this._hasIconEnd);
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    
    // Clear error on input if error is shown
    if (this.error) {
      this.error = false;
    }
    
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleBlur(_e: FocusEvent) {
    this.dispatchEvent(new CustomEvent('blur', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
    
    // Validate on blur if required
    if (this.required && !this.value) {
      this.error = true;
      if (!this.errorMessage) {
        this.errorMessage = 'This field is required';
      }
    }
  }

  private _handleFocus(_e: FocusEvent) {
    this.dispatchEvent(new CustomEvent('focus', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleSlotChange() {
    this._checkSlots();
  }

  // Public methods
  focus() {
    this._inputElement?.focus();
  }

  blur() {
    this._inputElement?.blur();
  }

  select() {
    this._inputElement?.select();
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
    this._inputElement?.setSelectionRange(start, end, direction);
  }

  checkValidity() {
    return this._inputElement?.checkValidity() || false;
  }

  reportValidity() {
    return this._inputElement?.reportValidity() || false;
  }

  /**
   * Set error state and message
   */
  setError(message: string) {
    this.error = !!message;
    this.errorMessage = message;
  }

  /**
   * Reset the input to initial state
   */
  reset() {
    this.value = '';
    this.error = false;
    this.errorMessage = '';
    if (this._inputElement) {
      this._inputElement.value = '';
    }
  }

  override render() {
    const inputId = this.inputId || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    
    const ariaDescribedby = [
      this.ariaDescribedby,
      this.error && this.errorMessage ? errorId : '',
      this.helperText ? helperId : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="input-wrapper">
        ${this.label ? html`
          <label for="${inputId}">
            ${this.label}
            ${this.required ? html`<span class="required" aria-label="required">*</span>` : ''}
          </label>
        ` : ''}
        
        <div class="input-container">
          <span class="icon-start">
            <slot name="icon-start" @slotchange="${this._handleSlotChange}"></slot>
          </span>
          
          <input
            id="${inputId}"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            pattern="${this.pattern}"
            minlength="${this.minlength || ''}"
            maxlength="${this.maxlength || ''}"
            min="${this.min}"
            max="${this.max}"
            step="${this.step || ''}"
            name="${this.name}"
            autocomplete="${this.autocomplete}"
            aria-label="${this.ariaLabel || this.label}"
            aria-describedby="${ariaDescribedby || nothing}"
            aria-invalid="${this.error}"
            aria-required="${this.required}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
            @blur="${this._handleBlur}"
            @focus="${this._handleFocus}"
            part="input"
          />
          
          <span class="icon-end">
            <slot name="icon-end" @slotchange="${this._handleSlotChange}"></slot>
          </span>
        </div>
        
        ${this.error && this.errorMessage ? html`
          <div class="error-message" id="${errorId}" role="alert" aria-live="polite">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9-3a1 1 0 11-2 0 1 1 0 012 0zM8 7a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 7z"/>
            </svg>
            ${this.errorMessage}
          </div>
        ` : ''}
        
        ${this.helperText && !this.error ? html`
          <div class="helper-text" id="${helperId}">
            ${this.helperText}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-input': GlzInput;
  }
}
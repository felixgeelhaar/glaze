import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * An accessible select dropdown component with glass morphism variants
 * @element glz-select
 */
@customElement('glz-select')
export class GlzSelect extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      width: 100%;
      max-width: var(--max-width, 100%);
      position: relative;
    }

    .select-wrapper {
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

    .select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--padding-y) var(--padding-x);
      font-size: var(--font-size);
      min-height: var(--height);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-glass-border);
      font-family: inherit;
      background: transparent;
      color: var(--color-bg-on);
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      text-align: left;
    }

    .select-trigger:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Size variants */
    :host([size="sm"]) .select-trigger {
      --padding-x: 0.75rem;
      --padding-y: 0.375rem;
      --font-size: 0.875rem;
      --height: 2rem;
    }

    :host([size="md"]) .select-trigger {
      --padding-x: 1rem;
      --padding-y: 0.5rem;
      --font-size: 1rem;
      --height: 2.5rem;
    }

    :host([size="lg"]) .select-trigger {
      --padding-x: 1.25rem;
      --padding-y: 0.625rem;
      --font-size: 1.125rem;
      --height: 3rem;
    }

    /* Variant styles */
    :host([variant="solid"]) .select-trigger {
      background: var(--color-surface-base);
    }

    :host([variant="glass"]) .select-trigger {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-md));
      -webkit-backdrop-filter: blur(var(--blur-md));
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .select-trigger,
    :host(.dark) :host([variant="glass"]) .select-trigger {
      background: var(--color-glass-tintDark);
    }

    :host([variant="subtle"]) .select-trigger {
      background: transparent;
    }

    /* Focus styles */
    .select-trigger:focus-visible {
      border-color: var(--color-primary-base);
      box-shadow: 0 0 0 3px var(--color-primary-base-20);
    }

    /* Open state */
    :host([open]) .select-trigger {
      border-color: var(--color-primary-base);
    }

    :host([open]) .chevron {
      transform: rotate(180deg);
    }

    /* Error state */
    :host([error]) .select-trigger {
      border-color: var(--color-error, #ef4444);
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: 0;
      right: 0;
      z-index: 1000;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-glass-border);
      overflow: hidden;
      box-shadow: var(--elevation-2);
      max-height: 300px;
      overflow-y: auto;
      opacity: 0;
      transform: translateY(-0.5rem);
      pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
    }

    :host([open]) .dropdown {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    :host([variant="solid"]) .dropdown {
      background: var(--color-surface-base);
    }

    :host([variant="glass"]) .dropdown {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-lg));
      -webkit-backdrop-filter: blur(var(--blur-lg));
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .dropdown,
    :host(.dark) :host([variant="glass"]) .dropdown {
      background: var(--color-glass-tintDark);
    }

    :host([variant="subtle"]) .dropdown {
      background: var(--color-surface-base);
    }

    .option {
      padding: 0.5rem var(--padding-x);
      cursor: pointer;
      transition: background 0.15s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .option:hover:not(.disabled) {
      background: var(--color-glass-tintLight);
    }

    .option:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: -2px;
    }

    .option.selected {
      background: var(--color-primary-base-10);
      font-weight: 500;
    }

    .option.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .option.highlighted {
      background: var(--color-glass-tintLight);
    }

    .checkmark {
      width: 1rem;
      height: 1rem;
      opacity: 0;
    }

    .option.selected .checkmark {
      opacity: 1;
    }

    .placeholder {
      color: var(--color-bg-on);
      opacity: 0.5;
    }

    .chevron {
      transition: transform 0.2s;
      flex-shrink: 0;
    }

    /* Helper text */
    .helper-text {
      font-size: 0.875rem;
      color: var(--color-bg-on);
      opacity: 0.7;
      margin-top: 0.25rem;
    }

    .error-message {
      font-size: 0.875rem;
      color: var(--color-error, #ef4444);
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* Required indicator */
    .required {
      color: var(--color-error, #ef4444);
      margin-left: 0.25rem;
    }

    @media (prefers-reduced-motion: reduce) {
      .select-trigger,
      .dropdown,
      .option,
      .chevron {
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' | 'subtle' = 'solid';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Select an option';

  @property({ type: String })
  label = '';

  @property({ type: String })
  name = '';

  @property({ type: Array })
  options: SelectOption[] = [];

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

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean })
  multiple = false;

  @state()
  private _highlightedIndex = -1;

  @state()
  private _selectedValues: Set<string> = new Set();

  @state()
  private _searchQuery = '';

  private _triggerElement?: HTMLButtonElement;
  private _searchTimeout?: number;
  private _lastSearchTime = 0;

  override firstUpdated() {
    this._triggerElement = this.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    
    // Initialize selected values
    if (this.value) {
      if (this.multiple) {
        this.value.split(',').forEach(v => this._selectedValues.add(v.trim()));
      } else {
        this._selectedValues.add(this.value);
      }
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocumentClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick);
  }

  private _handleDocumentClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node) && this.open) {
      this.open = false;
    }
  };

  private _toggleDropdown() {
    if (this.disabled) return;
    this.open = !this.open;
    
    if (this.open) {
      this._highlightedIndex = this._getSelectedIndex();
    }
  }

  private _getSelectedIndex(): number {
    if (!this.value) return -1;
    return this.options.findIndex(opt => opt.value === this.value);
  }

  private _selectOption(option: SelectOption, _index: number) {
    if (option.disabled) return;

    if (this.multiple) {
      if (this._selectedValues.has(option.value)) {
        this._selectedValues.delete(option.value);
      } else {
        this._selectedValues.add(option.value);
      }
      this.value = Array.from(this._selectedValues).join(', ');
    } else {
      this._selectedValues.clear();
      this._selectedValues.add(option.value);
      this.value = option.value;
      this.open = false;
    }

    // Clear error on selection
    if (this.error) {
      this.error = false;
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value, option },
      bubbles: true,
      composed: true
    }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.open && this._highlightedIndex >= 0) {
          const option = this.options[this._highlightedIndex];
          if (option) {
            this._selectOption(option, this._highlightedIndex);
          }
        } else {
          this.open = true;
        }
        break;

      case 'Escape':
        e.preventDefault();
        this.open = false;
        this._triggerElement?.focus();
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) {
          this.open = true;
        } else {
          this._highlightedIndex = Math.min(
            this._highlightedIndex + 1,
            this.options.length - 1
          );
          this._scrollToHighlighted();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (this.open) {
          this._highlightedIndex = Math.max(this._highlightedIndex - 1, 0);
          this._scrollToHighlighted();
        }
        break;

      case 'Home':
        if (this.open) {
          e.preventDefault();
          this._highlightedIndex = 0;
          this._scrollToHighlighted();
        }
        break;

      case 'End':
        if (this.open) {
          e.preventDefault();
          this._highlightedIndex = this.options.length - 1;
          this._scrollToHighlighted();
        }
        break;
        
      default:
        // Typeahead search
        if (this.open && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          this._handleTypeahead(e.key);
        }
        break;
    }
  }
  
  private _handleTypeahead(char: string) {
    const now = Date.now();
    
    // Reset search if more than 1 second has passed
    if (now - this._lastSearchTime > 1000) {
      this._searchQuery = '';
    }
    
    this._searchQuery += char.toLowerCase();
    this._lastSearchTime = now;
    
    // Clear existing timeout
    if (this._searchTimeout) {
      clearTimeout(this._searchTimeout);
    }
    
    // Reset search after 1 second of inactivity
    this._searchTimeout = window.setTimeout(() => {
      this._searchQuery = '';
    }, 1000);
    
    // Find matching option
    const matchIndex = this.options.findIndex(opt => 
      opt.label.toLowerCase().startsWith(this._searchQuery)
    );
    
    if (matchIndex >= 0) {
      this._highlightedIndex = matchIndex;
      this._scrollToHighlighted();
      
      // Announce to screen readers
      const option = this.options[matchIndex];
      if (option) {
        this._announceOption(option.label);
      }
    }
  }
  
  private _announceOption(label: string) {
    // Create a temporary live region for announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.textContent = `${label} highlighted`;
    
    document.body.appendChild(liveRegion);
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 100);
  }

  private _scrollToHighlighted() {
    const dropdown = this.shadowRoot?.querySelector('.dropdown');
    const highlighted = this.shadowRoot?.querySelectorAll('.option')[this._highlightedIndex] as HTMLElement;
    
    if (dropdown && highlighted) {
      const dropdownRect = dropdown.getBoundingClientRect();
      const highlightedRect = highlighted.getBoundingClientRect();
      
      if (highlightedRect.bottom > dropdownRect.bottom) {
        dropdown.scrollTop += highlightedRect.bottom - dropdownRect.bottom;
      } else if (highlightedRect.top < dropdownRect.top) {
        dropdown.scrollTop -= dropdownRect.top - highlightedRect.top;
      }
    }
  }

  private _getDisplayValue(): string {
    if (this.multiple) {
      const selectedOptions = this.options.filter(opt => 
        this._selectedValues.has(opt.value)
      );
      return selectedOptions.map(opt => opt.label).join(', ') || this.placeholder;
    } else {
      const selected = this.options.find(opt => opt.value === this.value);
      return selected?.label || this.placeholder;
    }
  }

  // Public methods
  focus() {
    this._triggerElement?.focus();
  }

  blur() {
    this._triggerElement?.blur();
  }

  /**
   * Set error state and message
   */
  setError(message: string) {
    this.error = !!message;
    this.errorMessage = message;
  }

  /**
   * Reset the select to initial state
   */
  reset() {
    this.value = '';
    this.error = false;
    this.errorMessage = '';
    this._selectedValues.clear();
    this._highlightedIndex = -1;
    this.open = false;
  }

  override render() {
    const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const displayValue = this._getDisplayValue();
    const isPlaceholder = displayValue === this.placeholder;

    return html`
      <div class="select-wrapper">
        ${this.label ? html`
          <label for="${selectId}">
            ${this.label}
            ${this.required ? html`<span class="required" aria-label="required">*</span>` : ''}
          </label>
        ` : ''}
        
        <button
          id="${selectId}"
          class="select-trigger"
          type="button"
          ?disabled="${this.disabled}"
          @click="${this._toggleDropdown}"
          @keydown="${this._handleKeyDown}"
          aria-haspopup="listbox"
          aria-expanded="${this.open}"
          aria-labelledby="${this.label ? selectId : nothing}"
          aria-describedby="${this.error && this.errorMessage ? errorId : this.helperText ? helperId : nothing}"
          aria-invalid="${this.error}"
          aria-required="${this.required}"
          part="trigger"
        >
          <span class="${isPlaceholder ? 'placeholder' : ''}">
            ${displayValue}
          </span>
          <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.5 5L8 8.5L11.5 5L12.5 6L8 10.5L3.5 6L4.5 5Z"/>
          </svg>
        </button>
        
        <div 
          class="dropdown"
          role="listbox"
          aria-multiselectable="${this.multiple}"
          part="dropdown"
        >
          ${this.options.map((option, index) => {
            const isSelected = this._selectedValues.has(option.value);
            const isHighlighted = index === this._highlightedIndex;
            
            return html`
              <div
                class="option ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''} ${isHighlighted ? 'highlighted' : ''}"
                role="option"
                tabindex="${option.disabled ? -1 : 0}"
                aria-selected="${isSelected}"
                aria-disabled="${option.disabled}"
                @click="${() => this._selectOption(option, index)}"
                @mouseenter="${() => this._highlightedIndex = index}"
                part="option"
              >
                ${this.multiple ? html`
                  <svg class="checkmark" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                  </svg>
                ` : ''}
                ${option.label}
              </div>
            `;
          })}
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
    'glz-select': GlzSelect;
  }
}
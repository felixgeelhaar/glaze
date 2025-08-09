import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PositionManager, AutoUpdatePosition } from '../utils/positioning.js';
import { FocusTrap, RovingTabindex } from '../utils/accessibility.js';
import type { Position, Alignment } from '../utils/positioning.js';

/**
 * An accessible dropdown menu component with keyboard navigation
 * @element glz-dropdown
 */
@customElement('glz-dropdown')
export class GlzDropdown extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    .trigger[aria-expanded="true"] {
      z-index: 10001;
    }

    .menu {
      position: fixed;
      z-index: 10000;
      min-width: 180px;
      max-width: 320px;
      padding: 0.5rem 0;
      background: var(--color-bg-base);
      border-radius: var(--radius-md);
      box-shadow: var(--elevation-2);
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
      transform-origin: top center;
      transition: opacity 0.2s ease, transform 0.2s ease;
      pointer-events: none;
      overflow: hidden;
    }

    :host([variant="glass"]) .menu {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-md));
      -webkit-backdrop-filter: blur(var(--blur-md));
      border: 1px solid var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .menu,
    :host(.dark) :host([variant="glass"]) .menu {
      background: var(--color-glass-tintDark);
    }

    .menu[data-show] {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .menu-section {
      padding: 0.25rem 0;
    }

    .menu-section + .menu-section {
      border-top: 1px solid var(--color-glass-border);
    }

    .menu-section-title {
      padding: 0.5rem 1rem 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.6;
    }

    ::slotted([slot="item"]),
    ::slotted([role="menuitem"]) {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--color-bg-on);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background-color 0.15s ease;
      text-decoration: none;
      outline: none;
    }

    ::slotted([slot="item"]:hover),
    ::slotted([role="menuitem"]:hover) {
      background: var(--color-surface-base);
    }

    ::slotted([slot="item"]:focus-visible),
    ::slotted([role="menuitem"]:focus-visible) {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      outline: 2px solid var(--color-primary-base);
      outline-offset: -2px;
    }

    ::slotted([slot="item"][disabled]),
    ::slotted([role="menuitem"][disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    ::slotted([slot="item"][data-destructive]),
    ::slotted([role="menuitem"][data-destructive]) {
      color: #EF4444;
    }

    .menu-search {
      padding: 0.5rem;
      border-bottom: 1px solid var(--color-glass-border);
    }

    .search-input {
      width: 100%;
      padding: 0.5rem;
      font-size: 0.875rem;
      background: var(--color-surface-base);
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-sm);
      outline: none;
      transition: border-color 0.15s ease;
    }

    .search-input:focus {
      border-color: var(--color-primary-base);
    }

    .menu-footer {
      padding: 0.5rem;
      border-top: 1px solid var(--color-glass-border);
      font-size: 0.75rem;
      opacity: 0.8;
    }

    @media (prefers-reduced-motion: reduce) {
      .menu {
        transition: opacity 0.01ms;
      }
    }

    @media (max-width: 640px) {
      .menu {
        min-width: min(280px, calc(100vw - 32px));
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' = 'solid';

  @property({ type: String })
  position: Position = 'auto';

  @property({ type: String })
  alignment: Alignment = 'start';

  @property({ type: Number })
  offset = 4;

  @property({ type: String })
  trigger: 'click' | 'hover' | 'contextmenu' = 'click';

  @property({ type: Boolean })
  closeOnSelect = true;

  @property({ type: Boolean })
  closeOnOutsideClick = true;

  @property({ type: Boolean })
  closeOnEscape = true;

  @property({ type: Boolean })
  searchable = false;

  @property({ type: String })
  searchPlaceholder = 'Search...';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _isOpen = false;

  @state()
  private _searchQuery = '';

  private _triggerElement?: HTMLElement;
  private _menuElement?: HTMLElement;
  private _searchInput?: HTMLInputElement;
  private _positionManager = PositionManager.getInstance();
  private _autoUpdate?: AutoUpdatePosition;
  private _focusTrap?: FocusTrap;
  private _closeTimeout?: number;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
    this._cleanup();
  }

  override firstUpdated() {
    this._triggerElement = this.shadowRoot?.querySelector('.trigger') as HTMLElement;
    this._menuElement = this.shadowRoot?.querySelector('.menu') as HTMLElement;
    this._searchInput = this.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    
    if (this._triggerElement) {
      this._setupTriggers();
    }
    
    // Set up menu items
    this._setupMenuItems();
  }

  private _setupTriggers() {
    if (!this._triggerElement) return;

    // Set up ARIA attributes
    this._triggerElement.setAttribute('aria-haspopup', 'true');
    this._triggerElement.setAttribute('aria-expanded', String(this._isOpen));
    
    switch (this.trigger) {
      case 'click':
        this._triggerElement.addEventListener('click', this._handleTriggerClick);
        break;
      case 'hover':
        this._triggerElement.addEventListener('mouseenter', this._handleMouseEnter);
        this._triggerElement.addEventListener('mouseleave', this._handleMouseLeave);
        if (this._menuElement) {
          this._menuElement.addEventListener('mouseenter', this._handleMenuMouseEnter);
          this._menuElement.addEventListener('mouseleave', this._handleMenuMouseLeave);
        }
        break;
      case 'contextmenu':
        this._triggerElement.addEventListener('contextmenu', this._handleContextMenu);
        break;
    }
    
    if (this.closeOnOutsideClick) {
      document.addEventListener('click', this._handleDocumentClick);
    }
  }

  private _setupMenuItems() {
    const items = this.querySelectorAll('[slot="item"], [role="menuitem"]');
    
    items.forEach((item) => {
      if (!item.hasAttribute('role')) {
        item.setAttribute('role', 'menuitem');
      }
      
      if (!item.hasAttribute('tabindex')) {
        item.setAttribute('tabindex', '-1');
      }
      
      item.addEventListener('click', this._handleItemClick);
      item.addEventListener('keydown', this._handleItemKeyDown as EventListener);
    });
    
    // Set up roving tabindex for keyboard navigation
    if (this._menuElement && items.length > 0) {
      new RovingTabindex(this._menuElement, 'vertical');
      // Initialize roving tabindex on items
      items.forEach((item, index) => {
        if (index === 0) {
          item.setAttribute('tabindex', '0');
        }
      });
    }
  }

  private _cleanup() {
    if (this._triggerElement) {
      this._triggerElement.removeEventListener('click', this._handleTriggerClick);
      this._triggerElement.removeEventListener('mouseenter', this._handleMouseEnter);
      this._triggerElement.removeEventListener('mouseleave', this._handleMouseLeave);
      this._triggerElement.removeEventListener('contextmenu', this._handleContextMenu);
    }
    
    if (this._menuElement) {
      this._menuElement.removeEventListener('mouseenter', this._handleMenuMouseEnter);
      this._menuElement.removeEventListener('mouseleave', this._handleMenuMouseLeave);
    }
    
    document.removeEventListener('click', this._handleDocumentClick);
    
    const items = this.querySelectorAll('[slot="item"], [role="menuitem"]');
    items.forEach((item) => {
      item.removeEventListener('click', this._handleItemClick);
      item.removeEventListener('keydown', this._handleItemKeyDown as EventListener);
    });
    
    this._clearCloseTimeout();
    this._autoUpdate?.stop();
    this._focusTrap?.deactivate();
  }

  private _handleTriggerClick = (e: Event) => {
    if (this.disabled) return;
    e.stopPropagation();
    this.toggle();
  };

  private _handleMouseEnter = () => {
    if (this.disabled) return;
    this._clearCloseTimeout();
    this.open();
  };

  private _handleMouseLeave = () => {
    this._scheduleClose();
  };

  private _handleMenuMouseEnter = () => {
    this._clearCloseTimeout();
  };

  private _handleMenuMouseLeave = () => {
    this._scheduleClose();
  };

  private _handleContextMenu = (e: Event) => {
    if (this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.open();
  };

  private _handleDocumentClick = (e: Event) => {
    if (!this.contains(e.target as Node) && this._isOpen) {
      this.close();
    }
  };

  private _handleItemClick = (e: Event) => {
    const item = e.currentTarget as HTMLElement;
    
    if (item.hasAttribute('disabled')) {
      e.preventDefault();
      return;
    }
    
    this.dispatchEvent(new CustomEvent('glz-dropdown-select', {
      detail: { item },
      bubbles: true,
      composed: true
    }));
    
    if (this.closeOnSelect) {
      this.close();
    }
  };

  private _handleItemKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleItemClick(e);
    }
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (!this._isOpen) {
      if ((e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') && 
          this._triggerElement?.contains(e.target as Node)) {
        e.preventDefault();
        this.open();
      }
      return;
    }
    
    switch (e.key) {
      case 'Escape':
        if (this.closeOnEscape) {
          e.preventDefault();
          this.close();
          this._triggerElement?.focus();
        }
        break;
      case 'Tab':
        // Let focus trap handle tab
        break;
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Home':
      case 'End':
        // Let roving tabindex handle navigation
        break;
    }
  };

  private _handleSearchInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this._searchQuery = input.value;
    this._filterItems();
  };

  private _filterItems() {
    const items = this.querySelectorAll('[slot="item"], [role="menuitem"]');
    const query = this._searchQuery.toLowerCase();
    
    items.forEach((item) => {
      const text = item.textContent?.toLowerCase() || '';
      const matches = text.includes(query);
      (item as HTMLElement).style.display = matches ? '' : 'none';
    });
  }

  private _scheduleClose() {
    this._clearCloseTimeout();
    this._closeTimeout = window.setTimeout(() => {
      this.close();
    }, 150);
  }

  private _clearCloseTimeout() {
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
  }

  private _updatePosition() {
    if (!this._triggerElement || !this._menuElement || !this._isOpen) return;
    
    const result = this._positionManager.calculatePosition(
      this._triggerElement,
      this._menuElement,
      {
        position: this.position,
        alignment: this.alignment,
        offset: this.offset
      }
    );
    
    this._menuElement.style.left = `${result.x}px`;
    this._menuElement.style.top = `${result.y}px`;
    
    // Update transform origin for animation
    const origins: Record<string, string> = {
      top: 'bottom center',
      bottom: 'top center',
      left: 'right center',
      right: 'left center'
    };
    this._menuElement.style.transformOrigin = origins[result.actualPosition] || 'top center';
  }

  /**
   * Open the dropdown menu
   */
  open() {
    if (this.disabled || this._isOpen) return;
    
    this._isOpen = true;
    this._triggerElement?.setAttribute('aria-expanded', 'true');
    this.requestUpdate();
    
    // Wait for render then position
    this.updateComplete.then(() => {
      this._updatePosition();
      
      // Set up auto-update
      if (this._triggerElement && this._menuElement) {
        this._autoUpdate = new AutoUpdatePosition(
          this._triggerElement,
          this._menuElement,
          () => this._updatePosition()
        );
        this._autoUpdate.start();
      }
      
      // Set up focus trap
      if (this._menuElement) {
        this._focusTrap = new FocusTrap(this._menuElement);
        this._focusTrap.activate();
      }
      
      // Trigger show animation
      requestAnimationFrame(() => {
        this._menuElement?.setAttribute('data-show', '');
        
        // Focus first item or search input
        if (this.searchable && this._searchInput) {
          this._searchInput.focus();
        } else {
          const firstItem = this.querySelector('[slot="item"]:not([disabled]), [role="menuitem"]:not([disabled])') as HTMLElement;
          firstItem?.focus();
        }
      });
    });
    
    this.dispatchEvent(new CustomEvent('glz-dropdown-open', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Close the dropdown menu
   */
  close() {
    if (!this._isOpen) return;
    
    this._isOpen = false;
    this._triggerElement?.setAttribute('aria-expanded', 'false');
    this._menuElement?.removeAttribute('data-show');
    this._autoUpdate?.stop();
    this._focusTrap?.deactivate();
    
    // Clear search
    this._searchQuery = '';
    if (this._searchInput) {
      this._searchInput.value = '';
    }
    this._filterItems();
    
    this.dispatchEvent(new CustomEvent('glz-dropdown-close', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Toggle dropdown visibility
   */
  toggle() {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  override render() {
    return html`
      <div class="trigger" part="trigger">
        <slot name="trigger"></slot>
      </div>
      
      ${this._isOpen ? html`
        <div 
          class="menu"
          role="menu"
          part="menu"
          @click=${(e: Event) => e.stopPropagation()}
        >
          ${this.searchable ? html`
            <div class="menu-search" part="search">
              <input
                type="text"
                class="search-input"
                placeholder="${this.searchPlaceholder}"
                @input=${this._handleSearchInput}
                aria-label="Search menu items"
              />
            </div>
          ` : ''}
          
          <slot name="header"></slot>
          
          <div class="menu-section" part="items">
            <slot name="item"></slot>
            <slot></slot>
          </div>
          
          <slot name="footer"></slot>
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-dropdown': GlzDropdown;
  }
}
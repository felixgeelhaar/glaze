import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An accessible navigation bar component with glass morphism variants
 * @element glz-navbar
 */
@customElement('glz-navbar')
export class GlzNavbar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--padding-y) var(--padding-x);
      min-height: var(--height);
      transition: all 0.3s ease;
    }

    /* Size variants */
    :host([size="sm"]) nav {
      --padding-x: 1rem;
      --padding-y: 0.5rem;
      --height: 3rem;
    }

    :host([size="md"]) nav {
      --padding-x: 1.5rem;
      --padding-y: 0.75rem;
      --height: 4rem;
    }

    :host([size="lg"]) nav {
      --padding-x: 2rem;
      --padding-y: 1rem;
      --height: 5rem;
    }

    /* Variant styles */
    :host([variant="solid"]) nav {
      background: var(--color-surface-base);
      border-bottom: 1px solid var(--color-glass-border);
    }

    :host([variant="glass"]) nav {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-lg));
      -webkit-backdrop-filter: blur(var(--blur-lg));
      border-bottom: 1px solid var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) nav,
    :host(.dark) :host([variant="glass"]) nav {
      background: var(--color-glass-tintDark);
    }

    :host([variant="subtle"]) nav {
      background: transparent;
      border-bottom: 1px solid var(--color-glass-border);
    }

    /* Fixed positioning */
    :host([fixed]) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    /* Sticky positioning */
    :host([sticky]) {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    /* Elevated shadow */
    :host([elevated]) nav {
      box-shadow: var(--elevation-1);
      border-bottom: none;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-bg-on);
      text-decoration: none;
      transition: opacity 0.2s;
    }

    .brand:hover {
      opacity: 0.8;
    }

    .brand:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    .nav-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 auto;
    }

    ::slotted(a),
    ::slotted(button) {
      padding: 0.5rem 1rem;
      color: var(--color-bg-on);
      text-decoration: none;
      border-radius: var(--radius-sm);
      transition: background 0.2s, color 0.2s;
      cursor: pointer;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 1rem;
    }

    ::slotted(a:hover),
    ::slotted(button:hover) {
      background: var(--color-glass-tintLight);
    }

    ::slotted(a:focus-visible),
    ::slotted(button:focus-visible) {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }

    ::slotted(a[aria-current="page"]),
    ::slotted(a.active) {
      background: var(--color-primary-base-10);
      color: var(--color-primary-base);
      font-weight: 500;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Mobile menu */
    .mobile-toggle {
      display: none;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.5rem;
      background: transparent;
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s;
      color: var(--color-bg-on);
    }

    .mobile-toggle:hover {
      background: var(--color-glass-tintLight);
    }

    .mobile-toggle:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      width: 100%;
      height: 100%;
    }

    .hamburger span {
      display: block;
      height: 2px;
      background: currentColor;
      border-radius: 1px;
      transition: all 0.3s;
      transform-origin: center;
    }

    :host([mobile-open]) .hamburger span:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }

    :host([mobile-open]) .hamburger span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }

    :host([mobile-open]) .hamburger span:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--color-surface-base);
      border-bottom: 1px solid var(--color-glass-border);
      box-shadow: var(--elevation-2);
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    :host([variant="glass"]) .mobile-menu {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-lg));
      -webkit-backdrop-filter: blur(var(--blur-lg));
    }

    :host([mobile-open]) .mobile-menu {
      max-height: 50vh;
      overflow-y: auto;
    }

    .mobile-menu ::slotted(*) {
      display: block;
      width: 100%;
      padding: 1rem var(--padding-x);
      text-align: left;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .mobile-toggle {
        display: block;
      }

      .nav-links {
        display: none;
      }

      .mobile-menu {
        display: block;
      }

      :host([mobile-open]) nav {
        border-bottom: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      nav,
      .brand,
      ::slotted(*),
      .mobile-toggle,
      .hamburger span,
      .mobile-menu {
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' | 'subtle' = 'solid';

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
  brand = '';

  @property({ type: String })
  brandHref = '/';

  @property({ type: Boolean, reflect: true })
  fixed = false;

  @property({ type: Boolean, reflect: true })
  sticky = false;

  @property({ type: Boolean, reflect: true })
  elevated = false;

  @property({ type: Boolean, reflect: true, attribute: 'mobile-open' })
  mobileOpen = false;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = 'Main navigation';

  private _handleMobileToggle() {
    this.mobileOpen = !this.mobileOpen;
    
    // Announce state change to screen readers
    const state = this.mobileOpen ? 'expanded' : 'collapsed';
    this._announceToScreenReaders(`Mobile menu ${state}`);
    
    this.dispatchEvent(new CustomEvent('glz-navbar-toggle', {
      detail: { open: this.mobileOpen },
      bubbles: true,
      composed: true
    }));
  }

  private _handleKeyDown(e: KeyboardEvent) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && this.mobileOpen) {
      this.mobileOpen = false;
      const toggle = this.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
      toggle?.focus();
    }
  }

  private _announceToScreenReaders(message: string) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

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
      <nav 
        role="navigation" 
        aria-label="${this.ariaLabel}"
        part="nav"
      >
        ${this.brand ? html`
          <a 
            href="${this.brandHref}" 
            class="brand"
            part="brand"
          >
            <slot name="brand-icon"></slot>
            ${this.brand}
          </a>
        ` : html`
          <div class="brand" part="brand">
            <slot name="brand"></slot>
          </div>
        `}
        
        <div class="nav-content">
          <div class="nav-links" part="links">
            <slot name="nav-links"></slot>
          </div>
        </div>
        
        <div class="nav-actions" part="actions">
          <slot name="nav-actions"></slot>
          
          <button
            class="mobile-toggle"
            @click="${this._handleMobileToggle}"
            aria-expanded="${this.mobileOpen}"
            aria-controls="mobile-menu"
            aria-label="${this.mobileOpen ? 'Close menu' : 'Open menu'}"
            part="mobile-toggle"
          >
            <span class="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>
      
      <div 
        id="mobile-menu"
        class="mobile-menu"
        part="mobile-menu"
      >
        <slot name="mobile-links"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-navbar': GlzNavbar;
  }
}
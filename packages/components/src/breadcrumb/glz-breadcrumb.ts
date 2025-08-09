import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * A breadcrumb navigation component
 * @element glz-breadcrumb
 */
@customElement('glz-breadcrumb')
export class GlzBreadcrumb extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --breadcrumb-font-size: 0.875rem;
      --breadcrumb-gap: 0.5rem;
      --breadcrumb-separator-margin: 0.5rem;
      --breadcrumb-item-padding: 0.25rem 0.5rem;
      --breadcrumb-item-radius: var(--radius-sm);
    }

    :host([size="small"]) {
      --breadcrumb-font-size: 0.75rem;
      --breadcrumb-gap: 0.375rem;
      --breadcrumb-separator-margin: 0.375rem;
      --breadcrumb-item-padding: 0.125rem 0.375rem;
    }

    :host([size="large"]) {
      --breadcrumb-font-size: 1rem;
      --breadcrumb-gap: 0.625rem;
      --breadcrumb-separator-margin: 0.625rem;
      --breadcrumb-item-padding: 0.375rem 0.625rem;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--breadcrumb-gap);
      font-size: var(--breadcrumb-font-size);
    }

    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: var(--breadcrumb-item-padding);
      color: var(--color-bg-on);
      text-decoration: none;
      border-radius: var(--breadcrumb-item-radius);
      transition: all 0.2s ease;
      position: relative;
      white-space: nowrap;
    }

    .breadcrumb-item:not(.breadcrumb-item--current):not(.breadcrumb-item--disabled) {
      cursor: pointer;
      opacity: 0.7;
    }

    .breadcrumb-item:not(.breadcrumb-item--current):not(.breadcrumb-item--disabled):hover {
      opacity: 1;
      background: var(--color-surface-base);
    }

    .breadcrumb-item:not(.breadcrumb-item--current):not(.breadcrumb-item--disabled):focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }

    .breadcrumb-item--current {
      font-weight: 600;
      color: var(--color-primary-base);
      pointer-events: none;
    }

    .breadcrumb-item--disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Glass variant */
    :host([variant="glass"]) .breadcrumb-item:not(.breadcrumb-item--current):not(.breadcrumb-item--disabled):hover {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
      border: 1px solid var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .breadcrumb-item:hover,
    :host(.dark) :host([variant="glass"]) .breadcrumb-item:hover {
      background: var(--color-glass-tintDark);
    }

    /* Pills variant */
    :host([variant="pills"]) .breadcrumb-item {
      background: var(--color-surface-base);
      border: 1px solid var(--color-glass-border);
      padding: var(--breadcrumb-item-padding);
    }

    :host([variant="pills"]) .breadcrumb-item:not(.breadcrumb-item--current):not(.breadcrumb-item--disabled):hover {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: var(--color-primary-base);
      opacity: 1;
    }

    :host([variant="pills"]) .breadcrumb-item--current {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: var(--color-primary-base);
    }

    /* Separator */
    .breadcrumb-separator {
      margin: 0 var(--breadcrumb-separator-margin);
      opacity: 0.4;
      display: inline-flex;
      align-items: center;
      user-select: none;
    }

    .separator-icon {
      width: 1em;
      height: 1em;
    }

    /* Separator styles */
    .separator-slash::before {
      content: '/';
    }

    .separator-gt::before {
      content: '>';
    }

    .separator-dot::before {
      content: '•';
    }

    .separator-dash::before {
      content: '—';
    }

    .separator-arrow::before {
      content: '→';
    }

    /* Icon support */
    .breadcrumb-icon {
      width: 1.125em;
      height: 1.125em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    ::slotted([slot="icon"]) {
      width: 100%;
      height: 100%;
    }

    /* Collapsible for mobile */
    .breadcrumb-ellipsis {
      display: inline-flex;
      align-items: center;
      padding: var(--breadcrumb-item-padding);
      cursor: pointer;
      color: var(--color-bg-on);
      opacity: 0.7;
      border-radius: var(--breadcrumb-item-radius);
      transition: all 0.2s ease;
    }

    .breadcrumb-ellipsis:hover {
      opacity: 1;
      background: var(--color-surface-base);
    }

    /* Collapsed state */
    :host([collapsed]) .breadcrumb-item:not(:first-child):not(:last-child):not(:nth-last-child(2)) {
      display: none;
    }

    :host([collapsed]) .breadcrumb-separator:not(:last-child):not(:nth-last-child(2)) {
      display: none;
    }

    :host([collapsed]) .breadcrumb-ellipsis {
      display: inline-flex;
    }

    :host(:not([collapsed])) .breadcrumb-ellipsis {
      display: none;
    }

    /* With background */
    :host([background]) .breadcrumb {
      background: var(--color-surface-base);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-glass-border);
    }

    /* Responsive */
    @media (max-width: 640px) {
      :host([responsive]) {
        --breadcrumb-font-size: 0.75rem;
        --breadcrumb-gap: 0.375rem;
      }

      :host([responsive]:not([collapsed])) .breadcrumb {
        flex-direction: column;
        align-items: flex-start;
      }

      :host([responsive]:not([collapsed])) .breadcrumb-separator {
        display: none;
      }

      :host([responsive]:not([collapsed])) .breadcrumb-item::before {
        content: '└';
        margin-right: 0.5rem;
        opacity: 0.3;
      }

      :host([responsive]:not([collapsed])) .breadcrumb-item:first-child::before {
        content: '';
        margin: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .breadcrumb-item {
        transition: none;
      }
    }
  `;

  @property({ type: Array })
  items: BreadcrumbItem[] = [];

  @property({ type: String, reflect: true })
  separator: 'chevron' | 'slash' | 'gt' | 'dot' | 'dash' | 'arrow' = 'chevron';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' | 'pills' = 'default';

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Boolean, reflect: true })
  background = false;

  @property({ type: Boolean, reflect: true })
  responsive = true;

  @property({ type: Number })
  maxItems = 0;

  @property({ type: String })
  ariaLabel = 'Breadcrumb navigation';

  @state()
  private _expanded = false;

  private _handleItemClick(item: BreadcrumbItem, index: number) {
    if (item.disabled || index === this.items.length - 1) return;

    if (item.href) {
      // Let the browser handle the navigation
      return;
    }

    this.dispatchEvent(new CustomEvent('glz-breadcrumb-click', {
      detail: { item, index },
      bubbles: true,
      composed: true
    }));
  }

  private _handleEllipsisClick() {
    this._expanded = !this._expanded;
    this.collapsed = !this._expanded;
  }

  private _renderSeparator() {
    if (this.separator === 'chevron') {
      return html`
        <span class="breadcrumb-separator" aria-hidden="true">
          <svg class="separator-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
      `;
    }

    return html`
      <span 
        class="breadcrumb-separator separator-${this.separator}" 
        aria-hidden="true"
      ></span>
    `;
  }

  private _renderItem(item: BreadcrumbItem, index: number) {
    const isLast = index === this.items.length - 1;
    const classes = [
      'breadcrumb-item',
      isLast ? 'breadcrumb-item--current' : '',
      item.disabled ? 'breadcrumb-item--disabled' : ''
    ].filter(Boolean).join(' ');

    const content = html`
      ${item.icon ? html`
        <span class="breadcrumb-icon" aria-hidden="true">
          ${item.icon}
        </span>
      ` : ''}
      <span>${item.label}</span>
    `;

    if (item.href && !isLast && !item.disabled) {
      return html`
        <a
          href=${item.href}
          class=${classes}
          aria-current=${isLast ? 'page' : nothing}
          @click=${() => this._handleItemClick(item, index)}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <span
        class=${classes}
        tabindex=${!isLast && !item.disabled ? '0' : '-1'}
        role=${!isLast && !item.disabled ? 'button' : nothing}
        aria-current=${isLast ? 'page' : nothing}
        @click=${() => this._handleItemClick(item, index)}
        @keydown=${(e: KeyboardEvent) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isLast && !item.disabled) {
            e.preventDefault();
            this._handleItemClick(item, index);
          }
        }}
      >
        ${content}
      </span>
    `;
  }

  private _renderCollapsedItems() {
    if (!this.collapsed || this.items.length <= 3) return '';

    const visibleItems = [
      this.items[0],
      ...this.items.slice(-2)
    ];

    const hiddenCount = this.items.length - 3;

    return html`
      ${visibleItems[0] ? this._renderItem(visibleItems[0], 0) : ''}
      ${this._renderSeparator()}
      
      <span 
        class="breadcrumb-ellipsis"
        role="button"
        tabindex="0"
        aria-label=${`Show ${hiddenCount} more items`}
        @click=${this._handleEllipsisClick}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._handleEllipsisClick();
          }
        }}
      >
        •••
      </span>
      
      ${this._renderSeparator()}
      ${visibleItems[1] ? this._renderItem(visibleItems[1], this.items.length - 2) : ''}
      ${this._renderSeparator()}
      ${visibleItems[2] ? this._renderItem(visibleItems[2], this.items.length - 1) : ''}
    `;
  }

  private _renderAllItems() {
    return this.items.map((item, index) => html`
      ${index > 0 ? this._renderSeparator() : ''}
      ${this._renderItem(item, index)}
    `);
  }

  override render() {
    if (this.items.length === 0) return '';

    const shouldCollapse = this.collapsed && this.items.length > 3 && !this._expanded;

    return html`
      <nav 
        class="breadcrumb"
        aria-label=${this.ariaLabel}
        part="breadcrumb"
      >
        ${shouldCollapse ? this._renderCollapsedItems() : this._renderAllItems()}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-breadcrumb': GlzBreadcrumb;
  }
}
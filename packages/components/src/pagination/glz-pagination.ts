import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A pagination component for navigating through pages
 * @element glz-pagination
 */
@customElement('glz-pagination')
export class GlzPagination extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --pagination-gap: 0.25rem;
      --pagination-button-size: 36px;
      --pagination-font-size: 0.875rem;
      --pagination-border-radius: var(--radius-sm);
    }

    :host([size="small"]) {
      --pagination-button-size: 28px;
      --pagination-font-size: 0.75rem;
      --pagination-gap: 0.125rem;
    }

    :host([size="large"]) {
      --pagination-button-size: 44px;
      --pagination-font-size: 1rem;
      --pagination-gap: 0.375rem;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: var(--pagination-gap);
      flex-wrap: wrap;
      font-size: var(--pagination-font-size);
    }

    .pagination-button,
    .pagination-ellipsis {
      min-width: var(--pagination-button-size);
      height: var(--pagination-button-size);
      padding: 0 0.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--pagination-border-radius);
      border: 1px solid transparent;
      background: transparent;
      color: var(--color-bg-on);
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      font-size: inherit;
      font-family: inherit;
      line-height: 1;
      white-space: nowrap;
    }

    .pagination-button:not(:disabled):hover {
      background: var(--color-surface-base);
      border-color: var(--color-glass-border);
    }

    .pagination-button:not(:disabled):active {
      transform: scale(0.95);
    }

    .pagination-button:focus-visible {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }

    .pagination-button--active {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: var(--color-primary-base);
      pointer-events: none;
    }

    .pagination-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .pagination-ellipsis {
      cursor: default;
      opacity: 0.5;
      pointer-events: none;
    }

    /* Glass variant */
    :host([variant="glass"]) .pagination-button:not(:disabled):not(.pagination-button--active):hover {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
      border-color: var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .pagination-button:hover,
    :host(.dark) :host([variant="glass"]) .pagination-button:hover {
      background: var(--color-glass-tintDark);
    }

    /* Pills variant */
    :host([variant="pills"]) .pagination-button {
      background: var(--color-surface-base);
      border-color: var(--color-glass-border);
    }

    :host([variant="pills"]) .pagination-button:not(:disabled):hover {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: var(--color-primary-base);
    }

    /* Rounded variant */
    :host([variant="rounded"]) .pagination-button {
      border-radius: 50%;
      padding: 0;
    }

    /* Info section */
    .pagination-info {
      margin: 0 1rem;
      color: var(--color-bg-on);
      opacity: 0.7;
      font-size: var(--pagination-font-size);
    }

    /* Simple mode */
    .pagination-simple {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .pagination-simple-text {
      min-width: 100px;
      text-align: center;
      color: var(--color-bg-on);
      font-size: var(--pagination-font-size);
    }

    /* Input mode */
    .pagination-input-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 1rem;
    }

    .pagination-input {
      width: 60px;
      height: calc(var(--pagination-button-size) - 8px);
      padding: 0 0.5rem;
      border: 1px solid var(--color-glass-border);
      border-radius: var(--pagination-border-radius);
      background: var(--color-bg-base);
      color: var(--color-bg-on);
      font-size: var(--pagination-font-size);
      text-align: center;
      transition: border-color 0.2s ease;
    }

    .pagination-input:focus {
      outline: none;
      border-color: var(--color-primary-base);
    }

    .pagination-input::-webkit-inner-spin-button,
    .pagination-input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Icon styles */
    .pagination-icon {
      width: 1.125em;
      height: 1.125em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Responsive */
    @media (max-width: 640px) {
      :host([responsive]) .pagination-button span {
        display: none;
      }

      :host([responsive]) .pagination-button .pagination-icon {
        margin: 0;
      }

      :host([responsive]) .pagination-info {
        display: none;
      }

      :host([responsive][mode="full"]) .pagination-button:not(.pagination-button--nav):not(.pagination-button--active) {
        display: none;
      }

      :host([responsive][mode="full"]) .pagination-ellipsis {
        display: none;
      }

      :host([responsive][mode="full"]) .pagination {
        justify-content: space-between;
        width: 100%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .pagination-button {
        transition: none;
      }
    }
  `;

  @property({ type: Number })
  current = 1;

  @property({ type: Number })
  total = 1;

  @property({ type: Number })
  siblings = 1;

  @property({ type: Number })
  boundaries = 1;

  @property({ type: String, reflect: true })
  mode: 'full' | 'simple' | 'input' = 'full';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' | 'pills' | 'rounded' = 'default';

  @property({ type: Boolean })
  showFirstLast = true;

  @property({ type: Boolean })
  showPrevNext = true;

  @property({ type: Boolean })
  showInfo = false;

  @property({ type: Boolean, reflect: true })
  responsive = true;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  ariaLabel = 'Pagination navigation';

  @property({ type: String })
  prevLabel = 'Previous';

  @property({ type: String })
  nextLabel = 'Next';

  @property({ type: String })
  firstLabel = 'First';

  @property({ type: String })
  lastLabel = 'Last';

  @state()
  private _inputValue = '';

  override connectedCallback() {
    super.connectedCallback();
    this._inputValue = String(this.current);
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('current')) {
      this._inputValue = String(this.current);
    }
  }

  private _handlePageClick(page: number) {
    if (page === this.current || this.disabled) return;
    
    this.current = page;
    this.dispatchEvent(new CustomEvent('glz-pagination-change', {
      detail: { page },
      bubbles: true,
      composed: true
    }));
  }

  private _handlePrev() {
    if (this.current > 1 && !this.disabled) {
      this._handlePageClick(this.current - 1);
    }
  }

  private _handleNext() {
    if (this.current < this.total && !this.disabled) {
      this._handlePageClick(this.current + 1);
    }
  }

  private _handleFirst() {
    if (this.current > 1 && !this.disabled) {
      this._handlePageClick(1);
    }
  }

  private _handleLast() {
    if (this.current < this.total && !this.disabled) {
      this._handlePageClick(this.total);
    }
  }

  private _handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this._inputValue = input.value;
  }

  private _handleInputKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const page = parseInt(this._inputValue, 10);
      if (!isNaN(page) && page >= 1 && page <= this.total) {
        this._handlePageClick(page);
      } else {
        this._inputValue = String(this.current);
      }
    }
  }

  private _getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalPages = this.total;
    const current = this.current;
    const siblings = this.siblings;
    const boundaries = this.boundaries;

    // Always show first pages
    for (let i = 1; i <= Math.min(boundaries, totalPages); i++) {
      pages.push(i);
    }

    // Calculate range around current page
    const rangeStart = Math.max(
      boundaries + 1,
      current - siblings
    );
    const rangeEnd = Math.min(
      totalPages - boundaries,
      current + siblings
    );

    // Add ellipsis if needed before range
    if (rangeStart > boundaries + 1) {
      pages.push('ellipsis-start');
    }

    // Add pages around current
    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis if needed after range
    if (rangeEnd < totalPages - boundaries) {
      pages.push('ellipsis-end');
    }

    // Always show last pages
    for (let i = Math.max(totalPages - boundaries + 1, rangeEnd + 1); i <= totalPages; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    return pages;
  }

  private _renderButton(
    content: any,
    onClick: () => void,
    options: {
      disabled?: boolean;
      active?: boolean;
      ariaLabel?: string;
      class?: string;
    } = {}
  ) {
    const classes = [
      'pagination-button',
      options.class || '',
      options.active ? 'pagination-button--active' : ''
    ].filter(Boolean).join(' ');

    return html`
      <button
        class=${classes}
        ?disabled=${options.disabled || this.disabled}
        @click=${onClick}
        aria-label=${options.ariaLabel || nothing}
        aria-current=${options.active ? 'page' : nothing}
        part="button"
      >
        ${content}
      </button>
    `;
  }

  private _renderFullMode() {
    const pages = this._getPageNumbers();
    const prevIcon = html`
      <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    `;
    
    const nextIcon = html`
      <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    `;

    const firstIcon = html`
      <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
    `;

    const lastIcon = html`
      <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    `;

    return html`
      ${this.showFirstLast ? this._renderButton(
        firstIcon,
        () => this._handleFirst(),
        {
          disabled: this.current === 1,
          ariaLabel: this.firstLabel,
          class: 'pagination-button--nav'
        }
      ) : ''}

      ${this.showPrevNext ? this._renderButton(
        html`${prevIcon}<span>${this.prevLabel}</span>`,
        () => this._handlePrev(),
        {
          disabled: this.current === 1,
          ariaLabel: this.prevLabel,
          class: 'pagination-button--nav'
        }
      ) : ''}

      ${this.showInfo ? html`
        <span class="pagination-info">
          Page ${this.current} of ${this.total}
        </span>
      ` : ''}

      ${pages.map(page => {
        if (typeof page === 'string') {
          return html`<span class="pagination-ellipsis">•••</span>`;
        }
        
        return this._renderButton(
          page,
          () => this._handlePageClick(page),
          {
            active: page === this.current,
            ariaLabel: `Go to page ${page}`
          }
        );
      })}

      ${this.showPrevNext ? this._renderButton(
        html`<span>${this.nextLabel}</span>${nextIcon}`,
        () => this._handleNext(),
        {
          disabled: this.current === this.total,
          ariaLabel: this.nextLabel,
          class: 'pagination-button--nav'
        }
      ) : ''}

      ${this.showFirstLast ? this._renderButton(
        lastIcon,
        () => this._handleLast(),
        {
          disabled: this.current === this.total,
          ariaLabel: this.lastLabel,
          class: 'pagination-button--nav'
        }
      ) : ''}
    `;
  }

  private _renderSimpleMode() {
    const prevIcon = html`
      <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    `;
    
    const nextIcon = html`
      <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    `;

    return html`
      <div class="pagination-simple">
        ${this._renderButton(
          prevIcon,
          () => this._handlePrev(),
          {
            disabled: this.current === 1,
            ariaLabel: this.prevLabel
          }
        )}
        
        <span class="pagination-simple-text">
          ${this.current} / ${this.total}
        </span>
        
        ${this._renderButton(
          nextIcon,
          () => this._handleNext(),
          {
            disabled: this.current === this.total,
            ariaLabel: this.nextLabel
          }
        )}
      </div>
    `;
  }

  private _renderInputMode() {
    return html`
      ${this.showPrevNext ? this._renderButton(
        html`
          <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        `,
        () => this._handlePrev(),
        {
          disabled: this.current === 1,
          ariaLabel: this.prevLabel
        }
      ) : ''}
      
      <div class="pagination-input-container">
        <input
          type="number"
          class="pagination-input"
          min="1"
          max=${this.total}
          .value=${this._inputValue}
          @input=${this._handleInputChange}
          @keydown=${this._handleInputKeyDown}
          ?disabled=${this.disabled}
          aria-label="Page number"
        />
        <span>of ${this.total}</span>
      </div>
      
      ${this.showPrevNext ? this._renderButton(
        html`
          <svg class="pagination-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        `,
        () => this._handleNext(),
        {
          disabled: this.current === this.total,
          ariaLabel: this.nextLabel
        }
      ) : ''}
    `;
  }

  override render() {
    if (this.total <= 0) return '';

    let content;
    switch (this.mode) {
      case 'simple':
        content = this._renderSimpleMode();
        break;
      case 'input':
        content = this._renderInputMode();
        break;
      default:
        content = this._renderFullMode();
    }

    return html`
      <nav
        class="pagination"
        role="navigation"
        aria-label=${this.ariaLabel}
        part="pagination"
      >
        ${content}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-pagination': GlzPagination;
  }
}
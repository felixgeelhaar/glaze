import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => any;
}

export interface TableSort {
  column: string;
  direction: 'asc' | 'desc';
}

/**
 * A data table component with sorting and filtering
 * @element glz-table
 */
@customElement('glz-table')
export class GlzTable extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --table-border-radius: var(--radius-lg);
      --table-header-height: 48px;
      --table-row-height: 52px;
      --table-padding: 1rem;
      --table-font-size: 0.875rem;
    }

    :host([size="small"]) {
      --table-header-height: 36px;
      --table-row-height: 40px;
      --table-padding: 0.75rem;
      --table-font-size: 0.75rem;
    }

    :host([size="large"]) {
      --table-header-height: 56px;
      --table-row-height: 60px;
      --table-padding: 1.25rem;
      --table-font-size: 1rem;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
      background: var(--color-bg-base);
      border: 1px solid var(--color-glass-border);
      border-radius: var(--table-border-radius);
    }

    /* Glass variant */
    :host([variant="glass"]) .table-container {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .table-container,
    :host(.dark) :host([variant="glass"]) .table-container {
      background: var(--color-glass-tintDark);
    }

    /* Search bar */
    .table-search {
      padding: var(--table-padding);
      border-bottom: 1px solid var(--color-glass-border);
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-input {
      flex: 1;
      min-width: 200px;
      padding: 0.5rem 1rem;
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-sm);
      background: var(--color-bg-base);
      color: var(--color-bg-on);
      font-size: var(--table-font-size);
      transition: border-color 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--color-primary-base);
    }

    .search-clear {
      padding: 0.5rem 1rem;
      background: var(--color-surface-base);
      color: var(--color-surface-on);
      border: 1px solid var(--color-glass-border);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: var(--table-font-size);
      transition: all 0.2s ease;
    }

    .search-clear:hover {
      background: var(--color-primary-base);
      color: var(--color-primary-on);
      border-color: var(--color-primary-base);
    }

    /* Table */
    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--table-font-size);
    }

    /* Table header */
    .table-header {
      background: var(--color-surface-base);
      border-bottom: 2px solid var(--color-glass-border);
    }

    :host([variant="glass"]) .table-header {
      background: rgba(255, 255, 255, 0.05);
    }

    .table-header-cell {
      height: var(--table-header-height);
      padding: 0 var(--table-padding);
      text-align: left;
      font-weight: 600;
      color: var(--color-bg-on);
      white-space: nowrap;
      position: relative;
    }

    .table-header-cell--center {
      text-align: center;
    }

    .table-header-cell--right {
      text-align: right;
    }

    .table-header-cell--sortable {
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s ease;
    }

    .table-header-cell--sortable:hover {
      background: var(--color-surface-base);
    }

    .table-header-content {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sort-icon {
      width: 1em;
      height: 1em;
      opacity: 0.3;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .table-header-cell--sorted .sort-icon {
      opacity: 1;
      color: var(--color-primary-base);
    }

    .table-header-cell--sorted-desc .sort-icon {
      transform: rotate(180deg);
    }

    /* Table body */
    .table-body {
      background: transparent;
    }

    .table-row {
      border-bottom: 1px solid var(--color-glass-border);
      transition: background-color 0.2s ease;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .table-row:hover {
      background: var(--color-surface-base);
    }

    :host([variant="striped"]) .table-row:nth-child(even) {
      background: var(--color-surface-base);
    }

    :host([variant="striped"]) .table-row:hover {
      background: var(--color-primary-base);
      background: rgba(79, 70, 229, 0.1);
    }

    .table-row--selected {
      background: var(--color-primary-base) !important;
      background: rgba(79, 70, 229, 0.15) !important;
    }

    .table-cell {
      height: var(--table-row-height);
      padding: 0 var(--table-padding);
      color: var(--color-bg-on);
    }

    .table-cell--center {
      text-align: center;
    }

    .table-cell--right {
      text-align: right;
    }

    /* Checkbox */
    .table-checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--color-primary-base);
    }

    /* Empty state */
    .table-empty {
      padding: 3rem 2rem;
      text-align: center;
      color: var(--color-bg-on);
      opacity: 0.6;
    }

    .empty-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      opacity: 0.3;
    }

    /* Loading state */
    .table-loading {
      position: relative;
      pointer-events: none;
      opacity: 0.5;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      border-radius: var(--table-border-radius);
    }

    :host([data-theme="dark"]) .loading-overlay,
    :host(.dark) .loading-overlay {
      background: rgba(0, 0, 0, 0.8);
    }

    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--color-glass-border);
      border-top-color: var(--color-primary-base);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Pagination */
    .table-footer {
      padding: var(--table-padding);
      border-top: 1px solid var(--color-glass-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .table-info {
      color: var(--color-bg-on);
      opacity: 0.7;
      font-size: var(--table-font-size);
    }

    /* Responsive */
    @media (max-width: 768px) {
      :host([responsive]) .table {
        display: block;
      }

      :host([responsive]) .table-header {
        display: none;
      }

      :host([responsive]) .table-body {
        display: block;
      }

      :host([responsive]) .table-row {
        display: block;
        padding: var(--table-padding);
        margin-bottom: 1rem;
        border: 1px solid var(--color-glass-border);
        border-radius: var(--radius-md);
      }

      :host([responsive]) .table-cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        height: auto;
        text-align: left !important;
      }

      :host([responsive]) .table-cell::before {
        content: attr(data-label);
        font-weight: 600;
        margin-right: 1rem;
      }

      :host([responsive]) .table-cell:first-child {
        padding-top: 0;
      }

      :host([responsive]) .table-cell:last-child {
        padding-bottom: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .table-row,
      .sort-icon,
      .search-input,
      .search-clear {
        transition: none;
      }

      .loading-spinner {
        animation: none;
        border-top-color: transparent;
      }
    }
  `;

  @property({ type: Array })
  columns: TableColumn[] = [];

  @property({ type: Array })
  data: any[] = [];

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' | 'striped' = 'default';

  @property({ type: Boolean })
  searchable = false;

  @property({ type: String })
  searchPlaceholder = 'Search...';

  @property({ type: Boolean })
  selectable = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: String })
  emptyMessage = 'No data available';

  @property({ type: Boolean, reflect: true })
  responsive = true;

  @property({ type: Object })
  sort: TableSort | null = null;

  @state()
  private _searchTerm = '';

  @state()
  private _selectedRows: Set<number> = new Set();

  @state()
  private _filteredData: any[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this._updateFilteredData();
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('data') || changedProperties.has('sort')) {
      this._updateFilteredData();
    }
  }

  private _updateFilteredData() {
    let filtered = [...this.data];

    // Apply search filter
    if (this._searchTerm) {
      const searchLower = this._searchTerm.toLowerCase();
      filtered = filtered.filter(row => {
        return this.columns.some(col => {
          const value = row[col.key];
          return value && String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // Apply sorting
    if (this.sort) {
      const { column, direction } = this.sort;
      filtered.sort((a, b) => {
        const aVal = a[column];
        const bVal = b[column];
        
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        const comparison = aVal < bVal ? -1 : 1;
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    this._filteredData = filtered;
  }

  private _handleSort(column: TableColumn) {
    if (!column.sortable) return;

    const newSort: TableSort = {
      column: column.key,
      direction: 'asc'
    };

    if (this.sort?.column === column.key) {
      newSort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    }

    this.sort = newSort;
    
    this.dispatchEvent(new CustomEvent('glz-table-sort', {
      detail: { sort: newSort },
      bubbles: true,
      composed: true
    }));
  }

  private _handleSearch(e: Event) {
    const input = e.target as HTMLInputElement;
    this._searchTerm = input.value;
    this._updateFilteredData();
    
    this.dispatchEvent(new CustomEvent('glz-table-search', {
      detail: { searchTerm: this._searchTerm },
      bubbles: true,
      composed: true
    }));
  }

  private _clearSearch() {
    this._searchTerm = '';
    this._updateFilteredData();
    
    this.dispatchEvent(new CustomEvent('glz-table-search', {
      detail: { searchTerm: '' },
      bubbles: true,
      composed: true
    }));
  }

  private _handleRowSelect(index: number) {
    if (!this.selectable) return;

    if (this._selectedRows.has(index)) {
      this._selectedRows.delete(index);
    } else {
      this._selectedRows.add(index);
    }
    
    this._selectedRows = new Set(this._selectedRows);
    
    this.dispatchEvent(new CustomEvent('glz-table-select', {
      detail: { 
        selectedIndices: Array.from(this._selectedRows),
        selectedRows: Array.from(this._selectedRows).map(i => this._filteredData[i])
      },
      bubbles: true,
      composed: true
    }));
  }

  private _handleSelectAll(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    
    if (checkbox.checked) {
      this._selectedRows = new Set(this._filteredData.map((_, i) => i));
    } else {
      this._selectedRows.clear();
    }
    
    this._selectedRows = new Set(this._selectedRows);
    
    this.dispatchEvent(new CustomEvent('glz-table-select', {
      detail: { 
        selectedIndices: Array.from(this._selectedRows),
        selectedRows: Array.from(this._selectedRows).map(i => this._filteredData[i])
      },
      bubbles: true,
      composed: true
    }));
  }

  private _renderSearch() {
    if (!this.searchable) return nothing;

    return html`
      <div class="table-search">
        <input
          type="text"
          class="search-input"
          placeholder=${this.searchPlaceholder}
          .value=${this._searchTerm}
          @input=${this._handleSearch}
        />
        ${this._searchTerm ? html`
          <button class="search-clear" @click=${this._clearSearch}>
            Clear
          </button>
        ` : ''}
      </div>
    `;
  }

  private _renderHeader() {
    const allSelected = this._filteredData.length > 0 && 
                       this._filteredData.every((_, i) => this._selectedRows.has(i));
    const someSelected = this._selectedRows.size > 0 && !allSelected;

    return html`
      <thead class="table-header">
        <tr>
          ${this.selectable ? html`
            <th class="table-header-cell" style="width: 40px;">
              <input
                type="checkbox"
                class="table-checkbox"
                .checked=${allSelected}
                .indeterminate=${someSelected}
                @change=${this._handleSelectAll}
                aria-label="Select all rows"
              />
            </th>
          ` : ''}
          ${this.columns.map(column => {
            const isSorted = this.sort?.column === column.key;
            const sortDirection = this.sort?.direction;
            const classes = [
              'table-header-cell',
              column.align ? `table-header-cell--${column.align}` : '',
              column.sortable ? 'table-header-cell--sortable' : '',
              isSorted ? 'table-header-cell--sorted' : '',
              isSorted && sortDirection === 'desc' ? 'table-header-cell--sorted-desc' : ''
            ].filter(Boolean).join(' ');

            return html`
              <th
                class=${classes}
                style=${column.width ? `width: ${column.width}` : ''}
                @click=${() => this._handleSort(column)}
              >
                <span class="table-header-content">
                  ${column.label}
                  ${column.sortable ? html`
                    <svg class="sort-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" />
                    </svg>
                  ` : ''}
                </span>
              </th>
            `;
          })}
        </tr>
      </thead>
    `;
  }

  private _renderBody() {
    if (this._filteredData.length === 0) {
      return html`
        <tbody class="table-body">
          <tr>
            <td colspan=${this.columns.length + (this.selectable ? 1 : 0)}>
              <div class="table-empty">
                <svg class="empty-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z"/>
                </svg>
                <div>${this.emptyMessage}</div>
              </div>
            </td>
          </tr>
        </tbody>
      `;
    }

    return html`
      <tbody class="table-body">
        ${this._filteredData.map((row, rowIndex) => {
          const isSelected = this._selectedRows.has(rowIndex);
          const rowClasses = [
            'table-row',
            isSelected ? 'table-row--selected' : ''
          ].filter(Boolean).join(' ');

          return html`
            <tr class=${rowClasses}>
              ${this.selectable ? html`
                <td class="table-cell" style="width: 40px;">
                  <input
                    type="checkbox"
                    class="table-checkbox"
                    .checked=${isSelected}
                    @change=${() => this._handleRowSelect(rowIndex)}
                    aria-label=${`Select row ${rowIndex + 1}`}
                  />
                </td>
              ` : ''}
              ${this.columns.map(column => {
                const cellClasses = [
                  'table-cell',
                  column.align ? `table-cell--${column.align}` : ''
                ].filter(Boolean).join(' ');

                const value = row[column.key];
                const content = column.render ? column.render(value, row) : value;

                return html`
                  <td 
                    class=${cellClasses}
                    data-label=${column.label}
                    style=${column.width ? `width: ${column.width}` : ''}
                  >
                    ${content}
                  </td>
                `;
              })}
            </tr>
          `;
        })}
      </tbody>
    `;
  }

  private _renderLoading() {
    if (!this.loading) return nothing;

    return html`
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
    `;
  }

  override render() {
    const containerClasses = [
      'table-container',
      this.loading ? 'table-loading' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class=${containerClasses}>
        ${this._renderSearch()}
        
        <table class="table" role="table">
          ${this._renderHeader()}
          ${this._renderBody()}
        </table>
        
        ${this._renderLoading()}
        
        <slot name="footer"></slot>
      </div>
    `;
  }

  /**
   * Get selected rows data
   */
  getSelectedRows() {
    return Array.from(this._selectedRows).map(i => this._filteredData[i]);
  }

  /**
   * Clear selection
   */
  clearSelection() {
    this._selectedRows.clear();
    this._selectedRows = new Set();
  }

  /**
   * Select all rows
   */
  selectAll() {
    this._selectedRows = new Set(this._filteredData.map((_, i) => i));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-table': GlzTable;
  }
}
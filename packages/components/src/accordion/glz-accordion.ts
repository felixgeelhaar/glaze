import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * An accessible accordion component with keyboard navigation
 * @element glz-accordion
 */
@customElement('glz-accordion')
export class GlzAccordion extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --accordion-gap: 0.5rem;
      --accordion-border-radius: var(--radius-md);
      --accordion-header-height: 56px;
      --accordion-padding: 1rem;
      --accordion-icon-size: 20px;
    }

    .accordion {
      display: flex;
      flex-direction: column;
      gap: var(--accordion-gap);
    }

    ::slotted([slot="item"]),
    ::slotted(.accordion-item) {
      background: var(--color-bg-base);
      border: 1px solid var(--color-glass-border);
      border-radius: var(--accordion-border-radius);
      overflow: hidden;
      transition: box-shadow 0.2s ease;
    }

    :host([variant="glass"]) ::slotted([slot="item"]),
    :host([variant="glass"]) ::slotted(.accordion-item) {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
    }

    :host([data-theme="dark"]) :host([variant="glass"]) ::slotted([slot="item"]),
    :host(.dark) :host([variant="glass"]) ::slotted(.accordion-item) {
      background: var(--color-glass-tintDark);
    }

    ::slotted([slot="item"]:hover),
    ::slotted(.accordion-item:hover) {
      box-shadow: var(--elevation-1);
    }

    :host([variant="flush"]) .accordion {
      gap: 0;
    }

    :host([variant="flush"]) ::slotted([slot="item"]),
    :host([variant="flush"]) ::slotted(.accordion-item) {
      border-radius: 0;
      border-left: none;
      border-right: none;
    }

    :host([variant="flush"]) ::slotted([slot="item"]:first-child),
    :host([variant="flush"]) ::slotted(.accordion-item:first-child) {
      border-top: none;
    }

    :host([variant="flush"]) ::slotted([slot="item"]:last-child),
    :host([variant="flush"]) ::slotted(.accordion-item:last-child) {
      border-bottom: none;
    }

    :host([variant="flush"]) ::slotted([slot="item"] + [slot="item"]),
    :host([variant="flush"]) ::slotted(.accordion-item + .accordion-item) {
      border-top: none;
    }

    @media (prefers-reduced-motion: reduce) {
      ::slotted([slot="item"]),
      ::slotted(.accordion-item) {
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' | 'flush' = 'default';

  @property({ type: Boolean })
  multiple = false;

  @property({ type: Boolean })
  collapsible = true;

  @property({ type: String })
  activeItems = '';

  @state()
  private _items: HTMLElement[] = [];

  @state()
  private _activeItemIds: Set<string> = new Set();

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override firstUpdated() {
    this._setupItems();
    
    // Parse initial active items
    if (this.activeItems) {
      const ids = this.activeItems.split(',').map(id => id.trim());
      this._activeItemIds = new Set(ids);
      this._updateItems();
    } else if (!this.collapsible && this._items.length > 0) {
      // If not collapsible and no active items, activate first item
      const firstItem = this._items[0];
      if (firstItem) {
        const firstId = this._getItemId(firstItem);
        if (firstId) {
          this._activeItemIds.add(firstId);
          this._updateItems();
        }
      }
    }
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('activeItems')) {
      const ids = this.activeItems ? this.activeItems.split(',').map(id => id.trim()) : [];
      this._activeItemIds = new Set(ids);
      this._updateItems();
    }
  }

  private _setupItems() {
    this._items = Array.from(this.querySelectorAll('[slot="item"], .accordion-item'));
    
    this._items.forEach((item, index) => {
      const header = item.querySelector('.accordion-header, [slot="header"]') as HTMLElement;
      const content = item.querySelector('.accordion-content, [slot="content"]') as HTMLElement;
      
      if (!header || !content) return;
      
      // Generate ID if not present
      if (!item.id) {
        item.id = `accordion-item-${index}`;
      }
      
      const itemId = item.id;
      const headerId = `${itemId}-header`;
      const contentId = `${itemId}-content`;
      
      // Set ARIA attributes
      header.id = headerId;
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('aria-controls', contentId);
      header.setAttribute('tabindex', '0');
      
      content.id = contentId;
      content.setAttribute('role', 'region');
      content.setAttribute('aria-labelledby', headerId);
      
      // Add click handler
      header.addEventListener('click', () => this._toggleItem(item));
      
      // Add keyboard handler for header
      header.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this._toggleItem(item);
        }
      });
      
      // Set initial styles
      this._applyItemStyles(item, header, content, false);
    });
  }

  private _getItemId(item: HTMLElement): string {
    return item.id || '';
  }

  private _toggleItem(item: HTMLElement) {
    const itemId = this._getItemId(item);
    if (!itemId) return;
    
    const isActive = this._activeItemIds.has(itemId);
    
    if (isActive) {
      // Try to collapse
      if (this.collapsible || this._activeItemIds.size > 1) {
        this._activeItemIds.delete(itemId);
      }
    } else {
      // Expand
      if (!this.multiple) {
        // Clear other active items if not multiple
        this._activeItemIds.clear();
      }
      this._activeItemIds.add(itemId);
    }
    
    this._updateItems();
    this._dispatchChangeEvent();
  }

  private _updateItems() {
    this._items.forEach(item => {
      const header = item.querySelector('.accordion-header, [slot="header"]') as HTMLElement;
      const content = item.querySelector('.accordion-content, [slot="content"]') as HTMLElement;
      
      if (!header || !content) return;
      
      const itemId = this._getItemId(item);
      const isActive = this._activeItemIds.has(itemId);
      
      header.setAttribute('aria-expanded', String(isActive));
      this._applyItemStyles(item, header, content, isActive);
    });
  }

  private _applyItemStyles(
    item: HTMLElement,
    header: HTMLElement,
    content: HTMLElement,
    isActive: boolean
  ) {
    // Apply header styles
    Object.assign(header.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      minHeight: 'var(--accordion-header-height)',
      padding: 'var(--accordion-padding)',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.9375rem',
      color: 'var(--color-bg-on)',
      transition: 'background-color 0.2s ease',
      outline: 'none',
      userSelect: 'none'
    });
    
    // Add hover styles
    header.onmouseenter = () => {
      if (!isActive) {
        header.style.backgroundColor = 'var(--color-surface-base)';
      }
    };
    
    header.onmouseleave = () => {
      if (!isActive) {
        header.style.backgroundColor = 'transparent';
      }
    };
    
    // Focus styles
    header.onfocus = () => {
      header.style.outline = '2px solid var(--color-primary-base)';
      header.style.outlineOffset = '-2px';
    };
    
    header.onblur = () => {
      header.style.outline = 'none';
    };
    
    // Apply content styles with animation
    const contentHeight = isActive ? `${content.scrollHeight}px` : '0';
    Object.assign(content.style, {
      maxHeight: contentHeight,
      overflow: 'hidden',
      transition: 'max-height 0.3s ease, padding 0.3s ease, opacity 0.3s ease',
      opacity: isActive ? '1' : '0',
      padding: isActive ? 'var(--accordion-padding)' : '0 var(--accordion-padding)',
      paddingTop: isActive ? '0' : '0'
    });
    
    // Add or update chevron icon if not present
    let chevron = header.querySelector('.accordion-chevron') as HTMLElement;
    if (!chevron) {
      chevron = document.createElement('span');
      chevron.className = 'accordion-chevron';
      chevron.innerHTML = `
        <svg width="var(--accordion-icon-size)" height="var(--accordion-icon-size)" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      `;
      header.appendChild(chevron);
    }
    
    Object.assign(chevron.style, {
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'transform 0.3s ease',
      transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)'
    });
    
    // Set active state on item
    if (isActive) {
      item.setAttribute('data-active', '');
    } else {
      item.removeAttribute('data-active');
    }
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const headers = this._items.map(item => 
      item.querySelector('.accordion-header, [slot="header"]') as HTMLElement
    ).filter(Boolean);
    
    if (!headers.includes(target)) return;
    
    const currentIndex = headers.indexOf(target);
    let nextIndex = -1;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % headers.length;
        headers[nextIndex]?.focus();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = headers.length - 1;
        headers[nextIndex]?.focus();
        break;
        
      case 'Home':
        e.preventDefault();
        headers[0]?.focus();
        break;
        
      case 'End':
        e.preventDefault();
        headers[headers.length - 1]?.focus();
        break;
    }
  };

  private _dispatchChangeEvent() {
    const activeIds = Array.from(this._activeItemIds);
    this.dispatchEvent(new CustomEvent('glz-accordion-change', {
      detail: { activeItems: activeIds },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Expand all items
   */
  expandAll() {
    if (!this.multiple) return;
    
    this._items.forEach(item => {
      const itemId = this._getItemId(item);
      if (itemId) {
        this._activeItemIds.add(itemId);
      }
    });
    
    this._updateItems();
    this._dispatchChangeEvent();
  }

  /**
   * Collapse all items
   */
  collapseAll() {
    if (!this.collapsible) return;
    
    this._activeItemIds.clear();
    this._updateItems();
    this._dispatchChangeEvent();
  }

  /**
   * Toggle a specific item
   */
  toggleItem(itemId: string) {
    const item = this._items.find(i => this._getItemId(i) === itemId);
    if (item) {
      this._toggleItem(item);
    }
  }

  override render() {
    return html`
      <div class="accordion" role="region" part="accordion">
        <slot name="item"></slot>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-accordion': GlzAccordion;
  }
}
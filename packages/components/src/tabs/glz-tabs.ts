import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { RovingTabindex } from '../utils/accessibility.js';

/**
 * An accessible tabs component with keyboard navigation
 * @element glz-tabs
 */
@customElement('glz-tabs')
export class GlzTabs extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --tab-height: 48px;
      --tab-padding: 0 1.5rem;
      --tab-gap: 0.25rem;
      --indicator-height: 2px;
      --panel-padding: 1.5rem;
    }

    .tabs-container {
      width: 100%;
    }

    .tabs-list {
      display: flex;
      position: relative;
      border-bottom: 1px solid var(--color-glass-border);
      overflow-x: auto;
      scrollbar-width: thin;
    }

    :host([variant="glass"]) .tabs-list {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
      border-radius: var(--radius-md) var(--radius-md) 0 0;
      border: 1px solid var(--color-glass-border);
      border-bottom: 1px solid var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .tabs-list,
    :host(.dark) :host([variant="glass"]) .tabs-list {
      background: var(--color-glass-tintDark);
    }

    :host([variant="pills"]) .tabs-list {
      border-bottom: none;
      gap: var(--tab-gap);
      padding: 0.25rem;
      background: var(--color-surface-base);
      border-radius: var(--radius-lg);
    }

    ::slotted([slot="tab"]),
    ::slotted([role="tab"]) {
      flex: 0 0 auto;
      height: var(--tab-height);
      padding: var(--tab-padding);
      background: transparent;
      border: none;
      color: var(--color-bg-on);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
      outline: none;
      white-space: nowrap;
      opacity: 0.7;
    }

    ::slotted([slot="tab"]:hover),
    ::slotted([role="tab"]:hover) {
      opacity: 1;
      background: var(--color-surface-base);
    }

    ::slotted([slot="tab"][aria-selected="true"]),
    ::slotted([role="tab"][aria-selected="true"]) {
      opacity: 1;
      color: var(--color-primary-base);
    }

    ::slotted([slot="tab"]:focus-visible),
    ::slotted([role="tab"]:focus-visible) {
      outline: 2px solid var(--color-primary-base);
      outline-offset: -2px;
      border-radius: var(--radius-sm);
    }

    ::slotted([slot="tab"][disabled]),
    ::slotted([role="tab"][disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([variant="pills"]) ::slotted([slot="tab"]),
    :host([variant="pills"]) ::slotted([role="tab"]) {
      border-radius: var(--radius-md);
      padding: 0.5rem 1rem;
    }

    :host([variant="pills"]) ::slotted([slot="tab"][aria-selected="true"]),
    :host([variant="pills"]) ::slotted([role="tab"][aria-selected="true"]) {
      background: var(--color-bg-base);
      box-shadow: var(--elevation-1);
    }

    .indicator {
      position: absolute;
      bottom: 0;
      height: var(--indicator-height);
      background: var(--color-primary-base);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: var(--indicator-height);
    }

    :host([variant="pills"]) .indicator {
      display: none;
    }

    .panels {
      position: relative;
      min-height: 100px;
    }

    ::slotted([slot="panel"]),
    ::slotted([role="tabpanel"]) {
      display: none;
      padding: var(--panel-padding);
      animation: fadeIn 0.3s ease;
    }

    ::slotted([slot="panel"][data-active]),
    ::slotted([role="tabpanel"][data-active]) {
      display: block;
    }

    :host([variant="glass"]) ::slotted([slot="panel"]),
    :host([variant="glass"]) ::slotted([role="tabpanel"]) {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
      border: 1px solid var(--color-glass-border);
      border-top: none;
      border-radius: 0 0 var(--radius-md) var(--radius-md);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) ::slotted([slot="panel"]),
    :host(.dark) :host([variant="glass"]) ::slotted([role="tabpanel"]) {
      background: var(--color-glass-tintDark);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    :host([orientation="vertical"]) {
      display: flex;
    }

    :host([orientation="vertical"]) .tabs-container {
      display: flex;
    }

    :host([orientation="vertical"]) .tabs-list {
      flex-direction: column;
      border-bottom: none;
      border-right: 1px solid var(--color-glass-border);
      width: 200px;
      overflow-x: visible;
      overflow-y: auto;
    }

    :host([orientation="vertical"]) ::slotted([slot="tab"]),
    :host([orientation="vertical"]) ::slotted([role="tab"]) {
      justify-content: flex-start;
      text-align: left;
    }

    :host([orientation="vertical"]) .indicator {
      right: 0;
      left: auto;
      bottom: auto;
      width: var(--indicator-height);
      height: var(--tab-height);
    }

    :host([orientation="vertical"]) .panels {
      flex: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .indicator {
        transition: none;
      }
      
      ::slotted([slot="panel"]),
      ::slotted([role="tabpanel"]) {
        animation: none;
      }
    }

    @media (max-width: 640px) {
      :host([orientation="vertical"]) .tabs-list {
        width: 60px;
      }
      
      :host([orientation="vertical"]) ::slotted([slot="tab"]),
      :host([orientation="vertical"]) ::slotted([role="tab"]) {
        padding: 0.75rem 0.5rem;
        justify-content: center;
      }
      
      :host([orientation="vertical"][full-labels]) .tabs-list {
        width: 150px;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' | 'pills' = 'default';

  @property({ type: String, reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: String })
  activeTab = '';

  @property({ type: Boolean })
  disableAnimation = false;

  @property({ type: Boolean, attribute: 'full-labels', reflect: true })
  fullLabels = false;

  @state()
  private _tabs: HTMLElement[] = [];

  @state()
  private _panels: HTMLElement[] = [];

  private _tabsList?: HTMLElement;
  private _indicator?: HTMLElement;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override firstUpdated() {
    this._tabsList = this.shadowRoot?.querySelector('.tabs-list') as HTMLElement;
    this._indicator = this.shadowRoot?.querySelector('.indicator') as HTMLElement;
    
    this._setupTabs();
    this._setupPanels();
    
    // Set initial active tab if not set
    if (!this.activeTab && this._tabs.length > 0) {
      const firstEnabledTab = this._tabs.find(tab => !tab.hasAttribute('disabled'));
      if (firstEnabledTab) {
        this.activeTab = firstEnabledTab.id || firstEnabledTab.getAttribute('data-tab') || '0';
      }
    }
    
    this._updateActiveTab();
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('activeTab')) {
      this._updateActiveTab();
    }
  }

  private _setupTabs() {
    this._tabs = Array.from(this.querySelectorAll('[slot="tab"], [role="tab"]'));
    
    this._tabs.forEach((tab, index) => {
      // Set ARIA attributes
      if (!tab.hasAttribute('role')) {
        tab.setAttribute('role', 'tab');
      }
      
      if (!tab.hasAttribute('id')) {
        tab.id = `tab-${index}`;
      }
      
      if (!tab.hasAttribute('aria-controls')) {
        tab.setAttribute('aria-controls', `panel-${index}`);
      }
      
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      
      // Add click handler
      tab.addEventListener('click', this._handleTabClick);
    });
    
    // Set up roving tabindex
    if (this._tabsList && this._tabs.length > 0) {
      new RovingTabindex(
        this._tabsList,
        this.orientation === 'vertical' ? 'vertical' : 'horizontal'
      );
    }
  }

  private _setupPanels() {
    this._panels = Array.from(this.querySelectorAll('[slot="panel"], [role="tabpanel"]'));
    
    this._panels.forEach((panel, index) => {
      // Set ARIA attributes
      if (!panel.hasAttribute('role')) {
        panel.setAttribute('role', 'tabpanel');
      }
      
      if (!panel.hasAttribute('id')) {
        panel.id = `panel-${index}`;
      }
      
      if (!panel.hasAttribute('aria-labelledby')) {
        panel.setAttribute('aria-labelledby', `tab-${index}`);
      }
      
      panel.setAttribute('tabindex', '0');
      panel.removeAttribute('data-active');
    });
  }

  private _handleTabClick = (e: Event) => {
    const tab = e.currentTarget as HTMLElement;
    
    if (tab.hasAttribute('disabled')) {
      return;
    }
    
    const tabId = tab.id || tab.getAttribute('data-tab') || this._tabs.indexOf(tab).toString();
    this.activeTab = tabId;
    
    this.dispatchEvent(new CustomEvent('glz-tab-change', {
      detail: { tabId, tab },
      bubbles: true,
      composed: true
    }));
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    
    if (!this._tabs.includes(target)) {
      return;
    }
    
    let handled = false;
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (this.orientation === 'horizontal' && e.key === 'ArrowUp') break;
        if (this.orientation === 'vertical' && e.key === 'ArrowLeft') break;
        e.preventDefault();
        this._focusPreviousTab();
        handled = true;
        break;
        
      case 'ArrowRight':
      case 'ArrowDown':
        if (this.orientation === 'horizontal' && e.key === 'ArrowDown') break;
        if (this.orientation === 'vertical' && e.key === 'ArrowRight') break;
        e.preventDefault();
        this._focusNextTab();
        handled = true;
        break;
        
      case 'Home':
        e.preventDefault();
        this._focusFirstTab();
        handled = true;
        break;
        
      case 'End':
        e.preventDefault();
        this._focusLastTab();
        handled = true;
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._handleTabClick(e);
        handled = true;
        break;
    }
    
    if (handled) {
      e.stopPropagation();
    }
  };

  private _focusPreviousTab() {
    const currentIndex = this._tabs.findIndex(tab => tab === document.activeElement);
    const enabledTabs = this._tabs.filter(tab => !tab.hasAttribute('disabled'));
    
    if (currentIndex > 0) {
      let prevIndex = currentIndex - 1;
      while (prevIndex >= 0) {
        const prevTab = this._tabs[prevIndex];
        if (prevTab && enabledTabs.includes(prevTab)) {
          prevTab.focus();
          break;
        }
        prevIndex--;
      }
    } else if (enabledTabs.length > 0) {
      // Wrap to last
      const lastEnabled = enabledTabs[enabledTabs.length - 1];
      if (lastEnabled) {
        lastEnabled.focus();
      }
    }
  }

  private _focusNextTab() {
    const currentIndex = this._tabs.findIndex(tab => tab === document.activeElement);
    const enabledTabs = this._tabs.filter(tab => !tab.hasAttribute('disabled'));
    
    if (currentIndex < this._tabs.length - 1) {
      let nextIndex = currentIndex + 1;
      while (nextIndex < this._tabs.length) {
        const nextTab = this._tabs[nextIndex];
        if (nextTab && enabledTabs.includes(nextTab)) {
          nextTab.focus();
          break;
        }
        nextIndex++;
      }
    } else if (enabledTabs.length > 0) {
      // Wrap to first
      const firstEnabled = enabledTabs[0];
      if (firstEnabled) {
        firstEnabled.focus();
      }
    }
  }

  private _focusFirstTab() {
    const firstEnabled = this._tabs.find(tab => !tab.hasAttribute('disabled'));
    firstEnabled?.focus();
  }

  private _focusLastTab() {
    const enabledTabs = this._tabs.filter(tab => !tab.hasAttribute('disabled'));
    if (enabledTabs.length > 0) {
      const lastEnabled = enabledTabs[enabledTabs.length - 1];
      if (lastEnabled) {
        lastEnabled.focus();
      }
    }
  }

  private _updateActiveTab() {
    // Update tabs
    this._tabs.forEach((tab) => {
      const tabId = tab.id || tab.getAttribute('data-tab') || this._tabs.indexOf(tab).toString();
      const isActive = tabId === this.activeTab;
      
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
      
      if (isActive) {
        this._updateIndicator(tab);
      }
    });
    
    // Update panels
    this._panels.forEach((panel, index) => {
      const tab = this._tabs[index];
      const tabId = tab?.id || tab?.getAttribute('data-tab') || index.toString();
      const isActive = tabId === this.activeTab;
      
      if (isActive) {
        panel.setAttribute('data-active', '');
      } else {
        panel.removeAttribute('data-active');
      }
    });
  }

  private _updateIndicator(activeTab: HTMLElement) {
    if (!this._indicator || !this._tabsList || this.variant === 'pills') return;
    
    const tabRect = activeTab.getBoundingClientRect();
    const listRect = this._tabsList.getBoundingClientRect();
    
    if (this.orientation === 'horizontal') {
      const left = tabRect.left - listRect.left;
      const width = tabRect.width;
      
      if (this._indicator) {
        this._indicator.style.transform = `translateX(${left}px)`;
        this._indicator.style.width = `${width}px`;
      }
    } else {
      const top = tabRect.top - listRect.top;
      const height = tabRect.height;
      
      if (this._indicator) {
        this._indicator.style.transform = `translateY(${top}px)`;
        this._indicator.style.height = `${height}px`;
      }
    }
  }

  /**
   * Select a tab programmatically
   */
  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  /**
   * Select next tab
   */
  selectNextTab() {
    const currentIndex = this._tabs.findIndex(tab => {
      const tabId = tab.id || tab.getAttribute('data-tab') || this._tabs.indexOf(tab).toString();
      return tabId === this.activeTab;
    });
    
    const currentTab = this._tabs[currentIndex];
    if (!currentTab) return;
    
    const enabledTabs = this._tabs.filter(tab => !tab.hasAttribute('disabled'));
    const nextTab = enabledTabs[enabledTabs.indexOf(currentTab) + 1] || enabledTabs[0];
    
    if (nextTab) {
      const tabId = nextTab.id || nextTab.getAttribute('data-tab') || this._tabs.indexOf(nextTab).toString();
      this.activeTab = tabId;
    }
  }

  /**
   * Select previous tab
   */
  selectPreviousTab() {
    const currentIndex = this._tabs.findIndex(tab => {
      const tabId = tab.id || tab.getAttribute('data-tab') || this._tabs.indexOf(tab).toString();
      return tabId === this.activeTab;
    });
    
    const currentTab = this._tabs[currentIndex];
    if (!currentTab) return;
    
    const enabledTabs = this._tabs.filter(tab => !tab.hasAttribute('disabled'));
    const prevTab = enabledTabs[enabledTabs.indexOf(currentTab) - 1] || enabledTabs[enabledTabs.length - 1];
    
    if (prevTab) {
      const tabId = prevTab.id || prevTab.getAttribute('data-tab') || this._tabs.indexOf(prevTab).toString();
      this.activeTab = tabId;
    }
  }

  override render() {
    return html`
      <div class="tabs-container">
        <div class="tabs-list" role="tablist" part="tablist">
          <slot name="tab"></slot>
          ${this.variant !== 'pills' ? html`
            <div class="indicator" part="indicator"></div>
          ` : ''}
        </div>
        
        <div class="panels" part="panels">
          <slot name="panel"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-tabs': GlzTabs;
  }
}
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PositionManager, AutoUpdatePosition } from '../utils/positioning.js';
import type { Position, Alignment } from '../utils/positioning.js';

/**
 * An accessible tooltip component with smart positioning
 * @element glz-tooltip
 */
@customElement('glz-tooltip')
export class GlzTooltip extends LitElement {
  static override styles = css`
    :host {
      display: contents;
      --tooltip-max-width: 250px;
      --tooltip-padding: 0.5rem 0.75rem;
      --tooltip-font-size: 0.875rem;
      --tooltip-bg: var(--color-bg-on);
      --tooltip-color: var(--color-bg-base);
      --tooltip-radius: var(--radius-md);
      --tooltip-shadow: var(--elevation-2);
    }

    .trigger {
      display: inline-flex;
      cursor: help;
    }

    .tooltip {
      position: fixed;
      z-index: 10000;
      max-width: var(--tooltip-max-width);
      padding: var(--tooltip-padding);
      font-size: var(--tooltip-font-size);
      line-height: 1.5;
      color: var(--tooltip-color);
      background: var(--tooltip-bg);
      border-radius: var(--tooltip-radius);
      box-shadow: var(--tooltip-shadow);
      pointer-events: none;
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.2s ease, transform 0.2s ease;
      word-wrap: break-word;
    }

    :host([variant="glass"]) .tooltip {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-md));
      -webkit-backdrop-filter: blur(var(--blur-md));
      border: 1px solid var(--color-glass-border);
      color: var(--color-bg-on);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .tooltip,
    :host(.dark) :host([variant="glass"]) .tooltip {
      background: var(--color-glass-tintDark);
    }

    .tooltip[data-show] {
      opacity: 1;
      transform: scale(1);
    }

    .arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      transform: rotate(45deg);
      pointer-events: none;
    }

    :host([variant="glass"]) .arrow {
      border: 1px solid var(--color-glass-border);
      border-right: none;
      border-bottom: none;
    }

    /* Position-specific arrow styles */
    .tooltip[data-position="top"] .arrow {
      bottom: -4px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tooltip[data-position="bottom"] .arrow {
      top: -4px;
      transform: rotate(225deg);
      box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.1);
    }

    .tooltip[data-position="left"] .arrow {
      right: -4px;
      transform: rotate(135deg);
      box-shadow: 2px -2px 4px rgba(0, 0, 0, 0.1);
    }

    .tooltip[data-position="right"] .arrow {
      left: -4px;
      transform: rotate(-45deg);
      box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Multiline support */
    .tooltip.multiline {
      white-space: normal;
      text-align: left;
    }

    /* Interactive tooltip */
    :host([interactive]) .tooltip {
      pointer-events: auto;
    }

    /* Delay animation */
    :host([delay]) .tooltip {
      transition-delay: var(--tooltip-delay, 0.5s);
    }

    @media (prefers-reduced-motion: reduce) {
      .tooltip {
        transition: opacity 0.01ms;
      }
    }

    /* Mobile adjustments */
    @media (max-width: 640px) {
      .tooltip {
        --tooltip-max-width: min(250px, calc(100vw - 32px));
      }
    }
  `;

  @property({ type: String })
  content = '';

  @property({ type: String, reflect: true })
  variant: 'solid' | 'glass' = 'solid';

  @property({ type: String })
  position: Position = 'auto';

  @property({ type: String })
  alignment: Alignment = 'center';

  @property({ type: Number })
  offset = 8;

  @property({ type: String })
  trigger: 'hover' | 'click' | 'focus' | 'manual' = 'hover';

  @property({ type: Boolean })
  interactive = false;

  @property({ type: Boolean })
  showArrow = true;

  @property({ type: Number })
  delay = 0;

  @property({ type: Boolean })
  multiline = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _isVisible = false;

  private _triggerElement?: HTMLElement;
  private _tooltipElement?: HTMLElement;
  private _positionManager = PositionManager.getInstance();
  private _autoUpdate?: AutoUpdatePosition;
  private _showTimeout?: number;
  private _hideTimeout?: number;

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
    this._tooltipElement = this.shadowRoot?.querySelector('.tooltip') as HTMLElement;
    
    if (this._triggerElement) {
      this._setupTriggers();
    }
  }

  private _setupTriggers() {
    if (!this._triggerElement) return;

    // Set up ARIA attributes
    this._triggerElement.setAttribute('aria-describedby', 'tooltip');
    
    switch (this.trigger) {
      case 'hover':
        this._triggerElement.addEventListener('mouseenter', this._handleMouseEnter);
        this._triggerElement.addEventListener('mouseleave', this._handleMouseLeave);
        if (this.interactive && this._tooltipElement) {
          this._tooltipElement.addEventListener('mouseenter', this._handleTooltipMouseEnter);
          this._tooltipElement.addEventListener('mouseleave', this._handleTooltipMouseLeave);
        }
        break;
      case 'click':
        this._triggerElement.addEventListener('click', this._handleClick);
        document.addEventListener('click', this._handleDocumentClick);
        break;
      case 'focus':
        this._triggerElement.addEventListener('focus', this._handleFocus);
        this._triggerElement.addEventListener('blur', this._handleBlur);
        break;
    }
  }

  private _cleanup() {
    if (this._triggerElement) {
      this._triggerElement.removeEventListener('mouseenter', this._handleMouseEnter);
      this._triggerElement.removeEventListener('mouseleave', this._handleMouseLeave);
      this._triggerElement.removeEventListener('click', this._handleClick);
      this._triggerElement.removeEventListener('focus', this._handleFocus);
      this._triggerElement.removeEventListener('blur', this._handleBlur);
    }
    
    if (this._tooltipElement) {
      this._tooltipElement.removeEventListener('mouseenter', this._handleTooltipMouseEnter);
      this._tooltipElement.removeEventListener('mouseleave', this._handleTooltipMouseLeave);
    }
    
    document.removeEventListener('click', this._handleDocumentClick);
    
    this._clearTimeouts();
    this._autoUpdate?.stop();
  }

  private _handleMouseEnter = () => {
    if (this.disabled) return;
    this._showWithDelay();
  };

  private _handleMouseLeave = () => {
    this._hideWithDelay();
  };

  private _handleTooltipMouseEnter = () => {
    this._clearTimeouts();
  };

  private _handleTooltipMouseLeave = () => {
    this._hideWithDelay();
  };

  private _handleClick = (e: Event) => {
    if (this.disabled) return;
    e.stopPropagation();
    this.toggle();
  };

  private _handleDocumentClick = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.hide();
    }
  };

  private _handleFocus = () => {
    if (this.disabled) return;
    this.show();
  };

  private _handleBlur = () => {
    this.hide();
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._isVisible) {
      this.hide();
      this._triggerElement?.focus();
    }
  };

  private _showWithDelay() {
    this._clearTimeouts();
    
    if (this.delay > 0) {
      this._showTimeout = window.setTimeout(() => {
        this.show();
      }, this.delay);
    } else {
      this.show();
    }
  }

  private _hideWithDelay() {
    this._clearTimeouts();
    
    if (this.interactive) {
      // Give time to move mouse to tooltip
      this._hideTimeout = window.setTimeout(() => {
        this.hide();
      }, 100);
    } else {
      this.hide();
    }
  }

  private _clearTimeouts() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = undefined;
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    }
  }

  private _updatePosition() {
    if (!this._triggerElement || !this._tooltipElement || !this._isVisible) return;
    
    const result = this._positionManager.calculatePosition(
      this._triggerElement,
      this._tooltipElement,
      {
        position: this.position,
        alignment: this.alignment,
        offset: this.offset
      }
    );
    
    this._tooltipElement.style.left = `${result.x}px`;
    this._tooltipElement.style.top = `${result.y}px`;
    this._tooltipElement.setAttribute('data-position', result.actualPosition);
    
    // Update arrow position
    if (this.showArrow) {
      const arrow = this._tooltipElement.querySelector('.arrow') as HTMLElement;
      if (arrow) {
        const targetRect = this._triggerElement.getBoundingClientRect();
        const tooltipRect = this._tooltipElement.getBoundingClientRect();
        const arrowPos = this._positionManager.getArrowPosition(
          targetRect,
          tooltipRect,
          result.actualPosition
        );
        
        arrow.style.left = `${arrowPos.x}px`;
        arrow.style.top = `${arrowPos.y}px`;
      }
    }
  }

  /**
   * Show the tooltip
   */
  show() {
    if (this.disabled || this._isVisible) return;
    
    this._isVisible = true;
    this.requestUpdate();
    
    // Wait for render then position
    this.updateComplete.then(() => {
      this._updatePosition();
      
      // Set up auto-update
      if (this._triggerElement && this._tooltipElement) {
        this._autoUpdate = new AutoUpdatePosition(
          this._triggerElement,
          this._tooltipElement,
          () => this._updatePosition()
        );
        this._autoUpdate.start();
      }
      
      // Trigger show animation
      requestAnimationFrame(() => {
        this._tooltipElement?.setAttribute('data-show', '');
      });
    });
    
    this.dispatchEvent(new CustomEvent('glz-tooltip-show', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Hide the tooltip
   */
  hide() {
    if (!this._isVisible) return;
    
    this._isVisible = false;
    this._tooltipElement?.removeAttribute('data-show');
    this._autoUpdate?.stop();
    
    this.dispatchEvent(new CustomEvent('glz-tooltip-hide', {
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Toggle tooltip visibility
   */
  toggle() {
    if (this._isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  override render() {
    return html`
      <div class="trigger" part="trigger">
        <slot></slot>
      </div>
      
      ${this._isVisible ? html`
        <div 
          id="tooltip"
          class="tooltip ${this.multiline ? 'multiline' : ''}"
          role="tooltip"
          part="tooltip"
          @click=${(e: Event) => e.stopPropagation()}
        >
          ${this.showArrow ? html`<div class="arrow" part="arrow"></div>` : ''}
          ${this.content}
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-tooltip': GlzTooltip;
  }
}
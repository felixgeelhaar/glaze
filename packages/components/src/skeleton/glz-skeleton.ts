import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A skeleton loader component for loading states
 * @element glz-skeleton
 */
@customElement('glz-skeleton')
export class GlzSkeleton extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --skeleton-base-color: var(--color-surface-base);
      --skeleton-shine-color: rgba(255, 255, 255, 0.3);
      --skeleton-animation-duration: 1.5s;
      --skeleton-border-radius: var(--radius-sm);
    }

    .skeleton {
      position: relative;
      overflow: hidden;
      background: var(--skeleton-base-color);
      border-radius: var(--skeleton-border-radius);
    }

    /* Glass variant */
    :host([variant="glass"]) .skeleton {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
      border: 1px solid var(--color-glass-border);
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .skeleton,
    :host(.dark) :host([variant="glass"]) .skeleton {
      background: var(--color-glass-tintDark);
    }

    /* Shape variants */
    :host([type="text"]) .skeleton {
      height: 1em;
      margin: 0.25em 0;
    }

    :host([type="title"]) .skeleton {
      height: 1.5em;
      margin: 0.5em 0;
    }

    :host([type="avatar"]) .skeleton {
      width: var(--skeleton-avatar-size, 40px);
      height: var(--skeleton-avatar-size, 40px);
      border-radius: 50%;
    }

    :host([type="thumbnail"]) .skeleton {
      width: var(--skeleton-thumbnail-width, 100px);
      height: var(--skeleton-thumbnail-height, 100px);
      border-radius: var(--radius-md);
    }

    :host([type="card"]) .skeleton {
      width: 100%;
      height: var(--skeleton-card-height, 200px);
      border-radius: var(--radius-lg);
    }

    :host([type="button"]) .skeleton {
      width: var(--skeleton-button-width, 100px);
      height: var(--skeleton-button-height, 36px);
      border-radius: var(--radius-sm);
      display: inline-block;
    }

    :host([type="input"]) .skeleton {
      width: 100%;
      height: var(--skeleton-input-height, 40px);
      border-radius: var(--radius-sm);
    }

    :host([type="badge"]) .skeleton {
      width: var(--skeleton-badge-width, 60px);
      height: var(--skeleton-badge-height, 20px);
      border-radius: var(--radius-pill);
      display: inline-block;
    }

    /* Size modifiers */
    :host([size="small"]) {
      --skeleton-avatar-size: 32px;
      --skeleton-thumbnail-width: 60px;
      --skeleton-thumbnail-height: 60px;
      --skeleton-card-height: 150px;
      --skeleton-button-width: 80px;
      --skeleton-button-height: 28px;
      --skeleton-input-height: 32px;
      --skeleton-badge-width: 50px;
      --skeleton-badge-height: 16px;
    }

    :host([size="large"]) {
      --skeleton-avatar-size: 56px;
      --skeleton-thumbnail-width: 140px;
      --skeleton-thumbnail-height: 140px;
      --skeleton-card-height: 300px;
      --skeleton-button-width: 120px;
      --skeleton-button-height: 44px;
      --skeleton-input-height: 48px;
      --skeleton-badge-width: 80px;
      --skeleton-badge-height: 24px;
    }

    /* Width modifiers for text */
    :host([width="full"]) .skeleton {
      width: 100%;
    }

    :host([width="75"]) .skeleton {
      width: 75%;
    }

    :host([width="50"]) .skeleton {
      width: 50%;
    }

    :host([width="25"]) .skeleton {
      width: 25%;
    }

    /* Animation variants */
    :host([animated="pulse"]) .skeleton {
      animation: pulse var(--skeleton-animation-duration) ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    :host([animated="wave"]) .skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        var(--skeleton-shine-color),
        transparent
      );
      transform: translateX(-100%);
      animation: wave var(--skeleton-animation-duration) linear infinite;
    }

    @keyframes wave {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    :host([animated="none"]) .skeleton,
    :host([animated="none"]) .skeleton::after {
      animation: none;
    }

    /* Custom content skeleton */
    :host([type="custom"]) .skeleton {
      width: var(--skeleton-width, 100%);
      height: var(--skeleton-height, 20px);
      border-radius: var(--skeleton-radius, var(--radius-sm));
    }

    /* Container for complex layouts */
    .skeleton-container {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .skeleton-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    /* List item skeleton */
    :host([type="list-item"]) {
      display: block;
    }

    :host([type="list-item"]) .skeleton {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background: transparent;
    }

    :host([type="list-item"]) .skeleton-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--skeleton-base-color);
      flex-shrink: 0;
    }

    :host([type="list-item"]) .skeleton-lines {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    :host([type="list-item"]) .skeleton-line {
      height: 0.75rem;
      background: var(--skeleton-base-color);
      border-radius: var(--radius-sm);
    }

    :host([type="list-item"]) .skeleton-line:first-child {
      width: 60%;
    }

    :host([type="list-item"]) .skeleton-line:last-child {
      width: 80%;
    }

    /* Table row skeleton */
    :host([type="table-row"]) .skeleton {
      display: flex;
      gap: 1rem;
      padding: 0.75rem;
      background: transparent;
    }

    :host([type="table-row"]) .skeleton-cell {
      flex: 1;
      height: 1rem;
      background: var(--skeleton-base-color);
      border-radius: var(--radius-sm);
    }

    /* Animation for list items and table rows */
    :host([type="list-item"][animated="wave"]) .skeleton-avatar::after,
    :host([type="list-item"][animated="wave"]) .skeleton-line::after,
    :host([type="table-row"][animated="wave"]) .skeleton-cell::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent,
        var(--skeleton-shine-color),
        transparent
      );
      transform: translateX(-100%);
      animation: wave var(--skeleton-animation-duration) linear infinite;
    }

    :host([type="list-item"][animated="wave"]) .skeleton-avatar,
    :host([type="list-item"][animated="wave"]) .skeleton-line,
    :host([type="table-row"][animated="wave"]) .skeleton-cell {
      position: relative;
      overflow: hidden;
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton,
      .skeleton::after {
        animation: none !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  type: 'text' | 'title' | 'avatar' | 'thumbnail' | 'card' | 'button' | 'input' | 'badge' | 'list-item' | 'table-row' | 'custom' = 'text';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  width: 'full' | '75' | '50' | '25' | 'auto' = 'auto';

  @property({ type: String, reflect: true })
  animated: 'pulse' | 'wave' | 'none' = 'wave';

  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' = 'default';

  @property({ type: Number })
  lines = 1;

  @property({ type: Number })
  columns = 3;

  @property({ type: String })
  customWidth = '';

  @property({ type: String })
  customHeight = '';

  @property({ type: String })
  customRadius = '';

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('customWidth') || 
        changedProperties.has('customHeight') || 
        changedProperties.has('customRadius')) {
      this._updateCustomStyles();
    }
  }

  private _updateCustomStyles() {
    if (this.type === 'custom') {
      if (this.customWidth) {
        this.style.setProperty('--skeleton-width', this.customWidth);
      }
      if (this.customHeight) {
        this.style.setProperty('--skeleton-height', this.customHeight);
      }
      if (this.customRadius) {
        this.style.setProperty('--skeleton-radius', this.customRadius);
      }
    }
  }

  private _renderListItem() {
    return html`
      <div class="skeleton">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-lines">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    `;
  }

  private _renderTableRow() {
    return html`
      <div class="skeleton">
        ${Array.from({ length: this.columns }, () => html`
          <div class="skeleton-cell"></div>
        `)}
      </div>
    `;
  }

  private _renderMultipleLines() {
    return html`
      ${Array.from({ length: this.lines }, (_, i) => html`
        <div 
          class="skeleton" 
          style=${i === this.lines - 1 ? 'width: 60%' : ''}
        ></div>
      `)}
    `;
  }

  override render() {
    // Special rendering for complex types
    if (this.type === 'list-item') {
      return this._renderListItem();
    }

    if (this.type === 'table-row') {
      return this._renderTableRow();
    }

    // Multiple lines for text/title
    if ((this.type === 'text' || this.type === 'title') && this.lines > 1) {
      return this._renderMultipleLines();
    }

    // Default single skeleton
    return html`
      <div 
        class="skeleton" 
        role="status"
        aria-label="Loading"
        aria-busy="true"
      >
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-skeleton': GlzSkeleton;
  }
}
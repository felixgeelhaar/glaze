import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * A progress indicator component with multiple variants
 * @element glz-progress
 */
@customElement('glz-progress')
export class GlzProgress extends LitElement {
  static override styles = css`
    :host {
      display: block;
      --progress-height: 8px;
      --progress-border-radius: var(--radius-pill);
      --progress-transition: width 0.3s ease, transform 0.3s ease;
    }

    :host([size="small"]) {
      --progress-height: 4px;
    }

    :host([size="large"]) {
      --progress-height: 12px;
    }

    /* Linear Progress */
    .progress-linear {
      position: relative;
      width: 100%;
      height: var(--progress-height);
      background: var(--color-surface-base);
      border-radius: var(--progress-border-radius);
      overflow: hidden;
      border: 1px solid var(--color-glass-border);
    }

    .progress-linear-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--color-primary-base);
      border-radius: var(--progress-border-radius);
      transition: var(--progress-transition);
      transform-origin: left;
    }

    :host([color="accent"]) .progress-linear-fill {
      background: var(--color-accent-base);
    }

    :host([color="success"]) .progress-linear-fill {
      background: #10B981;
    }

    :host([color="warning"]) .progress-linear-fill {
      background: #F59E0B;
    }

    :host([color="error"]) .progress-linear-fill {
      background: #EF4444;
    }

    /* Glass variant */
    :host([variant="glass"]) .progress-linear {
      background: var(--color-glass-tintLight);
      backdrop-filter: blur(var(--blur-sm));
      -webkit-backdrop-filter: blur(var(--blur-sm));
    }

    :host([data-theme="dark"]) :host([variant="glass"]) .progress-linear,
    :host(.dark) :host([variant="glass"]) .progress-linear {
      background: var(--color-glass-tintDark);
    }

    /* Striped variant */
    :host([striped]) .progress-linear-fill {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
    }

    :host([striped][animated]) .progress-linear-fill {
      animation: stripes 1s linear infinite;
    }

    @keyframes stripes {
      from {
        background-position: 0 0;
      }
      to {
        background-position: 1rem 0;
      }
    }

    /* Indeterminate state */
    :host([indeterminate]) .progress-linear-fill {
      width: 30% !important;
      animation: indeterminate 1.5s ease-in-out infinite;
    }

    @keyframes indeterminate {
      0% {
        left: -30%;
      }
      100% {
        left: 100%;
      }
    }

    /* Circular Progress */
    .progress-circular {
      display: inline-block;
      position: relative;
      width: var(--progress-size, 48px);
      height: var(--progress-size, 48px);
    }

    :host([size="small"]) .progress-circular {
      --progress-size: 32px;
    }

    :host([size="large"]) .progress-circular {
      --progress-size: 64px;
    }

    .progress-circular-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .progress-circular-bg {
      fill: none;
      stroke: var(--color-surface-base);
      stroke-width: var(--progress-stroke-width, 4);
    }

    .progress-circular-fill {
      fill: none;
      stroke: var(--color-primary-base);
      stroke-width: var(--progress-stroke-width, 4);
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    :host([color="accent"]) .progress-circular-fill {
      stroke: var(--color-accent-base);
    }

    :host([color="success"]) .progress-circular-fill {
      stroke: #10B981;
    }

    :host([color="warning"]) .progress-circular-fill {
      stroke: #F59E0B;
    }

    :host([color="error"]) .progress-circular-fill {
      stroke: #EF4444;
    }

    :host([indeterminate]) .progress-circular-fill {
      animation: circular-dash 1.5s ease-in-out infinite,
                 circular-rotate 2s linear infinite;
    }

    @keyframes circular-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
      }
    }

    @keyframes circular-rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    /* Label */
    .progress-label {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: var(--color-bg-on);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .progress-circular-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-bg-on);
    }

    /* Buffer (for loading states) */
    .progress-linear-buffer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--color-primary-base);
      opacity: 0.3;
      border-radius: var(--progress-border-radius);
      transition: var(--progress-transition);
    }

    /* Segmented progress */
    .progress-segments {
      display: flex;
      gap: 4px;
      width: 100%;
    }

    .progress-segment {
      flex: 1;
      height: var(--progress-height);
      background: var(--color-surface-base);
      border-radius: var(--radius-sm);
      overflow: hidden;
      position: relative;
      border: 1px solid var(--color-glass-border);
    }

    .progress-segment.filled {
      background: var(--color-primary-base);
    }

    .progress-segment.partial {
      background: var(--color-surface-base);
    }

    .progress-segment.partial::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--color-primary-base);
      transition: var(--progress-transition);
    }

    @media (prefers-reduced-motion: reduce) {
      .progress-linear-fill,
      .progress-circular-fill {
        animation: none;
        transition: none;
      }
    }
  `;

  @property({ type: String, reflect: true })
  type: 'linear' | 'circular' | 'segments' = 'linear';

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  buffer = 0;

  @property({ type: Number })
  segments = 0;

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  color: 'primary' | 'accent' | 'success' | 'warning' | 'error' = 'primary';

  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' = 'default';

  @property({ type: Boolean, reflect: true })
  striped = false;

  @property({ type: Boolean, reflect: true })
  animated = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: Boolean })
  showLabel = false;

  @property({ type: Boolean })
  showValue = false;

  @property({ type: String })
  label = '';

  @property({ type: String })
  ariaLabel = '';

  @state()
  private _percentage = 0;

  override connectedCallback() {
    super.connectedCallback();
    this._updatePercentage();
  }

  override updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('value') || changedProperties.has('max')) {
      this._updatePercentage();
    }
  }

  private _updatePercentage() {
    this._percentage = Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  private _renderLinearProgress() {
    return html`
      <div
        class="progress-linear"
        role="progressbar"
        aria-valuenow=${this.indeterminate ? nothing : this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-label=${this.ariaLabel || this.label || 'Progress'}
      >
        ${this.buffer > 0 && !this.indeterminate ? html`
          <div 
            class="progress-linear-buffer"
            style="width: ${Math.min(100, (this.buffer / this.max) * 100)}%"
          ></div>
        ` : ''}
        <div
          class="progress-linear-fill"
          style="width: ${this.indeterminate ? 'auto' : `${this._percentage}%`}"
        ></div>
      </div>
      ${this.showLabel || this.showValue ? html`
        <div class="progress-label">
          <span>${this.label}</span>
          ${this.showValue && !this.indeterminate ? html`
            <span>${Math.round(this._percentage)}%</span>
          ` : ''}
        </div>
      ` : ''}
    `;
  }

  private _renderCircularProgress() {
    const size = this.size === 'small' ? 32 : this.size === 'large' ? 64 : 48;
    const strokeWidth = this.size === 'small' ? 3 : this.size === 'large' ? 5 : 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = this.indeterminate ? 0 : circumference - (this._percentage / 100) * circumference;

    return html`
      <div
        class="progress-circular"
        role="progressbar"
        aria-valuenow=${this.indeterminate ? nothing : this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-label=${this.ariaLabel || this.label || 'Progress'}
      >
        <svg class="progress-circular-svg" viewBox="0 0 ${size} ${size}">
          <circle
            class="progress-circular-bg"
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
          />
          <circle
            class="progress-circular-fill"
            cx=${size / 2}
            cy=${size / 2}
            r=${radius}
            stroke-width=${strokeWidth}
            stroke-dasharray=${circumference}
            stroke-dashoffset=${offset}
            transform-origin="${size / 2} ${size / 2}"
          />
        </svg>
        ${this.showValue && !this.indeterminate ? html`
          <div class="progress-circular-label">
            ${Math.round(this._percentage)}%
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderSegmentedProgress() {
    const segmentCount = this.segments || 5;
    const valuePerSegment = this.max / segmentCount;
    const filledSegments = Math.floor(this.value / valuePerSegment);
    const partialFill = ((this.value % valuePerSegment) / valuePerSegment) * 100;

    return html`
      <div
        class="progress-segments"
        role="progressbar"
        aria-valuenow=${this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-label=${this.ariaLabel || this.label || 'Progress'}
      >
        ${Array.from({ length: segmentCount }, (_, i) => {
          const isFilled = i < filledSegments;
          const isPartial = i === filledSegments && partialFill > 0;
          
          return html`
            <div
              class="progress-segment ${isFilled ? 'filled' : ''} ${isPartial ? 'partial' : ''}"
              style=${isPartial ? `--partial-width: ${partialFill}%` : ''}
            >
              ${isPartial ? html`
                <style>
                  .progress-segment.partial::after {
                    width: var(--partial-width);
                  }
                </style>
              ` : ''}
            </div>
          `;
        })}
      </div>
      ${this.showLabel || this.showValue ? html`
        <div class="progress-label">
          <span>${this.label}</span>
          ${this.showValue ? html`
            <span>${this.value} / ${this.max}</span>
          ` : ''}
        </div>
      ` : ''}
    `;
  }

  override render() {
    switch (this.type) {
      case 'circular':
        return this._renderCircularProgress();
      case 'segments':
        return this._renderSegmentedProgress();
      default:
        return this._renderLinearProgress();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-progress': GlzProgress;
  }
}
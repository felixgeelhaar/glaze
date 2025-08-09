/**
 * Smart positioning utilities for tooltips, dropdowns, and popovers
 */

export type Position = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type Alignment = 'start' | 'center' | 'end';

export interface PositionConfig {
  position: Position;
  alignment: Alignment;
  offset: number;
  viewport: {
    padding: number;
  };
}

export interface PositionResult {
  x: number;
  y: number;
  actualPosition: Position;
  actualAlignment: Alignment;
}

export class PositionManager {
  private static instance: PositionManager;
  
  static getInstance(): PositionManager {
    if (!PositionManager.instance) {
      PositionManager.instance = new PositionManager();
    }
    return PositionManager.instance;
  }
  
  /**
   * Calculate optimal position for an element relative to a target
   */
  calculatePosition(
    targetEl: HTMLElement,
    floatingEl: HTMLElement,
    config: Partial<PositionConfig> = {}
  ): PositionResult {
    const defaults: PositionConfig = {
      position: 'auto',
      alignment: 'center',
      offset: 8,
      viewport: {
        padding: 16
      }
    };
    
    const options = { ...defaults, ...config };
    const targetRect = targetEl.getBoundingClientRect();
    const floatingRect = floatingEl.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    let position = options.position;
    let alignment = options.alignment;
    
    // Auto position detection
    if (position === 'auto') {
      position = this.getOptimalPosition(targetRect, floatingRect, viewport, options.viewport.padding);
    }
    
    // Calculate base position
    let { x, y } = this.getBasePosition(targetRect, floatingRect, position, options.offset);
    
    // Apply alignment
    const alignmentOffset = this.getAlignmentOffset(targetRect, floatingRect, position, alignment);
    x += alignmentOffset.x;
    y += alignmentOffset.y;
    
    // Check boundaries and adjust if needed
    const adjusted = this.adjustForBoundaries(
      x, y, floatingRect, viewport, options.viewport.padding
    );
    
    if (adjusted.flipped) {
      // If we had to flip, recalculate with new position
      position = this.getOppositePosition(position);
      const base = this.getBasePosition(targetRect, floatingRect, position, options.offset);
      x = base.x;
      y = base.y;
      
      const newAlignmentOffset = this.getAlignmentOffset(targetRect, floatingRect, position, alignment);
      x += newAlignmentOffset.x;
      y += newAlignmentOffset.y;
    } else {
      x = adjusted.x;
      y = adjusted.y;
    }
    
    return {
      x,
      y,
      actualPosition: position,
      actualAlignment: alignment
    };
  }
  
  private getOptimalPosition(
    targetRect: DOMRect,
    floatingRect: DOMRect,
    viewport: { width: number; height: number },
    padding: number
  ): Position {
    const spaceAbove = targetRect.top - padding;
    const spaceBelow = viewport.height - targetRect.bottom - padding;
    const spaceLeft = targetRect.left - padding;
    const spaceRight = viewport.width - targetRect.right - padding;
    
    const verticalSpace = Math.max(spaceAbove, spaceBelow);
    const horizontalSpace = Math.max(spaceLeft, spaceRight);
    
    // Prefer vertical positioning if there's more space
    if (verticalSpace > horizontalSpace) {
      if (spaceBelow >= floatingRect.height) {
        return 'bottom';
      } else if (spaceAbove >= floatingRect.height) {
        return 'top';
      }
    }
    
    // Try horizontal if vertical doesn't fit
    if (spaceRight >= floatingRect.width) {
      return 'right';
    } else if (spaceLeft >= floatingRect.width) {
      return 'left';
    }
    
    // Default to bottom if nothing fits perfectly
    return 'bottom';
  }
  
  private getBasePosition(
    targetRect: DOMRect,
    floatingRect: DOMRect,
    position: Position,
    offset: number
  ): { x: number; y: number } {
    let x = 0;
    let y = 0;
    
    switch (position) {
      case 'top':
        x = targetRect.left;
        y = targetRect.top - floatingRect.height - offset;
        break;
      case 'bottom':
        x = targetRect.left;
        y = targetRect.bottom + offset;
        break;
      case 'left':
        x = targetRect.left - floatingRect.width - offset;
        y = targetRect.top;
        break;
      case 'right':
        x = targetRect.right + offset;
        y = targetRect.top;
        break;
    }
    
    return { x, y };
  }
  
  private getAlignmentOffset(
    targetRect: DOMRect,
    floatingRect: DOMRect,
    position: Position,
    alignment: Alignment
  ): { x: number; y: number } {
    let x = 0;
    let y = 0;
    
    if (position === 'top' || position === 'bottom') {
      // Horizontal alignment
      switch (alignment) {
        case 'start':
          x = 0;
          break;
        case 'center':
          x = (targetRect.width - floatingRect.width) / 2;
          break;
        case 'end':
          x = targetRect.width - floatingRect.width;
          break;
      }
    } else {
      // Vertical alignment
      switch (alignment) {
        case 'start':
          y = 0;
          break;
        case 'center':
          y = (targetRect.height - floatingRect.height) / 2;
          break;
        case 'end':
          y = targetRect.height - floatingRect.height;
          break;
      }
    }
    
    return { x, y };
  }
  
  private adjustForBoundaries(
    x: number,
    y: number,
    floatingRect: DOMRect,
    viewport: { width: number; height: number },
    padding: number
  ): { x: number; y: number; flipped: boolean } {
    let adjustedX = x;
    let adjustedY = y;
    let flipped = false;
    
    // Check right boundary
    if (x + floatingRect.width > viewport.width - padding) {
      adjustedX = viewport.width - floatingRect.width - padding;
    }
    
    // Check left boundary
    if (x < padding) {
      adjustedX = padding;
    }
    
    // Check bottom boundary
    if (y + floatingRect.height > viewport.height - padding) {
      adjustedY = viewport.height - floatingRect.height - padding;
      if (y < padding) {
        flipped = true;
      }
    }
    
    // Check top boundary
    if (y < padding) {
      adjustedY = padding;
      if (y + floatingRect.height > viewport.height - padding) {
        flipped = true;
      }
    }
    
    return { x: adjustedX, y: adjustedY, flipped };
  }
  
  private getOppositePosition(position: Position): Position {
    switch (position) {
      case 'top': return 'bottom';
      case 'bottom': return 'top';
      case 'left': return 'right';
      case 'right': return 'left';
      default: return position;
    }
  }
  
  /**
   * Create an arrow pointing from floating element to target
   */
  getArrowPosition(
    targetRect: DOMRect,
    floatingRect: DOMRect,
    position: Position,
    arrowSize: number = 8
  ): { x: number; y: number; rotate: number } {
    let x = 0;
    let y = 0;
    let rotate = 0;
    
    switch (position) {
      case 'top':
        x = (targetRect.left + targetRect.width / 2) - floatingRect.left;
        y = floatingRect.height;
        rotate = 180;
        break;
      case 'bottom':
        x = (targetRect.left + targetRect.width / 2) - floatingRect.left;
        y = -arrowSize;
        rotate = 0;
        break;
      case 'left':
        x = floatingRect.width;
        y = (targetRect.top + targetRect.height / 2) - floatingRect.top;
        rotate = 90;
        break;
      case 'right':
        x = -arrowSize;
        y = (targetRect.top + targetRect.height / 2) - floatingRect.top;
        rotate = -90;
        break;
    }
    
    return { x, y, rotate };
  }
}

/**
 * Auto-update position on scroll/resize
 */
export class AutoUpdatePosition {
  private rafId?: number;
  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  
  constructor(
    private targetEl: HTMLElement,
    private floatingEl: HTMLElement,
    private updateFn: () => void
  ) {}
  
  start() {
    // Listen to scroll on all parent elements
    let parent = this.targetEl.parentElement;
    while (parent) {
      parent.addEventListener('scroll', this.handleUpdate, { passive: true });
      parent = parent.parentElement;
    }
    
    // Listen to window events
    window.addEventListener('scroll', this.handleUpdate, { passive: true });
    window.addEventListener('resize', this.handleUpdate, { passive: true });
    
    // Observe target element size changes
    this.resizeObserver = new ResizeObserver(this.handleUpdate);
    this.resizeObserver.observe(this.targetEl);
    this.resizeObserver.observe(this.floatingEl);
    
    // Observe DOM changes that might affect position
    this.mutationObserver = new MutationObserver(this.handleUpdate);
    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
  
  stop() {
    // Remove scroll listeners
    let parent = this.targetEl.parentElement;
    while (parent) {
      parent.removeEventListener('scroll', this.handleUpdate);
      parent = parent.parentElement;
    }
    
    window.removeEventListener('scroll', this.handleUpdate);
    window.removeEventListener('resize', this.handleUpdate);
    
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
  
  private handleUpdate = () => {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    this.rafId = requestAnimationFrame(() => {
      this.updateFn();
    });
  };
}
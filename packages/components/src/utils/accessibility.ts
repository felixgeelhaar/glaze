
/**
 * Accessibility utilities for Glaze components
 */

/**
 * Check if user prefers reduced transparency
 */
export function prefersReducedTransparency(): boolean {
  // Check CSS media query
  const mediaQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');
  if (mediaQuery.matches) return true;
  
  // Check data attribute on document
  const dataAttr = document.documentElement.getAttribute('data-reduced-transparency');
  return dataAttr === 'reduce';
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Focus trap utility for modal components
 */
export class FocusTrap {
  private element: HTMLElement;
  private previouslyFocused: HTMLElement | null = null;
  private firstFocusable: HTMLElement | null = null;
  private lastFocusable: HTMLElement | null = null;
  
  constructor(element: HTMLElement) {
    this.element = element;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  
  activate() {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = this.getFocusableElements();
    
    if (focusables.length > 0) {
      this.firstFocusable = focusables[0] || null;
      this.lastFocusable = focusables[focusables.length - 1] || null;
      this.element.addEventListener('keydown', this.handleKeyDown);
      
      // Set initial focus
      if (this.firstFocusable) {
        this.firstFocusable.focus();
      }
      
      // Make everything outside inert
      this.setInert(true);
    }
  }
  
  deactivate() {
    this.element.removeEventListener('keydown', this.handleKeyDown);
    this.setInert(false);
    
    // Restore focus
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
    }
  }
  
  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (!this.firstFocusable || !this.lastFocusable) return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === this.firstFocusable) {
          e.preventDefault();
          this.lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === this.lastFocusable) {
          e.preventDefault();
          this.firstFocusable.focus();
        }
      }
    }
    
    if (e.key === 'Escape') {
      this.element.dispatchEvent(new CustomEvent('escape-pressed'));
    }
  }
  
  private getFocusableElements(): HTMLElement[] {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      'details',
      'summary'
    ].join(',');
    
    return Array.from(this.element.querySelectorAll(selector)) as HTMLElement[];
  }
  
  private setInert(inert: boolean) {
    // Set inert on all siblings of the trap element
    const parent = this.element.parentElement;
    if (!parent) return;
    
    Array.from(parent.children).forEach(child => {
      if (child !== this.element) {
        if (inert) {
          child.setAttribute('inert', '');
          child.setAttribute('aria-hidden', 'true');
        } else {
          child.removeAttribute('inert');
          child.removeAttribute('aria-hidden');
        }
      }
    });
  }
}

/**
 * Roving tabindex for composite widgets
 */
export class RovingTabindex {
  private container: HTMLElement;
  private items: HTMLElement[] = [];
  private currentIndex = 0;
  
  constructor(container: HTMLElement, itemSelector: string) {
    this.container = container;
    this.updateItems(itemSelector);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  activate() {
    this.container.addEventListener('keydown', this.handleKeyDown);
    this.container.addEventListener('click', this.handleClick);
    this.updateTabindexes();
  }
  
  deactivate() {
    this.container.removeEventListener('keydown', this.handleKeyDown);
    this.container.removeEventListener('click', this.handleClick);
  }
  
  updateItems(itemSelector: string) {
    this.items = Array.from(this.container.querySelectorAll(itemSelector)) as HTMLElement[];
  }
  
  private handleKeyDown(e: KeyboardEvent) {
    let handled = false;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        this.moveFocus(1);
        handled = true;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        this.moveFocus(-1);
        handled = true;
        break;
      case 'Home':
        this.setFocus(0);
        handled = true;
        break;
      case 'End':
        this.setFocus(this.items.length - 1);
        handled = true;
        break;
    }
    
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  
  private handleClick(e: Event) {
    const target = e.target as HTMLElement;
    const index = this.items.indexOf(target);
    if (index >= 0) {
      this.setFocus(index);
    }
  }
  
  private moveFocus(direction: number) {
    const newIndex = (this.currentIndex + direction + this.items.length) % this.items.length;
    this.setFocus(newIndex);
  }
  
  private setFocus(index: number) {
    if (index < 0 || index >= this.items.length) return;
    
    this.currentIndex = index;
    this.updateTabindexes();
    const item = this.items[index];
    if (item) {
      item.focus();
    }
  }
  
  private updateTabindexes() {
    this.items.forEach((item, index) => {
      item.tabIndex = index === this.currentIndex ? 0 : -1;
    });
  }
}

/**
 * Live region announcer for screen readers
 */
export class LiveAnnouncer {
  private static instance: LiveAnnouncer;
  private liveRegion: HTMLElement;
  
  private constructor() {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.style.position = 'absolute';
    this.liveRegion.style.left = '-10000px';
    this.liveRegion.style.width = '1px';
    this.liveRegion.style.height = '1px';
    this.liveRegion.style.overflow = 'hidden';
    document.body.appendChild(this.liveRegion);
  }
  
  static getInstance(): LiveAnnouncer {
    if (!LiveAnnouncer.instance) {
      LiveAnnouncer.instance = new LiveAnnouncer();
    }
    return LiveAnnouncer.instance!;
  }
  
  announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    this.liveRegion.setAttribute('aria-live', priority);
    this.liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      this.liveRegion.textContent = '';
    }, 1000);
  }
}

/**
 * Helper to apply reduced transparency styles to a component
 */
export function applyReducedTransparency(element: HTMLElement) {
  if (prefersReducedTransparency()) {
    element.setAttribute('data-reduced-transparency', 'reduce');
  }
  
  // Listen for changes
  const mediaQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');
  const updateTransparency = () => {
    if (mediaQuery.matches) {
      element.setAttribute('data-reduced-transparency', 'reduce');
    } else {
      element.removeAttribute('data-reduced-transparency');
    }
  };
  
  mediaQuery.addEventListener('change', updateTransparency);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', updateTransparency);
  };
}
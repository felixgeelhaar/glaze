// Test setup file
import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';

// Extend Vitest expect interface with custom jest-axe matchers
declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
  
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): any;
  }
}

// Setup custom jest-axe matcher for Vitest
expect.extend({
  toHaveNoViolations(received: any) {
    if (!received || !received.violations) {
      return {
        message: () => 'Expected axe results but received ' + typeof received,
        pass: false,
      };
    }
    
    if (received.violations.length === 0) {
      return {
        message: () => 'Expected violations but found none',
        pass: true,
      };
    }
    
    const violationMessages = received.violations.map((violation: any) => {
      const nodeMessages = violation.nodes.map((node: any) => {
        return `    ${node.html}`;
      }).join('\n');
      
      return `${violation.help} (${violation.id})\n${nodeMessages}`;
    }).join('\n\n');
    
    return {
      message: () => `Expected no accessibility violations but found ${received.violations.length}:\n\n${violationMessages}`,
      pass: false,
    };
  },
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
};
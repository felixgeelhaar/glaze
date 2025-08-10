// Type definitions for jest-axe usage with Vitest
/// <reference types="vitest" />
import type { AxeResults } from 'axe-core';

declare module 'jest-axe' {
  export function axe(html: Element | string, options?: any): Promise<AxeResults>;
  export function toHaveNoViolations(results: AxeResults): any;
}

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
  
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): any;
  }
}
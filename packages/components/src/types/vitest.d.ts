// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AxeResults } from 'jest-axe';

declare global {
  namespace Vi {
    interface Assertion {
      toHaveNoViolations(): void;
    }
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): void;
    }
  }
}

export {};
declare module 'jest-axe' {
  export interface AxeResults {
    violations: any[];
    passes: any[];
    incomplete: any[];
    inapplicable: any[];
  }

  export function axe(element: Element | string): Promise<AxeResults>;
  export function toHaveNoViolations(results: AxeResults): {
    pass: boolean;
    message: () => string;
  };
}
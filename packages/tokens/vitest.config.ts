import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // The snapshot suite's beforeAll runs the full token build (style-dictionary);
    // it takes 4-7s idle and exceeded the 10s default under parallel turbo load.
    hookTimeout: 60000,
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
});
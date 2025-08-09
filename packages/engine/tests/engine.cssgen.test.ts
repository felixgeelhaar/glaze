import { describe, it, expect, beforeAll } from 'vitest';
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';
import { glazePreset } from '../src/preset.js';
import { glazePlugin } from '../src/glass.plugin.js';

describe('Engine CSS Generation', () => {
  let generatedCSS = '';

  beforeAll(async () => {
    // Create a minimal Tailwind configuration
    const config = {
      content: [
        {
          raw: `
            <div class="glass"></div>
            <div class="glass-sm"></div>
            <div class="glass-md"></div>
            <div class="glass-lg"></div>
            <div class="surface"></div>
            <button class="btn"></button>
            <button class="btn-primary"></button>
            <div class="card"></div>
            <input class="field" />
            <div class="bg-primary text-primary-on"></div>
            <div class="backdrop-blur-md"></div>
          `,
        },
      ],
      presets: [glazePreset],
      plugins: [glazePlugin],
    };

    // Process CSS with Tailwind
    const input = '@tailwind base; @tailwind components; @tailwind utilities;';
    const result = await postcss([
      tailwindcss(config),
    ]).process(input, { from: undefined });

    generatedCSS = result.css;
  });

  it('should generate glass utilities', () => {
    expect(generatedCSS).toContain('.glass');
    expect(generatedCSS).toContain('.glass-sm');
    expect(generatedCSS).toContain('.glass-md');
    expect(generatedCSS).toContain('.glass-lg');
  });

  it('should include backdrop-filter blur', () => {
    expect(generatedCSS).toContain('backdrop-filter');
    expect(generatedCSS).toContain('blur(var(--blur-');
  });

  it('should generate surface utility', () => {
    expect(generatedCSS).toContain('.surface');
    expect(generatedCSS).toContain('--color-surface-base');
    expect(generatedCSS).toContain('--color-surface-on');
  });

  it('should generate button components', () => {
    expect(generatedCSS).toContain('.btn');
    expect(generatedCSS).toContain('.btn-primary');
    expect(generatedCSS).toContain('--color-primary-base');
    expect(generatedCSS).toContain('--color-primary-on');
  });

  it('should generate card component', () => {
    expect(generatedCSS).toContain('.card');
    expect(generatedCSS).toContain('--radius-lg');
    expect(generatedCSS).toContain('--elevation-1');
  });

  it('should generate field component', () => {
    expect(generatedCSS).toContain('.field');
    expect(generatedCSS).toContain('--color-bg-base');
    expect(generatedCSS).toContain('--radius-sm');
  });

  it('should include glass properties', () => {
    expect(generatedCSS).toContain('--color-glass-tintLight');
    expect(generatedCSS).toContain('--color-glass-border');
    expect(generatedCSS).toContain('--elevation-glass');
  });

  it('should support dark mode glass', () => {
    expect(generatedCSS).toContain('[data-theme="dark"] .glass');
    expect(generatedCSS).toContain('--color-glass-tintDark');
  });

  it('should include theme color utilities', () => {
    expect(generatedCSS).toContain('.bg-primary');
    expect(generatedCSS).toContain('.text-primary-on');
    expect(generatedCSS).toContain('var(--color-primary');
  });

  it('should include backdrop blur utilities', () => {
    expect(generatedCSS).toContain('.backdrop-blur-md');
    expect(generatedCSS).toContain('var(--blur-md)');
  });
});
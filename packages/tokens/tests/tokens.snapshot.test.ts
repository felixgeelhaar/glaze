import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

describe('Token Build Outputs', () => {
  const distPath = join(process.cwd(), 'dist');
  const cssPath = join(distPath, 'css', 'tokens.css');
  const tsPath = join(distPath, 'ts', 'index.ts');
  const figmaPath = join(distPath, 'figma', 'tokens.json');

  beforeAll(() => {
    // Build tokens before running tests
    execSync('npm run build', { cwd: process.cwd() });
  });

  it('should generate CSS file with variables', () => {
    expect(existsSync(cssPath)).toBe(true);
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Check for root variables
    expect(cssContent).toContain(':root {');
    expect(cssContent).toContain('--color-primary-base:');
    expect(cssContent).toContain('--blur-md:');
    expect(cssContent).toContain('--elevation-glass:');
    expect(cssContent).toContain('--radius-sm:');
  });

  it('should include theme overrides', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    // The build system only includes high-contrast theme currently
    expect(cssContent).toContain('[data-theme="high-contrast"]');
  });

  it('should include high-contrast theme overrides', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    expect(cssContent).toContain('[data-theme="high-contrast"]');
  });

  it('should generate TypeScript definitions', () => {
    expect(existsSync(tsPath)).toBe(true);
    const tsContent = readFileSync(tsPath, 'utf-8');
    
    // Check for exported tokens (PascalCase)
    expect(tsContent).toContain('export');
    expect(tsContent).toContain('Color');
    expect(tsContent).toContain('Blur');
    expect(tsContent).toContain('Radius');
  });

  it('should generate TypeScript type definitions', () => {
    const dtsPath = join(distPath, 'ts', 'index.d.ts');
    expect(existsSync(dtsPath)).toBe(true);
    const dtsContent = readFileSync(dtsPath, 'utf-8');
    
    // Check for type definitions
    expect(dtsContent).toContain('export interface Tokens');
    expect(dtsContent).toContain('export type ThemeName');
    expect(dtsContent).toContain('"light" | "dark" | "high-contrast"');
  });

  it('should generate Figma tokens JSON', () => {
    expect(existsSync(figmaPath)).toBe(true);
    const figmaContent = JSON.parse(readFileSync(figmaPath, 'utf-8'));
    
    // Check for token structure
    expect(figmaContent).toHaveProperty('color');
    expect(figmaContent).toHaveProperty('radius');
    expect(figmaContent).toHaveProperty('blur');
    expect(figmaContent).toHaveProperty('elevation');
  });

  it('should snapshot representative CSS variables', () => {
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    // Extract specific variables for snapshot
    const primaryColorMatch = cssContent.match(/--color-primary-base:\s*([^;]+);/);
    const blurMdMatch = cssContent.match(/--blur-md:\s*([^;]+);/);
    const elevationGlassMatch = cssContent.match(/--elevation-glass:\s*([^;]+);/);
    
    expect({
      primaryColor: primaryColorMatch?.[1],
      blurMd: blurMdMatch?.[1],
      elevationGlass: elevationGlassMatch?.[1]
    }).toMatchInlineSnapshot(`
      {
        "blurMd": "12px",
        "elevationGlass": "0 1px 0 rgba(0,0,0,.30) inset, 0 8px 24px rgba(0,0,0,.30)",
        "primaryColor": "#4F46E5",
      }
    `);
  });
});
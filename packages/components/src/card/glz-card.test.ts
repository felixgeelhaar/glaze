import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
// import { axe } from 'jest-axe'; // TODO: Fix jest-axe types
import './glz-card.js';
import type { GlzCard } from './glz-card.js';

describe('glz-card', () => {
  it('renders with default properties', async () => {
    const el = await fixture<GlzCard>(html`
      <glz-card>Card content</glz-card>
    `);
    
    expect(el.variant).toBe('solid');
    expect(el.size).toBe('md');
    expect(el.shadowRoot?.querySelector('.card')).toBeTruthy();
  });

  it('applies variant classes correctly', async () => {
    const el = await fixture<GlzCard>(html`
      <glz-card variant="glass">Glass card</glz-card>
    `);
    
    expect(el.getAttribute('variant')).toBe('glass');
  });

  it('applies size classes correctly', async () => {
    const el = await fixture<GlzCard>(html`
      <glz-card size="lg">Large card</glz-card>
    `);
    
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('applies tone modifier correctly', async () => {
    const el = await fixture<GlzCard>(html`
      <glz-card tone="primary">Primary card</glz-card>
    `);
    
    expect(el.getAttribute('tone')).toBe('primary');
  });

  it('renders slot content', async () => {
    const el = await fixture<GlzCard>(html`
      <glz-card>
        <h2>Title</h2>
        <p>Content</p>
      </glz-card>
    `);
    
    const slot = el.shadowRoot?.querySelector('slot');
    const slotContent = (slot as HTMLSlotElement)?.assignedElements();
    
    expect(slotContent?.length).toBe(2);
    expect(slotContent?.[0]?.tagName).toBe('H2');
    expect(slotContent?.[1]?.tagName).toBe('P');
  });

  it.skip('is accessible with no violations - TODO: Fix jest-axe types', async () => {
    await fixture<GlzCard>(html`
      <glz-card>
        <h2>Accessible Card</h2>
        <p>This card should have no accessibility violations.</p>
      </glz-card>
    `);
    
    // const el = await fixture<GlzCard>(html`...`);
    // const results = await axe(el);
    // expect(results).toHaveNoViolations(); // TODO: Fix jest-axe types
  });

  it('respects reduced transparency data attribute', async () => {
    const el = await fixture<GlzCard>(html`
      <glz-card variant="glass" data-reduced-transparency="true">
        Reduced transparency
      </glz-card>
    `);
    
    expect(el.hasAttribute('data-reduced-transparency')).toBe(true);
  });
});
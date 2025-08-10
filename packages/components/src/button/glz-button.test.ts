import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
// import { axe } from 'jest-axe'; // TODO: Fix jest-axe types
import './glz-button.js';
import type { GlzButton } from './glz-button.js';

describe('glz-button', () => {
  it('renders with default properties', async () => {
    const el = await fixture<GlzButton>(html`
      <glz-button>Click me</glz-button>
    `);
    
    expect(el.variant).toBe('solid');
    expect(el.size).toBe('md');
    expect(el.disabled).toBe(false);
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    const el = await fixture<GlzButton>(html`
      <glz-button @click="${onClick}">Click me</glz-button>
    `);
    
    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('prevents clicks when disabled', async () => {
    const onClick = vi.fn();
    const el = await fixture<GlzButton>(html`
      <glz-button disabled @click="${onClick}">Disabled</glz-button>
    `);
    
    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    
    expect(onClick).not.toHaveBeenCalled();
  });

  it('handles keyboard activation with Space', async () => {
    const onClick = vi.fn();
    const el = await fixture<GlzButton>(html`
      <glz-button @click="${onClick}">Press Space</glz-button>
    `);
    
    const button = el.shadowRoot?.querySelector('button');
    if (button) {
      button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      button.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
    }
    
    expect(onClick).toHaveBeenCalled();
  });

  it('handles keyboard activation with Enter', async () => {
    const onClick = vi.fn();
    const el = await fixture<GlzButton>(html`
      <glz-button @click="${onClick}">Press Enter</glz-button>
    `);
    
    const button = el.shadowRoot?.querySelector('button');
    if (button) {
      button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      button.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    }
    
    expect(onClick).toHaveBeenCalled();
  });

  it('toggles aria-pressed for toggle buttons', async () => {
    const el = await fixture<GlzButton>(html`
      <glz-button aria-pressed="false">Toggle</glz-button>
    `);
    
    expect(el.pressed).toBe(false);
    
    const button = el.shadowRoot?.querySelector('button');
    button?.click();
    
    expect(el.pressed).toBe(true);
    expect(el.getAttribute('aria-pressed')).toBe('true');
  });

  it('shows loading spinner when loading', async () => {
    const el = await fixture<GlzButton>(html`
      <glz-button loading>Loading</glz-button>
    `);
    
    const spinner = el.shadowRoot?.querySelector('.spinner');
    expect(spinner).toBeTruthy();
    
    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-busy')).toBe('true');
  });

  it.skip('is accessible with no violations - TODO: Fix jest-axe types', async () => {
    await fixture<GlzButton>(html`
      <glz-button>Accessible Button</glz-button>
    `);
    
    // const el = await fixture<GlzButton>(html`<glz-button>Accessible Button</glz-button>`);
    // const results = await axe(el);
    // expect(results).toHaveNoViolations(); // TODO: Fix jest-axe types
  });

  it('maintains focus visibility', async () => {
    const el = await fixture<GlzButton>(html`
      <glz-button>Focus Test</glz-button>
    `);
    
    const button = el.shadowRoot?.querySelector('button');
    button?.focus();
    
    if (button) {
      const styles = getComputedStyle(button);
      expect(styles.outlineStyle).toBeTruthy();
    }
  });
});
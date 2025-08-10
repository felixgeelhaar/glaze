import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
// import { axe } from "jest-axe"; // TODO: Fix jest-axe types
import './glz-dialog.js';
import type { GlzDialog } from './glz-dialog.js';


describe('glz-dialog', () => {
  let originalBodyOverflow: string;

  beforeEach(() => {
    originalBodyOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalBodyOverflow;
  });

  it('renders with default properties', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Dialog content</glz-dialog>
    `);
    
    expect(el.open).toBe(false);
    expect(el.variant).toBe('solid');
    expect(el.label).toBe('Dialog');
  });

  it('shows and hides dialog', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Content</glz-dialog>
    `);
    
    expect(el.open).toBe(false);
    
    el.show();
    await el.updateComplete;
    
    expect(el.open).toBe(true);
    expect(el.hasAttribute('open')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    
    el.close();
    await el.updateComplete;
    
    expect(el.open).toBe(false);
    expect(el.hasAttribute('open')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on Escape key', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Content</glz-dialog>
    `);
    
    el.show();
    await el.updateComplete;
    // Wait a frame for event listener to be attached
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    
    expect(el.open).toBe(false);
  });

  it('closes on backdrop click', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Content</glz-dialog>
    `);
    
    el.show();
    await el.updateComplete;
    
    const backdrop = el.shadowRoot?.querySelector('.backdrop') as HTMLElement;
    backdrop?.click();
    
    expect(el.open).toBe(false);
  });

  it('does not close on dialog content click', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Content</glz-dialog>
    `);
    
    el.show();
    await el.updateComplete;
    
    const dialog = el.shadowRoot?.querySelector('.dialog') as HTMLElement;
    dialog?.click();
    
    expect(el.open).toBe(true);
  });

  it('closes with close button', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Content</glz-dialog>
    `);
    
    el.show();
    await el.updateComplete;
    
    const closeBtn = el.shadowRoot?.querySelector('.close-button') as HTMLElement;
    closeBtn?.click();
    
    expect(el.open).toBe(false);
  });

  it('dispatches close event', async () => {
    const onClose = vi.fn();
    const el = await fixture<GlzDialog>(html`
      <glz-dialog @glz-dialog-close="${onClose}">Content</glz-dialog>
    `);
    
    el.show();
    await el.updateComplete;
    el.close();
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('restores focus to previous element', async () => {
    const button = await fixture<HTMLButtonElement>(html`
      <button>Trigger</button>
    `);
    
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Content</glz-dialog>
    `);
    
    button.focus();
    expect(document.activeElement).toBe(button);
    
    el.show();
    await el.updateComplete;
    
    el.close();
    await el.updateComplete;
    
    expect(document.activeElement).toBe(button);
  });

  it('focuses close button on open', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog>Content</glz-dialog>
    `);
    
    el.show();
    await el.updateComplete;
    
    // Wait for focus to be set
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const closeBtn = el.shadowRoot?.querySelector('.close-button') as HTMLElement;
    expect(el.shadowRoot?.activeElement).toBe(closeBtn);
  });

  it('has proper ARIA attributes', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog label="Custom Dialog">Content</glz-dialog>
    `);
    
    el.show();
    await el.updateComplete;
    
    const dialog = el.shadowRoot?.querySelector('.dialog') as HTMLElement;
    
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-label')).toBe('Custom Dialog');
  });

  it.skip('is accessible with no violations when closed - TODO: Fix jest-axe types', async () => {
    await fixture<GlzDialog>(html`
      <glz-dialog>Accessible Dialog</glz-dialog>
    `);
    
    // const el = await fixture<GlzDialog>(html`<glz-dialog>Accessible Dialog</glz-dialog>`);
    // const results = await axe(el);
    // expect(results).toHaveNoViolations(); // TODO: Fix jest-axe types
  });

  it('applies glass variant styles', async () => {
    const el = await fixture<GlzDialog>(html`
      <glz-dialog variant="glass">Glass Dialog</glz-dialog>
    `);
    
    expect(el.getAttribute('variant')).toBe('glass');
  });
});
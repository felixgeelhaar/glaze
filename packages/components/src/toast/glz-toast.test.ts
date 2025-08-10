import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
// import { axe } from "jest-axe"; // TODO: Fix jest-axe types
import './glz-toast.js';
import type { GlzToast } from './glz-toast.js';


describe('glz-toast', () => {
  let timers: number[] = [];
  const originalClearTimeout = window.clearTimeout;

  beforeEach(() => {
    timers = [];
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    timers.forEach(timer => originalClearTimeout(timer));
  });

  it('renders with default properties', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast message="Test message"></glz-toast>
    `);
    
    expect(el.variant).toBe('solid');
    expect(el.type).toBe('info');
    expect(el.position).toBe('bottom-right');
    expect(el.duration).toBe(5000);
    expect(el.closable).toBe(true);
  });

  it('shows and hides toast', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast message="Test"></glz-toast>
    `);
    
    expect(el.open).toBe(false);
    
    el.show();
    await el.updateComplete;
    expect(el.open).toBe(true);
    
    el.close();
    await el.updateComplete;
    vi.advanceTimersByTime(300);
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('renders title and message', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast 
        title="Success!" 
        message="Your changes have been saved."
        open
      ></glz-toast>
    `);
    
    await el.updateComplete;
    
    const title = el.shadowRoot?.querySelector('.title');
    const message = el.shadowRoot?.querySelector('.message');
    
    expect(title?.textContent).toBe('Success!');
    expect(message?.textContent).toBe('Your changes have been saved.');
  });

  it('auto-closes after duration', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast message="Auto close" duration="3000"></glz-toast>
    `);
    
    el.show();
    await el.updateComplete;
    expect(el.open).toBe(true);
    
    vi.advanceTimersByTime(3000);
    await el.updateComplete;
    vi.advanceTimersByTime(300); // Animation time
    await el.updateComplete;
    
    expect(el.open).toBe(false);
  });

  it('does not auto-close when duration is 0', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast message="Persistent" duration="0"></glz-toast>
    `);
    
    el.show();
    await el.updateComplete;
    
    vi.advanceTimersByTime(10000);
    await el.updateComplete;
    
    expect(el.open).toBe(true);
  });

  it('closes with close button', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast message="Closable" closable open></glz-toast>
    `);
    
    const closeBtn = el.shadowRoot?.querySelector('.close-button') as HTMLButtonElement;
    expect(closeBtn).toBeTruthy();
    
    closeBtn.click();
    await el.updateComplete;
    vi.advanceTimersByTime(300);
    await el.updateComplete;
    
    expect(el.open).toBe(false);
  });

  it('does not show close button when not closable', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast message="Not closable" .closable="${false}" open></glz-toast>
    `);
    
    const closeBtn = el.shadowRoot?.querySelector('.close-button');
    expect(closeBtn).toBeFalsy();
  });

  it('displays correct icon for each type', async () => {
    const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
    
    for (const type of types) {
      const el = await fixture<GlzToast>(html`
        <glz-toast message="Test" type="${type}" open></glz-toast>
      `);
      
      const icon = el.shadowRoot?.querySelector('.icon');
      expect(icon).toBeTruthy();
    }
  });

  it('shows progress bar when enabled', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast 
        message="With progress" 
        open
      ></glz-toast>
    `);
    
    // Set properties directly
    el.showProgress = true;
    el.duration = 5000;
    await el.updateComplete;
    
    const progressBar = el.shadowRoot?.querySelector('.progress-bar');
    expect(progressBar).toBeTruthy();
    expect(progressBar?.getAttribute('style')).toContain('--duration: 5000ms');
  });

  it('dispatches close event', async () => {
    const onClose = vi.fn();
    const el = await fixture<GlzToast>(html`
      <glz-toast 
        message="Test" 
        @glz-toast-close="${onClose}"
      ></glz-toast>
    `);
    
    el.show();
    await el.updateComplete;
    el.close();
    vi.advanceTimersByTime(300);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies position classes correctly', async () => {
    const positions = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ] as const;
    
    for (const position of positions) {
      const el = await fixture<GlzToast>(html`
        <glz-toast message="Test" position="${position}"></glz-toast>
      `);
      
      expect(el.getAttribute('position')).toBe(position);
    }
  });

  it('has proper ARIA attributes', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast 
        type="error"
        title="Error"
        message="Something went wrong"
        open
      ></glz-toast>
    `);
    
    const toast = el.shadowRoot?.querySelector('.toast');
    expect(toast?.getAttribute('role')).toBe('alert');
    expect(toast?.getAttribute('aria-live')).toBe('assertive');
    expect(toast?.getAttribute('aria-atomic')).toBe('true');
  });

  it('uses polite aria-live for non-error types', async () => {
    const el = await fixture<GlzToast>(html`
      <glz-toast 
        type="info"
        message="Information"
        open
      ></glz-toast>
    `);
    
    const toast = el.shadowRoot?.querySelector('.toast');
    expect(toast?.getAttribute('aria-live')).toBe('polite');
  });

  it.skip('is accessible with no violations - TODO: Fix jest-axe types', async () => {
    await fixture<GlzToast>(html`
      <glz-toast 
        title="Accessible Toast"
        message="This toast is accessible"
        open
      ></glz-toast>
    `);
    
    // const el = await fixture<GlzToast>(html`...`);
    // const results = await axe(el);
    // expect(results).toHaveNoViolations(); // TODO: Fix jest-axe types
  });
});
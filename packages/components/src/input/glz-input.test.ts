import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
// import { axe } from "jest-axe"; // TODO: Fix jest-axe types
import './glz-input.js';
import type { GlzInput } from './glz-input.js';


describe('glz-input', () => {
  it('renders with default properties', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input></glz-input>
    `);
    
    expect(el.variant).toBe('solid');
    expect(el.size).toBe('md');
    expect(el.type).toBe('text');
    expect(el.disabled).toBe(false);
  });

  it('renders with label', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input label="Email Address"></glz-input>
    `);
    
    const label = el.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toContain('Email Address');
  });

  it('shows required indicator', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input label="Name" required></glz-input>
    `);
    
    const required = el.shadowRoot?.querySelector('.required');
    expect(required).toBeTruthy();
    expect(required?.textContent).toBe('*');
    
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.hasAttribute('required')).toBe(true);
    expect(input?.getAttribute('aria-required')).toBe('true');
  });

  it('handles input events', async () => {
    const onInput = vi.fn();
    const el = await fixture<GlzInput>(html`
      <glz-input @input="${onInput}"></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    
    expect(onInput).toHaveBeenCalled();
    expect(el.value).toBe('test');
  });

  it('handles change events', async () => {
    const onChange = vi.fn();
    const el = await fixture<GlzInput>(html`
      <glz-input @change="${onChange}"></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'changed';
    input.dispatchEvent(new Event('change'));
    
    expect(onChange).toHaveBeenCalled();
    expect(el.value).toBe('changed');
  });

  it('validates required field on blur', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input required></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new FocusEvent('blur'));
    await el.updateComplete;
    
    expect(el.error).toBe(true);
    expect(el.errorMessage).toBe('This field is required');
  });

  it('clears error on input', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input error error-message="Invalid input"></glz-input>
    `);
    
    expect(el.error).toBe(true);
    
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'valid';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    
    expect(el.error).toBe(false);
  });

  it('displays error message', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input error error-message="Please enter a valid email"></glz-input>
    `);
    
    const errorDiv = el.shadowRoot?.querySelector('.error-message');
    expect(errorDiv).toBeTruthy();
    expect(errorDiv?.textContent?.trim()).toContain('Please enter a valid email');
    expect(errorDiv?.getAttribute('role')).toBe('alert');
  });

  it('displays helper text', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input helper-text="Enter your full name"></glz-input>
    `);
    
    const helper = el.shadowRoot?.querySelector('.helper-text');
    expect(helper?.textContent).toBe('Enter your full name');
  });

  it('applies disabled state', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input disabled></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('applies readonly state', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input readonly value="Read only"></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.readOnly).toBe(true);
  });

  it('supports different input types', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input type="email"></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('email');
  });

  it('supports pattern validation', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input pattern="[0-9]+"></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.pattern).toBe('[0-9]+');
  });

  it('supports min and max for number inputs', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input type="number" min="0" max="100" step="5"></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.min).toBe('0');
    expect(input?.max).toBe('100');
    expect(input?.step).toBe('5');
  });

  it('focuses input element', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input></glz-input>
    `);
    
    el.focus();
    
    const input = el.shadowRoot?.querySelector('input');
    expect(el.shadowRoot?.activeElement).toBe(input);
  });

  it('has proper ARIA attributes', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input 
        label="Test Input"
        required
        error
        error-message="Error"
        helper-text="Help"
      ></glz-input>
    `);
    
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-label')).toBe('Test Input');
    expect(input?.getAttribute('aria-required')).toBe('true');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-describedby')).toContain('error');
  });

  it.skip('is accessible with no violations - TODO: Fix jest-axe types', async () => {
    await fixture<GlzInput>(html`
      <glz-input label="Accessible Input"></glz-input>
    `);
    
    // const el = await fixture<GlzInput>(html`<glz-input label="Accessible Input"></glz-input>`);
    // const results = await axe(el);
    // expect(results).toHaveNoViolations(); // TODO: Fix jest-axe types
  });

  it('handles icon slots', async () => {
    const el = await fixture<GlzInput>(html`
      <glz-input>
        <span slot="icon-start">👤</span>
        <span slot="icon-end">✓</span>
      </glz-input>
    `);
    
    await el.updateComplete;
    
    expect(el.hasAttribute('has-icon-start')).toBe(true);
    expect(el.hasAttribute('has-icon-end')).toBe(true);
  });
});
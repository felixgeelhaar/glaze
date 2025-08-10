import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './glz-select.js';
import type { GlzSelect } from './glz-select.js';


const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4' },
];

describe('glz-select', () => {
  it('renders with default properties', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}"></glz-select>
    `);
    
    expect(el.variant).toBe('solid');
    expect(el.size).toBe('md');
    expect(el.placeholder).toBe('Select an option');
    expect(el.open).toBe(false);
  });

  it('renders with label', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select label="Choose Option" .options="${mockOptions}"></glz-select>
    `);
    
    const label = el.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).toContain('Choose Option');
  });

  it('shows required indicator', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select label="Required Field" required .options="${mockOptions}"></glz-select>
    `);
    
    const required = el.shadowRoot?.querySelector('.required');
    expect(required).toBeTruthy();
    expect(required?.textContent).toBe('*');
  });

  it('opens and closes dropdown', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}"></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    
    trigger.click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    
    trigger.click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('selects an option', async () => {
    const onChange = vi.fn();
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}" @change="${onChange}"></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    trigger.click();
    await el.updateComplete;
    
    const options = el.shadowRoot?.querySelectorAll('.option');
    (options?.[1] as HTMLElement)?.click();
    
    expect(el.value).toBe('option2');
    expect(onChange).toHaveBeenCalled();
    expect(el.open).toBe(false);
  });

  it('displays selected option label', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}" value="option2"></glz-select>
    `);
    
    await el.updateComplete;
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger');
    expect(trigger?.textContent?.trim()).toContain('Option 2');
  });

  it('does not select disabled option', async () => {
    const onChange = vi.fn();
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}" @change="${onChange}"></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    trigger.click();
    await el.updateComplete;
    
    const disabledOption = el.shadowRoot?.querySelectorAll('.option')[2] as HTMLElement;
    disabledOption?.click();
    
    expect(el.value).toBe('');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}"></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    
    // Open with Enter
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    expect(el.open).toBe(true);
    
    // Navigate down
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await el.updateComplete;
    
    // Select with Enter
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    
    expect(el.value).toBe('option1');
    expect(el.open).toBe(false);
  });

  it('closes on Escape key', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}"></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    trigger.click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('closes when clicking outside', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}"></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    trigger.click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    
    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('handles multiple selection', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}" multiple></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    trigger.click();
    await el.updateComplete;
    
    const options = el.shadowRoot?.querySelectorAll('.option');
    (options?.[0] as HTMLElement)?.click();
    await el.updateComplete;
    expect(el.open).toBe(true); // Stays open for multiple
    
    (options?.[1] as HTMLElement)?.click();
    await el.updateComplete;
    
    expect(el.value).toContain('option1');
    expect(el.value).toContain('option2');
  });

  it('displays error state', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select 
        .options="${mockOptions}" 
        error 
      ></glz-select>
    `);
    
    // Set properties directly
    el.errorMessage = 'Please select an option';
    await el.updateComplete;
    
    const errorDiv = el.shadowRoot?.querySelector('.error-message');
    expect(errorDiv).toBeTruthy();
    expect(errorDiv?.textContent?.trim()).toContain('Please select an option');
  });

  it('displays helper text', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select 
        .options="${mockOptions}" 
      ></glz-select>
    `);
    
    // Set properties directly
    el.helperText = 'Choose wisely';
    await el.updateComplete;
    
    const helper = el.shadowRoot?.querySelector('.helper-text');
    expect(helper?.textContent?.trim()).toBe('Choose wisely');
  });

  it('is disabled when disabled prop is set', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select .options="${mockOptions}" disabled></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
    expect(trigger.disabled).toBe(true);
    
    trigger.click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('has proper ARIA attributes', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select 
        label="Test Select"
        .options="${mockOptions}"
        required
      ></glz-select>
    `);
    
    const trigger = el.shadowRoot?.querySelector('.select-trigger');
    expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
    expect(trigger?.getAttribute('aria-required')).toBe('true');
    
    const dropdown = el.shadowRoot?.querySelector('.dropdown');
    expect(dropdown?.getAttribute('role')).toBe('listbox');
  });

  it('is accessible with no violations', async () => {
    const el = await fixture<GlzSelect>(html`
      <glz-select label="Accessible Select" .options="${mockOptions}"></glz-select>
    `);
    
    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });
});
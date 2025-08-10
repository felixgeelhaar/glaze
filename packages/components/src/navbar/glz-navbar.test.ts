import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
// import { axe } from "jest-axe"; // TODO: Fix jest-axe types
import './glz-navbar.js';
import type { GlzNavbar } from './glz-navbar.js';


describe('glz-navbar', () => {
  it('renders with default properties', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar></glz-navbar>
    `);
    
    expect(el.variant).toBe('solid');
    expect(el.size).toBe('md');
    expect(el.fixed).toBe(false);
    expect(el.sticky).toBe(false);
    expect(el.elevated).toBe(false);
  });

  it('renders brand name and link', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar brand="Glaze UI" .brandHref="/home"></glz-navbar>
    `);
    
    // Force a re-render to ensure brand href is applied
    el.requestUpdate();
    await el.updateComplete;
    await el.updateComplete;
    
    const brandLink = el.shadowRoot?.querySelector('.brand') as HTMLAnchorElement;
    expect(brandLink).toBeTruthy();
    expect(brandLink.textContent?.trim()).toContain('Glaze UI');
    expect(brandLink.getAttribute('href')).toBe('/home');
  });

  it('renders slotted content', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar>
        <a slot="nav-links" href="/about">About</a>
        <a slot="nav-links" href="/contact">Contact</a>
        <button slot="nav-actions">Sign In</button>
      </glz-navbar>
    `);
    
    const navLinksSlot = el.shadowRoot?.querySelector('slot[name="nav-links"]') as HTMLSlotElement;
    const navActionsSlot = el.shadowRoot?.querySelector('slot[name="nav-actions"]') as HTMLSlotElement;
    
    const links = navLinksSlot?.assignedElements();
    const actions = navActionsSlot?.assignedElements();
    
    expect(links?.length).toBe(2);
    expect(actions?.length).toBe(1);
  });

  it('toggles mobile menu', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar></glz-navbar>
    `);
    
    const toggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    
    expect(el.mobileOpen).toBe(false);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    
    toggle.click();
    await el.updateComplete;
    
    expect(el.mobileOpen).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    
    toggle.click();
    await el.updateComplete;
    
    expect(el.mobileOpen).toBe(false);
  });

  it('closes mobile menu on Escape key', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar></glz-navbar>
    `);
    
    const toggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    toggle.click();
    await el.updateComplete;
    
    expect(el.mobileOpen).toBe(true);
    
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;
    
    expect(el.mobileOpen).toBe(false);
  });

  it('dispatches toggle event', async () => {
    const onToggle = vi.fn();
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar @glz-navbar-toggle="${onToggle}"></glz-navbar>
    `);
    
    const toggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    toggle.click();
    
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { open: true }
      })
    );
  });

  it('applies fixed positioning', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar fixed></glz-navbar>
    `);
    
    expect(el.hasAttribute('fixed')).toBe(true);
  });

  it('applies sticky positioning', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar sticky></glz-navbar>
    `);
    
    expect(el.hasAttribute('sticky')).toBe(true);
  });

  it('applies elevated shadow', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar elevated></glz-navbar>
    `);
    
    expect(el.hasAttribute('elevated')).toBe(true);
  });

  it('renders brand slot when no brand prop', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar>
        <img slot="brand" src="logo.png" alt="Logo" />
      </glz-navbar>
    `);
    
    const brandSlot = el.shadowRoot?.querySelector('slot[name="brand"]') as HTMLSlotElement;
    const brandElements = brandSlot?.assignedElements();
    
    expect(brandElements?.length).toBe(1);
    expect(brandElements?.[0]?.tagName).toBe('IMG');
  });

  it('renders mobile links slot', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar>
        <a slot="mobile-links" href="/home">Home</a>
        <a slot="mobile-links" href="/about">About</a>
      </glz-navbar>
    `);
    
    const mobileLinksSlot = el.shadowRoot?.querySelector('slot[name="mobile-links"]') as HTMLSlotElement;
    const mobileLinks = mobileLinksSlot?.assignedElements();
    
    expect(mobileLinks?.length).toBe(2);
  });

  it('has proper ARIA attributes', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar aria-label="Primary navigation"></glz-navbar>
    `);
    
    const nav = el.shadowRoot?.querySelector('nav');
    expect(nav?.getAttribute('role')).toBe('navigation');
    expect(nav?.getAttribute('aria-label')).toBe('Primary navigation');
    
    const toggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe('mobile-menu');
    expect(toggle.getAttribute('aria-label')).toBe('Open menu');
    
    toggle.click();
    await el.updateComplete;
    
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Close menu');
  });

  it('animates hamburger icon', async () => {
    const el = await fixture<GlzNavbar>(html`
      <glz-navbar></glz-navbar>
    `);
    
    expect(el.hasAttribute('mobile-open')).toBe(false);
    
    const toggle = el.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    toggle.click();
    await el.updateComplete;
    
    expect(el.hasAttribute('mobile-open')).toBe(true);
  });

  it('applies variant styles', async () => {
    const variants: Array<'solid' | 'glass' | 'subtle'> = ['solid', 'glass', 'subtle'];
    
    for (const variant of variants) {
      const el = await fixture<GlzNavbar>(html`
        <glz-navbar variant="${variant}"></glz-navbar>
      `);
      
      expect(el.getAttribute('variant')).toBe(variant);
    }
  });

  it('applies size variants', async () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    for (const size of sizes) {
      const el = await fixture<GlzNavbar>(html`
        <glz-navbar size="${size}"></glz-navbar>
      `);
      
      expect(el.getAttribute('size')).toBe(size);
    }
  });

  it.skip('is accessible with no violations - TODO: Fix jest-axe types', async () => {
    await fixture<GlzNavbar>(html`
      <glz-navbar brand="Accessible Nav">
        <a slot="nav-links" href="/home">Home</a>
        <a slot="nav-links" href="/about">About</a>
        <button slot="nav-actions">Sign In</button>
      </glz-navbar>
    `);
    
    // const el = await fixture<GlzNavbar>(html`...`);
    // const results = await axe(el);
    // expect(results).toHaveNoViolations(); // TODO: Fix jest-axe types
  });
});
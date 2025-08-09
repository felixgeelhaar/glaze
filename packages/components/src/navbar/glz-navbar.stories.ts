import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-navbar.js';
import '../button/glz-button.js';

const meta: Meta = {
  title: 'Components/Navbar',
  component: 'glz-navbar',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass', 'subtle'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    fixed: {
      control: { type: 'boolean' },
    },
    sticky: {
      control: { type: 'boolean' },
    },
    elevated: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    brand: 'Glaze UI',
    brandHref: '/',
  },
  render: (args) => html`
    <glz-navbar
      variant="${args.variant}"
      size="${args.size}"
      brand="${args.brand}"
      brand-href="${args.brandHref}"
      ?fixed="${args.fixed}"
      ?sticky="${args.sticky}"
      ?elevated="${args.elevated}"
    >
      <a slot="nav-links" href="#home">Home</a>
      <a slot="nav-links" href="#about">About</a>
      <a slot="nav-links" href="#services">Services</a>
      <a slot="nav-links" href="#contact">Contact</a>
      
      <glz-button slot="nav-actions" variant="subtle" size="sm">Sign In</glz-button>
      <glz-button slot="nav-actions" size="sm">Get Started</glz-button>
      
      <a slot="mobile-links" href="#home">Home</a>
      <a slot="mobile-links" href="#about">About</a>
      <a slot="mobile-links" href="#services">Services</a>
      <a slot="mobile-links" href="#contact">Contact</a>
      <a slot="mobile-links" href="#signin">Sign In</a>
      <a slot="mobile-links" href="#getstarted">Get Started</a>
    </glz-navbar>
  `,
};

export const Glass: Story = {
  render: () => html`
    <div style="background: linear-gradient(135deg, var(--color-primary-base), var(--color-accent-base)); min-height: 200px;">
      <glz-navbar variant="glass" brand="Glass Nav" elevated>
        <a slot="nav-links" href="#home">Home</a>
        <a slot="nav-links" href="#features">Features</a>
        <a slot="nav-links" href="#pricing">Pricing</a>
        <a slot="nav-links" href="#docs">Docs</a>
        
        <glz-button slot="nav-actions" variant="glass" size="sm">Login</glz-button>
        
        <a slot="mobile-links" href="#home">Home</a>
        <a slot="mobile-links" href="#features">Features</a>
        <a slot="mobile-links" href="#pricing">Pricing</a>
        <a slot="mobile-links" href="#docs">Docs</a>
        <a slot="mobile-links" href="#login">Login</a>
      </glz-navbar>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: grid; gap: 2rem;">
      <glz-navbar variant="solid" brand="Solid Navbar">
        <a slot="nav-links" href="#home">Home</a>
        <a slot="nav-links" href="#about">About</a>
        <a slot="nav-links" href="#contact">Contact</a>
      </glz-navbar>
      
      <glz-navbar variant="glass" brand="Glass Navbar">
        <a slot="nav-links" href="#home">Home</a>
        <a slot="nav-links" href="#about">About</a>
        <a slot="nav-links" href="#contact">Contact</a>
      </glz-navbar>
      
      <glz-navbar variant="subtle" brand="Subtle Navbar">
        <a slot="nav-links" href="#home">Home</a>
        <a slot="nav-links" href="#about">About</a>
        <a slot="nav-links" href="#contact">Contact</a>
      </glz-navbar>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: grid; gap: 2rem;">
      <glz-navbar size="sm" brand="Small Nav">
        <a slot="nav-links" href="#">Link 1</a>
        <a slot="nav-links" href="#">Link 2</a>
        <a slot="nav-links" href="#">Link 3</a>
      </glz-navbar>
      
      <glz-navbar size="md" brand="Medium Nav">
        <a slot="nav-links" href="#">Link 1</a>
        <a slot="nav-links" href="#">Link 2</a>
        <a slot="nav-links" href="#">Link 3</a>
      </glz-navbar>
      
      <glz-navbar size="lg" brand="Large Nav">
        <a slot="nav-links" href="#">Link 1</a>
        <a slot="nav-links" href="#">Link 2</a>
        <a slot="nav-links" href="#">Link 3</a>
      </glz-navbar>
    </div>
  `,
};

export const WithBrandIcon: Story = {
  render: () => html`
    <glz-navbar brand="Glaze Design" brand-href="/">
      <svg slot="brand-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
        <path d="M2 17L12 22L22 17M2 12L12 17L22 12"/>
      </svg>
      
      <a slot="nav-links" href="#">Products</a>
      <a slot="nav-links" href="#">Solutions</a>
      <a slot="nav-links" href="#">Resources</a>
      <a slot="nav-links" href="#">Company</a>
      
      <glz-button slot="nav-actions" variant="subtle" size="sm">Contact</glz-button>
    </glz-navbar>
  `,
};

export const CustomBrand: Story = {
  render: () => html`
    <glz-navbar>
      <div slot="brand" style="display: flex; align-items: center; gap: 0.5rem;">
        <img src="https://via.placeholder.com/32" alt="Logo" style="border-radius: var(--radius-sm);" />
        <span style="font-weight: 600; font-size: 1.25rem;">Custom Brand</span>
      </div>
      
      <a slot="nav-links" href="#">Overview</a>
      <a slot="nav-links" href="#">Features</a>
      <a slot="nav-links" href="#">Pricing</a>
      
      <glz-button slot="nav-actions" size="sm">Try Free</glz-button>
    </glz-navbar>
  `,
};

export const Sticky: Story = {
  render: () => html`
    <div>
      <glz-navbar sticky variant="glass" brand="Sticky Nav" elevated>
        <a slot="nav-links" href="#section1">Section 1</a>
        <a slot="nav-links" href="#section2">Section 2</a>
        <a slot="nav-links" href="#section3">Section 3</a>
        
        <glz-button slot="nav-actions" variant="glass" size="sm">Action</glz-button>
      </glz-navbar>
      
      <div style="padding: 2rem; background: linear-gradient(180deg, var(--color-primary-base-10), var(--color-accent-base-10)); min-height: 150vh;">
        <h2 id="section1">Section 1</h2>
        <p>Scroll down to see the sticky navbar in action...</p>
        <div style="height: 400px;"></div>
        
        <h2 id="section2">Section 2</h2>
        <p>The navbar stays at the top when scrolling.</p>
        <div style="height: 400px;"></div>
        
        <h2 id="section3">Section 3</h2>
        <p>End of content.</p>
      </div>
    </div>
  `,
};

export const WithActiveState: Story = {
  render: () => html`
    <glz-navbar brand="Active States">
      <a slot="nav-links" href="#home" aria-current="page">Home</a>
      <a slot="nav-links" href="#products">Products</a>
      <a slot="nav-links" href="#about">About</a>
      <a slot="nav-links" href="#contact">Contact</a>
      
      <glz-button slot="nav-actions" size="sm">Sign Up</glz-button>
    </glz-navbar>
  `,
};

export const MobileResponsive: Story = {
  render: () => html`
    <div style="max-width: 400px; border: 1px solid var(--color-glass-border);">
      <glz-navbar brand="Mobile View" variant="glass">
        <a slot="nav-links" href="#">Desktop Link 1</a>
        <a slot="nav-links" href="#">Desktop Link 2</a>
        <a slot="nav-links" href="#">Desktop Link 3</a>
        
        <glz-button slot="nav-actions" size="sm">Action</glz-button>
        
        <a slot="mobile-links" href="#">Mobile Link 1</a>
        <a slot="mobile-links" href="#">Mobile Link 2</a>
        <a slot="mobile-links" href="#">Mobile Link 3</a>
        <a slot="mobile-links" href="#">Mobile Action</a>
      </glz-navbar>
      
      <div style="padding: 1rem;">
        <p>On mobile devices (< 768px), the navigation links are hidden and a hamburger menu appears.</p>
        <p>Click the menu button to see the mobile navigation.</p>
      </div>
    </div>
  `,
};

export const ComplexExample: Story = {
  render: () => html`
    <glz-navbar variant="glass" brand="TechCorp" sticky elevated>
      <svg slot="brand-icon" width="24" height="24" viewBox="0 0 24 24" fill="var(--color-primary-base)">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
        <path d="M2 17L12 22L22 17M2 12L12 17L22 12"/>
      </svg>
      
      <a slot="nav-links" href="#products">Products</a>
      <a slot="nav-links" href="#solutions">Solutions</a>
      <a slot="nav-links" href="#developers">Developers</a>
      <a slot="nav-links" href="#resources">Resources</a>
      <a slot="nav-links" href="#pricing">Pricing</a>
      
      <div slot="nav-actions" style="display: flex; gap: 0.5rem; align-items: center;">
        <glz-button variant="subtle" size="sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </glz-button>
        <glz-button variant="subtle" size="sm">Sign In</glz-button>
        <glz-button size="sm">Start Free Trial</glz-button>
      </div>
      
      <a slot="mobile-links" href="#products">Products</a>
      <a slot="mobile-links" href="#solutions">Solutions</a>
      <a slot="mobile-links" href="#developers">Developers</a>
      <a slot="mobile-links" href="#resources">Resources</a>
      <a slot="mobile-links" href="#pricing">Pricing</a>
      <hr slot="mobile-links" style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--color-glass-border);" />
      <a slot="mobile-links" href="#search">Search</a>
      <a slot="mobile-links" href="#signin">Sign In</a>
      <a slot="mobile-links" href="#trial">Start Free Trial</a>
    </glz-navbar>
  `,
};
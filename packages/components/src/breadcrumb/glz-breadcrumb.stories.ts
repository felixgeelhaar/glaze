import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-breadcrumb.js';
import type { BreadcrumbItem } from './glz-breadcrumb.js';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  component: 'glz-breadcrumb',
  parameters: {
    docs: {
      description: {
        component: 'Accessible breadcrumb navigation with multiple styles and responsive behavior'
      }
    }
  },
  argTypes: {
    separator: {
      control: 'select',
      options: ['chevron', 'slash', 'gt', 'dot', 'dash', 'arrow'],
      description: 'Separator style between items'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Breadcrumb size'
    },
    variant: {
      control: 'radio',
      options: ['default', 'glass', 'pills'],
      description: 'Visual variant'
    },
    collapsed: {
      control: 'boolean',
      description: 'Collapse middle items when many'
    },
    background: {
      control: 'boolean',
      description: 'Show background container'
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive behavior'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
      { label: 'MacBook Pro' }
    ];
    
    return html`
      <glz-breadcrumb .items=${items}></glz-breadcrumb>
    `;
  }
};

export const Separators: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home' },
      { label: 'Documentation' },
      { label: 'Components' },
      { label: 'Breadcrumb' }
    ];
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4>Chevron (Default)</h4>
          <glz-breadcrumb .items=${items} separator="chevron"></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Slash</h4>
          <glz-breadcrumb .items=${items} separator="slash"></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Greater Than</h4>
          <glz-breadcrumb .items=${items} separator="gt"></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Dot</h4>
          <glz-breadcrumb .items=${items} separator="dot"></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Dash</h4>
          <glz-breadcrumb .items=${items} separator="dash"></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Arrow</h4>
          <glz-breadcrumb .items=${items} separator="arrow"></glz-breadcrumb>
        </div>
      </div>
    `;
  }
};

export const Sizes: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home' },
      { label: 'Settings' },
      { label: 'Profile' }
    ];
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4>Small</h4>
          <glz-breadcrumb .items=${items} size="small"></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Medium</h4>
          <glz-breadcrumb .items=${items} size="medium"></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Large</h4>
          <glz-breadcrumb .items=${items} size="large"></glz-breadcrumb>
        </div>
      </div>
    `;
  }
};

export const Variants: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard' },
      { label: 'Analytics' },
      { label: 'Reports' },
      { label: 'Monthly' }
    ];
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4>Default</h4>
          <glz-breadcrumb .items=${items}></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Pills</h4>
          <glz-breadcrumb .items=${items} variant="pills"></glz-breadcrumb>
        </div>
        
        <div style="padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md);">
          <h4 style="color: white; margin-bottom: 1rem;">Glass</h4>
          <glz-breadcrumb .items=${items} variant="glass"></glz-breadcrumb>
        </div>
      </div>
    `;
  }
};

export const WithIcons: Story = {
  render: () => {
    const homeIcon = html`
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
      </svg>
    `;
    
    const folderIcon = html`
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
      </svg>
    `;
    
    const fileIcon = html`
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
      </svg>
    `;
    
    const items: BreadcrumbItem[] = [
      { label: 'Home', icon: homeIcon.strings.join('') },
      { label: 'Documents', icon: folderIcon.strings.join('') },
      { label: 'Projects', icon: folderIcon.strings.join('') },
      { label: 'README.md', icon: fileIcon.strings.join('') }
    ];
    
    return html`
      <glz-breadcrumb .items=${items}></glz-breadcrumb>
    `;
  }
};

export const Collapsed: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home' },
      { label: 'Category' },
      { label: 'Subcategory' },
      { label: 'Section' },
      { label: 'Subsection' },
      { label: 'Page' },
      { label: 'Current Item' }
    ];
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4>Collapsed (Shows first and last 2 items)</h4>
          <glz-breadcrumb .items=${items} collapsed></glz-breadcrumb>
        </div>
        
        <div>
          <h4>Expanded</h4>
          <glz-breadcrumb .items=${items}></glz-breadcrumb>
        </div>
      </div>
    `;
  }
};

export const WithBackground: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'App' },
      { label: 'Settings' },
      { label: 'Account' },
      { label: 'Security' }
    ];
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <glz-breadcrumb .items=${items} background></glz-breadcrumb>
        
        <glz-breadcrumb .items=${items} background variant="pills"></glz-breadcrumb>
      </div>
    `;
  }
};

export const DisabledItems: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home' },
      { label: 'Private', disabled: true },
      { label: 'Settings', disabled: true },
      { label: 'Profile' }
    ];
    
    return html`
      <glz-breadcrumb .items=${items}></glz-breadcrumb>
    `;
  }
};

export const Interactive: Story = {
  render: () => {
    const handleClick = (e: CustomEvent) => {
      console.log('Breadcrumb clicked:', e.detail);
      alert(`Clicked: ${e.detail.item.label} (index: ${e.detail.index})`);
    };
    
    const items: BreadcrumbItem[] = [
      { label: 'Level 1' },
      { label: 'Level 2' },
      { label: 'Level 3' },
      { label: 'Level 4' },
      { label: 'Current' }
    ];
    
    return html`
      <div>
        <p style="margin-bottom: 1rem; color: var(--color-bg-on); opacity: 0.7;">
          Click on breadcrumb items to see the event handler in action
        </p>
        <glz-breadcrumb 
          .items=${items}
          @glz-breadcrumb-click=${handleClick}
        ></glz-breadcrumb>
      </div>
    `;
  }
};

export const FileSystem: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: '/', href: '#' },
      { label: 'Users', href: '#' },
      { label: 'john', href: '#' },
      { label: 'Documents', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'glaze-design-system', href: '#' },
      { label: 'src', href: '#' },
      { label: 'components' }
    ];
    
    return html`
      <div style="font-family: monospace;">
        <glz-breadcrumb 
          .items=${items} 
          separator="slash"
          collapsed
        ></glz-breadcrumb>
      </div>
    `;
  }
};

export const ECommerce: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Shop', href: '/shop' },
      { label: 'Women', href: '/shop/women' },
      { label: 'Clothing', href: '/shop/women/clothing' },
      { label: 'Dresses', href: '/shop/women/clothing/dresses' },
      { label: 'Summer Collection' }
    ];
    
    return html`
      <div style="padding: 1.5rem; background: var(--color-bg-base); border-bottom: 1px solid var(--color-glass-border);">
        <glz-breadcrumb .items=${items} separator="gt"></glz-breadcrumb>
      </div>
    `;
  }
};

export const Documentation: Story = {
  render: () => {
    const bookIcon = html`
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
      </svg>
    `;
    
    const items: BreadcrumbItem[] = [
      { label: 'Docs', icon: bookIcon.strings.join(''), href: '/docs' },
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Quick Start' }
    ];
    
    return html`
      <div style="padding: 2rem; background: linear-gradient(to bottom, var(--color-surface-base), transparent); border-radius: var(--radius-lg);">
        <glz-breadcrumb 
          .items=${items}
          variant="pills"
          size="large"
        ></glz-breadcrumb>
      </div>
    `;
  }
};

export const AdminDashboard: Story = {
  render: () => {
    const dashIcon = html`
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
      </svg>
    `;
    
    const usersIcon = html`
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
      </svg>
    `;
    
    const items: BreadcrumbItem[] = [
      { label: 'Dashboard', icon: dashIcon.strings.join('') },
      { label: 'Users', icon: usersIcon.strings.join('') },
      { label: 'Permissions' },
      { label: 'Edit Role' }
    ];
    
    return html`
      <glz-breadcrumb 
        .items=${items}
        background
        variant="pills"
      ></glz-breadcrumb>
    `;
  }
};
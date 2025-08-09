import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-chip.js';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'glz-chip',
  parameters: {
    docs: {
      description: {
        component: 'Interactive chip component for tags, filters, and selections'
      }
    }
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'success', 'warning', 'error', 'glass'],
      description: 'Chip color variant'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Chip size'
    },
    outline: {
      control: 'boolean',
      description: 'Use outline style'
    },
    selectable: {
      control: 'boolean',
      description: 'Allow chip selection'
    },
    selected: {
      control: 'boolean',
      description: 'Selected state'
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the chip'
    },
    animated: {
      control: 'boolean',
      description: 'Animate chip on mount'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <glz-chip>Default</glz-chip>
      <glz-chip color="primary">Primary</glz-chip>
      <glz-chip color="accent">Accent</glz-chip>
      <glz-chip color="success">Success</glz-chip>
      <glz-chip color="warning">Warning</glz-chip>
      <glz-chip color="error">Error</glz-chip>
      <glz-chip color="glass">Glass</glz-chip>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <glz-chip size="small" color="primary">Small</glz-chip>
      <glz-chip size="medium" color="primary">Medium</glz-chip>
      <glz-chip size="large" color="primary">Large</glz-chip>
    </div>
  `
};

export const Outline: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <glz-chip outline>Default</glz-chip>
      <glz-chip outline color="primary">Primary</glz-chip>
      <glz-chip outline color="accent">Accent</glz-chip>
      <glz-chip outline color="success">Success</glz-chip>
      <glz-chip outline color="warning">Warning</glz-chip>
      <glz-chip outline color="error">Error</glz-chip>
    </div>
  `
};

export const Selectable: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <glz-chip 
        selectable 
        color="primary"
        @glz-chip-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      >
        JavaScript
      </glz-chip>
      <glz-chip 
        selectable 
        selected
        color="primary"
        @glz-chip-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      >
        TypeScript
      </glz-chip>
      <glz-chip 
        selectable 
        color="primary"
        @glz-chip-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      >
        Python
      </glz-chip>
      <glz-chip 
        selectable 
        color="primary"
        @glz-chip-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      >
        Go
      </glz-chip>
      <glz-chip 
        selectable 
        color="primary"
        @glz-chip-select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      >
        Rust
      </glz-chip>
    </div>
  `
};

export const Removable: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <glz-chip 
        removable 
        color="accent"
        @glz-chip-remove=${(e: CustomEvent) => console.log('Removed:', e.detail)}
      >
        React
      </glz-chip>
      <glz-chip 
        removable 
        color="accent"
        @glz-chip-remove=${(e: CustomEvent) => console.log('Removed:', e.detail)}
      >
        Vue.js
      </glz-chip>
      <glz-chip 
        removable 
        color="accent"
        @glz-chip-remove=${(e: CustomEvent) => console.log('Removed:', e.detail)}
      >
        Angular
      </glz-chip>
      <glz-chip 
        removable 
        color="accent"
        @glz-chip-remove=${(e: CustomEvent) => console.log('Removed:', e.detail)}
      >
        Svelte
      </glz-chip>
    </div>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <glz-chip color="primary">
        <svg slot="icon-start" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Verified
      </glz-chip>
      
      <glz-chip color="success">
        <svg slot="icon-start" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Secure
      </glz-chip>
      
      <glz-chip color="warning" removable>
        <svg slot="icon-start" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>
        Light Mode
      </glz-chip>
    </div>
  `
};

export const WithAvatar: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
      <glz-chip removable>
        <div slot="avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
        John Doe
      </glz-chip>
      
      <glz-chip removable>
        <div slot="avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);"></div>
        Jane Smith
      </glz-chip>
      
      <glz-chip removable>
        <div slot="avatar" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
        Alex Johnson
      </glz-chip>
      
      <glz-chip removable>
        <div slot="avatar" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);"></div>
        Sarah Williams
      </glz-chip>
    </div>
  `
};

export const Glass: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md);">
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
        <glz-chip color="glass">Glass Chip</glz-chip>
        <glz-chip color="glass" selectable>Selectable</glz-chip>
        <glz-chip color="glass" removable>Removable</glz-chip>
        <glz-chip color="glass" size="large">Large Glass</glz-chip>
      </div>
    </div>
  `
};

export const FilterChips: Story = {
  render: () => {
    const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];
    return html`
      <div>
        <h4 style="margin-bottom: 1rem;">Filter by Category:</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${categories.map((cat, index) => html`
            <glz-chip 
              selectable
              ?selected=${index === 0}
              color="primary"
              @glz-chip-select=${(e: CustomEvent) => console.log('Filter:', cat, e.detail.selected)}
            >
              ${cat}
            </glz-chip>
          `)}
        </div>
      </div>
    `;
  }
};

export const TagInput: Story = {
  render: () => {
    const tags = ['Design', 'Development', 'UI/UX', 'Frontend', 'Backend'];
    return html`
      <div style="padding: 1rem; border: 1px solid var(--color-glass-border); border-radius: var(--radius-md); background: var(--color-bg-base);">
        <h4 style="margin-bottom: 1rem;">Selected Tags:</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          ${tags.map(tag => html`
            <glz-chip 
              removable
              color="accent"
              animated
              @glz-chip-remove=${() => console.log('Remove tag:', tag)}
            >
              ${tag}
            </glz-chip>
          `)}
        </div>
        <input 
          type="text" 
          placeholder="Add a tag..." 
          style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); background: transparent;"
        />
      </div>
    `;
  }
};

export const StatusChips: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <glz-chip color="success">
        <span slot="icon-start">●</span>
        Active
      </glz-chip>
      
      <glz-chip color="warning">
        <span slot="icon-start">●</span>
        Pending
      </glz-chip>
      
      <glz-chip color="error">
        <span slot="icon-start">●</span>
        Inactive
      </glz-chip>
      
      <glz-chip>
        <span slot="icon-start">●</span>
        Draft
      </glz-chip>
      
      <glz-chip color="primary">
        <span slot="icon-start">●</span>
        Published
      </glz-chip>
    </div>
  `
};

export const InteractiveExample: Story = {
  render: () => {
    const skills = [
      { name: 'JavaScript', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'React', level: 'Advanced' },
      { name: 'Vue', level: 'Intermediate' },
      { name: 'Angular', level: 'Beginner' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'Go', level: 'Beginner' }
    ];
    
    return html`
      <div>
        <h4 style="margin-bottom: 1rem;">Select Your Skills:</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${skills.map(skill => {
            let color = 'default';
            if (skill.level === 'Expert') color = 'success';
            else if (skill.level === 'Advanced') color = 'primary';
            else if (skill.level === 'Intermediate') color = 'warning';
            
            return html`
              <glz-chip 
                selectable
                removable
                color=${color}
                @glz-chip-select=${(e: CustomEvent) => console.log('Selected skill:', skill.name, e.detail.selected)}
                @glz-chip-remove=${() => console.log('Removed skill:', skill.name)}
              >
                ${skill.name}
                <span slot="icon-end" style="font-size: 0.7em; opacity: 0.7;">${skill.level}</span>
              </glz-chip>
            `;
          })}
        </div>
      </div>
    `;
  }
};
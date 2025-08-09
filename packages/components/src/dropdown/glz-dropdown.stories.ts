import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-dropdown.js';
import '../button/glz-button.js';

const meta: Meta = {
  title: 'Components/Dropdown',
  component: 'glz-dropdown',
  parameters: {
    docs: {
      description: {
        component: 'Accessible dropdown menu with keyboard navigation and smart positioning'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'glass'],
      description: 'Visual style variant'
    },
    position: {
      control: 'select',
      options: ['auto', 'top', 'bottom', 'left', 'right'],
      description: 'Preferred position'
    },
    alignment: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'Alignment relative to trigger'
    },
    trigger: {
      control: 'radio',
      options: ['click', 'hover', 'contextmenu'],
      description: 'Trigger behavior'
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger'
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close menu on item selection'
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Close menu when clicking outside'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close menu on Escape key'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality'
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search input placeholder'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable dropdown'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <glz-dropdown>
        <glz-button slot="trigger" variant="primary">
          Options
          <svg slot="icon-end" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </glz-button>
        
        <button slot="item">Profile</button>
        <button slot="item">Settings</button>
        <button slot="item">Preferences</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Help & Support</button>
        <button slot="item">Sign Out</button>
      </glz-dropdown>
    </div>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <glz-dropdown variant="glass">
        <glz-button slot="trigger" variant="glass">
          Menu
          <svg slot="icon-end" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </glz-button>
        
        <button slot="item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
            <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z"/>
          </svg>
          Profile
        </button>
        
        <button slot="item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
            <path d="M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.892 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.892-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319z"/>
          </svg>
          Settings
        </button>
        
        <button slot="item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 00.254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 00-.138-.362 1.9 1.9 0 00.234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 00-.443.05 9.365 9.365 0 00-.062-4.509A1.38 1.38 0 009.125.046z"/>
          </svg>
          Notifications
        </button>
        
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        
        <button slot="item" data-destructive>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 0.5rem;">
            <path d="M6 12.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5V3H6v9.5zm1-7a.5.5 0 01.5-.5.5.5 0 01.5.5v5a.5.5 0 01-.5.5.5.5 0 01-.5-.5v-5zm2 0a.5.5 0 01.5-.5.5.5 0 01.5.5v5a.5.5 0 01-.5.5.5.5 0 01-.5-.5v-5z"/>
            <path d="M14.5 2h-4l-.5-.5a1 1 0 00-.7-.3H6.7a1 1 0 00-.7.3L5.5 2h-4a.5.5 0 000 1h13a.5.5 0 000-1z"/>
          </svg>
          Delete Account
        </button>
      </glz-dropdown>
    </div>
  `
};

export const Searchable: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <glz-dropdown searchable searchPlaceholder="Search commands...">
        <glz-button slot="trigger" variant="subtle">
          Command Palette
          <kbd slot="icon-end" style="margin-left: 0.5rem; padding: 0.125rem 0.375rem; background: var(--color-surface-base); border-radius: 4px; font-size: 0.75rem;">⌘K</kbd>
        </glz-button>
        
        <button slot="item">New File</button>
        <button slot="item">Open File</button>
        <button slot="item">Save</button>
        <button slot="item">Save As...</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Cut</button>
        <button slot="item">Copy</button>
        <button slot="item">Paste</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Find</button>
        <button slot="item">Replace</button>
        <button slot="item">Go to Line</button>
      </glz-dropdown>
    </div>
  `
};

export const HoverTrigger: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center; gap: 2rem;">
      <glz-dropdown trigger="hover" variant="glass">
        <glz-button slot="trigger" variant="subtle">File</glz-button>
        
        <button slot="item">New</button>
        <button slot="item">Open</button>
        <button slot="item">Save</button>
        <button slot="item">Save As...</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Exit</button>
      </glz-dropdown>
      
      <glz-dropdown trigger="hover" variant="glass">
        <glz-button slot="trigger" variant="subtle">Edit</glz-button>
        
        <button slot="item">Undo</button>
        <button slot="item">Redo</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Cut</button>
        <button slot="item">Copy</button>
        <button slot="item">Paste</button>
      </glz-dropdown>
      
      <glz-dropdown trigger="hover" variant="glass">
        <glz-button slot="trigger" variant="subtle">View</glz-button>
        
        <button slot="item">Zoom In</button>
        <button slot="item">Zoom Out</button>
        <button slot="item">Reset Zoom</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Full Screen</button>
      </glz-dropdown>
    </div>
  `
};

export const ContextMenu: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <glz-dropdown trigger="contextmenu">
        <div slot="trigger" style="padding: 2rem 4rem; background: var(--color-surface-base); border-radius: var(--radius-lg); text-align: center;">
          Right-click me for context menu
        </div>
        
        <button slot="item">Cut</button>
        <button slot="item">Copy</button>
        <button slot="item">Paste</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Select All</button>
        <button slot="item">Find</button>
        <button slot="item">Replace</button>
      </glz-dropdown>
    </div>
  `
};

export const WithSections: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <glz-dropdown variant="glass">
        <glz-button slot="trigger" variant="primary">
          Actions
          <svg slot="icon-end" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </glz-button>
        
        <div slot="header" style="padding: 0.5rem 1rem 0.25rem; font-size: 0.75rem; font-weight: 600; opacity: 0.6; text-transform: uppercase;">
          File Operations
        </div>
        
        <button slot="item">New Document</button>
        <button slot="item">Open File</button>
        <button slot="item">Save</button>
        
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        
        <div style="padding: 0.5rem 1rem 0.25rem; font-size: 0.75rem; font-weight: 600; opacity: 0.6; text-transform: uppercase;">
          Edit Operations
        </div>
        
        <button slot="item">Undo</button>
        <button slot="item">Redo</button>
        <button slot="item">Find & Replace</button>
        
        <div slot="footer" style="padding: 0.5rem 1rem; font-size: 0.75rem; opacity: 0.8; border-top: 1px solid var(--color-glass-border);">
          Use keyboard shortcuts for faster access
        </div>
      </glz-dropdown>
    </div>
  `
};

export const Positions: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
      <glz-dropdown position="bottom" alignment="start">
        <glz-button slot="trigger" variant="subtle">Bottom Start</glz-button>
        <button slot="item">Option 1</button>
        <button slot="item">Option 2</button>
        <button slot="item">Option 3</button>
      </glz-dropdown>
      
      <glz-dropdown position="bottom" alignment="center">
        <glz-button slot="trigger" variant="subtle">Bottom Center</glz-button>
        <button slot="item">Option 1</button>
        <button slot="item">Option 2</button>
        <button slot="item">Option 3</button>
      </glz-dropdown>
      
      <glz-dropdown position="bottom" alignment="end">
        <glz-button slot="trigger" variant="subtle">Bottom End</glz-button>
        <button slot="item">Option 1</button>
        <button slot="item">Option 2</button>
        <button slot="item">Option 3</button>
      </glz-dropdown>
      
      <glz-dropdown position="top" alignment="start">
        <glz-button slot="trigger" variant="subtle">Top Start</glz-button>
        <button slot="item">Option 1</button>
        <button slot="item">Option 2</button>
        <button slot="item">Option 3</button>
      </glz-dropdown>
    </div>
  `
};

export const DisabledItems: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <glz-dropdown>
        <glz-button slot="trigger" variant="primary">
          Options
          <svg slot="icon-end" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </glz-button>
        
        <button slot="item">Available Action</button>
        <button slot="item" disabled>Disabled Action</button>
        <button slot="item">Another Action</button>
        <button slot="item" disabled>Also Disabled</button>
        <hr style="margin: 0.25rem 0; border: none; border-top: 1px solid var(--color-glass-border);">
        <button slot="item">Final Action</button>
      </glz-dropdown>
    </div>
  `
};

export const CustomContent: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <glz-dropdown variant="glass" closeOnSelect=${false}>
        <glz-button slot="trigger" variant="glass">
          User Settings
          <svg slot="icon-end" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        </glz-button>
        
        <div slot="header" style="padding: 1rem; border-bottom: 1px solid var(--color-glass-border);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
            <div>
              <div style="font-weight: 600;">John Doe</div>
              <div style="font-size: 0.875rem; opacity: 0.7;">john@example.com</div>
            </div>
          </div>
        </div>
        
        <button slot="item">
          <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            Dark Mode
            <input type="checkbox" style="margin-left: auto;">
          </span>
        </button>
        
        <button slot="item">
          <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            Notifications
            <input type="checkbox" checked style="margin-left: auto;">
          </span>
        </button>
        
        <button slot="item">
          <span style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            Language
            <select style="margin-left: auto; background: transparent; border: 1px solid var(--color-glass-border); border-radius: 4px; padding: 0.25rem;">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </span>
        </button>
        
        <div slot="footer" style="padding: 0.5rem 1rem; border-top: 1px solid var(--color-glass-border);">
          <button style="width: 100%; padding: 0.5rem; background: var(--color-primary-base); color: var(--color-primary-on); border: none; border-radius: var(--radius-sm); cursor: pointer;">
            Save Settings
          </button>
        </div>
      </glz-dropdown>
    </div>
  `
};
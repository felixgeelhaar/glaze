import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@glaze/components';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'glz-dialog',
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Dialog open state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'glass' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Accessibility label for the dialog',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog component with glassmorphism effects and focus management.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'glass',
    label: 'Example Dialog',
  },
  render: (args) => html`
    <div>
      <glz-button 
        variant="glass" 
        @click="${(e: Event) => {
          const dialog = (e.target as HTMLElement)?.parentElement?.querySelector('glz-dialog');
          if (dialog) (dialog as any).show();
        }}"
      >
        Open Dialog
      </glz-button>
      <glz-dialog
        variant="${args.variant}"
        label="${args.label}"
      >
        <h2 slot="header" style="margin: 0; color: white;">Dialog Title</h2>
        <div style="color: rgba(255, 255, 255, 0.9);">
          <p>This is a modal dialog with glassmorphism effects.</p>
          <p>It traps focus and can be closed with ESC key.</p>
        </div>
        <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
          <glz-button 
            variant="ghost" 
            tone="neutral"
            @click="${(e: Event) => {
              const dialog = (e.target as HTMLElement)?.closest('glz-dialog');
              if (dialog) (dialog as any).close();
            }}"
          >
            Cancel
          </glz-button>
          <glz-button 
            variant="solid" 
            tone="primary"
            @click="${(e: Event) => {
              const dialog = (e.target as HTMLElement)?.closest('glz-dialog');
              if (dialog) (dialog as any).close();
            }}"
          >
            Confirm
          </glz-button>
        </div>
      </glz-dialog>
    </div>
  `,
};

export const Confirmation: Story = {
  render: () => html`
    <div>
      <glz-button 
        variant="solid" 
        tone="accent"
        @click="${(e: Event) => {
          const dialog = (e.target as HTMLElement)?.parentElement?.querySelector('glz-dialog');
          if (dialog) (dialog as any).show();
        }}"
      >
        Delete Item
      </glz-button>
      <glz-dialog variant="glass" label="Confirm Deletion">
        <h2 slot="header" style="margin: 0; color: white;">Confirm Deletion</h2>
        <div style="color: rgba(255, 255, 255, 0.9);">
          <p>Are you sure you want to delete this item?</p>
          <p style="color: rgba(255, 100, 100, 0.9);">This action cannot be undone.</p>
        </div>
        <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
          <glz-button 
            variant="ghost" 
            tone="neutral"
            @click="${(e: Event) => {
              const dialog = (e.target as HTMLElement)?.closest('glz-dialog');
              if (dialog) (dialog as any).close();
            }}"
          >
            Cancel
          </glz-button>
          <glz-button 
            variant="solid" 
            tone="accent"
            @click="${(e: Event) => {
              const dialog = (e.target as HTMLElement)?.closest('glz-dialog');
              if (dialog) (dialog as any).close();
              console.log('Item deleted');
            }}"
          >
            Delete
          </glz-button>
        </div>
      </glz-dialog>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A confirmation dialog for destructive actions.',
      },
    },
  },
};

export const WithForm: Story = {
  render: () => html`
    <div>
      <glz-button 
        variant="glass" 
        @click="${(e: Event) => {
          const dialog = (e.target as HTMLElement)?.parentElement?.querySelector('glz-dialog');
          if (dialog) (dialog as any).show();
        }}"
      >
        Edit Profile
      </glz-button>
      <glz-dialog variant="glass" label="Edit Profile">
        <h2 slot="header" style="margin: 0; color: white;">Edit Profile</h2>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <glz-input
            variant="glass"
            label="Name"
            placeholder="Enter your name"
            value="John Doe"
          ></glz-input>
          <glz-input
            variant="glass"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value="john@example.com"
          ></glz-input>
          <glz-select
            variant="glass"
            label="Role"
            placeholder="Select a role"
          ></glz-select>
        </div>
        <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
          <glz-button 
            variant="ghost" 
            tone="neutral"
            @click="${(e: Event) => {
              const dialog = (e.target as HTMLElement)?.closest('glz-dialog');
              if (dialog) (dialog as any).close();
            }}"
          >
            Cancel
          </glz-button>
          <glz-button 
            variant="solid" 
            tone="primary"
            @click="${(e: Event) => {
              const dialog = (e.target as HTMLElement)?.closest('glz-dialog');
              if (dialog) (dialog as any).close();
              console.log('Profile updated');
            }}"
          >
            Save Changes
          </glz-button>
        </div>
      </glz-dialog>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Dialog containing a form with input fields.',
      },
    },
  },
};

export const WithInteractions: Story = {
  render: () => html`
    <div>
      <glz-button 
        id="trigger-button"
        variant="glass" 
        @click="${(e: Event) => {
          const dialog = (e.target as HTMLElement)?.parentElement?.querySelector('glz-dialog');
          if (dialog) (dialog as any).show();
        }}"
      >
        Open Interactive Dialog
      </glz-button>
      <glz-dialog
        id="test-dialog"
        variant="glass"
        label="Interactive Dialog"
      >
        <h2 slot="header" style="margin: 0; color: white;">Interactive Test</h2>
        <div style="color: rgba(255, 255, 255, 0.9);">
          <p>This dialog can be tested with interactions.</p>
        </div>
        <div slot="footer">
          <glz-button 
            id="close-button"
            variant="solid" 
            tone="primary"
            @click="${(e: Event) => {
              const dialog = (e.target as HTMLElement)?.closest('glz-dialog');
              if (dialog) (dialog as any).close();
            }}"
          >
            Close
          </glz-button>
        </div>
      </glz-dialog>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive dialog that can be opened and closed.',
      },
    },
  },
};
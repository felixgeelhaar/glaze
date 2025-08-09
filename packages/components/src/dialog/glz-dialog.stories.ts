import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-dialog.js';
import '../button/glz-button.js';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'glz-dialog',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass'],
    },
    open: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'solid',
    label: 'Example Dialog',
  },
  render: (args) => html`
    <div>
      <glz-button @click="${() => {
        const dialog = document.querySelector('glz-dialog') as any;
        dialog?.show();
      }}">Open Dialog</glz-button>
      
      <glz-dialog variant="${args.variant}" label="${args.label}">
        <h2>Dialog Title</h2>
        <p>This is the dialog content. Press Escape or click the close button to dismiss.</p>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
          <glz-button variant="subtle" @click="${() => {
            const dialog = document.querySelector('glz-dialog') as any;
            dialog?.close();
          }}">Cancel</glz-button>
          <glz-button @click="${() => {
            const dialog = document.querySelector('glz-dialog') as any;
            dialog?.close();
          }}">Confirm</glz-button>
        </div>
      </glz-dialog>
    </div>
  `,
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    label: 'Glass Dialog',
  },
  render: (args) => html`
    <div style="background: linear-gradient(135deg, var(--color-primary-base), var(--color-accent-base)); padding: 2rem; min-height: 400px;">
      <glz-button variant="glass" @click="${() => {
        const dialog = document.querySelector('glz-dialog') as any;
        dialog?.show();
      }}">Open Glass Dialog</glz-button>
      
      <glz-dialog variant="${args.variant}" label="${args.label}">
        <h2>Glass Dialog</h2>
        <p>This dialog has a glass morphism effect with backdrop blur.</p>
        <p>The background shows through with a tinted glass effect.</p>
      </glz-dialog>
    </div>
  `,
};

export const WithForm: Story = {
  render: () => html`
    <div>
      <glz-button @click="${() => {
        const dialog = document.querySelector('glz-dialog') as any;
        dialog?.show();
      }}">Open Form Dialog</glz-button>
      
      <glz-dialog label="Form Dialog">
        <h2>User Information</h2>
        <form style="display: grid; gap: 1rem; margin-top: 1rem;">
          <div>
            <label for="name" style="display: block; margin-bottom: 0.25rem;">Name</label>
            <input id="name" type="text" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm);" />
          </div>
          <div>
            <label for="email" style="display: block; margin-bottom: 0.25rem;">Email</label>
            <input id="email" type="email" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm);" />
          </div>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
            <glz-button variant="subtle" type="button" @click="${() => {
              const dialog = document.querySelector('glz-dialog') as any;
              dialog?.close();
            }}">Cancel</glz-button>
            <glz-button type="submit">Submit</glz-button>
          </div>
        </form>
      </glz-dialog>
    </div>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <div>
      <glz-button @click="${() => {
        const dialog = document.querySelector('glz-dialog') as any;
        dialog?.show();
      }}">Open Long Content Dialog</glz-button>
      
      <glz-dialog label="Scrollable Dialog">
        <h2>Terms and Conditions</h2>
        ${Array.from({ length: 10 }, () => html`
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        `)}
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem; position: sticky; bottom: 0; background: var(--color-surface-base); padding: 1rem 0;">
          <glz-button variant="subtle" @click="${() => {
            const dialog = document.querySelector('glz-dialog') as any;
            dialog?.close();
          }}">Decline</glz-button>
          <glz-button @click="${() => {
            const dialog = document.querySelector('glz-dialog') as any;
            dialog?.close();
          }}">Accept</glz-button>
        </div>
      </glz-dialog>
    </div>
  `,
};
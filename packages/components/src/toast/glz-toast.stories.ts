import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-toast.js';
import '../button/glz-button.js';

const meta: Meta = {
  title: 'Components/Toast',
  component: 'glz-toast',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass'],
    },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
    duration: {
      control: { type: 'number' },
    },
    closable: {
      control: { type: 'boolean' },
    },
    showProgress: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'solid',
    type: 'info',
    position: 'bottom-right',
    title: 'Notification',
    message: 'This is a toast notification',
    duration: 5000,
    closable: true,
    showProgress: false,
  },
  render: (args) => html`
    <div>
      <glz-button @click="${() => {
        const toast = document.querySelector('glz-toast') as any;
        toast?.show();
      }}">Show Toast</glz-button>
      
      <glz-toast
        variant="${args.variant}"
        type="${args.type}"
        position="${args.position}"
        title="${args.title}"
        message="${args.message}"
        duration="${args.duration}"
        ?closable="${args.closable}"
        ?show-progress="${args.showProgress}"
      ></glz-toast>
    </div>
  `,
};

export const AllTypes: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem; max-width: 300px;">
      <glz-button variant="solid" tone="primary" @click="${() => {
        const toast = document.querySelector('#info-toast') as any;
        toast?.show();
      }}">Show Info</glz-button>
      
      <glz-button variant="solid" tone="accent" @click="${() => {
        const toast = document.querySelector('#success-toast') as any;
        toast?.show();
      }}">Show Success</glz-button>
      
      <glz-button variant="solid" tone="neutral" @click="${() => {
        const toast = document.querySelector('#warning-toast') as any;
        toast?.show();
      }}">Show Warning</glz-button>
      
      <glz-button variant="subtle" @click="${() => {
        const toast = document.querySelector('#error-toast') as any;
        toast?.show();
      }}">Show Error</glz-button>
      
      <glz-toast
        id="info-toast"
        type="info"
        title="Information"
        message="This is an informational message."
      ></glz-toast>
      
      <glz-toast
        id="success-toast"
        type="success"
        title="Success!"
        message="Your action was completed successfully."
      ></glz-toast>
      
      <glz-toast
        id="warning-toast"
        type="warning"
        title="Warning"
        message="Please review this important information."
      ></glz-toast>
      
      <glz-toast
        id="error-toast"
        type="error"
        title="Error"
        message="Something went wrong. Please try again."
      ></glz-toast>
    </div>
  `,
};

export const Glass: Story = {
  render: () => html`
    <div style="background: linear-gradient(135deg, var(--color-primary-base), var(--color-accent-base)); padding: 2rem; min-height: 200px;">
      <glz-button variant="glass" @click="${() => {
        const toast = document.querySelector('glz-toast') as any;
        toast?.show();
      }}">Show Glass Toast</glz-button>
      
      <glz-toast
        variant="glass"
        type="success"
        title="Glass Toast"
        message="This toast has a glass morphism effect."
        show-progress
      ></glz-toast>
    </div>
  `,
};

export const Positions: Story = {
  render: () => html`
    <div style="display: grid; gap: 0.5rem; max-width: 300px;">
      <h3>Toast Positions</h3>
      
      <glz-button size="sm" @click="${() => {
        const toast = document.querySelector('#toast-tl') as any;
        toast?.show();
      }}">Top Left</glz-button>
      
      <glz-button size="sm" @click="${() => {
        const toast = document.querySelector('#toast-tc') as any;
        toast?.show();
      }}">Top Center</glz-button>
      
      <glz-button size="sm" @click="${() => {
        const toast = document.querySelector('#toast-tr') as any;
        toast?.show();
      }}">Top Right</glz-button>
      
      <glz-button size="sm" @click="${() => {
        const toast = document.querySelector('#toast-bl') as any;
        toast?.show();
      }}">Bottom Left</glz-button>
      
      <glz-button size="sm" @click="${() => {
        const toast = document.querySelector('#toast-bc') as any;
        toast?.show();
      }}">Bottom Center</glz-button>
      
      <glz-button size="sm" @click="${() => {
        const toast = document.querySelector('#toast-br') as any;
        toast?.show();
      }}">Bottom Right</glz-button>
      
      <glz-toast id="toast-tl" position="top-left" message="Top Left Position" duration="3000"></glz-toast>
      <glz-toast id="toast-tc" position="top-center" message="Top Center Position" duration="3000"></glz-toast>
      <glz-toast id="toast-tr" position="top-right" message="Top Right Position" duration="3000"></glz-toast>
      <glz-toast id="toast-bl" position="bottom-left" message="Bottom Left Position" duration="3000"></glz-toast>
      <glz-toast id="toast-bc" position="bottom-center" message="Bottom Center Position" duration="3000"></glz-toast>
      <glz-toast id="toast-br" position="bottom-right" message="Bottom Right Position" duration="3000"></glz-toast>
    </div>
  `,
};

export const WithProgress: Story = {
  render: () => html`
    <div>
      <glz-button @click="${() => {
        const toast = document.querySelector('glz-toast') as any;
        toast?.show();
      }}">Show Toast with Progress</glz-button>
      
      <glz-toast
        type="info"
        title="Uploading..."
        message="Your file is being uploaded."
        show-progress
        duration="8000"
      ></glz-toast>
    </div>
  `,
};

export const Persistent: Story = {
  render: () => html`
    <div>
      <glz-button @click="${() => {
        const toast = document.querySelector('glz-toast') as any;
        toast?.show();
      }}">Show Persistent Toast</glz-button>
      
      <glz-toast
        type="warning"
        title="Action Required"
        message="This toast will not auto-dismiss. Click the close button to dismiss."
        duration="0"
        closable
      ></glz-toast>
    </div>
  `,
};

export const NotClosable: Story = {
  render: () => html`
    <div>
      <glz-button @click="${() => {
        const toast = document.querySelector('glz-toast') as any;
        toast?.show();
      }}">Show Non-Closable Toast</glz-button>
      
      <glz-toast
        type="info"
        title="Processing"
        message="Please wait while we process your request..."
        closable="false"
        duration="4000"
        show-progress
      ></glz-toast>
    </div>
  `,
};

export const RealWorldExamples: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem; max-width: 400px;">
      <h3>Real-World Toast Examples</h3>
      
      <glz-button @click="${() => {
        const toast = document.querySelector('#save-toast') as any;
        toast?.show();
      }}">Save Document</glz-button>
      
      <glz-button @click="${() => {
        const toast = document.querySelector('#copy-toast') as any;
        toast?.show();
      }}">Copy to Clipboard</glz-button>
      
      <glz-button @click="${() => {
        const toast = document.querySelector('#network-toast') as any;
        toast?.show();
      }}">Simulate Network Error</glz-button>
      
      <glz-button @click="${() => {
        const toast = document.querySelector('#update-toast') as any;
        toast?.show();
      }}">Check for Updates</glz-button>
      
      <glz-toast
        id="save-toast"
        type="success"
        title="Document Saved"
        message="All changes have been saved to the cloud."
        duration="3000"
      ></glz-toast>
      
      <glz-toast
        id="copy-toast"
        type="success"
        message="Copied to clipboard!"
        duration="2000"
      ></glz-toast>
      
      <glz-toast
        id="network-toast"
        type="error"
        title="Connection Lost"
        message="Please check your internet connection and try again."
        duration="0"
      ></glz-toast>
      
      <glz-toast
        id="update-toast"
        type="info"
        title="Update Available"
        message="A new version is available. Refresh to update."
        duration="10000"
        show-progress
      ></glz-toast>
    </div>
  `,
};
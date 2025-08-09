import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-tooltip.js';
import '../button/glz-button.js';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'glz-tooltip',
  parameters: {
    docs: {
      description: {
        component: 'Accessible tooltip component with smart positioning'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content'
    },
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
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'Trigger behavior'
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger'
    },
    delay: {
      control: 'number',
      description: 'Show delay in milliseconds'
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow pointer'
    },
    interactive: {
      control: 'boolean',
      description: 'Allow interaction with tooltip content'
    },
    multiline: {
      control: 'boolean',
      description: 'Support multiline text'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <glz-tooltip content="This is a helpful tooltip">
        <glz-button variant="primary">Hover me</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const Positions: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
      <glz-tooltip content="Top tooltip" position="top">
        <glz-button variant="subtle">Top</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Bottom tooltip" position="bottom">
        <glz-button variant="subtle">Bottom</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Left tooltip" position="left">
        <glz-button variant="subtle">Left</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Right tooltip" position="right">
        <glz-button variant="subtle">Right</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Auto positioning tooltip" position="auto">
        <glz-button variant="subtle">Auto</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const Alignments: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center;">
      <glz-tooltip content="Start aligned" position="bottom" alignment="start">
        <glz-button variant="subtle" style="width: 150px;">Start</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Center aligned" position="bottom" alignment="center">
        <glz-button variant="subtle" style="width: 150px;">Center</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="End aligned" position="bottom" alignment="end">
        <glz-button variant="subtle" style="width: 150px;">End</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center;">
      <glz-tooltip content="Solid tooltip style" variant="solid">
        <glz-button variant="primary">Solid</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Glass morphism tooltip" variant="glass">
        <glz-button variant="glass">Glass</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const Triggers: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
      <glz-tooltip content="Shows on hover" trigger="hover">
        <glz-button variant="subtle">Hover</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Click to toggle" trigger="click">
        <glz-button variant="subtle">Click</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="Shows on focus" trigger="focus">
        <glz-button variant="subtle">Focus</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const Interactive: Story = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <glz-tooltip 
        content="You can interact with this tooltip. Try hovering over it!"
        interactive
        variant="glass"
      >
        <glz-button variant="primary">Interactive Tooltip</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const Multiline: Story = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <glz-tooltip 
        content="This is a longer tooltip with multiple lines of text. It wraps nicely and maintains readability while providing more detailed information."
        multiline
        variant="glass"
      >
        <glz-button variant="primary">Long Content</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const WithDelay: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center;">
      <glz-tooltip content="No delay" delay="0">
        <glz-button variant="subtle">Instant</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="500ms delay" delay="500">
        <glz-button variant="subtle">0.5s Delay</glz-button>
      </glz-tooltip>
      
      <glz-tooltip content="1000ms delay" delay="1000">
        <glz-button variant="subtle">1s Delay</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const NoArrow: Story = {
  render: () => html`
    <div style="padding: 100px; text-align: center;">
      <glz-tooltip content="Tooltip without arrow" showArrow="false">
        <glz-button variant="primary">No Arrow</glz-button>
      </glz-tooltip>
    </div>
  `
};

export const OnIcons: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center; align-items: center;">
      <glz-tooltip content="Settings">
        <button style="background: none; border: none; cursor: pointer; padding: 0.5rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.65-.07-.97l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.97 0 .32.03.65.07.97l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z"/>
          </svg>
        </button>
      </glz-tooltip>
      
      <glz-tooltip content="Information">
        <button style="background: none; border: none; cursor: pointer; padding: 0.5rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </button>
      </glz-tooltip>
      
      <glz-tooltip content="Help">
        <button style="background: none; border: none; cursor: pointer; padding: 0.5rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        </button>
      </glz-tooltip>
    </div>
  `
};

export const FormFieldTooltips: Story = {
  render: () => html`
    <div style="padding: 50px; max-width: 400px; margin: 0 auto;">
      <div style="margin-bottom: 1rem;">
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          Email Address
          <glz-tooltip 
            content="We'll never share your email with anyone else"
            variant="glass"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="opacity: 0.5;">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7v-2h2v2zm0-3H7V4h2v5z"/>
            </svg>
          </glz-tooltip>
        </label>
        <input 
          type="email" 
          placeholder="your@email.com"
          style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-glass-border); border-radius: 8px; background: transparent;"
        />
      </div>
      
      <div>
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          Password
          <glz-tooltip 
            content="Password must be at least 8 characters with uppercase, lowercase, and numbers"
            multiline
            variant="glass"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="opacity: 0.5;">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7v-2h2v2zm0-3H7V4h2v5z"/>
            </svg>
          </glz-tooltip>
        </label>
        <input 
          type="password" 
          placeholder="Enter password"
          style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-glass-border); border-radius: 8px; background: transparent;"
        />
      </div>
    </div>
  `
};

export const EdgePositioning: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); height: 400px;">
      <!-- Top left corner -->
      <div style="padding: 20px;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Top Left</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Top center -->
      <div style="padding: 20px; text-align: center;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Top Center</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Top right corner -->
      <div style="padding: 20px; text-align: right;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Top Right</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Middle left -->
      <div style="padding: 20px; display: flex; align-items: center;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Middle Left</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Center -->
      <div style="padding: 20px; display: flex; align-items: center; justify-content: center;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Center</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Middle right -->
      <div style="padding: 20px; display: flex; align-items: center; justify-content: flex-end;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Middle Right</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Bottom left corner -->
      <div style="padding: 20px; display: flex; align-items: flex-end;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Bottom Left</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Bottom center -->
      <div style="padding: 20px; display: flex; align-items: flex-end; justify-content: center;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Bottom Center</glz-button>
        </glz-tooltip>
      </div>
      
      <!-- Bottom right corner -->
      <div style="padding: 20px; display: flex; align-items: flex-end; justify-content: flex-end;">
        <glz-tooltip content="Smart positioning at edges" position="auto">
          <glz-button variant="subtle" size="sm">Bottom Right</glz-button>
        </glz-tooltip>
      </div>
    </div>
  `
};
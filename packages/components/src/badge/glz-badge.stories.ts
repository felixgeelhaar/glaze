import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-badge.js';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'glz-badge',
  parameters: {
    docs: {
      description: {
        component: 'Lightweight badge component for displaying status, counts, or labels'
      }
    }
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'success', 'warning', 'error', 'info', 'glass'],
      description: 'Badge color variant'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Badge size'
    },
    variant: {
      control: 'radio',
      options: ['pill', 'rounded', 'square'],
      description: 'Badge shape variant'
    },
    outline: {
      control: 'boolean',
      description: 'Use outline style'
    },
    dot: {
      control: 'boolean',
      description: 'Show dot indicator'
    },
    dotPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the dot indicator'
    },
    clickable: {
      control: 'boolean',
      description: 'Make badge clickable'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the badge'
    },
    animated: {
      control: 'boolean',
      description: 'Animate badge on mount'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <glz-badge>Default</glz-badge>
      <glz-badge color="primary">Primary</glz-badge>
      <glz-badge color="accent">Accent</glz-badge>
      <glz-badge color="success">Success</glz-badge>
      <glz-badge color="warning">Warning</glz-badge>
      <glz-badge color="error">Error</glz-badge>
      <glz-badge color="info">Info</glz-badge>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <glz-badge size="small" color="primary">Small</glz-badge>
      <glz-badge size="medium" color="primary">Medium</glz-badge>
      <glz-badge size="large" color="primary">Large</glz-badge>
    </div>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <glz-badge variant="pill" color="primary">Pill</glz-badge>
      <glz-badge variant="rounded" color="primary">Rounded</glz-badge>
      <glz-badge variant="square" color="primary">Square</glz-badge>
    </div>
  `
};

export const Outline: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <glz-badge outline>Default</glz-badge>
      <glz-badge outline color="primary">Primary</glz-badge>
      <glz-badge outline color="accent">Accent</glz-badge>
      <glz-badge outline color="success">Success</glz-badge>
      <glz-badge outline color="warning">Warning</glz-badge>
      <glz-badge outline color="error">Error</glz-badge>
      <glz-badge outline color="info">Info</glz-badge>
    </div>
  `
};

export const WithDot: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <glz-badge dot color="success">Online</glz-badge>
      <glz-badge dot color="warning">Away</glz-badge>
      <glz-badge dot color="error">Busy</glz-badge>
      <glz-badge dot dot-position="right" color="info">New</glz-badge>
    </div>
  `
};

export const Glass: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md);">
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <glz-badge color="glass">Glass Badge</glz-badge>
        <glz-badge color="glass" dot>Status</glz-badge>
        <glz-badge color="glass" size="large">Large Glass</glz-badge>
        <glz-badge color="glass" variant="rounded">Rounded Glass</glz-badge>
      </div>
    </div>
  `
};

export const Clickable: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <glz-badge clickable color="primary" @glz-badge-click=${(e: CustomEvent) => console.log('Clicked:', e.detail)}>
        Click me
      </glz-badge>
      <glz-badge clickable color="accent" animated>
        Animated
      </glz-badge>
      <glz-badge clickable disabled color="success">
        Disabled
      </glz-badge>
    </div>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <glz-badge color="primary">
        <svg slot="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Verified
      </glz-badge>
      
      <glz-badge color="warning">
        <svg slot="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Warning
      </glz-badge>
      
      <glz-badge color="error">
        <svg slot="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        Error
      </glz-badge>
    </div>
  `
};

export const StatusBadges: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <span style="width: 100px;">Build:</span>
        <glz-badge color="success" dot>Passing</glz-badge>
      </div>
      
      <div style="display: flex; gap: 1rem; align-items: center;">
        <span style="width: 100px;">Coverage:</span>
        <glz-badge color="warning">87%</glz-badge>
      </div>
      
      <div style="display: flex; gap: 1rem; align-items: center;">
        <span style="width: 100px;">Version:</span>
        <glz-badge color="info">v2.4.1</glz-badge>
      </div>
      
      <div style="display: flex; gap: 1rem; align-items: center;">
        <span style="width: 100px;">License:</span>
        <glz-badge>MIT</glz-badge>
      </div>
    </div>
  `
};

export const NotificationBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <div style="position: relative; display: inline-block;">
        <button style="padding: 0.5rem 1rem; background: var(--color-surface-base); border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); cursor: pointer;">
          Inbox
        </button>
        <glz-badge 
          color="error" 
          size="small" 
          style="position: absolute; top: -8px; right: -8px;"
        >
          12
        </glz-badge>
      </div>
      
      <div style="position: relative; display: inline-block;">
        <button style="padding: 0.5rem 1rem; background: var(--color-surface-base); border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); cursor: pointer;">
          Messages
        </button>
        <glz-badge 
          color="primary" 
          size="small" 
          animated
          style="position: absolute; top: -8px; right: -8px;"
        >
          3
        </glz-badge>
      </div>
      
      <div style="position: relative; display: inline-block;">
        <button style="padding: 0.5rem 1rem; background: var(--color-surface-base); border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); cursor: pointer;">
          Notifications
        </button>
        <glz-badge 
          color="accent" 
          size="small" 
          dot
          style="position: absolute; top: -4px; right: -4px;"
        >
        </glz-badge>
      </div>
    </div>
  `
};

export const LabelBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <glz-badge color="primary" variant="rounded">React</glz-badge>
      <glz-badge color="accent" variant="rounded">Vue</glz-badge>
      <glz-badge color="success" variant="rounded">Angular</glz-badge>
      <glz-badge color="warning" variant="rounded">Svelte</glz-badge>
      <glz-badge color="info" variant="rounded">Web Components</glz-badge>
      <glz-badge outline variant="rounded">TypeScript</glz-badge>
      <glz-badge outline color="primary" variant="rounded">JavaScript</glz-badge>
    </div>
  `
};
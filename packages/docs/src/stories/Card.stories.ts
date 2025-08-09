import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@glaze/components';

const meta: Meta = {
  title: 'Components/Card',
  component: 'glz-card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'glass' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Card size and padding',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    tone: {
      control: { type: 'select' },
      options: ['primary', 'accent', 'neutral'],
      description: 'Color tone',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A container component with glassmorphism effects for grouping related content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'glass',
    size: 'md',
    tone: 'neutral',
  },
  render: (args) => html`
    <glz-card
      variant="${args.variant}"
      size="${args.size}"
      tone="${args.tone}"
    >
      <h2 style="margin: 0 0 1rem 0; color: white;">Card Title</h2>
      <p style="margin: 0; color: rgba(255, 255, 255, 0.8);">
        This is a glass morphism card with beautiful blur effects and transparency.
        Perfect for modern UI designs that need depth and visual hierarchy.
      </p>
    </glz-card>
  `,
};

export const WithButton: Story = {
  args: {
    variant: 'glass',
    size: 'lg',
    tone: 'primary',
  },
  render: (args) => html`
    <glz-card
      variant="${args.variant}"
      size="${args.size}"
      tone="${args.tone}"
    >
      <h2 style="margin: 0 0 1rem 0; color: white;">Interactive Card</h2>
      <p style="margin: 0 0 1.5rem 0; color: rgba(255, 255, 255, 0.8);">
        Cards can contain other Glaze components like buttons for rich interactions.
      </p>
      <glz-button variant="solid" tone="accent">
        Learn More
      </glz-button>
    </glz-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Card containing interactive elements like buttons.',
      },
    },
  },
};

export const CardGrid: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
      <glz-card variant="glass" tone="primary">
        <h3 style="margin: 0 0 0.5rem 0; color: white;">Primary Card</h3>
        <p style="margin: 0; color: rgba(255, 255, 255, 0.8);">
          Cards work great in grid layouts for dashboards and galleries.
        </p>
      </glz-card>
      <glz-card variant="glass" tone="accent">
        <h3 style="margin: 0 0 0.5rem 0; color: white;">Accent Card</h3>
        <p style="margin: 0; color: rgba(255, 255, 255, 0.8);">
          Different tones help establish visual hierarchy.
        </p>
      </glz-card>
      <glz-card variant="glass" tone="neutral">
        <h3 style="margin: 0 0 0.5rem 0; color: white;">Neutral Card</h3>
        <p style="margin: 0; color: rgba(255, 255, 255, 0.8);">
          Use neutral tone for less prominent content areas.
        </p>
      </glz-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiple cards in a responsive grid layout.',
      },
    },
  },
};

export const Nested: Story = {
  render: () => html`
    <glz-card variant="glass" size="lg" tone="neutral">
      <h2 style="margin: 0 0 1rem 0; color: white;">Parent Card</h2>
      <p style="margin: 0 0 1rem 0; color: rgba(255, 255, 255, 0.8);">
        Cards can be nested to create complex layouts.
      </p>
      <glz-card variant="solid" size="sm" tone="primary">
        <h3 style="margin: 0 0 0.5rem 0; color: white;">Nested Card</h3>
        <p style="margin: 0; color: rgba(255, 255, 255, 0.9);">
          This card is inside another card.
        </p>
      </glz-card>
    </glz-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Nested cards for complex content hierarchies.',
      },
    },
  },
};

export const ReducedTransparency: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
      <glz-card variant="glass" tone="primary">
        <h3 style="margin: 0 0 0.5rem 0; color: white;">Normal Glass</h3>
        <p style="margin: 0; color: rgba(255, 255, 255, 0.8);">
          Standard transparency and blur.
        </p>
      </glz-card>
      <glz-card variant="glass" tone="primary" data-reduced-transparency="true">
        <h3 style="margin: 0 0 0.5rem 0; color: white;">Reduced Transparency</h3>
        <p style="margin: 0; color: rgba(255, 255, 255, 0.8);">
          For accessibility, respects user preferences.
        </p>
      </glz-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating reduced transparency mode for accessibility.',
      },
    },
  },
};
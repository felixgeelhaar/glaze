import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-card.js';

const meta: Meta = {
  title: 'Components/Card',
  component: 'glz-card',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass', 'subtle'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    tone: {
      control: { type: 'select' },
      options: ['primary', 'neutral', 'accent', undefined],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'md',
  },
  render: (args) => html`
    <glz-card variant="${args.variant}" size="${args.size}" tone="${args.tone || ''}">
      <h2>Card Title</h2>
      <p>This is a card component with various styling options.</p>
    </glz-card>
  `,
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    size: 'md',
  },
  render: (args) => html`
    <div style="background: linear-gradient(135deg, var(--color-primary-base), var(--color-accent-base)); padding: 2rem;">
      <glz-card variant="${args.variant}" size="${args.size}">
        <h2>Glass Card</h2>
        <p>This card has a glass morphism effect with backdrop blur.</p>
      </glz-card>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
      <glz-card variant="solid">
        <h3>Solid Card</h3>
        <p>Standard solid background card.</p>
      </glz-card>
      <glz-card variant="glass">
        <h3>Glass Card</h3>
        <p>Glass morphism effect card.</p>
      </glz-card>
      <glz-card variant="subtle">
        <h3>Subtle Card</h3>
        <p>Transparent with border.</p>
      </glz-card>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-card size="sm">
        <h3>Small Card</h3>
        <p>Compact padding for dense layouts.</p>
      </glz-card>
      <glz-card size="md">
        <h3>Medium Card</h3>
        <p>Default size for most use cases.</p>
      </glz-card>
      <glz-card size="lg">
        <h3>Large Card</h3>
        <p>Spacious padding for prominent content.</p>
      </glz-card>
    </div>
  `,
};
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, within } from '@storybook/test';
import '@glaze/components';

const meta: Meta = {
  title: 'Components/Button',
  component: 'glz-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
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
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state with spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pressed: {
      control: { type: 'boolean' },
      description: 'Pressed/active state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with glassmorphism effects and multiple style variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    tone: 'primary',
    disabled: false,
    loading: false,
    pressed: false,
  },
  render: (args) => html`
    <glz-button
      variant="${args.variant}"
      size="${args.size}"
      tone="${args.tone}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?pressed="${args.pressed}"
    >
      Click Me
    </glz-button>
  `,
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    size: 'lg',
    tone: 'primary',
  },
  render: (args) => html`
    <glz-button
      variant="${args.variant}"
      size="${args.size}"
      tone="${args.tone}"
    >
      Glass Button
    </glz-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Glass variant with blur and transparency effects for modern UI design.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    tone: 'accent',
  },
  render: (args) => html`
    <glz-button
      variant="${args.variant}"
      size="${args.size}"
      tone="${args.tone}"
    >
      Ghost Button
    </glz-button>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <glz-button size="sm" variant="glass">Small</glz-button>
      <glz-button size="md" variant="glass">Medium</glz-button>
      <glz-button size="lg" variant="glass">Large</glz-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Available button sizes for different use cases.',
      },
    },
  },
};

export const Tones: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <glz-button variant="glass" tone="primary">Primary</glz-button>
      <glz-button variant="glass" tone="accent">Accent</glz-button>
      <glz-button variant="glass" tone="neutral">Neutral</glz-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different color tones for various UI contexts.',
      },
    },
  },
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <glz-button variant="glass">Normal</glz-button>
      <glz-button variant="glass" disabled>Disabled</glz-button>
      <glz-button variant="glass" loading>Loading</glz-button>
      <glz-button variant="glass" pressed>Pressed</glz-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Various button states including disabled, loading, and pressed.',
      },
    },
  },
};

export const WithInteractions: Story = {
  args: {
    variant: 'glass',
    size: 'md',
    tone: 'primary',
  },
  render: (args) => html`
    <glz-button
      id="interactive-button"
      variant="${args.variant}"
      size="${args.size}"
      tone="${args.tone}"
      @click="${() => console.log('Button clicked!')}"
    >
      Interactive Button
    </glz-button>
  `,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText('Interactive Button');
    
    // Test click interaction
    await userEvent.click(button);
    
    // Test keyboard interaction
    button.focus();
    await userEvent.keyboard('{Enter}');
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with interaction testing to verify click and keyboard events.',
      },
    },
  },
};
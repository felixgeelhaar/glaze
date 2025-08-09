import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@glaze/components';

const meta: Meta = {
  title: 'Components/Input',
  component: 'glz-input',
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
      description: 'Input size',
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
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Input label',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below input',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message text',
      table: {
        type: { summary: 'string' },
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
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A flexible input component with glassmorphism effects and comprehensive validation support.',
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
    tone: 'primary',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Choose a unique username',
  },
  render: (args) => html`
    <glz-input
      variant="${args.variant}"
      size="${args.size}"
      tone="${args.tone}"
      type="${args.type}"
      label="${args.label}"
      placeholder="${args.placeholder}"
      helper-text="${args.helperText}"
      ?error="${args.error}"
      error-message="${args.errorMessage}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
    ></glz-input>
  `,
};

export const WithValidation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <glz-input
        variant="glass"
        type="email"
        label="Email Address"
        placeholder="user@example.com"
        helper-text="We'll never share your email"
        required
      ></glz-input>
      
      <glz-input
        variant="glass"
        type="password"
        label="Password"
        placeholder="Enter password"
        helper-text="Must be at least 8 characters"
        required
        pattern=".{8,}"
      ></glz-input>
      
      <glz-input
        variant="glass"
        label="Username"
        placeholder="Enter username"
        error
        error-message="This username is already taken"
      ></glz-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Input fields with validation states and error messages.',
      },
    },
  },
};

export const InputTypes: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
      <glz-input
        variant="glass"
        type="text"
        label="Text Input"
        placeholder="Enter text"
      ></glz-input>
      
      <glz-input
        variant="glass"
        type="email"
        label="Email Input"
        placeholder="email@example.com"
      ></glz-input>
      
      <glz-input
        variant="glass"
        type="password"
        label="Password Input"
        placeholder="Enter password"
      ></glz-input>
      
      <glz-input
        variant="glass"
        type="number"
        label="Number Input"
        placeholder="Enter number"
        min="0"
        max="100"
      ></glz-input>
      
      <glz-input
        variant="glass"
        type="tel"
        label="Phone Input"
        placeholder="+1 (555) 000-0000"
      ></glz-input>
      
      <glz-input
        variant="glass"
        type="search"
        label="Search Input"
        placeholder="Search..."
      ></glz-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different input types for various data entry needs.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <glz-input
        variant="glass"
        size="sm"
        label="Small Input"
        placeholder="Small size"
      ></glz-input>
      
      <glz-input
        variant="glass"
        size="md"
        label="Medium Input"
        placeholder="Medium size (default)"
      ></glz-input>
      
      <glz-input
        variant="glass"
        size="lg"
        label="Large Input"
        placeholder="Large size"
      ></glz-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Available input sizes for different UI contexts.',
      },
    },
  },
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <glz-input
        variant="glass"
        label="Normal Input"
        placeholder="Editable input"
        value="Normal state"
      ></glz-input>
      
      <glz-input
        variant="glass"
        label="Disabled Input"
        placeholder="Cannot edit"
        value="Disabled state"
        disabled
      ></glz-input>
      
      <glz-input
        variant="glass"
        label="Read-only Input"
        value="Read-only value"
        readonly
      ></glz-input>
      
      <glz-input
        variant="glass"
        label="Required Input"
        placeholder="This field is required"
        required
      ></glz-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different input states including disabled, read-only, and required.',
      },
    },
  },
};


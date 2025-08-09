import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-input.js';

const meta: Meta = {
  title: 'Components/Input',
  component: 'glz-input',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass', 'subtle'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    type: 'text',
    placeholder: 'Enter text...',
    label: 'Text Input',
  },
  render: (args) => html`
    <glz-input
      variant="${args.variant}"
      size="${args.size}"
      type="${args.type}"
      placeholder="${args.placeholder}"
      label="${args.label}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      error-message="${args.errorMessage || ''}"
      helper-text="${args.helperText || ''}"
    ></glz-input>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-input
        label="Email Address"
        type="email"
        placeholder="john.doe@example.com"
        required
      ></glz-input>
      <glz-input
        label="Password"
        type="password"
        placeholder="Enter password"
        helper-text="Must be at least 8 characters"
      ></glz-input>
    </div>
  `,
};

export const Glass: Story = {
  render: () => html`
    <div style="background: linear-gradient(135deg, var(--color-primary-base), var(--color-accent-base)); padding: 2rem;">
      <glz-input
        variant="glass"
        label="Glass Input"
        placeholder="Glass morphism effect..."
      ></glz-input>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-input
        variant="solid"
        label="Solid Variant"
        placeholder="Solid background"
      ></glz-input>
      <glz-input
        variant="glass"
        label="Glass Variant"
        placeholder="Glass morphism effect"
      ></glz-input>
      <glz-input
        variant="subtle"
        label="Subtle Variant"
        placeholder="Transparent background"
      ></glz-input>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-input
        size="sm"
        label="Small Input"
        placeholder="Small size"
      ></glz-input>
      <glz-input
        size="md"
        label="Medium Input"
        placeholder="Medium size (default)"
      ></glz-input>
      <glz-input
        size="lg"
        label="Large Input"
        placeholder="Large size"
      ></glz-input>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-input
        label="Search"
        type="search"
        placeholder="Search..."
      >
        <svg slot="icon-start" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </glz-input>
      
      <glz-input
        label="Email"
        type="email"
        placeholder="Enter email"
      >
        <svg slot="icon-start" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm0 2h12v8H2V4zm6 3.5L2.5 4h11L8 7.5zm0 1.5L2 4v8l6-5zm0 0l6 5V4l-6 5z"/>
        </svg>
      </glz-input>
      
      <glz-input
        label="Password"
        type="password"
        placeholder="Enter password"
        value="password123"
      >
        <svg slot="icon-start" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
        <svg slot="icon-end" width="16" height="16" viewBox="0 0 16 16" fill="green">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>
      </glz-input>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-input
        label="Required Field"
        placeholder="This field is required"
        required
      ></glz-input>
      
      <glz-input
        label="Field with Error"
        placeholder="Invalid input"
        value="invalid@"
        error
        error-message="Please enter a valid email address"
      ></glz-input>
      
      <glz-input
        label="Field with Helper Text"
        placeholder="Enter your username"
        helper-text="Username must be 3-20 characters"
      ></glz-input>
      
      <glz-input
        label="Disabled Field"
        placeholder="Cannot edit"
        value="Disabled value"
        disabled
      ></glz-input>
      
      <glz-input
        label="Read-only Field"
        value="Read-only value"
        readonly
      ></glz-input>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: grid; gap: 1rem; max-width: 400px;">
      <h2>User Registration</h2>
      
      <glz-input
        label="Full Name"
        name="name"
        required
        placeholder="John Doe"
      ></glz-input>
      
      <glz-input
        label="Email Address"
        name="email"
        type="email"
        required
        placeholder="john.doe@example.com"
      ></glz-input>
      
      <glz-input
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        helper-text="Optional"
      ></glz-input>
      
      <glz-input
        label="Password"
        name="password"
        type="password"
        required
        placeholder="Enter password"
        helper-text="Must be at least 8 characters"
        minlength="8"
      ></glz-input>
      
      <glz-input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        required
        placeholder="Re-enter password"
      ></glz-input>
      
      <glz-input
        label="Age"
        name="age"
        type="number"
        min="18"
        max="120"
        placeholder="18"
      ></glz-input>
      
      <button type="submit" style="padding: 0.5rem 1rem; background: var(--color-primary-base); color: var(--color-primary-on); border: none; border-radius: var(--radius-md); cursor: pointer;">
        Register
      </button>
    </form>
  `,
};
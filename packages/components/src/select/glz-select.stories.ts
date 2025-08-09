import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-select.js';

const meta: Meta = {
  title: 'Components/Select',
  component: 'glz-select',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'glass', 'subtle'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
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
    multiple: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj;

const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'watermelon', label: 'Watermelon' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
];

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    label: 'Select Fruit',
    placeholder: 'Choose a fruit...',
    options: basicOptions,
  },
  render: (args) => html`
    <glz-select
      variant="${args.variant}"
      size="${args.size}"
      label="${args.label}"
      placeholder="${args.placeholder}"
      .options="${args.options}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?multiple="${args.multiple}"
    ></glz-select>
  `,
};

export const Glass: Story = {
  render: () => html`
    <div style="background: linear-gradient(135deg, var(--color-primary-base), var(--color-accent-base)); padding: 2rem;">
      <glz-select
        variant="glass"
        label="Glass Select"
        placeholder="Select an option..."
        .options="${basicOptions}"
      ></glz-select>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-select
        variant="solid"
        label="Solid Variant"
        .options="${basicOptions}"
        value="apple"
      ></glz-select>
      <glz-select
        variant="glass"
        label="Glass Variant"
        .options="${basicOptions}"
        value="banana"
      ></glz-select>
      <glz-select
        variant="subtle"
        label="Subtle Variant"
        .options="${basicOptions}"
        value="orange"
      ></glz-select>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-select
        size="sm"
        label="Small Select"
        .options="${basicOptions}"
      ></glz-select>
      <glz-select
        size="md"
        label="Medium Select"
        .options="${basicOptions}"
      ></glz-select>
      <glz-select
        size="lg"
        label="Large Select"
        .options="${basicOptions}"
      ></glz-select>
    </div>
  `,
};

export const WithDisabledOptions: Story = {
  render: () => html`
    <glz-select
      label="Select with Disabled Options"
      placeholder="Some options are disabled"
      .options="${
        [
          { value: 'available1', label: 'Available Option 1' },
          { value: 'disabled1', label: 'Disabled Option 1', disabled: true },
          { value: 'available2', label: 'Available Option 2' },
          { value: 'disabled2', label: 'Disabled Option 2', disabled: true },
          { value: 'available3', label: 'Available Option 3' },
        ]
      }"
    ></glz-select>
  `,
};

export const MultipleSelection: Story = {
  render: () => html`
    <glz-select
      label="Select Multiple Fruits"
      placeholder="Choose one or more..."
      .options="${basicOptions}"
      multiple
      helper-text="Click to select multiple options"
    ></glz-select>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: grid; gap: 1rem;">
      <glz-select
        label="Required Field"
        placeholder="This field is required"
        .options="${basicOptions}"
        required
      ></glz-select>
      
      <glz-select
        label="Field with Error"
        .options="${basicOptions}"
        error
        error-message="Please select a valid option"
      ></glz-select>
      
      <glz-select
        label="Field with Helper Text"
        .options="${basicOptions}"
        helper-text="Choose your favorite fruit"
      ></glz-select>
      
      <glz-select
        label="Disabled Field"
        .options="${basicOptions}"
        value="apple"
        disabled
      ></glz-select>
    </div>
  `,
};

export const LongList: Story = {
  render: () => html`
    <glz-select
      label="Select Country"
      placeholder="Choose your country..."
      .options="${countryOptions}"
      helper-text="Scroll or type to search"
    ></glz-select>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="display: grid; gap: 1rem; max-width: 400px;">
      <h2>Shipping Information</h2>
      
      <glz-select
        label="Country"
        name="country"
        required
        .options="${countryOptions}"
      ></glz-select>
      
      <glz-select
        label="Shipping Method"
        name="shipping"
        required
        .options="${
          [
            { value: 'standard', label: 'Standard (5-7 days)' },
            { value: 'express', label: 'Express (2-3 days)' },
            { value: 'overnight', label: 'Overnight (1 day)' },
          ]
        }"
        value="standard"
      ></glz-select>
      
      <glz-select
        label="Gift Options"
        name="gift"
        .options="${
          [
            { value: 'none', label: 'No gift wrapping' },
            { value: 'basic', label: 'Basic gift wrap (+$2)' },
            { value: 'premium', label: 'Premium gift wrap (+$5)' },
            { value: 'luxury', label: 'Luxury gift wrap (+$10)', disabled: true },
          ]
        }"
        helper-text="Luxury option temporarily unavailable"
      ></glz-select>
      
      <button type="submit" style="padding: 0.5rem 1rem; background: var(--color-primary-base); color: var(--color-primary-on); border: none; border-radius: var(--radius-md); cursor: pointer;">
        Continue to Payment
      </button>
    </form>
  `,
};
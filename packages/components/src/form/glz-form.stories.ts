import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-form.js';
import '../input/glz-input.js';
import '../select/glz-select.js';
import '../button/glz-button.js';

const meta: Meta = {
  title: 'Components/Form',
  component: 'glz-form',
  parameters: {
    docs: {
      description: {
        component: 'Form component with built-in validation and error handling'
      }
    }
  },
  argTypes: {
    action: {
      control: 'text',
      description: 'Form action URL'
    },
    method: {
      control: 'radio',
      options: ['GET', 'POST'],
      description: 'Form submission method'
    },
    novalidate: {
      control: 'boolean',
      description: 'Disable form validation'
    },
    preventSubmit: {
      control: 'boolean',
      description: 'Prevent actual form submission'
    },
    successMessage: {
      control: 'text',
      description: 'Custom success message'
    },
    errorMessage: {
      control: 'text',
      description: 'Custom error message'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <glz-form preventSubmit>
      <glz-input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        required
        data-form-field
      ></glz-input>
      
      <glz-select
        label="Country"
        name="country"
        required
        data-form-field
        .options=${[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' }
        ]}
      ></glz-select>
    </glz-form>
  `
};

export const WithValidation: Story = {
  render: () => html`
    <glz-form preventSubmit>
      <glz-input
        label="Username"
        name="username"
        placeholder="Choose a username"
        required
        helperText="Must be 3-20 characters"
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Email"
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Password"
        name="password"
        type="password"
        placeholder="Min 8 characters"
        required
        helperText="Include uppercase, lowercase, and numbers"
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Re-enter password"
        required
        data-form-field
      ></glz-input>
    </glz-form>
  `
};

export const ContactForm: Story = {
  render: () => html`
    <glz-form preventSubmit successMessage="Thank you! We'll get back to you soon.">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <glz-input
          label="First Name"
          name="firstName"
          required
          data-form-field
        ></glz-input>
        
        <glz-input
          label="Last Name"
          name="lastName"
          required
          data-form-field
        ></glz-input>
      </div>
      
      <glz-input
        label="Email"
        name="email"
        type="email"
        required
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        data-form-field
      ></glz-input>
      
      <glz-select
        label="Subject"
        name="subject"
        required
        data-form-field
        .options=${[
          { value: 'general', label: 'General Inquiry' },
          { value: 'support', label: 'Technical Support' },
          { value: 'sales', label: 'Sales Question' },
          { value: 'feedback', label: 'Feedback' }
        ]}
      ></glz-select>
      
      <div>
        <label for="message" style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          style="width: 100%; padding: 0.5rem 1rem; border-radius: 12px; border: 1px solid var(--color-glass-border); background: transparent; font-family: inherit; resize: vertical;"
          placeholder="How can we help you?"
        ></textarea>
      </div>
    </glz-form>
  `
};

export const LoginForm: Story = {
  render: () => html`
    <glz-card variant="glass" style="max-width: 400px; margin: 2rem auto;">
      <h2 style="margin-top: 0;">Sign In</h2>
      
      <glz-form preventSubmit>
        <glz-input
          label="Email or Username"
          name="username"
          required
          placeholder="Enter your email or username"
          data-form-field
        ></glz-input>
        
        <glz-input
          label="Password"
          name="password"
          type="password"
          required
          placeholder="Enter your password"
          data-form-field
        ></glz-input>
        
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" id="remember" name="remember" />
          <label for="remember" style="margin: 0;">Remember me</label>
        </div>
        
        <div slot="actions" style="display: flex; flex-direction: column; gap: 1rem;">
          <glz-button type="submit" variant="primary" style="width: 100%;">
            Sign In
          </glz-button>
          <glz-button type="button" variant="subtle" style="width: 100%;">
            Forgot Password?
          </glz-button>
        </div>
      </glz-form>
      
      <p style="text-align: center; margin-top: 1.5rem; margin-bottom: 0;">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </glz-card>
  `
};

export const RegistrationForm: Story = {
  render: () => html`
    <glz-form preventSubmit>
      <h2 style="margin-top: 0;">Create Account</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <glz-input
          label="First Name"
          name="firstName"
          required
          data-form-field
        ></glz-input>
        
        <glz-input
          label="Last Name"
          name="lastName"
          required
          data-form-field
        ></glz-input>
      </div>
      
      <glz-input
        label="Email"
        name="email"
        type="email"
        required
        helperText="We'll never share your email"
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Username"
        name="username"
        required
        helperText="3-20 characters, letters and numbers only"
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Password"
        name="password"
        type="password"
        required
        helperText="Minimum 8 characters with mixed case and numbers"
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        required
        data-form-field
      ></glz-input>
      
      <glz-select
        label="How did you hear about us?"
        name="source"
        data-form-field
        .options=${[
          { value: '', label: 'Please select...' },
          { value: 'search', label: 'Search Engine' },
          { value: 'social', label: 'Social Media' },
          { value: 'friend', label: 'Friend or Colleague' },
          { value: 'ad', label: 'Advertisement' },
          { value: 'other', label: 'Other' }
        ]}
      ></glz-select>
      
      <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
        <input type="checkbox" id="terms" name="terms" required style="margin-top: 0.25rem;" />
        <label for="terms" style="margin: 0; font-size: 0.875rem;">
          I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </label>
      </div>
      
      <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
        <input type="checkbox" id="newsletter" name="newsletter" style="margin-top: 0.25rem;" />
        <label for="newsletter" style="margin: 0; font-size: 0.875rem;">
          Send me updates and newsletters
        </label>
      </div>
    </glz-form>
  `
};

export const CustomActions: Story = {
  render: () => html`
    <glz-form preventSubmit>
      <glz-input
        label="Project Name"
        name="projectName"
        required
        placeholder="Enter project name"
        data-form-field
      ></glz-input>
      
      <glz-input
        label="Description"
        name="description"
        placeholder="Brief description"
        data-form-field
      ></glz-input>
      
      <div slot="actions" style="display: flex; gap: 1rem; justify-content: space-between; width: 100%;">
        <glz-button type="button" variant="subtle">
          Save as Draft
        </glz-button>
        <div style="display: flex; gap: 0.5rem;">
          <glz-button type="button" variant="subtle">
            Cancel
          </glz-button>
          <glz-button type="submit" variant="primary">
            Create Project
          </glz-button>
        </div>
      </div>
    </glz-form>
  `
};
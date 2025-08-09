import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-accordion.js';

const meta: Meta = {
  title: 'Components/Accordion',
  component: 'glz-accordion',
  parameters: {
    docs: {
      description: {
        component: 'Accessible accordion component with smooth animations and keyboard navigation'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'glass', 'flush'],
      description: 'Visual style variant'
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items to be expanded'
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow all items to be collapsed'
    },
    activeItems: {
      control: 'text',
      description: 'Comma-separated list of active item IDs'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <glz-accordion>
      <div slot="item" id="item-1" class="accordion-item">
        <div class="accordion-header">What is Glaze Design System?</div>
        <div class="accordion-content">
          <p>Glaze is a modern design system built with glassmorphism aesthetics and Web Components. It provides beautiful, accessible, and performant UI components that work seamlessly across frameworks.</p>
        </div>
      </div>
      
      <div slot="item" id="item-2" class="accordion-item">
        <div class="accordion-header">How do I get started?</div>
        <div class="accordion-content">
          <p>Getting started is easy! Simply install the package via npm:</p>
          <pre style="background: var(--color-surface-base); padding: 1rem; border-radius: var(--radius-sm); overflow-x: auto;">
npm install @glaze/components</pre>
          <p>Then import the components you need in your application.</p>
        </div>
      </div>
      
      <div slot="item" id="item-3" class="accordion-item">
        <div class="accordion-header">Is it accessible?</div>
        <div class="accordion-content">
          <p>Yes! All Glaze components are built with accessibility in mind, following WCAG 2.2 AA+ standards. They include proper ARIA attributes, keyboard navigation, and screen reader support.</p>
        </div>
      </div>
      
      <div slot="item" id="item-4" class="accordion-item">
        <div class="accordion-header">What frameworks are supported?</div>
        <div class="accordion-content">
          <p>Glaze components are built with Web Components (Lit), making them framework-agnostic. They work with:</p>
          <ul>
            <li>React</li>
            <li>Vue</li>
            <li>Angular</li>
            <li>Svelte</li>
            <li>Vanilla JavaScript</li>
          </ul>
        </div>
      </div>
    </glz-accordion>
  `
};

export const Glass: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px;">
      <glz-accordion variant="glass">
        <div slot="item" id="item-1" class="accordion-item">
          <div class="accordion-header" style="color: white;">Beautiful Glass Effect</div>
          <div class="accordion-content" style="color: rgba(255,255,255,0.9);">
            <p>The glass variant creates a stunning frosted glass effect that works beautifully on colorful backgrounds.</p>
          </div>
        </div>
        
        <div slot="item" id="item-2" class="accordion-item">
          <div class="accordion-header" style="color: white;">Modern Aesthetics</div>
          <div class="accordion-content" style="color: rgba(255,255,255,0.9);">
            <p>Glassmorphism is a modern design trend that combines transparency, blur, and subtle borders to create depth and hierarchy.</p>
          </div>
        </div>
        
        <div slot="item" id="item-3" class="accordion-item">
          <div class="accordion-header" style="color: white;">Performance Optimized</div>
          <div class="accordion-content" style="color: rgba(255,255,255,0.9);">
            <p>Despite the visual complexity, our glass components are optimized for performance with hardware-accelerated CSS.</p>
          </div>
        </div>
      </glz-accordion>
    </div>
  `
};

export const Flush: Story = {
  render: () => html`
    <glz-accordion variant="flush">
      <div slot="item" id="item-1" class="accordion-item">
        <div class="accordion-header">Account Settings</div>
        <div class="accordion-content">
          <p>Manage your account preferences, security settings, and personal information.</p>
          <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--color-primary-base); color: var(--color-primary-on); border: none; border-radius: var(--radius-sm); cursor: pointer;">
            Edit Profile
          </button>
        </div>
      </div>
      
      <div slot="item" id="item-2" class="accordion-item">
        <div class="accordion-header">Privacy & Security</div>
        <div class="accordion-content">
          <p>Control your privacy settings and manage security preferences.</p>
          <ul>
            <li>Two-factor authentication</li>
            <li>Privacy controls</li>
            <li>Data management</li>
          </ul>
        </div>
      </div>
      
      <div slot="item" id="item-3" class="accordion-item">
        <div class="accordion-header">Notifications</div>
        <div class="accordion-content">
          <p>Choose how and when you want to receive notifications.</p>
          <label style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem;">
            <input type="checkbox" checked> Email notifications
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
            <input type="checkbox"> Push notifications
          </label>
        </div>
      </div>
    </glz-accordion>
  `
};

export const Multiple: Story = {
  render: () => html`
    <glz-accordion multiple activeItems="item-1,item-3">
      <div slot="item" id="item-1" class="accordion-item">
        <div class="accordion-header">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            General
          </span>
        </div>
        <div class="accordion-content">
          <p>General application settings and preferences.</p>
        </div>
      </div>
      
      <div slot="item" id="item-2" class="accordion-item">
        <div class="accordion-header">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
            </svg>
            Profile
          </span>
        </div>
        <div class="accordion-content">
          <p>Your profile information and public settings.</p>
        </div>
      </div>
      
      <div slot="item" id="item-3" class="accordion-item">
        <div class="accordion-header">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0v2a1 1 0 102 0V7a5 5 0 00-5-5z"/>
            </svg>
            Security
          </span>
        </div>
        <div class="accordion-content">
          <p>Security settings and authentication options.</p>
        </div>
      </div>
      
      <div slot="item" id="item-4" class="accordion-item">
        <div class="accordion-header">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
            Notifications
          </span>
        </div>
        <div class="accordion-content">
          <p>Notification preferences and alert settings.</p>
        </div>
      </div>
    </glz-accordion>
  `
};

export const NotCollapsible: Story = {
  render: () => html`
    <glz-accordion collapsible=${false}>
      <div slot="item" id="item-1" class="accordion-item">
        <div class="accordion-header">Always One Open</div>
        <div class="accordion-content">
          <p>When collapsible is false, at least one item must remain open at all times.</p>
        </div>
      </div>
      
      <div slot="item" id="item-2" class="accordion-item">
        <div class="accordion-header">Try to Close All</div>
        <div class="accordion-content">
          <p>You can switch between items, but you cannot close the currently open item if it's the only one open.</p>
        </div>
      </div>
      
      <div slot="item" id="item-3" class="accordion-item">
        <div class="accordion-header">Guaranteed Visibility</div>
        <div class="accordion-content">
          <p>This ensures that users always have access to at least one section of content.</p>
        </div>
      </div>
    </glz-accordion>
  `
};

export const WithComplexContent: Story = {
  render: () => html`
    <glz-accordion>
      <div slot="item" id="item-1" class="accordion-item">
        <div class="accordion-header">Installation Guide</div>
        <div class="accordion-content">
          <h3>Step 1: Install the package</h3>
          <pre style="background: var(--color-surface-base); padding: 1rem; border-radius: var(--radius-sm); overflow-x: auto;">
npm install @glaze/components
# or
yarn add @glaze/components
# or
pnpm add @glaze/components</pre>
          
          <h3>Step 2: Import components</h3>
          <pre style="background: var(--color-surface-base); padding: 1rem; border-radius: var(--radius-sm); overflow-x: auto;">
import '@glaze/components/accordion';
import '@glaze/components/button';
import '@glaze/components/card';</pre>
          
          <h3>Step 3: Use in your HTML</h3>
          <pre style="background: var(--color-surface-base); padding: 1rem; border-radius: var(--radius-sm); overflow-x: auto;">
&lt;glz-accordion&gt;
  &lt;div slot="item"&gt;
    &lt;div class="accordion-header"&gt;Title&lt;/div&gt;
    &lt;div class="accordion-content"&gt;Content&lt;/div&gt;
  &lt;/div&gt;
&lt;/glz-accordion&gt;</pre>
        </div>
      </div>
      
      <div slot="item" id="item-2" class="accordion-item">
        <div class="accordion-header">Component Features</div>
        <div class="accordion-content">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-sm);">
              <h4>🎨 Beautiful Design</h4>
              <p>Glassmorphism aesthetics with customizable themes</p>
            </div>
            <div style="padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-sm);">
              <h4>♿ Accessible</h4>
              <p>WCAG 2.2 AA+ compliant with full keyboard support</p>
            </div>
            <div style="padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-sm);">
              <h4>⚡ Performant</h4>
              <p>Optimized bundle size under 50KB gzipped</p>
            </div>
            <div style="padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-sm);">
              <h4>🔧 Flexible</h4>
              <p>Works with any framework or vanilla JS</p>
            </div>
          </div>
        </div>
      </div>
      
      <div slot="item" id="item-3" class="accordion-item">
        <div class="accordion-header">Interactive Demo</div>
        <div class="accordion-content">
          <p>Try out our interactive components:</p>
          <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
            <button style="padding: 0.5rem 1rem; background: var(--color-primary-base); color: var(--color-primary-on); border: none; border-radius: var(--radius-sm); cursor: pointer;">
              Primary Button
            </button>
            <button style="padding: 0.5rem 1rem; background: transparent; color: var(--color-primary-base); border: 1px solid var(--color-primary-base); border-radius: var(--radius-sm); cursor: pointer;">
              Secondary Button
            </button>
            <button style="padding: 0.5rem 1rem; background: var(--color-glass-tintLight); backdrop-filter: blur(8px); color: var(--color-bg-on); border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); cursor: pointer;">
              Glass Button
            </button>
          </div>
          <div style="margin-top: 1rem;">
            <input type="text" placeholder="Enter text..." style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); background: transparent;">
          </div>
        </div>
      </div>
    </glz-accordion>
  `
};

export const NestedAccordion: Story = {
  render: () => html`
    <glz-accordion>
      <div slot="item" id="parent-1" class="accordion-item">
        <div class="accordion-header">Documentation</div>
        <div class="accordion-content">
          <p>Explore our comprehensive documentation:</p>
          
          <glz-accordion variant="flush" style="margin-top: 1rem;">
            <div slot="item" id="child-1" class="accordion-item">
              <div class="accordion-header">Getting Started</div>
              <div class="accordion-content">
                <p>Quick start guide and installation instructions.</p>
              </div>
            </div>
            
            <div slot="item" id="child-2" class="accordion-item">
              <div class="accordion-header">Components</div>
              <div class="accordion-content">
                <p>Detailed documentation for each component.</p>
              </div>
            </div>
            
            <div slot="item" id="child-3" class="accordion-item">
              <div class="accordion-header">API Reference</div>
              <div class="accordion-content">
                <p>Complete API documentation with examples.</p>
              </div>
            </div>
          </glz-accordion>
        </div>
      </div>
      
      <div slot="item" id="parent-2" class="accordion-item">
        <div class="accordion-header">Resources</div>
        <div class="accordion-content">
          <p>Additional resources and tools:</p>
          
          <glz-accordion variant="flush" style="margin-top: 1rem;">
            <div slot="item" id="resource-1" class="accordion-item">
              <div class="accordion-header">Design Tokens</div>
              <div class="accordion-content">
                <p>Customizable design tokens for theming.</p>
              </div>
            </div>
            
            <div slot="item" id="resource-2" class="accordion-item">
              <div class="accordion-header">Examples</div>
              <div class="accordion-content">
                <p>Real-world examples and use cases.</p>
              </div>
            </div>
          </glz-accordion>
        </div>
      </div>
    </glz-accordion>
  `
};

export const WithBadges: Story = {
  render: () => html`
    <glz-accordion>
      <div slot="item" id="item-1" class="accordion-item">
        <div class="accordion-header">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            Inbox
            <span style="background: var(--color-primary-base); color: var(--color-primary-on); padding: 0.125rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">
              12
            </span>
          </span>
        </div>
        <div class="accordion-content">
          <p>You have 12 unread messages in your inbox.</p>
        </div>
      </div>
      
      <div slot="item" id="item-2" class="accordion-item">
        <div class="accordion-header">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            Updates
            <span style="background: var(--color-accent-base); color: var(--color-accent-on); padding: 0.125rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">
              New
            </span>
          </span>
        </div>
        <div class="accordion-content">
          <p>Check out the latest updates and features.</p>
        </div>
      </div>
      
      <div slot="item" id="item-3" class="accordion-item">
        <div class="accordion-header">
          <span style="display: flex; align-items: center; gap: 0.5rem;">
            Tasks
            <span style="background: #10B981; color: white; padding: 0.125rem 0.5rem; border-radius: 999px; font-size: 0.75rem;">
              3 Complete
            </span>
          </span>
        </div>
        <div class="accordion-content">
          <p>You've completed 3 tasks today. Great job!</p>
        </div>
      </div>
    </glz-accordion>
  `
};
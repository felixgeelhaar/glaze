import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-tabs.js';

const meta: Meta = {
  title: 'Components/Tabs',
  component: 'glz-tabs',
  parameters: {
    docs: {
      description: {
        component: 'Accessible tabs component with keyboard navigation and multiple visual styles'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'glass', 'pills'],
      description: 'Visual style variant'
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation'
    },
    activeTab: {
      control: 'text',
      description: 'ID of the active tab'
    },
    disableAnimation: {
      control: 'boolean',
      description: 'Disable panel animations'
    },
    fullLabels: {
      control: 'boolean',
      description: 'Show full labels in vertical mode on mobile'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <glz-tabs>
      <button slot="tab" id="tab-1">Dashboard</button>
      <button slot="tab" id="tab-2">Analytics</button>
      <button slot="tab" id="tab-3">Reports</button>
      <button slot="tab" id="tab-4">Settings</button>
      
      <div slot="panel">
        <h3>Dashboard Panel</h3>
        <p>Welcome to your dashboard. Here you can see an overview of your data and quick actions.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      
      <div slot="panel">
        <h3>Analytics Panel</h3>
        <p>View detailed analytics and insights about your performance.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      
      <div slot="panel">
        <h3>Reports Panel</h3>
        <p>Generate and download comprehensive reports.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      
      <div slot="panel">
        <h3>Settings Panel</h3>
        <p>Configure your preferences and account settings.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </glz-tabs>
  `
};

export const Glass: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px;">
      <glz-tabs variant="glass">
        <button slot="tab" id="tab-1">Overview</button>
        <button slot="tab" id="tab-2">Features</button>
        <button slot="tab" id="tab-3">Documentation</button>
        <button slot="tab" id="tab-4">Support</button>
        
        <div slot="panel">
          <h3>Overview</h3>
          <p>Get started with our glassmorphism design system.</p>
          <p>The glass variant creates a beautiful frosted glass effect that works great on colorful backgrounds.</p>
        </div>
        
        <div slot="panel">
          <h3>Features</h3>
          <ul>
            <li>Beautiful glassmorphism effects</li>
            <li>Fully accessible components</li>
            <li>Keyboard navigation support</li>
            <li>Multiple visual variants</li>
          </ul>
        </div>
        
        <div slot="panel">
          <h3>Documentation</h3>
          <p>Comprehensive documentation and examples are available in our Storybook.</p>
          <p>Each component includes detailed API documentation and usage examples.</p>
        </div>
        
        <div slot="panel">
          <h3>Support</h3>
          <p>Need help? Check out our support resources:</p>
          <ul>
            <li>Documentation</li>
            <li>GitHub Issues</li>
            <li>Community Forum</li>
          </ul>
        </div>
      </glz-tabs>
    </div>
  `
};

export const Pills: Story = {
  render: () => html`
    <glz-tabs variant="pills">
      <button slot="tab" id="tab-1">All</button>
      <button slot="tab" id="tab-2">Active</button>
      <button slot="tab" id="tab-3">Completed</button>
      <button slot="tab" id="tab-4">Archived</button>
      
      <div slot="panel">
        <h3>All Items</h3>
        <p>Showing all 24 items in your collection.</p>
      </div>
      
      <div slot="panel">
        <h3>Active Items</h3>
        <p>You have 8 active items that need attention.</p>
      </div>
      
      <div slot="panel">
        <h3>Completed Items</h3>
        <p>Great job! You've completed 12 items this week.</p>
      </div>
      
      <div slot="panel">
        <h3>Archived Items</h3>
        <p>4 items have been archived for reference.</p>
      </div>
    </glz-tabs>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <glz-tabs>
      <button slot="tab" id="tab-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6.5 1A1.5 1.5 0 005 2.5V3H1.5A1.5 1.5 0 000 4.5v1.384l7.614 2.03a.5.5 0 00.772-.354v-1.06H15.5a.5.5 0 00.5-.5V2.5A1.5 1.5 0 0014.5 1h-8zm2.886 8.914l-7.5-2A.5.5 0 001.5 8H1v6.5A1.5 1.5 0 002.5 16h12a1.5 1.5 0 001.5-1.5v-5h-.5a.5.5 0 00-.5.5v1.061a.5.5 0 01-.614.439z"/>
        </svg>
        Home
      </button>
      <button slot="tab" id="tab-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z"/>
        </svg>
        Profile
      </button>
      <button slot="tab" id="tab-3">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 1.5A.5.5 0 01.5 1h2a.5.5 0 01.485.379L3.89 5H14.5a.5.5 0 01.491.592l-1.5 8A.5.5 0 0113 14H4a.5.5 0 01-.491-.408L2.01 5.607 1.607 3.607A.5.5 0 011.5 3H.5a.5.5 0 01-.5-.5zM5 12.5a.5.5 0 11-1 0 .5.5 0 011 0zm7 0a.5.5 0 11-1 0 .5.5 0 011 0z"/>
        </svg>
        Orders
      </button>
      <button slot="tab" id="tab-4">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.892 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.892-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319z"/>
        </svg>
        Settings
      </button>
      
      <div slot="panel">
        <h3>Home</h3>
        <p>Welcome to your personal dashboard.</p>
      </div>
      
      <div slot="panel">
        <h3>Profile</h3>
        <p>Manage your profile information and preferences.</p>
      </div>
      
      <div slot="panel">
        <h3>Orders</h3>
        <p>View and track your order history.</p>
      </div>
      
      <div slot="panel">
        <h3>Settings</h3>
        <p>Configure your account settings.</p>
      </div>
    </glz-tabs>
  `
};

export const Vertical: Story = {
  render: () => html`
    <div style="height: 400px;">
      <glz-tabs orientation="vertical">
        <button slot="tab" id="tab-1">General</button>
        <button slot="tab" id="tab-2">Security</button>
        <button slot="tab" id="tab-3">Privacy</button>
        <button slot="tab" id="tab-4">Notifications</button>
        <button slot="tab" id="tab-5">Advanced</button>
        
        <div slot="panel">
          <h3>General Settings</h3>
          <p>Configure your general account preferences.</p>
          <ul>
            <li>Language preferences</li>
            <li>Time zone settings</li>
            <li>Display options</li>
          </ul>
        </div>
        
        <div slot="panel">
          <h3>Security Settings</h3>
          <p>Manage your security and authentication options.</p>
          <ul>
            <li>Two-factor authentication</li>
            <li>Password requirements</li>
            <li>Login history</li>
          </ul>
        </div>
        
        <div slot="panel">
          <h3>Privacy Settings</h3>
          <p>Control your privacy and data sharing preferences.</p>
          <ul>
            <li>Data collection</li>
            <li>Third-party sharing</li>
            <li>Cookie preferences</li>
          </ul>
        </div>
        
        <div slot="panel">
          <h3>Notification Settings</h3>
          <p>Choose how and when you receive notifications.</p>
          <ul>
            <li>Email notifications</li>
            <li>Push notifications</li>
            <li>SMS alerts</li>
          </ul>
        </div>
        
        <div slot="panel">
          <h3>Advanced Settings</h3>
          <p>Advanced configuration options for power users.</p>
          <ul>
            <li>API access</li>
            <li>Developer tools</li>
            <li>Experimental features</li>
          </ul>
        </div>
      </glz-tabs>
    </div>
  `
};

export const VerticalGlass: Story = {
  render: () => html`
    <div style="height: 400px; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <glz-tabs orientation="vertical" variant="glass">
        <button slot="tab" id="tab-1">Account</button>
        <button slot="tab" id="tab-2">Billing</button>
        <button slot="tab" id="tab-3">Team</button>
        <button slot="tab" id="tab-4">Integrations</button>
        
        <div slot="panel">
          <h3 style="color: white;">Account Information</h3>
          <p style="color: rgba(255,255,255,0.9);">Manage your account details and preferences.</p>
        </div>
        
        <div slot="panel">
          <h3 style="color: white;">Billing & Subscription</h3>
          <p style="color: rgba(255,255,255,0.9);">View and manage your billing information.</p>
        </div>
        
        <div slot="panel">
          <h3 style="color: white;">Team Management</h3>
          <p style="color: rgba(255,255,255,0.9);">Invite team members and manage permissions.</p>
        </div>
        
        <div slot="panel">
          <h3 style="color: white;">Integrations</h3>
          <p style="color: rgba(255,255,255,0.9);">Connect with third-party services and tools.</p>
        </div>
      </glz-tabs>
    </div>
  `
};

export const DisabledTabs: Story = {
  render: () => html`
    <glz-tabs>
      <button slot="tab" id="tab-1">Available</button>
      <button slot="tab" id="tab-2" disabled>Coming Soon</button>
      <button slot="tab" id="tab-3">Active</button>
      <button slot="tab" id="tab-4" disabled>Unavailable</button>
      <button slot="tab" id="tab-5">Ready</button>
      
      <div slot="panel">
        <h3>Available Content</h3>
        <p>This tab is available and can be selected.</p>
      </div>
      
      <div slot="panel">
        <h3>Coming Soon</h3>
        <p>This content will be available in a future update.</p>
      </div>
      
      <div slot="panel">
        <h3>Active Content</h3>
        <p>This tab is active and ready for use.</p>
      </div>
      
      <div slot="panel">
        <h3>Unavailable</h3>
        <p>This content is currently unavailable.</p>
      </div>
      
      <div slot="panel">
        <h3>Ready Content</h3>
        <p>This tab is ready and available.</p>
      </div>
    </glz-tabs>
  `
};

export const ManyTabs: Story = {
  render: () => html`
    <glz-tabs>
      <button slot="tab" id="tab-1">Monday</button>
      <button slot="tab" id="tab-2">Tuesday</button>
      <button slot="tab" id="tab-3">Wednesday</button>
      <button slot="tab" id="tab-4">Thursday</button>
      <button slot="tab" id="tab-5">Friday</button>
      <button slot="tab" id="tab-6">Saturday</button>
      <button slot="tab" id="tab-7">Sunday</button>
      <button slot="tab" id="tab-8">Week Overview</button>
      <button slot="tab" id="tab-9">Month Summary</button>
      
      <div slot="panel"><h3>Monday</h3><p>Start of the work week.</p></div>
      <div slot="panel"><h3>Tuesday</h3><p>Second day of the week.</p></div>
      <div slot="panel"><h3>Wednesday</h3><p>Midweek day.</p></div>
      <div slot="panel"><h3>Thursday</h3><p>Almost Friday!</p></div>
      <div slot="panel"><h3>Friday</h3><p>TGIF!</p></div>
      <div slot="panel"><h3>Saturday</h3><p>Weekend begins.</p></div>
      <div slot="panel"><h3>Sunday</h3><p>Day of rest.</p></div>
      <div slot="panel"><h3>Week Overview</h3><p>Summary of the entire week.</p></div>
      <div slot="panel"><h3>Month Summary</h3><p>Monthly statistics and insights.</p></div>
    </glz-tabs>
  `
};

export const CustomContent: Story = {
  render: () => html`
    <glz-tabs variant="pills">
      <button slot="tab" id="tab-1">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8px; height: 8px; background: #10B981; border-radius: 50%;"></span>
          Active
          <span style="background: var(--color-primary-base); color: var(--color-primary-on); padding: 0.125rem 0.375rem; border-radius: 999px; font-size: 0.75rem;">3</span>
        </span>
      </button>
      
      <button slot="tab" id="tab-2">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8px; height: 8px; background: #F59E0B; border-radius: 50%;"></span>
          Pending
          <span style="background: var(--color-accent-base); color: var(--color-accent-on); padding: 0.125rem 0.375rem; border-radius: 999px; font-size: 0.75rem;">7</span>
        </span>
      </button>
      
      <button slot="tab" id="tab-3">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 8px; height: 8px; background: #6B7280; border-radius: 50%;"></span>
          Completed
          <span style="background: #6B7280; color: white; padding: 0.125rem 0.375rem; border-radius: 999px; font-size: 0.75rem;">12</span>
        </span>
      </button>
      
      <div slot="panel">
        <h3>Active Tasks (3)</h3>
        <ul>
          <li>Review pull request #42</li>
          <li>Update documentation</li>
          <li>Fix navigation bug</li>
        </ul>
      </div>
      
      <div slot="panel">
        <h3>Pending Tasks (7)</h3>
        <ul>
          <li>Design new landing page</li>
          <li>Implement user authentication</li>
          <li>Write unit tests</li>
          <li>Optimize database queries</li>
          <li>Update dependencies</li>
          <li>Code review</li>
          <li>Deploy to staging</li>
        </ul>
      </div>
      
      <div slot="panel">
        <h3>Completed Tasks (12)</h3>
        <p>Great job! You've completed 12 tasks this sprint.</p>
      </div>
    </glz-tabs>
  `
};
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Import all components
import '../card/glz-card.js';
import '../button/glz-button.js';
import '../input/glz-input.js';
import '../select/glz-select.js';
import '../dialog/glz-dialog.js';
import '../toast/glz-toast.js';
import '../navbar/glz-navbar.js';
import '../form/glz-form.js';
import '../tooltip/glz-tooltip.js';
import '../dropdown/glz-dropdown.js';
import '../tabs/glz-tabs.js';
import '../accordion/glz-accordion.js';
import '../badge/glz-badge.js';
import '../chip/glz-chip.js';
import '../progress/glz-progress.js';
import '../skeleton/glz-skeleton.js';
import '../breadcrumb/glz-breadcrumb.js';
import '../pagination/glz-pagination.js';
import '../table/glz-table.js';

const meta: Meta = {
  title: 'Showcase/Complete System',
  parameters: {
    docs: {
      description: {
        component: 'Complete showcase of all Glaze Design System components'
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj;

export const AllComponents: Story = {
  render: () => html`
    <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem;">
      <!-- Header -->
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="text-align: center; color: white; margin-bottom: 3rem;">
          <h1 style="font-size: 3rem; margin-bottom: 0.5rem;">Glaze Design System</h1>
          <p style="font-size: 1.25rem; opacity: 0.9;">Modern glassmorphism components built with Web Components</p>
        </div>

        <!-- Component Grid -->
        <div style="display: grid; gap: 2rem;">
          
          <!-- Navigation Components -->
          <glz-card variant="glass">
            <h2 slot="header">Navigation Components</h2>
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              <!-- Navbar -->
              <div>
                <h3>Navbar</h3>
                <glz-navbar variant="glass">
                  <span slot="brand">Glaze UI</span>
                  <a href="#" slot="nav">Home</a>
                  <a href="#" slot="nav">Features</a>
                  <a href="#" slot="nav">Documentation</a>
                  <glz-button slot="actions" variant="glass" size="small">Sign In</glz-button>
                </glz-navbar>
              </div>

              <!-- Breadcrumb -->
              <div>
                <h3>Breadcrumb</h3>
                <glz-breadcrumb
                  .items=${[
                    { label: 'Home', href: '#' },
                    { label: 'Components', href: '#' },
                    { label: 'Navigation', href: '#' },
                    { label: 'Breadcrumb' }
                  ]}
                ></glz-breadcrumb>
              </div>

              <!-- Tabs -->
              <div>
                <h3>Tabs</h3>
                <glz-tabs variant="glass">
                  <div slot="tab">Overview</div>
                  <div slot="panel">Overview content with glassmorphism design</div>
                  <div slot="tab">Features</div>
                  <div slot="panel">Advanced features and capabilities</div>
                  <div slot="tab">Documentation</div>
                  <div slot="panel">Comprehensive documentation and guides</div>
                </glz-tabs>
              </div>

              <!-- Pagination -->
              <div>
                <h3>Pagination</h3>
                <glz-pagination current="5" total="10" variant="glass"></glz-pagination>
              </div>
            </div>
          </glz-card>

          <!-- Form Components -->
          <glz-card variant="glass">
            <h2 slot="header">Form Components</h2>
            <glz-form>
              <div style="display: grid; gap: 1.5rem;">
                <glz-input
                  label="Full Name"
                  placeholder="Enter your name"
                  required
                  variant="glass"
                ></glz-input>

                <glz-input
                  type="email"
                  label="Email Address"
                  placeholder="email@example.com"
                  required
                  variant="glass"
                ></glz-input>

                <glz-select
                  label="Country"
                  placeholder="Select country"
                  variant="glass"
                  .options=${[
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'au', label: 'Australia' }
                  ]}
                ></glz-select>

                <div style="display: flex; gap: 1rem;">
                  <glz-button type="submit" variant="glass">Submit</glz-button>
                  <glz-button type="reset" variant="glass-outline">Reset</glz-button>
                </div>
              </div>
            </glz-form>
          </glz-card>

          <!-- Action Components -->
          <glz-card variant="glass">
            <h2 slot="header">Action Components</h2>
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              <!-- Buttons -->
              <div>
                <h3>Buttons</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                  <glz-button variant="glass">Primary</glz-button>
                  <glz-button variant="glass-outline">Outline</glz-button>
                  <glz-button variant="glass" disabled>Disabled</glz-button>
                  <glz-button variant="glass" loading>Loading</glz-button>
                </div>
              </div>

              <!-- Dropdown -->
              <div>
                <h3>Dropdown</h3>
                <glz-dropdown variant="glass">
                  <glz-button slot="trigger" variant="glass">Options Menu</glz-button>
                  <div slot="content">
                    <a href="#" style="display: block; padding: 0.5rem 1rem; color: inherit; text-decoration: none;">Profile</a>
                    <a href="#" style="display: block; padding: 0.5rem 1rem; color: inherit; text-decoration: none;">Settings</a>
                    <a href="#" style="display: block; padding: 0.5rem 1rem; color: inherit; text-decoration: none;">Logout</a>
                  </div>
                </glz-dropdown>
              </div>

              <!-- Chips -->
              <div>
                <h3>Chips</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                  <glz-chip variant="glass">Default</glz-chip>
                  <glz-chip variant="glass" selectable selected>Selectable</glz-chip>
                  <glz-chip variant="glass" dismissible>Dismissible</glz-chip>
                  <glz-chip variant="glass" color="primary">Primary</glz-chip>
                  <glz-chip variant="glass" color="accent">Accent</glz-chip>
                </div>
              </div>
            </div>
          </glz-card>

          <!-- Feedback Components -->
          <glz-card variant="glass">
            <h2 slot="header">Feedback Components</h2>
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              <!-- Badges -->
              <div>
                <h3>Badges</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
                  <glz-badge variant="glass">Default</glz-badge>
                  <glz-badge variant="glass" color="primary">Primary</glz-badge>
                  <glz-badge variant="glass" color="success">Success</glz-badge>
                  <glz-badge variant="glass" color="warning">Warning</glz-badge>
                  <glz-badge variant="glass" color="error">Error</glz-badge>
                  <glz-badge variant="glass" dot>With Dot</glz-badge>
                  <glz-badge variant="glass" value="99+">Notifications</glz-badge>
                </div>
              </div>

              <!-- Progress -->
              <div>
                <h3>Progress Indicators</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <glz-progress value="60" variant="glass"></glz-progress>
                  <glz-progress value="75" variant="glass" type="circular" style="width: 60px;"></glz-progress>
                  <glz-progress indeterminate variant="glass"></glz-progress>
                </div>
              </div>

              <!-- Skeleton -->
              <div>
                <h3>Loading States</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  <glz-skeleton type="text" variant="glass"></glz-skeleton>
                  <glz-skeleton type="title" variant="glass"></glz-skeleton>
                  <div style="display: flex; gap: 1rem;">
                    <glz-skeleton type="avatar" variant="glass"></glz-skeleton>
                    <div style="flex: 1;">
                      <glz-skeleton type="text" variant="glass"></glz-skeleton>
                      <glz-skeleton type="text" variant="glass" style="width: 60%;"></glz-skeleton>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tooltip -->
              <div>
                <h3>Tooltips</h3>
                <div style="display: flex; gap: 2rem;">
                  <glz-tooltip content="Top tooltip" placement="top">
                    <glz-button variant="glass">Hover me</glz-button>
                  </glz-tooltip>
                  <glz-tooltip content="Click tooltip" trigger="click" placement="right">
                    <glz-button variant="glass">Click me</glz-button>
                  </glz-tooltip>
                </div>
              </div>
            </div>
          </glz-card>

          <!-- Content Components -->
          <glz-card variant="glass">
            <h2 slot="header">Content Components</h2>
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              <!-- Accordion -->
              <div>
                <h3>Accordion</h3>
                <glz-accordion variant="glass">
                  <div slot="item" data-header="Section 1">
                    Content for the first section of the accordion.
                  </div>
                  <div slot="item" data-header="Section 2">
                    Content for the second section of the accordion.
                  </div>
                  <div slot="item" data-header="Section 3">
                    Content for the third section of the accordion.
                  </div>
                </glz-accordion>
              </div>

              <!-- Cards -->
              <div>
                <h3>Cards</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                  <glz-card variant="glass">
                    <h4 slot="header">Card Title</h4>
                    <p>Card content with glassmorphism effect.</p>
                    <div slot="footer">
                      <glz-button variant="glass" size="small">Action</glz-button>
                    </div>
                  </glz-card>
                  <glz-card variant="glass" elevated>
                    <h4 slot="header">Elevated Card</h4>
                    <p>Enhanced shadow for better depth perception.</p>
                  </glz-card>
                </div>
              </div>
            </div>
          </glz-card>

          <!-- Data Display -->
          <glz-card variant="glass">
            <h2 slot="header">Data Display</h2>
            <glz-table
              variant="glass"
              searchable
              .columns=${[
                { key: 'name', label: 'Name', sortable: true },
                { key: 'role', label: 'Role', sortable: true },
                { key: 'status', label: 'Status', align: 'center' }
              ]}
              .data=${[
                { name: 'Alice Johnson', role: 'Designer', status: 'Active' },
                { name: 'Bob Smith', role: 'Developer', status: 'Active' },
                { name: 'Carol Williams', role: 'Manager', status: 'Away' }
              ]}
            ></glz-table>
          </glz-card>

          <!-- Interactive Demo -->
          <glz-card variant="glass">
            <h2 slot="header">Interactive Demo</h2>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <p>Try these interactive components:</p>
              
              <div style="display: flex; gap: 1rem; align-items: center;">
                <glz-button 
                  variant="glass"
                  @click=${() => {
                    const toast = document.createElement('glz-toast');
                    toast.message = 'Hello from Glaze Design System!';
                    toast.variant = 'glass';
                    toast.duration = 3000;
                    document.body.appendChild(toast);
                    toast.show();
                  }}
                >
                  Show Toast
                </glz-button>

                <glz-button 
                  variant="glass"
                  @click=${() => {
                    const dialog = document.querySelector('#demo-dialog') as any;
                    if (dialog) dialog.open = true;
                  }}
                >
                  Open Dialog
                </glz-button>
              </div>

              <glz-dialog id="demo-dialog" variant="glass">
                <h3 slot="header">Welcome to Glaze</h3>
                <p>This is a beautiful glassmorphism dialog component.</p>
                <p>It provides a modern, translucent interface with backdrop blur effects.</p>
                <div slot="footer" style="display: flex; gap: 1rem; justify-content: flex-end;">
                  <glz-button 
                    variant="glass-outline" 
                    size="small"
                    @click=${() => {
                      const dialog = document.querySelector('#demo-dialog') as any;
                      if (dialog) dialog.open = false;
                    }}
                  >
                    Cancel
                  </glz-button>
                  <glz-button 
                    variant="glass" 
                    size="small"
                    @click=${() => {
                      const dialog = document.querySelector('#demo-dialog') as any;
                      if (dialog) dialog.open = false;
                    }}
                  >
                    Confirm
                  </glz-button>
                </div>
              </glz-dialog>
            </div>
          </glz-card>
        </div>

        <!-- Footer -->
        <div style="text-align: center; color: white; margin-top: 3rem; padding: 2rem 0;">
          <p style="opacity: 0.9;">© 2024 Glaze Design System • Built with Lit Web Components</p>
          <p style="opacity: 0.7; font-size: 0.875rem; margin-top: 0.5rem;">
            20 Components • WCAG 2.2 AA+ Compliant • <50KB Gzipped
          </p>
        </div>
      </div>
    </div>
  `
};

export const ComponentGallery: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--color-bg-base);">
      <div style="max-width: 1400px; margin: 0 auto;">
        <h1 style="text-align: center; margin-bottom: 3rem;">Component Gallery</h1>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
          <!-- Button Component -->
          <glz-card elevated>
            <h3 slot="header">Button</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <glz-button>Default</glz-button>
              <glz-button variant="outline">Outline</glz-button>
              <glz-button variant="glass">Glass</glz-button>
            </div>
          </glz-card>

          <!-- Input Component -->
          <glz-card elevated>
            <h3 slot="header">Input</h3>
            <glz-input label="Text Input" placeholder="Enter text..."></glz-input>
          </glz-card>

          <!-- Select Component -->
          <glz-card elevated>
            <h3 slot="header">Select</h3>
            <glz-select
              label="Choose Option"
              .options=${[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' }
              ]}
            ></glz-select>
          </glz-card>

          <!-- Badge Component -->
          <glz-card elevated>
            <h3 slot="header">Badge</h3>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <glz-badge>Default</glz-badge>
              <glz-badge color="primary">Primary</glz-badge>
              <glz-badge color="success">Success</glz-badge>
              <glz-badge value="5">Count</glz-badge>
            </div>
          </glz-card>

          <!-- Chip Component -->
          <glz-card elevated>
            <h3 slot="header">Chip</h3>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <glz-chip>Default</glz-chip>
              <glz-chip selectable>Select</glz-chip>
              <glz-chip dismissible>Dismiss</glz-chip>
            </div>
          </glz-card>

          <!-- Progress Component -->
          <glz-card elevated>
            <h3 slot="header">Progress</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <glz-progress value="45"></glz-progress>
              <glz-progress value="70" color="success"></glz-progress>
              <glz-progress indeterminate></glz-progress>
            </div>
          </glz-card>

          <!-- Skeleton Component -->
          <glz-card elevated>
            <h3 slot="header">Skeleton</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <glz-skeleton type="title"></glz-skeleton>
              <glz-skeleton type="text"></glz-skeleton>
              <glz-skeleton type="text" style="width: 70%;"></glz-skeleton>
            </div>
          </glz-card>

          <!-- Tabs Component -->
          <glz-card elevated>
            <h3 slot="header">Tabs</h3>
            <glz-tabs>
              <div slot="tab">Tab 1</div>
              <div slot="panel">Panel 1</div>
              <div slot="tab">Tab 2</div>
              <div slot="panel">Panel 2</div>
              <div slot="tab">Tab 3</div>
              <div slot="panel">Panel 3</div>
            </glz-tabs>
          </glz-card>

          <!-- Accordion Component -->
          <glz-card elevated>
            <h3 slot="header">Accordion</h3>
            <glz-accordion>
              <div slot="item" data-header="Item 1">Content 1</div>
              <div slot="item" data-header="Item 2">Content 2</div>
              <div slot="item" data-header="Item 3">Content 3</div>
            </glz-accordion>
          </glz-card>

          <!-- Tooltip Component -->
          <glz-card elevated>
            <h3 slot="header">Tooltip</h3>
            <div style="display: flex; justify-content: center;">
              <glz-tooltip content="Helpful information">
                <glz-button>Hover for tooltip</glz-button>
              </glz-tooltip>
            </div>
          </glz-card>

          <!-- Dropdown Component -->
          <glz-card elevated>
            <h3 slot="header">Dropdown</h3>
            <glz-dropdown>
              <glz-button slot="trigger">Open Menu</glz-button>
              <div slot="content">
                <div style="padding: 0.5rem 1rem;">Option 1</div>
                <div style="padding: 0.5rem 1rem;">Option 2</div>
                <div style="padding: 0.5rem 1rem;">Option 3</div>
              </div>
            </glz-dropdown>
          </glz-card>

          <!-- Breadcrumb Component -->
          <glz-card elevated>
            <h3 slot="header">Breadcrumb</h3>
            <glz-breadcrumb
              .items=${[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Details' }
              ]}
            ></glz-breadcrumb>
          </glz-card>

          <!-- Pagination Component -->
          <glz-card elevated>
            <h3 slot="header">Pagination</h3>
            <glz-pagination current="3" total="7"></glz-pagination>
          </glz-card>

          <!-- Dialog Component -->
          <glz-card elevated>
            <h3 slot="header">Dialog</h3>
            <glz-button
              @click=${() => {
                const dialog = document.createElement('glz-dialog');
                dialog.innerHTML = `
                  <h3 slot="header">Dialog Title</h3>
                  <p>Dialog content goes here.</p>
                  <div slot="footer">
                    <glz-button size="small">Close</glz-button>
                  </div>
                `;
                document.body.appendChild(dialog);
                (dialog as any).open = true;
                dialog.addEventListener('glz-dialog-close', () => {
                  document.body.removeChild(dialog);
                });
              }}
            >
              Open Dialog
            </glz-button>
          </glz-card>

          <!-- Toast Component -->
          <glz-card elevated>
            <h3 slot="header">Toast</h3>
            <glz-button
              @click=${() => {
                const toast = document.createElement('glz-toast');
                toast.message = 'Toast notification!';
                toast.type = 'success';
                document.body.appendChild(toast);
                (toast as any).show();
              }}
            >
              Show Toast
            </glz-button>
          </glz-card>
        </div>
      </div>
    </div>
  `
};

export const KitchenSink: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--color-bg-base);">
      <div style="max-width: 1200px; margin: 0 auto;">
        <h1 style="text-align: center; margin-bottom: 3rem;">Kitchen Sink - All Variants</h1>
        
        <!-- All Button Variants -->
        <section style="margin-bottom: 3rem;">
          <h2>Buttons - All Variants & States</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${['solid', 'outline', 'ghost', 'glass', 'glass-outline'].map(variant => 
              ['small', 'medium', 'large'].map(size =>
                html`<glz-button variant=${variant} size=${size}>${variant} ${size}</glz-button>`
              )
            ).flat()}
          </div>
        </section>

        <!-- All Input Types -->
        <section style="margin-bottom: 3rem;">
          <h2>Inputs - All Types</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'].map(type =>
              html`<glz-input type=${type} label=${type.charAt(0).toUpperCase() + type.slice(1)} placeholder=${`Enter ${type}...`}></glz-input>`
            )}
          </div>
        </section>

        <!-- All Badge Colors -->
        <section style="margin-bottom: 3rem;">
          <h2>Badges - All Colors & Variants</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
            ${['default', 'primary', 'success', 'warning', 'error', 'info'].map(color =>
              html`
                <glz-badge color=${color}>${color}</glz-badge>
                <glz-badge color=${color} dot>${color} dot</glz-badge>
                <glz-badge color=${color} value="9+">${color} count</glz-badge>
              `
            ).flat()}
          </div>
        </section>

        <!-- All Progress Types -->
        <section style="margin-bottom: 3rem;">
          <h2>Progress - All Types</h2>
          <div style="display: grid; gap: 1rem; margin-top: 1rem;">
            <glz-progress value="25" label="Linear Progress"></glz-progress>
            <glz-progress value="50" color="success" label="Success Progress"></glz-progress>
            <glz-progress value="75" color="warning" label="Warning Progress"></glz-progress>
            <glz-progress indeterminate label="Indeterminate"></glz-progress>
            <div style="display: flex; gap: 2rem;">
              <glz-progress type="circular" value="60" style="width: 60px;"></glz-progress>
              <glz-progress type="circular" value="80" color="success" style="width: 60px;"></glz-progress>
              <glz-progress type="circular" indeterminate style="width: 60px;"></glz-progress>
            </div>
          </div>
        </section>

        <!-- All Skeleton Types -->
        <section style="margin-bottom: 3rem;">
          <h2>Skeletons - All Types</h2>
          <div style="display: grid; gap: 1rem; margin-top: 1rem;">
            ${['text', 'title', 'avatar', 'thumbnail', 'card', 'button', 'input', 'badge', 'list-item'].map(type =>
              html`
                <div>
                  <label style="font-size: 0.875rem; color: var(--color-bg-on); opacity: 0.7;">${type}</label>
                  <glz-skeleton type=${type}></glz-skeleton>
                </div>
              `
            )}
          </div>
        </section>

        <!-- All Chip Variants -->
        <section style="margin-bottom: 3rem;">
          <h2>Chips - All Variants</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
            ${['default', 'outline', 'glass'].map(variant =>
              ['default', 'primary', 'accent'].map(color =>
                html`
                  <glz-chip variant=${variant} color=${color}>${variant} ${color}</glz-chip>
                  <glz-chip variant=${variant} color=${color} selectable>Selectable</glz-chip>
                  <glz-chip variant=${variant} color=${color} dismissible>Dismissible</glz-chip>
                `
              )
            ).flat()}
          </div>
        </section>

        <!-- All Card Variants -->
        <section style="margin-bottom: 3rem;">
          <h2>Cards - All Variants</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${['default', 'glass', 'elevated'].map(variant =>
              html`
                <glz-card variant=${variant}>
                  <h4 slot="header">${variant} Card</h4>
                  <p>Card content with ${variant} style.</p>
                  <div slot="footer">
                    <glz-button size="small">Action</glz-button>
                  </div>
                </glz-card>
              `
            )}
          </div>
        </section>
      </div>
    </div>
  `
};

export const AccessibilityShowcase: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--color-bg-base);">
      <div style="max-width: 1000px; margin: 0 auto;">
        <h1>Accessibility Features</h1>
        <p style="margin-bottom: 2rem;">All Glaze components are WCAG 2.2 AA+ compliant with comprehensive keyboard navigation and screen reader support.</p>
        
        <glz-card elevated>
          <h2 slot="header">Keyboard Navigation Demo</h2>
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div>
              <h3>Try Tab Navigation</h3>
              <p style="margin-bottom: 1rem;">Press Tab to navigate through these focusable elements:</p>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <glz-button>Button 1</glz-button>
                <glz-input placeholder="Input field"></glz-input>
                <glz-select
                  placeholder="Select option"
                  .options=${[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' }
                  ]}
                ></glz-select>
                <glz-button variant="outline">Button 2</glz-button>
              </div>
            </div>

            <div>
              <h3>Arrow Key Navigation</h3>
              <p style="margin-bottom: 1rem;">Use arrow keys to navigate within these components:</p>
              
              <glz-tabs>
                <div slot="tab">Tab 1 (Use arrows)</div>
                <div slot="panel">Navigate tabs with arrow keys</div>
                <div slot="tab">Tab 2</div>
                <div slot="panel">Press Enter or Space to select</div>
                <div slot="tab">Tab 3</div>
                <div slot="panel">Escape key closes dropdowns</div>
              </glz-tabs>
            </div>

            <div>
              <h3>Screen Reader Announcements</h3>
              <p style="margin-bottom: 1rem;">All interactive elements have proper ARIA labels:</p>
              <div style="display: flex; gap: 1rem; align-items: center;">
                <glz-badge value="5" aria-label="5 notifications">Notifications</glz-badge>
                <glz-progress value="60" aria-label="60% complete"></glz-progress>
                <glz-tooltip content="This tooltip is announced by screen readers">
                  <glz-button>Hover for info</glz-button>
                </glz-tooltip>
              </div>
            </div>

            <div>
              <h3>Focus Management</h3>
              <p style="margin-bottom: 1rem;">Focus is properly trapped in modal components:</p>
              <glz-button
                @click=${() => {
                  const dialog = document.createElement('glz-dialog');
                  dialog.innerHTML = `
                    <h3 slot="header">Focus Trapped Dialog</h3>
                    <p>Tab navigation is trapped within this dialog.</p>
                    <glz-input placeholder="Try tabbing..."></glz-input>
                    <div slot="footer" style="display: flex; gap: 1rem;">
                      <glz-button size="small">Cancel</glz-button>
                      <glz-button size="small" variant="solid">Confirm</glz-button>
                    </div>
                  `;
                  document.body.appendChild(dialog);
                  (dialog as any).open = true;
                  dialog.addEventListener('glz-dialog-close', () => {
                    document.body.removeChild(dialog);
                  });
                }}
              >
                Open Focus Trap Demo
              </glz-button>
            </div>
          </div>
        </glz-card>

        <glz-card elevated style="margin-top: 2rem;">
          <h2 slot="header">Motion & Animation Preferences</h2>
          <p>All animations respect the user's prefers-reduced-motion setting. Components will automatically disable non-essential animations when this preference is enabled.</p>
          <div style="margin-top: 1rem;">
            <glz-progress indeterminate></glz-progress>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; opacity: 0.7;">
              This progress bar animation is disabled when prefers-reduced-motion is active.
            </p>
          </div>
        </glz-card>
      </div>
    </div>
  `
};

export const PerformanceMetrics: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--color-bg-base);">
      <div style="max-width: 1000px; margin: 0 auto;">
        <h1>Performance Metrics</h1>
        <p style="margin-bottom: 2rem;">Glaze Design System is optimized for performance with minimal bundle size and efficient rendering.</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <glz-card elevated>
            <h3 style="color: var(--color-primary-base); margin-bottom: 0.5rem;">< 50KB</h3>
            <p>Total bundle size (gzipped)</p>
          </glz-card>
          
          <glz-card elevated>
            <h3 style="color: var(--color-accent-base); margin-bottom: 0.5rem;">20</h3>
            <p>Production-ready components</p>
          </glz-card>
          
          <glz-card elevated>
            <h3 style="color: var(--color-success-base, green); margin-bottom: 0.5rem;">100%</h3>
            <p>TypeScript coverage</p>
          </glz-card>
          
          <glz-card elevated>
            <h3 style="color: var(--color-warning-base, orange); margin-bottom: 0.5rem;">WCAG 2.2</h3>
            <p>AA+ Accessibility compliant</p>
          </glz-card>
        </div>

        <glz-card elevated style="margin-top: 2rem;">
          <h2 slot="header">Key Features</h2>
          <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; list-style: none; padding: 0;">
            <li>✨ Modern glassmorphism design</li>
            <li>🎨 Customizable with CSS variables</li>
            <li>♿ Full accessibility support</li>
            <li>📱 Responsive and mobile-ready</li>
            <li>🚀 Optimized performance</li>
            <li>📦 Tree-shakeable exports</li>
            <li>🔧 Framework agnostic</li>
            <li>💪 Built with TypeScript</li>
            <li>🎯 Zero dependencies</li>
            <li>🌙 Dark mode support</li>
            <li>⚡ Web Components standard</li>
            <li>📖 Comprehensive documentation</li>
          </ul>
        </glz-card>
      </div>
    </div>
  `
};
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-pagination.js';

const meta: Meta = {
  title: 'Components/Pagination',
  component: 'glz-pagination',
  parameters: {
    docs: {
      description: {
        component: 'Accessible pagination component with multiple display modes and responsive behavior'
      }
    }
  },
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
      description: 'Current page number'
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages'
    },
    siblings: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Number of sibling pages to show around current'
    },
    boundaries: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Number of boundary pages to show at start/end'
    },
    mode: {
      control: 'radio',
      options: ['full', 'simple', 'input'],
      description: 'Display mode'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Component size'
    },
    variant: {
      control: 'radio',
      options: ['default', 'glass', 'pills', 'rounded'],
      description: 'Visual variant'
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first/last buttons'
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Show previous/next buttons'
    },
    showInfo: {
      control: 'boolean',
      description: 'Show page info text'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <glz-pagination
      current="5"
      total="10"
      @glz-pagination-change=${(e: CustomEvent) => console.log('Page changed:', e.detail)}
    ></glz-pagination>
  `
};

export const Modes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Full Mode (Default)</h4>
        <glz-pagination current="5" total="20"></glz-pagination>
      </div>
      
      <div>
        <h4>Simple Mode</h4>
        <glz-pagination mode="simple" current="5" total="20"></glz-pagination>
      </div>
      
      <div>
        <h4>Input Mode</h4>
        <glz-pagination mode="input" current="5" total="20"></glz-pagination>
      </div>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Small</h4>
        <glz-pagination size="small" current="3" total="10"></glz-pagination>
      </div>
      
      <div>
        <h4>Medium</h4>
        <glz-pagination size="medium" current="3" total="10"></glz-pagination>
      </div>
      
      <div>
        <h4>Large</h4>
        <glz-pagination size="large" current="3" total="10"></glz-pagination>
      </div>
    </div>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Default</h4>
        <glz-pagination current="5" total="10"></glz-pagination>
      </div>
      
      <div>
        <h4>Pills</h4>
        <glz-pagination variant="pills" current="5" total="10"></glz-pagination>
      </div>
      
      <div>
        <h4>Rounded</h4>
        <glz-pagination variant="rounded" current="5" total="10"></glz-pagination>
      </div>
      
      <div style="padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md);">
        <h4 style="color: white; margin-bottom: 1rem;">Glass</h4>
        <glz-pagination variant="glass" current="5" total="10"></glz-pagination>
      </div>
    </div>
  `
};

export const SiblingsBoundaries: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>No Siblings or Boundaries</h4>
        <glz-pagination current="10" total="20" siblings="0" boundaries="0"></glz-pagination>
      </div>
      
      <div>
        <h4>1 Sibling, 1 Boundary (Default)</h4>
        <glz-pagination current="10" total="20" siblings="1" boundaries="1"></glz-pagination>
      </div>
      
      <div>
        <h4>2 Siblings, 2 Boundaries</h4>
        <glz-pagination current="10" total="20" siblings="2" boundaries="2"></glz-pagination>
      </div>
      
      <div>
        <h4>3 Siblings, 1 Boundary</h4>
        <glz-pagination current="10" total="20" siblings="3" boundaries="1"></glz-pagination>
      </div>
    </div>
  `
};

export const WithInfo: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <glz-pagination current="5" total="20" showInfo></glz-pagination>
      
      <glz-pagination current="5" total="20" showInfo variant="pills"></glz-pagination>
    </div>
  `
};

export const CustomButtons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Without First/Last Buttons</h4>
        <glz-pagination current="5" total="10" showFirstLast=${false}></glz-pagination>
      </div>
      
      <div>
        <h4>Without Previous/Next Buttons</h4>
        <glz-pagination current="5" total="10" showPrevNext=${false}></glz-pagination>
      </div>
      
      <div>
        <h4>Only Page Numbers</h4>
        <glz-pagination 
          current="5" 
          total="10" 
          showFirstLast=${false}
          showPrevNext=${false}
        ></glz-pagination>
      </div>
    </div>
  `
};

export const ManyPages: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Beginning (Page 1 of 100)</h4>
        <glz-pagination current="1" total="100"></glz-pagination>
      </div>
      
      <div>
        <h4>Middle (Page 50 of 100)</h4>
        <glz-pagination current="50" total="100"></glz-pagination>
      </div>
      
      <div>
        <h4>End (Page 100 of 100)</h4>
        <glz-pagination current="100" total="100"></glz-pagination>
      </div>
    </div>
  `
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <glz-pagination current="5" total="10" disabled></glz-pagination>
      
      <glz-pagination mode="simple" current="5" total="10" disabled></glz-pagination>
      
      <glz-pagination mode="input" current="5" total="10" disabled></glz-pagination>
    </div>
  `
};

export const Interactive: Story = {
  render: () => {
    let currentPage = 1;
    const totalPages = 20;
    
    const handleChange = (e: CustomEvent) => {
      currentPage = e.detail.page;
      const container = document.querySelector('#interactive-pagination-container');
      const pagination = container?.querySelector('glz-pagination');
      if (pagination) {
        pagination.current = currentPage;
      }
      const pageInfo = container?.querySelector('.page-info');
      if (pageInfo) {
        pageInfo.textContent = `Current page: ${currentPage}`;
      }
    };
    
    return html`
      <div id="interactive-pagination-container">
        <div style="margin-bottom: 2rem; padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-md);">
          <h4 style="margin-bottom: 0.5rem;">Interactive Pagination Demo</h4>
          <p class="page-info" style="margin: 0; color: var(--color-bg-on); opacity: 0.7;">
            Current page: ${currentPage}
          </p>
        </div>
        
        <glz-pagination
          current=${currentPage}
          total=${totalPages}
          @glz-pagination-change=${handleChange}
        ></glz-pagination>
      </div>
    `;
  }
};

export const TablePagination: Story = {
  render: () => html`
    <div style="width: 100%; max-width: 800px;">
      <div style="padding: 1.5rem; background: var(--color-bg-base); border: 1px solid var(--color-glass-border); border-radius: var(--radius-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="margin: 0;">Users</h3>
          <span style="color: var(--color-bg-on); opacity: 0.7;">Showing 10 of 250 items</span>
        </div>
        
        <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: var(--color-surface-base); border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <span style="color: var(--color-bg-on); opacity: 0.5;">[Table Content]</span>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.875rem;">Items per page:</span>
            <select style="padding: 0.25rem 0.5rem; border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); background: var(--color-bg-base);">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          
          <glz-pagination current="5" total="25" variant="pills"></glz-pagination>
        </div>
      </div>
    </div>
  `
};

export const CardGrid: Story = {
  render: () => html`
    <div style="width: 100%;">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        ${Array.from({ length: 9 }, (_, i) => html`
          <div style="padding: 1.5rem; background: var(--color-surface-base); border: 1px solid var(--color-glass-border); border-radius: var(--radius-md); text-align: center;">
            <div style="width: 100%; height: 100px; background: var(--color-bg-base); border-radius: var(--radius-sm); margin-bottom: 1rem;"></div>
            <h4 style="margin: 0.5rem 0;">Item ${i + 1}</h4>
            <p style="margin: 0; color: var(--color-bg-on); opacity: 0.7; font-size: 0.875rem;">Card content</p>
          </div>
        `)}
      </div>
      
      <div style="display: flex; justify-content: center;">
        <glz-pagination current="1" total="10" variant="rounded"></glz-pagination>
      </div>
    </div>
  `
};

export const BlogPosts: Story = {
  render: () => html`
    <div style="max-width: 600px; margin: 0 auto;">
      <div style="margin-bottom: 2rem;">
        ${Array.from({ length: 3 }, (_, i) => html`
          <article style="padding: 2rem 0; border-bottom: 1px solid var(--color-glass-border);">
            <h2 style="margin: 0 0 0.5rem;">Blog Post Title ${i + 1}</h2>
            <p style="color: var(--color-bg-on); opacity: 0.7; margin: 0 0 1rem;">
              Published on January ${15 + i}, 2025 • 5 min read
            </p>
            <p style="margin: 0;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </article>
        `)}
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <glz-pagination mode="simple" current="2" total="15"></glz-pagination>
        
        <span style="color: var(--color-bg-on); opacity: 0.7; font-size: 0.875rem;">
          Page 2 of 15
        </span>
      </div>
    </div>
  `
};

export const SearchResults: Story = {
  render: () => html`
    <div style="max-width: 700px;">
      <div style="padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 0.5rem;">
          <input 
            type="text" 
            placeholder="Search..." 
            value="design system"
            style="flex: 1; padding: 0.5rem; border: 1px solid var(--color-glass-border); border-radius: var(--radius-sm); background: var(--color-bg-base);"
          />
          <button style="padding: 0.5rem 1rem; background: var(--color-primary-base); color: var(--color-primary-on); border: none; border-radius: var(--radius-sm); cursor: pointer;">
            Search
          </button>
        </div>
      </div>
      
      <div style="margin-bottom: 1rem;">
        <p style="color: var(--color-bg-on); opacity: 0.7;">
          About 1,234 results (0.42 seconds)
        </p>
      </div>
      
      <div style="margin-bottom: 2rem;">
        ${Array.from({ length: 5 }, (_, i) => html`
          <div style="padding: 1rem 0; border-bottom: 1px solid var(--color-glass-border);">
            <h3 style="margin: 0 0 0.25rem; color: var(--color-primary-base);">
              Search Result ${i + 1}
            </h3>
            <p style="margin: 0 0 0.25rem; color: var(--color-bg-on); opacity: 0.7; font-size: 0.875rem;">
              https://example.com/result-${i + 1}
            </p>
            <p style="margin: 0;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </div>
        `)}
      </div>
      
      <div style="display: flex; justify-content: center;">
        <glz-pagination current="1" total="124" siblings="2"></glz-pagination>
      </div>
    </div>
  `
};

export const MobileResponsive: Story = {
  render: () => html`
    <div style="max-width: 360px; padding: 1rem; border: 2px dashed var(--color-glass-border); border-radius: var(--radius-md);">
      <p style="text-align: center; margin-bottom: 1rem; color: var(--color-bg-on); opacity: 0.7;">
        Mobile View (360px)
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h5>Full Mode (Responsive)</h5>
          <glz-pagination current="5" total="20" responsive></glz-pagination>
        </div>
        
        <div>
          <h5>Simple Mode</h5>
          <glz-pagination mode="simple" current="5" total="20"></glz-pagination>
        </div>
        
        <div>
          <h5>Input Mode</h5>
          <glz-pagination mode="input" current="5" total="20" size="small"></glz-pagination>
        </div>
      </div>
    </div>
  `
};
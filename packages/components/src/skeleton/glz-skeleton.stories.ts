import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-skeleton.js';

const meta: Meta = {
  title: 'Components/Skeleton',
  component: 'glz-skeleton',
  parameters: {
    docs: {
      description: {
        component: 'Skeleton loader for content loading states with multiple shapes and animations'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'title', 'avatar', 'thumbnail', 'card', 'button', 'input', 'badge', 'list-item', 'table-row', 'custom'],
      description: 'Skeleton shape type'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Skeleton size'
    },
    width: {
      control: 'radio',
      options: ['full', '75', '50', '25', 'auto'],
      description: 'Width modifier for text types'
    },
    animated: {
      control: 'radio',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type'
    },
    variant: {
      control: 'radio',
      options: ['default', 'glass'],
      description: 'Visual variant'
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of lines (for text/title types)'
    },
    columns: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of columns (for table-row type)'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 400px;">
      <glz-skeleton type="text"></glz-skeleton>
      <glz-skeleton type="text" width="75"></glz-skeleton>
      <glz-skeleton type="text" width="50"></glz-skeleton>
    </div>
  `
};

export const TextVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 500px;">
      <div>
        <h4>Title</h4>
        <glz-skeleton type="title"></glz-skeleton>
      </div>
      
      <div>
        <h4>Paragraph (Multiple Lines)</h4>
        <glz-skeleton type="text" lines="3"></glz-skeleton>
      </div>
      
      <div>
        <h4>Mixed Content</h4>
        <glz-skeleton type="title" width="50"></glz-skeleton>
        <glz-skeleton type="text" lines="2"></glz-skeleton>
      </div>
    </div>
  `
};

export const Shapes: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem;">
      <div>
        <h5>Avatar</h5>
        <div style="display: flex; gap: 1rem;">
          <glz-skeleton type="avatar" size="small"></glz-skeleton>
          <glz-skeleton type="avatar"></glz-skeleton>
          <glz-skeleton type="avatar" size="large"></glz-skeleton>
        </div>
      </div>
      
      <div>
        <h5>Thumbnail</h5>
        <glz-skeleton type="thumbnail"></glz-skeleton>
      </div>
      
      <div>
        <h5>Button</h5>
        <div style="display: flex; gap: 0.5rem;">
          <glz-skeleton type="button"></glz-skeleton>
          <glz-skeleton type="button" size="small"></glz-skeleton>
        </div>
      </div>
      
      <div>
        <h5>Badge</h5>
        <div style="display: flex; gap: 0.5rem;">
          <glz-skeleton type="badge"></glz-skeleton>
          <glz-skeleton type="badge"></glz-skeleton>
          <glz-skeleton type="badge"></glz-skeleton>
        </div>
      </div>
      
      <div>
        <h5>Input</h5>
        <glz-skeleton type="input"></glz-skeleton>
      </div>
    </div>
  `
};

export const CardSkeleton: Story = {
  render: () => html`
    <div style="width: 100%; max-width: 350px;">
      <glz-skeleton type="card"></glz-skeleton>
      <div style="padding: 1rem;">
        <glz-skeleton type="title" width="75"></glz-skeleton>
        <glz-skeleton type="text" lines="2"></glz-skeleton>
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <glz-skeleton type="button"></glz-skeleton>
          <glz-skeleton type="button"></glz-skeleton>
        </div>
      </div>
    </div>
  `
};

export const ListItem: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 500px;">
      <glz-skeleton type="list-item"></glz-skeleton>
      <glz-skeleton type="list-item"></glz-skeleton>
      <glz-skeleton type="list-item"></glz-skeleton>
      <glz-skeleton type="list-item"></glz-skeleton>
    </div>
  `
};

export const TableRow: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
      <glz-skeleton type="table-row" columns="4"></glz-skeleton>
      <glz-skeleton type="table-row" columns="4"></glz-skeleton>
      <glz-skeleton type="table-row" columns="4"></glz-skeleton>
      <glz-skeleton type="table-row" columns="4"></glz-skeleton>
      <glz-skeleton type="table-row" columns="4"></glz-skeleton>
    </div>
  `
};

export const AnimationTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <div>
        <h4>Wave Animation (Default)</h4>
        <glz-skeleton type="text" animated="wave"></glz-skeleton>
        <glz-skeleton type="text" animated="wave" width="75"></glz-skeleton>
      </div>
      
      <div>
        <h4>Pulse Animation</h4>
        <glz-skeleton type="text" animated="pulse"></glz-skeleton>
        <glz-skeleton type="text" animated="pulse" width="75"></glz-skeleton>
      </div>
      
      <div>
        <h4>No Animation</h4>
        <glz-skeleton type="text" animated="none"></glz-skeleton>
        <glz-skeleton type="text" animated="none" width="75"></glz-skeleton>
      </div>
    </div>
  `
};

export const Glass: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md);">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <glz-skeleton type="title" variant="glass"></glz-skeleton>
        <glz-skeleton type="text" variant="glass" lines="3"></glz-skeleton>
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <glz-skeleton type="button" variant="glass"></glz-skeleton>
          <glz-skeleton type="button" variant="glass"></glz-skeleton>
        </div>
      </div>
    </div>
  `
};

export const CustomSkeleton: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Custom Dimensions</h4>
        <glz-skeleton 
          type="custom"
          customWidth="200px"
          customHeight="50px"
          customRadius="10px"
        ></glz-skeleton>
      </div>
      
      <div>
        <h4>Custom Circle</h4>
        <glz-skeleton 
          type="custom"
          customWidth="80px"
          customHeight="80px"
          customRadius="50%"
        ></glz-skeleton>
      </div>
    </div>
  `
};

export const UserCard: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
      ${Array.from({ length: 3 }, () => html`
        <div style="padding: 1.5rem; background: var(--color-bg-base); border: 1px solid var(--color-glass-border); border-radius: var(--radius-lg);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <glz-skeleton type="avatar" size="large"></glz-skeleton>
            <div style="flex: 1;">
              <glz-skeleton type="text" width="75"></glz-skeleton>
              <glz-skeleton type="text" width="50"></glz-skeleton>
            </div>
          </div>
          <glz-skeleton type="text" lines="3"></glz-skeleton>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <glz-skeleton type="badge"></glz-skeleton>
            <glz-skeleton type="badge"></glz-skeleton>
            <glz-skeleton type="badge"></glz-skeleton>
          </div>
        </div>
      `)}
    </div>
  `
};

export const ProductGrid: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem;">
      ${Array.from({ length: 6 }, () => html`
        <div>
          <glz-skeleton type="card" size="small"></glz-skeleton>
          <div style="padding: 1rem 0;">
            <glz-skeleton type="text" width="75"></glz-skeleton>
            <glz-skeleton type="text" width="50"></glz-skeleton>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
              <glz-skeleton type="badge"></glz-skeleton>
              <glz-skeleton type="button" size="small"></glz-skeleton>
            </div>
          </div>
        </div>
      `)}
    </div>
  `
};

export const BlogPost: Story = {
  render: () => html`
    <article style="max-width: 800px; margin: 0 auto;">
      <glz-skeleton type="card" size="large"></glz-skeleton>
      
      <div style="padding: 2rem;">
        <glz-skeleton type="title"></glz-skeleton>
        
        <div style="display: flex; gap: 1rem; align-items: center; margin: 1rem 0;">
          <glz-skeleton type="avatar" size="small"></glz-skeleton>
          <glz-skeleton type="text" width="25"></glz-skeleton>
          <glz-skeleton type="text" width="25"></glz-skeleton>
        </div>
        
        <div style="display: flex; gap: 0.5rem; margin: 1rem 0;">
          <glz-skeleton type="badge"></glz-skeleton>
          <glz-skeleton type="badge"></glz-skeleton>
          <glz-skeleton type="badge"></glz-skeleton>
        </div>
        
        <div style="margin: 2rem 0;">
          <glz-skeleton type="text" lines="5"></glz-skeleton>
        </div>
        
        <div style="margin: 2rem 0;">
          <glz-skeleton type="text" lines="4"></glz-skeleton>
        </div>
        
        <div style="margin: 2rem 0;">
          <glz-skeleton type="title" width="50"></glz-skeleton>
          <glz-skeleton type="text" lines="3"></glz-skeleton>
        </div>
      </div>
    </article>
  `
};

export const DataTable: Story = {
  render: () => html`
    <div style="width: 100%; overflow-x: auto;">
      <div style="padding: 1rem; background: var(--color-bg-base); border: 1px solid var(--color-glass-border); border-radius: var(--radius-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <glz-skeleton type="title" width="25"></glz-skeleton>
          <div style="display: flex; gap: 0.5rem;">
            <glz-skeleton type="button"></glz-skeleton>
            <glz-skeleton type="button"></glz-skeleton>
          </div>
        </div>
        
        <div style="border-bottom: 1px solid var(--color-glass-border); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
          <glz-skeleton type="table-row" columns="5"></glz-skeleton>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${Array.from({ length: 8 }, () => html`
            <glz-skeleton type="table-row" columns="5"></glz-skeleton>
          `)}
        </div>
        
        <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1rem;">
          <glz-skeleton type="button" size="small"></glz-skeleton>
          <glz-skeleton type="badge"></glz-skeleton>
          <glz-skeleton type="badge"></glz-skeleton>
          <glz-skeleton type="badge"></glz-skeleton>
          <glz-skeleton type="button" size="small"></glz-skeleton>
        </div>
      </div>
    </div>
  `
};
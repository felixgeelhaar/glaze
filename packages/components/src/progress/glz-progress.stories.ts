import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-progress.js';

const meta: Meta = {
  title: 'Components/Progress',
  component: 'glz-progress',
  parameters: {
    docs: {
      description: {
        component: 'Versatile progress indicator with linear, circular, and segmented variants'
      }
    }
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['linear', 'circular', 'segments'],
      description: 'Progress indicator type'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value'
    },
    max: {
      control: 'number',
      description: 'Maximum value'
    },
    buffer: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Buffer value for loading states'
    },
    segments: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Number of segments (for segmented type)'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Progress size'
    },
    color: {
      control: 'select',
      options: ['primary', 'accent', 'success', 'warning', 'error'],
      description: 'Progress color'
    },
    variant: {
      control: 'radio',
      options: ['default', 'glass'],
      description: 'Visual variant'
    },
    striped: {
      control: 'boolean',
      description: 'Show striped pattern (linear only)'
    },
    animated: {
      control: 'boolean',
      description: 'Animate stripes (when striped)'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state'
    },
    showLabel: {
      control: 'boolean',
      description: 'Show label text'
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage value'
    }
  }
};

export default meta;
type Story = StoryObj;

export const LinearProgress: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <glz-progress value="25" max="100"></glz-progress>
      
      <glz-progress value="50" max="100" color="accent"></glz-progress>
      
      <glz-progress value="75" max="100" color="success"></glz-progress>
      
      <glz-progress value="90" max="100" color="warning"></glz-progress>
    </div>
  `
};

export const CircularProgress: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <glz-progress type="circular" value="25" max="100" size="small"></glz-progress>
      
      <glz-progress type="circular" value="50" max="100" color="accent"></glz-progress>
      
      <glz-progress type="circular" value="75" max="100" size="large" color="success" showValue></glz-progress>
    </div>
  `
};

export const SegmentedProgress: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <div>
        <h4>Step Progress (3 steps)</h4>
        <glz-progress type="segments" value="1" max="3" segments="3"></glz-progress>
      </div>
      
      <div>
        <h4>Level Progress (5 levels)</h4>
        <glz-progress type="segments" value="3" max="5" segments="5" color="accent"></glz-progress>
      </div>
      
      <div>
        <h4>Password Strength</h4>
        <glz-progress type="segments" value="4" max="5" segments="5" color="success"></glz-progress>
      </div>
    </div>
  `
};

export const WithLabels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <glz-progress 
        value="35" 
        max="100" 
        showLabel 
        showValue
        label="Upload Progress"
      ></glz-progress>
      
      <glz-progress 
        value="60" 
        max="100" 
        showLabel 
        showValue
        label="Processing"
        color="accent"
      ></glz-progress>
      
      <glz-progress 
        type="segments"
        value="3" 
        max="5" 
        segments="5"
        showLabel 
        showValue
        label="Profile Completion"
        color="success"
      ></glz-progress>
    </div>
  `
};

export const Striped: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <glz-progress value="30" max="100" striped></glz-progress>
      
      <glz-progress value="50" max="100" striped animated color="accent"></glz-progress>
      
      <glz-progress value="70" max="100" striped animated color="success"></glz-progress>
    </div>
  `
};

export const Indeterminate: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <div>
        <h4>Linear Indeterminate</h4>
        <glz-progress indeterminate></glz-progress>
      </div>
      
      <div>
        <h4>Circular Indeterminate</h4>
        <div style="display: flex; gap: 2rem;">
          <glz-progress type="circular" indeterminate size="small"></glz-progress>
          <glz-progress type="circular" indeterminate color="accent"></glz-progress>
          <glz-progress type="circular" indeterminate size="large" color="success"></glz-progress>
        </div>
      </div>
    </div>
  `
};

export const WithBuffer: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <div>
        <h4>Video Buffering</h4>
        <glz-progress value="30" buffer="60" max="100"></glz-progress>
      </div>
      
      <div>
        <h4>Download with Buffer</h4>
        <glz-progress value="45" buffer="75" max="100" color="accent"></glz-progress>
      </div>
    </div>
  `
};

export const Glass: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md);">
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <glz-progress value="40" max="100" variant="glass"></glz-progress>
        
        <glz-progress value="60" max="100" variant="glass" striped animated></glz-progress>
        
        <div style="display: flex; gap: 2rem;">
          <glz-progress type="circular" value="75" max="100" variant="glass" showValue></glz-progress>
        </div>
      </div>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 400px;">
      <div>
        <h4>Linear Sizes</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <glz-progress value="50" max="100" size="small"></glz-progress>
          <glz-progress value="50" max="100" size="medium"></glz-progress>
          <glz-progress value="50" max="100" size="large"></glz-progress>
        </div>
      </div>
      
      <div>
        <h4>Circular Sizes</h4>
        <div style="display: flex; gap: 2rem; align-items: center;">
          <glz-progress type="circular" value="50" max="100" size="small"></glz-progress>
          <glz-progress type="circular" value="50" max="100" size="medium"></glz-progress>
          <glz-progress type="circular" value="50" max="100" size="large"></glz-progress>
        </div>
      </div>
    </div>
  `
};

export const FileUpload: Story = {
  render: () => {
    const files = [
      { name: 'document.pdf', progress: 100, status: 'success' },
      { name: 'image.jpg', progress: 65, status: 'uploading' },
      { name: 'video.mp4', progress: 30, buffer: 50, status: 'uploading' },
      { name: 'archive.zip', progress: 0, status: 'pending' }
    ];
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 500px;">
        <h4>File Upload Progress</h4>
        ${files.map(file => html`
          <div style="padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-md); border: 1px solid var(--color-glass-border);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-weight: 500;">${file.name}</span>
              <span style="font-size: 0.875rem; color: var(--color-bg-on); opacity: 0.7;">
                ${file.status === 'success' ? '✓ Complete' : 
                  file.status === 'uploading' ? `${file.progress}%` : 
                  'Waiting...'}
              </span>
            </div>
            <glz-progress 
              value=${file.progress} 
              buffer=${file.buffer || 0}
              max="100" 
              size="small"
              color=${file.status === 'success' ? 'success' : 'primary'}
              ?indeterminate=${file.status === 'pending'}
            ></glz-progress>
          </div>
        `)}
      </div>
    `;
  }
};

export const MultiStep: Story = {
  render: () => {
    const steps = ['Account', 'Profile', 'Preferences', 'Review', 'Complete'];
    const currentStep = 3;
    
    return html`
      <div style="width: 100%; max-width: 600px;">
        <h4>Setup Progress</h4>
        
        <div style="margin: 2rem 0;">
          <glz-progress 
            type="segments" 
            value=${currentStep} 
            max=${steps.length}
            segments=${steps.length}
            color="primary"
          ></glz-progress>
        </div>
        
        <div style="display: flex; justify-content: space-between;">
          ${steps.map((step, index) => html`
            <div style="text-align: center; flex: 1;">
              <div style="
                width: 32px; 
                height: 32px; 
                border-radius: 50%; 
                background: ${index < currentStep ? 'var(--color-primary-base)' : 'var(--color-surface-base)'};
                color: ${index < currentStep ? 'var(--color-primary-on)' : 'var(--color-surface-on)'};
                border: 2px solid ${index < currentStep ? 'var(--color-primary-base)' : 'var(--color-glass-border)'};
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
              ">
                ${index < currentStep ? '✓' : index + 1}
              </div>
              <div style="font-size: 0.75rem; color: var(--color-bg-on); opacity: ${index < currentStep ? '1' : '0.6'};">
                ${step}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
};

export const LiveExample: Story = {
  render: () => {
    let value = 0;
    const updateProgress = (e: Event) => {
      const container = (e.target as HTMLElement).closest('.live-example');
      const progressElements = container?.querySelectorAll('glz-progress');
      progressElements?.forEach(el => {
        if (!el.indeterminate) {
          el.value = value;
        }
      });
    };
    
    return html`
      <div class="live-example" style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 500px;">
        <div>
          <h4>Interactive Progress Demo</h4>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value="0"
            @input=${(e: Event) => {
              value = Number((e.target as HTMLInputElement).value);
              updateProgress(e);
            }}
            style="width: 100%; margin: 1rem 0;"
          />
        </div>
        
        <glz-progress value="0" max="100" showValue showLabel label="Linear"></glz-progress>
        
        <glz-progress value="0" max="100" striped animated color="accent"></glz-progress>
        
        <div style="display: flex; gap: 2rem;">
          <glz-progress type="circular" value="0" max="100" showValue></glz-progress>
          <glz-progress type="circular" value="0" max="100" color="success" showValue></glz-progress>
        </div>
        
        <glz-progress type="segments" value="0" max="100" segments="5" showValue showLabel label="Segments"></glz-progress>
      </div>
    `;
  }
};
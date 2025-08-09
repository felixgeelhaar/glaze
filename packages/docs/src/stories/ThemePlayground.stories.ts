import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@glaze/components';

const meta: Meta = {
  title: 'Playground/Theme Customizer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive playground for customizing glassmorphism effects and theme variables in real-time.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const updateCSS = () => {
      const controls = document.querySelectorAll('.playground-control');
      controls.forEach((control: any) => {
        const property = control.dataset.property;
        const value = control.dataset.unit 
          ? `${control.value}${control.dataset.unit}`
          : control.value;
        document.documentElement.style.setProperty(property, value);
      });
    };

    return html`
      <div style="
        display: grid;
        grid-template-columns: 300px 1fr;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      ">
        <!-- Controls Panel -->
        <div style="
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          padding: 2rem;
          overflow-y: auto;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        ">
          <h2 style="color: white; margin: 0 0 2rem 0; font-size: 1.5rem;">
            Theme Playground
          </h2>
          
          <!-- Glass Effects -->
          <div style="margin-bottom: 2rem;">
            <h3 style="color: white; margin: 0 0 1rem 0; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Glass Effects
            </h3>
            
            <label style="display: block; margin-bottom: 1rem;">
              <span style="color: rgba(255, 255, 255, 0.8); display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">
                Blur Intensity
              </span>
              <input
                type="range"
                min="0"
                max="32"
                value="16"
                class="playground-control"
                data-property="--glz-glass-blur"
                data-unit="px"
                @input="${updateCSS}"
                style="width: 100%;"
              />
              <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.75rem;">
                <span class="blur-value">16</span>px
              </span>
            </label>
            
            <label style="display: block; margin-bottom: 1rem;">
              <span style="color: rgba(255, 255, 255, 0.8); display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">
                Light Tint Opacity
              </span>
              <input
                type="range"
                min="0"
                max="50"
                value="16"
                class="playground-control"
                data-property="--glz-glass-tint-light-opacity"
                @input="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value) / 100;
                  document.documentElement.style.setProperty(
                    '--glz-glass-tint-light',
                    `rgba(255, 255, 255, ${value})`
                  );
                  updateCSS();
                }}"
                style="width: 100%;"
              />
              <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.75rem;">
                <span class="opacity-value">16</span>%
              </span>
            </label>
            
            <label style="display: block; margin-bottom: 1rem;">
              <span style="color: rgba(255, 255, 255, 0.8); display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">
                Dark Tint Opacity
              </span>
              <input
                type="range"
                min="0"
                max="50"
                value="24"
                class="playground-control"
                data-property="--glz-glass-tint-dark-opacity"
                @input="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value) / 100;
                  document.documentElement.style.setProperty(
                    '--glz-glass-tint-dark',
                    `rgba(0, 0, 0, ${value})`
                  );
                  updateCSS();
                }}"
                style="width: 100%;"
              />
              <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.75rem;">
                <span class="dark-opacity-value">24</span>%
              </span>
            </label>
            
            <label style="display: block; margin-bottom: 1rem;">
              <span style="color: rgba(255, 255, 255, 0.8); display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">
                Border Opacity
              </span>
              <input
                type="range"
                min="0"
                max="50"
                value="28"
                class="playground-control"
                @input="${(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  const value = parseInt(target.value) / 100;
                  document.documentElement.style.setProperty(
                    '--glz-glass-border',
                    `rgba(255, 255, 255, ${value})`
                  );
                  updateCSS();
                }}"
                style="width: 100%;"
              />
              <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.75rem;">
                <span class="border-opacity-value">28</span>%
              </span>
            </label>
          </div>
          
          <!-- Border Radius -->
          <div style="margin-bottom: 2rem;">
            <h3 style="color: white; margin: 0 0 1rem 0; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Border Radius
            </h3>
            
            <label style="display: block; margin-bottom: 1rem;">
              <span style="color: rgba(255, 255, 255, 0.8); display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">
                Corner Radius
              </span>
              <input
                type="range"
                min="0"
                max="32"
                value="12"
                class="playground-control"
                data-property="--glz-radius-lg"
                data-unit="px"
                @input="${updateCSS}"
                style="width: 100%;"
              />
              <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.75rem;">
                <span class="radius-value">12</span>px
              </span>
            </label>
          </div>
          
          <!-- Colors -->
          <div style="margin-bottom: 2rem;">
            <h3 style="color: white; margin: 0 0 1rem 0; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Colors
            </h3>
            
            <label style="display: block; margin-bottom: 1rem;">
              <span style="color: rgba(255, 255, 255, 0.8); display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">
                Primary Color
              </span>
              <input
                type="color"
                value="#4F46E5"
                class="playground-control"
                data-property="--glz-color-primary-9"
                @input="${updateCSS}"
                style="width: 100%; height: 40px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.2);"
              />
            </label>
            
            <label style="display: block; margin-bottom: 1rem;">
              <span style="color: rgba(255, 255, 255, 0.8); display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">
                Accent Color
              </span>
              <input
                type="color"
                value="#DB2777"
                class="playground-control"
                data-property="--glz-color-accent-9"
                @input="${updateCSS}"
                style="width: 100%; height: 40px; border-radius: 4px; border: 1px solid rgba(255, 255, 255, 0.2);"
              />
            </label>
          </div>
          
          <!-- Presets -->
          <div style="margin-bottom: 2rem;">
            <h3 style="color: white; margin: 0 0 1rem 0; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
              Presets
            </h3>
            
            <div style="display: grid; gap: 0.5rem;">
              <button
                @click="${() => {
                  document.documentElement.style.setProperty('--glz-glass-blur', '16px');
                  document.documentElement.style.setProperty('--glz-glass-tint-light', 'rgba(255, 255, 255, 0.16)');
                  document.documentElement.style.setProperty('--glz-glass-tint-dark', 'rgba(0, 0, 0, 0.24)');
                  document.documentElement.style.setProperty('--glz-glass-border', 'rgba(255, 255, 255, 0.28)');
                }}"
                style="
                  padding: 0.5rem 1rem;
                  background: rgba(255, 255, 255, 0.1);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  color: white;
                  border-radius: 4px;
                  cursor: pointer;
                "
              >
                Default Glass
              </button>
              
              <button
                @click="${() => {
                  document.documentElement.style.setProperty('--glz-glass-blur', '24px');
                  document.documentElement.style.setProperty('--glz-glass-tint-light', 'rgba(255, 255, 255, 0.08)');
                  document.documentElement.style.setProperty('--glz-glass-tint-dark', 'rgba(0, 0, 0, 0.4)');
                  document.documentElement.style.setProperty('--glz-glass-border', 'rgba(255, 255, 255, 0.15)');
                }}"
                style="
                  padding: 0.5rem 1rem;
                  background: rgba(255, 255, 255, 0.1);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  color: white;
                  border-radius: 4px;
                  cursor: pointer;
                "
              >
                Heavy Blur
              </button>
              
              <button
                @click="${() => {
                  document.documentElement.style.setProperty('--glz-glass-blur', '8px');
                  document.documentElement.style.setProperty('--glz-glass-tint-light', 'rgba(255, 255, 255, 0.25)');
                  document.documentElement.style.setProperty('--glz-glass-tint-dark', 'rgba(0, 0, 0, 0.15)');
                  document.documentElement.style.setProperty('--glz-glass-border', 'rgba(255, 255, 255, 0.4)');
                }}"
                style="
                  padding: 0.5rem 1rem;
                  background: rgba(255, 255, 255, 0.1);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  color: white;
                  border-radius: 4px;
                  cursor: pointer;
                "
              >
                Subtle Glass
              </button>
            </div>
          </div>
        </div>
        
        <!-- Preview Area -->
        <div style="
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          overflow-y: auto;
        ">
          <h1 style="color: white; text-align: center; margin: 0;">
            Live Theme Preview
          </h1>
          
          <!-- Sample Components -->
          <div style="display: grid; gap: 2rem; width: 100%; max-width: 600px;">
            <glz-card variant="glass" size="lg">
              <h2 style="margin: 0 0 1rem 0; color: white;">Glass Card</h2>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 0 0 1.5rem 0;">
                This card updates in real-time as you adjust the theme controls.
                Try changing the blur intensity, opacity, and colors.
              </p>
              <div style="display: flex; gap: 1rem;">
                <glz-button variant="solid" tone="primary">Primary</glz-button>
                <glz-button variant="glass" tone="accent">Accent</glz-button>
                <glz-button variant="ghost" tone="neutral">Ghost</glz-button>
              </div>
            </glz-card>
            
            <glz-card variant="glass">
              <h3 style="margin: 0 0 1rem 0; color: white;">Form Elements</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <glz-input
                  variant="glass"
                  label="Email"
                  placeholder="user@example.com"
                  type="email"
                ></glz-input>
                <glz-select
                  variant="glass"
                  label="Theme"
                  placeholder="Select a theme"
                ></glz-select>
              </div>
            </glz-card>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <glz-card variant="solid" tone="primary">
                <h4 style="margin: 0; color: white;">Solid Variant</h4>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                  No transparency
                </p>
              </glz-card>
              <glz-card variant="ghost" tone="accent">
                <h4 style="margin: 0; color: white;">Ghost Variant</h4>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                  Minimal style
                </p>
              </glz-card>
            </div>
          </div>
          
          <!-- CSS Output -->
          <details style="
            width: 100%;
            max-width: 600px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 1rem;
          ">
            <summary style="
              color: white;
              cursor: pointer;
              font-weight: bold;
              margin-bottom: 1rem;
            ">
              View Generated CSS Variables
            </summary>
            <pre style="
              color: rgba(255, 255, 255, 0.8);
              font-family: monospace;
              font-size: 0.875rem;
              margin: 0;
              overflow-x: auto;
            "><code id="css-output">
:root {
  --glz-glass-blur: 16px;
  --glz-glass-tint-light: rgba(255, 255, 255, 0.16);
  --glz-glass-tint-dark: rgba(0, 0, 0, 0.24);
  --glz-glass-border: rgba(255, 255, 255, 0.28);
  --glz-radius-lg: 12px;
  --glz-color-primary-9: #4F46E5;
  --glz-color-accent-9: #DB2777;
}
            </code></pre>
          </details>
        </div>
      </div>
      
      <script>
        // Update value displays
        document.addEventListener('input', (e) => {
          if (e.target.classList.contains('playground-control')) {
            const parent = e.target.closest('label');
            const valueSpan = parent?.querySelector('span[class*="-value"]');
            if (valueSpan) {
              valueSpan.textContent = e.target.value;
            }
            
            // Update CSS output
            const output = document.getElementById('css-output');
            if (output) {
              const styles = [
                \`--glz-glass-blur: \${getComputedStyle(document.documentElement).getPropertyValue('--glz-glass-blur')};\`,
                \`--glz-glass-tint-light: \${getComputedStyle(document.documentElement).getPropertyValue('--glz-glass-tint-light')};\`,
                \`--glz-glass-tint-dark: \${getComputedStyle(document.documentElement).getPropertyValue('--glz-glass-tint-dark')};\`,
                \`--glz-glass-border: \${getComputedStyle(document.documentElement).getPropertyValue('--glz-glass-border')};\`,
                \`--glz-radius-lg: \${getComputedStyle(document.documentElement).getPropertyValue('--glz-radius-lg')};\`,
                \`--glz-color-primary-9: \${getComputedStyle(document.documentElement).getPropertyValue('--glz-color-primary-9')};\`,
                \`--glz-color-accent-9: \${getComputedStyle(document.documentElement).getPropertyValue('--glz-color-accent-9')};\`,
              ];
              output.textContent = \`:root {\n  \${styles.join('\\n  ')}\n}\`;
            }
          }
        });
      </script>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for experimenting with glassmorphism effects and theme variables. Adjust sliders to see real-time updates.',
      },
    },
  },
};
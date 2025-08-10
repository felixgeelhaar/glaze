import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Guidelines/Glass Design Patterns',
  parameters: {
    docs: {
      page: () => `
        <div class="sb-unstyled">
          <h1>Glass Design Patterns</h1>
          <p>Best practices for using glassmorphism effects in the Glaze Design System.</p>
          
          <h2>When to Use Glass Effects</h2>
          
          <h3>✅ DO: Use Glass for Overlays</h3>
          <p>Glass effects work best when content overlays other elements:</p>
          <ul>
            <li>Modal dialogs over page content</li>
            <li>Floating action buttons</li>
            <li>Navigation bars over hero images</li>
            <li>Cards on gradient backgrounds</li>
            <li>Toasts and notifications</li>
          </ul>
          
          <pre><code class="language-html"><!-- Good: Glass dialog over content -->
&lt;glz-dialog variant="glass" open&gt;
  &lt;h2&gt;Overlay Content&lt;/h2&gt;
  &lt;p&gt;Glass effect creates depth and hierarchy&lt;/p&gt;
&lt;/glz-dialog&gt;</code></pre>

          <h3>❌ DON'T: Use Glass on Solid Backgrounds</h3>
          <p>Avoid glass effects on plain, solid-colored backgrounds where the effect is lost.</p>

          <h2>Design System Principles</h2>
          
          <h3>Transparency Hierarchy</h3>
          <ul>
            <li><strong>Primary Glass (10% opacity):</strong> Main interactive elements</li>
            <li><strong>Secondary Glass (5% opacity):</strong> Supporting elements</li>
            <li><strong>Tertiary Glass (2% opacity):</strong> Subtle backgrounds</li>
          </ul>

          <h3>Blur Strength Guidelines</h3>
          <ul>
            <li><strong>Heavy blur (20px+):</strong> Modal backgrounds, overlays</li>
            <li><strong>Medium blur (10-15px):</strong> Cards, panels</li>
            <li><strong>Light blur (5-8px):</strong> Buttons, small elements</li>
          </ul>

          <h2>Accessibility Considerations</h2>
          <ul>
            <li>Ensure sufficient contrast ratios (minimum 4.5:1)</li>
            <li>Provide alternative high-contrast mode</li>
            <li>Test with reduced motion preferences</li>
            <li>Include proper focus indicators</li>
          </ul>
        </div>
      `,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => '<div>See docs panel for complete guidelines →</div>',
};
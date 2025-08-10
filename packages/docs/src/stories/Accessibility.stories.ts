import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Guidelines/Accessibility',
  parameters: {
    docs: {
      page: () => `
        <div class="sb-unstyled">
          <h1>Accessibility Guide</h1>
          <p>The Glaze Design System is built with accessibility as a core principle, targeting WCAG 2.2 AA+ compliance.</p>
          
          <h2>Core Principles</h2>
          
          <h3>1. Perceivable</h3>
          <p>Information and UI components must be presentable in ways users can perceive.</p>
          <ul>
            <li><strong>Text Alternatives:</strong> All non-text content has text alternatives</li>
            <li><strong>Color Contrast:</strong> Minimum 4.5:1 for normal text, 3:1 for large text</li>
            <li><strong>Adaptable:</strong> Content can be presented without losing meaning</li>
            <li><strong>Distinguishable:</strong> Foreground is easy to distinguish from background</li>
          </ul>

          <h3>2. Operable</h3>
          <p>Interface components must be operable by all users.</p>
          <ul>
            <li><strong>Keyboard Accessible:</strong> All functionality via keyboard</li>
            <li><strong>No Seizures:</strong> Nothing flashes more than 3 times per second</li>
            <li><strong>Navigable:</strong> Users can navigate and find content</li>
            <li><strong>Input Modalities:</strong> Functions work with various inputs</li>
          </ul>

          <h3>3. Understandable</h3>
          <p>Information and UI operation must be understandable.</p>
          <ul>
            <li><strong>Readable:</strong> Text is readable and understandable</li>
            <li><strong>Predictable:</strong> Web pages function predictably</li>
            <li><strong>Input Assistance:</strong> Help users avoid and correct mistakes</li>
          </ul>

          <h3>4. Robust</h3>
          <p>Content works with various user agents, including assistive technologies.</p>
          <ul>
            <li><strong>Compatible:</strong> Works with assistive technologies</li>
            <li><strong>Valid Code:</strong> Uses clean, semantic markup</li>
          </ul>

          <h2>Component-Specific Guidelines</h2>

          <h3>Focus Management</h3>
          <ul>
            <li>All interactive elements receive keyboard focus</li>
            <li>Focus indicators are clearly visible (minimum 2px outline)</li>
            <li>Tab order follows logical reading sequence</li>
            <li>Focus traps work correctly in modals and dialogs</li>
          </ul>

          <h3>Color and Contrast</h3>
          <ul>
            <li>Glass effects maintain sufficient contrast ratios</li>
            <li>Information is not conveyed by color alone</li>
            <li>High contrast mode alternatives available</li>
            <li>Color blind friendly palette choices</li>
          </ul>

          <h3>Screen Reader Support</h3>
          <ul>
            <li>Semantic HTML elements used appropriately</li>
            <li>ARIA labels and descriptions where needed</li>
            <li>Live regions announce dynamic content changes</li>
            <li>Hidden content properly excluded from screen readers</li>
          </ul>

          <h2>Testing Checklist</h2>
          
          <h3>Automated Testing</h3>
          <ul>
            <li>Run axe-core accessibility audits</li>
            <li>Validate HTML markup</li>
            <li>Check color contrast ratios</li>
            <li>Test with lighthouse accessibility audit</li>
          </ul>

          <h3>Manual Testing</h3>
          <ul>
            <li>Navigate using only keyboard (Tab, Shift+Tab, Arrow keys, Enter, Space)</li>
            <li>Test with screen reader (VoiceOver, NVDA, JAWS)</li>
            <li>Verify high contrast mode display</li>
            <li>Test with zoom up to 200%</li>
            <li>Validate reduced motion preferences</li>
          </ul>

          <h2>Resources</h2>
          <ul>
            <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">WCAG 2.1 Quick Reference</a></li>
            <li><a href="https://webaim.org/resources/contrastchecker/" target="_blank">WebAIM Contrast Checker</a></li>
            <li><a href="https://www.deque.com/axe/" target="_blank">axe DevTools</a></li>
            <li><a href="https://inclusive-components.design/" target="_blank">Inclusive Components</a></li>
          </ul>
        </div>
      `,
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => '<div>See docs panel for complete accessibility guidelines →</div>',
};
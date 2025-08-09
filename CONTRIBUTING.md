# Contributing to Glaze Design System

Thank you for your interest in contributing to Glaze! This guide will help you get started with contributing to our design system.

## 🤝 How to Contribute

### Types of Contributions

We welcome several types of contributions:
- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new components or enhancements
- 📝 **Documentation** - Improve guides, examples, and API docs
- 🎨 **Design Improvements** - Enhance visual design and UX
- 🔧 **Code Contributions** - Submit bug fixes and new features

### Before Contributing

1. **Check existing issues** to avoid duplicates
2. **Read our design principles** to understand the vision
3. **Review the codebase** to understand our patterns
4. **Start with small contributions** to get familiar

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git
- A code editor with TypeScript support

### Development Setup

1. **Fork and clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/glaze-design-system.git
cd glaze-design-system
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Start development environment:**
```bash
# Start Storybook (recommended)
pnpm dev

# Or build and run tests
pnpm build
pnpm test
```

4. **Open Storybook:**
Visit http://localhost:6006 to see components in action.

## 📝 Development Guidelines

### Code Standards

#### TypeScript
- Use strict TypeScript configuration
- Prefer interfaces over types for public APIs
- Document complex types with JSDoc comments
- Use meaningful names for generic parameters

```typescript
// ✅ Good
interface ButtonProps {
  /** Button variant style */
  variant?: 'solid' | 'outline' | 'ghost' | 'glass';
  /** Whether button is disabled */
  disabled?: boolean;
}

// ❌ Bad
interface Props {
  type?: string;
  disabled?: any;
}
```

#### Web Components (Lit)
- Follow Lit best practices and lifecycle methods
- Use reactive properties with proper decorators
- Implement proper event handling with custom events
- Include ARIA attributes for accessibility

```typescript
// ✅ Good
@customElement('glz-button')
export class GlzButton extends LitElement {
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'solid';
  
  @property({ type: Boolean, reflect: true })
  disabled = false;
  
  private _handleClick(e: Event) {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('glz-button-click', {
      detail: { event: e },
      bubbles: true,
      composed: true
    }));
  }
}
```

#### CSS
- Use CSS custom properties for theming
- Follow BEM naming convention for classes
- Support prefers-reduced-motion
- Include focus and hover states

```css
/* ✅ Good */
:host {
  --button-bg: var(--color-primary-base);
  --button-color: var(--color-primary-on);
}

.button {
  background: var(--button-bg);
  color: var(--button-color);
  transition: all 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}
```

### Accessibility Requirements

All components must meet WCAG 2.2 AA+ standards:

- **Keyboard Navigation** - All interactive elements accessible via keyboard
- **Screen Readers** - Proper ARIA labels and semantic HTML
- **Focus Management** - Visible focus indicators and logical tab order
- **Color Contrast** - Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Motion Sensitivity** - Respect prefers-reduced-motion preference

### Testing Requirements

- **Unit Tests** - Test component logic and behavior
- **Accessibility Tests** - Automated a11y testing with axe
- **Visual Tests** - Screenshot testing for UI consistency
- **Type Tests** - Verify TypeScript interfaces work correctly

```typescript
// Example test structure
describe('GlzButton', () => {
  it('should render with default props', async () => {
    const button = await fixture('<glz-button>Click me</glz-button>');
    expect(button).to.be.accessible();
    expect(button.variant).to.equal('solid');
  });
  
  it('should emit click event when clicked', async () => {
    const button = await fixture('<glz-button>Click</glz-button>');
    const clickSpy = sinon.spy();
    button.addEventListener('glz-button-click', clickSpy);
    
    button.click();
    expect(clickSpy).to.have.been.calledOnce;
  });
});
```

## 🧩 Adding New Components

### Component Structure

Create components following this structure:

```
packages/components/src/my-component/
├── glz-my-component.ts          # Main component
├── glz-my-component.test.ts     # Unit tests
├── glz-my-component.stories.ts  # Storybook stories
└── README.md                    # Component documentation
```

### Component Template

Use this template for new components:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A description of what this component does
 * @element glz-my-component
 * @fires glz-my-component-change - Fired when value changes
 * @slot - Default slot content
 * @csspart container - The main container element
 */
@customElement('glz-my-component')
export class GlzMyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      /* CSS custom properties */
      --component-bg: var(--color-surface-base);
      --component-color: var(--color-surface-on);
    }
    
    .container {
      background: var(--component-bg);
      color: var(--component-color);
    }
    
    /* Accessibility */
    :host(:focus-visible) {
      outline: 2px solid var(--color-primary-base);
      outline-offset: 2px;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .container {
        transition: none;
      }
    }
  `;

  /** Component variant */
  @property({ type: String, reflect: true })
  variant: 'default' | 'glass' = 'default';

  /** Whether component is disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`
      <div 
        class="container"
        part="container"
        role="button"
        tabindex=${this.disabled ? -1 : 0}
        aria-disabled=${this.disabled}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        <slot></slot>
      </div>
    `;
  }

  private _handleClick() {
    if (this.disabled) return;
    this._emitChange();
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }

  private _emitChange() {
    this.dispatchEvent(new CustomEvent('glz-my-component-change', {
      detail: { /* event data */ },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-my-component': GlzMyComponent;
  }
}
```

### Component Stories

Create comprehensive Storybook stories:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-my-component.js';

const meta: Meta = {
  title: 'Components/MyComponent',
  component: 'glz-my-component',
  parameters: {
    docs: {
      description: {
        component: 'Component description and usage guidelines'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'glass'],
      description: 'Component variant'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<glz-my-component>Default</glz-my-component>`
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <glz-my-component variant="default">Default</glz-my-component>
      <glz-my-component variant="glass">Glass</glz-my-component>
    </div>
  `
};

export const Interactive: Story = {
  render: () => html`
    <glz-my-component
      @glz-my-component-change=${(e: CustomEvent) => {
        console.log('Component changed:', e.detail);
      }}
    >
      Interactive Example
    </glz-my-component>
  `
};
```

## 🎨 Design Principles

### Glassmorphism Aesthetic
- Use backdrop-filter for blur effects
- Implement translucent backgrounds
- Create depth with subtle shadows
- Maintain readability with proper contrast

### Consistency
- Follow established patterns from existing components
- Use design tokens for colors, spacing, and typography
- Maintain consistent API design across components
- Use similar event naming conventions

### Performance
- Keep components lightweight (< 5KB per component)
- Use efficient rendering patterns
- Minimize CSS bundle size
- Optimize for tree shaking

### Accessibility First
- Design with keyboard navigation in mind
- Include proper ARIA attributes from the start
- Test with screen readers
- Support high contrast modes

## 🔄 Pull Request Process

### Before Submitting

1. **Test your changes:**
```bash
pnpm test
pnpm lint
pnpm build
```

2. **Update documentation:**
- Add/update component stories
- Update README if needed
- Add JSDoc comments for new APIs

3. **Check bundle size impact:**
```bash
pnpm build
# Check dist/ folder size
```

### PR Guidelines

- **Title:** Use conventional commits format (`feat: add new button variant`)
- **Description:** Explain what and why, not how
- **Screenshots:** Include before/after images for visual changes
- **Testing:** Document how you tested the changes
- **Breaking Changes:** Clearly mark any breaking changes

### PR Template

```markdown
## 🎯 What & Why
Brief description of changes and motivation.

## 🔧 Changes Made
- List of specific changes
- New features added
- Bugs fixed

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Accessibility tests pass
- [ ] Manual testing completed
- [ ] Storybook stories updated

## 📸 Screenshots
<!-- Include screenshots for visual changes -->

## ⚠️ Breaking Changes
<!-- List any breaking changes -->

## 📝 Notes
<!-- Additional context or considerations -->
```

## 📋 Code Review Process

### What We Look For

- **Functionality** - Does it work as intended?
- **Code Quality** - Is it readable and maintainable?
- **Performance** - Does it impact bundle size or runtime performance?
- **Accessibility** - Does it meet WCAG guidelines?
- **Design Consistency** - Does it follow our design system?
- **Documentation** - Are the changes well documented?

### Response Times

- Initial review: Within 2 business days
- Follow-up reviews: Within 1 business day
- Final approval: Same day if all requirements met

## 🐛 Bug Reports

### Before Reporting

1. Check if the bug has already been reported
2. Try to reproduce it in a minimal example
3. Check if it happens in the latest version

### Bug Report Template

```markdown
## 🐛 Bug Description
A clear description of what the bug is.

## 🔄 Reproduction Steps
1. Go to...
2. Click on...
3. See error...

## ✅ Expected Behavior
What you expected to happen.

## 📱 Environment
- OS: [e.g. macOS 14.0]
- Browser: [e.g. Chrome 118]
- Version: [e.g. @glaze/components@1.0.0]

## 🖼️ Screenshots
Add screenshots if applicable.

## 🔗 Minimal Reproduction
Link to CodePen, JSFiddle, or repository.
```

## ✨ Feature Requests

### Feature Request Template

```markdown
## 💡 Feature Description
Clear description of the feature request.

## 🎯 Use Case
Why is this feature needed? What problem does it solve?

## 💭 Proposed Solution
How do you envision this feature working?

## 🔄 Alternatives
Have you considered any alternative solutions?

## 📋 Additional Context
Any other context or screenshots about the feature.
```

## 🏆 Recognition

Contributors will be recognized in:
- CHANGELOG.md for each release
- README.md contributors section  
- GitHub release notes
- Special thanks in documentation

## 📞 Getting Help

- **Discord:** Join our [Discord server](https://discord.gg/glaze) for real-time help
- **GitHub Discussions:** For longer-form questions and discussions
- **Issues:** For bug reports and feature requests
- **Email:** design-system@glaze.dev for sensitive matters

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Glaze Design System! 🎉
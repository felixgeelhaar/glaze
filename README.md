# Glaze Design System

A modern, accessible design system built with Web Components and Lit, featuring beautiful glassmorphism aesthetics.

![Glaze Design System Hero](./screenshots/hero.png)

## 🎯 Live Demo

Explore the components in action:

![Vue Components Demo](./screenshots/vue-components.png)

*Vue 3 components with glassmorphism effects*

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-109%2F109%20passing-success)
![License](https://img.shields.io/badge/license-MIT-green)
![Bundle Size](https://img.shields.io/badge/size-%3C50KB-brightgreen)
![Accessibility](https://img.shields.io/badge/WCAG-2.2%20AA%2B-success)

## ✨ Features

- 🎨 **20 Production-Ready Components** - Complete UI component library
- 💎 **Glassmorphism Design** - Modern translucent aesthetics with backdrop blur
- ♿ **WCAG 2.2 AA+ Compliant** - Full accessibility with keyboard navigation and screen reader support
- 📦 **< 50KB Gzipped** - Lightweight and performant
- 🔧 **Framework Agnostic** - Works with any framework or vanilla JavaScript
- 💪 **TypeScript Support** - Full type safety and IntelliSense
- 🎯 **Zero Dependencies** - Built on web standards with Lit
- 🌙 **Theme Support** - Light, dark, and high-contrast themes
- 📱 **Responsive** - Mobile-first design approach
- ⚡ **Web Components** - Native browser support with shadow DOM

## 📦 Installation

```bash
npm install @felixgeelhaar/glaze-components @felixgeelhaar/glaze-tokens
# or
pnpm add @felixgeelhaar/glaze-components @felixgeelhaar/glaze-tokens
# or
yarn add @felixgeelhaar/glaze-components @felixgeelhaar/glaze-tokens
```

## 📋 Available Packages

| Package | Description | NPM |
|---------|-------------|-----|
| [@felixgeelhaar/glaze-components](./packages/components) | Core Web Components library | [![NPM](https://img.shields.io/npm/v/@felixgeelhaar/glaze-components.svg)](https://www.npmjs.com/package/@felixgeelhaar/glaze-components) |
| [@felixgeelhaar/glaze-tokens](./packages/tokens) | Design tokens (CSS variables, JS objects) | [![NPM](https://img.shields.io/npm/v/@felixgeelhaar/glaze-tokens.svg)](https://www.npmjs.com/package/@felixgeelhaar/glaze-tokens) |
| [@felixgeelhaar/glaze-engine](./packages/engine) | Tailwind/UnoCSS integration | [![NPM](https://img.shields.io/npm/v/@felixgeelhaar/glaze-engine.svg)](https://www.npmjs.com/package/@felixgeelhaar/glaze-engine) |
| [@felixgeelhaar/glaze-react](./packages/react) | React component wrappers | [![NPM](https://img.shields.io/npm/v/@felixgeelhaar/glaze-react.svg)](https://www.npmjs.com/package/@felixgeelhaar/glaze-react) |
| [@felixgeelhaar/glaze-vue](./packages/vue) | Vue 3 component wrappers | [![NPM](https://img.shields.io/npm/v/@felixgeelhaar/glaze-vue.svg)](https://www.npmjs.com/package/@felixgeelhaar/glaze-vue) |
| [@felixgeelhaar/glaze-cli](./packages/cli) | Command-line interface | [![NPM](https://img.shields.io/npm/v/@felixgeelhaar/glaze-cli.svg)](https://www.npmjs.com/package/@felixgeelhaar/glaze-cli) |

## 🚀 Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Import tokens for theming -->
  <link rel="stylesheet" href="node_modules/@felixgeelhaar/glaze-components/dist/styles/tokens.css">
  <link rel="stylesheet" href="node_modules/@felixgeelhaar/glaze-components/dist/styles/components.css">
</head>
<body>
  <!-- Use components -->
  <glz-button variant="glass">Click me</glz-button>
  <glz-card variant="glass">
    <h2 slot="header">Welcome</h2>
    <p>Beautiful glassmorphism design</p>
  </glz-card>

  <!-- Import components -->
  <script type="module">
    import '@felixgeelhaar/glaze-components';
  </script>
</body>
</html>
```

### With a Framework

#### React

Use the dedicated React package for better integration:

```jsx
import { Button, Card } from '@felixgeelhaar/glaze-react';
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';

function App() {
  return (
    <Card variant="glass" size="lg">
      <h2>React App</h2>
      <Button variant="glass" onClick={() => console.log('Clicked!')}>
        Glass Button
      </Button>
    </Card>
  );
}
```

#### Vue

Use the dedicated Vue package for better integration:

```vue
<template>
  <GlzCard variant="glass" size="lg">
    <h2>Vue App</h2>
    <GlzButton variant="glass" @click="handleClick">
      Glass Button
    </GlzButton>
  </GlzCard>
</template>

<script setup>
import { GlzButton, GlzCard } from '@felixgeelhaar/glaze-vue';
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';

const handleClick = () => {
  console.log('Clicked!');
};
</script>
```

### CLI Quick Start

Get started even faster with the CLI:

```bash
npm install -g @felixgeelhaar/glaze-cli

# Create a new project
glaze init my-app --framework react --typescript

# Add to existing project
glaze add --framework vue
```

## 🎨 Full Component Preview

![Full Page Demo](./screenshots/full-page.png)

*Complete demo showcasing all components in action*

## 🧩 Components

### Layout & Structure
- **Card** - Container with header, content, and footer slots
- **Navbar** - Navigation bar with brand, nav items, and actions
- **Accordion** - Collapsible content sections
- **Tabs** - Tabbed interface with panels

### Forms & Inputs
- **Button** - Various styles including glass, outline, and solid
- **Input** - Text input with validation support
- **Select** - Dropdown selection component
- **Form** - Form wrapper with validation

### Navigation
- **Breadcrumb** - Hierarchical navigation
- **Pagination** - Page navigation with multiple modes
- **Dropdown** - Contextual dropdown menus
- **Tooltip** - Contextual information on hover/click

### Feedback
- **Dialog** - Modal dialogs with backdrop
- **Toast** - Non-blocking notifications
- **Badge** - Status indicators and counts
- **Progress** - Linear, circular, and segmented progress

### Data Display
- **Table** - Data table with sorting and filtering
- **Chip** - Interactive tags and filters
- **Skeleton** - Loading placeholders

## 🎨 Theming

### CSS Variables

Customize the appearance using CSS variables:

```css
:root {
  /* Colors */
  --color-primary-base: #4F46E5;
  --color-primary-on: #EEF2FF;
  --color-accent-base: #DB2777;
  
  /* Glass effects */
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 18px;
  
  /* Opacity */
  --opacity-glass-sm: 0.12;
  --opacity-glass-md: 0.18;
  --opacity-glass-lg: 0.24;
  
  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}
```

### Theme Switching

```javascript
// Apply dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Apply high contrast theme
document.documentElement.setAttribute('data-theme', 'high-contrast');
```

## 📖 Documentation

### Storybook

View interactive documentation and examples:

```bash
npm run storybook
```

Visit http://localhost:6006 to explore all components.

### Component Examples

#### Glass Card with Actions
```html
<glz-card variant="glass" elevated>
  <h3 slot="header">Product Card</h3>
  <img src="product.jpg" alt="Product" />
  <p>Premium quality product with modern design.</p>
  <div slot="footer">
    <glz-button variant="glass">Add to Cart</glz-button>
    <glz-button variant="glass-outline">View Details</glz-button>
  </div>
</glz-card>
```

#### Form with Validation
```html
<glz-form @glz-form-submit="${handleSubmit}">
  <glz-input
    label="Email"
    type="email"
    required
    error-message="Please enter a valid email"
  ></glz-input>
  
  <glz-select
    label="Country"
    required
    .options="${countries}"
  ></glz-select>
  
  <glz-button type="submit" variant="glass">
    Submit
  </glz-button>
</glz-form>
```

#### Data Table with Sorting
```html
<glz-table
  .columns="${[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' }
  ]}"
  .data="${users}"
  searchable
  selectable
  @glz-table-sort="${handleSort}"
></glz-table>
```

## 🏗️ Project Structure

```
glaze-design-system/
├── packages/
│   ├── components/     # Web Components library
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   └── ...
│   │   └── dist/
│   ├── tokens/         # Design tokens
│   │   ├── src/
│   │   └── dist/
│   ├── engine/         # Core utilities
│   └── docs/          # Documentation site
├── .storybook/        # Storybook configuration
└── README.md
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm 8+

### Setup
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run Storybook
pnpm storybook

# Run tests
pnpm test

# Lint code
pnpm lint
```

### Creating a New Component

1. Create component directory:
```bash
mkdir packages/components/src/my-component
```

2. Implement the component:
```typescript
// packages/components/src/my-component/glz-my-component.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('glz-my-component')
export class GlzMyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property() message = 'Hello';

  render() {
    return html`<div>${this.message}</div>`;
  }
}
```

3. Add exports and create stories for documentation.

## 📦 Publishing

The project is configured for automated npm publishing via GitHub Actions. To enable:
1. Add `NPM_TOKEN` secret to GitHub repository settings
2. Remove `--dry-run` flag from `.github/workflows/release.yml`
3. Create changesets with `pnpm changeset`
4. Push to main branch to trigger release

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © 2025 Glaze Design System

## 🙏 Acknowledgments

Built with:
- [Lit](https://lit.dev/) - Simple, fast web components
- [Storybook](https://storybook.js.org/) - Component documentation
- [Style Dictionary](https://amzn.github.io/style-dictionary/) - Design tokens
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

- [Documentation](https://glaze-design-system.vercel.app)
- [GitHub Issues](https://github.com/glaze-design-system/glaze/issues)

---

<p align="center">Made with ❤️ by the Glaze Team</p>
# @felixgeelhaar/glaze-components

Beautiful glassmorphism Web Components built with Lit

## Installation

```bash
npm install @felixgeelhaar/glaze-components
# or
pnpm add @felixgeelhaar/glaze-components
# or
yarn add @felixgeelhaar/glaze-components
```

## Usage

### As Web Components (Works with any framework)

```html
<!-- Import the components -->
<script type="module">
  import '@felixgeelhaar/glaze-components';
</script>

<!-- Import the styles -->
<link rel="stylesheet" href="node_modules/@felixgeelhaar/glaze-components/dist/styles/tokens.css">
<link rel="stylesheet" href="node_modules/@felixgeelhaar/glaze-components/dist/styles/components.css">

<!-- Use the components -->
<glz-button variant="glass" size="md">
  Click me
</glz-button>

<glz-card variant="glass">
  <h2>Beautiful Card</h2>
  <p>With glassmorphism effect</p>
</glz-card>
```

### With React

See [@felixgeelhaar/glaze-react](https://www.npmjs.com/package/@felixgeelhaar/glaze-react)

### With Vue

See [@felixgeelhaar/glaze-vue](https://www.npmjs.com/package/@felixgeelhaar/glaze-vue)

## Available Components

- **glz-button** - Versatile button with multiple variants
- **glz-card** - Container with glassmorphism effects
- **glz-dialog** - Modal dialog component
- **glz-input** - Form input with validation
- **glz-select** - Dropdown select component
- **glz-navbar** - Navigation bar
- **glz-toast** - Toast notifications
- **glz-accordion** - Collapsible content panels
- **glz-spinner** - Loading spinner
- **glz-switch** - Toggle switch

## Component Properties

### Button (glz-button)

```html
<glz-button 
  variant="glass|solid|ghost"
  size="sm|md|lg"
  tone="primary|accent|neutral"
  disabled
  loading
>
  Button Text
</glz-button>
```

### Card (glz-card)

```html
<glz-card
  variant="glass|solid|ghost"
  size="sm|md|lg"
  tone="primary|accent|neutral"
>
  <slot>Content goes here</slot>
</glz-card>
```

### Dialog (glz-dialog)

```html
<glz-dialog
  open
  variant="glass|solid"
  label="Dialog Title"
>
  <slot>Dialog content</slot>
</glz-dialog>
```

## Styling

The components use CSS custom properties for theming:

```css
:root {
  --glz-primary: #6366f1;
  --glz-accent: #f472b6;
  --glz-neutral: #64748b;
  --glz-radius-sm: 0.5rem;
  --glz-radius-md: 0.75rem;
  --glz-radius-lg: 1rem;
  --glz-blur: 12px;
  --glz-opacity: 0.8;
}
```

## Features

- 🎨 **Beautiful glassmorphism effects** - Modern frosted glass aesthetics
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🎯 **Framework agnostic** - Works with any framework or vanilla JS
- 📱 **Responsive** - Mobile-first design
- 🌙 **Dark mode support** - Looks great in light and dark themes
- ⚡ **Performant** - Built with Lit for optimal performance
- 🎭 **Customizable** - Extensive theming options

## Browser Support

- Chrome/Edge 61+
- Firefox 63+
- Safari 10.1+

## License

MIT

## Links

- [GitHub Repository](https://github.com/felixgeelhaar/glaze)
- [Documentation](https://github.com/felixgeelhaar/glaze#readme)
- [Issue Tracker](https://github.com/felixgeelhaar/glaze/issues)
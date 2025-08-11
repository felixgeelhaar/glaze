# @felixgeelhaar/glaze-engine

CSS framework engine for the Glaze Design System - Tailwind CSS and UnoCSS integration

## Installation

```bash
npm install @felixgeelhaar/glaze-engine @felixgeelhaar/glaze-tokens
# or
pnpm add @felixgeelhaar/glaze-engine @felixgeelhaar/glaze-tokens
# or
yarn add @felixgeelhaar/glaze-engine @felixgeelhaar/glaze-tokens
```

## Usage

### With Tailwind CSS

```javascript
// tailwind.config.js
import { glazePlugin } from '@felixgeelhaar/glaze-engine/plugin';
import { glazePreset } from '@felixgeelhaar/glaze-engine/preset';

export default {
  presets: [glazePreset],
  plugins: [glazePlugin],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}'
  ]
}
```

### With UnoCSS

```javascript
// uno.config.js
import { defineConfig } from 'unocss';
import { glazePreset } from '@felixgeelhaar/glaze-engine/unocss';

export default defineConfig({
  presets: [glazePreset()],
  // your other configs
})
```

## Features

### Glassmorphism Utilities

```html
<!-- Glass backgrounds -->
<div class="glass-bg glass-blur-md glass-opacity-80">
  Frosted glass effect
</div>

<!-- Glass cards -->
<div class="glass-card glass-border glass-shadow-lg">
  Beautiful glass card
</div>

<!-- Glass buttons -->
<button class="glass-button glass-hover glass-active">
  Click me
</button>
```

### Custom Utilities

The engine provides specialized utilities for glassmorphism:

- **Backdrop Filters**
  - `glass-blur-{sm|md|lg|xl}` - Backdrop blur effects
  - `glass-saturate-{50|100|150|200}` - Backdrop saturation
  - `glass-brightness-{50|75|100|125|150}` - Backdrop brightness

- **Glass Backgrounds**
  - `glass-bg` - Semi-transparent glass background
  - `glass-bg-primary` - Tinted glass backgrounds
  - `glass-bg-accent`
  - `glass-bg-neutral`

- **Glass Borders**
  - `glass-border` - Subtle glass border
  - `glass-border-{t|r|b|l}` - Directional borders
  - `glass-divide` - Glass dividers between children

- **Glass Effects**
  - `glass-shadow-{sm|md|lg|xl}` - Elevated glass shadows
  - `glass-glow` - Glowing glass effect
  - `glass-shimmer` - Animated shimmer effect

### Component Classes

Pre-built component styles:

```html
<!-- Buttons -->
<button class="glz-btn glz-btn-primary glz-btn-lg">
  Large Primary Button
</button>

<!-- Cards -->
<div class="glz-card glz-card-glass">
  Card content
</div>

<!-- Inputs -->
<input class="glz-input glz-input-glass" placeholder="Enter text">

<!-- Modals -->
<div class="glz-modal glz-modal-glass">
  Modal content
</div>
```

### Theme Support

```html
<!-- Automatic theme switching -->
<div class="glass-bg dark:glass-bg-dark">
  Adapts to light/dark mode
</div>

<!-- High contrast mode -->
<div class="contrast:glass-border-strong">
  Enhanced borders in high contrast
</div>

<!-- Reduced motion -->
<div class="motion-safe:glass-shimmer motion-reduce:glass-static">
  Respects motion preferences
</div>
```

## Configuration

### Customizing the Plugin

```javascript
// tailwind.config.js
import { glazePlugin } from '@felixgeelhaar/glaze-engine/plugin';

export default {
  plugins: [
    glazePlugin({
      // Enable/disable features
      glass: true,
      animations: true,
      components: true,
      
      // Customize values
      blur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '24px',
        xl: '40px'
      },
      
      // Add custom variants
      variants: {
        'high-contrast': '@media (prefers-contrast: high)'
      }
    })
  ]
}
```

### Extending the Preset

```javascript
// tailwind.config.js
import { glazePreset } from '@felixgeelhaar/glaze-engine/preset';

const customPreset = {
  ...glazePreset,
  theme: {
    ...glazePreset.theme,
    extend: {
      ...glazePreset.theme.extend,
      // Your custom extensions
      colors: {
        brand: '#your-color'
      }
    }
  }
}

export default {
  presets: [customPreset]
}
```

## Performance

The engine is optimized for production:

- **PurgeCSS compatible** - Unused styles are removed
- **JIT mode support** - Generate styles on-demand
- **Minimal runtime** - No JavaScript required in production
- **Efficient selectors** - Optimized for browser performance

## Browser Support

- Chrome/Edge 61+
- Firefox 63+
- Safari 10.1+
- iOS Safari 10.3+
- Chrome Android 61+

Note: Backdrop filters require modern browser support. The engine includes fallbacks for older browsers.

## License

MIT

## Links

- [GitHub Repository](https://github.com/felixgeelhaar/glaze)
- [Documentation](https://github.com/felixgeelhaar/glaze#readme)
- [Tailwind CSS](https://tailwindcss.com)
- [UnoCSS](https://unocss.dev)
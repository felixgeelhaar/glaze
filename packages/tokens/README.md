# @felixgeelhaar/glaze-tokens

Design tokens for the Glaze Design System

## Installation

```bash
npm install @felixgeelhaar/glaze-tokens
# or
pnpm add @felixgeelhaar/glaze-tokens
# or
yarn add @felixgeelhaar/glaze-tokens
```

## Usage

### CSS Variables

```css
/* Import CSS tokens in your stylesheet */
@import '@felixgeelhaar/glaze-tokens/dist/css/tokens.css';

/* Use the tokens */
.my-element {
  color: var(--glz-color-primary-500);
  background: var(--glz-color-glass-bg);
  border-radius: var(--glz-radius-md);
  backdrop-filter: blur(var(--glz-blur-md));
}
```

### JavaScript/TypeScript

```typescript
import { tokens } from '@felixgeelhaar/glaze-tokens';

// Access token values
console.log(tokens.color.primary[500]); // '#6366f1'
console.log(tokens.spacing.md); // '1rem'
console.log(tokens.blur.md); // '12px'
```

### With Tailwind CSS

```javascript
// tailwind.config.js
import { tokens } from '@felixgeelhaar/glaze-tokens';

export default {
  theme: {
    extend: {
      colors: tokens.color,
      spacing: tokens.spacing,
      borderRadius: tokens.radius,
    }
  }
}
```

## Available Tokens

### Colors
- **Primary**: 50-950 shades
- **Accent**: 50-950 shades  
- **Neutral**: 50-950 shades
- **Glass**: Special glassmorphism colors
  - `glass-bg`: Semi-transparent backgrounds
  - `glass-border`: Subtle borders
  - `glass-shadow`: Elevation shadows

### Spacing
- `xs`: 0.25rem
- `sm`: 0.5rem
- `md`: 1rem
- `lg`: 1.5rem
- `xl`: 2rem
- `2xl`: 3rem
- `3xl`: 4rem

### Typography
- **Font Families**: System font stacks
- **Font Sizes**: xs to 5xl
- **Font Weights**: 300-900
- **Line Heights**: tight, normal, relaxed

### Effects
- **Blur**: sm (8px), md (12px), lg (24px), xl (40px)
- **Opacity**: 0-100 in steps of 10
- **Border Radius**: sm, md, lg, xl, full
- **Shadows**: sm, md, lg, xl with glass variants

### Animation
- **Durations**: fast (150ms), normal (300ms), slow (500ms)
- **Easings**: ease-in, ease-out, ease-in-out, spring

## Token Formats

This package provides tokens in multiple formats:

- **CSS**: Custom properties for web usage
- **TypeScript**: Type-safe token objects
- **JSON**: Raw token values for custom tooling
- **Figma**: Design tokens for Figma plugins

```javascript
// Access different formats
import '@felixgeelhaar/glaze-tokens/dist/css/tokens.css';
import { tokens } from '@felixgeelhaar/glaze-tokens';
import figmaTokens from '@felixgeelhaar/glaze-tokens/figma';
```

## Theming

The tokens support multiple themes:

```css
/* Light theme (default) */
:root {
  --glz-color-primary-500: #6366f1;
  --glz-color-background: #ffffff;
}

/* Dark theme */
[data-theme="dark"] {
  --glz-color-primary-500: #818cf8;
  --glz-color-background: #0f172a;
}

/* High contrast */
[data-theme="high-contrast"] {
  --glz-color-primary-500: #4338ca;
  --glz-color-background: #000000;
}
```

## Integration

Works seamlessly with:
- [@felixgeelhaar/glaze-components](https://www.npmjs.com/package/@felixgeelhaar/glaze-components)
- [@felixgeelhaar/glaze-engine](https://www.npmjs.com/package/@felixgeelhaar/glaze-engine)
- Tailwind CSS
- UnoCSS
- CSS-in-JS libraries

## License

MIT

## Links

- [GitHub Repository](https://github.com/felixgeelhaar/glaze)
- [Documentation](https://github.com/felixgeelhaar/glaze#readme)
- [Issue Tracker](https://github.com/felixgeelhaar/glaze/issues)
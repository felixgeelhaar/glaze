# @felixgeelhaar/glaze-react

React components for the Glaze Design System

## Installation

```bash
npm install @felixgeelhaar/glaze-react @felixgeelhaar/glaze-components
# or
pnpm add @felixgeelhaar/glaze-react @felixgeelhaar/glaze-components
# or
yarn add @felixgeelhaar/glaze-react @felixgeelhaar/glaze-components
```

## Setup

```jsx
// Import styles (in your app's entry point)
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';

// Import components
import { Button, Card, Dialog, Input, Select, Toast } from '@felixgeelhaar/glaze-react';
```

## Usage

### Basic Example

```jsx
import React, { useState } from 'react';
import { Button, Card, Dialog, Input } from '@felixgeelhaar/glaze-react';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card variant="glass" size="lg">
      <h2>Welcome to Glaze</h2>
      
      <Input 
        label="Your Name"
        placeholder="Enter your name"
        helperText="We'll use this to personalize your experience"
      />
      
      <Button 
        variant="glass" 
        tone="primary"
        onClick={() => setDialogOpen(true)}
      >
        Open Dialog
      </Button>
      
      <Dialog 
        open={dialogOpen}
        onGlzDialogClose={() => setDialogOpen(false)}
        label="Hello!"
      >
        <p>This is a beautiful glassmorphism dialog.</p>
        <Button onClick={() => setDialogOpen(false)}>
          Close
        </Button>
      </Dialog>
    </Card>
  );
}
```

## Components

### Button

```jsx
<Button
  variant="glass" // "glass" | "solid" | "ghost"
  size="md"       // "sm" | "md" | "lg"
  tone="primary"  // "primary" | "accent" | "neutral"
  disabled={false}
  loading={false}
  onClick={handleClick}
>
  Click Me
</Button>
```

### Card

```jsx
<Card
  variant="glass"
  size="md"
  tone="neutral"
  className="custom-class"
>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

### Dialog

```jsx
<Dialog
  open={isOpen}
  variant="glass"
  label="Dialog Title"
  onGlzDialogClose={handleClose}
>
  <p>Dialog content</p>
  <Button onClick={handleClose}>Close</Button>
</Dialog>
```

### Input

```jsx
<Input
  type="text"
  label="Email Address"
  placeholder="email@example.com"
  helperText="We'll never share your email"
  error={false}
  errorMessage=""
  required={true}
  disabled={false}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Select

```jsx
<Select
  label="Choose an option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ]}
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
  placeholder="Select..."
  helperText="Pick your favorite"
/>
```

### Toast

```jsx
<Toast
  type="success" // "info" | "success" | "warning" | "error"
  title="Success!"
  message="Your changes have been saved"
  position="bottom-right"
  duration={5000}
  open={showToast}
  onGlzToastClose={() => setShowToast(false)}
/>
```

### Navbar

```jsx
<Navbar
  variant="glass"
  brand="My App"
  brandHref="/"
  sticky={true}
>
  <a href="/features">Features</a>
  <a href="/pricing">Pricing</a>
  <a href="/about">About</a>
</Navbar>
```

## TypeScript Support

All components are fully typed. Import types for better IDE support:

```typescript
import { 
  Button, 
  ButtonProps,
  Card,
  CardProps,
  Dialog,
  DialogProps 
} from '@felixgeelhaar/glaze-react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Styling

### Using CSS Classes

Components accept standard `className` props:

```jsx
<Button className="my-custom-button" variant="glass">
  Styled Button
</Button>
```

### CSS Variables

Customize the theme using CSS variables:

```css
:root {
  --glz-primary: #6366f1;
  --glz-accent: #f472b6;
  --glz-radius-md: 0.75rem;
  --glz-blur-md: 12px;
}
```

### With Tailwind CSS

Components work great with Tailwind CSS:

```jsx
<Card className="p-6 m-4 hover:scale-105 transition-transform">
  <h2 className="text-2xl font-bold mb-4">Tailwind + Glaze</h2>
</Card>
```

## Features

- 🎨 **Beautiful glassmorphism effects** - Modern frosted glass aesthetics
- ⚛️ **React 18+ support** - Latest React features
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🎯 **TypeScript** - Full type definitions
- 🎭 **Customizable** - Override any style
- ⚡ **Performant** - Optimized re-renders
- 🌙 **Dark mode** - Automatic theme support

## SSR Support

The components work with Next.js, Remix, and other SSR frameworks:

```jsx
// Next.js app/layout.tsx
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';

// Next.js pages or app directory
import { Button } from '@felixgeelhaar/glaze-react';

export default function Page() {
  return <Button>Works with SSR!</Button>;
}
```

## Browser Support

- Chrome/Edge 61+
- Firefox 63+
- Safari 10.1+
- iOS Safari 10.3+
- Chrome Android 61+

## License

MIT

## Links

- [GitHub Repository](https://github.com/felixgeelhaar/glaze)
- [Documentation](https://github.com/felixgeelhaar/glaze#readme)
- [Issue Tracker](https://github.com/felixgeelhaar/glaze/issues)
- [Web Components](https://www.npmjs.com/package/@felixgeelhaar/glaze-components)
# @felixgeelhaar/glaze-vue

Vue 3 components for the Glaze Design System

## Installation

```bash
npm install @felixgeelhaar/glaze-vue @felixgeelhaar/glaze-components
# or
pnpm add @felixgeelhaar/glaze-vue @felixgeelhaar/glaze-components
# or
yarn add @felixgeelhaar/glaze-vue @felixgeelhaar/glaze-components
```

## Setup

### Global Installation

```javascript
// main.js or main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { GlazePlugin } from '@felixgeelhaar/glaze-vue';

// Import styles
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';

const app = createApp(App);
app.use(GlazePlugin);
app.mount('#app');
```

### Individual Component Import

```vue
<script setup>
import { GlzButton, GlzCard, GlzDialog } from '@felixgeelhaar/glaze-vue';
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';
</script>

<template>
  <GlzButton variant="glass" tone="primary">
    Click Me
  </GlzButton>
</template>
```

## Usage

### Basic Example

```vue
<template>
  <div class="app">
    <GlzCard variant="glass" size="lg">
      <h2>Welcome to Glaze Vue</h2>
      
      <GlzInput
        v-model="name"
        label="Your Name"
        placeholder="Enter your name"
        helper-text="We'll use this to personalize your experience"
      />
      
      <GlzButton
        variant="glass"
        tone="primary"
        @click="showDialog = true"
      >
        Open Dialog
      </GlzButton>
      
      <GlzDialog
        v-model:open="showDialog"
        label="Hello!"
      >
        <p>This is a beautiful glassmorphism dialog.</p>
        <GlzButton @click="showDialog = false">
          Close
        </GlzButton>
      </GlzDialog>
    </GlzCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const showDialog = ref(false);
</script>
```

## Components

### GlzButton

```vue
<GlzButton
  variant="glass"     // "glass" | "solid" | "ghost"
  size="md"          // "sm" | "md" | "lg"
  tone="primary"     // "primary" | "accent" | "neutral"
  :disabled="false"
  :loading="false"
  @click="handleClick"
>
  Click Me
</GlzButton>
```

### GlzCard

```vue
<GlzCard
  variant="glass"
  size="md"
  tone="neutral"
  class="custom-class"
>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</GlzCard>
```

### GlzDialog

```vue
<GlzDialog
  v-model:open="isOpen"
  variant="glass"
  label="Dialog Title"
>
  <p>Dialog content</p>
  <GlzButton @click="isOpen = false">Close</GlzButton>
</GlzDialog>
```

### GlzInput

```vue
<GlzInput
  v-model="inputValue"
  type="text"
  label="Email Address"
  placeholder="email@example.com"
  helper-text="We'll never share your email"
  :error="false"
  error-message=""
  :required="true"
  :disabled="false"
/>
```

### GlzSelect

```vue
<GlzSelect
  v-model="selectedValue"
  label="Choose an option"
  :options="[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true }
  ]"
  placeholder="Select..."
  helper-text="Pick your favorite"
/>
```

### GlzToast

```vue
<GlzToast
  v-model:open="showToast"
  type="success"      // "info" | "success" | "warning" | "error"
  title="Success!"
  message="Your changes have been saved"
  position="bottom-right"
  :duration="5000"
/>
```

### GlzNavbar

```vue
<GlzNavbar
  variant="glass"
  brand="My App"
  brand-href="/"
  :sticky="true"
>
  <a href="/features">Features</a>
  <a href="/pricing">Pricing</a>
  <a href="/about">About</a>
</GlzNavbar>
```

## Composition API

### useGlaze

```vue
<script setup>
import { useGlaze } from '@felixgeelhaar/glaze-vue';

const { toast, dialog } = useGlaze();

// Show a toast
toast.success('Operation completed!');
toast.error('Something went wrong');
toast.info('Here is some information');
toast.warning('Please be careful');

// Show a dialog
const confirmed = await dialog.confirm('Are you sure?');
if (confirmed) {
  // User clicked confirm
}
</script>
```

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import type { 
  GlzButtonProps,
  GlzCardProps,
  GlzDialogProps,
  GlzInputProps 
} from '@felixgeelhaar/glaze-vue';

// Use in component props
defineProps<GlzButtonProps>();
```

## Styling

### Using CSS Classes

Components accept standard `class` attributes:

```vue
<GlzButton class="my-custom-button" variant="glass">
  Styled Button
</GlzButton>
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

Components work seamlessly with Tailwind:

```vue
<GlzCard class="p-6 m-4 hover:scale-105 transition-transform">
  <h2 class="text-2xl font-bold mb-4">Tailwind + Glaze</h2>
</GlzCard>
```

## Features

- 🎨 **Beautiful glassmorphism effects** - Modern frosted glass aesthetics
- ⚡ **Vue 3 Composition API** - Built for modern Vue
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🎯 **TypeScript** - Full type definitions
- 🎭 **Customizable** - Override any style
- ⚡ **Performant** - Optimized Vue components
- 🌙 **Dark mode** - Automatic theme support

## Nuxt 3 Support

### Installation

```bash
# Install dependencies
pnpm add @felixgeelhaar/glaze-vue @felixgeelhaar/glaze-components
```

### Setup

Create a plugin:

```javascript
// plugins/glaze.client.js
import { GlazePlugin } from '@felixgeelhaar/glaze-vue';
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(GlazePlugin);
});
```

### Usage in Nuxt

```vue
<template>
  <GlzButton variant="glass">
    Works in Nuxt!
  </GlzButton>
</template>
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
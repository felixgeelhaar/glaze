# Glaze Design System - Quick Start Guide

🎉 **Your design system is ready to use!** This guide will help you start using the Glaze components immediately.

## 🚀 Immediate Usage

### Option 1: Local Development (Recommended)
Your components are already built and ready to use locally:

```bash
# In your project directory
cd /Users/felixgeelhaar/Developer/projects/glaze-design-system

# View documentation
pnpm dev
# Visit: http://localhost:6006

# Use in your own project
import '@glaze/components';
```

### Option 2: Copy Components
Copy the built components to your project:

```bash
# Copy the entire dist folder to your project
cp -r packages/components/dist/ /your-project/src/glaze-components/

# In your HTML/JS
<script type="module" src="./glaze-components/index.js"></script>
```

## 💡 Quick Examples

### Basic Usage
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./glaze-components/styles/tokens.css">
</head>
<body>
  <!-- Glass Card -->
  <glz-card variant="glass">
    <h2 slot="header">Welcome to Glaze</h2>
    <p>Beautiful glassmorphism components ready to use!</p>
    <div slot="footer">
      <glz-button variant="glass">Get Started</glz-button>
    </div>
  </glz-card>

  <!-- Load components -->
  <script type="module" src="./glaze-components/index.js"></script>
</body>
</html>
```

### React Integration
```jsx
// App.jsx
import './glaze-components/styles/tokens.css';
import './glaze-components/index.js';

function App() {
  return (
    <div className="App">
      <glz-navbar variant="glass">
        <span slot="brand">My App</span>
        <a href="#" slot="nav">Home</a>
        <a href="#" slot="nav">About</a>
      </glz-navbar>
      
      <main style={{ padding: '2rem' }}>
        <glz-card variant="glass">
          <h1 slot="header">React + Glaze</h1>
          <p>Web Components work perfectly with React!</p>
        </glz-card>
      </main>
    </div>
  );
}
```

### Vue Integration
```vue
<template>
  <div id="app">
    <glz-navbar variant="glass">
      <span slot="brand">Vue App</span>
      <a href="#" slot="nav">Home</a>
    </glz-navbar>
    
    <main style="padding: 2rem;">
      <glz-card variant="glass">
        <h1 slot="header">Vue + Glaze</h1>
        <p>Perfect integration with Vue!</p>
      </glz-card>
    </main>
  </div>
</template>

<script>
import './glaze-components/styles/tokens.css';
import './glaze-components/index.js';

export default {
  name: 'App'
}
</script>
```

## 🎨 Available Components

### All 20 Components Ready:
```html
<!-- Layout -->
<glz-card variant="glass">Content</glz-card>
<glz-navbar variant="glass">Navigation</glz-navbar>
<glz-tabs variant="glass">Tabbed Content</glz-tabs>
<glz-accordion variant="glass">Collapsible</glz-accordion>

<!-- Forms -->
<glz-button variant="glass">Click Me</glz-button>
<glz-input variant="glass" label="Name"></glz-input>
<glz-select variant="glass" label="Choose"></glz-select>
<glz-form>Form Container</glz-form>

<!-- Navigation -->
<glz-breadcrumb></glz-breadcrumb>
<glz-pagination current="1" total="10"></glz-pagination>
<glz-dropdown variant="glass">Menu</glz-dropdown>
<glz-tooltip content="Help">Hover me</glz-tooltip>

<!-- Feedback -->
<glz-dialog variant="glass">Modal</glz-dialog>
<glz-toast type="success">Success!</glz-toast>
<glz-badge value="5">Notifications</glz-badge>
<glz-progress value="50"></glz-progress>

<!-- Data -->
<glz-table searchable selectable></glz-table>
<glz-chip variant="glass">Tag</glz-chip>
<glz-skeleton type="card"></glz-skeleton>
```

## 🎯 Theme Customization

### CSS Variables
```css
:root {
  /* Override default colors */
  --color-primary-base: #your-color;
  --color-accent-base: #your-accent;
  
  /* Adjust glass effects */
  --blur-md: 16px;
  --opacity-glass-md: 0.25;
  
  /* Customize radius */
  --radius-md: 8px;
}
```

### Dark Mode
```javascript
// Toggle dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Back to light
document.documentElement.removeAttribute('data-theme');
```

## 📱 Responsive Example

```html
<div style="max-width: 1200px; margin: 0 auto; padding: 1rem;">
  <!-- Header -->
  <glz-navbar variant="glass">
    <span slot="brand">My App</span>
    <a href="#" slot="nav">Home</a>
    <a href="#" slot="nav">Products</a>
    <a href="#" slot="nav">Contact</a>
    <glz-button slot="actions" variant="glass" size="small">
      Sign In
    </glz-button>
  </glz-navbar>

  <!-- Main Content -->
  <main style="margin-top: 2rem;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <!-- Product Cards -->
      <glz-card variant="glass">
        <h3 slot="header">Premium Plan</h3>
        <div style="padding: 1rem;">
          <p style="font-size: 2rem; font-weight: bold;">$29/mo</p>
          <ul style="list-style: none; padding: 0;">
            <li>✨ All features</li>
            <li>🚀 Priority support</li>
            <li>📊 Advanced analytics</li>
          </ul>
        </div>
        <div slot="footer">
          <glz-button variant="glass" style="width: 100%;">
            Choose Plan
          </glz-button>
        </div>
      </glz-card>

      <glz-card variant="glass">
        <h3 slot="header">Starter Plan</h3>
        <div style="padding: 1rem;">
          <p style="font-size: 2rem; font-weight: bold;">$9/mo</p>
          <ul style="list-style: none; padding: 0;">
            <li>⚡ Core features</li>
            <li>📧 Email support</li>
            <li>📈 Basic analytics</li>
          </ul>
        </div>
        <div slot="footer">
          <glz-button variant="glass-outline" style="width: 100%;">
            Choose Plan
          </glz-button>
        </div>
      </glz-card>
    </div>

    <!-- Interactive Demo -->
    <div style="margin-top: 3rem;">
      <glz-card variant="glass">
        <h2 slot="header">Try the Components</h2>
        
        <glz-tabs variant="glass">
          <div slot="tab">Forms</div>
          <div slot="panel">
            <div style="display: grid; gap: 1rem; max-width: 400px;">
              <glz-input variant="glass" label="Your Name" placeholder="Enter name"></glz-input>
              <glz-select variant="glass" label="Country"></glz-select>
              <glz-button variant="glass">Submit</glz-button>
            </div>
          </div>
          
          <div slot="tab">Progress</div>
          <div slot="panel">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <glz-progress value="25" variant="glass"></glz-progress>
              <glz-progress value="50" variant="glass" color="success"></glz-progress>
              <glz-progress value="75" variant="glass" color="warning"></glz-progress>
            </div>
          </div>
          
          <div slot="tab">Data</div>
          <div slot="panel">
            <glz-table variant="glass" searchable></glz-table>
          </div>
        </glz-tabs>
      </glz-card>
    </div>
  </main>
</div>
```

## 🛠️ Development Commands

```bash
# View documentation
pnpm dev

# Build components
pnpm build

# Run tests
pnpm test

# Check bundle size
ls -lah packages/components/dist/glaze.min.js*
```

## 🌐 Publishing (When Ready)

```bash
# Publish to npm
cd packages/components
npm publish

# Or use the workspace command
pnpm changeset publish
```

## 💡 Tips for Success

1. **Start Small** - Begin with 1-2 components in your project
2. **Use Storybook** - Reference the examples for implementation
3. **Customize Gradually** - Override CSS variables as needed
4. **Test Accessibility** - Components are accessible by default
5. **Mobile First** - All components are responsive

## 🆘 Need Help?

- **Documentation**: http://localhost:6006 (run `pnpm dev`)
- **Examples**: Check the `/showcase/` stories
- **Issues**: Check the component source code in `/src/`
- **Customization**: Modify CSS variables in your project

---

🎉 **You're all set!** Your Glaze Design System is ready to create beautiful, accessible web applications with stunning glassmorphism design.

Start exploring the components in Storybook and begin building amazing user interfaces!
# @felixgeelhaar/glaze-cli

Command-line interface for the Glaze Design System

## Installation

```bash
npm install -g @felixgeelhaar/glaze-cli
# or
pnpm add -g @felixgeelhaar/glaze-cli
# or
yarn global add @felixgeelhaar/glaze-cli
```

## Usage

### Initialize a new project

```bash
glaze init my-project
```

This will create a new project with the Glaze Design System pre-configured.

### Add Glaze to an existing project

```bash
# In your project directory
glaze add
```

This command will:
1. Install necessary dependencies
2. Set up configuration files
3. Import required styles
4. Configure your build tools

### Add specific components

```bash
# Add individual components
glaze add button card dialog

# Add all components
glaze add --all
```

### Generate component wrappers

```bash
# Generate React wrappers
glaze generate react

# Generate Vue wrappers
glaze generate vue

# Generate Angular wrappers (coming soon)
glaze generate angular
```

## Commands

### `glaze init [project-name]`

Create a new project with Glaze Design System.

Options:
- `--framework <framework>` - Choose framework (react, vue, vanilla)
- `--typescript` - Use TypeScript
- `--tailwind` - Include Tailwind CSS integration
- `--git` - Initialize git repository
- `--install` - Install dependencies immediately

Example:
```bash
glaze init my-app --framework react --typescript --tailwind
```

### `glaze add [components...]`

Add Glaze components to your project.

Options:
- `--all` - Add all components
- `--framework <framework>` - Specify framework wrappers
- `--force` - Overwrite existing files

Example:
```bash
glaze add button card --framework vue
```

### `glaze generate <framework>`

Generate framework-specific component wrappers.

Supported frameworks:
- `react` - React components
- `vue` - Vue 3 components
- `angular` - Angular components (coming soon)
- `svelte` - Svelte components (coming soon)

Example:
```bash
glaze generate react --output ./src/components
```

### `glaze config`

Configure Glaze Design System settings.

Options:
- `--theme` - Configure theme settings
- `--tokens` - Customize design tokens
- `--css` - Configure CSS output

Example:
```bash
glaze config --theme
```

### `glaze update`

Update Glaze packages to the latest version.

Options:
- `--check` - Check for updates without installing
- `--major` - Include major version updates

Example:
```bash
glaze update --check
```

## Configuration

### `.glazerc.json`

Create a `.glazerc.json` file in your project root:

```json
{
  "framework": "react",
  "typescript": true,
  "components": ["button", "card", "dialog"],
  "theme": {
    "primary": "#6366f1",
    "accent": "#f472b6",
    "radius": "0.75rem"
  },
  "paths": {
    "components": "./src/components",
    "styles": "./src/styles"
  }
}
```

### Environment Variables

```bash
# Set default framework
export GLAZE_FRAMEWORK=vue

# Set default output directory
export GLAZE_OUTPUT=./src/glaze
```

## Project Templates

### React + TypeScript + Tailwind

```bash
glaze init my-react-app \
  --framework react \
  --typescript \
  --tailwind \
  --git
```

Creates a project with:
- React 18
- TypeScript
- Tailwind CSS with Glaze preset
- Vite build tool
- ESLint & Prettier
- Git repository

### Vue 3 + Composition API

```bash
glaze init my-vue-app \
  --framework vue \
  --typescript \
  --git
```

Creates a project with:
- Vue 3
- TypeScript
- Composition API setup
- Vite build tool
- ESLint & Prettier
- Git repository

### Vanilla JavaScript

```bash
glaze init my-vanilla-app \
  --framework vanilla \
  --git
```

Creates a project with:
- Vanilla JavaScript
- Web Components
- Vite build tool
- Git repository

## Integrations

### With existing React app

```bash
cd my-react-app
glaze add --framework react
```

This will:
1. Install `@felixgeelhaar/glaze-react` and `@felixgeelhaar/glaze-components`
2. Add style imports to your entry file
3. Provide usage examples

### With existing Vue app

```bash
cd my-vue-app
glaze add --framework vue
```

This will:
1. Install `@felixgeelhaar/glaze-vue` and `@felixgeelhaar/glaze-components`
2. Set up the Vue plugin
3. Add style imports
4. Provide usage examples

### With existing Tailwind project

```bash
glaze add --tailwind
```

This will:
1. Install `@felixgeelhaar/glaze-engine`
2. Update your `tailwind.config.js`
3. Add Glaze preset and plugin

## Troubleshooting

### Common Issues

**Issue:** Components not styling correctly
```bash
# Ensure styles are imported
glaze doctor styles
```

**Issue:** TypeScript errors
```bash
# Generate type definitions
glaze generate types
```

**Issue:** Build errors
```bash
# Check configuration
glaze doctor config
```

### Debug Mode

Run commands with debug output:
```bash
DEBUG=glaze:* glaze init my-project
```

### Getting Help

```bash
# Show help for any command
glaze help [command]

# Show version
glaze --version

# Check system compatibility
glaze doctor
```

## Features

- 🚀 **Quick setup** - Get started in seconds
- 📦 **Smart defaults** - Sensible configuration out of the box
- 🔧 **Customizable** - Fine-tune every aspect
- 🎨 **Theme generation** - Create custom themes
- 📝 **TypeScript support** - Full type safety
- 🔄 **Auto-updates** - Keep dependencies current
- 🏗️ **Scaffolding** - Generate boilerplate code
- 🔍 **Diagnostics** - Built-in troubleshooting

## License

MIT

## Links

- [GitHub Repository](https://github.com/felixgeelhaar/glaze)
- [Documentation](https://github.com/felixgeelhaar/glaze#readme)
- [Issue Tracker](https://github.com/felixgeelhaar/glaze/issues)
- [NPM Package](https://www.npmjs.com/package/@felixgeelhaar/glaze-cli)
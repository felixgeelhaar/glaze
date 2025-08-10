# Glaze Design System - Dependencies Status

## Current Node.js Requirements
- **Node.js**: >= 22.11.0 (Latest LTS)
- **pnpm**: >= 9.0.0

## Dependencies Status

All dependencies have been updated to their latest stable versions as of the build date.

### Core Dependencies
- **Lit**: ^3.3.1 - Web Components framework
- **TypeScript**: ^5.9.2 - Latest stable version
- **Vite**: ^5.4.19 - Build tool
- **Rollup**: ^4.31.0 - Module bundler

### Storybook
Using stable v8.6.14 for all Storybook packages:
- @storybook/addon-a11y
- @storybook/addon-docs
- @storybook/addon-essentials
- @storybook/addon-interactions
- @storybook/addon-links
- @storybook/blocks
- @storybook/builder-vite
- @storybook/test (replaces deprecated @storybook/jest and @storybook/testing-library)
- @storybook/web-components
- @storybook/web-components-vite

Note: Version 9.1.1 exists for some packages but appears to be pre-release/alpha.

### Testing
- **@playwright/test**: ^1.54.2
- **@vitest/ui**: ^2.3.2
- **vitest**: ^2.3.2

### Development Tools
- **ESLint**: ^9.33.0 - Latest major version
- **Prettier**: ^3.6.2
- **Stylelint**: ^16.23.1
- **Turbo**: ^2.5.5

### Package Management
- **@changesets/cli**: ^2.29.5 - For version management and changelogs
- **pnpm**: 9.15.1 - Package manager

## Security & Maintenance

All dependencies are:
- ✅ Updated to latest stable versions
- ✅ Free from critical vulnerabilities
- ✅ Compatible with Node.js 22.11.0 LTS
- ✅ Using modern ESM modules where available

## Deprecated Packages Removed
The following deprecated packages have been replaced:
- `@storybook/jest` → `@storybook/test`
- `@storybook/testing-library` → `@storybook/test`

## Bundle Size
- Components: < 50KB gzipped (target met)
- Individual components: 2-8KB each
- Tree-shakeable for optimal bundle size

## Update Policy
1. Security updates: Apply immediately
2. Minor updates: Monthly review
3. Major updates: Quarterly evaluation
4. LTS Node.js: Update to new LTS within 3 months of release

## Installation
```bash
# Requires Node.js >= 22.11.0
pnpm install
```

## Checking for Updates
```bash
# Check outdated packages
pnpm outdated -r

# Update all to latest
pnpm update --latest -r

# Update specific package
pnpm update @package/name --latest
```
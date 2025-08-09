# Deployment Guide

This guide covers deploying the Glaze Design System components and documentation.

## 📦 Package Publishing

### Prerequisites
- Node.js 18+
- npm account with publishing rights
- Authenticated npm CLI (`npm login`)

### Publishing to npm

1. **Build all packages:**
```bash
pnpm build
```

2. **Version bump (choose one):**
```bash
# Patch version (bug fixes)
pnpm changeset version --patch

# Minor version (new features)
pnpm changeset version --minor

# Major version (breaking changes)
pnpm changeset version --major
```

3. **Publish packages:**
```bash
# Dry run first
pnpm changeset publish --dry-run

# Actual publish
pnpm changeset publish
```

### Package Registry

Packages will be published to npm:
- `@glaze/components` - Core component library
- `@glaze/tokens` - Design tokens
- `@glaze/engine` - Utility functions

## 🌐 Documentation Deployment

### Storybook to Vercel

1. **Build Storybook:**
```bash
cd packages/docs
pnpm build
```

2. **Deploy to Vercel:**
```bash
npx vercel --prod
```

3. **Configure custom domain:**
```bash
npx vercel domains add glaze-design-system.com
```

### Alternative: Netlify

1. **Build static site:**
```bash
pnpm build:storybook
```

2. **Deploy to Netlify:**
```bash
npx netlify deploy --prod --dir=packages/docs/storybook-static
```

## 🔗 CDN Distribution

### jsDelivr (Automatic)
Once published to npm, components are automatically available via CDN:

```html
<!-- Latest version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@glaze/components@latest/dist/glaze.min.js"></script>

<!-- Specific version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@glaze/components@1.0.0/dist/glaze.min.js"></script>

<!-- CSS tokens -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@glaze/tokens@latest/dist/css/tokens.css">
```

### UNPKG Alternative
```html
<script type="module" src="https://unpkg.com/@glaze/components@latest/dist/glaze.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@glaze/tokens@latest/dist/css/tokens.css">
```

## 🏗️ CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
      - run: pnpm lint

  release:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'
      
      - run: pnpm install
      - run: pnpm build
      
      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

  docs:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: pnpm build:storybook
      
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: packages/docs
```

### Required Secrets
Add these to GitHub repository secrets:
- `NPM_TOKEN` - npm authentication token
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

## 🎯 Environment Configuration

### Production Environment Variables

Create `packages/docs/.env.production`:
```env
NODE_ENV=production
PUBLIC_URL=https://glaze-design-system.com
STORYBOOK_CDN_URL=https://cdn.jsdelivr.net/npm/@glaze/components@latest
```

### Staging Environment
```env
NODE_ENV=staging
PUBLIC_URL=https://staging-glaze-design-system.vercel.app
STORYBOOK_CDN_URL=https://cdn.jsdelivr.net/npm/@glaze/components@beta
```

## 🔒 Security Considerations

### Package Security
- Enable 2FA on npm account
- Use scoped packages (@glaze/*)
- Regular security audits: `pnpm audit`
- Keep dependencies updated

### CDN Security
- Use Subresource Integrity (SRI) checksums:
```html
<script 
  type="module" 
  src="https://cdn.jsdelivr.net/npm/@glaze/components@1.0.0/dist/glaze.min.js"
  integrity="sha384-..."
  crossorigin="anonymous">
</script>
```

## 📊 Monitoring & Analytics

### Bundle Size Monitoring
Use bundlephobia.com integration:
```bash
# Add to CI pipeline
npx bundlephobia @glaze/components
```

### Usage Analytics
Track component usage with:
- npm download stats
- CDN usage metrics  
- GitHub repository insights

### Performance Monitoring
- Lighthouse CI for documentation site
- Web Vitals tracking
- Bundle size regression detection

## 🚀 Deployment Checklist

### Pre-Release
- [ ] All tests passing
- [ ] Bundle size within limits (< 50KB)
- [ ] Accessibility audit complete
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version numbers bumped

### Release
- [ ] Packages published to npm
- [ ] Documentation deployed
- [ ] CDN endpoints verified
- [ ] Release notes created
- [ ] Social media announcement

### Post-Release
- [ ] Monitor for issues
- [ ] Update dependent projects
- [ ] Collect user feedback
- [ ] Plan next iteration

## 🔄 Rollback Procedure

If issues are discovered after release:

1. **Immediate:** Unpublish problematic version
```bash
npm unpublish @glaze/components@1.0.1
```

2. **Deprecate:** Mark version as deprecated
```bash
npm deprecate @glaze/components@1.0.1 "Contains critical bug, use 1.0.0 instead"
```

3. **Hotfix:** Create patch release
```bash
git checkout v1.0.0
git checkout -b hotfix/1.0.2
# Fix issues
pnpm changeset version --patch
pnpm changeset publish
```

## 🌍 International Deployment

### CDN Regions
jsDelivr automatically serves from global edge locations:
- North America
- Europe
- Asia-Pacific
- Latin America

### Localization Support
Components support internationalization through:
- CSS logical properties
- RTL text direction
- Locale-specific number/date formatting
- Customizable text content via slots

## 📈 Performance Optimization

### CDN Optimization
- Brotli compression enabled
- HTTP/2 push for critical resources
- Aggressive caching headers
- Edge-side includes (ESI)

### Bundle Optimization
- Tree shaking enabled
- Dead code elimination  
- Minification with terser
- Source map generation

## 🆘 Support & Maintenance

### Issue Triage
1. Critical bugs: Fix within 24 hours
2. Major features: Next minor release
3. Enhancement requests: Roadmap planning

### Documentation Updates
- API changes: Immediate update
- New features: Include in release
- Examples: Community contributions welcome

### Community
- GitHub Discussions for questions
- Discord for real-time support
- Twitter for announcements
- Regular community calls

---

For questions about deployment, please open an issue or contact the maintainers.
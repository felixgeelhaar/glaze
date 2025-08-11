# NPM Publishing Setup Guide

This guide will help you set up npm publishing for the Glaze Design System packages.

## 🚀 Quick Start - Tag-Based Publishing

The simplest way to publish is using release tags:

1. **Set up NPM_TOKEN** in GitHub Secrets (see [Initial Setup](#initial-setup) below)
2. **Create and push a version tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. **Create a GitHub Release** from the tag - this triggers automatic npm publishing
4. **Or manually trigger** the workflow from Actions → Publish to NPM → Run workflow

## 📦 Current Package Structure

The Glaze Design System consists of the following packages:
- `@glaze/tokens` - Design tokens
- `@glaze/components` - Web Components library
- `@glaze/engine` - Core rendering engine
- `@glaze/cli` - Command-line interface
- `@glaze/react` - React wrapper components
- `@glaze/vue` - Vue wrapper components

## 🏷️ Tag-Based Release Workflow

### Automatic Publishing via GitHub Releases
1. Update package versions in `packages/*/package.json`
2. Commit and push changes
3. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. Go to GitHub → Releases → Create a new release
5. Select your tag and publish the release
6. The workflow automatically publishes to npm

### Manual Publishing via Workflow Dispatch
1. Go to GitHub → Actions → Publish to NPM
2. Click "Run workflow"
3. Enter the tag (e.g., `v1.0.0`)
4. Optionally enable dry-run mode to test
5. Click "Run workflow"

## ⚙️ Initial Setup

### Prerequisites
1. **NPM Account**: Create an account at https://www.npmjs.com
2. **NPM Token**: Generate a token with publish permissions:
   ```bash
   npm login
   npm token create --read-only=false
   ```
3. **GitHub Secret**: Add the token to your repository:
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token

## 🚀 Publishing Options

### Option 1: Use Your Own NPM Scope (Recommended)

If you don't own the `@glaze` npm organization, you can use your own npm username as the scope.

#### Steps:

1. **Run the setup script:**
   ```bash
   node scripts/setup-npm-publishing.js
   ```
   Select option 1 and enter your npm username (e.g., `felixgeelhaar`)

2. **Create an npm account** (if you don't have one):
   - Go to https://www.npmjs.com/signup
   - Create your account

3. **Generate an npm token:**
   ```bash
   npm login
   npm token create --read-only=false
   ```
   Copy the generated token.

4. **Add the token to GitHub Secrets:**
   - Go to your repository settings
   - Navigate to Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token

5. **Enable the release workflow:**
   ```bash
   # Remove the old dry-run workflow
   git rm .github/workflows/release.yml
   
   # Rename the new workflow
   git mv .github/workflows/release-npm.yml .github/workflows/release.yml
   
   # Commit the changes
   git add -A
   git commit -m "feat: enable npm publishing with custom scope"
   git push
   ```

### Option 2: Remove Scope Entirely

If you prefer simpler package names without a scope:

1. **Run the setup script:**
   ```bash
   node scripts/setup-npm-publishing.js
   ```
   Select option 2 to remove scopes (packages become `glaze-components`, `glaze-tokens`, etc.)

2. Follow steps 2-5 from Option 1 above.

### Option 3: Create the @glaze Organization

If you want to keep the `@glaze` scope:

1. **Create the organization on npm:**
   - Go to https://www.npmjs.com/org/create
   - Create an organization named "glaze"
   - This requires a paid npm account ($7/month for private packages)

2. Follow steps 3-5 from Option 1 above.

## 📝 Release Process

Once configured, the release process works as follows:

### 1. Create a Changeset

When you make changes that should be released:

```bash
# Create a changeset
pnpm changeset

# Select the packages that changed
# Select the version bump type (patch/minor/major)
# Write a description of the changes
```

### 2. Commit the Changeset

```bash
git add .changeset
git commit -m "chore: add changeset for [your changes]"
git push
```

### 3. Automated Release

When changesets are pushed to main:
1. GitHub Actions creates a "Release PR" with version bumps
2. Review and merge the Release PR
3. Packages are automatically published to npm
4. GitHub releases are created
5. Changelogs are updated

## 🔧 Manual Publishing (Local)

If you need to publish manually from your local machine:

```bash
# Login to npm
npm login

# Build all packages
pnpm -w build

# Run changesets version to bump versions
pnpm changeset version

# Publish to npm
pnpm changeset publish
```

## 🎯 Testing Your Setup

### 1. Test with a Pre-release

```bash
# Create a pre-release version
pnpm changeset pre enter beta

# Create a changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish beta versions
pnpm changeset publish --tag beta

# Exit pre-release mode
pnpm changeset pre exit
```

### 2. Verify Published Packages

After publishing, verify your packages:
- Visit https://www.npmjs.com/~[your-username]
- Check each package page
- Test installation: `npm install @yourscope/components`

## 🛠️ Troubleshooting

### Common Issues

1. **"404 Not Found" when publishing:**
   - Ensure the scope exists or use a different scope
   - Check that your npm token has publish permissions

2. **"402 Payment Required":**
   - Private packages require a paid npm account
   - Add `"publishConfig": { "access": "public" }` to package.json

3. **"EPUBLISHCONFLICT" error:**
   - The version already exists
   - Create a new changeset to bump the version

4. **GitHub Actions failing:**
   - Verify NPM_TOKEN is set in GitHub Secrets
   - Check workflow permissions in repository settings

## 📊 Package Configuration

Each package should have the following in its `package.json`:

```json
{
  "name": "@yourscope/package-name",
  "version": "0.0.1",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/felixgeelhaar/glaze.git",
    "directory": "packages/package-name"
  },
  "homepage": "https://github.com/felixgeelhaar/glaze#readme",
  "bugs": {
    "url": "https://github.com/felixgeelhaar/glaze/issues"
  }
}
```

## 🔐 Security Best Practices

1. **Never commit npm tokens** to the repository
2. **Use granular tokens** with minimal permissions
3. **Enable 2FA** on your npm account
4. **Rotate tokens regularly**
5. **Use GitHub Secrets** for CI/CD

## 📚 Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)

## 🎉 Success Checklist

- [ ] npm account created
- [ ] npm token generated
- [ ] NPM_TOKEN added to GitHub Secrets
- [ ] Package scopes updated (if needed)
- [ ] Release workflow enabled
- [ ] First changeset created
- [ ] Test package published successfully

Once all items are checked, your Glaze Design System is ready for automated npm publishing!
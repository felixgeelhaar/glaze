# Enable npm Publishing

The repository is configured for automated npm publishing, but currently runs in safe **dry-run mode**.

## Current Status: DRY-RUN (Safe)

✅ **What's Working:**
- Automated builds and tests
- Version management with changesets
- GitHub releases creation
- Publishing simulation (no actual publish)

## To Enable Real Publishing

### Step 1: Get npm Token
```bash
# Login to npm
npm login

# Create automation token
# Go to: https://www.npmjs.com/settings/tokens
# Create new token with "Automation" type
# Copy the token (npm_XXXXXXX...)
```

### Step 2: Add GitHub Secret
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Your npm token from Step 1

### Step 3: Enable Publishing
Edit `.github/workflows/release.yml` line 49:

**Before (Safe):**
```yaml
publish: pnpm changeset publish --dry-run
```

**After (Live):**
```yaml
publish: pnpm changeset publish
```

### Step 4: Test Release
```bash
# Create a changeset
npx changeset

# Commit and push
git add .
git commit -m "chore: prepare release"
git push

# This will trigger the release workflow
# and publish to npm if changes detected
```

## Publishing Behavior

### With Changesets
- Only publishes when version changes are detected
- Automatically generates changelog
- Creates GitHub releases
- Publishes to npm registry

### Package Publishing
The following packages will be published:
- `@glaze/components` - Main component library
- `@glaze/tokens` - Design tokens

### Safety Features
- ✅ Requires manual changeset creation
- ✅ Runs full test suite before publishing  
- ✅ Only publishes on version changes
- ✅ Creates GitHub releases for tracking
- ✅ Automated changelog generation

## Current Configuration Benefits

**Keeping dry-run mode is recommended because:**
- ✅ Safe by default - no accidental publishing
- ✅ Tests everything works before going live
- ✅ Shows exactly what would be published
- ✅ Can be enabled when ready for production

## Alternative: Manual Publishing

You can also publish manually:
```bash
# Build packages
pnpm build

# Publish components
cd packages/components
npm publish

# Publish tokens  
cd ../tokens
npm publish
```

---

**Recommendation:** Keep dry-run mode until you're ready to share the packages publicly.
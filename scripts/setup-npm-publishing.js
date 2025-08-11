#!/usr/bin/env node

/**
 * Setup script for npm publishing configuration
 * 
 * This script helps configure the Glaze Design System for npm publishing
 * by either using a custom scope or removing the scope entirely.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const PACKAGES_DIR = path.join(__dirname, '..', 'packages');
const APPS_DIR = path.join(__dirname, '..', 'apps');

async function updatePackageJson(filePath, newScope, removeScope = false) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const oldName = content.name;
  
  if (removeScope) {
    // Remove scope entirely (e.g., @glaze/components -> glaze-components)
    content.name = oldName.replace('@glaze/', 'glaze-');
  } else if (newScope) {
    // Replace with new scope (e.g., @glaze/components -> @yourscope/components)
    content.name = oldName.replace('@glaze', `@${newScope}`);
  }
  
  // Update publishConfig if needed
  if (!content.publishConfig) {
    content.publishConfig = {};
  }
  content.publishConfig.access = 'public';
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
  
  console.log(`✅ Updated ${filePath}`);
  console.log(`   ${oldName} -> ${content.name}`);
  
  return { oldName, newName: content.name };
}

async function updateImports(updates) {
  const allFiles = [];
  
  // Find all TypeScript and JavaScript files
  function findFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('dist') && !file.includes('.turbo')) {
        findFiles(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.json')) {
        allFiles.push(fullPath);
      }
    }
  }
  
  findFiles(path.join(__dirname, '..', 'packages'));
  findFiles(path.join(__dirname, '..', 'apps'));
  
  // Update imports in all files
  for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    for (const { oldName, newName } of updates) {
      if (content.includes(oldName)) {
        content = content.replace(new RegExp(oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newName);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`✅ Updated imports in ${file}`);
    }
  }
}

async function main() {
  console.log('\n🚀 Glaze Design System - NPM Publishing Setup\n');
  console.log('This script will help you configure your packages for npm publishing.\n');
  
  console.log('Current package names:');
  console.log('  - @glaze/tokens');
  console.log('  - @glaze/components');
  console.log('  - @glaze/engine');
  console.log('  - @glaze/cli');
  console.log('  - @glaze/react');
  console.log('  - @glaze/vue\n');
  
  console.log('Options:');
  console.log('  1. Use a different npm scope (e.g., @yourname/components)');
  console.log('  2. Remove scope entirely (e.g., glaze-components)');
  console.log('  3. Keep @glaze scope (requires creating the org on npm)');
  console.log('  4. Cancel\n');
  
  const choice = await question('Select an option (1-4): ');
  
  const updates = [];
  
  if (choice === '1') {
    const newScope = await question('\nEnter your npm username or organization (without @): ');
    
    console.log(`\n📦 Updating packages to use @${newScope} scope...\n`);
    
    // Update all package.json files
    const packages = ['tokens', 'components', 'engine', 'cli', 'react', 'vue'];
    
    for (const pkg of packages) {
      const packageJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const update = await updatePackageJson(packageJsonPath, newScope);
        updates.push(update);
      }
    }
    
    // Update imports
    await updateImports(updates);
    
    console.log('\n✅ Successfully updated all packages to use @' + newScope + ' scope!');
    console.log('\n📝 Next steps:');
    console.log('  1. Review the changes');
    console.log('  2. Commit the updates');
    console.log('  3. Set up NPM_TOKEN secret in GitHub');
    console.log('  4. Update release workflow to enable publishing');
    
  } else if (choice === '2') {
    console.log('\n📦 Removing scope from package names...\n');
    
    // Update all package.json files
    const packages = ['tokens', 'components', 'engine', 'cli', 'react', 'vue'];
    
    for (const pkg of packages) {
      const packageJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const update = await updatePackageJson(packageJsonPath, null, true);
        updates.push(update);
      }
    }
    
    // Update imports
    await updateImports(updates);
    
    console.log('\n✅ Successfully removed scope from all packages!');
    console.log('\n📝 Next steps:');
    console.log('  1. Review the changes');
    console.log('  2. Commit the updates');
    console.log('  3. Set up NPM_TOKEN secret in GitHub');
    console.log('  4. Update release workflow to enable publishing');
    
  } else if (choice === '3') {
    console.log('\n📝 To use @glaze scope, you need to:');
    console.log('  1. Go to https://www.npmjs.com/');
    console.log('  2. Create an organization named "glaze"');
    console.log('  3. Generate an npm token with publish permissions');
    console.log('  4. Add NPM_TOKEN to GitHub Secrets');
    console.log('  5. Update the release workflow to enable publishing');
    
  } else {
    console.log('\n❌ Setup cancelled');
  }
  
  rl.close();
}

main().catch(console.error);
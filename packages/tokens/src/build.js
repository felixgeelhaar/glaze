#!/usr/bin/env node

import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create dist directory if it doesn't exist
const distPath = join(__dirname, '..', 'dist');
if (!existsSync(distPath)) {
  mkdirSync(distPath, { recursive: true });
}

// Custom format for CSS with theme overrides
const cssVariablesWithThemes = {
  name: 'css/variables-with-themes',
  format: async ({ dictionary }) => {
    const tokensByFile = {};
    
    // Group tokens by source file
    dictionary.allTokens.forEach(token => {
      const filePath = token.filePath || 'base';
      if (!tokensByFile[filePath]) {
        tokensByFile[filePath] = [];
      }
      tokensByFile[filePath].push(token);
    });
    
    // Separate base tokens from theme tokens
    const baseTokens = [];
    const darkTokens = [];
    const highContrastTokens = [];
    
    Object.entries(tokensByFile).forEach(([filePath, tokens]) => {
      tokens.forEach(token => {
        const varName = `--${token.path.join('-')}`;
        const value = token.value;
        const cssVar = `  ${varName}: ${value};`;
        
        if (filePath.includes('dark.json')) {
          darkTokens.push(cssVar);
        } else if (filePath.includes('high-contrast.json')) {
          highContrastTokens.push(cssVar);
        } else if (filePath.includes('light.json')) {
          // Light theme tokens override base
          if (!baseTokens.find(t => t.includes(varName))) {
            baseTokens.push(cssVar);
          }
        } else {
          // Base tokens from tokens.json
          if (!baseTokens.find(t => t.includes(varName))) {
            baseTokens.push(cssVar);
          }
        }
      });
    });
    
    // Build CSS output
    let output = ':root {\n' + baseTokens.join('\n') + '\n}\n\n';
    
    // Add dark theme overrides
    if (darkTokens.length > 0) {
      output += '[data-theme="dark"] {\n' + darkTokens.join('\n') + '\n}\n\n';
    }
    
    // Add high-contrast theme overrides
    if (highContrastTokens.length > 0) {
      output += '[data-theme="high-contrast"] {\n' + highContrastTokens.join('\n') + '\n}\n';
    }
    
    return output;
  }
};

// TypeScript declarations format
const typescriptDeclarations = {
  name: 'typescript/es6-declarations',
  format: async ({ dictionary }) => {
    const tokens = {};
    
    dictionary.allTokens.forEach(token => {
      if (!token.filePath || !token.filePath.includes('themes/')) {
        // Only include base tokens in TypeScript
        const pathParts = token.path;
        let current = tokens;
        
        pathParts.forEach((part, index) => {
          if (index === pathParts.length - 1) {
            current[part] = token.value;
          } else {
            current[part] = current[part] || {};
            current = current[part];
          }
        });
      }
    });
    
    const buildInterface = (obj, indent = '') => {
      let output = '';
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
          output += `${indent}${key}: {\n`;
          output += buildInterface(value, indent + '  ');
          output += `${indent}};\n`;
        } else {
          const type = typeof value === 'number' ? 'number' : 'string';
          output += `${indent}${key}: ${type};\n`;
        }
      });
      return output;
    };
    
    let output = 'export interface Tokens {\n';
    output += buildInterface(tokens, '  ');
    output += '}\n\n';
    output += 'export declare const tokens: Tokens;\n';
    output += 'export type ThemeName = "light" | "dark" | "high-contrast";\n';
    
    return output;
  }
};

// Build tokens
async function build() {
  console.log('Building tokens...');
  
  const config = {
    source: [join(__dirname, 'tokens.json'), join(__dirname, 'themes', '*.json')],
    
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'dist/css/',
        files: [{
          destination: 'tokens.css',
          format: cssVariablesWithThemes.name,
          options: {
            outputReferences: true
          }
        }]
      },
      ts: {
        transformGroup: 'js',
        buildPath: 'dist/ts/',
        files: [{
          destination: 'index.js',
          format: 'javascript/es6',
          options: {
            outputReferences: false
          }
        }, {
          destination: 'index.d.ts',
          format: typescriptDeclarations.name
        }]
      },
      figma: {
        transformGroup: 'js',
        buildPath: 'dist/figma/',
        files: [{
          destination: 'tokens.json',
          format: 'json/nested'
        }]
      }
    }
  };

  const sd = new StyleDictionary(config);
  
  // Register custom formats
  sd.registerFormat(cssVariablesWithThemes);
  sd.registerFormat(typescriptDeclarations);
  
  await sd.buildAllPlatforms();
  
  console.log('✅ Tokens built successfully!');
}

build().catch(console.error);
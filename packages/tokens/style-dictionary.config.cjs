const StyleDictionary = require('style-dictionary');

// Custom format for CSS with theme overrides
StyleDictionary.registerFormat({
  name: 'css/variables-with-themes',
  formatter: function({ dictionary }) {
    const lightTokens = [];
    const darkTokens = [];
    const highContrastTokens = [];
    
    dictionary.allTokens.forEach(token => {
      const varName = `--${token.name.replace(/\./g, '-')}`;
      const value = token.value;
      
      // Determine which theme this token belongs to
      if (token.filePath && token.filePath.includes('dark.json')) {
        darkTokens.push(`  ${varName}: ${value};`);
      } else if (token.filePath && token.filePath.includes('high-contrast.json')) {
        highContrastTokens.push(`  ${varName}: ${value};`);
      } else {
        lightTokens.push(`  ${varName}: ${value};`);
      }
    });
    
    let output = ':root {\n' + lightTokens.join('\n') + '\n}\n\n';
    
    if (darkTokens.length > 0) {
      output += '[data-theme="dark"] {\n' + darkTokens.join('\n') + '\n}\n\n';
    }
    
    if (highContrastTokens.length > 0) {
      output += '[data-theme="high-contrast"] {\n' + highContrastTokens.join('\n') + '\n}\n';
    }
    
    return output;
  }
});

// Custom transform for TypeScript constant names
StyleDictionary.registerTransform({
  name: 'name/cti/constant',
  type: 'name',
  transformer: function(token) {
    return token.path.join('_').toUpperCase();
  }
});

module.exports = {
  source: ['src/tokens.json', 'src/themes/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables-with-themes',
        options: {
          outputReferences: true
        }
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{
        destination: 'index.ts',
        format: 'javascript/es6',
        options: {
          outputReferences: false
        }
      }, {
        destination: 'index.d.ts',
        format: 'typescript/es6-declarations'
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
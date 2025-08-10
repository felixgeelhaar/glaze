const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['src/tokens.json', 'src/themes/*.json'],
  
  hooks: {
    formats: {
      'css/variables-with-themes': ({ dictionary }) => {
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
    },
    
    transforms: {
      'name/cti/constant': {
        type: 'name',
        transform: (token) => {
          return token.path.join('_').toUpperCase();
        }
      }
    }
  },
  
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
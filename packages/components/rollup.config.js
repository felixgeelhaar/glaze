import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import gzipPlugin from 'rollup-plugin-gzip';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Define entry points for individual components
const components = [
  'button/glz-button',
  'card/glz-card',
  'dialog/glz-dialog',
  'input/glz-input',
  'select/glz-select',
  'toast/glz-toast',
  'navbar/glz-navbar'
];

// Create individual component builds
const componentBuilds = components.map(component => ({
  input: `src/${component}.ts`,
  output: [
    {
      file: `dist/${component}.js`,
      format: 'es',
      sourcemap: true
    }
  ],
  external: ['lit', 'lit/decorators.js', '@lit/reactive-element'],
  plugins: [
    // Handle CSS imports by ignoring them
    {
      name: 'ignore-css',
      resolveId(source) {
        if (source.endsWith('.css')) {
          return { id: source, external: true };
        }
        return null;
      }
    },
    resolve({
      preferBuiltins: false,
      browser: true,
      mainFields: ['module', 'main']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false
    }),
    terser({
      format: {
        comments: false
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2
      },
      mangle: {
        properties: {
          regex: /^_/
        }
      }
    })
  ]
}));

// Main bundle with all components
const mainBundle = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/glaze.min.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/glaze.min.umd.js',
      format: 'umd',
      name: 'Glaze',
      sourcemap: true,
      globals: {
        'lit': 'lit'
      }
    }
  ],
  external: ['lit', 'lit/decorators.js', '@lit/reactive-element'],
  plugins: [
    // Handle CSS imports by ignoring them
    {
      name: 'ignore-css',
      resolveId(source) {
        if (source.endsWith('.css')) {
          return { id: source, external: true };
        }
        return null;
      }
    },
    resolve({
      preferBuiltins: false,
      browser: true,
      mainFields: ['module', 'main']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types'
    }),
    terser({
      format: {
        comments: false
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 3,
        unsafe: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        unused: true
      },
      mangle: {
        properties: {
          regex: /^_/,
          reserved: ['__lit$', '__litElement$']
        }
      }
    }),
    gzipPlugin()
  ]
};

// CSS bundle (tokens)
const cssBundle = {
  input: 'src/styles/tokens.css',
  output: [
    {
      file: 'dist/glaze.css',
      format: 'es'
    }
  ],
  plugins: [
    postcss({
      extract: true,
      minimize: true,
      modules: false
    })
  ]
};

export default [
  mainBundle,
  ...componentBuilds
];
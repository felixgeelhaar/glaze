import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: {
    exportConditions: ['browser', 'development']
  },
  plugins: [
    esbuildPlugin({ 
      ts: true,
      target: 'es2022',
      tsconfig: './tsconfig.json'
    })
  ],
  browsers: [
    playwrightLauncher({ 
      product: 'chromium',
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    })
  ],
  testRunnerHtml: testFramework => `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/src/styles/tokens.css">
        <link rel="stylesheet" href="/src/styles/components.css">
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  coverageConfig: {
    include: ['src/**/*.ts'],
    exclude: [
      'src/**/*.test.ts',
      'src/**/*.stories.ts',
      'src/**/*.d.ts'
    ]
  },
  testFramework: {
    config: {
      timeout: 10000
    }
  }
};
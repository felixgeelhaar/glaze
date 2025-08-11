/** @type { import('@storybook/web-components').Preview } */
import '@felixgeelhaar/glaze-components/dist/styles/tokens.css';
import '@felixgeelhaar/glaze-components/dist/styles/components.css';

// Register all components
import '@felixgeelhaar/glaze-components';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0F172A' },
        { name: 'light', value: '#F8FAFC' },
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  decorators: [
    (story) => {
      // Add a wrapper div with glassmorphism-friendly background
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        min-height: 100vh;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      wrapper.appendChild(story());
      return wrapper;
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'high-contrast', title: 'High Contrast', icon: 'contrast' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
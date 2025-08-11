import type { Config } from 'tailwindcss';
import { glazePreset } from '@felixgeelhaar/glaze-engine/preset';
import { glazePlugin } from '@felixgeelhaar/glaze-engine/plugin';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [glazePreset],
  plugins: [glazePlugin],
};

export default config;
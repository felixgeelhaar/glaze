import type { Config } from 'tailwindcss';
import { glazePreset } from '@glaze/engine/preset';
import { glazePlugin } from '@glaze/engine/plugin';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [glazePreset],
  plugins: [glazePlugin],
};

export default config;
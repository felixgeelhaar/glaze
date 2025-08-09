import { glazePreset } from '@glaze/engine/preset';
import { glazePlugin } from '@glaze/engine/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [glazePreset],
  plugins: [glazePlugin],
}
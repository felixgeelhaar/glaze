import type { App, Plugin } from 'vue';
import { registerGlazeComponents } from './register.js';
import { 
  GlzButtonVue,
  GlzCardVue,
  GlzDialogVue,
  GlzInputVue,
  GlzNavbarVue,
  GlzSelectVue,
  GlzToastVue
} from './components/index.js';

export const GlazePlugin: Plugin = {
  install(app: App) {
    // Register custom elements
    registerGlazeComponents();
    
    // Register Vue components globally
    app.component('GlzButton', GlzButtonVue);
    app.component('GlzCard', GlzCardVue);
    app.component('GlzDialog', GlzDialogVue);
    app.component('GlzInput', GlzInputVue);
    app.component('GlzNavbar', GlzNavbarVue);
    app.component('GlzSelect', GlzSelectVue);
    app.component('GlzToast', GlzToastVue);
    
    // Tell Vue to ignore the custom elements
    app.config.compilerOptions.isCustomElement = (tag: string) => {
      return tag.startsWith('glz-');
    };
  }
};
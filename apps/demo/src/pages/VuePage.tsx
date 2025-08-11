import { useEffect, useRef, useState } from 'react';
import { createApp } from 'vue';
import { GlazePlugin, GlzInput, GlzToast } from '@felixgeelhaar/glaze-vue';
import '@glaze/components/dist/styles/tokens.css';
import '@glaze/components/dist/styles/components.css';

// Vue component template
const VueComponent = {
  components: {
    GlzInput,
    GlzToast
  },
  data() {
    return {
      inputValue: '',
      toastOpen: false,
      toastMessage: ''
    };
  },
  methods: {
    showToast(message: string) {
      (this as any).toastMessage = message;
      (this as any).toastOpen = true;
    }
  },
  template: `
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Vue Components</h2>
        <p class="text-white/70">
          Using Glaze components with Vue 3 composition API
        </p>
      </div>

      <div class="max-w-md mx-auto space-y-6">
        <!-- Input Component -->
        <div class="p-6 bg-white/10 backdrop-blur-md rounded-lg">
          <h3 class="text-xl font-bold text-white mb-4">Input Example</h3>
          <glz-input
            v-model="inputValue"
            variant="glass"
            size="lg"
            label="Your Name"
            placeholder="Enter your name..."
            helper-text="This field demonstrates the Vue wrapper"
            @input="$event => console.log('Input:', $event)"
          />
          <p class="mt-4 text-white/70">
            Current value: {{ inputValue || '(empty)' }}
          </p>
        </div>

        <!-- Toast Trigger -->
        <div class="p-6 bg-white/10 backdrop-blur-md rounded-lg">
          <h3 class="text-xl font-bold text-white mb-4">Toast Notifications</h3>
          <div class="space-y-2">
            <button 
              @click="showToast('Success! Your changes have been saved.')"
              class="w-full px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-100 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              Show Success Toast
            </button>
            <button 
              @click="showToast('Warning: Please review your input.')"
              class="w-full px-4 py-2 bg-yellow-500/20 backdrop-blur-sm text-yellow-100 rounded-lg hover:bg-yellow-500/30 transition-colors"
            >
              Show Warning Toast
            </button>
            <button 
              @click="showToast('Error: Something went wrong!')"
              class="w-full px-4 py-2 bg-red-500/20 backdrop-blur-sm text-red-100 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Show Error Toast
            </button>
          </div>
        </div>
      </div>

      <!-- Toast Component -->
      <glz-toast
        v-model="toastOpen"
        variant="glass"
        type="info"
        position="bottom-right"
        :message="toastMessage"
        :duration="5000"
        :closable="true"
        :show-progress="true"
        @glz-toast-close="toastOpen = false"
      />
    </div>
  `
};

export function VuePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mounted) return;

    // Create Vue app and mount it
    const app = createApp(VueComponent);
    app.use(GlazePlugin);
    app.mount(containerRef.current);
    setMounted(true);

    return () => {
      // Cleanup Vue app on unmount
      if (mounted) {
        app.unmount();
      }
    };
  }, [mounted]);

  return <div ref={containerRef} />;
}
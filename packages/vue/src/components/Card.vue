<template>
  <glz-card
    ref="cardRef"
    :variant="variant"
    :size="size"
    :tone="tone"
    :data-reduced-transparency="dataReducedTransparency"
  >
    <slot />
  </glz-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { GlzCardElement } from '../types.js';

// Props
const props = defineProps<{
  variant?: 'solid' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'accent' | 'neutral';
  dataReducedTransparency?: string;
}>();

// Refs
const cardRef = ref<GlzCardElement>();

// Expose element ref
defineExpose({
  element: cardRef
});
</script>
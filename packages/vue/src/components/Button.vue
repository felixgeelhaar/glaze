<template>
  <glz-button
    ref="buttonRef"
    :variant="variant"
    :size="size"
    :tone="tone"
    :disabled="disabled"
    :loading="loading"
    :pressed="pressed"
    :aria-pressed="ariaPressed"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <slot />
  </glz-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { GlzButtonElement } from '../types.js';

// Props
const props = defineProps<{
  variant?: 'solid' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'accent' | 'neutral';
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  ariaPressed?: string;
  ariaLabel?: string;
}>();

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

// Refs
const buttonRef = ref<GlzButtonElement>();

// Handlers
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

// Expose element ref
defineExpose({
  element: buttonRef
});
</script>
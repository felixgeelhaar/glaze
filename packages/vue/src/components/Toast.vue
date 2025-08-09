<template>
  <glz-toast
    ref="toastRef"
    :variant="variant"
    :type="type"
    :position="position"
    :title="title"
    :message="message"
    :duration="duration"
    :closable="closable"
    :show-progress="showProgress"
    @glz-toast-close="handleClose"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { GlzToastElement, GlzToastCloseEvent } from '../types.js';

// Props
const props = defineProps<{
  modelValue?: boolean;
  variant?: 'solid' | 'glass' | 'ghost';
  type?: 'info' | 'success' | 'warning' | 'error';
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  showProgress?: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'glz-toast-close': [event: GlzToastCloseEvent];
}>();

// Refs
const toastRef = ref<GlzToastElement>();

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (toastRef.value) {
    if (newValue) {
      toastRef.value.show();
    } else {
      toastRef.value.close();
    }
  }
});

// Handlers
const handleClose = (event: GlzToastCloseEvent) => {
  emit('update:modelValue', false);
  emit('glz-toast-close', event);
};

// Expose methods
defineExpose({
  element: toastRef,
  show: () => toastRef.value?.show(),
  close: () => toastRef.value?.close()
});
</script>
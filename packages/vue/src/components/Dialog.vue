<template>
  <glz-dialog
    ref="dialogRef"
    :variant="variant"
    :label="label"
    @glz-dialog-close="handleClose"
  >
    <slot />
  </glz-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { GlzDialogElement, GlzDialogCloseEvent } from '../types.js';

// Props
const props = defineProps<{
  modelValue?: boolean;
  variant?: 'solid' | 'glass' | 'ghost';
  label?: string;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'glz-dialog-close': [event: GlzDialogCloseEvent];
}>();

// Refs
const dialogRef = ref<GlzDialogElement>();

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (dialogRef.value) {
    if (newValue) {
      dialogRef.value.show();
    } else {
      dialogRef.value.close();
    }
  }
});

// Handlers
const handleClose = (event: GlzDialogCloseEvent) => {
  emit('update:modelValue', false);
  emit('glz-dialog-close', event);
};

// Expose methods
defineExpose({
  element: dialogRef,
  show: () => dialogRef.value?.show(),
  close: () => dialogRef.value?.close()
});
</script>
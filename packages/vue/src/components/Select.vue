<template>
  <glz-select
    ref="selectRef"
    :variant="variant"
    :size="size"
    :tone="tone"
    :value="modelValue"
    :placeholder="placeholder"
    :label="label"
    :helper-text="helperText"
    :error="error"
    :error-message="errorMessage"
    :required="required"
    :disabled="disabled"
    :multiple="multiple"
    :open="open"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { GlzSelectElement, SelectOption } from '../types.js';

// Props
const props = defineProps<{
  modelValue?: string | string[];
  options: SelectOption[];
  variant?: 'solid' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'accent' | 'neutral';
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  open?: boolean;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string | string[]];
  'change': [event: Event];
}>();

// Refs
const selectRef = ref<GlzSelectElement>();

// Set options on mount and when they change
onMounted(() => {
  if (selectRef.value && props.options) {
    selectRef.value.options = props.options;
  }
});

watch(() => props.options, (newOptions) => {
  if (selectRef.value && newOptions) {
    selectRef.value.options = newOptions;
  }
}, { deep: true });

// Handlers
const handleChange = (event: Event) => {
  const target = event.target as GlzSelectElement;
  emit('update:modelValue', target.value);
  emit('change', event);
};

// Expose element ref
defineExpose({
  element: selectRef
});
</script>
<template>
  <glz-input
    ref="inputRef"
    :variant="variant"
    :size="size"
    :tone="tone"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :label="label"
    :helper-text="helperText"
    :error="error"
    :error-message="errorMessage"
    :required="required"
    :disabled="disabled"
    :readonly="readonly"
    :pattern="pattern"
    :min="min"
    :max="max"
    :step="step"
    :autocomplete="autocomplete"
    :aria-label="ariaLabel"
    :aria-required="ariaRequired"
    :aria-invalid="ariaInvalid"
    :aria-describedby="ariaDescribedby"
    @input="handleInput"
    @change="handleChange"
  >
    <slot name="icon-start" slot="icon-start" />
    <slot name="icon-end" slot="icon-end" />
  </glz-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { GlzInputElement } from '../types.js';

// Props
const props = defineProps<{
  modelValue?: string;
  variant?: 'solid' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'accent' | 'neutral';
  type?: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  pattern?: string;
  min?: string;
  max?: string;
  step?: string;
  autocomplete?: string;
  ariaLabel?: string;
  ariaRequired?: string;
  ariaInvalid?: string;
  ariaDescribedby?: string;
}>();

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: string];
  'input': [event: Event];
  'change': [event: Event];
}>();

// Refs
const inputRef = ref<GlzInputElement>();

// Handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('input', event);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('change', event);
};

// Expose element ref and methods
defineExpose({
  element: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
});
</script>
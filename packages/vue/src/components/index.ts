// Export Vue component definitions without .vue files
// These are plain JS components for TypeScript compilation

import { defineComponent, h, ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { SelectOption } from '../types.js';

// Button Component
export const GlzButton = defineComponent({
  name: 'GlzButton',
  props: {
    variant: String as PropType<'solid' | 'glass' | 'ghost'>,
    size: String as PropType<'sm' | 'md' | 'lg'>,
    tone: String as PropType<'primary' | 'accent' | 'neutral'>,
    disabled: Boolean,
    loading: Boolean,
    pressed: Boolean,
    ariaPressed: String,
    ariaLabel: String
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () => h('glz-button', {
      ...props,
      onClick: (e: MouseEvent) => emit('click', e)
    }, slots.default?.());
  }
});

// Card Component
export const GlzCard = defineComponent({
  name: 'GlzCard',
  props: {
    variant: String as PropType<'solid' | 'glass' | 'ghost'>,
    size: String as PropType<'sm' | 'md' | 'lg'>,
    tone: String as PropType<'primary' | 'accent' | 'neutral'>,
    dataReducedTransparency: String
  },
  setup(props, { slots }) {
    return () => h('glz-card', props, slots.default?.());
  }
});

// Dialog Component
export const GlzDialog = defineComponent({
  name: 'GlzDialog',
  props: {
    modelValue: Boolean,
    variant: String as PropType<'solid' | 'glass' | 'ghost'>,
    label: String
  },
  emits: ['update:modelValue', 'glz-dialog-close'],
  setup(props, { slots, emit }) {
    const dialogRef = ref<any>();
    
    watch(() => props.modelValue, (newValue) => {
      if (dialogRef.value) {
        if (newValue) {
          dialogRef.value.show();
        } else {
          dialogRef.value.close();
        }
      }
    });
    
    return () => h('glz-dialog', {
      ref: dialogRef,
      variant: props.variant,
      label: props.label,
      onGlzDialogClose: () => {
        emit('update:modelValue', false);
        emit('glz-dialog-close');
      }
    }, slots.default?.());
  }
});

// Input Component
export const GlzInput = defineComponent({
  name: 'GlzInput',
  props: {
    modelValue: String,
    variant: String as PropType<'solid' | 'glass' | 'ghost'>,
    size: String as PropType<'sm' | 'md' | 'lg'>,
    tone: String as PropType<'primary' | 'accent' | 'neutral'>,
    type: String,
    placeholder: String,
    label: String,
    helperText: String,
    error: Boolean,
    errorMessage: String,
    required: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    pattern: String,
    min: String,
    max: String,
    step: String,
    autocomplete: String,
    ariaLabel: String,
    ariaRequired: String,
    ariaInvalid: String,
    ariaDescribedby: String
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(props, { emit }) {
    return () => h('glz-input', {
      ...props,
      'helper-text': props.helperText,
      'error-message': props.errorMessage,
      value: props.modelValue,
      onInput: (e: Event) => {
        const target = e.target as HTMLInputElement;
        emit('update:modelValue', target.value);
        emit('input', e);
      },
      onChange: (e: Event) => {
        const target = e.target as HTMLInputElement;
        emit('update:modelValue', target.value);
        emit('change', e);
      }
    });
  }
});

// Select Component
export const GlzSelect = defineComponent({
  name: 'GlzSelect',
  props: {
    modelValue: [String, Array] as PropType<string | string[]>,
    options: {
      type: Array as PropType<SelectOption[]>,
      required: true
    },
    variant: String as PropType<'solid' | 'glass' | 'ghost'>,
    size: String as PropType<'sm' | 'md' | 'lg'>,
    tone: String as PropType<'primary' | 'accent' | 'neutral'>,
    placeholder: String,
    label: String,
    helperText: String,
    error: Boolean,
    errorMessage: String,
    required: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    open: Boolean
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const selectRef = ref<any>();
    
    watch(() => props.options, (newOptions) => {
      if (selectRef.value && newOptions) {
        selectRef.value.options = newOptions;
      }
    }, { immediate: true, deep: true });
    
    return () => h('glz-select', {
      ref: selectRef,
      ...props,
      'helper-text': props.helperText,
      'error-message': props.errorMessage,
      value: props.modelValue,
      onChange: (e: Event) => {
        const target = e.target as any;
        emit('update:modelValue', target.value);
        emit('change', e);
      }
    });
  }
});

// Toast Component
export const GlzToast = defineComponent({
  name: 'GlzToast',
  props: {
    modelValue: Boolean,
    variant: String as PropType<'solid' | 'glass' | 'ghost'>,
    type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    position: String as PropType<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>,
    title: String,
    message: {
      type: String,
      required: true
    },
    duration: Number,
    closable: Boolean,
    showProgress: Boolean
  },
  emits: ['update:modelValue', 'glz-toast-close'],
  setup(props, { emit }) {
    const toastRef = ref<any>();
    
    watch(() => props.modelValue, (newValue) => {
      if (toastRef.value) {
        if (newValue) {
          toastRef.value.show();
        } else {
          toastRef.value.close();
        }
      }
    });
    
    return () => h('glz-toast', {
      ref: toastRef,
      ...props,
      'show-progress': props.showProgress,
      onGlzToastClose: () => {
        emit('update:modelValue', false);
        emit('glz-toast-close');
      }
    });
  }
});

// Navbar Component
export const GlzNavbar = defineComponent({
  name: 'GlzNavbar',
  props: {
    variant: String as PropType<'solid' | 'glass' | 'ghost'>,
    size: String as PropType<'sm' | 'md' | 'lg'>,
    brand: String,
    brandHref: String,
    sticky: Boolean
  },
  emits: ['glz-navbar-toggle'],
  setup(props, { slots, emit }) {
    return () => h('glz-navbar', {
      ...props,
      'brand-href': props.brandHref,
      onGlzNavbarToggle: (e: CustomEvent) => emit('glz-navbar-toggle', e)
    }, slots.default?.());
  }
});

// Export with Vue suffix for clarity
export const GlzButtonVue = GlzButton;
export const GlzCardVue = GlzCard;
export const GlzDialogVue = GlzDialog;
export const GlzInputVue = GlzInput;
export const GlzSelectVue = GlzSelect;
export const GlzToastVue = GlzToast;
export const GlzNavbarVue = GlzNavbar;
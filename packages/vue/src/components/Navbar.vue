<template>
  <glz-navbar
    ref="navbarRef"
    :variant="variant"
    :size="size"
    :brand="brand"
    :brand-href="brandHref"
    :sticky="sticky"
    @glz-navbar-toggle="handleToggle"
  >
    <slot name="nav-links" slot="nav-links" />
    <slot name="nav-actions" slot="nav-actions" />
  </glz-navbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { GlzNavbarElement, GlzNavbarToggleEvent } from '../types.js';

// Props
const props = defineProps<{
  variant?: 'solid' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  brand?: string;
  brandHref?: string;
  sticky?: boolean;
}>();

// Emits
const emit = defineEmits<{
  'glz-navbar-toggle': [event: GlzNavbarToggleEvent];
}>();

// Refs
const navbarRef = ref<GlzNavbarElement>();

// Handlers
const handleToggle = (event: GlzNavbarToggleEvent) => {
  emit('glz-navbar-toggle', event);
};

// Expose element ref
defineExpose({
  element: navbarRef
});
</script>
import type { 
  GlzButton,
  GlzCard,
  GlzDialog,
  GlzInput,
  GlzNavbar,
  GlzSelect,
  GlzToast
} from '@felixgeelhaar/glaze-components';

// Re-export element types
export type GlzButtonElement = GlzButton;
export type GlzCardElement = GlzCard;
export type GlzDialogElement = GlzDialog;
export type GlzInputElement = GlzInput;
export type GlzNavbarElement = GlzNavbar;
export type GlzSelectElement = GlzSelect;
export type GlzToastElement = GlzToast;

// Common prop types
export type Variant = 'solid' | 'glass' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';
export type Tone = 'primary' | 'accent' | 'neutral';

// Select Option type
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Event types
export interface GlzDialogCloseEvent extends CustomEvent {
  detail: undefined;
}

export interface GlzToastCloseEvent extends CustomEvent {
  detail: undefined;
}

export interface GlzNavbarToggleEvent extends CustomEvent {
  detail: { open: boolean };
}
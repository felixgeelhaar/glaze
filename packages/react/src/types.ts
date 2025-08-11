import type { 
  GlzButton,
  GlzCard,
  GlzDialog,
  GlzInput,
  GlzNavbar,
  GlzSelect,
  GlzToast
} from '@felixgeelhaar/glaze-components';
import type { MouseEventHandler, ReactNode } from 'react';

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

// Button Props
export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  disabled?: boolean;
  loading?: boolean;
  pressed?: boolean;
  'aria-pressed'?: string | boolean;
  'aria-label'?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  className?: string;
  id?: string;
}

// Card Props
export interface CardProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  'data-reduced-transparency'?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
}

// Dialog Props
export interface DialogProps {
  open?: boolean;
  variant?: Variant;
  label?: string;
  onGlzDialogClose?: (event: CustomEvent) => void;
  children?: ReactNode;
  className?: string;
  id?: string;
}

// Input Props
export interface InputProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  type?: string;
  value?: string;
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
  autoComplete?: string;
  'aria-label'?: string;
  'aria-required'?: string | boolean;
  'aria-invalid'?: string | boolean;
  'aria-describedby'?: string;
  onInput?: (event: Event) => void;
  onChange?: (event: Event) => void;
  className?: string;
  id?: string;
}

// Navbar Props
export interface NavbarProps {
  variant?: Variant;
  size?: Size;
  brand?: string;
  brandHref?: string;
  sticky?: boolean;
  onGlzNavbarToggle?: (event: CustomEvent<{ open: boolean }>) => void;
  children?: ReactNode;
  className?: string;
  id?: string;
}

// Select Props
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  options: SelectOption[];
  value?: string | string[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  open?: boolean;
  onChange?: (event: Event) => void;
  className?: string;
  id?: string;
}

// Toast Props
export interface ToastProps {
  variant?: Variant;
  type?: 'info' | 'success' | 'warning' | 'error';
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  showProgress?: boolean;
  open?: boolean;
  onGlzToastClose?: (event: CustomEvent) => void;
  className?: string;
  id?: string;
}
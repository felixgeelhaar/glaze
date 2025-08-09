// Extend JSX intrinsic elements to include Glaze web components
import type {
  GlzButtonElement,
  GlzCardElement,
  GlzDialogElement,
  GlzInputElement,
  GlzNavbarElement,
  GlzSelectElement,
  GlzToastElement
} from './types.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glz-button': React.DetailedHTMLProps<React.HTMLAttributes<GlzButtonElement>, GlzButtonElement>;
      'glz-card': React.DetailedHTMLProps<React.HTMLAttributes<GlzCardElement>, GlzCardElement>;
      'glz-dialog': React.DetailedHTMLProps<React.HTMLAttributes<GlzDialogElement>, GlzDialogElement>;
      'glz-input': React.DetailedHTMLProps<React.HTMLAttributes<GlzInputElement>, GlzInputElement>;
      'glz-navbar': React.DetailedHTMLProps<React.HTMLAttributes<GlzNavbarElement>, GlzNavbarElement>;
      'glz-select': React.DetailedHTMLProps<React.HTMLAttributes<GlzSelectElement>, GlzSelectElement>;
      'glz-toast': React.DetailedHTMLProps<React.HTMLAttributes<GlzToastElement>, GlzToastElement>;
    }
  }
}
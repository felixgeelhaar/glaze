import { forwardRef, createElement } from 'react';
import type { CardProps, GlzCardElement } from '../types.js';

export const Card = forwardRef<GlzCardElement, CardProps>(
  ({ children, ...props }, ref) => {
    return createElement(
      'glz-card',
      { ref, ...props },
      children
    );
  }
);

Card.displayName = 'Card';
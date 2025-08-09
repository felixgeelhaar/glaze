import { forwardRef } from 'react';
import type { CardProps, GlzCardElement } from '../types.js';

export const Card = forwardRef<GlzCardElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
      <glz-card ref={ref} {...props}>
        {children}
      </glz-card>
    );
  }
);

Card.displayName = 'Card';
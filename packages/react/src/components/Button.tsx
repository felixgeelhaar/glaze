import { forwardRef, createElement, useEffect, useRef, type RefObject } from 'react';
import type { ButtonProps, GlzButtonElement } from '../types.js';

export const Button = forwardRef<GlzButtonElement, ButtonProps>(
  ({ children, onClick, ...props }, forwardedRef) => {
    const innerRef = useRef<GlzButtonElement>(null);
    const ref = (forwardedRef as RefObject<GlzButtonElement>) || innerRef;
    
    useEffect(() => {
      const element = typeof ref === 'object' ? ref.current : null;
      if (!element || !onClick) return;
      
      const handler = (e: Event) => {
        onClick(e as any);
      };
      element.addEventListener('click', handler);
      
      return () => {
        element.removeEventListener('click', handler);
      };
    }, [onClick, ref]);
    
    return createElement(
      'glz-button',
      { ref, ...props as any },
      children
    );
  }
);

Button.displayName = 'Button';
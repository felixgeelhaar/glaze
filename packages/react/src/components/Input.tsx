import { forwardRef, createElement, useEffect, useRef, type RefObject } from 'react';
import type { InputProps, GlzInputElement } from '../types.js';
import { createEventHandler } from '../utils.js';

export const Input = forwardRef<GlzInputElement, InputProps>(
  ({ onInput, onChange, helperText, errorMessage, ...props }, forwardedRef) => {
    const innerRef = useRef<GlzInputElement>(null);
    const ref = (forwardedRef as RefObject<GlzInputElement>) || innerRef;
    
    useEffect(() => {
      const element = typeof ref === 'object' ? ref.current : null;
      if (!element) return;
      
      const handlers: Array<[string, EventListener]> = [];
      
      if (onInput) {
        const handler = createEventHandler(onInput);
        element.addEventListener('input', handler);
        handlers.push(['input', handler]);
      }
      
      if (onChange) {
        const handler = createEventHandler(onChange);
        element.addEventListener('change', handler);
        handlers.push(['change', handler]);
      }
      
      return () => {
        handlers.forEach(([event, handler]) => {
          element.removeEventListener(event, handler);
        });
      };
    }, [onInput, onChange, ref]);
    
    // Map React props to web component attributes
    const webComponentProps = {
      ...props,
      'helper-text': helperText,
      'error-message': errorMessage,
    };
    
    return createElement(
      'glz-input',
      { ref, ...webComponentProps as any }
    );
  }
);

Input.displayName = 'Input';
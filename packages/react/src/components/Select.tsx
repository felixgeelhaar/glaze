import { forwardRef, createElement, useEffect, useRef, type RefObject } from 'react';
import type { SelectProps, GlzSelectElement } from '../types.js';
import { createEventHandler } from '../utils.js';

export const Select = forwardRef<GlzSelectElement, SelectProps>(
  ({ onChange, helperText, errorMessage, options, ...props }, forwardedRef) => {
    const innerRef = useRef<GlzSelectElement>(null);
    const ref = (forwardedRef as RefObject<GlzSelectElement>) || innerRef;
    
    useEffect(() => {
      const element = typeof ref === 'object' ? ref.current : null;
      if (!element) return;
      
      // Set options on the element
      if (options) {
        element.options = options;
      }
    }, [options, ref]);
    
    useEffect(() => {
      const element = typeof ref === 'object' ? ref.current : null;
      if (!element || !onChange) return;
      
      const handler = createEventHandler(onChange);
      element.addEventListener('change', handler);
      
      return () => {
        element.removeEventListener('change', handler);
      };
    }, [onChange, ref]);
    
    // Map React props to web component attributes
    const webComponentProps = {
      ...props,
      'helper-text': helperText,
      'error-message': errorMessage,
    };
    
    return createElement(
      'glz-select',
      { ref, ...webComponentProps }
    );
  }
);

Select.displayName = 'Select';
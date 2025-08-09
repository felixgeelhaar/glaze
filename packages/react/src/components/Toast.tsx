import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import type { ToastProps, GlzToastElement } from '../types.js';
import { createEventHandler } from '../utils.js';

export const Toast = forwardRef<GlzToastElement, ToastProps>(
  ({ open, onGlzToastClose, showProgress, ...props }, forwardedRef) => {
    const innerRef = useRef<GlzToastElement>(null);
    
    useImperativeHandle(forwardedRef, () => innerRef.current as GlzToastElement);
    
    useEffect(() => {
      const element = innerRef.current;
      if (!element) return;
      
      if (open) {
        element.show();
      } else {
        element.close();
      }
    }, [open]);
    
    useEffect(() => {
      const element = innerRef.current;
      if (!element || !onGlzToastClose) return;
      
      const handler = createEventHandler(onGlzToastClose);
      element.addEventListener('glz-toast-close', handler);
      
      return () => {
        element.removeEventListener('glz-toast-close', handler);
      };
    }, [onGlzToastClose]);
    
    // Map React props to web component attributes
    const webComponentProps = {
      ...props,
      'show-progress': showProgress,
    };
    
    return (
      <glz-toast 
        ref={innerRef}
        {...webComponentProps}
      />
    );
  }
);

Toast.displayName = 'Toast';
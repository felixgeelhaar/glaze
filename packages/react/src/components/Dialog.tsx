import { forwardRef, createElement, useEffect, useRef, useImperativeHandle } from 'react';
import type { DialogProps, GlzDialogElement } from '../types.js';
import { createEventHandler } from '../utils.js';

export const Dialog = forwardRef<GlzDialogElement, DialogProps>(
  ({ children, open, onGlzDialogClose, ...props }, forwardedRef) => {
    const innerRef = useRef<GlzDialogElement>(null);
    
    useImperativeHandle(forwardedRef, () => innerRef.current as GlzDialogElement);
    
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
      if (!element || !onGlzDialogClose) return;
      
      const handler = createEventHandler(onGlzDialogClose);
      element.addEventListener('glz-dialog-close', handler);
      
      return () => {
        element.removeEventListener('glz-dialog-close', handler);
      };
    }, [onGlzDialogClose]);
    
    return createElement(
      'glz-dialog',
      { ref: innerRef, ...props },
      children
    );
  }
);

Dialog.displayName = 'Dialog';
import { forwardRef, createElement, useEffect, useRef, type RefObject } from 'react';
import type { NavbarProps, GlzNavbarElement } from '../types.js';
import { createEventHandler } from '../utils.js';

export const Navbar = forwardRef<GlzNavbarElement, NavbarProps>(
  ({ children, brandHref, onGlzNavbarToggle, ...props }, forwardedRef) => {
    const innerRef = useRef<GlzNavbarElement>(null);
    const ref = (forwardedRef as RefObject<GlzNavbarElement>) || innerRef;
    
    useEffect(() => {
      const element = typeof ref === 'object' ? ref.current : null;
      if (!element || !onGlzNavbarToggle) return;
      
      const handler = createEventHandler(onGlzNavbarToggle);
      element.addEventListener('glz-navbar-toggle', handler);
      
      return () => {
        element.removeEventListener('glz-navbar-toggle', handler);
      };
    }, [onGlzNavbarToggle, ref]);
    
    // Map React props to web component attributes
    const webComponentProps = {
      ...props,
      'brand-href': brandHref,
    };
    
    return createElement(
      'glz-navbar',
      { ref, ...webComponentProps },
      children
    );
  }
);

Navbar.displayName = 'Navbar';
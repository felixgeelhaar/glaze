// Utility functions for React wrappers

/**
 * Create an event handler that works with both synthetic and native events
 */
export function createEventHandler<T extends Event>(
  handler: ((e: T) => void) | ((e: React.SyntheticEvent) => void)
): EventListener {
  return (event: Event) => {
    // Create a synthetic-like event object for React compatibility
    const syntheticEvent = {
      ...event,
      nativeEvent: event,
      currentTarget: event.currentTarget,
      target: event.target,
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation(),
      isPropagationStopped: () => false,
      isDefaultPrevented: () => event.defaultPrevented,
      persist: () => {},
    };
    
    (handler as any)(syntheticEvent);
  };
}

/**
 * Map custom element properties to React props
 */
export function mapProps(props: Record<string, any>): Record<string, any> {
  const mapped: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(props)) {
    // Skip undefined values
    if (value === undefined) continue;
    
    // Convert React event handlers to lowercase
    if (key.startsWith('on') && typeof value === 'function') {
      // Skip as we handle these separately
      continue;
    }
    
    // Convert boolean attributes
    if (typeof value === 'boolean') {
      if (value) {
        mapped[key] = '';
      }
      // Don't set false boolean attributes
      continue;
    }
    
    mapped[key] = value;
  }
  
  return mapped;
}
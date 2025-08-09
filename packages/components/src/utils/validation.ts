/**
 * Form validation utilities for Glaze components
 */

export interface ValidationRule {
  validator: (value: any) => boolean;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export class FormValidator {
  private rules: Map<string, ValidationRule[]> = new Map();
  
  /**
   * Add validation rules for a field
   */
  addRule(fieldName: string, rule: ValidationRule) {
    if (!this.rules.has(fieldName)) {
      this.rules.set(fieldName, []);
    }
    this.rules.get(fieldName)!.push(rule);
  }
  
  /**
   * Validate a single field
   */
  validateField(fieldName: string, value: any): ValidationResult {
    const fieldRules = this.rules.get(fieldName) || [];
    const errors: string[] = [];
    
    for (const rule of fieldRules) {
      if (!rule.validator(value)) {
        errors.push(rule.message);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Validate all fields
   */
  validateAll(formData: Record<string, any>): Record<string, ValidationResult> {
    const results: Record<string, ValidationResult> = {};
    
    for (const [fieldName] of this.rules.entries()) {
      const value = formData[fieldName];
      results[fieldName] = this.validateField(fieldName, value);
    }
    
    return results;
  }
  
  /**
   * Check if entire form is valid
   */
  isValid(formData: Record<string, any>): boolean {
    const results = this.validateAll(formData);
    return Object.values(results).every(result => result.valid);
  }
  
  /**
   * Clear all validation rules
   */
  clear() {
    this.rules.clear();
  }
}

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validator: (value: any) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value != null && value !== '';
    },
    message
  }),
  
  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    validator: (value: string) => {
      if (!value) return true; // Skip if empty (use required for that)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message
  }),
  
  minLength: (min: number, message?: string): ValidationRule => ({
    validator: (value: string) => {
      if (!value) return true; // Skip if empty
      return value.length >= min;
    },
    message: message || `Must be at least ${min} characters`
  }),
  
  maxLength: (max: number, message?: string): ValidationRule => ({
    validator: (value: string) => {
      if (!value) return true; // Skip if empty
      return value.length <= max;
    },
    message: message || `Must be no more than ${max} characters`
  }),
  
  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
    validator: (value: string) => {
      if (!value) return true; // Skip if empty
      return regex.test(value);
    },
    message
  }),
  
  number: (message = 'Must be a valid number'): ValidationRule => ({
    validator: (value: any) => {
      if (value === '' || value == null) return true; // Skip if empty
      return !isNaN(Number(value));
    },
    message
  }),
  
  min: (min: number, message?: string): ValidationRule => ({
    validator: (value: any) => {
      if (value === '' || value == null) return true; // Skip if empty
      const num = Number(value);
      return !isNaN(num) && num >= min;
    },
    message: message || `Must be at least ${min}`
  }),
  
  max: (max: number, message?: string): ValidationRule => ({
    validator: (value: any) => {
      if (value === '' || value == null) return true; // Skip if empty
      const num = Number(value);
      return !isNaN(num) && num <= max;
    },
    message: message || `Must be no more than ${max}`
  }),
  
  url: (message = 'Please enter a valid URL'): ValidationRule => ({
    validator: (value: string) => {
      if (!value) return true; // Skip if empty
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message
  }),
  
  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    validator: (value: string) => {
      if (!value) return true; // Skip if empty
      // Basic phone validation (10-15 digits, optional + and spaces/dashes)
      const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,5}$/;
      return phoneRegex.test(value.replace(/\s/g, ''));
    },
    message
  }),
  
  date: (message = 'Please enter a valid date'): ValidationRule => ({
    validator: (value: string) => {
      if (!value) return true; // Skip if empty
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    message
  }),
  
  custom: (validator: (value: any) => boolean, message: string): ValidationRule => ({
    validator,
    message
  })
};

/**
 * Async validation support
 */
export class AsyncValidator {
  private validators: Map<string, (value: any) => Promise<ValidationResult>> = new Map();
  private cache: Map<string, { value: any; result: ValidationResult }> = new Map();
  
  addValidator(fieldName: string, validator: (value: any) => Promise<ValidationResult>) {
    this.validators.set(fieldName, validator);
  }
  
  async validate(fieldName: string, value: any): Promise<ValidationResult> {
    const validator = this.validators.get(fieldName);
    if (!validator) {
      return { valid: true, errors: [] };
    }
    
    // Check cache
    const cached = this.cache.get(fieldName);
    if (cached && cached.value === value) {
      return cached.result;
    }
    
    // Perform validation
    const result = await validator(value);
    
    // Cache result
    this.cache.set(fieldName, { value, result });
    
    return result;
  }
  
  clearCache() {
    this.cache.clear();
  }
}

/**
 * Form field state manager
 */
export class FormFieldState {
  private fields: Map<string, {
    value: any;
    touched: boolean;
    dirty: boolean;
    errors: string[];
  }> = new Map();
  
  setFieldValue(name: string, value: any) {
    const field = this.fields.get(name) || {
      value: '',
      touched: false,
      dirty: false,
      errors: []
    };
    
    field.value = value;
    field.dirty = true;
    this.fields.set(name, field);
  }
  
  setFieldTouched(name: string, touched = true) {
    const field = this.fields.get(name);
    if (field) {
      field.touched = touched;
    }
  }
  
  setFieldErrors(name: string, errors: string[]) {
    const field = this.fields.get(name);
    if (field) {
      field.errors = errors;
    }
  }
  
  getFieldState(name: string) {
    return this.fields.get(name) || {
      value: '',
      touched: false,
      dirty: false,
      errors: []
    };
  }
  
  getFormData(): Record<string, any> {
    const data: Record<string, any> = {};
    for (const [name, field] of this.fields.entries()) {
      data[name] = field.value;
    }
    return data;
  }
  
  isFormDirty(): boolean {
    for (const field of this.fields.values()) {
      if (field.dirty) return true;
    }
    return false;
  }
  
  reset() {
    this.fields.clear();
  }
}
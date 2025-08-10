import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { FormValidator, FormFieldState } from '../utils/validation.js';

/**
 * Form component with built-in validation
 * @element glz-form
 */
@customElement('glz-form')
export class GlzForm extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-row {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    .form-error {
      background: var(--color-error-bg, #fef2f2);
      color: var(--color-error, #ef4444);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-error-border, #fecaca);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-success {
      background: var(--color-success-bg, #f0fdf4);
      color: var(--color-success, #22c55e);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-success-border, #bbf7d0);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    ::slotted([data-form-field]) {
      width: 100%;
    }

    @media (max-width: 640px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `;

  @property({ type: String })
  action = '';

  @property({ type: String })
  method: 'GET' | 'POST' = 'POST';

  @property({ type: Boolean })
  novalidate = false;

  @property({ type: Boolean })
  preventSubmit = false;

  @property({ type: String })
  successMessage = '';

  @property({ type: String })
  errorMessage = '';

  @state()
  private _isSubmitting = false;

  @state()
  private _showSuccess = false;

  @state()
  private _showError = false;

  @state()
  private _fieldErrors: Map<string, string[]> = new Map();

  private validator = new FormValidator();
  private fieldState = new FormFieldState();

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('input', this._handleInput);
    this.addEventListener('blur', this._handleBlur);
    this.addEventListener('glz-field-register', this._handleFieldRegister as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('input', this._handleInput);
    this.removeEventListener('blur', this._handleBlur);
    this.removeEventListener('glz-field-register', this._handleFieldRegister as EventListener);
  }

  private _handleFieldRegister = (event: CustomEvent) => {
    const { name, rules } = event.detail;
    if (name && rules) {
      rules.forEach((rule: any) => {
        this.validator.addRule(name, rule);
      });
    }
  };

  private _handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.name) {
      this.fieldState.setFieldValue(target.name, target.value);
      
      // Clear error when user starts typing
      if (this._fieldErrors.has(target.name)) {
        this._fieldErrors.delete(target.name);
        this.requestUpdate();
      }
      
      // Hide global messages
      this._showError = false;
      this._showSuccess = false;
    }
  };

  private _handleBlur = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.name) {
      this.fieldState.setFieldTouched(target.name);
      
      if (!this.novalidate) {
        this._validateField(target.name, target.value);
      }
    }
  };

  private _validateField(name: string, value: any) {
    const result = this.validator.validateField(name, value);
    
    if (!result.valid) {
      this._fieldErrors.set(name, result.errors);
      if (result.errors.length > 0 && result.errors[0]) {
        this._updateFieldError(name, result.errors[0]);
      }
    } else {
      this._fieldErrors.delete(name);
      this._updateFieldError(name, '');
    }
    
    this.fieldState.setFieldErrors(name, result.errors);
    this.requestUpdate();
  }

  private _updateFieldError(name: string, error: string) {
    // Find the field element and update its error state
    const field = this.querySelector(`[name="${name}"]`) as any;
    if (field && typeof field.setError === 'function') {
      field.setError(error);
    }
  }

  private async _handleSubmit(event: Event) {
    event.preventDefault();
    
    if (this._isSubmitting) return;
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    
    // Convert FormData to object
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Validate all fields
    if (!this.novalidate) {
      const validationResults = this.validator.validateAll(data);
      let hasErrors = false;
      
      for (const [name, result] of Object.entries(validationResults)) {
        if (!result.valid) {
          hasErrors = true;
          this._fieldErrors.set(name, result.errors);
          if (result.errors.length > 0 && result.errors[0]) {
            this._updateFieldError(name, result.errors[0]);
          }
        } else {
          this._fieldErrors.delete(name);
          this._updateFieldError(name, '');
        }
      }
      
      if (hasErrors) {
        this._showError = true;
        this.errorMessage = 'Please correct the errors below';
        this.requestUpdate();
        return;
      }
    }
    
    this._isSubmitting = true;
    this._showError = false;
    this._showSuccess = false;
    this.requestUpdate();
    
    // Dispatch custom submit event
    const submitEvent = new CustomEvent('glz-submit', {
      detail: { data, formData },
      bubbles: true,
      composed: true,
      cancelable: true
    });
    
    this.dispatchEvent(submitEvent);
    
    if (!submitEvent.defaultPrevented && !this.preventSubmit && this.action) {
      // Submit form to action URL
      try {
        const response = await fetch(this.action, {
          method: this.method,
          body: formData
        });
        
        if (response.ok) {
          this._handleSuccess();
        } else {
          this._handleError('Submission failed. Please try again.');
        }
      } catch {
        this._handleError('Network error. Please check your connection.');
      }
    } else if (!this.preventSubmit) {
      // Just mark as successful if no action
      this._handleSuccess();
    }
    
    this._isSubmitting = false;
    this.requestUpdate();
  }

  private _handleSuccess() {
    this._showSuccess = true;
    this._showError = false;
    this.successMessage = this.successMessage || 'Form submitted successfully!';
    
    // Dispatch success event
    this.dispatchEvent(new CustomEvent('glz-success', {
      bubbles: true,
      composed: true
    }));
    
    // Clear form
    this.reset();
  }

  private _handleError(message: string) {
    this._showError = true;
    this._showSuccess = false;
    this.errorMessage = message;
    
    // Dispatch error event
    this.dispatchEvent(new CustomEvent('glz-error', {
      detail: { message },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Reset the form
   */
  reset() {
    const form = this.shadowRoot?.querySelector('form');
    if (form) {
      form.reset();
    }
    
    this._fieldErrors.clear();
    this.fieldState.reset();
    this._showSuccess = false;
    this._showError = false;
    this.requestUpdate();
    
    // Reset all field components
    const fields = this.querySelectorAll('[data-form-field]');
    fields.forEach((field: any) => {
      if (typeof field.reset === 'function') {
        field.reset();
      }
    });
  }

  /**
   * Validate the entire form
   */
  validate(): boolean {
    const form = this.shadowRoot?.querySelector('form');
    if (!form) return false;
    
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    return this.validator.isValid(data);
  }

  /**
   * Get form data
   */
  getFormData(): Record<string, any> {
    const form = this.shadowRoot?.querySelector('form');
    if (!form) return {};
    
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    return data;
  }

  override render() {
    return html`
      <form
        @submit=${this._handleSubmit}
        method=${this.method}
        ?novalidate=${this.novalidate}
      >
        ${this._showSuccess ? html`
          <div class="form-success" role="alert">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            ${this.successMessage}
          </div>
        ` : ''}
        
        ${this._showError ? html`
          <div class="form-error" role="alert">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            ${this.errorMessage}
          </div>
        ` : ''}
        
        <slot></slot>
        
        <div class="form-actions">
          <slot name="actions">
            <glz-button type="button" variant="subtle" @click=${this.reset}>
              Reset
            </glz-button>
            <glz-button type="submit" variant="primary" ?loading=${this._isSubmitting}>
              Submit
            </glz-button>
          </slot>
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glz-form': GlzForm;
  }
}
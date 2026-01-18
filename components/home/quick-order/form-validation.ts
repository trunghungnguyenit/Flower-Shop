import { OrderFormData } from "@/api/api.type";
import { orderFormValidationSchema } from "@/lib/order-constants";

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  fieldErrors: Record<string, string>;
  generalError?: string;
}

// Validate form data with Yup
export const validateOrderForm = async (
  formData: OrderFormData,
  isQuickOrder: boolean = true
): Promise<ValidationResult> => {
  try {
    await orderFormValidationSchema.validate(formData, { 
      abortEarly: false,
      context: { isQuickOrder }
    });

    return {
      isValid: true,
      fieldErrors: {}
    };
  } catch (error) {
    if (error instanceof Error && 'inner' in error) {
      // Handle Yup validation errors
      const validationError = error as any;
      const fieldErrors: Record<string, string> = {};
      
      validationError.inner.forEach((err: any) => {
        if (err.path) {
          fieldErrors[err.path] = err.message;
        }
      });

      return {
        isValid: false,
        fieldErrors,
        generalError: 'Vui lòng kiểm tra lại thông tin đã nhập'
      };
    }

    return {
      isValid: false,
      fieldErrors: {},
      generalError: 'Có lỗi xảy ra khi kiểm tra thông tin'
    };
  }
};

// Validate individual field
export const validateField = async (
  fieldName: keyof OrderFormData,
  value: any,
  formData: OrderFormData,
  isQuickOrder: boolean = true
): Promise<string | null> => {
  try {
    await orderFormValidationSchema.validateAt(fieldName, formData, {
      context: { isQuickOrder }
    });
    return null;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Có lỗi xảy ra khi kiểm tra trường này';
  }
};

// Clear field error helper
export const clearFieldError = (
  fieldErrors: Record<string, string>,
  fieldName: string
): Record<string, string> => {
  const { [fieldName]: _, ...rest } = fieldErrors;
  return rest;
};
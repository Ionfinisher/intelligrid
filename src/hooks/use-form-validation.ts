import { useState, useEffect } from "react";

export interface FormValues {
  productName: string;
  productDescription: string;
  industry: string;
  targetAudience: string;
  tierCount: number;
}

export interface ValidationErrors {
  productName?: string;
  productDescription?: string;
  industry?: string;
  targetAudience?: string;
}

export function useFormValidation(initialValues: FormValues) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (
    field: string,
    value: string | string[] | number | undefined
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Product name validation
    if (!values.productName?.trim()) {
      newErrors.productName = "Product name is required";
    } else if (values.productName.length < 3) {
      newErrors.productName = "Product name must be at least 3 characters";
    }

    // Product description validation
    if (!values.productDescription?.trim()) {
      newErrors.productDescription = "Product description is required";
    } else if (values.productDescription.length < 10) {
      newErrors.productDescription =
        "Description must be at least 10 characters";
    }

    // Industry validation
    if (!values.industry) {
      newErrors.industry = "Please select an industry";
    }

    // Target audience validation
    if (!values.targetAudience) {
      newErrors.targetAudience = "Please select a target audience";
    }

    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsValid(valid);
    return valid;
  };

  const touchAll = () => {
    const allTouched: Record<string, boolean> = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [values, touched]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    touchAll,
  };
}

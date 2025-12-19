import { useCallback, useState } from "react";
import { initialValues, validateForm } from "../utils/validateForm";

export const useForm = () => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const onlyNumbers = value.replace(/[^\d]/g, "");
    setValues((prev) => ({ ...prev, [name]: onlyNumbers }));
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      handlePhoneChange(e);
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handlePhoneKeyPress = (e) => {
    if (
      !/\d/.test(e.key) &&
      ![
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const validateAllFields = useCallback(() => {
    const newErrors = {};
    Object.keys(values).forEach((fieldName) => {
      if (fieldName === "email" && !values[fieldName].trim()) {
        return;
      }

      const error = validateForm(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    setErrors(newErrors);
    return newErrors;
  }, [values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      const error = validateForm(name, values[name]);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [values]
  );

  const getInputClassName = useCallback(
    (fieldName, styles) => {
      const error = errors[fieldName];
      const isTouched = touched[fieldName];
      const isValid = isTouched && !error;
      const isError = isTouched && !!error;

      return [
        styles.input,
        isError ? styles.error : "",
        isValid ? styles.success : "",
      ]
        .filter(Boolean)
        .join(" ");
    },
    [touched, errors]
  );

  const simulateServerRequest = () => {
    return new Promise((resolve) => {
      const delay = 1000 + Math.random() * 1000;
      setTimeout(() => {
        console.log("Данные формы отправлены:", values);
        resolve({ success: true });
      }, delay);
    });
  };

  const handleSubmit = useCallback(
    async (e, onSubmit, onSuccess) => {
      e.preventDefault();
      setIsSubmitting(true);

      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      const validationErrors = validateAllFields();

      const hasRequiredErrors = Object.keys(validationErrors).some((key) => {
        return !!validationErrors[key];
      });

      if (!hasRequiredErrors) {
        try {
          await simulateServerRequest();
          if (onSubmit) {
            await onSubmit(values);
          }
          resetForm();
          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.error("Ошибка при отправке формы:", error);
        }
      } else {
        console.log("Форма содержит ошибки:", validationErrors);
      }

      setIsSubmitting(false);
    },
    [values, validateAllFields, resetForm]
  );

  return {
    values,
    setValues,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handlePhoneKeyPress,
    getInputClassName,
    resetForm,
  };
};

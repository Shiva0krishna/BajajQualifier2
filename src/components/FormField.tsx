import React from 'react';
import { FormField as FormFieldType } from '../types';
import { useFormContext } from '../context/FormContext';

interface FormFieldProps {
  field: FormFieldType;
}

const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const { formValues, setFormValues, formErrors } = useFormContext();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues({ ...formValues, [name]: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleMultiSelect = (value: string) => {
    const currentValues = (formValues[field.fieldId] as string[]) || [];
    
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setFormValues({
      ...formValues,
      [field.fieldId]: newValues
    });
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return (
          <input
            type={field.type}
            id={field.fieldId}
            name={field.fieldId}
            value={(formValues[field.fieldId] as string) || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={`w-full px-4 py-2 border rounded-md ${
              formErrors[field.fieldId] 
                ? 'border-red-500' 
                : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            data-testid={field.dataTestId}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.fieldId}
            name={field.fieldId}
            value={(formValues[field.fieldId] as string) || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={`w-full px-4 py-2 border rounded-md ${
              formErrors[field.fieldId] 
                ? 'border-red-500' 
                : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            data-testid={field.dataTestId}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
            rows={5}
          />
        );
      
      case 'dropdown':
        return (
          <select
            id={field.fieldId}
            name={field.fieldId}
            value={(formValues[field.fieldId] as string) || ''}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              formErrors[field.fieldId] 
                ? 'border-red-500' 
                : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            data-testid={field.dataTestId}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={(formValues[field.fieldId] as string) === option.value}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  data-testid={option.dataTestId}
                  required={field.required}
                />
                <label
                  htmlFor={`${field.fieldId}-${option.value}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options ? (
              // Multiple checkboxes
              field.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${field.fieldId}-${option.value}`}
                    name={`${field.fieldId}-${option.value}`}
                    checked={
                      Array.isArray(formValues[field.fieldId]) && 
                      (formValues[field.fieldId] as string[]).includes(option.value)
                    }
                    onChange={() => handleMultiSelect(option.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    data-testid={option.dataTestId}
                  />
                  <label
                    htmlFor={`${field.fieldId}-${option.value}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))
            ) : (
              // Single checkbox
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={field.fieldId}
                  name={field.fieldId}
                  checked={Boolean(formValues[field.fieldId])}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  data-testid={field.dataTestId}
                  required={field.required}
                />
                <label
                  htmlFor={field.fieldId}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {field.label}
                </label>
              </div>
            )}
          </div>
        );
      
      default:
        return <p>Unsupported field type: {field.type}</p>;
    }
  };

  // Don't render label for single checkbox as it's rendered with the input
  const shouldRenderLabel = !(field.type === 'checkbox' && !field.options);

  return (
    <div className="mb-4">
      {shouldRenderLabel && (
        <label 
          htmlFor={field.fieldId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {formErrors[field.fieldId] && (
        <p className="mt-1 text-sm text-red-600">{formErrors[field.fieldId]}</p>
      )}
    </div>
  );
};

export default FormField;
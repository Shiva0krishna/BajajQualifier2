import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Form, FormSection, FormValues, FormErrors, User } from '../types';

interface FormContextType {
  user: User | null;
  setUser: (user: User) => void;
  form: Form | null;
  setForm: (form: Form) => void;
  currentSectionIndex: number;
  setCurrentSectionIndex: (index: number) => void;
  formValues: FormValues;
  setFormValues: (values: FormValues) => void;
  formErrors: FormErrors;
  setFormErrors: (errors: FormErrors) => void;
  validateSection: (section: FormSection) => boolean;
  clearForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateSection = (section: FormSection): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};
    
    section.fields.forEach((field) => {
      const value = formValues[field.fieldId];
      
      // Check required fields
      if (field.required && 
          (value === undefined || 
           value === '' || 
           (Array.isArray(value) && value.length === 0))) {
        newErrors[field.fieldId] = field.validation?.message || 'This field is required';
        isValid = false;
      }
      
      // Check minLength if value exists
      if (value && typeof value === 'string' && field.minLength && value.length < field.minLength) {
        newErrors[field.fieldId] = field.validation?.message || 
          `Minimum length is ${field.minLength} characters`;
        isValid = false;
      }
      
      // Check maxLength if value exists
      if (value && typeof value === 'string' && field.maxLength && value.length > field.maxLength) {
        newErrors[field.fieldId] = field.validation?.message || 
          `Maximum length is ${field.maxLength} characters`;
        isValid = false;
      }
    });
    
    setFormErrors({...formErrors, ...newErrors});
    return isValid;
  };

  const clearForm = () => {
    setFormValues({});
    setFormErrors({});
    setCurrentSectionIndex(0);
    setForm(null);
  };

  return (
    <FormContext.Provider
      value={{
        user,
        setUser,
        form,
        setForm,
        currentSectionIndex,
        setCurrentSectionIndex,
        formValues,
        setFormValues,
        formErrors,
        setFormErrors,
        validateSection,
        clearForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
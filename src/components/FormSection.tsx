import React from 'react';
import { FormSection as FormSectionType } from '../types';
import FormField from './FormField';
import NavigationButtons from './NavigationButtons';

interface FormSectionProps {
  section: FormSectionType;
  isLast: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({ section, isLast }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{section.title}</h2>
        {section.description && (
          <p className="text-gray-600">{section.description}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {section.fields.map((field) => (
          <FormField key={field.fieldId} field={field} />
        ))}
      </div>
      
      <NavigationButtons isLastSection={isLast} />
    </div>
  );
};

export default FormSection;
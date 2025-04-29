import React from 'react';
import { useFormContext } from '../context/FormContext';
import FormSection from '../components/FormSection';
import ProgressIndicator from '../components/ProgressIndicator';

const DynamicForm: React.FC = () => {
  const { form, currentSectionIndex, clearForm } = useFormContext();

  if (!form) return null;

  const currentSection = form.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === form.sections.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{form.formTitle}</h1>
          <button
            onClick={clearForm}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
        
        <ProgressIndicator />
        
        <FormSection 
          section={currentSection}
          isLast={isLastSection}
        />
      </div>
    </div>
  );
};

export default DynamicForm;
import React from 'react';
import { useFormContext } from '../context/FormContext';

const ProgressIndicator: React.FC = () => {
  const { form, currentSectionIndex } = useFormContext();

  if (!form) return null;

  const totalSections = form.sections.length;
  const progressPercentage = ((currentSectionIndex + 1) / totalSections) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Section {currentSectionIndex + 1} of {totalSections}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        {form.sections.map((section, index) => (
          <div 
            key={section.sectionId} 
            className="flex flex-col items-center"
            style={{ width: `${100 / totalSections}%` }}
          >
            <div 
              className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                index < currentSectionIndex
                  ? 'bg-blue-600' 
                  : index === currentSectionIndex
                  ? 'border-2 border-blue-600 bg-white'
                  : 'bg-gray-300'
              }`}
            >
              {index < currentSectionIndex && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1 hidden sm:block truncate text-center">
              {section.title.length > 15 ? section.title.substring(0, 15) + '...' : section.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
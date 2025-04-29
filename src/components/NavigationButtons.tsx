import React from 'react';
import { useFormContext } from '../context/FormContext';

interface NavigationButtonsProps {
  isLastSection: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ isLastSection }) => {
  const { 
    form, 
    currentSectionIndex, 
    setCurrentSectionIndex, 
    validateSection,
    formValues 
  } = useFormContext();

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (!form) return;
    
    const currentSection = form.sections[currentSectionIndex];
    const isValid = validateSection(currentSection);
    
    if (isValid && currentSectionIndex < form.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!form) return;
    
    const currentSection = form.sections[currentSectionIndex];
    const isValid = validateSection(currentSection);
    
    if (isValid) {
      console.log('Form submitted with data:', formValues);
      // Here you would typically send the data to your backend
      alert('Form submitted successfully! Check console for form data.');
    }
  };

  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentSectionIndex === 0}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          currentSectionIndex === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Previous
      </button>
      
      {isLastSection ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;